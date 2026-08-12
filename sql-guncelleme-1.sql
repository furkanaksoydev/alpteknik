-- Katalog ürün verisi için MySQL / MariaDB güncellemesi.
-- Yarın tüm ürünler eklendiğinde yalnızca yeni INSERT satırları eklenmelidir.

USE laviraco_alpteknik;

CREATE TABLE IF NOT EXISTS catalog_categories (
  id VARCHAR(80) NOT NULL PRIMARY KEY,
  title VARCHAR(140) NOT NULL,
  description VARCHAR(360) NOT NULL,
  display_order TINYINT UNSIGNED NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS catalog_products (
  id VARCHAR(120) NOT NULL PRIMARY KEY,
  category_id VARCHAR(80) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description VARCHAR(500) NOT NULL,
  display_order TINYINT UNSIGNED NOT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_catalog_product_category FOREIGN KEY (category_id) REFERENCES catalog_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS catalog_product_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(120) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200) NOT NULL,
  display_order TINYINT UNSIGNED NOT NULL,
  CONSTRAINT uq_catalog_product_image UNIQUE (product_id, image_path),
  CONSTRAINT fk_catalog_image_product FOREIGN KEY (product_id) REFERENCES catalog_products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

INSERT INTO catalog_categories (id, title, description, display_order) VALUES
('ari-armaturen', 'ARI-Armaturen', 'Kontrol, kesme, basınç ve buhar uygulamaları için ARI-Armaturen marka endüstriyel vana, aktüatör ve kondenstop çözümleri.', 1),
('boru-ve-baglanti-elemanlari', 'Boru & Bağlantı Elemanları', 'Boru hatlarının güvenli, sızdırmaz ve uygulamaya uygun kurulumu için flanş, fitting, nipel, dirsek ve reduksiyon ürünleri.', 2),
('endustriyel-vanalar', 'Endüstriyel Vanalar', 'Proses hatlarında akışı kesmek, yönlendirmek, kontrol etmek ve çalışma basıncını güvenle yönetmek için vana çözümleri.', 3),
('pnomatik', 'Pnömatik Sistemler', 'Basınçlı hava hatları için rekor, hortum, silindir, valf, sensör ve hava hazırlayıcı ekipmanlardan oluşan ürün grupları.', 4),
('seviye-kontrol', 'Seviye Kontrol', 'Tank, kazan ve proses hatlarında sıvı seviyesini izlemek, kontrol etmek ve güvenli çalışma koşullarını sürdürmek için ürünler.', 5)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), display_order=VALUES(display_order), is_active=1;

