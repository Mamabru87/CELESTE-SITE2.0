# CÉLESTE — Design system e layout

Verificato sul codice il **2026-03-13**.

## Identità visiva

Il sito usa un linguaggio:

- minimale;
- editoriale;
- tipografico;
- quasi monocromatico;
- basato più su spaziatura e ritmo che su decorazioni.

## Font

Font custom unico:

- `fonts/HelveticaNowVar.ttf`
- registrato come `Helvetica Now`

Fallback:

- `Helvetica Neue`
- `Helvetica`
- `Arial`
- `sans-serif`

## Palette attuale

Variabili principali in `:root`:

- `--color-primary: #000000`
- `--color-white: #ffffff`
- `--color-text: #000000`
- `--color-text-light: #777777`
- `--color-border: #e0e0e0`

## Scala tipografica chiave

Valori ricorrenti verificati:

- `--menu-font-size: 1.1rem` su desktop;
- `--menu-font-size: 0.75rem` sotto `768px`;
- tracking dei label/menu: `0.35em` desktop;
- `line-height` dei label principali desktop: `1`.

Questo significa che menu, titoli “menu-like” e varie label condividono la stessa metrica di base.

## Header desktop

Logica attuale:

- logo a sinistra;
- bottone `Menù` fissato a destra viewport;
- dropdown verticale in overlay sotto la colonna del logo;
- contenuti delle pagine interne spostati in una safe area a destra del dropdown.

Variabili desktop importanti:

- `--desktop-header-logo-width: 300px`
- `--desktop-header-logo-height`
- `--after-logo-extra-gap`
- `--desktop-dropdown-reserve-width`
- `--desktop-content-safe-left`
- `--desktop-content-center-compensation`
- `--desktop-content-offset-from-logo`

## Header mobile

Sotto `768px` il comportamento cambia:

- logo e bottone tornano nel flusso dell'header;
- il dropdown non è più in overlay ma in flusso documento;
- aprendo il menu, il contenuto viene spinto verso il basso;
- i rapporti tra logo, gap e contenuto sono derivati da variabili mobili.

Variabili mobili chiave:

- `--mobile-header-logo-width`
- `--mobile-header-logo-height`
- `--mobile-after-logo-extra-gap`
- `--mobile-content-offset-from-logo`
- `--mobile-content-side-padding`
- `--header-nav-item-gap`
- `--detail-rhythm-spacing`

## Home layout

`body.home` usa:

- sfondo full-screen con `SFONDO_HOME.png`;
- logo bianco tramite `filter: brightness(0) invert(1)`;
- menu bianco con ombra leggera;
- scritta `Milano` in basso a destra;
- nessuno scroll verticale.

## Collezioni layout

Desktop:

- griglia a 3 colonne;
- nome e descrizione sopra l'immagine;
- gap descrizione/immagine controllato da `--collections-text-image-gap`.

Mobile:

- una sola colonna;
- card larga max `280px`;
- immagine senza crop forzato (`object-fit: contain`).

## Layout pagine interne

### `studio` / `appuntamento`

- padding superiore derivato dalla distanza sotto il logo;
- container centrati nella safe area desktop (`max-width: 1040px` per `studio`);
- `studio.html` usa layout a due colonne affiancate (`.studio__layout`) centrate con `gap: var(--spacing-xl)`;
- su mobile le due colonne stackano verticalmente con `gap: var(--spacing-lg)`;
- blocchi testuali con larghezza `max-content` per preservare la composizione.

### `dettaglio`

- container centrato nella safe area;
- wrapper `.dettaglio__layout` desktop più stretto del viewport;
- titolo, immagini e blocchi informativi condividono lo stesso asse sinistro;
- ritmo verticale gestito da `--detail-rhythm-spacing`.

## Pattern critico: `fill-box`

Classi coinvolte:

- `.fill-box`
- `.fill-box__ref`
- `.fill-box__fit`

Scopo:

- far “riempire” otticamente la stessa larghezza a righe diverse tramite `letter-spacing` dinamico.

Regole da non rompere:

1. deve esistere una sola riga `.fill-box__ref` significativa;
2. i testi con `fill-box` non vanno riscritti in modo casuale;
3. anche piccole modifiche di copy possono cambiare molto la resa;
4. il sistema resta attivo anche su mobile.

## Breakpoint attuali

- `1024px`
- `768px`
- `400px`

Il breakpoint `400px` non introduce una composizione separata: rifinisce la baseline mobile già impostata sotto `768px`.

## Quando allegare questo file

Allega `docs/03-design-system-layout.md` quando la richiesta riguarda:

- CSS;
- logo/header/menu;
- spaziature;
- tipografia;
- responsive;
- safe area desktop;
- allineamenti ottici;
- comportamento del layout tra desktop e mobile.
