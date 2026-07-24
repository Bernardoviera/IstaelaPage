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

      // ---------- Ambiente: ondas respirando (loop contínuo) ----------
      gsap.to('.ripple', {
        scale: 1.06,
        duration: 3.5,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: 'center' }
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