INSERT INTO catalog_products (id, category_id, title, description, display_order) VALUES
('astra-plus-debi-regulasyon-vanasi', 'ari-armaturen', 'ASTRA Plus Debi Regülasyon Vanası', 'ARI ASTRA Plus; ısıtma ve iklimlendirme hatlarında debinin hassas ayarlanması için kullanılan kombine bir regülasyon vanasıdır. Ölçüm noktaları ve ayar imkânı sayesinde sistem dengelemesini güvenli, tekrarlanabilir ve servis kolaylığı sağlayacak biçimde destekler.', 1),
('cona-b-600-bimetalik-kondenstop', 'ari-armaturen', 'CONA B 600 Bimetalik Kondenstop', 'CONA B 600, buhar sistemlerinde soğutulmuş kondensi kontrollü biçimde tahliye etmek için tasarlanan bimetalik kondenstoptur. Ayarlanabilir alt soğutma özelliği, dayanıklı iç yapısı ve otomatik hava tahliyesiyle hat verimliliğini ve işletme sürekliliğini destekler.', 2),
('cona-s-631a-samandirali-kondenstop', 'ari-armaturen', 'CONA S 631A Şamandıralı Kondenstop', 'CONA S 631A, değişken basınç ve kondens yüklerinde kararlı tahliye sağlayan şamandıralı kondenstoptur. Entegre hava tahliyesi, su darbesine dayanıklı yapısı ve servis kolaylığı sayesinde buhar proseslerinde güvenilir kondens yönetimine katkı sağlar.', 3),
('boru-kepi', 'boru-ve-baglanti-elemanlari', 'Boru Kepi', 'Boru kepi, kaynaklı veya tesisat bağlantılarında boru ucunu güvenli biçimde kapatmak için kullanılan bağlantı elemanıdır. Uygun çap ve malzeme seçimiyle hat sonlarında sızdırmazlık, mekanik dayanım ve temiz bir montaj görünümü sağlar.', 1),
('duz-flans', 'boru-ve-baglanti-elemanlari', 'Düz Flanş', 'Düz flanş; boru, vana ve ekipmanları sökülebilir şekilde birleştirmek için kullanılan standart bir bağlantı elemanıdır. Doğru conta ve cıvata seçimiyle bakım erişimini kolaylaştırır, hat bütünlüğünü korur ve montaj süresini kısaltır.', 2),
('galvaniz-nipel', 'boru-ve-baglanti-elemanlari', 'Galvaniz Nipel', 'Galvaniz nipel, dişli boru hatlarında iki bağlantı noktasını birleştirmek için kullanılan dayanıklı bir ara parçadır. Korozyona karşı korumalı yüzeyi ve farklı ölçü seçenekleri sayesinde su, hava ve genel tesisat uygulamalarında pratik çözüm sunar.', 3),
('elastik-salmastrali-kesme-vanasi', 'endustriyel-vanalar', 'Elastik Salmastralı Kesme Vanası', 'Elastik salmastralı kesme vanası, akışı güvenli şekilde durdurmak ve hat izolasyonu sağlamak için tasarlanmıştır. Sağlam gövdesi, kontrollü kapama yapısı ve bakım dostu tasarımıyla tesisat ve proses hatlarında uzun ömürlü kullanım sunar.', 1),
('kontrol-vanasi', 'endustriyel-vanalar', 'Kontrol Vanası', 'Kontrol vanaları; debi, basınç ve sıcaklık gibi proses değişkenlerini istenen çalışma aralığında tutmaya yardımcı olur. Uygun aktüatör ve pozisyonerle birlikte kullanıldığında otomasyon sistemine hassas, güvenilir ve izlenebilir akış kontrolü kazandırır.', 2),
('motorlu-kontrol-vanasi', 'endustriyel-vanalar', 'Motorlu Kontrol Vanası', 'Motorlu kontrol vanası, elektrikli aktüatörü sayesinde vana konumunu otomatik biçimde ayarlayarak proses koşullarına hızlı yanıt verir. HVAC, enerji ve endüstriyel uygulamalarda uzaktan kumanda, tekrarlanabilir kontrol ve işletme güvenliği için tercih edilir.', 3),
('duz-rekor', 'pnomatik', 'Düz Rekor', 'Düz rekor, pnömatik hortum ile bağlantı elemanı arasında hızlı ve sızdırmaz geçiş sağlamak için kullanılır. Kompakt gövdesi, pratik montajı ve farklı bağlantı ölçüleri sayesinde makine otomasyonu ve basınçlı hava hatlarında düzenli kurulum imkânı verir.', 1),
('hava-hazirlayici', 'pnomatik', 'Hava Hazırlayıcı', 'Hava hazırlayıcı üniteler, pnömatik sistemlere iletilen basınçlı havayı filtreler, basıncını düzenler ve ihtiyaca göre yağlar. Temiz ve kararlı hava beslemesi; valf, silindir ve diğer ekipmanların daha verimli, güvenilir ve uzun ömürlü çalışmasına yardımcı olur.', 2),
('hava-hortumu', 'pnomatik', 'Pnömatik Hava Hortumu', 'Pnömatik hava hortumu, basınçlı havanın ekipmanlar arasında esnek ve güvenli biçimde taşınmasını sağlar. Uygun malzeme, çap ve çalışma basıncı seçimi; sistemin hareket kabiliyetini, montaj kolaylığını ve bağlantı güvenilirliğini doğrudan destekler.', 3),
('aeld-11-seviye-izleme-gostergesi', 'seviye-kontrol', 'AELD-11 Seviye İzleme Göstergesi', 'AELD-11, sıvı seviyesi veya hat içi akışın görsel olarak izlenmesini sağlayan kompakt bir gösterge çözümüdür. Cam ya da pleksi gösterge borusu seçenekleriyle farklı uygulamalara uyum sağlar; bakım ve kontrol noktalarında hızlı değerlendirme olanağı sunar.', 1),
('eg-11-seviye-olcum-cihazi', 'seviye-kontrol', 'EG-11 Seviye Ölçüm Cihazı', 'EG-11 seviye ölçüm cihazı, tank ve proses ekipmanlarında seviye bilgisini ölçerek kontrol sistemine iletmek için kullanılır. Şamandıralı çalışma yapısı ve kontrol panelleriyle uyumu sayesinde sürekli izleme, alarm yönetimi ve otomatik işletme senaryolarını destekler.', 2),
('flansli-seviye-salteri', 'seviye-kontrol', 'Flanşlı Seviye Şalteri', 'Flanşlı seviye şalteri, belirlenen sıvı seviyelerinde kontrol sinyali üretmek için tasarlanmış mekanik bir çözümdür. Tank yüzeyine güvenli montajı, sağlam gövdesi ve pompa ya da alarm sistemleriyle uyumlu kontak yapısı sayesinde işletme emniyetini artırır.', 3)
ON DUPLICATE KEY UPDATE category_id=VALUES(category_id), title=VALUES(title), description=VALUES(description), display_order=VALUES(display_order), is_published=1;

INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order) VALUES
('astra-plus-debi-regulasyon-vanasi', 'site içi görseller/ari-armaturen/astra-plus-debi-regulasyon-vanasi/astra-plus-debi-regulasyon-vanasi1.webp', 'ASTRA Plus Debi Regülasyon Vanası', 1),
('cona-b-600-bimetalik-kondenstop', 'site içi görseller/ari-armaturen/cona-b-600-bimetalik-kondenstop/cona-b-600-bimetalik-kondenstop1.webp', 'CONA B 600 Bimetalik Kondenstop', 1),
('cona-s-631a-samandirali-kondenstop', 'site içi görseller/ari-armaturen/cona-s-631a-samandirali-kondenstop/cona-s-631a-samandirali-kondenstop1.webp', 'CONA S 631A Şamandıralı Kondenstop', 1),
('boru-kepi', 'site içi görseller/boru-ve-baglanti-elemanlari/boru-kepi/boru-kepi1.png', 'Boru Kepi', 1),
('duz-flans', 'site içi görseller/boru-ve-baglanti-elemanlari/duz-flans/duz-flans1.webp', 'Düz Flanş', 1),
('galvaniz-nipel', 'site içi görseller/boru-ve-baglanti-elemanlari/galvaniz-nipel/galvaniz-nipel1.jpeg', 'Galvaniz Nipel', 1),
('galvaniz-nipel', 'site içi görseller/boru-ve-baglanti-elemanlari/galvaniz-nipel/galvaniz-nipel2.webp', 'Galvaniz Nipel', 2),
('elastik-salmastrali-kesme-vanasi', 'site içi görseller/endustriyel-vanalar/elastik-salmastrali-kesme-vanasi/elastik-salmastrali-kesme-vanasi1.jpeg', 'Elastik Salmastralı Kesme Vanası', 1),
('kontrol-vanasi', 'site içi görseller/endustriyel-vanalar/kontrol-vanasi/kontrol-vanasi1.jpeg', 'Kontrol Vanası', 1),
('kontrol-vanasi', 'site içi görseller/endustriyel-vanalar/kontrol-vanasi/kontrol-vanasi2.jpeg', 'Kontrol Vanası', 2),
('kontrol-vanasi', 'site içi görseller/endustriyel-vanalar/kontrol-vanasi/kontrol-vanasi3.jpeg', 'Kontrol Vanası', 3),
('motorlu-kontrol-vanasi', 'site içi görseller/endustriyel-vanalar/motorlu-kontrol-vanasi/motorlu-kontrol-vanasi1.jpeg', 'Motorlu Kontrol Vanası', 1),
('duz-rekor', 'site içi görseller/pnomatik/duz-rekor/duz-rekor1.jpeg', 'Düz Rekor', 1),
('hava-hazirlayici', 'site içi görseller/pnomatik/hava-hazirlayici/hava-hazirlayici1.jpeg', 'Hava Hazırlayıcı', 1),
('hava-hazirlayici', 'site içi görseller/pnomatik/hava-hazirlayici/hava-hazirlayici2.jpeg', 'Hava Hazırlayıcı', 2),
('hava-hortumu', 'site içi görseller/pnomatik/hava-hortumu/hava-hortumu1.jpeg', 'Pnömatik Hava Hortumu', 1),
('hava-hortumu', 'site içi görseller/pnomatik/hava-hortumu/hava-hortumu2.jpeg', 'Pnömatik Hava Hortumu', 2),
('hava-hortumu', 'site içi görseller/pnomatik/hava-hortumu/hava-hortumu3.jpeg', 'Pnömatik Hava Hortumu', 3),
('hava-hortumu', 'site içi görseller/pnomatik/hava-hortumu/hava-hortumu4.jpeg', 'Pnömatik Hava Hortumu', 4),
('hava-hortumu', 'site içi görseller/pnomatik/hava-hortumu/hava-hortumu5.jpeg', 'Pnömatik Hava Hortumu', 5),
('aeld-11-seviye-izleme-gostergesi', 'site içi görseller/seviye-kontrol/aeld-11-seviye-izleme-gostergesi/aeld-11-seviye-izleme-gostergesi1.jpeg', 'AELD-11 Seviye İzleme Göstergesi', 1),
('eg-11-seviye-olcum-cihazi', 'site içi görseller/seviye-kontrol/eg-11-seviye-olcum-cihazi/eg-11-seviye-olcum-cihazi1.jpeg', 'EG-11 Seviye Ölçüm Cihazı', 1),
('flansli-seviye-salteri', 'site içi görseller/seviye-kontrol/flansli-seviye-salteri/flansli-seviye-salteri1.jpeg', 'Flanşlı Seviye Şalteri', 1)
ON DUPLICATE KEY UPDATE alt_text=VALUES(alt_text), display_order=VALUES(display_order);

