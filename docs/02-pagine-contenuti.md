# CÉLESTE — Pagine e contenuti

Verificato sul codice il **2026-03-13**.

## Home — `index.html`

Ruolo: ingresso visivo del brand.

Contenuto attuale:

- logo cliccabile verso `index.html`;
- bottone `Menù`;
- dropdown con navigazione primaria;
- scritta `Milano` in basso a destra.

Caratteristiche:

- `body.home`;
- sfondo full-screen con `img/SFONDO_HOME.png`;
- `overflow: hidden` per evitare scroll;
- logo e menu bianchi su immagine.

Nota pratica:

- se si aggiunge contenuto alla home, bisogna ricontrollare subito `height: 100vh` e `overflow: hidden`.

## Collezioni — `collezioni.html`

Ruolo: indice delle collezioni.

Collezioni presenti:

1. `Aria` → `aria.html`
2. `Metallo` → `metallo.html`
3. `Moiré` → `moire.html`

Struttura di ogni card:

- nome collezione;
- descrizione breve;
- immagine cliccabile.

Copy attuale verificato:

- `Aria` → `Romantico, etereo, leggero.`
- `Metallo` → `Geometrico, materico, natura morta.`
- `Moiré` → `Istintivo, creativo, a sorpresa.`

Nota pratica:

- su mobile la griglia diventa a una colonna e l'immagine non viene croppata: usa `object-fit: contain`.

## Pagine dettaglio — `aria.html`, `metallo.html`, `moire.html`

Ruolo: presentazione delle singole collezioni.

Struttura comune:

- titolo collezione;
- doppia immagine affiancata;
- descrizione poetica;
- blocco informativo con `Sizes`, `Delivery`, `Contact`.

### Copy descrittivo attuale

#### Aria

- `Romantico, etereo, leggero.`
- `Foto mostrata nella taglia piccolo.`
- `Il tuo bouquet potrebbe differire da quello in foto.`

#### Metallo

- `Geometrico, materico, natura morta.`
- `Foto mostrata nella taglia piccolo.`
- `Il tuo bouquet potrebbe differire da quello in foto.`

#### Moiré

- `Istintivo, creativo, a sorpresa.`
- `Foto mostrata nella taglia piccolo.`
- `Il tuo bouquet potrebbe differire da quello in foto.`

### Sizes

Valori attuali condivisi:

- `Small` → `€70`
- `Medium` → `€160`
- `Large` → `€450`

### Delivery

Testo condiviso attuale:

- consegna bouquet tramite corriere a Milano e piccola cintura urbana;
- giorni feriali (`lunedì–venerdì`);
- `Milano — 25€`;
- `Piccola cintura urbana — 40€`.

### Contact

Contatto condiviso attuale:

- `studio@celestemilano.it`
- `@celeste_milano_`
- `+39 338 8978782` con link WhatsApp `wa.me`
- `by appointment only`

Nota pratica:

- le tre pagine vanno sempre riviste insieme quando si cambia layout, prezzi, delivery o contatti.

## Studio — `studio.html`

Ruolo: presentazione dei servizi e manifesto del brand.

La pagina usa un layout a due colonne affiancate centrate (`.studio__layout`), stackate verticalmente su mobile.

### Colonna sinistra — Servizi (`.studio__services`)

Blocchi attuali:

- `Servizi:`
- `Vase en Résidence:`
  - `Dialogo tra vaso, spazio e fiori.`
  - `Servizio d'élite dove la composizione`
  - `viene concepita per abitare`
  - `lo spazio del cliente.`
- `Direzione Artistica:`
  - `Scenografie botaniche.`
- `Abbonamenti:`
  - `Bellezza a cadenza fissa.`

Nota pratica:

- `Direzione Artistica:` è ancora la riga di riferimento per la larghezza del `fill-box`.

### Colonna destra — About (`.studio__about`)

Testo attuale (suddiviso visivamente in righe colonnate, testo invariato):

- `Natura. Luce. Aria.` ← label
- `Progetto botanico fondato da`
- `Marco Maria Lombardi.`
- `Lo studio nasce come una ricerca`
- `sulla forma, sul colore e sulla materia,`
- `dove la natura attraversa lo spazio.`
- `Ogni creazione ha il peso di una scultura`
- `e la leggerezza di un respiro:`
- `una visione nitida, capace di alternare`
- `l'etereo a una presenza materica e decisa.`
- `Nessun luogo fisico, un modello nomade.`
- `C É L E S T E opera esclusivamente`
- `su commissione: un rito di bellezza`
- `botanica concepito su misura per il luogo.`

Nota pratica:

- i paragrafi nell'about usano `studio__label--section-break` sulla prima riga di ogni blocco per ritmo verticale coerente con la colonna sinistra.
- la colonna about non usa `fill-box` (testo libero senza allineamento a larghezza fissa).

## Appuntamento — `appuntamento.html`

Ruolo: contatti/prenotazione.

Contenuto verificato:

- `studio@celestemilano.it`
- `@celeste_milano_`
- `+39 338 8978782` con link WhatsApp
- `by appointment only`

Nota pratica:

- questa pagina usa la stessa logica tipografica del blocco `Contact` delle pagine dettaglio.

## Tono di voce da preservare

- poetico;
- raffinato;
- essenziale;
- mai aggressivamente commerciale;
- più vicino a direzione creativa / studio floreale che a e-commerce standard.

## Quando allegare questo file

Allega `docs/02-pagine-contenuti.md` quando la richiesta riguarda:

- testi di pagina;
- descrizioni collezioni;
- contatti;
- servizi;
- coerenza del tone of voice;
- controllo di contenuti specifici per pagina.
