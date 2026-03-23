/* ========================================
   CÉLESTE — Main Script
   ======================================== */

// ---------- Random home background ----------
if (document.body.classList.contains('home')) {
  const sfondi = [
    'Generated_Image_March_15,_2026___11_06PM.webp',
    'Generated_Image_March_15,_2026___11_09PM.webp',
    'Generated_Image_March_16,_2026___12_14AM.webp',
    'IMG_0785.webp',
    'IMG_0786.webp',
    'IMG_0787.webp',
    'IMG_0844.webp',
    'IMG_0851.webp',
    'IMG_0855.webp',
    'IMG_0856.webp',
    'IMG_0858.webp',
    'IMG_0860.webp',
    'IMG_0865.webp',
    'IMG_0870.webp',
    'IMG_0873.webp',
    'IMG_0876.webp'
  ];
  const pick = sfondi[Math.floor(Math.random() * sfondi.length)];
  const base = document.querySelector('script[src$="main.js"]').src.replace(/js\/main\.js.*$/, '');
  const src = base + 'img/sfondi/' + pick;
  const preload = new Image();
  preload.onload = () => {
    // Detect average brightness via canvas sampling
    try {
      const canvas = document.createElement('canvas');
      const size = 64; // sample at small resolution for speed
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(preload, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let totalBrightness = 0;
      const pixelCount = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        // perceived brightness: 0.299R + 0.587G + 0.114B
        totalBrightness += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      }
      const avgBrightness = totalBrightness / pixelCount; // 0-255
      if (avgBrightness > 180) {
        document.body.classList.add('home--light');
      }
    } catch (_) { /* cross-origin or canvas error: keep default white text */ }
    document.body.style.opacity = '1';
  };
  preload.onerror = () => { document.body.style.opacity = '1'; };
  document.body.style.backgroundImage = 'url("' + src + '")';
  preload.src = src;
}

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

      // Larghezza massima disponibile nel box (rispetta max-width su mobile)
      const boxWidth = box.clientWidth;

      // Rimuove l'inline style dal ref prima di misurare: targetWidth è sempre
      // quello del CSS (0.35em tracking), stabile a ogni resize.
      ref.style.letterSpacing = '';
      ref.style.width = 'max-content';
      let targetWidth = ref.scrollWidth;
      ref.style.width = '';

      // Su mobile il ref potrebbe essere più largo del contenitore:
      // limita targetWidth per evitare overflow orizzontale.
      if (boxWidth > 0 && targetWidth > boxWidth) {
        targetWidth = boxWidth;
      }

      function adjustElement(el) {
        el.style.letterSpacing = '0px';
        el.style.width = 'max-content';
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
