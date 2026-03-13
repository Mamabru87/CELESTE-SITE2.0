# CÉLESTE — Indice operativo modulare

Documentazione modulare del sito, verificata sul codice il **2026-03-13**.

Questo file serve da hub rapido: se in futuro vuoi chiedere una modifica precisa, puoi allegare direttamente il file Markdown più pertinente invece dell'intero `README.md`.

## Quale file allegare in base alla richiesta

- **Struttura del sito / file da toccare / impatti globali** → `docs/01-architettura-struttura.md`
- **Copy, pagine, contenuti, tone of voice** → `docs/02-pagine-contenuti.md`
- **CSS, layout, tipografia, responsive, header/menu** → `docs/03-design-system-layout.md`
- **JavaScript, menu toggle, prezzi/taglie, fill-box** → `docs/04-js-e-interazioni.md`
- **Immagini, performance, SEO, accessibilità** → `docs/05-asset-seo-accessibilita.md`
- **Checklist operative, punti delicati, QA dopo modifiche** → `docs/06-manutenzione-checklist.md`
- **Storico sintetico delle modifiche documentali** → `docs/07-registro-modifiche.md`
- **Dossier completo storico** → `README.md`

## Mappa rapida del progetto

```text
index.html            → home / cover page
collezioni.html       → indice collezioni
aria.html             → dettaglio collezione Aria
metallo.html          → dettaglio collezione Metallo
moire.html            → dettaglio collezione Moiré
studio.html           → servizi / studio
appuntamento.html     → contatti / prenotazione
css/style.css         → intero design system e responsive
js/main.js            → menu, toggle prezzi/taglie, fill-box
```

## Stato verificato

Controlli effettuati sul repository attuale:

- struttura HTML coerente con il `README.md`;
- nessun errore rilevato nei file del workspace;
- nessun riferimento a favicon, Open Graph, canonical o `robots.txt` nel codice;
- `INFO.svg` e `REF_PROPORZIONI_LOGO.png` non risultano usati;
- il codice JS per `comeFunziona` è presente ma non usato nel markup attuale;
- il `fill-box` è attivo anche su mobile, non neutralizzato.

## Note operative velocissime

- Il progetto è **statico**: niente build, niente componenti, niente bundler.
- `header` e `footer` sono duplicati nelle pagine HTML interne.
- Le tre pagine dettaglio (`aria`, `metallo`, `moire`) vanno trattate come un piccolo gruppo sincronizzato.
- Le immagini principali sono il collo di bottiglia tecnico più evidente.
- Il sistema `fill-box` è il punto più sensibile dal lato tipografico.

## Ordine consigliato quando si modifica il sito

1. Capire se la modifica è locale o globale.
2. Verificare se tocca header, footer o menu duplicati.
3. Verificare se impatta `fill-box` o testi spezzati manualmente.
4. Controllare desktop e mobile.
5. Se tocchi immagini o asset, ricontrollare peso e formato.

## Documenti collegati

- `docs/01-architettura-struttura.md`
- `docs/02-pagine-contenuti.md`
- `docs/03-design-system-layout.md`
- `docs/04-js-e-interazioni.md`
- `docs/05-asset-seo-accessibilita.md`
- `docs/06-manutenzione-checklist.md`
- `docs/07-registro-modifiche.md`
