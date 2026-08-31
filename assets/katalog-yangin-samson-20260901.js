/* Yangın Malzemeleri ve SAMSON katalog güncellemesi. */
(function () {
  'use strict';

  const categories = window.catalogData?.categories;
  if (!Array.isArray(categories)) return;

  const r2 = 'https://media.nevasiteyonetimi.com/alpteknik/';
  const fireItems = [
    ['001', 'Islak Alarm Vanası', 'Sprinkler tesisatında su akışını algılayan ve alarm hattını devreye alan vana grubu.'],
    ['004', 'Yangın Hidrantı', 'Yangın söndürme ekiplerinin dış müdahale noktalarında kullanımı için hidrant çözümü.'],
    ['005', 'Yangın Dolabı Vanası', 'Yangın dolabı ve hortum hatlarında kontrollü su çıkışı sağlayan vana.'],
    ['007', 'Kelebek Vana İzleme Anahtarı', 'Vanaların açık-kapalı konumunu yangın alarm sistemine bildirmek için izleme anahtarı.'],
    ['009', 'Dik Tip Sprinkler', 'Tavan tesisatlarında yangın algılama ve söndürme için dik montajlı sprinkler başlığı.'],
    ['010', 'Yatay Duvar Tipi Sprinkler', 'Duvar yakınındaki alanlarda yatay püskürtme deseniyle koruma sağlayan sprinkler başlığı.'],
    ['013', 'Sprinkler Rozeti', 'Sprinkler geçiş noktalarında temiz ve düzenli bir tavan bitişi sağlayan rozet.'],
    ['015', 'Deluge Vana', 'Açık nozullu yangın sistemlerinde suyun kontrollü olarak hatta verilmesini sağlayan vana.'],
    ['016', 'Yangın Pompası Kontrol Grubu', 'Yangın pompası hattındaki basınç ve çalışma durumunun izlenmesine yardımcı ekipman grubu.'],
    ['017', 'Boru Kesme Makinesi', 'Yangın tesisatı borularının montaj öncesinde düzgün ölçüde kesilmesi için kullanılan ekipman.'],
    ['019', 'Yangın Dolabı', 'Hortum ve müdahale ekipmanlarını erişilebilir biçimde muhafaza eden yangın dolabı.'],
    ['020', 'Pirinç Küresel Vana', 'Hat akışını hızlı ve güvenilir biçimde açıp kapatmak için pirinç gövdeli küresel vana.'],
    ['023', 'İzleme Anahtarlı Kelebek Vana', 'Yangın tesisatındaki akış yolunu kontrol eden ve vana konumunu izleyen kelebek vana.'],
    ['024', 'Yivli Mekanik Te', 'Yivli boru hatlarında branşman oluşturmak için kullanılan mekanik bağlantı elemanı.'],
    ['027', 'Sprinkler Test ve Drenaj Vanası', 'Sprinkler hattının test edilmesi ve kontrollü drenajı için kullanılan vana grubu.'],
    ['028', 'Yivli Çekvalf', 'Akışın tek yönde ilerlemesini sağlayan, yivli bağlantılı çekvalf.'],
    ['030', 'Gizli Tip Sprinkler Rozeti', 'Gizli tip sprinkler uygulamalarında estetik ve koruyucu bitiş sağlayan rozet.'],
    ['034', 'Yangın Hidrantı', 'Açık alan yangın söndürme hatlarında ekiplerin suya erişimi için kullanılan hidrant.'],
    ['035', 'Flanşlı Çekvalf', 'Ters akışı önlemek üzere flanşlı tesisat hatlarında kullanılan çekvalf.'],
    ['039', 'İzleme Anahtarlı Kelebek Vana', 'Yangın tesisatında hattı kontrol eden ve vana konumunu izleme sistemine ileten kelebek vana.'],
    ['041', 'Kompakt İzleme Anahtarlı Kelebek Vana', 'Dar montaj alanlarında vana konum takibi için kullanılan kompakt kelebek vana çözümü.'],
    ['043', 'Wafer Tip Kelebek Vana', 'Yangın tesisatı hatlarında kompakt gövdesiyle akış kontrolü sağlayan kelebek vana.'],
    ['044', 'Kauçuk Kompansatör', 'Titreşim ve genleşme etkilerini sönümlemeye yardımcı esnek bağlantı elemanı.'],
    ['046', 'Çift Girişli İtfaiye Bağlantısı', 'İtfaiye müdahalesinde sisteme haricî su beslemesi sağlamak için kullanılan bağlantı noktası.'],
    ['048', 'Yangın Dolabı Vanası', 'Yangın dolabı hortum hattında su akışını kontrol etmek için kullanılan vana.'],
    ['053', 'Yivli Redüksiyon', 'Farklı çaplara sahip yivli boru hatlarını birleştirmek için kullanılan redüksiyon parçası.'],
    ['054', 'Alarm Vana Grubu', 'Sprinkler sistemindeki su akışını algılayıp alarm devresini destekleyen vana grubu.'],
    ['058', 'Yivli Boru Askı Kelepçesi', 'Yangın tesisatı borularının taşıyıcı yapıya güvenli şekilde sabitlenmesi için askı kelepçesi.'],
    ['060', 'Flanşlı OS&Y Sürgülü Vana', 'Yangın tesisatında hattı izlenebilir açık konumda izole etmek için kullanılan sürgülü vana.'],
    ['062', 'Flanşlı OS&Y Sürgülü Vana', 'Yüksek görünürlükte mil yapısıyla tesisat hattının açma-kapama kontrolünü sağlayan sürgülü vana.'],
    ['064', 'Açık Tip Sprinkler Başlığı', 'Özel söndürme uygulamalarında açık nozullu sistemlerle kullanılan sprinkler başlığı.'],
    ['066', 'Deluge Vana', 'Açık nozullu yangın koruma hatlarında söndürme suyunun kontrollü geçişini sağlayan vana.'],
    ['071', 'Boru Yiv Açma Makinesi', 'Yivli bağlantı hazırlığı için boru uçlarında yiv açılmasını sağlayan tesisat ekipmanı.'],
    ['074', 'Dik Tip Sprinkler', 'Yangın sprinkler tesisatlarında tavan montajı için kullanılan dik tip sprinkler başlığı.'],
    ['079', 'Dik Tip Sprinkler', 'Tavan altı yangın korumasında suyu tasarlanan dağılımda püskürten sprinkler başlığı.'],
    ['083', 'Islak Alarm Vana İstasyonu', 'Islak sprinkler sisteminde su akışı ve alarm fonksiyonlarını bir araya getiren vana istasyonu.'],
    ['085', 'Alarm Vana Grubu', 'Yangın sprinkler tesisatının alarm ve su geçiş fonksiyonlarını destekleyen vana grubu.'],
    ['087', 'Yivli Dirsek', 'Yivli boru hatlarında yön değişimi yapmak için kullanılan bağlantı parçası.'],
    ['089', 'Test ve Drenaj Kolektörü', 'Yangın tesisatında test, tahliye ve bağlantı işlemlerini düzenleyen kolektör grubu.'],
    ['091', 'Yivli Flanş Adaptörü', 'Yivli boru sistemini flanşlı ekipmana bağlamak için kullanılan adaptör.'],
    ['093', 'Yivli Mekanik Te', 'Yangın tesisatı boru hattından kontrollü branşman almak için mekanik te bağlantısı.']
  ];

  const fireProducts = fireItems.map(([code, name, description]) => ({
    id: `yangin-${code}`,
    name,
    brand: 'Yangın Malzemeleri',
    group: 'Yangın Malzemeleri',
    groupId: 'yangin-malzemeleri',
    description,
    images: [`${r2}yang%C4%B1n/${code}.jpg`]
  }));

  const samsonItems = [
    ['2141-tip-4-termostatik-vana', '2141 TİP 4 Termostatik Vana', '2141 TİP 4 TERMOSTATİK VANA.jpg', 'Sıcaklık değişimlerine göre akışı düzenlemeye yardımcı termostatik vana.'],
    ['2231-termostat', '2231 Termostat', '2231 TERMOSTAT.jpeg', 'Proses sıcaklığının izlenmesi ve kontrol döngüsünün desteklenmesi için termostat.'],
    ['3241-2-motorlu-2-yollu-kontrol-vanasi', '3241-2 Motorlu 2 Yollu Kontrol Vanası', '3241--2 MOTORLU  2 YOLLU KONT.VANSI.jpg', 'Motorlu aktüatörüyle hat akışını modüle eden iki yollu kontrol vanası.'],
    ['3241-1-2-yollu-vana', '3241-1 2 Yollu Vana', '3241-1 2 YOLLU VANA.jpeg', 'Proses hattında akışın kontrolü için kullanılan iki yollu vana.'],
    ['3241-7-pnomatik-iki-yollu-kontrol-vanasi', '3241-7 Pnömatik İki Yollu Kontrol Vanası', '3241-7  PNÖMATİK İKİ  YOLLU KONTROL VANASI .jpg', 'Pnömatik aktüatörle akışı kontrol eden iki yollu vana çözümü.'],
    ['3244-2-3-yollu-vana', '3244-2 3 Yollu Vana', '3244-2 3 YOLLU VANA.jpeg', 'Karıştırma veya yönlendirme uygulamalarında kullanılan üç yollu vana.'],
    ['3244-2-motorlu-2-yollu-kontrol-vanasi', '3244-2 Motorlu 2 Yollu Kontrol Vanası', '3244-2 MOTORLU 2 YOLLU KONT.VANASI.jpg', 'Motorlu aktüatörle hassas akış kontrolü sağlayan iki yollu vana.'],
    ['3351-pnomatik-on-off', '3351 Pnömatik On-Off Vana', '3351 PNÖMATİK ON-OFF.jpeg', 'Pnömatik kumandayla açık-kapalı hat kontrolü için kullanılan vana.'],
    ['3353-pnomatik-on-off', '3353 Pnömatik On-Off Vana', '3353 PNÖMATİK ON-OFF.jpg', 'Hızlı ve güvenilir açık-kapalı kontrol için pnömatik vana.'],
    ['3354-pnomatik-on-off', '3354 Pnömatik On-Off Vana', '3354 PNÖMATİK ON-OFF.jpeg', 'Otomasyon uygulamalarında pnömatik kumandayla çalışan on-off vana.'],
    ['3725-pozisyoner', '3725 Pozisyoner', '3725 POZİSYONER.jpeg', 'Aktüatör konumunu kontrol sinyaline göre hassas biçimde ayarlayan pozisyoner.'],
    ['3730-0-pozisyoner', '3730-0 Pozisyoner', '3730-0 POZİSYONER.jpeg', 'Kontrol vanası aktüatörleri için akıllı konumlandırma çözümü.'],
    ['3730-1-pozisyoner', '3730-1 Pozisyoner', '3730-1 POZİSYONER.jpeg', 'Kontrol vanası aktüatörünün istenen konuma güvenilir şekilde ulaşmasını destekleyen pozisyoner.'],
    ['4123-basinc-dusurucu', '4123 Basınç Düşürücü', '4123 BASINÇ DÜŞÜRÜCÜ.jpg', 'Hat çıkış basıncını istenen seviyede tutmaya yardımcı basınç düşürücü.'],
    ['44-1b-basinc-dusurucu', '44-1B Basınç Düşürücü', '44-1B BASINÇ DÜŞÜRÜCÜ.jpeg', 'Proses hattında basıncı kontrollü biçimde azaltmak için kullanılan regülatör.'],
    ['6111-ip-konverter', '6111 I/P Konverter', '6111 IP KONVERTER.jpeg', 'Elektrik akım sinyalini pnömatik basınç sinyaline dönüştüren I/P konverter.']
  ];

  const samsonProducts = samsonItems.map(([id, name, fileName, description]) => ({
    id: `samson-${id}`,
    name,
    brand: 'Samson',
    group: 'SAMSON',
    groupId: 'samson',
    description,
    images: [`${r2}samson/${encodeURIComponent(fileName)}`]
  }));

  const valveCategory = categories.find(category => category.id === 'vanalar');
  if (valveCategory) {
    valveCategory.products = [
      ...valveCategory.products.filter(product => product.brand !== 'Samson'),
      ...samsonProducts
    ];
  }

  const fireCategory = {
    id: 'yangin-malzemeleri',
    title: 'Yangın Malzemeleri',
    description: 'Yangın koruma tesisatları için vana, sprinkler, hidrant, yivli bağlantı ve montaj ekipmanları.',
    seo: {
      title: 'Yangın Malzemeleri | Alp Teknik',
      description: 'Yangın koruma tesisatlarında kullanılan vana, sprinkler, hidrant ve bağlantı malzemelerini inceleyin.',
      keywords: 'yangın malzemeleri, sprinkler, hidrant, alarm vanası, yangın dolabı, yivli bağlantı',
      intro: 'Yangın malzemeleri; yangın algılama ve söndürme tesisatlarının güvenilir kurulumu, işletilmesi ve bakımı için seçilen vana, sprinkler, hidrant, bağlantı ve montaj ekipmanlarından oluşur.'
    },
    products: fireProducts
  };

  const oldFireIndex = categories.findIndex(category => category.id === fireCategory.id);
  if (oldFireIndex !== -1) categories.splice(oldFireIndex, 1);
  const levelIndex = categories.findIndex(category => category.id === 'seviye-gostergeleri');
  categories.splice(levelIndex === -1 ? categories.length : levelIndex + 1, 0, fireCategory);
}());
