(function () {
  // ---------- FAQ acordeão: abre com altura suave (GSAP) se disponível,
  // cai pro <details> nativo instantâneo se o script falhar. ----------
  var faqItems = document.querySelectorAll('.faq-item');

  function openFaqInstant(details) {
    faqItems.forEach(function (other) { if (other !== details) other.removeAttribute('open'); });
    details.setAttribute('open', '');
  }

  faqItems.forEach(function (details) {
    var summary = details.querySelector('summary');
    var answer = details.querySelector('.faq-answer');

    summary.addEventListener('click', function (e) {
      if (typeof gsap === 'undefined') return; // deixa o <details> nativo agir

      e.preventDefault();
      var isOpen = details.hasAttribute('open');

      faqItems.forEach(function (other) {
        if (other !== details && other.hasAttribute('open')) closeFaq(other);
      });

      if (isOpen) { closeFaq(details); } else { openFaqSmooth(details); }
    });

    function openFaqSmooth(d) {
      var a = d.querySelector('.faq-answer');
      d.setAttribute('open', '');
      gsap.set(a, { height: 'auto' });
      var h = a.offsetHeight;
      gsap.fromTo(a, { height: 0, opacity: 0 }, {
        height: h, opacity: 1, duration: 0.4, ease: 'power2.out',
        onComplete: function () { gsap.set(a, { height: 'auto' }); }
      });
    }
    function closeFaq(d) {
      var a = d.querySelector('.faq-answer');
      gsap.to(a, {
        height: 0, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: function () { d.removeAttribute('open'); }
      });
    }
  });

  // ---------- Nav ganha fundo ao sair do hero (funciona sem GSAP) ----------
  var header = document.getElementById('siteHeader');
  var heroEl = document.querySelector('.hero');
  if (header && heroEl && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
    navObserver.observe(heroEl);
  }

  // Se o GSAP não carregou (CDN/arquivo bloqueado), conteúdo já está
  // visível por padrão no CSS — degrada bem, sem quebrar a página.
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ---------- Barra de progresso de leitura (funcional, não decorativa) ----------
  gsap.to('.scroll-progress-fill', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });

  var mm = gsap.matchMedia();

  mm.add(
    {
      reduceMotion: '(prefers-reduced-motion: reduce)',
      fullMotion: '(prefers-reduced-motion: no-preference)'
    },
    function (context) {
      var reduceMotion = context.conditions.reduceMotion;

      if (reduceMotion) {
        // Estado final direto, sem animação — só garante visibilidade.
        gsap.set('.hero-in, .reveal, .senses-list li, .testimonial .glyph-quote, .icon path, .icon circle, .icon line, .icon rect', {
          opacity: 1, y: 0, scale: 1, strokeDashoffset: 0
        });
        gsap.set('.process-line-fill', { scaleY: 1 });
        return;
      }

      // ---------- Hero: entrada orquestrada (Premium, motion-design skill) ----------
      var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-in-1', { opacity: 0, y: 18, duration: 0.5 })
        .from('.hero-in-2', { opacity: 0, y: 18, duration: 0.65 }, 0.09)
        .from('.hero-in-3', { opacity: 0, y: 18, duration: 0.55 }, 0.22)
        .from('.hero-in-4', { opacity: 0, y: 18, duration: 0.5 }, 0.34)
        .from('.hero-in-art', { opacity: 0, scale: 0.92, duration: 0.7, ease: 'power2.out' }, 0.16);

      // ---------- Ambiente: chama tremeluzindo (loop contínuo, material "fluid") ----------
      gsap.to('.flame-outer', {
        scaleY: 1.05, scaleX: 0.96, x: 2, rotation: 1.2,
        duration: 2.3, ease: 'sine.inOut', repeat: -1, yoyo: true
      });
      gsap.to('.flame-inner', {
        scaleY: 1.07, scaleX: 0.94, x: -1.5, rotation: -1.5,
        duration: 1.9, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.3
      });

      // ---------- Ambiente: brasas subindo ----------
      gsap.utils.toArray('.ember').forEach(function (ember, i) {
        var riseTl = gsap.timeline({ repeat: -1, delay: i * 1.1, repeatDelay: 0.4 });
        riseTl
          .set(ember, { y: 0, x: 0, opacity: 0 })
          .to(ember, { opacity: 0.85, duration: 0.4, ease: 'sine.out' })
          .to(ember, {
            y: -60 - i * 15,
            x: (i % 2 === 0 ? 1 : -1) * (10 + i * 4),
            opacity: 0,
            duration: 2.6 + i * 0.5,
            ease: 'sine.in'
          }, '<');
      });

      // ---------- Botões: hover + feedback tátil real no clique ----------
      // (GSAP assume o `transform` do botão a partir daqui — por isso o
      // hover também vira GSAP, senão o inline style do JS vence o CSS)
      document.querySelectorAll('.btn').forEach(function (btn) {
        btn.addEventListener('pointerenter', function () {
          gsap.to(btn, { y: -1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        });
        btn.addEventListener('pointerleave', function () {
          gsap.to(btn, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        });
        btn.addEventListener('pointerdown', function () {
          gsap.to(btn, { scale: 0.96, duration: 0.12, ease: 'power2.out', overwrite: 'auto' });
        });
        ['pointerup', 'pointercancel'].forEach(function (evt) {
          btn.addEventListener(evt, function () {
            gsap.to(btn, { scale: 1, duration: 0.28, ease: 'back.out(2)', overwrite: 'auto' });
          });
        });
      });

      // ---------- Sentidos despertando — cascata ao entrar em cena ----------
      gsap.from('.senses-list li', {
        opacity: 0, y: 14, duration: 0.6, ease: 'power2.out', stagger: 0.18,
        scrollTrigger: { trigger: '.senses-transition', start: 'top 75%', once: true }
      });

      // ---------- Parallax sutil na transição dusk→dawn (reforça a "virada") ----------
      gsap.fromTo('.senses-parallax', { y: -40 }, {
        y: 40, ease: 'none',
        scrollTrigger: { trigger: '.senses-transition', start: 'top bottom', end: 'bottom top', scrub: true }
      });

      // ---------- Reveal genérico ao rolar (cards, seções, FAQ...) ----------
      ScrollTrigger.batch('.reveal', {
        start: 'top 85%',
        once: true,
        onEnter: function (batch) {
          gsap.from(batch, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.12, overwrite: true });
        }
      });

      // ---------- Benefícios: ícones se "desenham" ao entrar ----------
      gsap.utils.toArray('.benefit-card').forEach(function (card, i) {
        var shapes = card.querySelectorAll('.icon path, .icon circle, .icon line, .icon rect');
        shapes.forEach(function (shape) {
          var len = shape.getTotalLength ? shape.getTotalLength() : 60;
          shape.style.strokeDasharray = len;
          shape.style.strokeDashoffset = len;
        });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          once: true,
          onEnter: function () {
            gsap.from(card.querySelector('.icon'), { opacity: 0, duration: 0.4, delay: 0.1 + i * 0.05 });
            gsap.to(shapes, {
              strokeDashoffset: 0, duration: 0.9, delay: 0.15 + i * 0.05, ease: 'power2.out', stagger: 0.08
            });
          }
        });
      });

      // ---------- Linha do processo: desenha conforme rola (progresso real) ----------
      gsap.to('.process-line-fill', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.process-steps-wrap', start: 'top 70%', end: 'bottom 75%', scrub: 0.5 }
      });

      // ---------- Foto da Istaela: parallax sutil ----------
      var sobreImg = document.querySelector('.sobre-photo img');
      if (sobreImg) {
        gsap.set(sobreImg, { scale: 1.15 });
        gsap.fromTo(sobreImg, { y: -25 }, {
          y: 25, ease: 'none',
          scrollTrigger: { trigger: '.sobre-photo', start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }

      // ---------- Depoimento: aspas aparecem com atraso (texto primeiro) ----------
      var glyphQuote = document.querySelector('.testimonial .glyph-quote');
      if (glyphQuote) {
        gsap.set(glyphQuote, { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' });
        ScrollTrigger.create({
          trigger: '.testimonial',
          start: 'top 85%',
          once: true,
          onEnter: function () {
            gsap.to(glyphQuote, { opacity: 0.5, scale: 1, duration: 0.5, delay: 0.4, ease: 'back.out(1.6)' });
          }
        });
      }

      // ---------- CTA final: glow "respirando" bem devagar (ecoa a vela do hero) ----------
      gsap.to('.final-cta-glow', {
        opacity: 0.5, scale: 1.12, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%'
      });

      // ---------- CTA flutuante mobile: entra com slide-up na 1ª aparição ----------
      gsap.from('.sticky-cta', { y: 60, opacity: 0, duration: 0.6, delay: 1.4, ease: 'power2.out' });
    }
  );
})();
