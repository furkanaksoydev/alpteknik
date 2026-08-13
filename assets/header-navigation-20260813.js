/* Shared header navigation v20260812.
 * Links marked as # intentionally await a dedicated page or catalogue filter.
 */
(function () {
  'use strict';

  window.AlpHeaderNavigation = {
    toggleMobile(button) {
      const header = button.closest('header');
      const open = header.classList.toggle('nav-active');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    },
    toggleBranch(button) {
      const item = button.parentElement;
      const open = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
      if (window.innerWidth < 993 && open) {
        Array.from(item.parentElement.children).forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('is-open');
            sibling.querySelector(':scope > [data-menu-toggle]')?.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }
  };

  const productMenu = `
    <li class="menu-has-children"><ul class="submenu-panel">
      <li class="menu-group">Ayvaz</li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-kesme-vanalari">Kesme / Küresel Vanalar</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-emniyet-ventilleri">Emniyet Ventilleri</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-manometre-vanalari">Manometre Vanaları</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-balans-vanalari">Balans Vanaları</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-cekvalfler">Çekvalfler</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-hidrolik-kontrol-vanalari">Hidrolik Kontrol Vanaları</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-yuksek-sicaklik-ve-basinc-vanalari">Yüksek Sıcaklık ve Basınç Vanaları</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ayvaz-pislik-tutucular">Pislik Tutucular</a></li>
      <li class="menu-group">ARI Armaturen</li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ari-armaturen-kesme-vanalari">Kesme Vanalar</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ari-armaturen-kontrol-vanalari">Kontrol Vanaları</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ari-armaturen-emniyet-ventilleri">Emniyet Ventilleri</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ari-armaturen-buhar-kapanlari">Buhar Kapanları</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;group=ari-armaturen-aktuator">Aktüatörler</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle onclick="window.AlpHeaderNavigation.toggleBranch(this)" aria-label="Vanalar alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button><a href="kataloglar.html?category=vanalar">Vanalar</a></li>
    <li class="menu-has-children"><ul class="submenu-panel">
      <li><a href="kataloglar.html?category=kompansatorler&amp;group=standart-kompansatorler">Metal / Standart Kompansatörler</a></li>
      <li><a href="kataloglar.html?category=kompansatorler&amp;group=kaucuk-kompansatorler">Kauçuk Kompansatörler</a></li>
      <li><a href="kataloglar.html?category=kompansatorler&amp;group=ozel-kompansatorler">Özel Kompansatörler</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle onclick="window.AlpHeaderNavigation.toggleBranch(this)" aria-label="Kompansatörler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button><a href="kataloglar.html?category=kompansatorler">Kompansatörler</a></li>
    <li class="menu-has-children"><ul class="submenu-panel">
      <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=seviye-gostergeleri">Göstergeler</a></li>
      <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=blof-sistemleri">Blöf Sistemleri</a></li>
      <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=on-off-kontrol-cihazlari">On-Off Kontrol Cihazları</a></li>
      <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=oransal-kontrol-cihazlari">Transmitter</a></li>
      <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=akis-olcerler">Akış Ölçerler</a></li>
      <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=diger-seviye-ekipmanlari">Diğer Ürünler</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle onclick="window.AlpHeaderNavigation.toggleBranch(this)" aria-label="Seviye göstergeleri alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button><a href="kataloglar.html?category=seviye-gostergeleri">Seviye Göstergeleri</a></li>
    <li><a href="kataloglar.html?category=pnomatik">Pnömatik</a></li>
    <!-- Dedicated auxiliary-products page/filter has not been published yet. -->
    <li><a href="#" data-pending-link>Yardımcı Ürünler</a></li>`;

  const menuMarkup = `
    <li class="nav-item"><a href="index.html">Ana Sayfa</a></li>
    <li class="nav-item nav-has-children"><ul class="dropdown-menu">
      <li><a href="hakkimizda.html">Ayvaz</a></li>
      <li><a href="kataloglar.html?category=vanalar&amp;brand=ari">ARI Armaturen</a></li>
      <!-- Samson brand page has not been published yet. -->
      <li><a href="#" data-pending-link>Samson</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle onclick="window.AlpHeaderNavigation.toggleBranch(this)" aria-label="Kurumsal alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button><a href="hakkimizda.html">Kurumsal <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a></li>
    <li class="nav-item nav-has-children"><ul class="dropdown-menu">${productMenu}</ul><button class="nav-toggle" type="button" data-menu-toggle onclick="window.AlpHeaderNavigation.toggleBranch(this)" aria-label="Ürünler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button><a href="kataloglar.html">Ürünler <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a></li>
    <li class="nav-item nav-has-children"><ul class="dropdown-menu">
      <li><a href="kompansator-sistemleri.html">Kompansatör Sistemleri</a></li>
      <li><a href="esnek-metal-hortumlar.html">Esnek Metal Hortumlar</a></li>
      <li><a href="endustriyel-vana-grubu.html">Endüstriyel Vana Grubu</a></li>
      <li><a href="buhar-kondenstop.html">Buhar &amp; Kondenstop</a></li>
      <li><a href="yangin-koruma-sistemleri.html">Yangın Koruma Sistemleri</a></li>
      <li><a href="otomasyon-seviye-kontrol.html">Otomasyon &amp; Seviye Kontrol</a></li>
      <li><a href="kataloglar.html">Dokümanlar &amp; Teknik Kaynaklar</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle onclick="window.AlpHeaderNavigation.toggleBranch(this)" aria-label="Çözümlerimiz alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button><a href="kompansator-sistemleri.html">Çözümlerimiz <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a></li>
    <li class="nav-item"><a href="referanslar.html">Referanslar</a></li>
    <li class="nav-item"><a href="iletisim.html">İletişim</a></li>`;

  function createHeader(header) {
    const isNews = header.classList.contains('news-header');
    const logo = header.querySelector('.logo')?.outerHTML || '<a href="index.html" class="logo">Alp Teknik</a>';
    const themeButton = isNews
      ? '<button class="news-theme theme-btn" onclick="toggleNewsTheme()" aria-label="Temayı değiştir"><i class="fa-solid fa-moon"></i></button>'
      : '<button class="theme-btn" onclick="toggleTheme()" aria-label="Açık/koyu temayı değiştir"><i class="fa-solid fa-moon"></i></button>';
    const actions = `<div class="header-actions">${themeButton}<a href="iletisim.html" class="btn-primary">Teklif İste</a></div>`;
    const innerClass = isNews ? 'container header-navigation-wrap' : 'container nav-wrapper';
    header.classList.add('header-navigation-surface');
    header.innerHTML = `<div class="${innerClass}">${logo}<ul class="nav-links" aria-label="Ana menü">${menuMarkup}</ul>${actions}<button class="mobile-menu-btn" type="button" onclick="window.AlpHeaderNavigation.toggleMobile(this)" aria-label="Menüyü aç" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div>`;
    header.dataset.navigationReady = 'true';

    header.querySelectorAll('[data-pending-link]').forEach(link => link.addEventListener('click', event => event.preventDefault()));
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    header.querySelectorAll(`a[href="${page}"]`).forEach(link => link.classList.add('active-link'));
  }

  function init() {
    document.querySelectorAll('header#header, header.news-header').forEach(createHeader);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
