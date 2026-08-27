/* Alp Teknik vana vitrini: Ayvaz, ARI-Armaturen ve SAMSON ürün havuzundan iki farklı rastgele bant oluşturur. */
(function () {
  'use strict';

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[character]);
  const shuffle = items => {
    const output = [...items];
    for (let index = output.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [output[index], output[swap]] = [output[swap], output[index]];
    }
    return output;
  };
  const brandOf = product => product.brand || (product.group.startsWith('ARI-') ? 'ARI Armaturen' : 'Ayvaz');
  const card = (item, duplicate) => `<a class="alp-gallery-card" href="${item.href}"${duplicate ? ' aria-hidden="true" tabindex="-1"' : ''}><img src="${item.image}" alt="${duplicate ? '' : escapeHtml(item.title)}" loading="lazy"><span class="alp-gallery-card-content"><span>${escapeHtml(item.brand)} · ${escapeHtml(item.group)}</span><strong>${escapeHtml(item.title)}</strong><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></a>`;
  const populate = (track, items) => { track.innerHTML = items.map(item => card(item, false)).join('') + items.map(item => card(item, true)).join(''); };

  function init() {
    const tracks = document.querySelectorAll('[data-alp-gallery-track]');
    const valves = window.catalogData?.categories?.find(category => category.id === 'vanalar')?.products || [];
    if (tracks.length < 2 || !valves.length) return;

    const candidates = valves.filter(product => product.images?.[0]).map(product => ({
      id: product.id,
      title: product.name,
      brand: brandOf(product),
      group: product.group.replace(/^(Ayvaz|ARI-Armaturen|Samson)\\s*/, ''),
      href: `kataloglar.html?category=vanalar&brand=${encodeURIComponent(brandOf(product))}&group=${encodeURIComponent(product.groupId)}`,
      image: product.images[0]
    }));
    const brands = ['Ayvaz', 'ARI Armaturen', 'Samson'];
    const upper = [];
    const lower = [];
    brands.forEach(brand => {
      const selection = shuffle(candidates.filter(item => item.brand === brand));
      upper.push(...selection.slice(0, 12));
      lower.push(...selection.slice(12, 24));
    });
    populate(tracks[0], shuffle(upper));
    populate(tracks[1], shuffle(lower));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
