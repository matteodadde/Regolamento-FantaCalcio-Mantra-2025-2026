function initSidebar() {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;
  const links = navMenu ? navMenu.querySelectorAll('a[href^="#"]') : [];

  if (!nav || !toggle || !navMenu) return; // verifica preliminare

  // Debounce ottimizzato
  function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Rimuove classe active da tutti i link
  function clearActiveLinks() {
    links.forEach(link => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });
  }

  // Imposta link attivo e chiude sidebar su mobile
  function setActiveLink(link) {
    clearActiveLinks();
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');

    if (isMobile() && nav.classList.contains('open')) {
      toggleSidebar();
    }
  }

  // Scroll dolce e focus accessibile
  function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Focus per accessibilità
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  // Aggiorna link attivo in base allo scroll
  function updateActiveLink() {
    const scrollPos = window.scrollY || window.pageYOffset;
    const offset = 100;

    let currentId = null;
    links.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentId = link.getAttribute('href');
        }
      }
    });

    if (currentId) {
      const activeLink = navMenu.querySelector(`a[href="${currentId}"]`);
      if (activeLink && !activeLink.classList.contains('active')) {
        setActiveLink(activeLink);
      }
    }
  }

  // Verifica se siamo in vista mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Funzione per aprire la sidebar con transizione fluida
  function openSidebar() {
    nav.classList.add('open');
    nav.classList.remove('closing');
    navMenu.classList.add('visible'); // visibilità gestita via classe (opacity + pointer-events)
    body.classList.add('with-sidebar');
    toggle.classList.add('active');

    toggle.setAttribute('aria-pressed', 'true');
    toggle.setAttribute('aria-expanded', 'true');
  }

  // Funzione per chiudere la sidebar con transizione fluida
  function closeSidebar() {
    nav.classList.add('closing'); // classe per animazione chiusura
    nav.classList.remove('open');
    navMenu.classList.remove('visible');
    body.classList.remove('with-sidebar');
    toggle.classList.remove('active');

    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-expanded', 'false');

    // Rimuove classe closing dopo la durata della transizione (400ms)
    setTimeout(() => {
      nav.classList.remove('closing');
    }, 400);
  }

  // Toggle sidebar fluido
  function toggleSidebar() {
    if (nav.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  // Al resize: sidebar sempre chiusa di default, solo si apre al toggle
  function handleResize() {
    // Chiude sempre la sidebar sia su mobile che desktop
    closeSidebar();
  }

  // Inizializzazione
  function init() {
    // Accessibilità toggle
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', 'Apri/chiudi menu di navigazione');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('role', 'button');

    // Stato iniziale coerente: sidebar chiusa
    handleResize();

    // Eventi
    toggle.addEventListener('click', toggleSidebar);
    toggle.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleSidebar();
      }
    });

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        setActiveLink(link);
        scrollToSection(link.getAttribute('href'));
      });
    });

    window.addEventListener('scroll', debounce(updateActiveLink, 50));
    window.addEventListener('resize', debounce(handleResize, 200));

    updateActiveLink();
  }

  init();
}