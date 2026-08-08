/*
 * Katalog veri kaynağı.
 * Yeni bir ürün eklemek için ilgili kategorinin products dizisine
 * [klasör-adı, ürün-adı, dosya-uzantıları] biçiminde bir satır eklemek yeterlidir.
 * Teknik değerler yalnızca üretici kaynağında doğrulanabilen ürünlere eklenir.
 */
window.catalogSettings = { previewLimit: null };

(function () {
  const imageRoot = 'site içi görseller';
  const imageList = (category, id, formats) => formats.split(',').map((extension, index) =>
    [imageRoot, category, id, `${id}${index + 1}.${extension}`].map(encodeURIComponent).join('/')
  );

  const copyByCategory = {
    'ari-armaturen': name => `${name}; buhar, sıcak su ve proses hatlarında güvenilir akış yönetimi için kullanılan ARI-Armaturen ürün grubunun parçasıdır. Uygun gövde malzemesi, bağlantı standardı, anma çapı, basınç ve sıcaklık aralığı; tesisatın çalışma koşullarıyla birlikte değerlendirilerek seçilmelidir.`,
    'boru-ve-baglanti-elemanlari': name => `${name}, boru hattının montajı, yönlendirilmesi veya güvenli şekilde sonlandırılması için kullanılan bir bağlantı elemanıdır. Malzeme türü, et kalınlığı, bağlantı şekli ve çap seçimi; akışkan, çalışma basıncı ve uygulanacak tesisat standardına göre proje bazında doğrulanmalıdır.`,
    'endustriyel-vanalar': name => `${name}; proses hattında akışı kesmek, yönlendirmek veya kontrol etmek üzere seçilen endüstriyel vana çözümüdür. Aktüatör, bağlantı tipi, gövde malzemesi ve sızdırmazlık elemanları; akışkanın özellikleri ile basınç, sıcaklık ve otomasyon ihtiyacına göre belirlenmelidir.`,
    'pnomatik': name => `${name}, basınçlı hava sistemlerinde güvenli bağlantı, kontrollü hareket veya sinyal iletimi sağlamak için kullanılır. Hortum çapı, bağlantı dişi, çalışma basıncı, ortam sıcaklığı ve hava kalitesi; ekipmanın uygulamaya uygun seçiminde birlikte değerlendirilmelidir.`,
    'seviye-kontrol': name => `${name}; tank, kazan ve proses ekipmanlarında seviye izleme veya kontrol ihtiyacını destekleyen bir çözümdür. Akışkan türü, montaj yönü, basınç, sıcaklık, kontak gereksinimi ve bağlantı şekli projeye göre teyit edilerek seçilmelidir.`
  };

  const manufacturerData = {
    'astra-plus-debi-regulasyon-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-astra-astra-plus-akis-kontrol-vanasi/',
      specs: [['Bağlantı', 'Flanşlı ve dişli'], ['Anma çapı', 'DN15 (1/2″) – DN400 (16″)'], ['Basınç sınıfı', 'PN16'], ['Maksimum sıcaklık', '120 °C, 175 °C, 200 °C ve 350 °C (modele göre)']]
    },
    'cona-b-600-bimetalik-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-b-bimetalik-buhar-kapani-kondenstop/',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN50 (2″)'], ['Bağlantı', 'Dişli, flanşlı, soket kaynak boyunlu, alın kaynak boyunlu'], ['Kontrolör fark basıncı', '13 bar – 320 bar (kontrolöre göre)'], ['Maksimum sıcaklık', '300 °C – 550 °C (figüre göre)']]
    },
    'cona-s-631a-samandirali-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-s-samandirali-buhar-kapani-kondenstop/',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN100 (4″)'], ['Basınç sınıfları', 'PN16, PN40, PN63, PN100 ve PN160'], ['Bağlantı', 'Dişli, flanşlı, soket kaynak boyunlu ve alın kaynak boyunlu'], ['Montaj', 'Yatay veya düşey; standart akış yukarıdan aşağı']]
    },
    'cona-sc-634-samandirali-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-sc-samandirali-buhar-kapani-kondenstop/',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN25 (1″)'], ['Basınç sınıfları', 'PN16, PN25 ve PN40'], ['Bağlantı', 'Dişli, flanşlı, soket kaynak boyunlu ve alın kaynak boyunlu'], ['Kontrolör fark basıncı', '4 bar, 14 bar, 21 bar veya 32 bar']]
    },
    'cona-td-641-termodinamik-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-td-termodinamik-buhar-kapani-kondenstop/',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN25 (1″)'], ['Basınç sınıfları', 'PN40 ve PN63'], ['Kontrolör fark basıncı', '32 bar veya 42 bar'], ['Maksimum sıcaklık', '400 °C veya 450 °C (figüre göre)']]
    },
    'dp32-34-pnomatik-aktuator': { sourceUrl: 'https://www.ayvaz.com/urun/pnomatik-aktuator-tek-etkili/' },
    'euro-wedi-kesme-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-euro-wedi-yumusak-contali-kesme-vanasi/',
      specs: [['Bağlantı', 'Flanşlı ve dişli'], ['Anma çapı', 'DN15 (1/2″) – DN200 (8″)'], ['Basınç sınıfı', 'PN6 ve PN16'], ['Maksimum sıcaklık', '120 °C']]
    },
    'predu-basinc-dusurucu': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-predu-direkt-tesirli-denge-koruklu-basinc-dusurucu/',
      specs: [['Bağlantı', 'Flanşlı'], ['Anma çapı', 'DN15 (1/2″) – DN150 (6″)'], ['Basınç sınıfları', 'PN16, PN25 ve PN40'], ['Maksimum sıcaklık', '300 °C – 450 °C (gövde malzemesine göre)']]
    },
    'schmutzfaenger-pislik-tutucu': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-pislik-tutucu/',
      specs: [['Bağlantı', 'Flanşlı ve alın kaynak boyunlu'], ['Anma çapı', 'DN15 (1/2″) – DN500 (18″)'], ['Basınç sınıfları', 'PN16, PN25 ve PN40'], ['Filtre', 'Paslanmaz çelik']]
    },
    'stevi-405-dp-kontrol-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-stevi-405-460-serisi-aktuatorlu-kesme-vanasi-en/',
      specs: [['Bağlantı', 'Flanşlı'], ['Anma çapı', 'DN15 (1/2″) – DN500 (20″)'], ['Maksimum basınç', '16 bar, 25 bar veya 40 bar (gövde malzemesine göre)'], ['Maksimum sıcaklık', '300 °C – 450 °C (gövde malzemesine göre)']]
    },
    'stevi-440-premio-kontrol-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-stevi-smart-440-441-serisi-2-yollu-kontrol-vanasi/',
      specs: [['Bağlantı', 'Flanşlı'], ['Anma çapı', 'DN15 (1/2″) – DN150 (6″)'], ['Maksimum basınç', '16 bar, 25 bar veya 40 bar (gövde malzemesine göre)'], ['Maksimum sıcaklık', '300 °C – 450 °C (gövde malzemesine göre)']]
    },
    'stobu-kesme-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-stobu-baskili-tip-kesme-vanasi/',
      specs: [['Bağlantı', 'Flanşlı ve alın kaynak boyunlu'], ['Anma çapı', 'DN15 (1/2″) – DN500 (20″)'], ['Basınç sınıfları', 'PN16, PN25 ve PN40'], ['Maksimum sıcaklık', '300 °C – 450 °C (gövde malzemesine göre)']]
    },
    'stobu-pn160-yuksek-basinc-kesme-vanasi': { sourceUrl: 'https://www.ayvaz.com/urun/ari-stobu-baskili-tip-kesme-vanasi/' },
    'temptrol-sicaklik-kontrol-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-temptrol-sicaklik-kontroloru/',
      specs: [['Bağlantı', 'Flanşlı ve dişli'], ['Anma çapı', 'DN15 (1/2″) – DN100 (4″)'], ['Maksimum basınç', '16 bar, 25 bar veya 40 bar (gövde malzemesine göre)'], ['Maksimum sıcaklık', '300 °C – 450 °C (gövde malzemesine göre)']]
    },
    'ziva-z-kesme-vanasi': { sourceUrl: 'https://www.ayvaz.com/urun/ari-ziva-z-wafer-tip-kelebek-vana/' },
    'boru-kepi': { sourceUrl: 'https://www.ayvaz.com/urun/kep/' },
    'konsantrik-reduksiyon': { sourceUrl: 'https://www.ayvaz.com/urun/konsantrik-reduksiyon-disli-tip/' },
    'siyah-disli-reduksiyon': { sourceUrl: 'https://www.ayvaz.com/urun/konsantrik-reduksiyon-disli-tip/' },
    'pilot-tesirli-basinc-dusurucu': { sourceUrl: 'https://www.ayvaz.com/urun/bdv-50-pilot-tesirli-basinc-dusurucu/' },
    'aeld-11-seviye-izleme-gostergesi': {
      sourceUrl: 'https://www.ayvaz.com/urun/aeld-11-seviye-gostergesi/',
      specs: [['Boru malzemesi', 'Cam veya plexi'], ['Çalışma sıcaklığı', '60 °C (cam) / 100 °C (plexi)'], ['İşletme basıncı', '2 bar (cam) / 3 bar (plexi)'], ['Rakor malzemesi', 'Nikel kaplı pirinç veya plastik; paslanmaz bağlantı opsiyonlu']]
    },
    'eg-11-seviye-olcum-cihazi': { sourceUrl: 'https://www.ayvaz.com/urun/eg-11-seviye-olcum-cihazi/' },
    'kablolu-seviye-salteri': { sourceUrl: 'https://www.ayvaz.com/urun/kablolu-seviye-salteri/' },
    'kazan-tagdiye-cihazi': {
      sourceUrl: 'https://www.ayvaz.com/urun/kazan-tagdiye-cihazi/',
      specs: [['Bağlantı', 'Dişli veya flanşlı'], ['Maksimum basınç', '25 bar'], ['Maksimum çalışma sıcaklığı', '200 °C'], ['Uygulama', 'Buhar kazanları ve hidroforlar']]
    },
    'kts-50-seviye-tank-samandirasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/kts-50-seviye-tank-samandirasi/',
      specs: [['Malzeme', 'AISI 304, komple paslanmaz çelik temas yüzeyli'], ['Bağlantı', 'Dişli (3/4″)'], ['Maksimum basınç', '6 bar'], ['Maksimum çalışma sıcaklığı', '90 °C']]
    },
    'manyetik-seviye-gostergesi': { sourceUrl: 'https://www.ayvaz.com/urun/mg-33-seviye-gostergesi/' },
    'mg-33sv-seviye-gostergesi': { sourceUrl: 'https://www.ayvaz.com/urun/mg-33sv-seviye-gostergesi/' },
    'rotlu-seviye-salteri': {
      sourceUrl: 'https://www.ayvaz.com/urun/au-20-rotlu-seviye-salteri/',
      specs: [['Gövde', 'AISI 304 paslanmaz çelik; AISI 316 opsiyonlu'], ['Çalışma sıcaklığı', '-10 °C / +125 °C'], ['Maksimum çalışma basıncı', '16 bar'], ['Bağlantı', 'BSP veya NPT dişli; minimum 3/8″'], ['Koruma sınıfı', 'IP68 + EX-PROOF']]
    },
    'seviye-kontrol-paneli': { sourceUrl: 'https://www.ayvaz.com/urun/ask-p3-p4-seviye-kontrol-cihazi/' },
    'seviye-samandirasi': { sourceUrl: 'https://www.ayvaz.com/urun/kts-50-seviye-tank-samandirasi/' }
  };

  const makeProduct = (category, [id, name, formats]) => ({
    id,
    name,
    description: copyByCategory[category](name),
    images: imageList(category, id, formats),
    ...(manufacturerData[id] || {})
  });

  const categories = [
    {
      id: 'ari-armaturen', title: 'ARI-Armaturen',
      description: 'Kontrol, kesme, basınç ve buhar uygulamaları için ARI-Armaturen marka endüstriyel vana, aktüatör ve kondenstop çözümleri.',
      seo: { title: 'ARI-Armaturen Vana ve Kondenstop Ürünleri | Alp Teknik', description: 'ARI-Armaturen kontrol vanası, kesme vanası, aktüatör ve kondenstop ürünlerini Alp Teknik uzmanlığıyla inceleyin.', keywords: 'ARI-Armaturen, kontrol vanası, kesme vanası, kondenstop, aktüatör, endüstriyel vana', intro: 'ARI-Armaturen ürünleri; buhar, sıcak su, HVAC ve proses hatlarında akış kontrolü, basınç yönetimi ve güvenilir kondens tahliyesi için seçilir. Ürün seçimi; çalışma basıncı, sıcaklık, akışkan, bağlantı standardı ve kapasite birlikte değerlendirilerek yapılmalıdır.' },
      products: [
        ['astra-plus-debi-regulasyon-vanasi', 'ASTRA Plus Debi Regülasyon Vanası', 'webp'], ['cona-b-600-bimetalik-kondenstop', 'CONA B 600 Bimetalik Kondenstop', 'webp'], ['cona-s-631a-samandirali-kondenstop', 'CONA S 631A Şamandıralı Kondenstop', 'webp'], ['cona-sc-634-samandirali-kondenstop', 'CONA SC 634 Şamandıralı Kondenstop', 'webp'], ['cona-td-641-termodinamik-kondenstop', 'CONA TD 641 Termodinamik Kondenstop', 'webp'], ['dp32-34-pnomatik-aktuator', 'DP32/34 Pnömatik Aktüatör', 'webp'], ['euro-wedi-kesme-vanasi', 'EURO-WEDI Kesme Vanası', 'webp'], ['predu-basinc-dusurucu', 'PREDU Basınç Düşürücü', 'webp'], ['premio-elektrik-aktuator', 'PREMIO Elektrik Aktüatör', 'webp'], ['preso-basinc-dusurucu', 'PRESO Basınç Düşürücü', 'webp'], ['schmutzfaenger-pislik-tutucu', 'Schmutzfänger Pislik Tutucu', 'webp'], ['stevi-405-dp-kontrol-vanasi', 'STEVI 405 DP Kontrol Vanası', 'webp'], ['stevi-440-premio-kontrol-vanasi', 'STEVI 440 PREMIO Kontrol Vanası', 'webp'], ['stevi-470-dp-sipart-kontrol-vanasi', 'STEVI 470 DP SIPART Kontrol Vanası', 'webp'], ['stevi-as-350-yuksek-basinc-kontrol-vanasi', 'STEVI AS 350 Yüksek Basınç Kontrol Vanası', 'webp'], ['stobu-kesme-vanasi', 'STOBU Kesme Vanası', 'webp'], ['stobu-pn160-yuksek-basinc-kesme-vanasi', 'STOBU PN160 Yüksek Basınç Kesme Vanası', 'webp'], ['temptrol-sicaklik-kontrol-vanasi', 'TEMPTROL Sıcaklık Kontrol Vanası', 'webp'], ['ziva-z-kesme-vanasi', 'ZIVA-Z Kesme Vanası', 'png']
      ]
    },
    {
      id: 'boru-ve-baglanti-elemanlari', title: 'Boru & Bağlantı Elemanları',
      description: 'Boru hatlarının güvenli, sızdırmaz ve uygulamaya uygun kurulumu için flanş, fitting, nipel, dirsek ve redüksiyon ürünleri.',
      seo: { title: 'Boru ve Bağlantı Elemanları | Alp Teknik', description: 'Flanş, fitting, nipel, dirsek, redüksiyon ve boru kepi ürünlerini uygulamanıza uygun çözümlerle inceleyin.', keywords: 'flanş, fitting, nipel, boru kepi, dirsek, redüksiyon, tesisat malzemeleri', intro: 'Boru ve bağlantı elemanları tesisat hatlarında sızdırmazlık, montaj güvenliği ve servis erişimi için kritik rol oynar. Bağlantı elemanı seçimi; boru çapı, bağlantı tipi, çalışma basıncı, akışkan ve malzeme uyumuna göre yapılmalıdır.' },
      products: [
        ['boru-kepi', 'Boru Kepi', 'png'], ['duz-flans', 'Düz Flanş', 'webp'], ['galvaniz-nipel', 'Galvaniz Nipel', 'jpeg,webp'], ['kaynak-boyunlu-flans', 'Kaynak Boyunlu Flanş', 'gif'], ['konsantrik-reduksiyon', 'Konsantrik Redüksiyon', 'jpeg'], ['paslanmaz-disli-dirsek', 'Paslanmaz Dişli Dirsek', 'jpeg'], ['paslanmaz-disli-te', 'Paslanmaz Dişli Te', 'webp'], ['paslanmaz-fittings', 'Paslanmaz Fittings', 'jpeg'], ['paslanmaz-konik-disli-rekor', 'Paslanmaz Konik Dişli Rekor', 'jpeg'], ['paslanmaz-patent-te', 'Paslanmaz Patent Te', 'jpeg'], ['patent-dirsek', 'Patent Dirsek', 'png'], ['siyah-disli-flans', 'Siyah Dişli Flanş', 'webp'], ['siyah-disli-reduksiyon', 'Siyah Dişli Redüksiyon', 'webp'], ['siyah-kor-tapa', 'Siyah Kör Tapa', 'jpeg']
      ]
    },
    {
      id: 'endustriyel-vanalar', title: 'Endüstriyel Vanalar',
      description: 'Proses hatlarında akışı kesmek, yönlendirmek, kontrol etmek ve çalışma basıncını güvenle yönetmek için vana çözümleri.',
      seo: { title: 'Endüstriyel Vanalar | Alp Teknik', description: 'Kontrol, motorlu, pnömatik, kesme ve basınç düşürücü vana çözümlerini inceleyin.', keywords: 'endüstriyel vana, kontrol vanası, motorlu vana, pnömatik vana, basınç düşürücü', intro: 'Endüstriyel vanalar; sıvı, gaz ve buhar hatlarında akışı kesmek, modüle etmek veya belirli proses koşullarında sabit tutmak için kullanılır. Seçimde debi, basınç farkı, sıcaklık, bağlantı standardı ve otomasyon ihtiyacı dikkate alınmalıdır.' },
      products: [
        ['elastik-salmastrali-kesme-vanasi', 'Elastik Salmastralı Kesme Vanası', 'jpeg'], ['kontrol-vanasi', 'Kontrol Vanası', 'jpeg,jpeg,jpeg'], ['motorlu-kontrol-vanasi', 'Motorlu Kontrol Vanası', 'jpeg'], ['motorlu-vana', 'Motorlu Vana', 'jpeg,jpeg,jpeg,jpeg'], ['pilot-tesirli-basinc-dusurucu', 'Pilot Tesirli Basınç Düşürücü', 'jpeg'], ['pnomatik-kontrol-vanasi', 'Pnömatik Kontrol Vanası', 'jpeg,jpeg'], ['pnomatik-pistonlu-vana', 'Pnömatik Pistonlu Vana', 'jpeg,jpeg'], ['termostatik-vana', 'Termostatik Vana', 'jpeg']
      ]
    },
    {
      id: 'pnomatik', title: 'Pnömatik Sistemler',
      description: 'Basınçlı hava hatları için rekor, hortum, silindir, valf, sensör ve hava hazırlayıcı ekipmanlardan oluşan ürün grupları.',
      seo: { title: 'Pnömatik Sistemler | Alp Teknik', description: 'Hava hortumu, rekor, valf, silindir, sensör ve hava hazırlayıcı ürünleriyle basınçlı hava sistemlerinizi inceleyin.', keywords: 'pnömatik sistemler, hava hortumu, pnömatik rekor, selenoid valf, pnömatik silindir', intro: 'Pnömatik sistemler basınçlı havayı kontrollü hareket ve otomasyona dönüştürmek için hortum, rekor, valf, silindir, sensör ve hava hazırlayıcılardan oluşur. Hava kalitesi, basınç, hortum çapı ve bağlantı standardı sistem performansını doğrudan etkiler.' },
      products: [
        ['duz-rekor', 'Düz Rekor', 'jpeg'], ['hava-hazirlayici', 'Hava Hazırlayıcı', 'jpeg,jpeg'], ['hava-hortumu', 'Pnömatik Hava Hortumu', 'jpeg,jpeg,jpeg,jpeg,jpeg'], ['hortum-rakoru', 'Hortum Rakoru', 'jpeg'], ['kompakt-silindir', 'Kompakt Silindir', 'jpeg'], ['manyetik-sensor', 'Manyetik Sensör', 'jpeg'], ['pirinc-rakor', 'Pirinç Rakor', 'jpeg'], ['pnomatik-rekor', 'Pnömatik Rekor', 'jpeg,jpeg,jpeg'], ['selenoid-valf', 'Selenoid Valf', 'jpeg'], ['selenoid-valf-bobini', 'Selenoid Valf Bobini', 'jpeg'], ['sensor-test-cihazi', 'Sensör Test Cihazı', 'jpeg'], ['standart-silindir', 'Standart Silindir', 'jpeg'], ['valf-manifoldu', 'Valf Manifoldu', 'jpeg'], ['yon-kontrol-valfi', 'Yön Kontrol Valfi', 'jpeg'], ['yuvarlak-silindir', 'Yuvarlak Silindir', 'jpeg']
      ]
    },
    {
      id: 'seviye-kontrol', title: 'Seviye Kontrol',
      description: 'Tank, kazan ve proses hatlarında sıvı seviyesini izlemek, kontrol etmek ve güvenli çalışma koşullarını sürdürmek için ürünler.',
      seo: { title: 'Seviye Kontrol Sistemleri | Alp Teknik', description: 'Tank, kazan ve proses hatları için seviye şalteri, göstergesi, ölçüm cihazı ve kontrol paneli ürünlerini inceleyin.', keywords: 'seviye kontrol, seviye şalteri, seviye göstergesi, seviye ölçüm cihazı, tank seviye kontrolü', intro: 'Seviye kontrol ürünleri; tank, kazan ve proses ekipmanlarında taşma, kuru çalışma ve istenmeyen seviye değişimlerini önlemeye yardımcı olur. Seçim; akışkan özellikleri, basınç, sıcaklık, bağlantı şekli ve kontrol senaryosuna göre değerlendirilmelidir.' },
      products: [
        ['aeld-11-seviye-izleme-gostergesi', 'AELD-11 Seviye İzleme Göstergesi', 'jpeg'], ['eg-11-seviye-olcum-cihazi', 'EG-11 Seviye Ölçüm Cihazı', 'jpeg'], ['flansli-seviye-salteri', 'Flanşlı Seviye Şalteri', 'jpeg'], ['kablolu-seviye-salteri', 'Kablolu Seviye Şalteri', 'jpeg'], ['kazan-tagdiye-cihazi', 'Kazan Tağdiye Cihazı', 'jpeg,jpeg'], ['kts-50-seviye-tank-samandirasi', 'KTS-50 Seviye Tank Şamandırası', 'jpeg'], ['manyetik-seviye-gostergesi', 'Manyetik Seviye Göstergesi', 'jpeg,jpeg,jpeg,jpeg,jpeg,jpeg'], ['mekanik-seviye-salteri', 'Mekanik Seviye Şalteri', 'jpeg,jpeg'], ['mg-33sv-seviye-gostergesi', 'MG-33SV Seviye Göstergesi', 'jpeg'], ['rotlu-seviye-salteri', 'Rotlu Seviye Şalteri', 'jpeg'], ['seviye-kontrol-paneli', 'Seviye Kontrol Paneli', 'jpeg,jpeg,jpeg'], ['seviye-samandirasi', 'Seviye Şamandırası', 'jpeg,jpeg,jpeg,jpeg,jpeg']
      ]
    }
  ];

  window.catalogData = {
    categories: categories.map(category => ({ ...category, products: category.products.map(product => makeProduct(category.id, product)) }))
  };
}());
