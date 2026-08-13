/**
 * R2 media preparation utility
 *
 * Downloads the original product image declared by each direct Ayvaz product
 * page and arranges it in a stable, upload-ready object tree. It deliberately
 * does not change the site catalogue or any public URL: that is done only
 * after the package has been uploaded to R2.
 *
 * Run from repository root:
 *   node scripts/prepare-r2-product-images.mjs
 */
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const PACKAGE_NAME = 'r2-alpteknik-urun-gorselleri';
const OUTPUT_ROOT = path.join(ROOT, PACKAGE_NAME);
const DIRECTORY_SOURCE = path.join(ROOT, 'assets', 'katalog-urun-dizini-20260813.js');
const ALLOWED_CATEGORY_IDS = new Set(['vanalar', 'kompansatorler', 'seviye-gostergeleri']);
const USER_AGENT = 'Mozilla/5.0 (compatible; AlpTeknikCatalogAssetPreparation/1.0; +https://furkanaksoydev.github.io/alpteknik/)';
const MAX_IMAGES_PER_PRODUCT = 8;
const CONCURRENCY = 3;

const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const cleanText = value => String(value || '').replace(/\\u0026/g, '&').replace(/&amp;/g, '&').trim();
const toUrl = (value, pageUrl) => {
  try {
    const result = new URL(cleanText(value), pageUrl);
    return result.protocol === 'https:' || result.protocol === 'http:' ? result.href : '';
  } catch {
    return '';
  }
};
const pathToKey = filePath => path.relative(ROOT, filePath).split(path.sep).join('/');
const quoteCsv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const extensionFor = (sourceUrl, contentType) => {
  const byContentType = {
    'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png',
    'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif'
  };
  const contentTypeKey = String(contentType || '').split(';')[0].toLowerCase();
  if (byContentType[contentTypeKey]) return byContentType[contentTypeKey];
  const extension = path.extname(new URL(sourceUrl).pathname).slice(1).toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(extension)
    ? (extension === 'jpeg' ? 'jpg' : extension)
    : 'jpg';
};

function loadProducts() {
  const source = awaitableRead(DIRECTORY_SOURCE);
  return source;
}

async function awaitableRead(filePath) {
  const source = await readFile(filePath, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: DIRECTORY_SOURCE });
  const categories = sandbox.window.catalogData?.categories || [];
  return categories
    .filter(category => ALLOWED_CATEGORY_IDS.has(category.id))
    .flatMap(category => (category.products || []).map(product => ({
      categoryId: category.id,
      categoryTitle: category.title,
      productId: product.id,
      productTitle: product.name,
      groupId: product.groupId,
      groupTitle: product.group,
      sourcePage: product.sourceUrl
    })))
    .filter(product => /^https:\/\/www\.ayvaz\.com\/urun\//.test(product.sourcePage));
}

function sourceSlug(product) {
  return new URL(product.sourcePage).pathname.split('/').filter(Boolean).at(-1);
}

