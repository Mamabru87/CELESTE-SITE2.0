/* ========================================
   CÉLESTE — Main Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Dropdown menu toggle ----------
  const menuToggle = document.getElementById('menuToggle');
  const dropdown   = document.getElementById('dropdown');

  if (menuToggle && dropdown) {
    menuToggle.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });

    // Chiudi il menu quando si clicca un link (solo link interni)
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('open');
      });
    });
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
  document.querySelectorAll('.size-toggle').forEach(span => {
    span.addEventListener('click', () => {
      const isShowingPrice = span.textContent !== span.dataset.size;
      // Se sta mostrando il prezzo, torna al nome
      if (isShowingPrice) {
        span.textContent = span.dataset.size;
      } else {
        // Ripristina tutti gli altri nella stessa riga
        span.closest('.dettaglio__sizes').querySelectorAll('.size-toggle').forEach(s => {
          s.textContent = s.dataset.size;
        });
        span.textContent = span.dataset.price;
      }
      // Ricalcola fill-box dopo il cambio di testo
      document.fonts.ready.then(applyFillBox);
    });
  });

  // ---------- Fill-box: adatta letter-spacing alla riga di riferimento ----------
  function applyFillBox() {
    document.querySelectorAll('.fill-box').forEach(box => {
      const ref = box.querySelector('.fill-box__ref');
      if (!ref) return;
      const targetWidth = ref.scrollWidth;
      box.querySelectorAll('.fill-box__fit').forEach(el => {
        // Azzera letter-spacing e forza width naturale per misurare
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
      });
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
