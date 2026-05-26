const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cur.style.left  = mx + 'px';
    cur.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
}
animCursor();

const hoverEls = document.querySelectorAll('a, button, .feat, .tech-pill');
hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cur.style.transform = 'translate(-50%,-50%) scale(2.2)';
        ring.style.width = '50px'; ring.style.height = '50px'; ring.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
          cur.style.transform = 'translate(-50%,-50%) scale(1)';
            ring.style.width = '30px'; ring.style.height = '30px'; ring.style.opacity = '0.5';
        });
    });

    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class Particle {
        constructor() { this.reset(); this.y = Math.random() * H; this.life = Math.random() * this.maxLife; }
        reset() {
            this.x = Math.random() * W;
            this.y = H + 10;
            this.r = Math.random() * 1.8 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = -(Math.random() * 0.7 + 0.25);
            this.alpha = Math.random() * 0.55 + 0.2;
            this.life = 0;
            this.maxLife = Math.random() * 180 + 90;
        }
        draw() {
            this.life++;
            if (this.life > this.maxLife) { this.reset(); return; }
            const fade = this.life < 20 ? this.life / 20
                       : this.life > this.maxLife - 20 ? (this.maxLife - this.life) / 20 : 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(57,255,110,${this.alpha * fade})`;
            ctx.fill();
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    const particles = Array.from({ length: 90 }, () => new Particle());

    function drawFrame() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => p.draw());
        requestAnimationFrame(drawFrame);
    }
    drawFrame();

    const reveals = document.querySelectorAll('.rv');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));

    let musicOn = false;

    function toggleMusic() {
        const btn = document.getElementById('music-btn');
        const icon = document.getElementById('music-icon');
        const music = document.getElementById('bg-music');

        musicOn = !musicOn;

        btn.classList.toggle('muted', !musicOn);

        if (musicOn) {
            music.play();
            icon.className = 'fas fa-volume-up';
        } else {
            music.pause();
            icon.className = 'fas fa-music';
        }
    }

const translations = {

    en: {
        nav_about: "About",
        nav_tech: "Tech",
        nav_gallery: "Gallery",
        nav_download: "Download",
        nav_play: 'Play for $1.00 &nbsp;<i class="fas fa-arrow-right"></i>',

        hero_eyebrow: "INDIE GAME · WINDOWS",
        hero_sub: 'Survive. Fight. <em>Escape.</em> — A solo-crafted adventure<br>by <em>Muhab Joumaa</em>',
        hero_download: '<i class="fas fa-download"></i> Download for $1.00',
        hero_gallery: '<i class="fas fa-images"></i> View Gallery',
        scroll_text: '<div class="scroll-bar"></div>SCROLL',

        about_label: "01 — About",
        about_title: 'Survive The <em>Mountains</em>',
        about_p1: 'Enter the world of <strong>The Green One</strong> — a solo-crafted action-adventure platformer where survival is the only goal.',
        about_p2: 'Every mechanic, every system, every line of code was <strong>handcrafted by one developer</strong>.',

        feat1_name: "Mountain Survival",
        feat1_desc: "Navigate deadly terrain with precise platformer mechanics.",

        feat2_name: "Zombie Combat",
        feat2_desc: "Fight and outsmart waves of relentless undead enemies.",

        feat3_name: "Built-in Network",
        feat3_desc: "A social networking feature built directly inside the game.",

        feat4_name: "Solo Engineered",
        feat4_desc: "Every system engineered by a single developer.",

        tech_label: "02 — Technology",
        tech_title: 'Built With <em>Precision</em>',
        tech_desc: 'Engineered from scratch using industry-grade languages and tools.',

        gallery_label: "03 — Gallery",
        gallery_title: 'See The <em>World</em>',

        download_label: "04 — Download",
        download_title: 'Play For <em>$1.00</em>',
        price_lbl: "Price",
        size_lbl: "Size",
        platform_lbl: "Platform",
        latest_version: 'VERSION: LATEST',

        expansion_label: "05 — Expansion",
        expansion_title: 'End Of <em>Being Lost</em>',
        expansion_desc: 'A new chapter has arrived.',
        expansion_btn: '<i class="fas fa-external-link-alt"></i> Explore Now',

        network_label: "06 — Network",
        network_title: 'Connected <em>Community</em>',
        network_name: 'TGO NETWORK',
        network_desc: 'A full social network is built directly into the game.',
        network_pill: 'FREE TO JOIN · BUILT-IN',

        support_label: "07 — Support",
        support_title: 'Support The <em>Developer</em>',
        support_desc: 'If you enjoy the game or appreciate the work behind it, consider sponsoring the development of future projects.',

        footer_copy: '© 2023 Muhab Joumaa · All rights reserved'
    },

    de: {
        nav_about: "Über",
        nav_tech: "Technik",
        nav_gallery: "Galerie",
        nav_download: "Herunterladen",
        nav_play: 'Spielen für $1.00 &nbsp;<i class="fas fa-arrow-right"></i>',

        hero_eyebrow: "INDIE-SPIEL · WINDOWS",
        hero_sub: 'Überlebe. Kämpfe. <em>Entkomme.</em> — Ein handgefertigtes Abenteuer<br>von <em>Muhab Joumaa</em>',
        hero_download: '<i class="fas fa-download"></i> Für $1.00 herunterladen',
        hero_gallery: '<i class="fas fa-images"></i> Galerie ansehen',
        scroll_text: '<div class="scroll-bar"></div>SCROLLEN',

        about_label: "01 — Über",
        about_title: 'Überlebe Die <em>Berge</em>',
        about_p1: 'Betritt die Welt von <strong>The Green One</strong> — ein handgefertigtes Action-Adventure-Platformer, in dem Überleben das einzige Ziel ist.',
        about_p2: 'Jede Mechanik, jedes System, jede Codezeile wurde <strong>von einem einzigen Entwickler erstellt</strong>.',

        feat1_name: "Überleben in den Bergen",
        feat1_desc: "Navigiere durch tödliches Gelände mit präzisen Plattform-Mechaniken.",

        feat2_name: "Zombie-Kampf",
        feat2_desc: "Kämpfe gegen und überliste Wellen unerbittlicher Untoter.",

        feat3_name: "Eingebautes Netzwerk",
        feat3_desc: "Ein soziales Netzwerk direkt im Spiel integriert.",

        feat4_name: "Solo Entwickelt",
        feat4_desc: "Jedes System wurde von einem einzigen Entwickler gebaut.",

        tech_label: "02 — Technologie",
        tech_title: 'Mit <em>Präzision</em> Gebaut',
        tech_desc: 'Von Grund auf mit professionellen Tools und Sprachen entwickelt.',

        gallery_label: "03 — Galerie",
        gallery_title: 'Sieh Die <em>Welt</em>',

        download_label: "04 — Download",
        download_title: 'Spiele Für <em>$1.00</em>',
        price_lbl: "Preis",
        size_lbl: "Größe",
        platform_lbl: "Plattform",
        latest_version: 'VERSION: NEUSTE',

        expansion_label: "05 — Erweiterung",
        expansion_title: 'Ende Des <em>Verlorenseins</em>',
        expansion_desc: 'Ein neues Kapitel ist erschienen.',
        expansion_btn: '<i class="fas fa-external-link-alt"></i> Jetzt Entdecken',

        network_label: "06 — Netzwerk",
        network_title: 'Verbundene <em>Community</em>',
        network_name: 'TGO NETZWERK',
        network_desc: 'Ein vollständiges soziales Netzwerk direkt im Spiel integriert.',
        network_pill: 'KOSTENLOS BEITRETEN · INTEGRIERT',

        support_label: "07 — Support",
        support_title: 'Unterstütze Den <em>Entwickler</em>',
        support_desc: 'Wenn dir das Spiel gefällt oder du die Arbeit dahinter schätzt, erwäge die Unterstützung zukünftiger Projekte.',

        footer_copy: '© 2023 Muhab Joumaa · Alle Rechte vorbehalten'
    },

    ru: {
        nav_about: "О игре",
        nav_tech: "Технологии",
        nav_gallery: "Галерея",
        nav_download: "Скачать",
        nav_play: 'Играть за $1.00 &nbsp;<i class="fas fa-arrow-right"></i>',

        hero_eyebrow: "ИНДИ-ИГРА · WINDOWS",
        hero_sub: 'Выживай. Сражайся. <em>Спасайся.</em> — Приключение, созданное одним человеком<br>от <em>Muhab Joumaa</em>',
        hero_download: '<i class="fas fa-download"></i> Скачать за $1.00',
        hero_gallery: '<i class="fas fa-images"></i> Смотреть галерею',
        scroll_text: '<div class="scroll-bar"></div>ПРОКРУТИТЕ',

        about_label: "01 — О игре",
        about_title: 'Выживи В <em>Горах</em>',
        about_p1: 'Добро пожаловать в мир <strong>The Green One</strong> — одиночного action‑adventure платформера, где цель одна — выжить.',
        about_p2: 'Каждая механика, каждая система, каждая строка кода была <strong>создана одним разработчиком</strong>.',

        feat1_name: "Горное Выживание",
        feat1_desc: "Преодолевайте смертельно опасные ландшафты с точной платформенной механикой.",

        feat2_name: "Бой с Зомби",
        feat2_desc: "Сражайтесь и перехитрите волны беспощадных мертвецов.",

        feat3_name: "Встроенная Сеть",
        feat3_desc: "Социальная сеть, встроенная прямо в игру.",

        feat4_name: "Создано В одиночку",
        feat4_desc: "Каждая система разработана одним человеком.",

        tech_label: "02 — Технологии",
        tech_title: 'Создано С <em>Точностью</em>',
        tech_desc: 'Разработано с нуля с использованием профессиональных инструментов и языков.',

        gallery_label: "03 — Галерея",
        gallery_title: 'Увидеть <em>Мир</em>',

        download_label: "04 — Скачать",
        download_title: 'Играть За <em>$1.00</em>',
        price_lbl: "Цена",
        size_lbl: "Размер",
        platform_lbl: "Платформа",
        latest_version: 'ВЕРСИЯ: ПОСЛЕДНЯЯ',

        expansion_label: "05 — Дополнение",
        expansion_title: 'Конец <em>Блужданию</em>',
        expansion_desc: 'Появилась новая глава.',
        expansion_btn: '<i class="fas fa-external-link-alt"></i> Исследовать',

        network_label: "06 — Сеть",
        network_title: 'Связанное <em>Сообщество</em>',
        network_name: 'TGO NETWORK',
        network_desc: 'Полноценная социальная сеть встроена прямо в игру.',
        network_pill: 'БЕСПЛАТНО · ВСТРОЕНО',

        support_label: "07 — Поддержка",
        support_title: 'Поддержите <em>Разработчика</em>',
        support_desc: 'Если вам нравится игра или вы цените проделанную работу, рассмотрите возможность поддержки будущих проектов.',

        footer_copy: '© 2023 Muhab Joumaa · Все права защищены'
    },

    ar: {
        nav_about: "حول",
        nav_tech: "التقنية",
        nav_gallery: "المعرض",
        nav_download: "تحميل",
        nav_play: 'العب مقابل $1.00 &nbsp;<i class="fas fa-arrow-right"></i>',

        hero_eyebrow: "لعبة إندي · ويندوز",
        hero_sub: 'ابقَ على قيد الحياة. قاتل. <em>اهرب.</em> — مغامرة صُنعت بالكامل<br>بواسطة <em>Muhab Joumaa</em>',
        hero_download: '<i class="fas fa-download"></i> تحميل مقابل $1.00',
        hero_gallery: '<i class="fas fa-images"></i> عرض المعرض',
        scroll_text: '<div class="scroll-bar"></div>تمرير',

        about_label: "01 — حول",
        about_title: 'النجاة في <em>الجبال</em>',
        about_p1: 'ادخل عالم <strong>The Green One</strong> — لعبة منصات ومغامرات صُنعت بالكامل بهدف واحد: البقاء.',
        about_p2: 'كل ميكانيك، كل نظام، كل سطر برمجي تم <strong>تصميمه يدويًا بواسطة مطوّر واحد</strong>.',

        feat1_name: "النجاة في الجبال",
        feat1_desc: "تنقّل عبر تضاريس خطيرة بميكانيك منصات دقيق.",

        feat2_name: "قتال الزومبي",
        feat2_desc: "قاتل وتغلّب على موجات من الأعداء الأموات.",

        feat3_name: "شبكة مدمجة",
        feat3_desc: "ميزة شبكة اجتماعية مدمجة داخل اللعبة.",

        feat4_name: "مصنوع فرديًا",
        feat4_desc: "كل نظام تم تطويره بواسطة مطوّر واحد.",

        tech_label: "02 — التقنية",
        tech_title: 'مصنوع بـ <em>دقة</em>',
        tech_desc: 'مبني من الصفر باستخدام أدوات ولغات احترافية.',

        gallery_label: "03 — المعرض",
        gallery_title: 'شاهد <em>العالم</em>',

        download_label: "04 — تحميل",
        download_title: 'العب مقابل <em>$1.00</em>',
        price_lbl: "السعر",
        size_lbl: "الحجم",
        platform_lbl: "المنصة",
        latest_version: 'الإصدار: الأحدث',

        expansion_label: "05 — التوسعة",
        expansion_title: 'نهاية <em>الضياع</em>',
        expansion_desc: 'فصل جديد قد وصل.',
        expansion_btn: '<i class="fas fa-external-link-alt"></i> استكشف الآن',

        network_label: "06 — الشبكة",
        network_title: 'مجتمع <em>متصل</em>',
        network_name: 'TGO NETWORK',
        network_desc: 'شبكة اجتماعية كاملة مدمجة داخل اللعبة.',
        network_pill: 'مجاني للانضمام · مدمج',

        support_label: "07 — الدعم",
        support_title: 'ادعم <em>المطور</em>',
        support_desc: 'إذا أعجبتك اللعبة أو قدّرت الجهد المبذول، فكّر في دعم تطوير المشاريع المستقبلية.',

        footer_copy: '© 2023 Muhab Joumaa · جميع الحقوق محفوظة'
    },

};

function setLanguage(lang) {

    localStorage.setItem("lang", lang);

    document.documentElement.lang = lang;

    if (lang === "ar") {
        document.body.dir = "rtl";
    } else {
        document.body.dir = "ltr";
    }

    document.querySelectorAll("[data-i18n]").forEach(el => {

        const key = el.getAttribute("data-i18n");

        if (translations[lang][key]) {

            el.innerHTML = translations[lang][key];
        }
    });
}