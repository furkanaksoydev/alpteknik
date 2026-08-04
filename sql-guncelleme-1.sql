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
