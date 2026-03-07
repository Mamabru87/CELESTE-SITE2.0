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

      const targetWidth = ref.scrollWidth;

      // Funzione condivisa per ricalcolare letter-spacing di un elemento
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

      // Applica anche al ref stesso per allineare i ":" al bordo destro
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