-- 2026-08-08: Tüm yerel ürün klasörleri için katalog genişletmesi.
-- Statik katalogdaki veri ile aynı ürün kimliklerini kullanır.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS catalog_product_specifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(120) NOT NULL,
  specification_label VARCHAR(120) NOT NULL,
  specification_value TEXT NOT NULL,
  display_order TINYINT UNSIGNED NOT NULL,
  CONSTRAINT uq_catalog_product_specification UNIQUE (product_id, specification_label),
  CONSTRAINT fk_catalog_specification_product FOREIGN KEY (product_id) REFERENCES catalog_products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS catalog_product_sources (
  product_id VARCHAR(120) NOT NULL PRIMARY KEY,
  source_url VARCHAR(600) NOT NULL,
  source_name VARCHAR(100) NOT NULL DEFAULT 'Üretici teknik kaynağı',
  verified_at DATE NOT NULL,
  CONSTRAINT fk_catalog_source_product FOREIGN KEY (product_id) REFERENCES catalog_products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS catalog_product_information (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(120) NOT NULL,
  information_type ENUM('application_areas','installation','benefits') NOT NULL,
  information_text TEXT NOT NULL,
  display_order TINYINT UNSIGNED NOT NULL,
  CONSTRAINT uq_catalog_product_information UNIQUE (product_id, information_type),
  CONSTRAINT fk_catalog_information_product FOREIGN KEY (product_id) REFERENCES catalog_products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TEMPORARY TABLE tmp_catalog_seed (
  id VARCHAR(120) NOT NULL PRIMARY KEY,
  category_id VARCHAR(80) NOT NULL,
  title VARCHAR(180) NOT NULL,
  display_order TINYINT UNSIGNED NOT NULL,
  image_extensions VARCHAR(80) NOT NULL
) ENGINE=Memory;

INSERT INTO tmp_catalog_seed (id, category_id, title, display_order, image_extensions) VALUES
('astra-plus-debi-regulasyon-vanasi','ari-armaturen','ASTRA Plus Debi Regülasyon Vanası',1,'webp'),
('cona-b-600-bimetalik-kondenstop','ari-armaturen','CONA B 600 Bimetalik Kondenstop',2,'webp'),
('cona-s-631a-samandirali-kondenstop','ari-armaturen','CONA S 631A Şamandıralı Kondenstop',3,'webp'),
('cona-sc-634-samandirali-kondenstop','ari-armaturen','CONA SC 634 Şamandıralı Kondenstop',4,'webp'),
('cona-td-641-termodinamik-kondenstop','ari-armaturen','CONA TD 641 Termodinamik Kondenstop',5,'webp'),
('dp32-34-pnomatik-aktuator','ari-armaturen','DP32/34 Pnömatik Aktüatör',6,'webp'),
('euro-wedi-kesme-vanasi','ari-armaturen','EURO-WEDI Kesme Vanası',7,'webp'),
('predu-basinc-dusurucu','ari-armaturen','PREDU Basınç Düşürücü',8,'webp'),
('premio-elektrik-aktuator','ari-armaturen','PREMIO Elektrik Aktüatör',9,'webp'),
('preso-basinc-dusurucu','ari-armaturen','PRESO Basınç Düşürücü',10,'webp'),
('schmutzfaenger-pislik-tutucu','ari-armaturen','Schmutzfänger Pislik Tutucu',11,'webp'),
('stevi-405-dp-kontrol-vanasi','ari-armaturen','STEVI 405 DP Kontrol Vanası',12,'webp'),
('stevi-440-premio-kontrol-vanasi','ari-armaturen','STEVI 440 PREMIO Kontrol Vanası',13,'webp'),
('stevi-470-dp-sipart-kontrol-vanasi','ari-armaturen','STEVI 470 DP SIPART Kontrol Vanası',14,'webp'),
('stevi-as-350-yuksek-basinc-kontrol-vanasi','ari-armaturen','STEVI AS 350 Yüksek Basınç Kontrol Vanası',15,'webp'),
('stobu-kesme-vanasi','ari-armaturen','STOBU Kesme Vanası',16,'webp'),
('stobu-pn160-yuksek-basinc-kesme-vanasi','ari-armaturen','STOBU PN160 Yüksek Basınç Kesme Vanası',17,'webp'),
('temptrol-sicaklik-kontrol-vanasi','ari-armaturen','TEMPTROL Sıcaklık Kontrol Vanası',18,'webp'),
('ziva-z-kesme-vanasi','ari-armaturen','ZIVA-Z Kesme Vanası',19,'png'),
('boru-kepi','boru-ve-baglanti-elemanlari','Boru Kepi',1,'png'),('duz-flans','boru-ve-baglanti-elemanlari','Düz Flanş',2,'webp'),('galvaniz-nipel','boru-ve-baglanti-elemanlari','Galvaniz Nipel',3,'jpeg,webp'),('kaynak-boyunlu-flans','boru-ve-baglanti-elemanlari','Kaynak Boyunlu Flanş',4,'gif'),('konsantrik-reduksiyon','boru-ve-baglanti-elemanlari','Konsantrik Redüksiyon',5,'jpeg'),('paslanmaz-disli-dirsek','boru-ve-baglanti-elemanlari','Paslanmaz Dişli Dirsek',6,'jpeg'),('paslanmaz-disli-te','boru-ve-baglanti-elemanlari','Paslanmaz Dişli Te',7,'webp'),('paslanmaz-fittings','boru-ve-baglanti-elemanlari','Paslanmaz Fittings',8,'jpeg'),('paslanmaz-konik-disli-rekor','boru-ve-baglanti-elemanlari','Paslanmaz Konik Dişli Rekor',9,'jpeg'),('paslanmaz-patent-te','boru-ve-baglanti-elemanlari','Paslanmaz Patent Te',10,'jpeg'),('patent-dirsek','boru-ve-baglanti-elemanlari','Patent Dirsek',11,'png'),('siyah-disli-flans','boru-ve-baglanti-elemanlari','Siyah Dişli Flanş',12,'webp'),('siyah-disli-reduksiyon','boru-ve-baglanti-elemanlari','Siyah Dişli Redüksiyon',13,'webp'),('siyah-kor-tapa','boru-ve-baglanti-elemanlari','Siyah Kör Tapa',14,'jpeg'),
('elastik-salmastrali-kesme-vanasi','endustriyel-vanalar','Elastik Salmastralı Kesme Vanası',1,'jpeg'),('kontrol-vanasi','endustriyel-vanalar','Kontrol Vanası',2,'jpeg,jpeg,jpeg'),('motorlu-kontrol-vanasi','endustriyel-vanalar','Motorlu Kontrol Vanası',3,'jpeg'),('motorlu-vana','endustriyel-vanalar','Motorlu Vana',4,'jpeg,jpeg,jpeg,jpeg'),('pilot-tesirli-basinc-dusurucu','endustriyel-vanalar','Pilot Tesirli Basınç Düşürücü',5,'jpeg'),('pnomatik-kontrol-vanasi','endustriyel-vanalar','Pnömatik Kontrol Vanası',6,'jpeg,jpeg'),('pnomatik-pistonlu-vana','endustriyel-vanalar','Pnömatik Pistonlu Vana',7,'jpeg,jpeg'),('termostatik-vana','endustriyel-vanalar','Termostatik Vana',8,'jpeg'),
('duz-rekor','pnomatik','Düz Rekor',1,'jpeg'),('hava-hazirlayici','pnomatik','Hava Hazırlayıcı',2,'jpeg,jpeg'),('hava-hortumu','pnomatik','Pnömatik Hava Hortumu',3,'jpeg,jpeg,jpeg,jpeg,jpeg'),('hortum-rakoru','pnomatik','Hortum Rakoru',4,'jpeg'),('kompakt-silindir','pnomatik','Kompakt Silindir',5,'jpeg'),('manyetik-sensor','pnomatik','Manyetik Sensör',6,'jpeg'),('pirinc-rakor','pnomatik','Pirinç Rakor',7,'jpeg'),('pnomatik-rekor','pnomatik','Pnömatik Rekor',8,'jpeg,jpeg,jpeg'),('selenoid-valf','pnomatik','Selenoid Valf',9,'jpeg'),('selenoid-valf-bobini','pnomatik','Selenoid Valf Bobini',10,'jpeg'),('sensor-test-cihazi','pnomatik','Sensör Test Cihazı',11,'jpeg'),('standart-silindir','pnomatik','Standart Silindir',12,'jpeg'),('valf-manifoldu','pnomatik','Valf Manifoldu',13,'jpeg'),('yon-kontrol-valfi','pnomatik','Yön Kontrol Valfi',14,'jpeg'),('yuvarlak-silindir','pnomatik','Yuvarlak Silindir',15,'jpeg'),
('aeld-11-seviye-izleme-gostergesi','seviye-kontrol','AELD-11 Seviye İzleme Göstergesi',1,'jpeg'),('eg-11-seviye-olcum-cihazi','seviye-kontrol','EG-11 Seviye Ölçüm Cihazı',2,'jpeg'),('flansli-seviye-salteri','seviye-kontrol','Flanşlı Seviye Şalteri',3,'jpeg'),('kablolu-seviye-salteri','seviye-kontrol','Kablolu Seviye Şalteri',4,'jpeg'),('kazan-tagdiye-cihazi','seviye-kontrol','Kazan Tağdiye Cihazı',5,'jpeg,jpeg'),('kts-50-seviye-tank-samandirasi','seviye-kontrol','KTS-50 Seviye Tank Şamandırası',6,'jpeg'),('manyetik-seviye-gostergesi','seviye-kontrol','Manyetik Seviye Göstergesi',7,'jpeg,jpeg,jpeg,jpeg,jpeg,jpeg'),('mekanik-seviye-salteri','seviye-kontrol','Mekanik Seviye Şalteri',8,'jpeg,jpeg'),('mg-33sv-seviye-gostergesi','seviye-kontrol','MG-33SV Seviye Göstergesi',9,'jpeg'),('rotlu-seviye-salteri','seviye-kontrol','Rotlu Seviye Şalteri',10,'jpeg'),('seviye-kontrol-paneli','seviye-kontrol','Seviye Kontrol Paneli',11,'jpeg,jpeg,jpeg'),('seviye-samandirasi','seviye-kontrol','Seviye Şamandırası',12,'jpeg,jpeg,jpeg,jpeg,jpeg');

INSERT INTO catalog_products (id, category_id, title, description, display_order)
SELECT id, category_id, title,
  CASE category_id
    WHEN 'ari-armaturen' THEN CONCAT(title, '; buhar, sıcak su ve proses hatlarında güvenilir akış yönetimi için seçilen ARI-Armaturen ürün grubunun parçasıdır. Uygun anma çapı, basınç, sıcaklık, malzeme ve bağlantı standardı uygulamaya göre belirlenmelidir.')
    WHEN 'boru-ve-baglanti-elemanlari' THEN CONCAT(title, ', boru hatlarında güvenli montaj ve bağlantı bütünlüğü için kullanılır. Malzeme, çap, et kalınlığı ve bağlantı tipi proje koşullarına göre doğrulanmalıdır.')
    WHEN 'endustriyel-vanalar' THEN CONCAT(title, '; proses hattındaki akışın kesilmesi, yönlendirilmesi veya kontrolü için kullanılır. Vana seçimi akışkan, basınç, sıcaklık ve otomasyon ihtiyacına göre yapılmalıdır.')
    WHEN 'pnomatik' THEN CONCAT(title, ', basınçlı hava sistemlerinde güvenli bağlantı ve kontrollü hareket için kullanılır. Çalışma basıncı ve bağlantı ölçüsü uygulamaya göre teyit edilmelidir.')
    ELSE CONCAT(title, '; tank, kazan ve proses ekipmanlarında seviye izleme veya kontrolünü destekler. Teknik seçim akışkan ve çalışma koşullarına göre yapılmalıdır.')
  END, display_order
FROM tmp_catalog_seed
ON DUPLICATE KEY UPDATE category_id=VALUES(category_id), title=VALUES(title), description=VALUES(description), display_order=VALUES(display_order), is_published=1;

DELETE image_row FROM catalog_product_images image_row INNER JOIN tmp_catalog_seed seed ON seed.id=image_row.product_id;
INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order)
SELECT id, CONCAT('site içi görseller/',category_id,'/',id,'/',id,'1.',SUBSTRING_INDEX(image_extensions,',',1)), title, 1 FROM tmp_catalog_seed;
INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order)
SELECT id, CONCAT('site içi görseller/',category_id,'/',id,'/',id,'2.',SUBSTRING_INDEX(SUBSTRING_INDEX(image_extensions,',',2),',',-1)), title, 2 FROM tmp_catalog_seed WHERE LENGTH(image_extensions)-LENGTH(REPLACE(image_extensions,',',''))>=1;
INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order)
SELECT id, CONCAT('site içi görseller/',category_id,'/',id,'/',id,'3.',SUBSTRING_INDEX(SUBSTRING_INDEX(image_extensions,',',3),',',-1)), title, 3 FROM tmp_catalog_seed WHERE LENGTH(image_extensions)-LENGTH(REPLACE(image_extensions,',',''))>=2;
INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order)
SELECT id, CONCAT('site içi görseller/',category_id,'/',id,'/',id,'4.',SUBSTRING_INDEX(SUBSTRING_INDEX(image_extensions,',',4),',',-1)), title, 4 FROM tmp_catalog_seed WHERE LENGTH(image_extensions)-LENGTH(REPLACE(image_extensions,',',''))>=3;
INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order)
SELECT id, CONCAT('site içi görseller/',category_id,'/',id,'/',id,'5.',SUBSTRING_INDEX(SUBSTRING_INDEX(image_extensions,',',5),',',-1)), title, 5 FROM tmp_catalog_seed WHERE LENGTH(image_extensions)-LENGTH(REPLACE(image_extensions,',',''))>=4;
INSERT INTO catalog_product_images (product_id, image_path, alt_text, display_order)
SELECT id, CONCAT('site içi görseller/',category_id,'/',id,'/',id,'6.',SUBSTRING_INDEX(SUBSTRING_INDEX(image_extensions,',',6),',',-1)), title, 6 FROM tmp_catalog_seed WHERE LENGTH(image_extensions)-LENGTH(REPLACE(image_extensions,',',''))>=5;

