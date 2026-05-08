/* ========================================
   CÉLESTE — Main Script
   ======================================== */

// ---------- Random home background ----------
if (document.body.classList.contains('home')) {
  const sfondi = [
    'fiori-milano-celeste-14.webp',
    'fiori-milano-celeste-15.webp',
    'fiori-milano-celeste-16.webp',
    'fiori-milano-celeste-12.webp',
    'fiori-milano-celeste-17.webp',
    'fiori-milano-celeste-11.webp',
    'fiori-milano-celeste-06.webp',
    'fiori-milano-celeste-10.webp',
    'fiori-milano-celeste-07.webp',
    'fiori-milano-celeste-volpe.webp'
  ];
  const cellVersions = new Set([
    'fiori-milano-celeste-15.webp','fiori-milano-celeste-16.webp','fiori-milano-celeste-12.webp',
    'fiori-milano-celeste-17.webp','fiori-milano-celeste-11.webp','fiori-milano-celeste-06.webp',
    'fiori-milano-celeste-07.webp','fiori-milano-celeste-volpe.webp'
  ]);
  const isMobile = window.innerWidth <= 768;
  const lastIndex = parseInt(localStorage.getItem('celeste_sfondo_index') ?? '-1', 10);
  const nextIndex = (lastIndex + 1) % sfondi.length;
  localStorage.setItem('celeste_sfondo_index', nextIndex);
  const pick = sfondi[nextIndex];
  const file = (isMobile && cellVersions.has(pick))
    ? pick.replace(/\.(png|webp|jpe?g)$/i, '-cell.$1')
    : pick;
  const base = document.querySelector('script[src*="main.js"]').src.replace(/js\/main\.js.*$/, '');
  const src = base + 'img/sfondi/' + file + '?v=20';
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
  preload.onerror = () => {
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.opacity = '1';
    console.warn('[CELESTE] Sfondo non trovato:', src);
  };
  document.body.style.backgroundImage = 'url("' + src + '")';
  document.body.dataset.sfondo = pick;
  preload.src = src;
}

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Dropdown menu toggle ----------
  const menuToggle = document.getElementById('menuToggle');
  const dropdown   = document.getElementById('dropdown');

  // Aggiunge classe "scrolled" sul body quando l'utente scrolla giù
  // così il menu cambia stile (pannello bianco fisso vs in-flow)
  if (!document.body.classList.contains('home')) {
    let lastScrollY = window.scrollY;
    const updateScrolled = () => {
      if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
      // Chiudi il menu se l'utente scrolla mentre è aperto
      if (Math.abs(window.scrollY - lastScrollY) > 5 &&
          dropdown && dropdown.classList.contains('open')) {
        closeMenu();
      }
      lastScrollY = window.scrollY;
    };
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
  }

  // Mobile: cambia colore del bottone MENÙ in bianco quando si sovrappone a un'immagine
  if (!document.body.classList.contains('home') && menuToggle) {
    let mobileColorRaf = 0;
    const updateMenuOverImage = () => {
      mobileColorRaf = 0;
      if (window.innerWidth > 768) {
        document.body.classList.remove('menu-over-image');
        return;
      }
      const tr = menuToggle.getBoundingClientRect();
      const imgs = document.querySelectorAll('main img, .dettaglio img, .collezioni img, .studio img, .appuntamento img, picture img');
      let over = false;
      for (const img of imgs) {
        const ir = img.getBoundingClientRect();
        if (ir.width === 0 || ir.height === 0) continue;
        if (ir.bottom < 0 || ir.top > window.innerHeight) continue;
        if (tr.right > ir.left && tr.left < ir.right &&
            tr.bottom > ir.top && tr.top < ir.bottom) {
          over = true;
          break;
        }
      }
      document.body.classList.toggle('menu-over-image', over);
    };
    const scheduleUpdate = () => {
      if (mobileColorRaf) return;
      mobileColorRaf = requestAnimationFrame(updateMenuOverImage);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    scheduleUpdate();
  }

  function openMenu() {
    dropdown.classList.add('open');
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    dropdown.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    // Reset submenu
    dropdown.querySelectorAll('.header__submenu.open').forEach(s => s.classList.remove('open'));
    dropdown.querySelectorAll('.header__nav-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
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

    // Submenu Collezioni: comportamento condizionale.
    // Solo nelle pagine "dentro collezioni" (collezioni.html, aria.html, moire.html)
    // il click apre il sotto-menu Aria/Moiré. Altrove naviga direttamente a collezioni.html.
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isInCollezioni = /^(collezioni|aria|moire)\.html$/.test(path);

    dropdown.querySelectorAll('.header__nav-toggle').forEach(btn => {
      const submenu = document.getElementById(btn.getAttribute('aria-controls'));
      if (!submenu) return;
      if (isInCollezioni) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Se il submenu è già aperto, naviga alla pagina collezioni
          if (submenu.classList.contains('open')) {
            window.location.href = 'collezioni.html';
            return;
          }
          submenu.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        });
      } else {
        // Naviga diretto a collezioni.html, niente submenu
        submenu.setAttribute('hidden', '');
        btn.removeAttribute('aria-controls');
        btn.removeAttribute('aria-expanded');
        btn.addEventListener('click', () => {
          window.location.href = 'collezioni.html';
        });
      }
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

  // ---------- Fill-box: adatta letter-spacing alla riga di riferimento ----------
  function applyFillBox() {
    // Studio: equalizza la larghezza delle due colonne usando la ref più larga
    const studioLayout = document.querySelector('.studio__layout');
    let studioMaxRef = 0;
    if (studioLayout) {
      studioLayout.querySelectorAll('.fill-box').forEach(box => {
        const ref = box.querySelector('.fill-box__ref');
        if (!ref) return;
        ref.style.letterSpacing = '';
        ref.style.width = 'max-content';
        const w = ref.scrollWidth;
        ref.style.width = '';
        if (w > studioMaxRef) studioMaxRef = w;
      });
    }

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

      // Studio: usa la ref più larga tra le due colonne
      if (studioMaxRef > 0 && box.closest('.studio__layout')) {
        targetWidth = Math.min(studioMaxRef, boxWidth > 0 ? boxWidth : studioMaxRef);
      }

      function adjustElement(el) {
        el.style.letterSpacing = '0px';
        el.style.width = 'max-content';
        const naturalWidth = el.scrollWidth;
        const chars = el.textContent.length;
        if (chars > 1 && naturalWidth < targetWidth) {
          let extra = (targetWidth - naturalWidth) / (chars - 1);
          el.style.letterSpacing = extra + 'px';
          // Correzione iterativa: span interni con letter-spacing inline non
          // ereditano il valore del genitore, quindi la larghezza reale può
          // essere inferiore al target. Ricalibra in base alle gap responsive.
          const actual = el.scrollWidth;
          if (actual < targetWidth - 0.5 && actual > naturalWidth) {
            const responsiveGaps = (actual - naturalWidth) / extra;
            if (responsiveGaps > 0) {
              extra = (targetWidth - naturalWidth) / responsiveGaps;
              el.style.letterSpacing = extra + 'px';
            }
          }
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
