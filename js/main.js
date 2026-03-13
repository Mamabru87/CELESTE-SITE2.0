/* ========================================
   CÉLESTE — Main Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Dropdown menu toggle ----------
  const menuToggle = document.getElementById('menuToggle');
  const dropdown   = document.getElementById('dropdown');

  function openMenu() {
    dropdown.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    dropdown.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && dropdown) {
    menuToggle.addEventListener('click', () => {
      const isOpen = dropdown.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    // Chiudi il menu quando si clicca un link
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Chiudi con tasto ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Chiudi cliccando fuori dal menu
    document.addEventListener('click', (e) => {
      if (dropdown.classList.contains('open') &&
          !dropdown.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // ---------- Cookie notice ----------
  const cookieNotice = document.getElementById('cookieNotice');
  const cookieAccept = document.getElementById('cookieAccept');

  if (cookieNotice) {
    if (localStorage.getItem('celeste_cookie_ok')) {
      cookieNotice.classList.add('cookie-notice--hidden');
    }
    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('celeste_cookie_ok', '1');
        cookieNotice.classList.add('cookie-notice--hidden');
      });
    }
  }

  // ---------- Accordion "Come funziona" ----------
  const comeFunziona = document.getElementById('comeFunziona');
  const comeFunzionaContent = document.getElementById('comeFunzionaContent');

  if (comeFunziona && comeFunzionaContent) {
    comeFunziona.addEventListener('click', () => {
      comeFunzionaContent.classList.toggle('open');
      // Aggiorna testo (+) / (−)
      if (comeFunzionaContent.classList.contains('open')) {
        comeFunziona.textContent = 'Come funziona (−)';
      } else {
        comeFunziona.textContent = 'Come funziona (+)';
      }
    });
  }

  // ---------- Size / Price toggle ----------
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function resetSizeRow(row) {
    row.querySelectorAll('.size-toggle').forEach(s => {
      s.textContent = s.dataset.label;
    });
  }

  document.querySelectorAll('.size-toggle').forEach(span => {
    span.dataset.label = span.textContent.trim();

    if (supportsHover) {
      span.addEventListener('mouseenter', () => {
        span.textContent = span.dataset.price;
        document.fonts.ready.then(applyFillBox);
      });

      span.addEventListener('mouseleave', () => {
        span.textContent = span.dataset.label;
        document.fonts.ready.then(applyFillBox);
      });

      return;
    }

    span.addEventListener('click', () => {
      const row = span.closest('.dettaglio__sizes');
      const isShowingPrice = span.textContent === span.dataset.price;

      if (isShowingPrice) {
        span.textContent = span.dataset.label;
      } else {
        resetSizeRow(row);
        span.textContent = span.dataset.price;
      }

      document.fonts.ready.then(applyFillBox);
    });
  });

  // ---------- Fill-box: adatta letter-spacing alla riga di riferimento ----------
  function applyFillBox() {
    document.querySelectorAll('.fill-box').forEach(box => {
      const ref = box.querySelector('.fill-box__ref');
      if (!ref) return;

      const fitElements = box.querySelectorAll('.fill-box__fit');

      // Rimuove l'inline style dal ref prima di misurare: targetWidth è sempre
      // quello del CSS (0.35em tracking), stabile a ogni resize.
      ref.style.letterSpacing = '';
      ref.style.width = 'fit-content';
      const targetWidth = ref.scrollWidth;
      ref.style.width = '';

      function adjustElement(el) {
        el.style.letterSpacing = '0px';
        el.style.width = 'fit-content';
        const naturalWidth = el.scrollWidth;
        const chars = el.textContent.length;
        if (chars > 1 && naturalWidth < targetWidth) {
          const extra = (targetWidth - naturalWidth) / (chars - 1);
          el.style.letterSpacing = extra + 'px';
        } else {
          el.style.letterSpacing = '0px';
        }
        el.style.width = '';
      }

      // Espande anche il ref stesso: il suo ":" si allinea al bordo destro
      // come tutti gli altri. Nessun drift perché al run successivo il reset
      // ref.style.letterSpacing = '' riporta sempre alla baseline CSS.
      adjustElement(ref);
      fitElements.forEach(adjustElement);
    });
  }
  // Aspetta il caricamento del font per misurazioni corrette
  document.fonts.ready.then(applyFillBox);

  // Ricalcola al resize (rotazione telefono, cambio finestra)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyFillBox, 150);
  });

});
