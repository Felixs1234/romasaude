/* ═══════════════════════════════════════════════════════════
   ROMA SAÚDE – JavaScript Principal
   Arquivo: script.js
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. HEADER: adiciona classe "scrolled" ao rolar ───────
  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // roda uma vez na inicialização


  // ─── 2. MENU MOBILE: abrir/fechar ─────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // Fecha o menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });


  // ─── 3. SCROLL REVEAL: animação ao entrar na tela ─────────
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Anima só uma vez
      }
    });
  }, {
    threshold:   0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));


  // ─── 4. CONTADORES ANIMADOS ────────────────────────────────
  function animateCounter(el, target, duration) {
    let start     = 0;
    const step    = Math.ceil(duration / (target || 1));
    const timer   = setInterval(() => {
      start += Math.ceil(target / (duration / 16));
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = start;
    }, 16);
  }

  const statNumbers = document.querySelectorAll('.stat__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 1200);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));


  // ─── 5. LINK ATIVO NO MENU AO ROLAR ───────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function setActiveLink() {
    let current = '';
    const offset = 120;

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });


  // ─── 6. SMOOTH SCROLL (reforço para navegadores antigos) ──
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY
                      - (parseInt(getComputedStyle(document.documentElement)
                        .getPropertyValue('--header-h')) || 76);
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });


  // ─── 7. BOTÃO "CONHEÇA NOSSA EQUIPE" ──────────────────────
  // Já usa href="#equipe" – o scroll suave acima cuida disso.


  // ─── 8. LAZY LOAD DE IMAGENS (performance) ────────────────
  if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy load nativo
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }


  // ─── 9. LOG DE INICIALIZAÇÃO (remova em produção) ─────────
  console.log('%c Roma Saúde – Site carregado com sucesso ', 
    'background:#B22222;color:#fff;padding:4px 8px;border-radius:4px;');

}); // fim DOMContentLoaded
