# CÉLESTE — Asset, SEO e accessibilità

Verificato il **2026-03-13**.

## Asset principali

Dimensioni rilevate direttamente nel repository:

| File | Byte | MiB circa |
| --- | ---: | ---: |
| `img/SFONDO_HOME.png` | 38,968,900 | 37.16 |
| `img/ARIA.png` | 9,556,081 | 9.11 |
| `img/METALLO.png` | 9,513,376 | 9.07 |
| `img/moirè.png` | 9,369,004 | 8.93 |
| `img/CELESTE-LOGO.svg` | 2,467 | ~0.00 |
| `img/INFO.svg` | 28,295 | 0.03 |
| `img/REF_PROPORZIONI_LOGO.png` | 7,649 | 0.01 |

## Criticità performance

1. `SFONDO_HOME.png` è molto pesante per una cover page.
2. Le tre immagini collezione sono ancora molto pesanti per il tipo di sito.
3. L'esperienza mobile è il punto più esposto al download inutile di asset.

## Asset non usati nel codice attuale

Confermati come non referenziati in HTML/CSS/JS:

- `img/INFO.svg`
- `img/REF_PROPORZIONI_LOGO.png`

## Nota sul nome file con accento

`img/moirè.png` contiene un carattere accentato.

Non è un problema nel codice attuale, ma va ricordato quando si fanno:

- migrazioni asset;
- deploy automatizzati;
- script di rinomina;
- conversioni batch.

## Stato SEO attuale

### Presente

In tutte le pagine HTML verificate:

- `lang="it"`
- `meta charset`
- `meta viewport`
- `meta description`
- `title` specifico per pagina

### Assente nel codice attuale

Ricerca confermata nel repository:

- favicon
- Open Graph
- Twitter/X cards
- canonical URL
- dati strutturati
- sitemap
- `robots.txt`

## Stato accessibilità / UX attuale

### Punti positivi

- struttura semplice;
- immagini con `alt`;
- uso di un vero `button` per il menu;
- link chiari e pochi livelli di navigazione.

### Miglioramenti consigliati

- aggiungere `aria-expanded` e `aria-controls` al menu;
- chiusura con tasto `Esc`;
- focus state più evidenti;
- verifica contrasto scritte bianche nella home su sfondo fotografico;
- eventuale lazy loading per immagini non critiche;
- semantica più ricca per i blocchi informativi.

## Priorità tecniche consigliate

1. ottimizzare immagini;
2. valutare WebP/AVIF;
3. introdurre favicon e meta social;
4. migliorare accessibilità del menu;
5. valutare `loading="lazy"` dove sensato.

## Quando allegare questo file

Allega `docs/05-asset-seo-accessibilita.md` quando la richiesta riguarda:

- immagini e pesi;
- ottimizzazione performance;
- asset inutilizzati;
- SEO base;
- accessibilità;
- miglioramenti UX tecnici.