DELETE spec FROM catalog_product_specifications spec INNER JOIN tmp_catalog_seed seed ON seed.id=spec.product_id;
INSERT INTO catalog_product_specifications (product_id,specification_label,specification_value,display_order) VALUES
('astra-plus-debi-regulasyon-vanasi','Anma çapı','DN15 (1/2″) – DN400 (16″)',1),('astra-plus-debi-regulasyon-vanasi','Basınç sınıfı','PN16',2),('astra-plus-debi-regulasyon-vanasi','Maksimum sıcaklık','120 °C, 175 °C, 200 °C ve 350 °C (modele göre)',3),
('cona-b-600-bimetalik-kondenstop','Anma çapı','DN15 (1/2″) – DN50 (2″)',1),('cona-b-600-bimetalik-kondenstop','Kontrolör fark basıncı','13 bar – 320 bar (kontrolöre göre)',2),('cona-b-600-bimetalik-kondenstop','Maksimum sıcaklık','300 °C – 550 °C (figüre göre)',3),
('cona-s-631a-samandirali-kondenstop','Anma çapı','DN15 (1/2″) – DN100 (4″)',1),('cona-s-631a-samandirali-kondenstop','Basınç sınıfları','PN16, PN40, PN63, PN100 ve PN160',2),
('cona-sc-634-samandirali-kondenstop','Anma çapı','DN15 (1/2″) – DN25 (1″)',1),('cona-sc-634-samandirali-kondenstop','Basınç sınıfları','PN16, PN25 ve PN40',2),
('cona-td-641-termodinamik-kondenstop','Anma çapı','DN15 (1/2″) – DN25 (1″)',1),('cona-td-641-termodinamik-kondenstop','Basınç sınıfları','PN40 ve PN63',2),
('euro-wedi-kesme-vanasi','Anma çapı','DN15 (1/2″) – DN200 (8″)',1),('euro-wedi-kesme-vanasi','Basınç sınıfı','PN6 ve PN16',2),('euro-wedi-kesme-vanasi','Maksimum sıcaklık','120 °C',3),
('predu-basinc-dusurucu','Anma çapı','DN15 (1/2″) – DN150 (6″)',1),('predu-basinc-dusurucu','Basınç sınıfları','PN16, PN25 ve PN40',2),
('stevi-405-dp-kontrol-vanasi','Anma çapı','DN15 (1/2″) – DN500 (20″)',1),('stevi-405-dp-kontrol-vanasi','Maksimum basınç','16 bar, 25 bar veya 40 bar (gövde malzemesine göre)',2),
('stevi-440-premio-kontrol-vanasi','Anma çapı','DN15 (1/2″) – DN150 (6″)',1),('stevi-440-premio-kontrol-vanasi','Maksimum basınç','16 bar, 25 bar veya 40 bar (gövde malzemesine göre)',2),
('stobu-kesme-vanasi','Anma çapı','DN15 (1/2″) – DN500 (20″)',1),('stobu-kesme-vanasi','Basınç sınıfları','PN16, PN25 ve PN40',2),
('aeld-11-seviye-izleme-gostergesi','Boru malzemesi','Cam veya plexi',1),('aeld-11-seviye-izleme-gostergesi','Çalışma sıcaklığı','60 °C (cam) / 100 °C (plexi)',2),('aeld-11-seviye-izleme-gostergesi','İşletme basıncı','2 bar (cam) / 3 bar (plexi)',3),
('kazan-tagdiye-cihazi','Maksimum basınç','25 bar',1),('kazan-tagdiye-cihazi','Maksimum çalışma sıcaklığı','200 °C',2),
('kts-50-seviye-tank-samandirasi','Bağlantı','Dişli (3/4″)',1),('kts-50-seviye-tank-samandirasi','Maksimum basınç','6 bar',2),('kts-50-seviye-tank-samandirasi','Maksimum sıcaklık','90 °C',3),
('rotlu-seviye-salteri','Çalışma sıcaklığı','-10 °C / +125 °C',1),('rotlu-seviye-salteri','Maksimum çalışma basıncı','16 bar',2),('rotlu-seviye-salteri','Koruma sınıfı','IP68 + EX-PROOF',3)
ON DUPLICATE KEY UPDATE specification_value=VALUES(specification_value), display_order=VALUES(display_order);

