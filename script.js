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
        W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
        H = canvas.height = canvas.offsetHeight || window.innerHeight;
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