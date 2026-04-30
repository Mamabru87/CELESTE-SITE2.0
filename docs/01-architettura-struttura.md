# CÉLESTE — Architettura e struttura

Verificato sul codice il **2026-03-13**.

## Tipo di progetto

- sito statico HTML/CSS/JS;
- nessun framework;
- nessun bundler;
- nessuna dipendenza frontend esterna;
- un solo CSS globale: `css/style.css`;
- un solo JS globale: `js/main.js`.

## Struttura repository

```text
appuntamento.html
aria.html
collezioni.html
index.html
moire.html
studio.html
README.md
docs/
css/
  style.css
fonts/
  HelveticaNowVar.ttf
img/
  ARIA.png
  CELESTE-LOGO.svg
  INFO.svg
  moirè.png
  REF_PROPORZIONI_LOGO.png
  SFONDO_HOME.png
js/
  main.js
```

## File chiave e ruolo

- `index.html` → landing/cover del brand.
- `collezioni.html` → griglia delle tre collezioni.
- `aria.html`, `moire.html` → pagine dettaglio strutturalmente quasi gemelle.
- `studio.html` → presentazione servizi.
- `appuntamento.html` → pagina contatti.
- `css/style.css` → palette, tipografia, header, layout, responsive, dettaglio, home.
- `js/main.js` → apertura menu, toggle taglie/prezzi, algoritmo `fill-box`, codice accordion inattivo.

## Navigazione primaria

Menu condiviso in tutte le pagine:

- `Collezioni`
- `Studio`
- `Appuntamento`
- `Instagram` (link esterno)

## Pattern strutturali condivisi

Quasi tutte le pagine seguono questo schema:

1. `header.header`
2. `main.main-content`
3. `footer.footer`
4. inclusione finale di `js/main.js`

Eccezione principale:

- `index.html` non mostra footer e usa `body.home` con sfondo fotografico full-screen.

## Duplicazioni da ricordare

### Header

È duplicato in tutte le pagine HTML.

Se cambi:

- logo;
- link di navigazione;
- testo `Menù`;
- struttura del dropdown;

va aggiornato manualmente in ogni pagina.

### Footer

È duplicato in tutte le pagine interne e contiene l'anno `2026` hardcoded.

## Relazioni tra pagine

### Gruppo “collezioni”

- `collezioni.html` linka a `aria.html`, `moire.html`.
- Le tre pagine dettaglio condividono:
  - stessa architettura;
  - stessi prezzi;
  - stesso blocco `Delivery`;
  - stesso blocco `Contact`;
  - stessa logica JS delle taglie.

### Gruppo “editoriale/informativo”

- `studio.html`
- `appuntamento.html`
- pagine dettaglio collezione

Queste pagine dipendono più delle altre dall'impaginazione tipografica e dal sistema `fill-box`.

## Convenzioni del progetto

- naming CSS BEM-like semplificato, per esempio `header__logo`, `collezioni__grid`, `dettaglio__info-link`;
- tono minimal, editoriale, raffinato;
- forte uso di maiuscole, tracking ampio e spaziature generose;
- HTML semplice e leggibile, senza astrazioni.

## Rischi strutturali principali

1. Modifiche globali costose per via della duplicazione HTML.
2. `fill-box` sensibile ai cambi di copy e alla presenza della riga di riferimento.
3. Pagine dettaglio facili da desincronizzare se si aggiorna solo una delle tre.
4. Performance condizionate più dagli asset che dal codice.

## Quando allegare questo file

Allega `docs/01-architettura-struttura.md` quando la richiesta riguarda:

- quali file toccare;
- impatto globale vs locale;
- relazione tra pagine;
- header/footer/menu duplicati;
- mappa del progetto.
