/* Alp Teknik ürün vitrini: şeritler farklı, rastgele sıralarla kesintisiz döner. */
(function () {
  'use strict';

  const mediaRoot = 'https://media.nevasiteyonetimi.com/alpteknik/r2-alpteknik-urun-gorselleri';
  const galleryItems = [
    { title:'Eksenel Metal Körüklü Kompansatör', group:'Kompansatör Sistemleri', href:'kataloglar.html?category=kompansatorler&group=standart-kompansatorler', image:'kompansatorler/standart-kompansatorler/eksenel-kompansator/eksenel-kompansator-1.png' },
    { title:'Açısal Kompansatör', group:'Özel Çözümler', href:'kataloglar.html?category=kompansatorler&group=ozel-kompansatorler', image:'kompansatorler/ozel-kompansatorler/acisal-kompansatorler/acisal-kompansatorler-1.png' },
    { title:'GV Serisi Glob Vana', group:'Endüstriyel Vanalar', href:'kataloglar.html?category=vanalar&group=ayvaz-kesme-vanalari', image:'vanalar/ayvaz-kesme-vanalari/gv-16-gv-25-gv-40-glob-vanalar/gv-16-gv-25-gv-40-glob-vanalar-1.png' },
    { title:'V-2F/FP Flanşlı Küresel Vana', group:'Akış Kontrolü', href:'kataloglar.html?category=vanalar&group=ayvaz-kesme-vanalari', image:'vanalar/ayvaz-kesme-vanalari/v-2f-fp-flansli-iki-parcali-kuresel-vana/v-2f-fp-flansli-iki-parcali-kuresel-vana-1.png' },
    { title:'BSBV-100 Statik Balans Vanası', group:'Balans Vanaları', href:'kataloglar.html?category=vanalar&group=ayvaz-balans-vanalari', image:'vanalar/ayvaz-balans-vanalari/bsbv-100-statik-balans-vanasi/bsbv-100-statik-balans-vanasi-1.png' },
    { title:'KTS-50 Seviye Tank Şamandırası', group:'Seviye Göstergeleri', href:'kataloglar.html?category=seviye-gostergeleri&group=seviye-gostergeleri', image:'seviye-gostergeleri/seviye-gostergeleri/kts-50-seviye-tank-samandirasi/kts-50-seviye-tank-samandirasi-1.png' },
    { title:'Ayvaz Buhar Sayacı', group:'Akış Ölçerler', href:'kataloglar.html?category=seviye-gostergeleri&group=akis-olcerler', image:'seviye-gostergeleri/akis-olcerler/ayvaz-buhar-sayaci/ayvaz-buhar-sayaci-1.png' },
    { title:'AU-20 Rotlu Seviye Şalteri', group:'Oransal Kontrol', href:'kataloglar.html?category=seviye-gostergeleri&group=oransal-kontrol-cihazlari', image:'seviye-gostergeleri/oransal-kontrol-cihazlari/au-20-rotlu-seviye-salteri/au-20-rotlu-seviye-salteri-1.png' }
  ];

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const card = (item, duplicate) => `<a class="alp-gallery-card" href="${item.href}"${duplicate ? ' aria-hidden="true" tabindex="-1"' : ''}><img src="${mediaRoot}/${item.image}" alt="${duplicate ? '' : escapeHtml(item.title)}" loading="lazy"><span class="alp-gallery-card-content"><span>${escapeHtml(item.group)}</span><strong>${escapeHtml(item.title)}</strong><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></a>`;

  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function differentOrder(reference) {
    let candidate = shuffle(galleryItems);
    for (let attempt = 0; attempt < 8 && candidate.some((item, index) => item.image === reference[index].image); attempt += 1) candidate = shuffle(galleryItems);
    return candidate.some((item, index) => item.image === reference[index].image) ? [...reference.slice(1), reference[0]] : candidate;
  }

  function populate(track, items) {
    track.innerHTML = items.map(item => card(item, false)).join('') + items.map(item => card(item, true)).join('');
  }

  function init() {
    const tracks = document.querySelectorAll('[data-alp-gallery-track]');
    if (tracks.length < 2) return;
    const upperItems = shuffle(galleryItems);
    populate(tracks[0], upperItems);
    populate(tracks[1], differentOrder(upperItems));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
