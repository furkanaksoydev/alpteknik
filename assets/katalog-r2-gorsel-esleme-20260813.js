/*
 * R2 ürün görsel eşlemesi — 13 Ağustos 2026
 *
 * Bu dosya katalog veri dizininden sonra, katalog ekranını oluşturan betikten
 * önce yüklenmelidir. Her kaynak ürünün görsel yolu, R2 yükleme paketindeki
 * manifest.json ile aynı kategori/alt kategori/ürün URL kimliği düzenindedir.
 */
(function () {
  'use strict';

  const mediaRoot = 'https://media.nevasiteyonetimi.com/alpteknik/r2-alpteknik-urun-gorselleri';
  const categoryIds = new Set(['vanalar', 'kompansatorler', 'seviye-gostergeleri']);
  const jpgSourceSlugs = new Set([
    'ari-checko-v-mp-lift-cek-vana-orta-basinc-sinifi-pn63-160',
    'ari-checko-d-disk-tip-cek-vana',
    'fccu-kompansatorler',
    'egzoz-gazi-temizleme-scrubber',
    'kare-kompansatorler',
    'capraz-kompansatorler-buhar-turbinleri',
    'lens-kompansatorler',
    'yuzey-ve-dip-blof-vanalari'
  ]);

  function sourceSlug(sourceUrl) {
    try {
      return new URL(sourceUrl).pathname.split('/').filter(Boolean).pop() || '';
    } catch {
      return '';
    }
  }

  const usedProductIds = new Set();

  (window.catalogData?.categories || [])
    .filter(category => categoryIds.has(category.id))
    .forEach(category => (category.products || []).forEach(product => {
      const slug = sourceSlug(product.sourceUrl);
      if (!slug || !product.groupId) return;
      const extension = jpgSourceSlugs.has(slug) ? 'jpg' : 'png';
      // Aynı başlıkla iki ayrı kaynak ürünü bulunan kayıtlarda kart/pencere
      // eşleşmesinin karışmaması için URL kimliğiyle benzersiz anahtar üret.
      if (usedProductIds.has(product.id)) product.id = `${product.id}--${slug}`;
      usedProductIds.add(product.id);
      product.images = [`${mediaRoot}/${category.id}/${product.groupId}/${slug}/${slug}-1.${extension}`];
      product.imageSource = 'R2';
    }));
}());
