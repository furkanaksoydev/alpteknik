(function () {
  'use strict';

  const categories = window.catalogData?.categories || [];
  let browser = document.querySelector('[data-catalog-browser]') || document.querySelector('.content-section .container > .split-layout + div[style*="margin-top"]');
  if (!browser || !categories.length) return;

  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('category');
  const requestedGroup = params.get('group');
  const requestedBrand = params.get('brand');
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const catalogSection = browser.closest('section');
  const catalogContainer = catalogSection?.querySelector('.container');

  if (categoryId && catalogContainer) {
    document.querySelector('.page-hero')?.remove();
    catalogContainer.innerHTML = '<div class="title-wrapper catalog-only-title"><div class="page-kicker">ÜRÜN KATALOĞU</div><h1 class="section-title">Ürün <span>Kataloğu</span></h1><p class="section-subtitle">Kategori seçerek ürün gruplarımızı inceleyin.</p></div><div data-catalog-browser></div>';
    browser = catalogContainer.querySelector('[data-catalog-browser]');
  }

  function productCard(product) {
    const media = product.images?.[0]
      ? `<img src="${product.images[0]}" alt="${escapeHtml(product.name)}" loading="lazy">`
      : '<i class="fa-solid fa-box-open catalog-product-placeholder" aria-hidden="true"></i>';
    return `<button type="button" class="catalog-product-card" data-product-id="${product.id}" aria-label="${escapeHtml(product.name)} ürününü incele"><div class="catalog-product-card-media">${media}</div><div class="catalog-product-card-body"><span class="catalog-product-group">${escapeHtml(product.group || '')}</span><h4>${escapeHtml(product.name)}</h4><p>${escapeHtml(product.description)}</p><span class="catalog-product-card-hint">Ürünü incele <i class="fa-solid fa-arrow-up-right-from-square"></i></span></div></button>`;
  }

  function categoryDirectory(category) {
    const groups = [];
    category.products.forEach(product => {
      const id = product.groupId || '';
      const title = product.group || 'Tüm ürünler';
      const group = groups.find(item => item.id === id && item.title === title);
      if (group) group.count += 1;
      else groups.push({ id, title, count: 1 });
    });
    const categoryUrl = `kataloglar.html?category=${encodeURIComponent(category.id)}`;
    const groupLinks = groups.map(group => {
      const href = group.id ? `${categoryUrl}&amp;group=${encodeURIComponent(group.id)}` : categoryUrl;
      return `<li><a href="${href}"><span>${escapeHtml(group.title)}</span><small>${group.count} ürün</small><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>`;
    }).join('');
    return `<article class="catalog-directory-card"><div class="catalog-directory-heading"><h2><a href="${categoryUrl}">${escapeHtml(category.title)}</a></h2><p>${escapeHtml(category.description)}</p><a class="catalog-directory-all" href="${categoryUrl}">Tüm ${escapeHtml(category.title)} ürünleri <i class="fa-solid fa-arrow-right"></i></a></div><ul class="catalog-directory-groups">${groupLinks}</ul></article>`;
  }

  function modalMarkup() {
    return '<div class="catalog-product-modal" role="dialog" aria-modal="true" aria-label="Ürün inceleme penceresi"><div class="catalog-modal-panel"><button class="catalog-modal-close" type="button" aria-label="Kapat">&times;</button><div class="catalog-modal-layout"><div class="catalog-gallery"><div class="catalog-main-image"><button class="catalog-gallery-arrow catalog-gallery-prev" type="button" aria-label="Önceki görsel"><i class="fa-solid fa-chevron-left"></i></button><img alt=""><button class="catalog-gallery-arrow catalog-gallery-next" type="button" aria-label="Sonraki görsel"><i class="fa-solid fa-chevron-right"></i></button></div><div class="catalog-thumbnails" aria-label="Ürün görselleri"></div></div><div class="catalog-modal-copy"><span class="catalog-modal-label"></span><h2></h2><p></p><section class="catalog-specifications" aria-label="Teknik özellikler"></section></div></div></div></div>';
  }

  function renderSpecifications(product) {
    const sourceUrl = product.sourceUrl || '';
    const tag = sourceUrl ? 'a' : 'div';
    const attributes = sourceUrl
      ? ` href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer"`
      : ' aria-disabled="true"';
    return `<${tag} class="catalog-technical-card"${attributes} aria-label="Teknik ürün sayfasını aç"><h3>Teknik Bilgi</h3><p>Teknik Ürün Sayfasını Aç</p></${tag}>`;
  }

  function renderCategoryList() {
    const technicalSources = browser.previousElementSibling;
    if (technicalSources?.classList.contains('split-layout')) {
      browser.style.marginTop = '0';
      technicalSources.style.marginTop = '70px';
      browser.after(technicalSources);
    }
    browser.innerHTML = `<div class="catalog-directory-intro"><div class="page-kicker">TÜM ÜRÜNLER</div><h1>Ürün gruplarımız ve alt kategorilerimiz</h1><p>Aradığınız ürün ailesini veya alt kategoriyi seçerek doğrudan ilgili kataloğa ulaşın.</p></div><div class="catalog-directory">${categories.map(categoryDirectory).join('')}</div>`;
  }

  function renderProductCatalog(category) {
    let products = requestedGroup ? category.products.filter(product => product.groupId === requestedGroup) : category.products;
    if (requestedBrand === 'ari') products = products.filter(product => product.groupId?.startsWith('ari-armaturen-'));
    if (requestedBrand === 'ayvaz') products = products.filter(product => product.groupId?.startsWith('ayvaz-'));
    const activeGroupName = products[0]?.group;
    applyCategorySeo(category);
    const heading = requestedBrand === 'ari' ? 'ARI-Armaturen Vanaları' : requestedBrand === 'ayvaz' ? 'Ayvaz Vanaları' : (activeGroupName || category.title);
    const summary = activeGroupName ? `${activeGroupName} ürünleri` : (category.seo?.intro || category.description);
    browser.style.marginTop = '0';
    browser.innerHTML = `<div class="catalog-page-heading"><div><div class="page-kicker">ÜRÜN KATALOĞU</div><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(summary)}</p></div><a class="catalog-page-back" href="kataloglar.html"><i class="fa-solid fa-arrow-left"></i> Tüm kataloglar</a></div><div class="catalog-product-grid">${products.length ? products.map(productCard).join('') : '<p class="catalog-empty">Bu alt kategoride listelenen ürün bulunamadı.</p>'}</div>`;
    document.body.insertAdjacentHTML('beforeend', modalMarkup());
    bindModal({ ...category, products });
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
  }

  function bindModal(category) {
    const modal = document.querySelector('.catalog-product-modal');
    let activeProduct = null;
    let activeImage = 0;
    const updateImage = () => {
      const image = activeProduct.images?.[activeImage] || '';
      modal.querySelector('.catalog-main-image img').src = image;
      modal.querySelector('.catalog-main-image img').alt = activeProduct.name;
      modal.querySelector('.catalog-main-image').classList.toggle('catalog-main-image-empty', !image);
      modal.querySelector('.catalog-thumbnails').innerHTML = (activeProduct.images || []).map((src, index) => `<button type="button" class="catalog-thumbnail ${index === activeImage ? 'is-active' : ''}" data-image-index="${index}" aria-label="${activeProduct.name} görsel ${index + 1}"><img src="${src}" alt=""></button>`).join('');
      modal.querySelectorAll('.catalog-gallery-arrow').forEach(button => { button.hidden = (activeProduct.images || []).length < 2; });
    };
    const closeModal = () => { modal.classList.remove('is-open'); document.body.classList.remove('catalog-modal-open'); };
    const shiftImage = direction => {
      if ((activeProduct.images || []).length > 1) {
        activeImage = (activeImage + direction + activeProduct.images.length) % activeProduct.images.length;
        updateImage();
      }
    };
    browser.addEventListener('click', event => {
      const card = event.target.closest('[data-product-id]');
      if (!card) return;
      activeProduct = category.products.find(product => product.id === card.dataset.productId);
      activeImage = 0;
      modal.querySelector('.catalog-modal-label').textContent = category.title;
      modal.querySelector('.catalog-modal-copy h2').textContent = activeProduct.name;
      modal.querySelector('.catalog-modal-copy p').textContent = activeProduct.description;
      modal.querySelector('.catalog-specifications').innerHTML = renderSpecifications(activeProduct);
      updateImage();
      modal.classList.add('is-open');
      document.body.classList.add('catalog-modal-open');
      modal.querySelector('.catalog-modal-close').focus();
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
  if (selectedCategory) renderProductCatalog(selectedCategory);
  else renderCategoryList();
}());