DELETE source_row FROM catalog_product_sources source_row INNER JOIN tmp_catalog_seed seed ON seed.id=source_row.product_id;
INSERT INTO catalog_product_sources (product_id,source_url,source_name,verified_at) VALUES
('astra-plus-debi-regulasyon-vanasi','https://www.ayvaz.com/urun/ari-astra-astra-plus-akis-kontrol-vanasi/','Üretici teknik kaynağı','2026-08-12'),('cona-b-600-bimetalik-kondenstop','https://www.ayvaz.com/urun/ari-cona-b-bimetalik-buhar-kapani-kondenstop/','Üretici teknik kaynağı','2026-08-12'),('cona-s-631a-samandirali-kondenstop','https://www.ayvaz.com/urun/ari-cona-s-samandirali-buhar-kapani-kondenstop/','Üretici teknik kaynağı','2026-08-12'),('cona-sc-634-samandirali-kondenstop','https://www.ayvaz.com/urun/ari-cona-sc-samandirali-buhar-kapani-kondenstop/','Üretici teknik kaynağı','2026-08-12'),('cona-td-641-termodinamik-kondenstop','https://www.ayvaz.com/urun/ari-cona-td-termodinamik-buhar-kapani-kondenstop/','Üretici teknik kaynağı','2026-08-12'),('euro-wedi-kesme-vanasi','https://www.ayvaz.com/urun/ari-euro-wedi-yumusak-contali-kesme-vanasi/','Üretici teknik kaynağı','2026-08-12'),('predu-basinc-dusurucu','https://www.ayvaz.com/urun/ari-predu-direkt-tesirli-denge-koruklu-basinc-dusurucu/','Üretici teknik kaynağı','2026-08-12'),('stevi-405-dp-kontrol-vanasi','https://www.ayvaz.com/urun/ari-stevi-405-460-serisi-aktuatorlu-kesme-vanasi-en/','Üretici teknik kaynağı','2026-08-12'),('stevi-440-premio-kontrol-vanasi','https://www.ayvaz.com/urun/ari-stevi-smart-440-441-serisi-2-yollu-kontrol-vanasi/','Üretici teknik kaynağı','2026-08-12'),('stobu-kesme-vanasi','https://www.ayvaz.com/urun/ari-stobu-baskili-tip-kesme-vanasi/','Üretici teknik kaynağı','2026-08-12'),('aeld-11-seviye-izleme-gostergesi','https://www.ayvaz.com/urun/aeld-11-seviye-gostergesi/','Üretici teknik kaynağı','2026-08-12'),('kazan-tagdiye-cihazi','https://www.ayvaz.com/urun/kazan-tagdiye-cihazi/','Üretici teknik kaynağı','2026-08-12'),('kts-50-seviye-tank-samandirasi','https://www.ayvaz.com/urun/kts-50-seviye-tank-samandirasi/','Üretici teknik kaynağı','2026-08-12'),('rotlu-seviye-salteri','https://www.ayvaz.com/urun/au-20-rotlu-seviye-salteri/','Üretici teknik kaynağı','2026-08-12')
ON DUPLICATE KEY UPDATE source_url=VALUES(source_url), source_name=VALUES(source_name), verified_at=VALUES(verified_at);

