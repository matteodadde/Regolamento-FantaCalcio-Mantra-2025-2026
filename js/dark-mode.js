function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  if (!toggleBtn) return;

  // Aggiunge transizione CSS solo una volta, subito
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

  // Imposta stato dark mode e aggiorna testo e aria-pressed
  function setDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️ Light Mode';
      toggleBtn.setAttribute('aria-pressed', 'true');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.textContent = '🌙 Dark Mode';
      toggleBtn.setAttribute('aria-pressed', 'false');
      localStorage.setItem('darkMode', 'disabled');
    }
  }

  // Legge stato salvato o preferenza sistema
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    setDarkMode(true);
  } else if (savedMode === 'disabled') {
    setDarkMode(false);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }

  // Gestione toggle click e keyboard (space, enter)
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    setDarkMode(isDark);
  }

  toggleBtn.setAttribute('role', 'button');
  toggleBtn.setAttribute('tabindex', '0');
  toggleBtn.setAttribute('aria-pressed', document.body.classList.contains('dark-mode') ? 'true' : 'false');
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');

  toggleBtn.addEventListener('click', toggleDarkMode);
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleDarkMode();
    }
  });

  // Eventuale listener per cambiamenti preferenza sistema durante la sessione
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('darkMode')) {
        setDarkMode(e.matches);
      }
    });
  }
}