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
    'fittings-malzemeler': name => `${name}, endüstriyel tesisat ve proses hatlarında sızdırmazlık gerektiren bağlantı yüzeyleri için kullanılan bir ürün grubudur. Malzeme, ölçü ve çalışma sınırları ilgili teknik ürün sayfasından doğrulanmalıdır.`,
    'seviye-kontrol': name => `${name}; tank, kazan ve proses ekipmanlarında seviye izleme veya kontrol ihtiyacını destekleyen bir çözümdür. Akışkan türü, montaj yönü, basınç, sıcaklık, kontak gereksinimi ve bağlantı şekli projeye göre teyit edilerek seçilmelidir.`
  };

  const productDescriptions = {
    'diger-contalar': 'Farklı endüstriyel tesisat ve sızdırmazlık ihtiyaçlarına göre seçilen conta çeşitleri için ürün grubudur.',
    'spiral-sarimli-contalar': 'Yüksek sıcaklık ve basınç koşullarında sızdırmazlık için sarım, dolgu ve ring seçenekleriyle sunulan conta grubudur.',
    'teflon-ptfe-contalar': 'PTFE esaslı yapısıyla kimyasal uyumluluk ve sızdırmazlık gerektiren uygulamalar için conta çözümüdür.',
    'ici-ringli-saf-grafit-contalar': 'Grafit esaslı yapısı ve iç ring desteğiyle uygun flanş bağlantılarında sızdırmazlık için kullanılan conta grubudur.',
    'lastik-contalar': 'Elastomer malzeme seçenekleriyle uygulamanın akışkan, sıcaklık ve basınç koşullarına göre seçilen conta grubudur.'
  };

  /* Her kartta aynı teknik okuma sırasını koruyan, ürün ailesine göre başlangıç bilgileri. */
  const guidanceByCategory = {
    'ari-armaturen': {
      applicationAreas: 'Buhar, sıcak su, kondens ve proses hatlarında akış, basınç veya sıcaklık yönetimi gereken uygulamalar.',
      installation: 'Montajdan önce akış yönü, bağlantı standardı, anma çapı ve erişim gereksinimi teknik dokümana göre kontrol edilmelidir.',
      benefits: 'Uygun seçildiğinde proses kontrolü, enerji verimliliği ve bakım erişimi için güvenilir bir çözüm sunar.'
    },
    'boru-ve-baglanti-elemanlari': {
      applicationAreas: 'Endüstriyel tesisat, mekanik tesisat ve proses boru hatlarında montaj, yönlendirme ve sonlandırma işlemleri.',
      installation: 'Çap, diş veya flanş standardı, malzeme uyumu ve sızdırmazlık yöntemi projedeki boru hattıyla birlikte doğrulanmalıdır.',
      benefits: 'Hat bütünlüğünü, montaj güvenliğini ve bakım sırasında parça değişimini destekler.'
    },
    'endustriyel-vanalar': {
      applicationAreas: 'Su, gaz ve proses akışkanlarının kesilmesi, yönlendirilmesi, basınç veya debi kontrolü gereken hatlar.',
      installation: 'Vana gövdesindeki akış yönü izlenmeli; bağlantılar gerilimsiz, erişilebilir ve bakım için yeterli boşluk bırakılarak yapılmalıdır.',
      benefits: 'Kontrollü işletme, güvenli izolasyon ve proses koşullarına uygun akış yönetimi sağlar.'
    },
    'pnomatik': {
      applicationAreas: 'Basınçlı hava ile çalışan otomasyon, taşıma, sıkıştırma ve makine ekipmanları.',
      installation: 'Hava kalitesi, çalışma basıncı, hortum çapı ve bağlantı dişleri ekipman etiket değerleriyle doğrulanmalıdır.',
      benefits: 'Hızlı bağlantı, tekrarlanabilir hareket ve sistem bileşenleri arasında düzenli hava iletimi sağlar.'
    },
    'seviye-kontrol': {
      applicationAreas: 'Tank, kazan, depo ve proses ekipmanlarında seviye izleme, alarm ve otomatik kontrol ihtiyaçları.',
      installation: 'Montaj yönü, proses bağlantısı, kablo girişi ve elektriksel bağlantılar ürünün teknik talimatına göre yapılmalıdır.',
      benefits: 'Taşma veya kuru çalışma risklerini azaltmaya, izleme ve otomasyon sürekliliğini desteklemeye yardımcı olur.'
    }
  };

  const manufacturerData = {
    'astra-plus-debi-regulasyon-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-astra-astra-plus-akis-kontrol-vanasi/',
      applicationAreas: 'Buhar, sıcak su ve proses hatlarında debi, diferansiyel basınç veya akış koşullarının dengelenmesi gereken uygulamalar.',
      installation: 'Bağlantı biçimi, anma çapı, akış yönü ve seçilen modelin sıcaklık-basınç sınırları proje verileriyle doğrulanmalıdır.',
      benefits: 'Tek gövdede akış kontrolü ve sistem dengesini destekleyerek daha kararlı işletme koşullarına yardımcı olur.',
      specs: [['Bağlantı', 'Flanşlı ve dişli'], ['Anma çapı', 'DN15 (1/2″) – DN400 (16″)'], ['Basınç sınıfı', 'PN16'], ['Maksimum sıcaklık', '120 °C, 175 °C, 200 °C ve 350 °C (modele göre)']]
    },
    'cona-b-600-bimetalik-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-b-bimetalik-buhar-kapani-kondenstop/',
      applicationAreas: 'Buhar hatları, ısı eşanjörleri ve kondens tahliyesinin güvenilir biçimde yapılması gereken proses uygulamaları.',
      installation: 'Akış yönü, bağlantı tipi ve kontrolör fark basıncı seçimi hat çalışma koşullarına göre teyit edilmelidir.',
      benefits: 'Kondensin kontrollü tahliyesini destekler; buhar kaybının ve istenmeyen su darbesi riskinin azaltılmasına yardımcı olur.',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN50 (2″)'], ['Bağlantı', 'Dişli, flanşlı, soket kaynak boyunlu, alın kaynak boyunlu'], ['Kontrolör fark basıncı', '13 bar – 320 bar (kontrolöre göre)'], ['Maksimum sıcaklık', '300 °C – 550 °C (figüre göre)']]
    },
    'cona-s-631a-samandirali-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-s-samandirali-buhar-kapani-kondenstop/',
      applicationAreas: 'Değişken yükte çalışan ısı transfer ekipmanları ile buhar ve kondens hatları.',
      installation: 'Standart akış yukarıdan aşağı olacak şekilde yatay veya düşey konumda; bakım ve temizlik erişimi bırakılarak monte edilmelidir.',
      benefits: 'Şamandıralı çalışma prensibiyle kondensi sürekli tahliye etmeye ve ısı transfer verimini korumaya yardımcı olur.',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN100 (4″)'], ['Basınç sınıfları', 'PN16, PN40, PN63, PN100 ve PN160'], ['Bağlantı', 'Dişli, flanşlı, soket kaynak boyunlu ve alın kaynak boyunlu'], ['Montaj', 'Yatay veya düşey; standart akış yukarıdan aşağı']]
    },
    'cona-sc-634-samandirali-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-sc-samandirali-buhar-kapani-kondenstop/',
      applicationAreas: 'Buhar ve kondens hatlarında sürekli tahliye ile birlikte hava ve gaz tahliyesi gereken proses ekipmanları.',
      installation: 'Seçilen kontrolör fark basıncı ve bağlantı şekli tesisin çalışma basıncıyla eşleştirilmelidir.',
      benefits: 'Kondens ile hava/gazın ayrıştırılmasına yardımcı olarak daha dengeli hat işletimini destekler.',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN25 (1″)'], ['Basınç sınıfları', 'PN16, PN25 ve PN40'], ['Bağlantı', 'Dişli, flanşlı, soket kaynak boyunlu ve alın kaynak boyunlu'], ['Kontrolör fark basıncı', '4 bar, 14 bar, 21 bar veya 32 bar']]
    },
    'cona-td-641-termodinamik-kondenstop': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-cona-td-termodinamik-buhar-kapani-kondenstop/',
      applicationAreas: 'Ana buhar hatları, dağıtım hatları ve yüksek sıcaklıkta kondens tahliyesi gereken uygulamalar.',
      installation: 'Kondenstop gövdesi akış yönüne uygun ve gerekli izolasyon/servis boşluğu korunarak bağlanmalıdır.',
      benefits: 'Kompakt termodinamik çalışma yapısıyla güvenilir kondens tahliyesi ve kolay bakım imkânı sağlar.',
      specs: [['Anma çapı', 'DN15 (1/2″) – DN25 (1″)'], ['Basınç sınıfları', 'PN40 ve PN63'], ['Kontrolör fark basıncı', '32 bar veya 42 bar'], ['Maksimum sıcaklık', '400 °C veya 450 °C (figüre göre)']]
    },
    'dp32-34-pnomatik-aktuator': { sourceUrl: 'https://www.ayvaz.com/urun/pnomatik-aktuator-tek-etkili/' },
    'euro-wedi-kesme-vanasi': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-euro-wedi-yumusak-contali-kesme-vanasi/',
      applicationAreas: 'Sıcak ve soğuk su, HVAC ve proses hatlarında akışın güvenle kesilmesi gereken noktalar.',
      installation: 'Dişli veya flanşlı bağlantı standardı, anma çapı ve conta malzemesi akışkanla uyumlu seçilmelidir.',
      benefits: 'Yumuşak conta yapısı, uygun kullanım koşullarında güvenilir kapama ve kolay işletme sağlar.',
      specs: [['Bağlantı', 'Flanşlı ve dişli'], ['Anma çapı', 'DN15 (1/2″) – DN200 (8″)'], ['Basınç sınıfı', 'PN6 ve PN16'], ['Maksimum sıcaklık', '120 °C']]
    },
    'predu-basinc-dusurucu': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-predu-direkt-tesirli-denge-koruklu-basinc-dusurucu/',
      applicationAreas: 'Buhar, gaz ve proses hatlarında çıkış basıncının düşürülmesi veya sabit tutulması gereken noktalar.',
      installation: 'Akış yönü, giriş-çıkış basınçları, filtreleme ve bakım için erişim düzeni proje şartlarına göre hazırlanmalıdır.',
      benefits: 'Direkt tesirli denge körüklü yapısıyla ilave enerji gerektirmeden basınç düzenlemesini destekler.',
      specs: [['Bağlantı', 'Flanşlı'], ['Anma çapı', 'DN15 (1/2″) – DN150 (6″)'], ['Basınç sınıfları', 'PN16, PN25 ve PN40'], ['Maksimum sıcaklık', '300 °C – 450 °C (gövde malzemesine göre)']]
    },
    'schmutzfaenger-pislik-tutucu': {
      sourceUrl: 'https://www.ayvaz.com/urun/ari-pislik-tutucu/',
      applicationAreas: 'Vana, pompa, ölçüm cihazı ve hassas proses ekipmanlarının önünde katı parçacıkların tutulması gereken hatlar.',
      installation: 'Gövdedeki akış yönü izlenmeli; filtre sepetinin sökülebilmesi için bakım alanı bırakılmalıdır.',
      benefits: 'Hat içindeki partikülleri yakalayarak aşağı akıştaki ekipmanların korunmasına ve bakım aralıklarının iyileştirilmesine yardımcı olur.',
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
      applicationAreas: 'Makine imalatı, gıda tesisi ve boru hatlarında sıvı akışının ya da seviyenin görsel olarak izlenmesi gereken uygulamalar.',
      installation: 'Boru malzemesi ve rakor seçimi çalışma sıcaklığı ile işletme basıncına uygun belirlenmeli; opsiyonel kontak için elektrik bağlantısı talimata göre yapılmalıdır.',
      benefits: 'Kolay montaj, cam veya plexi gösterge seçeneği ve opsiyonel manyetik kontak ile görsel izlemeyi destekler.',
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
      applicationAreas: 'Depo ve tanklarda sıvı seviyesine bağlı mekanik kontrol veya sinyal ihtiyacı olan uygulamalar.',
      installation: '3/4″ dişli bağlantı, çalışma basıncı ve sıcaklık sınırları kontrol edilerek şamandıranın serbest hareket edeceği konumda kurulmalıdır.',
      benefits: 'Paslanmaz çelik temas yüzeyiyle dayanıklı seviye algılama ve basit mekanik kullanım sağlar.',
      specs: [['Malzeme', 'AISI 304, komple paslanmaz çelik temas yüzeyli'], ['Bağlantı', 'Dişli (3/4″)'], ['Maksimum basınç', '6 bar'], ['Maksimum çalışma sıcaklığı', '90 °C']]
    },
    'manyetik-seviye-gostergesi': { sourceUrl: 'https://www.ayvaz.com/urun/mg-33-seviye-gostergesi/' },
    'mg-33sv-seviye-gostergesi': { sourceUrl: 'https://www.ayvaz.com/urun/mg-33sv-seviye-gostergesi/' },
    'rotlu-seviye-salteri': {
      sourceUrl: 'https://www.ayvaz.com/urun/au-20-rotlu-seviye-salteri/',
      specs: [['Gövde', 'AISI 304 paslanmaz çelik; AISI 316 opsiyonlu'], ['Çalışma sıcaklığı', '-10 °C / +125 °C'], ['Maksimum çalışma basıncı', '16 bar'], ['Bağlantı', 'BSP veya NPT dişli; minimum 3/8″'], ['Koruma sınıfı', 'IP68 + EX-PROOF']]
    },
    'seviye-kontrol-paneli': { sourceUrl: 'https://www.ayvaz.com/urun/ask-p3-p4-seviye-kontrol-cihazi/' },
    'seviye-samandirasi': { sourceUrl: 'https://www.ayvaz.com/urun/kts-50-seviye-tank-samandirasi/' },
    'diger-contalar': { sourceUrl: 'https://emekconta.com.tr/urunler/diger-contalar/' },
    'spiral-sarimli-contalar': { sourceUrl: 'https://emekconta.com.tr/urunler/spiral-sarimli-contalar/' },
    'teflon-ptfe-contalar': { sourceUrl: 'https://emekconta.com.tr/urunler/emeflon-ptfe-contalar/' },
    'ici-ringli-saf-grafit-contalar': { sourceUrl: 'https://emekconta.com.tr/urunler/ici-ringli-saf-grafit-contalarzzz/' },
    'lastik-contalar': {
      sourceUrl: 'https://emekconta.com.tr/urunler/lastik-contalar/',
      images: ['https://emekconta.com.tr/wp-content/uploads/2025/05/LASTIK-CONTALAR.jpg']
    },
    'diger-contalar': {
      sourceUrl: 'https://emekconta.com.tr/urunler/diger-contalar/',
      images: ['https://emekconta.com.tr/wp-content/uploads/2025/05/DIGER-CONTALAR.jpg']
    },
    'spiral-sarimli-contalar': {
      sourceUrl: 'https://emekconta.com.tr/urunler/spiral-sarimli-contalar/',
      images: ['https://emekconta.com.tr/wp-content/uploads/2025/05/SPIRAL-SARIMLI-CONTALAR.jpg'],
      modalDescription: 'Spiral sarımlı contalar; özellikle basınç ve sıcaklığın yüksek olduğu noktalarda kullanılan sızdırmazlık elemanlarıdır. Petrol rafinerileri, petrokimya tesisleri, nükleer ve enerji santralleri, demir-çelik tesisleri, doğalgaz ve petrol boru hatları ile gemi endüstrisi gibi alanlarda tercih edilir.\n\nUygulama yerine göre farklı sarım ve dolgu malzemeleriyle; iç ve dış ringsiz, iç ringli, dış ringli veya iç ve dış ringli çeşitlerde üretilir. ASME B16.20, ASME B16.47 Seri A / Seri B, DIN EN 1514-2 ve JIS standartlarına uygun ya da özel ölçülerde sunulabilir.'
    },
    'teflon-ptfe-contalar': {
      sourceUrl: 'https://emekconta.com.tr/urunler/emeflon-ptfe-contalar/',
      images: ['https://emekconta.com.tr/wp-content/uploads/2025/05/EMEFLON-PTFE-CONTALAR.jpg']
    },
    'ici-ringli-saf-grafit-contalar': {
      sourceUrl: 'https://emekconta.com.tr/urunler/ici-ringli-saf-grafit-contalarzzz/',
      images: ['https://emekconta.com.tr/wp-content/uploads/2025/05/ICI-RINGLI-SAF-GRAFIT-CONTALAR.jpg']
    }
  };

  const makeProduct = (category, [id, name, formats, group = '', groupId = '']) => ({
    id,
    name,
    group,
    groupId,
    description: productDescriptions[id] || copyByCategory[category](name),
    images: formats ? imageList(category, id, formats) : [],
    ...guidanceByCategory[category],
    ...(manufacturerData[id] || {})
  });

  const categories = [
    {
      id: 'ari-armaturen', title: 'ARI-Armaturen',
      description: 'Kontrol, kesme, basınç ve buhar uygulamaları için ARI-Armaturen marka endüstriyel vana, aktüatör ve kondenstop çözümleri.',
      seo: { title: 'ARI-Armaturen Vana ve Kondenstop Ürünleri | Alp Teknik', description: 'ARI-Armaturen kontrol vanası, kesme vanası, aktüatör ve kondenstop ürünlerini Alp Teknik uzmanlığıyla inceleyin.', keywords: 'ARI-Armaturen, kontrol vanası, kesme vanası, kondenstop, aktüatör, endüstriyel vana', intro: 'ARI-Armaturen ürünleri; buhar, sıcak su, HVAC ve proses hatlarında akış kontrolü, basınç yönetimi ve güvenilir kondens tahliyesi için seçilir. Ürün seçimi; çalışma basıncı, sıcaklık, akışkan, bağlantı standardı ve kapasite birlikte değerlendirilerek yapılmalıdır.' },
      products: [
        ['astra-plus-debi-regulasyon-vanasi', 'ARI-ASTRA/ASTRA Plus Akış Kontrol Vanası', 'webp'], ['cona-b-600-bimetalik-kondenstop', 'ARI-CONA-B Bimetalik Buhar Kapanı (Kondenstop)', 'webp'], ['cona-s-631a-samandirali-kondenstop', 'ARI-CONA-S Şamandıralı Buhar Kapanı (Kondenstop)', 'webp'], ['cona-sc-634-samandirali-kondenstop', 'ARI-CONA-SC Şamandıralı Buhar Kapanı (Kondenstop)', 'webp'], ['cona-td-641-termodinamik-kondenstop', 'ARI-CONA-TD Termodinamik Buhar Kapanı (Kondenstop)', 'webp'], ['dp32-34-pnomatik-aktuator', 'DP32/34 Pnömatik Aktüatör', 'webp'], ['euro-wedi-kesme-vanasi', 'ARI-EURO-WEDI Yumuşak Contalı Kesme Vanası', 'webp'], ['predu-basinc-dusurucu', 'ARI-PREDU Direkt Tesirli Denge Körüklü Basınç Düşürücü', 'webp'], ['premio-elektrik-aktuator', 'PREMIO Elektrik Aktüatör', 'webp'], ['preso-basinc-dusurucu', 'PRESO Basınç Düşürücü', 'webp'], ['schmutzfaenger-pislik-tutucu', 'ARI-Pislik Tutucu', 'webp'], ['stevi-405-dp-kontrol-vanasi', 'ARI-STEVI 405/460 Serisi Aktüatörlü Kesme Vanası EN', 'webp'], ['stevi-440-premio-kontrol-vanasi', 'ARI-STEVI Smart 440/441 Serisi 2-Yollu Kontrol Vanası', 'webp'], ['stevi-470-dp-sipart-kontrol-vanasi', 'STEVI 470 DP SIPART Kontrol Vanası', 'webp'], ['stevi-as-350-yuksek-basinc-kontrol-vanasi', 'STEVI AS 350 Yüksek Basınç Kontrol Vanası', 'webp'], ['stobu-kesme-vanasi', 'ARI-STOBU Baskılı Tip Kesme Vanası', 'webp'], ['stobu-pn160-yuksek-basinc-kesme-vanasi', 'STOBU PN160 Yüksek Basınç Kesme Vanası', 'webp'], ['temptrol-sicaklik-kontrol-vanasi', 'ARI-TEMPTROL Sıcaklık Kontrolörü', 'webp'], ['ziva-z-kesme-vanasi', 'ARI-ZIVA-Z Wafer Tip Kelebek Vana', 'png']
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
        ['duz-rekor', 'Düz Rekor', 'jpeg'], ['hava-hazirlayici', 'Hava Hazırlayıcı', 'jpeg,jpeg'], ['hava-hortumu', 'Pnömatik Hava Hortumu', 'jpeg,jpeg,jpeg,jpeg,jpeg'], ['kompakt-silindir', 'Kompakt Silindir', 'jpeg'], ['manyetik-sensor', 'Manyetik Sensör', 'jpeg'], ['pnomatik-rekor', 'Pnömatik Rekor', 'jpeg,jpeg,jpeg'], ['selenoid-valf', 'Selenoid Valf', 'jpeg'], ['selenoid-valf-bobini', 'Selenoid Valf Bobini', 'jpeg'], ['sensor-test-cihazi', 'Sensör Test Cihazı', 'jpeg'], ['standart-silindir', 'Standart Silindir', 'jpeg'], ['valf-manifoldu', 'Valf Manifoldu', 'jpeg'], ['yon-kontrol-valfi', 'Yön Kontrol Valfi', 'jpeg'], ['yuvarlak-silindir', 'Yuvarlak Silindir', 'jpeg']
      ]
    },
    {
      id: 'fittings-malzemeler', title: 'Fittings Malzemeler',
      description: 'Kaynaklı, dişli, inox, pirinç ve conta ürün grupları için doküman ve teknik kaynaklar.',
      seo: { title: 'Fittings Malzemeler ve Contalar | Alp Teknik', description: 'Fittings malzemeler, conta çeşitleri ve teknik dokümanlara Alp Teknik üzerinden ulaşın.', keywords: 'fittings malzemeler, contalar, spiral sarımlı conta, PTFE conta, grafit conta, lastik conta', intro: 'Fittings malzemeler ve contalar; tesisat hatlarında bağlantı, montaj ve sızdırmazlık ihtiyacına göre seçilir. Teknik ayrıntılar için ilgili ürün sayfasını inceleyin.' },
      products: [
        ['diger-contalar', 'Diğer Contalar', '', 'Contalar', 'contalar'],
        ['spiral-sarimli-contalar', 'Spiral Sarımlı Contalar', '', 'Contalar', 'contalar'],
        ['teflon-ptfe-contalar', 'Teflon (PTFE) Contalar', '', 'Contalar', 'contalar'],
        ['ici-ringli-saf-grafit-contalar', 'İçi Ringli Saf Grafit Contalar', '', 'Contalar', 'contalar'],
        ['lastik-contalar', 'Lastik Contalar', '', 'Contalar', 'contalar']
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
