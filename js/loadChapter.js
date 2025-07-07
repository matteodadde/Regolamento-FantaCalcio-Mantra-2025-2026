async function loadPartial(id, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Errore caricamento ${url}: ${res.status}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    // Dopo aver inserito la sidebar, inizializza sia la sidebar che il dark mode toggle
    if (id === 'sidebar') {
      if (typeof initSidebar === 'function') {
        initSidebar();
      } else {
        console.warn('initSidebar non definita');
      }

      if (typeof initDarkMode === 'function') {
        initDarkMode();
      } else {
        console.warn('initDarkMode non definita');
      }
    }
  } catch (e) {
    console.error(e);
    document.getElementById(id).innerHTML = `<p style="color:red;">Impossibile caricare la sezione.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartial('sidebar', 'partials/sidebar.html');
  loadPartial('intro', 'partials/intro.html');
  loadPartial('capitolo1', 'partials/capitolo1.html');
  loadPartial('capitolo2', 'partials/capitolo2.html');
  loadPartial('capitolo3', 'partials/capitolo3.html');
  loadPartial('capitolo4', 'partials/capitolo4.html');
  loadPartial('capitolo5', 'partials/capitolo5.html');
  loadPartial('capitolo6', 'partials/capitolo6.html');
  loadPartial('capitolo7', 'partials/capitolo7.html');
  loadPartial('capitolo8', 'partials/capitolo8.html');
  loadPartial('notefinali', 'partials/notefinali.html');
});