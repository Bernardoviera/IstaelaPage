(function () {
  // FAQ acordeão — abrir um item fecha os demais (independe do GSAP)
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  // Se o GSAP não carregou (CDN bloqueado/offline), conteúdo já está
  // visível por padrão no CSS — degrada bem, sem quebrar a página.
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

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
        gsap.set('.hero-in, .reveal, .senses-list li', { opacity: 1, y: 0, scale: 1 });
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
        scaleY: 1.05,
        scaleX: 0.96,
        x: 2,
        rotation: 1.2,
        duration: 2.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
      gsap.to('.flame-inner', {
        scaleY: 1.07,
        scaleX: 0.94,
        x: -1.5,
        rotation: -1.5,
        duration: 1.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.3
      });

      // ---------- Ambiente: brasas subindo (camada de fundo, assíncrona) ----------
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

      // ---------- Sentidos despertando — cascata ao entrar em cena ----------
      gsap.from('.senses-list li', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: '.senses-transition',
          start: 'top 75%',
          once: true
        }
      });

      // ---------- Reveal genérico ao rolar (cards, seções, FAQ...) ----------
      ScrollTrigger.batch('.reveal', {
        start: 'top 85%',
        once: true,
        onEnter: function (batch) {
          gsap.from(batch, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
            overwrite: true
          });
        }
      });

      // ---------- Benefícios: leve profundidade extra por cima do reveal ----------
      gsap.utils.toArray('.benefit-card').forEach(function (card, i) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          once: true,
          onEnter: function () {
            gsap.from(card.querySelector('.icon'), {
              scale: 0.6,
              opacity: 0,
              duration: 0.5,
              delay: 0.15 + i * 0.05,
              ease: 'back.out(1.7)'
            });
          }
        });
      });
    }
  );
})();
