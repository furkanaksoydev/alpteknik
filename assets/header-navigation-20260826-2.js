/* Shared site header: accessible desktop menus and mobile accordions. */
(function () {
  'use strict';

  const productMenu = `
    <li class="menu-has-children">
      <a href="kataloglar.html?category=vanalar">Vanalar</a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Vanalar alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
      <ul class="submenu-panel">
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
        <li class="submenu-all"><a href="kataloglar.html?category=vanalar">Tüm vanaları görüntüle <i class="fa-solid fa-arrow-right"></i></a></li>
      </ul>
    </li>
    <li class="menu-has-children">
      <a href="kataloglar.html?category=kompansatorler">Kompansatörler</a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Kompansatörler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
      <ul class="submenu-panel">
        <li><a href="kataloglar.html?category=kompansatorler&amp;group=standart-kompansatorler">Metal / Standart Kompansatörler</a></li>
        <li><a href="kataloglar.html?category=kompansatorler&amp;group=kaucuk-kompansatorler">Kauçuk Kompansatörler</a></li>
        <li><a href="kataloglar.html?category=kompansatorler&amp;group=ozel-kompansatorler">Özel Kompansatörler</a></li>
        <li class="submenu-all"><a href="kataloglar.html?category=kompansatorler">Tüm kompansatörleri görüntüle <i class="fa-solid fa-arrow-right"></i></a></li>
      </ul>
    </li>
    <li class="menu-has-children">
      <a href="kataloglar.html?category=seviye-gostergeleri">Seviye Göstergeleri</a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Seviye göstergeleri alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
      <ul class="submenu-panel">
        <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=seviye-gostergeleri">Göstergeler</a></li>
        <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=blof-sistemleri">Blöf Sistemleri</a></li>
        <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=on-off-kontrol-cihazlari">On-Off Kontrol Cihazları</a></li>
        <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=oransal-kontrol-cihazlari">Transmitter</a></li>
        <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=akis-olcerler">Akış Ölçerler</a></li>
        <li><a href="kataloglar.html?category=seviye-gostergeleri&amp;group=diger-seviye-ekipmanlari">Diğer Ürünler</a></li>
        <li class="submenu-all"><a href="kataloglar.html?category=seviye-gostergeleri">Tüm seviye ürünlerini görüntüle <i class="fa-solid fa-arrow-right"></i></a></li>
      </ul>
    </li>
    <li><a href="kataloglar.html?category=pnomatik">Pnömatik</a></li>
    <li class="menu-has-children">
      <a href="kataloglar.html?category=fittings-malzemeler">Fittings Malzemeler</a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Fittings malzemeler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
      <ul class="submenu-panel submenu-panel--fittings">
        <li><a href="https://media.nevasiteyonetimi.com/alpteknik/dokumanlar/alp-teknik-kaynaklilar.pdf" target="_blank" rel="noopener noreferrer">Kaynaklılar</a></li>
        <li><a href="https://media.nevasiteyonetimi.com/alpteknik/dokumanlar/alp-teknik-disliler.pdf" target="_blank" rel="noopener noreferrer">Dişliler</a></li>
        <li class="menu-has-children">
          <a href="#inox-kaynakli">İnox Kaynaklı</a>
          <button class="nav-toggle" type="button" data-menu-toggle aria-label="İnox kaynaklı alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
          <ul class="submenu-panel">
            <li><a href="#inox-kaynakli-dirsek">Dirsek</a></li>
            <li><a href="#inox-kaynakli-te">Te</a></li>
            <li><a href="#inox-kaynakli-reduksiyon">Redüksiyon</a></li>
          </ul>
        </li>
        <li class="menu-has-children">
          <a href="#inox-disli">İnox Dişli</a>
          <button class="nav-toggle" type="button" data-menu-toggle aria-label="İnox dişli alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
          <ul class="submenu-panel">
            <li><a href="#inox-disli-dirsek">Dirsek</a></li>
            <li><a href="#inox-disli-te">Te</a></li>
            <li><a href="#inox-disli-reduksiyon">Redüksiyon</a></li>
            <li><a href="#inox-disli-rekor">Rekor</a></li>
            <li><a href="#inox-disli-hortum-rakoru">Hortum Rakoru</a></li>
          </ul>
        </li>
        <li><a href="https://media.nevasiteyonetimi.com/alpteknik/dokumanlar/alp-teknik-pirinc-malzemeler.pdf" target="_blank" rel="noopener noreferrer">Pirinç Malzemeler</a></li>
        <li><a href="https://media.nevasiteyonetimi.com/alpteknik/dokumanlar/alp-teknik-yangin-urunleri.pdf" target="_blank" rel="noopener noreferrer">Yangın Ürünleri</a></li>
        <li><a href="kataloglar.html?category=fittings-malzemeler&amp;group=contalar">Contalar</a></li>
        <li class="submenu-all"><a href="kataloglar.html?category=fittings-malzemeler">Tüm fittings malzemelerini görüntüle <i class="fa-solid fa-arrow-right"></i></a></li>
      </ul>
    </li>
    <li class="menu-has-children">
      <a href="kataloglar.html?category=pompalar">Pompalar</a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Pompalar alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
      <ul class="submenu-panel submenu-panel--pumps">
        <li class="menu-has-children">
          <a href="kataloglar.html?category=pompalar&amp;brand=sempa">Sempa</a>
          <button class="nav-toggle" type="button" data-menu-toggle aria-label="Sempa alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
          <ul class="submenu-panel">
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-uctan-emisli-pompalar">Uçtan Emişli Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-cok-kademeli-pompalar">Çok Kademeli Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-atik-su-pompalari">Atık Su Pompaları</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-in-line-pompalar">In-Line Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-bolunebilir-govdeli-pompalar">Bölünebilir Gövdeli Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-kendinden-emisli-pompalar">Kendinden Emişli Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-hidrofor-pompalari">Hidrofor Pompaları</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=sempa&amp;group=sempa-yangin-sondurme-pompalari">Yangın Söndürme Pompaları</a></li>
          </ul>
        </li>
        <li class="menu-has-children">
          <a href="kataloglar.html?category=pompalar&amp;brand=etna">Etna</a>
          <button class="nav-toggle" type="button" data-menu-toggle aria-label="Etna alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
          <ul class="submenu-panel">
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-kucuk-konutsal-urunler">Küçük Konutsal Ürünler</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-sirkulasyon-pompasi">Sirkülasyon Pompası</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-santrifuj-pompa">Santrifüj Pompa</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-hidrofor-sistemleri">Hidrofor Sistemleri</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-atik-su-ve-drenaj-pompasi">Atık Su ve Drenaj Pompası</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-atik-su-tahliye-unitesi">Atık Su Tahliye Ünitesi</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-yanginla-mucadele-sistemleri">Yangınla Mücadele Sistemleri</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-koruma-kontrol-panolari">Koruma &amp; Kontrol Panoları</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=etna&amp;group=etna-aksesuarlar">Aksesuarlar</a></li>
          </ul>
        </li>
        <li class="menu-has-children">
          <a href="kataloglar.html?category=pompalar&amp;brand=lowara">Lowara</a>
          <button class="nav-toggle" type="button" data-menu-toggle aria-label="Lowara alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-right"></i></button>
          <ul class="submenu-panel">
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-tek-kademeli-pompalar">Tek Kademeli Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-cok-kademeli-pompalar">Çok Kademeli Pompalar</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-isitma-sogutma-ve-iklimlendirme-pompalari">Isıtma, Soğutma ve İklimlendirme Pompaları</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-drenaj-ve-atiksu-pompalari">Drenaj ve Atıksu Pompaları</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-atik-su-tahliye-sistemleri">Atık Su Tahliye Sistemleri</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-derinkuyu-pompalari">Derinkuyu Pompaları</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-hidrofor-sistemleri">Hidrofor Sistemleri</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-pompa-kontrol-sistemleri">Pompa Kontrol Sistemleri</a></li>
            <li><a href="kataloglar.html?category=pompalar&amp;brand=lowara&amp;group=lowara-pompa-ve-sistem-aksesuarlari">Pompa ve Sistem Aksesuarları</a></li>
          </ul>
        </li>
        <li class="submenu-all"><a href="kataloglar.html?category=pompalar">Tüm pompaları görüntüle <i class="fa-solid fa-arrow-right"></i></a></li>
      </ul>
    </li>
    <li><a href="https://media.nevasiteyonetimi.com/alpteknik/dokumanlar/alp-teknik-monometreler.pdf" target="_blank" rel="noopener noreferrer">Monometreler</a></li>`;

  const menuMarkup = `
    <li class="nav-item"><a href="index.html">Ana Sayfa</a></li>
    <li class="nav-item"><a href="hakkimizda.html">Kurumsal</a></li>
    <li class="nav-item nav-has-children">
      <a href="kataloglar.html" aria-haspopup="true" aria-expanded="false">Ürünler <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Ürünler alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button>
      <ul class="dropdown-menu">${productMenu}</ul>
    </li>
    <li class="nav-item nav-has-children">
      <a href="kompansator-sistemleri.html">Çözümlerimiz <i class="fa-solid fa-angle-down" aria-hidden="true"></i></a>
      <button class="nav-toggle" type="button" data-menu-toggle aria-label="Çözümlerimiz alt menüsünü aç" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button>
      <ul class="dropdown-menu">
        <li><a href="kompansator-sistemleri.html">Kompansatör Sistemleri</a></li>
        <li><a href="esnek-metal-hortumlar.html">Esnek Metal Hortumlar</a></li>
        <li><a href="endustriyel-vana-grubu.html">Endüstriyel Vana Grubu</a></li>
        <li><a href="buhar-kondenstop.html">Buhar &amp; Kondenstop</a></li>
        <li><a href="yangin-koruma-sistemleri.html">Yangın Koruma Sistemleri</a></li>
        <li><a href="otomasyon-seviye-kontrol.html">Otomasyon &amp; Seviye Kontrol</a></li>
        <li><a href="kataloglar.html">Dokümanlar &amp; Teknik Kaynaklar</a></li>
      </ul>
    </li>
    <li class="nav-item"><a href="referanslar.html">Referanslar</a></li>
    <li class="nav-item"><a href="iletisim.html">İletişim</a></li>`;

  function closeSiblingBranches(item) {
    Array.from(item.parentElement.children).forEach(sibling => {
      if (sibling === item) return;
      sibling.classList.remove('is-open');
      sibling.querySelector(':scope > [data-menu-toggle]')?.setAttribute('aria-expanded', 'false');
    });
  }

  function toggleBranch(button) {
    const item = button.parentElement;
    const open = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    if (window.innerWidth < 993 && open) closeSiblingBranches(item);
  }

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

    header.querySelector('.mobile-menu-btn').addEventListener('click', event => {
      const open = header.classList.toggle('nav-active');
      event.currentTarget.setAttribute('aria-expanded', String(open));
      event.currentTarget.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    header.querySelectorAll('[data-menu-toggle]').forEach(button => button.addEventListener('click', () => toggleBranch(button)));
    header.querySelectorAll('.nav-has-children > a, .dropdown-menu .menu-has-children > a').forEach(link => {
      link.addEventListener('click', event => {
        if (window.innerWidth >= 993) return;
        event.preventDefault();
        toggleBranch(link.parentElement.querySelector(':scope > [data-menu-toggle]'));
      });
    });

    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    header.querySelectorAll(`a[href="${page}"]`).forEach(link => link.classList.add('active-link'));
  }

  function init() {
    document.querySelectorAll('header#header, header.news-header').forEach(createHeader);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