function schemaImageUrls(html, pageUrl) {
  const urls = [];
  // The source pages publish their canonical product image inside the AIOSEO
  // ItemPage JSON-LD. This avoids page chrome and related-product thumbnails.
  const pattern = /"image"\s*:\s*\{[^{}]{0,700}?"url"\s*:\s*"([^"\\]+(?:\\.[^"\\]*)*)"/gisu;
  for (const match of html.matchAll(pattern)) {
    const decoded = cleanText(match[1]).replaceAll('\\/', '/');
    const url = toUrl(decoded, pageUrl);
    if (url.includes('/wp-content/uploads/')) urls.push(url);
  }
  return urls;
}

function galleryImageUrls(html, pageUrl) {
  const urls = [];
  // WooCommerce galleries (when a product has more than one original image)
  // expose the full-size asset via these attributes.
  for (const attribute of ['data-large_image', 'data-large-image', 'data-full', 'data-src-full']) {
    const pattern = new RegExp(`${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'gis');
    for (const match of html.matchAll(pattern)) {
      const url = toUrl(match[2], pageUrl);
      if (url.includes('/wp-content/uploads/')) urls.push(url);
    }
  }
  return urls;
}

function imageSources(html, pageUrl) {
  const seen = new Set();
  const result = [];
  for (const url of [...schemaImageUrls(html, pageUrl), ...galleryImageUrls(html, pageUrl)]) {
    const withoutHash = new URL(url);
    withoutHash.hash = '';
    const normalized = withoutHash.href;
    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }
  return result.slice(0, MAX_IMAGES_PER_PRODUCT);
}

async function fetchOrThrow(url, options = {}) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': USER_AGENT,
      'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.7',
      ...options.headers
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return response;
}

async function existsWithContent(filePath) {
  try {
    return (await stat(filePath)).size > 0;
  } catch {
    return false;
  }
}

async function downloadProduct(product) {
  const slug = sourceSlug(product);
  const relativeDirectory = path.join(product.categoryId, product.groupId, slug);
  const destinationDirectory = path.join(OUTPUT_ROOT, relativeDirectory);
  const item = {
    ...product,
    sourceSlug: slug,
    r2Prefix: pathToKey(destinationDirectory),
    status: 'pending',
    images: [],
    errors: []
  };

  try {
    const pageResponse = await fetchOrThrow(product.sourcePage);
    const pageHtml = await pageResponse.text();
    const sources = imageSources(pageHtml, product.sourcePage);
    if (!sources.length) throw new Error('Kaynak sayfada ürün görseli bildirilmemiş.');

    await mkdir(destinationDirectory, { recursive: true });
    for (let index = 0; index < sources.length; index += 1) {
      const sourceUrl = sources[index];
      try {
        const imageResponse = await fetchOrThrow(sourceUrl, { headers: { Referer: product.sourcePage, Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8' } });
        const buffer = Buffer.from(await imageResponse.arrayBuffer());
        if (buffer.length < 512) throw new Error(`Geçersiz/küçük görsel yanıtı (${buffer.length} bayt).`);
        const extension = extensionFor(sourceUrl, imageResponse.headers.get('content-type'));
        const filename = `${slug}-${index + 1}.${extension}`;
        const destination = path.join(destinationDirectory, filename);
        if (!(await existsWithContent(destination))) await writeFile(destination, buffer);
        item.images.push({
          filename,
          r2Key: pathToKey(destination),
          sourceUrl,
          contentType: imageResponse.headers.get('content-type') || '',
          bytes: buffer.length,
          sha256: createHash('sha256').update(buffer).digest('hex')
        });
      } catch (error) {
        item.errors.push({ sourceUrl, error: error.message });
      }
    }
    item.status = item.images.length ? (item.errors.length ? 'partial' : 'complete') : 'failed';
  } catch (error) {
    item.status = 'failed';
    item.errors.push({ sourceUrl: product.sourcePage, error: error.message });
  }
  return item;
}

async function mapWithConcurrency(items, worker) {
  const output = new Array(items.length);
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;
      output[index] = await worker(items[index], index);
      await pause(120);
    }
  });
  await Promise.all(runners);
  return output;
}

function createReadme(manifest) {
  return `# Alp Teknik R2 Ürün Görsel Paketi\n\n` +
    `Bu klasör, R2 bucket köküne **klasör adı korunarak** yüklenmek üzere hazırlandı.\n\n` +
    `- R2 kök klasör adı: \`${PACKAGE_NAME}\`\n` +
    `- Ürün: ${manifest.summary.products} | İndirilen görsel: ${manifest.summary.images}\n` +
    `- Tamamlanan ürün: ${manifest.summary.completeProducts} | Kısmi: ${manifest.summary.partialProducts} | Hatalı: ${manifest.summary.failedProducts}\n` +
    `- Kaynak: her satırda \`sourcePage\` ve \`sourceUrl\` olarak manifest içinde kayıtlıdır.\n\n` +
    `## Yükleme talimatı\n\n` +
    `1. R2 bucket'ınızın kök dizininde \`${PACKAGE_NAME}\` klasörünü, içeriğiyle birlikte oluşturacak biçimde bu klasörü yükleyin.\n` +
    `2. \`manifest.json\` içindeki her \`r2Key\` değerinin R2'de oluştuğunu kontrol edin.\n` +
    `3. Paket yüklendikten sonra R2'nin herkese açık temel adresini paylaşın. Siteyi, manifestteki \`r2Key\` değerlerine göre güncelleyeceğim.\n\n` +
    `Örnek nihai nesne yolu: \`${PACKAGE_NAME}/vanalar/ayvaz-kesme-vanalari/gv-16-gv-25-gv-40-glob-vanalar/gv-16-gv-25-gv-40-glob-vanalar-1.png\`\n`;
}

async function main() {
  const products = await loadProducts();
  if (products.length !== 172) throw new Error(`Beklenen 172 kaynak ürün yerine ${products.length} ürün bulundu.`);
  await mkdir(OUTPUT_ROOT, { recursive: true });
  console.log(`${products.length} ürün için kaynak görseller hazırlanıyor...`);
  const items = await mapWithConcurrency(products, async (product, index) => {
    const item = await downloadProduct(product);
    console.log(`[${String(index + 1).padStart(3, '0')}/${products.length}] ${item.status.toUpperCase()} ${product.sourcePage}`);
    return item;
  });
  const summary = {
    products: items.length,
    images: items.reduce((total, item) => total + item.images.length, 0),
    completeProducts: items.filter(item => item.status === 'complete').length,
    partialProducts: items.filter(item => item.status === 'partial').length,
    failedProducts: items.filter(item => item.status === 'failed').length
  };
  const manifest = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    packageName: PACKAGE_NAME,
    source: { name: 'Ayvaz product pages', domain: 'www.ayvaz.com' },
    uploadRootInstruction: `R2 bucket root / ${PACKAGE_NAME}/`,
    summary,
    products: items
  };
  const csvRows = [[
    'category_id', 'category_title', 'group_id', 'group_title', 'product_id', 'product_title',
    'source_page', 'status', 'image_number', 'r2_key', 'source_image_url', 'content_type', 'bytes', 'sha256', 'errors'
  ]];
  for (const item of items) {
    if (item.images.length) {
      item.images.forEach((image, index) => csvRows.push([
        item.categoryId, item.categoryTitle, item.groupId, item.groupTitle, item.productId, item.productTitle,
        item.sourcePage, item.status, index + 1, image.r2Key, image.sourceUrl, image.contentType, image.bytes, image.sha256,
        item.errors.map(error => `${error.sourceUrl}: ${error.error}`).join(' | ')
      ]));
    } else {
      csvRows.push([item.categoryId, item.categoryTitle, item.groupId, item.groupTitle, item.productId, item.productTitle,
        item.sourcePage, item.status, '', '', '', '', '', '', item.errors.map(error => `${error.sourceUrl}: ${error.error}`).join(' | ')]);
    }
  }
  const failedItems = items.filter(item => item.status !== 'complete');
  await Promise.all([
    writeFile(path.join(OUTPUT_ROOT, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8'),
    writeFile(path.join(OUTPUT_ROOT, 'manifest.csv'), `${csvRows.map(row => row.map(quoteCsv).join(',')).join('\n')}\n`, 'utf8'),
    writeFile(path.join(OUTPUT_ROOT, 'indirilemeyen-veya-kismi-urunler.json'), `${JSON.stringify(failedItems, null, 2)}\n`, 'utf8'),
    writeFile(path.join(OUTPUT_ROOT, 'README.md'), createReadme(manifest), 'utf8')
  ]);
  console.log(`\nPaket hazır: ${OUTPUT_ROOT}`);
  console.log(JSON.stringify(summary));
  if (summary.failedProducts || summary.partialProducts) process.exitCode = 2;
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
