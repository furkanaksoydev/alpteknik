/* Shared header navigation v20260812.
 * Links marked as # intentionally await a dedicated page or catalogue filter.
 */
(function () {
  'use strict';

  const productMenu = `
    <li class="menu-has-children"><ul class="submenu-panel">
      <li class="menu-group">ARI Armaturen</li>
      <li><a href="kataloglar.html?category=ari-armaturen">Kesme Vanalar</a></li>
      <li><a href="kataloglar.html?category=ari-armaturen">Kontrol Vanaları</a></li>
      <li><a href="kataloglar.html?category=ari-armaturen">Emniyet Ventilleri</a></li>
      <li><a href="kataloglar.html?category=ari-armaturen">Buhar Kapanları</a></li>
      <li><a href="kataloglar.html?category=ari-armaturen">Aktüatörler</a></li>
      <li class="menu-group">Ayvaz</li>
      <li><a href="endustriyel-vana-grubu.html">Kesme / Küresel Vanalar</a></li>
      <li><a href="endustriyel-vana-grubu.html">Emniyet Ventilleri</a></li>
      <li><a href="endustriyel-vana-grubu.html">Manometre Vanaları</a></li>
      <li><a href="endustriyel-vana-grubu.html">Balans Vanaları</a></li>
      <li><a href="endustriyel-vana-grubu.html">Çekvalfler</a></li>
      <li><a href="endustriyel-vana-grubu.html">Hidrolik Kontrol Vanaları</a></li>
      <li><a href="endustriyel-vana-grubu.html">Yüksek Sıcaklık ve Basınç Vanaları</a></li>
      <li><a href="endustriyel-vana-grubu.html">Pislik Tutucular</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle aria-label="Vanalar alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button><a href="endustriyel-vana-grubu.html">Vanalar</a></li>
    <li class="menu-has-children"><ul class="submenu-panel">
      <li><a href="kompansator-sistemleri.html">Metal / Standart Kompansatörler</a></li>
      <li><a href="kompansator-sistemleri.html">Kauçuk Kompansatörler</a></li>
      <li><a href="kompansator-sistemleri.html">Özel Kompansatörler</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle aria-label="Kompansatörler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button><a href="kompansator-sistemleri.html">Kompansatörler</a></li>
    <li class="menu-has-children"><ul class="submenu-panel">
      <li><a href="kataloglar.html?category=seviye-kontrol">Göstergeler</a></li>
      <li><a href="otomasyon-seviye-kontrol.html">Blöf Sistemleri</a></li>
      <li><a href="kataloglar.html?category=seviye-kontrol">On-Off Kontrol Cihazları</a></li>
      <li><a href="kataloglar.html?category=seviye-kontrol">Transmitter</a></li>
      <li><a href="kataloglar.html?category=seviye-kontrol">Akış Ölçerler</a></li>
      <li><a href="kataloglar.html?category=seviye-kontrol">Diğer Ürünler</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle aria-label="Seviye göstergeleri alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button><a href="kataloglar.html?category=seviye-kontrol">Seviye Göstergeleri</a></li>
    <li><a href="kataloglar.html?category=pnomatik">Pnömatik</a></li>
    <!-- Dedicated auxiliary-products page/filter has not been published yet. -->
    <li><a href="#" data-pending-link>Yardımcı Ürünler</a></li>`;

  const menuMarkup = `
    <li class="nav-item"><a href="index.html">Ana Sayfa</a></li>
    <li class="nav-item nav-has-children"><ul class="dropdown-menu">
      <li><a href="hakkimizda.html">Ayvaz</a></li>
      <li><a href="kataloglar.html?category=ari-armaturen">ARI Armaturen</a></li>
      <!-- Samson brand page has not been published yet. -->
      <li><a href="#" data-pending-link>Samson</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle aria-label="Kurumsal alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button><a href="hakkimizda.html">Kurumsal <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a></li>
    <li class="nav-item nav-has-children"><ul class="dropdown-menu">${productMenu}</ul><button class="nav-toggle" type="button" data-menu-toggle aria-label="Ürünler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button><a href="kataloglar.html">Ürünler <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a></li>
    <li class="nav-item nav-has-children"><ul class="dropdown-menu">
      <li><a href="kompansator-sistemleri.html">Kompansatör Sistemleri</a></li>
      <li><a href="esnek-metal-hortumlar.html">Esnek Metal Hortumlar</a></li>
      <li><a href="endustriyel-vana-grubu.html">Endüstriyel Vana Grubu</a></li>
      <li><a href="buhar-kondenstop.html">Buhar &amp; Kondenstop</a></li>
      <li><a href="yangin-koruma-sistemleri.html">Yangın Koruma Sistemleri</a></li>
      <li><a href="otomasyon-seviye-kontrol.html">Otomasyon &amp; Seviye Kontrol</a></li>
      <li><a href="kataloglar.html">Dokümanlar &amp; Teknik Kaynaklar</a></li>
    </ul><button class="nav-toggle" type="button" data-menu-toggle aria-label="Çözümlerimiz alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button><a href="kompansator-sistemleri.html">Çözümlerimiz <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a></li>
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
    header.innerHTML = `<div class="${innerClass}">${logo}<ul class="nav-links" aria-label="Ana menü">${menuMarkup}</ul>${actions}<button class="mobile-menu-btn" type="button" aria-label="Menüyü aç" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div>`;
    header.dataset.navigationReady = 'true';

    const mobileButton = header.querySelector('.mobile-menu-btn');
    mobileButton.addEventListener('click', () => {
      const open = header.classList.toggle('nav-active');
      mobileButton.setAttribute('aria-expanded', String(open));
      mobileButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });

    header.querySelectorAll('[data-menu-toggle]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
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
      });
    });

    header.querySelectorAll('[data-pending-link]').forEach(link => link.addEventListener('click', event => event.preventDefault()));
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    header.querySelectorAll(`a[href="${page}"]`).forEach(link => link.classList.add('active-link'));
  }

  function init() {
    document.querySelectorAll('header#header, header.news-header').forEach(createHeader);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
