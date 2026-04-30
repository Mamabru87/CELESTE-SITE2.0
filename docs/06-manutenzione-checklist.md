# CÉLESTE — Manutenzione e checklist

Verificato il **2026-03-13**.

## Punti delicati prima di modificare il sito

### 1. Header e footer duplicati

Se cambi menu, logo, footer o link globali, devi aggiornare più file HTML.

### 2. `fill-box` sensibile alla struttura

Il sistema dipende da:

- numero di caratteri;
- righe separate;
- presenza corretta di `.fill-box__ref`;
- caricamento del font.

### 3. Testi spezzati manualmente

Diversi blocchi sono spezzati riga per riga volutamente, soprattutto:

- `Delivery` nelle pagine dettaglio;
- descrizioni e servizi nelle pagine editoriali.

Non vanno “normalizzati” senza controllo visivo.

### 4. Pagine dettaglio sincronizzate

`aria.html` e `moire.html` sono sorelle strette: modificare una sola pagina è il modo più rapido per creare inconsistenze.

### 5. Mobile come derivazione del desktop

Il mobile non è un layout separato inventato da zero: usa proporzioni derivate dal logo e dalla metrica desktop.

## Flusso consigliato per qualunque modifica

1. capire se la modifica è locale o globale;
2. identificare i file da toccare;
3. verificare impatto su `fill-box`;
4. controllare se coinvolge il gruppo collezioni o il gruppo dettagli;
5. verificare desktop;
6. verificare mobile;
7. ricontrollare menu e contatti se la modifica è trasversale.

## Cosa ricontrollare in base al tipo di intervento

### Se tocchi layout/CSS

Controllare sempre:

- `index.html`
- `collezioni.html`
- almeno una pagina dettaglio
- `studio.html`
- `appuntamento.html`

### Se tocchi testo/copy

Controllare sempre:

- allineamento tipografico;
- effetto `fill-box`;
- rotture di riga su mobile;
- coerenza del tono.

### Se tocchi menu/header

Controllare sempre:

- apertura/chiusura dropdown;
- allineamento del logo;
- allineamento ottico di `Menù`;
- eventuale overlay desktop vs flusso mobile.

## Checklist finale dopo ogni modifica

- [ ] Il menu si apre e si chiude correttamente?
- [ ] I link del menu puntano alle pagine giuste?
- [ ] La home mantiene la resa full-screen desiderata?
- [ ] Il logo resta leggibile su home e pagine interne?
- [ ] `aria` e `moire` sono coerenti tra loro?
- [ ] I toggle delle taglie funzionano ancora?
- [ ] Il `fill-box` continua ad allineare bene i testi?
- [ ] Le righe non si rompono male su mobile?
- [ ] Il footer è aggiornato in tutte le pagine interne?
- [ ] Nuove immagini o font hanno peso ragionevole?

## Checklist documentale

- [ ] Se la modifica cambia struttura o logica, aggiornare anche il file MD tematico corretto.
- [ ] Se la modifica è globale, aggiungere una nota a `docs/07-registro-modifiche.md`.
- [ ] Se cambia il comportamento operativo generale, aggiornare anche `README.md`.

## Quando allegare questo file

Allega `docs/06-manutenzione-checklist.md` quando la richiesta riguarda:

- QA rapido;
- controllo finale;
- punti delicati del sito;
- procedura di modifica;
- prevenzione regressioni.
