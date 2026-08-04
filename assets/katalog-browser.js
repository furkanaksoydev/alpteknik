(function () {
  const categories = window.catalogData?.categories || [];
  let browser = document.querySelector('[data-catalog-browser]') || document.querySelector('.content-section .container > .split-layout + div[style*="margin-top"]');
  if (!browser || !categories.length) return;

  const categoryId = new URLSearchParams(window.location.search).get('category');
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const catalogSection = browser.closest('section');
  const catalogContainer = catalogSection?.querySelector('.container');
  if (categoryId && catalogContainer) {
    document.querySelector('.page-hero')?.remove();
    catalogContainer.innerHTML = `<div class="title-wrapper catalog-only-title"><div class="page-kicker">ÜRÜN KATALOĞU</div><h1 class="section-title">Ürün <span>Kataloğu</span></h1><p class="section-subtitle">Kategori seçerek ürün gruplarımızı inceleyin.</p></div><div data-catalog-browser></div>`;
    browser = catalogContainer.querySelector('[data-catalog-browser]');
  }

  function categoryCard(category) {
    const firstProduct = category.products[0] || {};
    return `<article class="catalog-category-card">
      <div class="catalog-category-copy"><h3>${escapeHtml(category.title)}</h3><p>${escapeHtml(category.description)}</p></div>
      <div class="catalog-category-actions"><div class="catalog-category-preview"><img src="${firstProduct.images?.[0] || ''}" alt="${escapeHtml(firstProduct.name || category.title)}" loading="lazy"></div><a class="catalog-open-btn" href="kataloglar.html?category=${encodeURIComponent(category.id)}">Kataloğu İncele <i class="fa-solid fa-arrow-right"></i></a></div>
    </article>`;
  }

  function productCard(product) {
    return `<button type="button" class="catalog-product-card" data-product-id="${product.id}" aria-label="${escapeHtml(product.name)} ürününü incele"><div class="catalog-product-card-media"><img src="${product.images[0]}" alt="${escapeHtml(product.name)}" loading="lazy"></div><div class="catalog-product-card-body"><h4>${escapeHtml(product.name)}</h4><p>${escapeHtml(product.description)}</p><span class="catalog-product-card-hint">Ürünü incele <i class="fa-solid fa-arrow-up-right-from-square"></i></span></div></button>`;
  }

  function modalMarkup() {
    return `<div class="catalog-product-modal" role="dialog" aria-modal="true" aria-label="Ürün inceleme penceresi"><div class="catalog-modal-panel"><button class="catalog-modal-close" type="button" aria-label="Kapat">&times;</button><div class="catalog-modal-layout"><div class="catalog-gallery"><div class="catalog-main-image"><button class="catalog-gallery-arrow catalog-gallery-prev" type="button" aria-label="Önceki görsel"><i class="fa-solid fa-chevron-left"></i></button><img alt=""><button class="catalog-gallery-arrow catalog-gallery-next" type="button" aria-label="Sonraki görsel"><i class="fa-solid fa-chevron-right"></i></button></div><div class="catalog-thumbnails" aria-label="Ürün görselleri"></div></div><div class="catalog-modal-copy"><span class="catalog-modal-label"></span><h2></h2><p></p></div></div></div></div>`;
  }

  function renderCategoryList() {
    const technicalSources = browser.previousElementSibling;
    if (technicalSources?.classList.contains('split-layout')) {
      browser.style.marginTop = '0';
      technicalSources.style.marginTop = '70px';
      browser.after(technicalSources);
    }
    browser.innerHTML = categories.map(categoryCard).join('');
  }

  function renderProductCatalog(category) {
    browser.style.marginTop = '0';
    applyCategorySeo(category);
    browser.innerHTML = `<div class="catalog-page-heading"><div><div class="page-kicker">ÜRÜN KATALOĞU</div><h1>${escapeHtml(category.title)}</h1><p>${escapeHtml(category.seo?.intro || category.description)}</p></div><a class="catalog-page-back" href="kataloglar.html"><i class="fa-solid fa-arrow-left"></i> Tüm kataloglar</a></div><div class="catalog-product-grid">${category.products.map(productCard).join('')}</div>`;
    document.body.insertAdjacentHTML('beforeend', modalMarkup());
    bindModal(category);
  }

  function applyCategorySeo(category) {
    const seo = category.seo || {};
    document.title = seo.title || `${category.title} Kataloğu | Alp Teknik`;
    const setMeta = (name, content) => {
      if (!content) return;
      let node = document.querySelector(`meta[name="${name}"]`);
      if (!node) { node = document.createElement('meta'); node.name = name; document.head.appendChild(node); }
      node.content = content;
    };
    setMeta('description', seo.description || category.description);
    setMeta('keywords', seo.keywords);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.href;
    const previousSchema = document.getElementById('catalog-category-schema');
    if (previousSchema) previousSchema.remove();
    const schema = document.createElement('script');
    schema.id = 'catalog-category-schema'; schema.type = 'application/ld+json';
    schema.text = JSON.stringify({ '@context':'https://schema.org', '@type':'CollectionPage', name: category.title, description: seo.description || category.description, mainEntity: { '@type':'ItemList', itemListElement: category.products.map((product, index) => ({ '@type':'ListItem', position:index + 1, item:{ '@type':'Product', name:product.name, description:product.description, image:product.images.map(image => new URL(image, window.location.href).href) } })) } });
    document.head.appendChild(schema);
  }

  function bindModal(category) {
    const modal = document.querySelector('.catalog-product-modal');
    let activeProduct = null;
    let activeImage = 0;
    function updateImage() {
      modal.querySelector('.catalog-main-image img').src = activeProduct.images[activeImage];
      modal.querySelector('.catalog-main-image img').alt = activeProduct.name;
      modal.querySelector('.catalog-thumbnails').innerHTML = activeProduct.images.map((src, index) => `<button type="button" class="catalog-thumbnail ${index === activeImage ? 'is-active' : ''}" data-image-index="${index}" aria-label="${activeProduct.name} görsel ${index + 1}"><img src="${src}" alt=""></button>`).join('');
      modal.querySelectorAll('.catalog-gallery-arrow').forEach(button => { button.hidden = activeProduct.images.length < 2; });
    }
    function closeModal() { modal.classList.remove('is-open'); document.body.classList.remove('catalog-modal-open'); }
    function shiftImage(direction) { if (activeProduct.images.length > 1) { activeImage = (activeImage + direction + activeProduct.images.length) % activeProduct.images.length; updateImage(); } }
    browser.addEventListener('click', event => {
      const card = event.target.closest('[data-product-id]');
      if (!card) return;
      activeProduct = category.products.find(product => product.id === card.dataset.productId);
      activeImage = 0;
      modal.querySelector('.catalog-modal-label').textContent = category.title;
      modal.querySelector('.catalog-modal-copy h2').textContent = activeProduct.name;
      modal.querySelector('.catalog-modal-copy p').textContent = activeProduct.description;
      updateImage(); modal.classList.add('is-open'); document.body.classList.add('catalog-modal-open'); modal.querySelector('.catalog-modal-close').focus();
    });
    modal.addEventListener('click', event => {
      if (event.target === modal || event.target.closest('.catalog-modal-close')) closeModal();
      const thumbnail = event.target.closest('[data-image-index]');
      if (thumbnail) { activeImage = Number(thumbnail.dataset.imageIndex); updateImage(); }
      if (event.target.closest('.catalog-gallery-prev')) shiftImage(-1);
      if (event.target.closest('.catalog-gallery-next')) shiftImage(1);
    });
    document.addEventListener('keydown', event => {
      if (!modal.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') shiftImage(-1);
      if (event.key === 'ArrowRight') shiftImage(1);
    });
  }

  const selectedCategory = categories.find(category => category.id === categoryId);
  if (selectedCategory) renderProductCatalog(selectedCategory); else renderCategoryList();
}());