-- Kullanıcı arayüzündeki Kurulum / Uygulama Alanları / Avantajlar panelleri için kaynak doğrulamalı metinler.
INSERT INTO catalog_product_information (product_id, information_type, information_text, display_order) VALUES
('astra-plus-debi-regulasyon-vanasi','application_areas','Buhar, sıcak su ve proses hatlarında debi, diferansiyel basınç veya akış koşullarının dengelenmesi gereken uygulamalar.',1),
('astra-plus-debi-regulasyon-vanasi','installation','Bağlantı biçimi, anma çapı, akış yönü ve seçilen modelin sıcaklık-basınç sınırları proje verileriyle doğrulanmalıdır.',2),
('astra-plus-debi-regulasyon-vanasi','benefits','Tek gövdede akış kontrolü ve sistem dengesini destekleyerek daha kararlı işletme koşullarına yardımcı olur.',3),
('aeld-11-seviye-izleme-gostergesi','application_areas','Makine imalatı, gıda tesisi ve boru hatlarında sıvı akışının ya da seviyenin görsel olarak izlenmesi gereken uygulamalar.',1),
('aeld-11-seviye-izleme-gostergesi','installation','Boru malzemesi ve rakor seçimi çalışma sıcaklığı ile işletme basıncına uygun belirlenmeli; opsiyonel kontak için elektrik bağlantısı talimata göre yapılmalıdır.',2),
('aeld-11-seviye-izleme-gostergesi','benefits','Kolay montaj, cam veya plexi gösterge seçeneği ve opsiyonel manyetik kontak ile görsel izlemeyi destekler.',3),
('kts-50-seviye-tank-samandirasi','application_areas','Depo ve tanklarda sıvı seviyesine bağlı mekanik kontrol veya sinyal ihtiyacı olan uygulamalar.',1),
('kts-50-seviye-tank-samandirasi','installation','3/4″ dişli bağlantı, çalışma basıncı ve sıcaklık sınırları kontrol edilerek şamandıranın serbest hareket edeceği konumda kurulmalıdır.',2),
('kts-50-seviye-tank-samandirasi','benefits','Paslanmaz çelik temas yüzeyiyle dayanıklı seviye algılama ve basit mekanik kullanım sağlar.',3)
ON DUPLICATE KEY UPDATE information_text=VALUES(information_text), display_order=VALUES(display_order);

