(function () {
    'use strict';

    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const pages = {
        'hakkimizda.html': { theme:'emerald', title:'Üretim kültürümüzü geleceğe taşıyoruz', intro:'Kalite, deneyim ve güveni aynı üretim çizgisinde buluşturuyoruz.', topics:['Tarihçe ve büyüme','Üretim kabiliyeti','Küresel iş ortaklığı'], steps:['İhtiyacı dinliyoruz','Çözümü tasarlıyoruz','Sahada doğruluyoruz'] },
        'muhendislik-ar-ge.html': { theme:'blue', title:'Hesaplanan her detay daha güvenli bir sistemdir', intro:'Mühendislik yaklaşımımız; tasarım, analiz, prototip ve saha geri bildirimini tek döngüde birleştirir.', topics:['CAD ve 3D tasarım','Boru gerilim analizi','Ürün inovasyonu'], steps:['Veriyi topluyoruz','Modeli doğruluyoruz','Performansı izliyoruz'] },
        'kalite-sertifikalarimiz.html': { theme:'violet', title:'Kaliteyi belgelemekten fazlasını yapıyoruz', intro:'Standartlar bizim için yalnızca bir belge değil, her üretim adımında tekrarlanabilir sonuç alma disiplinidir.', topics:['Test protokolleri','İzlenebilirlik','Sürekli iyileştirme'], steps:['Kontrol planı','Üretim testi','Son doğrulama'] },
        'yatirimci-iliskileri.html': { theme:'amber', title:'Şeffaf iletişim, sürdürülebilir büyüme', intro:'Operasyonel gücümüzü teknoloji, verimlilik ve uzun vadeli paydaş değerine dönüştürüyoruz.', topics:['Yatırım öncelikleri','Risk yönetimi','Sürdürülebilirlik'], steps:['Görünür hedefler','Ölçülebilir çıktı','Düzenli paylaşım'] },
        'kompansator-sistemleri.html': { theme:'emerald', title:'Hareketin olduğu her hatta mühendislik gerekir', intro:'Genleşme, titreşim ve sismik hareketleri birlikte değerlendirerek tesisatın servis ömrünü koruyan çözümler geliştiriyoruz.', topics:['Hareket analizi','Malzeme seçimi','Montaj ve saha desteği'], steps:['Hat koşulları','Körük tasarımı','Test ve devreye alma'] },
        'esnek-metal-hortumlar.html': { theme:'blue', title:'Esneklikten ödün vermeden dayanıklılık', intro:'Sıvı, gaz ve buhar taşıma uygulamalarında doğru çap, basınç, sıcaklık ve büküm verisini bir araya getiriyoruz.', topics:['Gaz ve doğalgaz','HVAC-R ve su','Endüstriyel proses'], steps:['Akışkanı tanıyoruz','Hortumu seçiyoruz','Bağlantıyı doğruluyoruz'] },
        'endustriyel-vana-grubu.html': { theme:'amber', title:'Akışı yalnızca kesmiyor, yönetiyoruz', intro:'Kesme, kontrol, balans ve emniyet fonksiyonlarını prosesinize uygun vana mimarisiyle birlikte ele alıyoruz.', topics:['Kesme ve izolasyon','Kontrol ve aktüasyon','Emniyet ve balans'], steps:['Proses analizi','Vana eşleştirme','Devreye alma'] },
        'buhar-kondenstop.html': { theme:'amber', title:'Buharı koruyun, enerjiyi geri kazanın', intro:'Kondensin doğru noktada tahliyesi; güvenli çalışma, daha az kayıp ve daha yüksek sistem verimi sağlar.', topics:['Kondenstop seçimi','Blöf sistemleri','Enerji verimliliği'], steps:['Kayıp haritası','Ekipman seçimi','Performans takibi'] },
        'yangin-koruma-sistemleri.html': { theme:'violet', title:'Kritik anda çalışan bağlantı sistemleri', intro:'Yangın tesisatlarında hız, sızdırmazlık ve onay gerekliliklerini aynı güvenlik çerçevesinde buluşturuyoruz.', topics:['Sprinkler bağlantıları','Yangın vanaları','Test ve bakım'], steps:['Risk senaryosu','Ekipman seçimi','Sistem testi'] },
        'otomasyon-seviye-kontrol.html': { theme:'blue', title:'Veriyi görünür kılın, kararı hızlandırın', intro:'Seviye, akış ve proses sinyallerini ölçülebilir hale getirerek taşma, kuru çalışma ve enerji kayıplarını azaltın.', topics:['Seviye göstergeleri','On-off kontrol','Oransal kontrol'], steps:['Ölçüm noktası','Kontrol senaryosu','Alarm ve izleme'] },
        'referanslar.html': { theme:'emerald', title:'Farklı sektörler, ortak kalite standardı', intro:'Enerji, petrokimya, inşaat, HVAC-R, denizcilik ve ağır sanayide kritik sistemlere çözüm sağlıyoruz.', topics:['Enerji ve petrokimya','Bina ve HVAC-R','Denizcilik ve endüstri'], steps:['Şartname','Uygulama','Uzun dönem destek'] },
        'kataloglar.html': { theme:'violet', title:'Teknik kararları doğru veriyle hızlandırın', intro:'Kataloglar, ürün seçiminden saha uygulamasına kadar ekiplerinizin aynı teknik dili konuşmasına yardımcı olur.', topics:['Ürün katalogları','Uygulama notları','Teknik seçim desteği'], steps:['Dokümanı seçin','Veriyi karşılaştırın','Uzman desteği alın'] },
        'iletisim.html': { theme:'amber', title:'İhtiyacınızı anlatın, çözümü birlikte kuralım', intro:'Teknik şartname, ürün seçimi, teklif ve saha uygulamalarında uzman ekibimiz yanınızda.', topics:['Teklif talebi','Teknik destek','Saha hizmeti'], steps:['Formu doldurun','Ekibimiz incelesin','Çözümünüz netleşsin'] }
    };
    const config = pages[page];
    const newsRoutes = {
        'haber-nppes-2026': 'haber-nppes-2026.html',
        'haber-itm-2026': 'haber-itm-2026.html',
        'NPPES 2026 Nükleer Santraller Zirvesi': 'haber-nppes-2026.html',
        'ITM 2026 Uluslararası Tekstil Makineleri': 'haber-itm-2026.html'
    };
    const pageVariants = {
        'hakkimizda.html': { hero:'atelier', unique:'timeline', uniqueTitle:'75 yılın dönüm noktaları', uniqueIntro:'Üretim kültürümüzü oluşturan adımlar, bugün sunduğumuz güvenin temelini oluşturuyor.', uniqueItems:['Kuruluş ve ilk üretim','Ürün gamının genişlemesi','Küresel üretim ve ihracat'] },
        'muhendislik-ar-ge.html': { hero:'blueprint', unique:'matrix', uniqueTitle:'Mühendislik karar matrisi', uniqueIntro:'Tasarım kararlarını sahadaki gerçek koşullarla birlikte değerlendiriyoruz.', uniqueItems:['Geometri ve hareket','Basınç ve sıcaklık','Malzeme ve standart'] },
        'kalite-sertifikalarimiz.html': { hero:'seal', useMetric:true, metricTitle:'Kalite güvence skoru', metricLabel:'Üretim ve test kontrol kapsamı', metricValue:'96%' },
        'yatirimci-iliskileri.html': { hero:'signal', unique:'impact', uniqueTitle:'Büyümeyi oluşturan üç kaldıraç', uniqueIntro:'Yatırım kararlarımızı operasyonel dayanıklılık, teknoloji ve paydaş değeriyle birlikte ele alıyoruz.', uniqueItems:['Kapasite ve otomasyon','Yeni pazarlar','Sürdürülebilir operasyon'] },
        'kompansator-sistemleri.html': { hero:'orbit', useMetric:true, metricTitle:'Hareket analizi güven seviyesi', metricLabel:'Proje verileriyle doğrulanmış tasarım hazırlığı', metricValue:'88%' },
        'esnek-metal-hortumlar.html': { hero:'wave', useMetric:true, metricTitle:'Hortum seçim doğruluğu', metricLabel:'Basınç, sıcaklık ve akışkan verisi kontrolü', metricValue:'92%' },
        'endustriyel-vana-grubu.html': { hero:'valve', unique:'matrix', uniqueTitle:'Akış kontrolü seçim matrisi', uniqueIntro:'Vananın görevi, akışkanın karakteri ve bakım planı aynı tabloda buluşur.', uniqueItems:['İzolasyon','Modülasyon','Emniyet'] },
        'buhar-kondenstop.html': { hero:'steam', unique:'case', uniqueTitle:'Enerji kaybını azaltan örnek senaryo', uniqueIntro:'Buhar hattında doğru ekipman seçimi; kayıp, bakım ve proses sürekliliğini birlikte etkiler.', uniqueItems:['Gözlem: canlı buhar kaybı','Müdahale: doğru kondenstop','Sonuç: daha dengeli hat'] },
        'yangin-koruma-sistemleri.html': { hero:'shield', unique:'checklist', uniqueTitle:'Yangın sistemi devreye alma kontrolü', uniqueIntro:'Sahada teslim öncesi kontrol edilmesi gereken kritik başlıklar.', uniqueItems:['Bağlantı ve sızdırmazlık','Vana yönü ve erişim','Test ve bakım kaydı'] },
        'otomasyon-seviye-kontrol.html': { hero:'dashboard', unique:'dashboard', uniqueTitle:'Kontrol paneli mantığı', uniqueIntro:'Ölçüm, karar ve alarm akışını aynı sistem dili içinde kurguluyoruz.', uniqueItems:['Ölçüm','Karar','Alarm'] },
        'referanslar.html': { hero:'map', unique:'sectors', uniqueTitle:'Çözüm haritamız', uniqueIntro:'Sektörlerin farklı çalışma koşullarına göre aynı mühendislik disiplinini uyarlıyoruz.', uniqueItems:['Enerji','HVAC-R','Denizcilik'] },
        'kataloglar.html': { hero:'paper', unique:'library', uniqueTitle:'Teknik doküman kütüphanesi', uniqueIntro:'Bir kataloğu yalnızca ürün listesi değil, karar verme aracı olarak tasarlıyoruz.', uniqueItems:['Seçim verisi','Uygulama notu','Uzman desteği'] },
        'iletisim.html': { hero:'conversation', unique:'contact', uniqueTitle:'İletişim sürecimiz', uniqueIntro:'İlk mesajdan teklif kapsamına kadar süreci görünür ve anlaşılır tutuyoruz.', uniqueItems:['Talebi alıyoruz','Teknik ekibe aktarıyoruz','Net kapsamla dönüyoruz'] }
    };
    if (config) Object.assign(config, pageVariants[page] || {});

    function renderUnique(config) {
        if (config.useMetric) return `<div class="unique-metric"><div><div class="page-kicker">ÖLÇÜLEBİLİR KONTROL</div><h3>${config.metricTitle}</h3><p>${config.metricLabel}</p></div><strong>${config.metricValue}</strong><div class="progress-bar" style="--value:${config.metricValue}"><span></span></div></div>`;
        const items = config.uniqueItems || [];
        if (config.unique === 'matrix') return `<div class="unique-panel unique-matrix"><div class="page-kicker">SEÇİM REHBERİ</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p><div class="matrix-grid">${items.map((item,i)=>`<div><span>0${i+1}</span><strong>${item}</strong><small>${['Koşula göre boyutlandırılır','Sistemin hedef davranışı belirlenir','Servis ömrü ve uyum gözetilir'][i]}</small></div>`).join('')}</div></div>`;
        if (config.unique === 'checklist') return `<div class="unique-panel unique-checklist"><div class="page-kicker">SAHA KONTROLÜ</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p>${items.map((item,i)=>`<label><input type="checkbox" data-check-item="${i}"><span>${item}</span></label>`).join('')}<small class="check-progress">0 / ${items.length} kontrol tamamlandı</small></div>`;
        if (config.unique === 'dashboard') return `<div class="unique-panel unique-dashboard"><div class="page-kicker">PROSES GÖRÜNÜRLÜĞÜ</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p><div class="dashboard-values">${items.map((item,i)=>`<div><span class="dashboard-icon"><i class="fa-solid ${['fa-eye','fa-sliders','fa-bell'][i]}"></i></span><strong>${item}</strong><small>${['Sinyal okunur','Eşik değerlendirilir','Operatör bilgilendirilir'][i]}</small></div>`).join('')}</div></div>`;
        if (config.unique === 'sectors') return `<div class="unique-panel unique-sectors"><div class="page-kicker">REFERANS KÜMELERİ</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p><div>${items.map((item,i)=>`<button class="sector-select" type="button" data-sector="${i}"><i class="fa-solid ${['fa-bolt','fa-building','fa-ship'][i]}"></i>${item}</button>`).join('')}</div><p class="sector-detail">Bir sektör seçin; uygulama öncelikleri burada görünecek.</p></div>`;
        if (config.unique === 'library') return `<div class="unique-panel unique-library"><div class="page-kicker">DOKÜMAN AKIŞI</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p><div>${items.map((item,i)=>`<div class="library-row"><span class="library-number">0${i+1}</span><strong>${item}</strong><i class="fa-solid fa-arrow-right"></i></div>`).join('')}</div></div>`;
        if (config.unique === 'contact') return `<div class="unique-panel unique-contact"><div class="page-kicker">HIZLI YÖNLENDİRME</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p><div class="contact-steps">${items.map((item,i)=>`<div><span>0${i+1}</span><strong>${item}</strong></div>`).join('')}</div></div>`;
        return `<div class="unique-panel unique-timeline"><div class="page-kicker">KURUMSAL HAFIZA</div><h3>${config.uniqueTitle}</h3><p>${config.uniqueIntro}</p><div>${items.map((item,i)=>`<div class="timeline-item"><span>${['1950+','2000+','2026'][i]}</span><strong>${item}</strong><p>Bu aşama, bir sonraki üretim ve hizmet kabiliyetimizin temelini oluşturdu.</p></div>`).join('')}</div></div>`;
    }

    function toast(message, type = 'success') {
        let node = $('.toast');
        if (!node) { node = document.createElement('div'); node.className = 'toast'; document.body.appendChild(node); }
        node.textContent = message; node.className = `toast ${type} show`;
        window.clearTimeout(node._timer); node._timer = window.setTimeout(() => node.classList.remove('show'), 4200);
    }

    function openModal(title, body, form = false) {
        let modal = $('.site-modal');
        if (!modal) { modal = document.createElement('div'); modal.className='site-modal'; modal.innerHTML='<div class="modal-card"><button class="modal-close" aria-label="Kapat">&times;</button><div class="modal-content"></div></div>'; document.body.appendChild(modal); }
        $('.modal-content', modal).innerHTML = `<h2>${title}</h2>${body}${form ? '<form class="modal-form"><input required placeholder="Ad Soyad"><input required type="email" placeholder="E-posta"><textarea required placeholder="Mesajınız"></textarea><button class="btn-primary" type="submit">Gönder</button></form>' : ''}`;
        modal.classList.add('open');
    }

    function injectPageExperience() {
        if (!config || $('.experience-sections')) return;
        document.body.classList.add('site-enhanced', `page-theme-${config.theme}`, `hero-style-${config.hero || 'default'}`);
        const hero = $('.page-hero');
        if (hero && config.hero) { hero.dataset.heroStyle = config.hero; const ornament = document.createElement('div'); ornament.className = `hero-ornament ornament-${config.hero}`; ornament.setAttribute('aria-hidden','true'); hero.appendChild(ornament); }
        const target = $('footer');
        if (!target) return;
        const related = Object.entries(pages).filter(([key]) => key !== page && key !== 'iletisim.html').slice(0, 3);
        const relatedHtml = related.map(([key, item]) => `<a class="aside-link" href="${key}">${item.topics[0]}<i class="fa-solid fa-arrow-right"></i></a>`).join('');
        const stepsHtml = config.steps.map((step, i) => `<article class="process-card"><div class="process-index">0${i+1}</div><h3>${step}</h3><p>${config.intro} Bu adımda ekiplerimiz veriyi, güvenliği ve uygulanabilirliği birlikte değerlendirir.</p></article>`).join('');
        const topicHtml = config.topics.map((topic, i) => `<article class="quote-card"><div class="quote-stars">${'★'.repeat(5-i%2)}</div><h3>${topic}</h3><p>${topic} başlığında proje gereksinimlerini ölçülebilir kriterlere dönüştürerek karar sürecinizi hızlandırıyoruz.</p></article>`).join('');
        const faq = [`${config.topics[0]} hangi projelerde kullanılır?`, 'Teknik seçim için hangi bilgiler gereklidir?', 'Saha ve satış sonrası destek sağlıyor musunuz?', 'Özel ölçü veya proje tasarımı yapılabilir mi?'];
        const faqHtml = faq.map((q, i) => `<article class="faq-item"><button class="faq-question" type="button">${q}<i class="fa-solid fa-plus"></i></button><div class="faq-answer"><p>${i === 0 ? config.intro : 'Projenizin çalışma koşulları, güvenlik hedefleri ve bakım yaklaşımı incelenerek size uygun çözüm kapsamı belirlenir. Form üzerinden ekiplerimize bilgi iletebilirsiniz.'}</p></div></article>`).join('');
        const section = document.createElement('div'); section.className='experience-sections'; section.innerHTML = `
            <section class="article-section section-padding"><div class="container"><div class="title-wrapper reveal"><div class="page-kicker">UZMANLIK ALANIMIZ</div><h2 class="section-title">${config.title}</h2><p class="section-subtitle">${config.intro}</p></div><div class="article-layout"><article class="article-main reveal"><p>Endüstriyel sistemlerde doğru ürün seçimi kadar doğru uygulama yaklaşımı da önemlidir. Bu sayfadaki içerik; proje ekipleri, satın alma birimleri ve saha sorumluları için hızlı ama kapsamlı bir başvuru kaynağı olarak düzenlendi.</p><h2>Uygulama başarısını belirleyen üç soru</h2><p>Çalışma koşulları nedir? Sistemin hangi hareketi, basıncı, sıcaklığı veya akışkanı yönetmesi gerekiyor? Bakım ve servis süreci nasıl kurgulanacak? Bu soruların yanıtı, çözümün yalnızca bugün değil uzun yıllar verimli çalışmasını sağlar.</p><ul>${config.topics.map(t => `<li><strong>${t}:</strong> performans, güvenlik ve servis ömrü birlikte değerlendirilir.</li>`).join('')}</ul><h3>Proje ekipleri için pratik yaklaşım</h3><p>Teknik verileri sadeleştiriyor, şartname ve saha gerçeklerini aynı masada buluşturuyoruz. Böylece teklif süreci hızlanırken yanlış ürün, eksik bağlantı veya gereksiz kapasite riskleri azalır.</p>${renderUnique(config)}</article><aside class="article-aside reveal"><h3>İlgili başlıklar</h3>${relatedHtml}<a class="btn-primary" href="iletisim.html" style="display:block;text-align:center;margin-top:25px">Uzmanımıza danışın</a></aside></div></div></section>
            <section class="content-section section-padding"><div class="container"><div class="title-wrapper reveal"><div class="page-kicker">ÇALIŞMA MODELİMİZ</div><h2 class="section-title">Fikirden <span>uygulamaya</span></h2></div><div class="process-grid">${stepsHtml}</div></div></section>
            <section class="article-section section-padding"><div class="container"><div class="title-wrapper reveal"><div class="page-kicker">ÖZELLEŞTİRİLMİŞ ÇÖZÜMLER</div><h2 class="section-title">Projenize göre <span>şekillenen başlıklar</span></h2></div><div class="quote-grid">${topicHtml}</div></div></section>
            <section class="content-section section-padding"><div class="container"><div class="title-wrapper reveal"><div class="page-kicker">SIK SORULANLAR</div><h2 class="section-title">Karar vermeden önce <span>bilmeniz gerekenler</span></h2></div><div class="faq-grid">${faqHtml}</div></div></section>
            <section class="content-section section-padding"><div class="container"><div class="cta-strip reveal"><div><h2>Projeniz için doğru başlangıç</h2><p>Teknik verilerinizi paylaşın; ürün seçimi, teklif ve uygulama kapsamını birlikte netleştirelim.</p></div><a class="btn-light" href="iletisim.html">İletişime geçin <i class="fa-solid fa-arrow-right"></i></a></div></div></section>`;
        target.parentNode.insertBefore(section, target);
    }

    function enhanceInteractions() {
        // Make existing placeholder actions meaningful without changing the approved visual language.
        $$('a[href="#"]').forEach(link => {
            const text = link.textContent.trim();
            const cardTitle = link.closest('.product-card')?.querySelector('h3')?.textContent.trim() || '';
            const productRoutes = {
                'Kompansatör Sistemleri':'kompansator-sistemleri.html',
                'Endüstriyel Vanalar':'endustriyel-vana-grubu.html',
                'Yangın Söndürme':'yangin-koruma-sistemleri.html',
                'Buhar & Kondenstop':'buhar-kondenstop.html',
                'Esnek Metal Hortumlar':'esnek-metal-hortumlar.html',
                'Seviye & Yalıtım':'otomasyon-seviye-kontrol.html'
            };
            const newsTitle = link.closest('.news-card')?.querySelector('h4')?.textContent.trim() || '';
            const newsSlug = link.closest('.news-card')?.dataset.news || '';
            const newsRoute = newsRoutes[newsSlug] ? [newsSlug, newsRoutes[newsSlug]] : Object.entries(newsRoutes).find(([title]) => newsTitle.includes(title));
            if (/Ürünleri Keşfet/i.test(text)) link.href='kompansator-sistemleri.html';
            else if (/Detaylı İncele/i.test(text) && productRoutes[cardTitle]) link.href=productRoutes[cardTitle];
            else if (/Haberi Oku/i.test(text) && newsRoute) link.href=newsRoute[1];
            else if (/Kompansatör Sistemleri|Kompansatörler/i.test(text)) link.href='kompansator-sistemleri.html';
            else if (/Esnek.*Hortum/i.test(text)) link.href='esnek-metal-hortumlar.html';
            else if (/Vana/i.test(text)) link.href='endustriyel-vana-grubu.html';
            else if (/Buhar|Kondenstop/i.test(text)) link.href='buhar-kondenstop.html';
            else if (/Yangın/i.test(text)) link.href='yangin-koruma-sistemleri.html';
            else if (/Seviye|Otomasyon/i.test(text)) link.href='otomasyon-seviye-kontrol.html';
            else if (/Hakkımızda/i.test(text)) link.href='hakkimizda.html';
            else if (/Ar-Ge/i.test(text)) link.href='muhendislik-ar-ge.html';
            else if (/Kalite/i.test(text)) link.href='kalite-sertifikalarimiz.html';
            else if (/Yatırımcı/i.test(text)) link.href='yatirimci-iliskileri.html';
            else if (/Referans/i.test(text)) link.href='referanslar.html';
            else if (/Katalog/i.test(text)) link.href='kataloglar.html';
            else if (/İletişim/i.test(text)) link.href='iletisim.html';
            else if (/Kurumsal Video/i.test(text)) { link.addEventListener('click', e => { e.preventDefault(); openModal(text, '<p>Kurumsal video içeriğimizi izlemek için iletişim ekibimizden bağlantı talep edebilirsiniz.</p><a class="btn-primary" href="iletisim.html">Bilgi talep edin</a>'); }); }
        });
        $$('a[href="#"]').forEach(link => {
            const text = link.textContent.trim();
            const icon = $('i', link)?.className || '';
            if (link.classList.contains('logo') || link.classList.contains('footer-logo')) link.href = 'index.html';
            else if (link.closest('.social-links')) {
                link.href = /linkedin/i.test(icon) ? 'https://www.linkedin.com/' : /instagram/i.test(icon) ? 'https://www.instagram.com/' : 'https://www.youtube.com/';
                link.target = '_blank'; link.rel = 'noopener';
            } else if (/Kariyer|Online İşlemler/i.test(text)) {
                link.href = 'iletisim.html'; link.addEventListener('click', e => { e.preventDefault(); openModal(text, '<p>Bu bölüm için başvurunuzu ve talebinizi iletişim formu üzerinden bize iletebilirsiniz.</p><a class="btn-primary" href="iletisim.html">İletişim formuna git</a>'); });
            } else if (/KVKK|Çerez Politikası/i.test(text)) {
                link.href = 'iletisim.html'; link.addEventListener('click', e => { e.preventDefault(); openModal(text, '<p>Gizlilik, kişisel verilerin korunması ve çerez kullanımıyla ilgili bilgilendirme metinlerimiz kurumsal süreçlerimiz doğrultusunda uygulanır.</p>'); });
            } else if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
                link.href = 'iletisim.html';
                link.addEventListener('click', e => { e.preventDefault(); openModal(text || 'Bilgi', '<p>Bu alanla ilgili bilgi almak için uzman ekibimizle iletişime geçebilirsiniz.</p><a class="btn-primary" href="iletisim.html">İletişim</a>'); });
            }
        });
        $$('button.btn-primary').forEach(button => { if (/Teklif İste/i.test(button.textContent)) button.addEventListener('click', () => location.href='iletisim.html'); });
        $$('.theme-btn').forEach(button => button.setAttribute('aria-label','Açık/koyu temayı değiştir'));
        $$('.faq-question').forEach(button => button.addEventListener('click', () => button.closest('.faq-item').classList.toggle('open')));
        $$('[data-check-item]').forEach(input => input.addEventListener('change', () => { const box = input.closest('.unique-checklist'); const total = $$('[data-check-item]', box).length; const done = $$('[data-check-item]:checked', box).length; const label = $('.check-progress', box); if (label) label.textContent = `${done} / ${total} kontrol tamamlandı`; }));
        $$('.sector-select').forEach(button => button.addEventListener('click', () => { $$('.sector-select').forEach(item => item.classList.remove('active')); button.classList.add('active'); const detail = $('.sector-detail', button.closest('.unique-sectors')); if (detail) detail.textContent = `${button.textContent.trim()} için referans projelerde şartname, uygulama ve servis sürekliliği birlikte ele alınır.`; }));
        $$('.modal-close').forEach(button => button.addEventListener('click', () => $('.site-modal')?.classList.remove('open')));
        document.addEventListener('click', e => { if (e.target.classList.contains('site-modal')) e.target.classList.remove('open'); });
        $$('.contact-form, .modal-form').forEach(form => form.addEventListener('submit', e => { e.preventDefault(); form.reset(); toast('Talebiniz kaydedildi. Ekibimiz en kısa sürede size dönüş yapacaktır.'); if (form.closest('.site-modal')) form.closest('.site-modal').classList.remove('open'); }));
        $$('.nav-item > a').forEach(link => link.addEventListener('click', e => { if (window.innerWidth < 900 && link.nextElementSibling) { e.preventDefault(); link.parentElement.classList.toggle('open'); link.nextElementSibling.style.display = link.parentElement.classList.contains('open') ? 'block' : 'none'; } }));
        $$('.product-card').forEach(card => card.classList.add('filterable-card'));
        if (page === 'kataloglar.html') $$('.catalog-card a').forEach(link => link.addEventListener('click', e => { e.preventDefault(); openModal('Katalog talebi', '<p>İndirmek istediğiniz katalog başlığını ve e-posta adresinizi iletin. Ekibimiz güncel dokümanı paylaşacaktır.</p>', true); }));
    }

    function addIndexExplorer() {
        if (page !== 'index.html' || $('.index-explorer')) return;
        const products = $('.products-section'); if (!products) return;
        const section = document.createElement('section'); section.className='index-explorer products-section section-padding'; section.innerHTML='<div class="container"><div class="title-wrapper reveal"><div class="page-kicker">ETKİLEŞİMLİ ÜRÜN KAŞİFİ</div><h2 class="section-title">İhtiyacınıza göre <span>çözüm bulun</span></h2><p class="section-subtitle">Uygulama alanını seçin, ilgili çözüm gruplarını tek tıkla filtreleyin.</p></div><div class="filter-panel"><button class="filter-chip active" data-filter="all">Tümü</button><button class="filter-chip" data-filter="akış">Akış & Basınç</button><button class="filter-chip" data-filter="enerji">Enerji & Buhar</button><button class="filter-chip" data-filter="güvenlik">Güvenlik</button><button class="filter-chip" data-filter="otomasyon">Otomasyon</button></div><div class="products-grid explorer-grid"><article class="product-card filterable-card" data-tags="akış güvenlik"><div class="product-content"><div class="feature-icon"><i class="fa-solid fa-arrows-left-right"></i></div><h3>Kompansatör & Hortum</h3><p class="section-subtitle" style="text-align:left">Hareket, titreşim ve bağlantı ihtiyaçları için esnek çözümler.</p><a class="product-link" href="kompansator-sistemleri.html">İncele <i class="fa-solid fa-arrow-right"></i></a></div></article><article class="product-card filterable-card" data-tags="akış enerji"><div class="product-content"><div class="feature-icon"><i class="fa-solid fa-gauge-high"></i></div><h3>Vana & Buhar</h3><p class="section-subtitle" style="text-align:left">Akış kontrolü, kondenstop ve enerji verimliliği çözümleri.</p><a class="product-link" href="buhar-kondenstop.html">İncele <i class="fa-solid fa-arrow-right"></i></a></div></article><article class="product-card filterable-card" data-tags="güvenlik otomasyon"><div class="product-content"><div class="feature-icon"><i class="fa-solid fa-shield-halved"></i></div><h3>Yangın & Otomasyon</h3><p class="section-subtitle" style="text-align:left">Yangın koruma, seviye kontrol ve akıllı izleme çözümleri.</p><a class="product-link" href="yangin-koruma-sistemleri.html">İncele <i class="fa-solid fa-arrow-right"></i></a></div></article></div></div>';
        products.parentNode.insertBefore(section, products.nextSibling);
        $$('.filter-chip', section).forEach(chip => chip.addEventListener('click', () => { $$('.filter-chip', section).forEach(c=>c.classList.remove('active')); chip.classList.add('active'); const filter=chip.dataset.filter; $$('.filterable-card', section).forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && !card.dataset.tags.includes(filter))); }));
    }

    function init() {
        if (page !== 'kataloglar.html' || !new URLSearchParams(location.search).has('category')) injectPageExperience(); addIndexExplorer(); enhanceInteractions();
        // Add active navigation state and preserve existing reveal/counter scripts.
        $$(`.nav-links a[href="${page}"]`).forEach(a => a.classList.add('active-link'));
        window.addEventListener('keydown', e => { if (e.key === 'Escape') $('.site-modal')?.classList.remove('open'); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
