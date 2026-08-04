/*
 * Katalog veri kaynağı.
 * Yarın yeni ürün eklemek için ilgili kategorinin products dizisine bir nesne
 * ekleyin. previewLimit değeri katalogta aynı anda gösterilecek ürün sayısını belirler.
 */
window.catalogSettings = { previewLimit: 3 };

window.catalogData = {
  categories: [
    {
      id: 'ari-armaturen',
      title: 'ARI-Armaturen',
      description: 'Kontrol, kesme, basınç ve buhar uygulamaları için ARI-Armaturen marka endüstriyel vana, aktüatör ve kondenstop çözümleri.',
      seo: {
        title: 'ARI-Armaturen Vana ve Kondenstop Ürünleri | Alp Teknik',
        description: 'ARI-Armaturen kontrol vanası, kesme vanası, pnömatik aktüatör ve kondenstop ürünlerini Alp Teknik uzmanlığıyla inceleyin.',
        keywords: 'ARI-Armaturen, kontrol vanası, kondenstop, bimetalik kondenstop, şamandıralı kondenstop, pnömatik aktüatör, endüstriyel vana',
        intro: 'ARI-Armaturen ürün grubu; buhar, sıcak su, HVAC ve proses hatlarında akış kontrolü, basınç yönetimi ve güvenilir kondens tahliyesi için seçilir. Kontrol vanaları, kesme vanaları, aktüatörler ve kondenstoplar; çalışma basıncı, sıcaklık, akışkan ve kapasite değerleri birlikte değerlendirilerek projeye uygun biçimde belirlenir.'
      },
      products: [
        {
          id: 'astra-plus-debi-regulasyon-vanasi',
          name: 'ASTRA Plus Debi Regülasyon Vanası',
          description: 'ARI ASTRA Plus; ısıtma ve iklimlendirme hatlarında debinin hassas ayarlanması için kullanılan kombine bir regülasyon vanasıdır. Ölçüm noktaları ve ayar imkânı sayesinde sistem dengelemesini güvenli, tekrarlanabilir ve servis kolaylığı sağlayacak biçimde destekler.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/ari-armaturen/astra-plus-debi-regulasyon-vanasi/astra-plus-debi-regulasyon-vanasi1.webp']
        },
        {
          id: 'cona-b-600-bimetalik-kondenstop',
          name: 'CONA B 600 Bimetalik Kondenstop',
          description: 'CONA B 600, buhar sistemlerinde soğutulmuş kondensi kontrollü biçimde tahliye etmek için tasarlanan bimetalik kondenstoptur. Ayarlanabilir alt soğutma özelliği, dayanıklı iç yapısı ve otomatik hava tahliyesiyle hat verimliliğini ve işletme sürekliliğini destekler.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/ari-armaturen/cona-b-600-bimetalik-kondenstop/cona-b-600-bimetalik-kondenstop1.webp']
        },
        {
          id: 'cona-s-631a-samandirali-kondenstop',
          name: 'CONA S 631A Şamandıralı Kondenstop',
          description: 'CONA S 631A, değişken basınç ve kondens yüklerinde kararlı tahliye sağlayan şamandıralı kondenstoptur. Entegre hava tahliyesi, su darbesine dayanıklı yapısı ve servis kolaylığı sayesinde buhar proseslerinde güvenilir kondens yönetimine katkı sağlar.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/ari-armaturen/cona-s-631a-samandirali-kondenstop/cona-s-631a-samandirali-kondenstop1.webp']
        }
      ]
    },
    {
      id: 'boru-ve-baglanti-elemanlari',
      title: 'Boru & Bağlantı Elemanları',
      description: 'Boru hatlarının güvenli, sızdırmaz ve uygulamaya uygun kurulumu için flanş, fitting, nipel, dirsek ve reduksiyon ürünleri.',
      seo: {
        title: 'Boru ve Bağlantı Elemanları | Flanş, Fitting, Nipel | Alp Teknik',
        description: 'Boru hatları için flanş, fitting, nipel, dirsek, reduksiyon ve boru kepi ürünlerini uygulamanıza uygun bağlantı çözümleriyle inceleyin.',
        keywords: 'boru bağlantı elemanları, flanş, fitting, galvaniz nipel, boru kepi, paslanmaz fitting, dirsek, reduksiyon, tesisat malzemeleri',
        intro: 'Boru ve bağlantı elemanları; tesisat hatlarında sızdırmazlık, montaj güvenliği ve servis erişimi için kritik rol oynar. Flanş, fitting, nipel, dirsek, kep ve reduksiyon seçimi; boru çapı, bağlantı tipi, çalışma basıncı, akışkan ve malzeme uyumuna göre yapılmalıdır. Alp Teknik, farklı proses ve tesisat ihtiyaçları için doğru bağlantı bileşenlerini bir araya getirir.'
      },
      products: [
        {
          id: 'boru-kepi',
          name: 'Boru Kepi',
          description: 'Boru kepi, kaynaklı veya tesisat bağlantılarında boru ucunu güvenli biçimde kapatmak için kullanılan bağlantı elemanıdır. Uygun çap ve malzeme seçimiyle hat sonlarında sızdırmazlık, mekanik dayanım ve temiz bir montaj görünümü sağlar.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/boru-ve-baglanti-elemanlari/boru-kepi/boru-kepi1.png']
        },
        {
          id: 'duz-flans',
          name: 'Düz Flanş',
          description: 'Düz flanş; boru, vana ve ekipmanları sökülebilir şekilde birleştirmek için kullanılan standart bir bağlantı elemanıdır. Doğru conta ve cıvata seçimiyle bakım erişimini kolaylaştırır, hat bütünlüğünü korur ve montaj süresini kısaltır.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/boru-ve-baglanti-elemanlari/duz-flans/duz-flans1.webp']
        },
        {
          id: 'galvaniz-nipel',
          name: 'Galvaniz Nipel',
          description: 'Galvaniz nipel, dişli boru hatlarında iki bağlantı noktasını birleştirmek için kullanılan dayanıklı bir ara parçadır. Korozyona karşı korumalı yüzeyi ve farklı ölçü seçenekleri sayesinde su, hava ve genel tesisat uygulamalarında pratik çözüm sunar.',
          images: [
            'site%20i%C3%A7i%20g%C3%B6rseller/boru-ve-baglanti-elemanlari/galvaniz-nipel/galvaniz-nipel1.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/boru-ve-baglanti-elemanlari/galvaniz-nipel/galvaniz-nipel2.webp'
          ]
        }
      ]
    },
    {
      id: 'endustriyel-vanalar',
      title: 'Endüstriyel Vanalar',
      description: 'Proses hatlarında akışı kesmek, yönlendirmek, kontrol etmek ve çalışma basıncını güvenle yönetmek için vana çözümleri.',
      seo: {
        title: 'Endüstriyel Vanalar | Kontrol, Motorlu ve Pnömatik Vana | Alp Teknik',
        description: 'Kontrol vanası, motorlu vana, pnömatik vana, kesme vanası ve basınç düşürücü ürünlerini endüstriyel proses gereksinimlerine göre inceleyin.',
        keywords: 'endüstriyel vana, kontrol vanası, motorlu vana, pnömatik vana, kesme vanası, basınç düşürücü, proses vanası, HVAC vana',
        intro: 'Endüstriyel vanalar; sıvı, gaz ve buhar hatlarında akışı kesmek, modüle etmek veya belirli proses koşullarında sabit tutmak için kullanılır. Kontrol, motorlu, pnömatik ve kesme vanalarının seçimi; debi, basınç farkı, sıcaklık, bağlantı standardı ve otomasyon ihtiyacı dikkate alınarak yapılır. Doğru vana seçimi, proses güvenliği ve enerji verimliliğinin temelidir.'
      },
      products: [
        {
          id: 'elastik-salmastrali-kesme-vanasi',
          name: 'Elastik Salmastralı Kesme Vanası',
          description: 'Elastik salmastralı kesme vanası, akışı güvenli şekilde durdurmak ve hat izolasyonu sağlamak için tasarlanmıştır. Sağlam gövdesi, kontrollü kapama yapısı ve bakım dostu tasarımıyla tesisat ve proses hatlarında uzun ömürlü kullanım sunar.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/endustriyel-vanalar/elastik-salmastrali-kesme-vanasi/elastik-salmastrali-kesme-vanasi1.jpeg']
        },
        {
          id: 'kontrol-vanasi',
          name: 'Kontrol Vanası',
          description: 'Kontrol vanaları; debi, basınç ve sıcaklık gibi proses değişkenlerini istenen çalışma aralığında tutmaya yardımcı olur. Uygun aktüatör ve pozisyonerle birlikte kullanıldığında otomasyon sistemine hassas, güvenilir ve izlenebilir akış kontrolü kazandırır.',
          images: [
            'site%20i%C3%A7i%20g%C3%B6rseller/endustriyel-vanalar/kontrol-vanasi/kontrol-vanasi1.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/endustriyel-vanalar/kontrol-vanasi/kontrol-vanasi2.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/endustriyel-vanalar/kontrol-vanasi/kontrol-vanasi3.jpeg'
          ]
        },
        {
          id: 'motorlu-kontrol-vanasi',
          name: 'Motorlu Kontrol Vanası',
          description: 'Motorlu kontrol vanası, elektrikli aktüatörü sayesinde vana konumunu otomatik biçimde ayarlayarak proses koşullarına hızlı yanıt verir. HVAC, enerji ve endüstriyel uygulamalarda uzaktan kumanda, tekrarlanabilir kontrol ve işletme güvenliği için tercih edilir.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/endustriyel-vanalar/motorlu-kontrol-vanasi/motorlu-kontrol-vanasi1.jpeg']
        }
      ]
    },
    {
      id: 'pnomatik',
      title: 'Pnömatik Sistemler',
      description: 'Basınçlı hava hatları için rekor, hortum, silindir, valf, sensör ve hava hazırlayıcı ekipmanlardan oluşan ürün grupları.',
      seo: {
        title: 'Pnömatik Sistemler | Hava Hortumu, Rekor, Valf ve Silindir | Alp Teknik',
        description: 'Pnömatik hava hortumu, rekor, valf, silindir, sensör ve hava hazırlayıcı ürünleriyle basınçlı hava sistemlerinizi inceleyin.',
        keywords: 'pnömatik sistemler, hava hortumu, pnömatik rekor, hava hazırlayıcı, selenoid valf, pnömatik silindir, yön kontrol valfi, basınçlı hava',
        intro: 'Pnömatik sistemler, basınçlı havayı kontrollü hareket ve otomasyona dönüştürmek için hortum, rekor, valf, silindir, sensör ve hava hazırlayıcılardan oluşur. Hava kalitesi, basınç değeri, hortum çapı ve bağlantı standardı; sistemin hızını, tekrarlanabilirliğini ve ekipman ömrünü doğrudan etkiler. Doğru bileşen eşleşmesi güvenilir makine otomasyonu sağlar.'
      },
      products: [
        {
          id: 'duz-rekor',
          name: 'Düz Rekor',
          description: 'Düz rekor, pnömatik hortum ile bağlantı elemanı arasında hızlı ve sızdırmaz geçiş sağlamak için kullanılır. Kompakt gövdesi, pratik montajı ve farklı bağlantı ölçüleri sayesinde makine otomasyonu ve basınçlı hava hatlarında düzenli kurulum imkânı verir.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/duz-rekor/duz-rekor1.jpeg']
        },
        {
          id: 'hava-hazirlayici',
          name: 'Hava Hazırlayıcı',
          description: 'Hava hazırlayıcı üniteler, pnömatik sistemlere iletilen basınçlı havayı filtreler, basıncını düzenler ve ihtiyaca göre yağlar. Temiz ve kararlı hava beslemesi; valf, silindir ve diğer ekipmanların daha verimli, güvenilir ve uzun ömürlü çalışmasına yardımcı olur.',
          images: [
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hazirlayici/hava-hazirlayici1.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hazirlayici/hava-hazirlayici2.jpeg'
          ]
        },
        {
          id: 'hava-hortumu',
          name: 'Pnömatik Hava Hortumu',
          description: 'Pnömatik hava hortumu, basınçlı havanın ekipmanlar arasında esnek ve güvenli biçimde taşınmasını sağlar. Uygun malzeme, çap ve çalışma basıncı seçimi; sistemin hareket kabiliyetini, montaj kolaylığını ve bağlantı güvenilirliğini doğrudan destekler.',
          images: [
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hortumu/hava-hortumu1.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hortumu/hava-hortumu2.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hortumu/hava-hortumu3.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hortumu/hava-hortumu4.jpeg',
            'site%20i%C3%A7i%20g%C3%B6rseller/pnomatik/hava-hortumu/hava-hortumu5.jpeg'
          ]
        }
      ]
    },
    {
      id: 'seviye-kontrol',
      title: 'Seviye Kontrol',
      description: 'Tank, kazan ve proses hatlarında sıvı seviyesini izlemek, kontrol etmek ve güvenli çalışma koşullarını sürdürmek için ürünler.',
      seo: {
        title: 'Seviye Kontrol Sistemleri | Seviye Şalteri ve Göstergesi | Alp Teknik',
        description: 'Tank, kazan ve proses hatları için seviye şalteri, seviye göstergesi, seviye ölçüm cihazı ve kontrol paneli ürünlerini inceleyin.',
        keywords: 'seviye kontrol, seviye şalteri, seviye göstergesi, seviye ölçüm cihazı, tank seviye kontrolü, kazan seviye kontrolü, seviye paneli',
        intro: 'Seviye kontrol ürünleri; tank, kazan ve proses ekipmanlarında taşma, kuru çalışma ve istenmeyen seviye değişimlerini önlemeye yardımcı olur. Seviye şalteri, gösterge, ölçüm cihazı ve kontrol paneli seçimi; akışkan özellikleri, basınç, sıcaklık, bağlantı şekli ve istenen kontrol senaryosuna göre değerlendirilir. Güvenilir seviye izleme, işletme emniyeti ve süreç sürekliliği sağlar.'
      },
      products: [
        {
          id: 'aeld-11-seviye-izleme-gostergesi',
          name: 'AELD-11 Seviye İzleme Göstergesi',
          description: 'AELD-11, sıvı seviyesi veya hat içi akışın görsel olarak izlenmesini sağlayan kompakt bir gösterge çözümüdür. Cam ya da pleksi gösterge borusu seçenekleriyle farklı uygulamalara uyum sağlar; bakım ve kontrol noktalarında hızlı değerlendirme olanağı sunar.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/seviye-kontrol/aeld-11-seviye-izleme-gostergesi/aeld-11-seviye-izleme-gostergesi1.jpeg']
        },
        {
          id: 'eg-11-seviye-olcum-cihazi',
          name: 'EG-11 Seviye Ölçüm Cihazı',
          description: 'EG-11 seviye ölçüm cihazı, tank ve proses ekipmanlarında seviye bilgisini ölçerek kontrol sistemine iletmek için kullanılır. Şamandıralı çalışma yapısı ve kontrol panelleriyle uyumu sayesinde sürekli izleme, alarm yönetimi ve otomatik işletme senaryolarını destekler.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/seviye-kontrol/eg-11-seviye-olcum-cihazi/eg-11-seviye-olcum-cihazi1.jpeg']
        },
        {
          id: 'flansli-seviye-salteri',
          name: 'Flanşlı Seviye Şalteri',
          description: 'Flanşlı seviye şalteri, belirlenen sıvı seviyelerinde kontrol sinyali üretmek için tasarlanmış mekanik bir çözümdür. Tank yüzeyine güvenli montajı, sağlam gövdesi ve pompa ya da alarm sistemleriyle uyumlu kontak yapısı sayesinde işletme emniyetini artırır.',
          images: ['site%20i%C3%A7i%20g%C3%B6rseller/seviye-kontrol/flansli-seviye-salteri/flansli-seviye-salteri1.jpeg']
        }
      ]
    }
  ]
};