-- Yerel görselleri kaynakta doğrulanmış tam ürün adlarıyla eşleştirir.
UPDATE catalog_products SET title = CASE id
  WHEN 'astra-plus-debi-regulasyon-vanasi' THEN 'ARI-ASTRA/ASTRA Plus Akış Kontrol Vanası'
  WHEN 'cona-b-600-bimetalik-kondenstop' THEN 'ARI-CONA-B Bimetalik Buhar Kapanı (Kondenstop)'
  WHEN 'cona-s-631a-samandirali-kondenstop' THEN 'ARI-CONA-S Şamandıralı Buhar Kapanı (Kondenstop)'
  WHEN 'cona-sc-634-samandirali-kondenstop' THEN 'ARI-CONA-SC Şamandıralı Buhar Kapanı (Kondenstop)'
  WHEN 'cona-td-641-termodinamik-kondenstop' THEN 'ARI-CONA-TD Termodinamik Buhar Kapanı (Kondenstop)'
  WHEN 'euro-wedi-kesme-vanasi' THEN 'ARI-EURO-WEDI Yumuşak Contalı Kesme Vanası'
  WHEN 'predu-basinc-dusurucu' THEN 'ARI-PREDU Direkt Tesirli Denge Körüklü Basınç Düşürücü'
  WHEN 'schmutzfaenger-pislik-tutucu' THEN 'ARI-Pislik Tutucu'
  WHEN 'stevi-405-dp-kontrol-vanasi' THEN 'ARI-STEVI 405/460 Serisi Aktüatörlü Kesme Vanası EN'
  WHEN 'stevi-440-premio-kontrol-vanasi' THEN 'ARI-STEVI Smart 440/441 Serisi 2-Yollu Kontrol Vanası'
  WHEN 'stobu-kesme-vanasi' THEN 'ARI-STOBU Baskılı Tip Kesme Vanası'
  WHEN 'temptrol-sicaklik-kontrol-vanasi' THEN 'ARI-TEMPTROL Sıcaklık Kontrolörü'
  WHEN 'ziva-z-kesme-vanasi' THEN 'ARI-ZIVA-Z Wafer Tip Kelebek Vana'
  ELSE title
END WHERE id IN ('astra-plus-debi-regulasyon-vanasi','cona-b-600-bimetalik-kondenstop','cona-s-631a-samandirali-kondenstop','cona-sc-634-samandirali-kondenstop','cona-td-641-termodinamik-kondenstop','euro-wedi-kesme-vanasi','predu-basinc-dusurucu','schmutzfaenger-pislik-tutucu','stevi-405-dp-kontrol-vanasi','stevi-440-premio-kontrol-vanasi','stobu-kesme-vanasi','temptrol-sicaklik-kontrol-vanasi','ziva-z-kesme-vanasi');

UPDATE catalog_product_images image_row
INNER JOIN catalog_products product_row ON product_row.id = image_row.product_id
SET image_row.alt_text = product_row.title;

DROP TEMPORARY TABLE tmp_catalog_seed;
