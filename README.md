# CÉLESTE — README operativo del sito

Documento di contesto del progetto, pensato per aiutare chiunque modifichi il sito (persona o AI) a capire rapidamente struttura, logica, contenuti, convenzioni e punti delicati dell'implementazione attuale.

**Stato analizzato il:** 2026-03-07  
**Tipo progetto:** sito statico HTML/CSS/JS senza build step  
**Obiettivo del file:** mantenere modifiche future coerenti, veloci e consapevoli

---

## 1. Panoramica generale

CÉLESTE è attualmente un sito vetrina statico a identità visiva molto minimale, editoriale e tipografica.  
L'architettura è volutamente semplice:

- pagine HTML distinte, una per ogni sezione del sito;
- un solo foglio di stile globale: `css/style.css`;
- un solo script globale: `js/main.js`;
- asset locali per logo, immagini di collezione, sfondo home e font;
- nessun framework, nessun preprocessore, nessun bundler;
- nessuna dipendenza esterna lato frontend.

Questa semplicità rende il sito facile da pubblicare e modificare, ma comporta anche alcune conseguenze importanti:

- **header e footer sono duplicati in ogni pagina**;
- **ogni modifica strutturale globale va replicata manualmente** in più file HTML;
- **non esiste un sistema di componenti o template**;
- **gran parte del comportamento è guidata da classi CSS riutilizzate**.

---

## 2. Struttura attuale del repository

```text
appuntamento.html
aria.html
collezioni.html
index.html
metallo.html
moire.html
studio.html
css/
  style.css
fonts/
  HelveticaNowVar.ttf
img/
  ARIA.png
  CELESTE-LOGO.svg
  INFO.svg
  METALLO.png
  moirè.png
  REF_PROPORZIONI_LOGO.png
  SFONDO_HOME.png
js/
  main.js
```

### File principali

- `index.html` → home page essenziale con logo e menu su sfondo fotografico.
- `collezioni.html` → griglia delle collezioni con link ai dettagli.
- `aria.html` → pagina dettaglio collezione Aria.
- `metallo.html` → pagina dettaglio collezione Metallo.
- `moire.html` → pagina dettaglio collezione Moiré.
- `studio.html` → pagina di presentazione servizi / studio.
- `appuntamento.html` → pagina contatti e prenotazione.
- `css/style.css` → intero design system del sito.
- `js/main.js` → comportamento menu, toggle prezzi/taglie, riempimento ottico del testo (`fill-box`).

---

## 3. Architettura del sito e navigazione

### Navigazione primaria

Il menu principale è lo stesso in tutte le pagine e contiene:

- `Collezioni`
- `Studio`
- `Appuntamento`
- `Instagram` (link esterno)

### Pattern condivisi

Quasi tutte le pagine seguono questa struttura:

1. `header.header`
2. `main.main-content`
3. `footer.footer`
4. inclusione finale di `js/main.js`

### Differenza principale della home

`index.html` è una landing molto essenziale:

- non mostra contenuto centrale oltre all'header;
- usa `body.home`;
- attiva uno sfondo full-screen via CSS con `img/SFONDO_HOME.png`;
- forza `overflow: hidden` per evitare scroll.

Questa pagina è costruita più come **cover page / intro visiva** che come homepage informativa tradizionale.

---

## 4. Analisi dettagliata delle pagine

### 4.1 `index.html`

Ruolo: home/ingresso del brand.

Contenuto:

- logo centrale cliccabile verso `index.html`;
- pulsante `Menù`;
- dropdown di navigazione sotto il logo.

Caratteristiche distintive:

- sfondo fotografico a tutto schermo;
- logo reso bianco con `filter: brightness(0) invert(1)`;
- testo menu bianco con ombra leggera;
- nessun footer visibile;
- nessun contenuto editoriale oltre alla navigazione.

Note importanti:

- la home dipende fortemente dal peso dell'immagine `SFONDO_HOME.png`;
- se si introduce contenuto aggiuntivo nella home, bisogna verificare l'effetto di `overflow: hidden` e altezza piena viewport.

### 4.2 `collezioni.html`

Ruolo: pagina indice delle collezioni disponibili.

Struttura:

- titolo: `Collezioni`;
- griglia a 3 colonne desktop (`.collezioni__grid`);
- card per ogni collezione.

Collezioni attuali:

1. **Aria** → `aria.html`
2. **Metallo** → `metallo.html`
3. **Moiré** → `moire.html`

Contenuto per card:

Ogni card contiene:

- immagine;
- nome collezione;
- descrizione breve in due righe circa.

Responsive:

- desktop: 3 colonne;
- mobile (`max-width: 768px`): 1 colonna.

Note importanti:

- le immagini delle collezioni sono molto pesanti in rapporto alla semplicità della pagina;
- attualmente non c'è hover elaborato, animazione o lazy loading.

### 4.3 `aria.html`, `metallo.html`, `moire.html`

Ruolo: pagine di dettaglio di ciascuna collezione.

Struttura comune:

Le tre pagine sono quasi identiche a livello strutturale:

- titolo collezione;
- blocco immagini laterale con **due immagini affiancate**;
- descrizione poetica del bouquet;
- blocco informativo con:
  - `Sizes:`
  - `Delivery:`
  - `Contact:`

Comportamento interattivo:

Le taglie (`small`, `medium`, `large`) sono cliccabili grazie a `.size-toggle`.  
Quando si clicca una taglia:

- il testo della taglia viene sostituito dal prezzo;
- se si clicca di nuovo, torna il nome della taglia;
- gli altri elementi della stessa riga vengono ripristinati ai rispettivi nomi.

Prezzi attuali:

- small → `€70`
- medium → `€160`
- large → `€450`

Delivery attuale:

Testo spezzato su più righe, impostato per un controllo molto preciso dell'impaginazione.  
Contenuto attuale:

- consegna bouquet tramite corriere a Firenze e piccola cintura urbana;
- spese nei giorni feriali;
- Firenze → `25€`;
- piccola cintura urbana → `40€`.

Contact attuale:

Ripetuto uguale nelle tre pagine:

- `studio@celestemilano.it`
- `@celeste_milano_`
- `+39 338 8978782`
- `by appointment only`

Note importanti:

- ciascuna pagina usa **la stessa immagine duplicata due volte** affiancata;
- il testo è impaginato in righe separate per poter sfruttare il sistema `fill-box`;
- i dettagli condividono struttura e contenuto quasi identici: ottimo candidato futuro a una semplificazione/templatizzazione.

Differenze contenutistiche tra collezioni:

- **Aria** → tono romantico, etereo, leggero.
- **Metallo** → tono geometrico, materico, natura morta.
- **Moiré** → tono istintivo, creativo, a sorpresa.

### 4.4 `studio.html`

Ruolo: pagina di presentazione servizi del brand/studio.

Contenuto attuale:

Titolo: `Studio`

Blocco servizi:

- `Servizi:`
- `Vase en Résidence:`
  - dialogo tra vaso, spazio e fiori;
  - servizio d'élite dove la composizione viene concepita per abitare lo spazio del cliente.
- `Direzione Artistica:`
  - scenografie botaniche.
- `Abbonamenti:`
  - bellezza a cadenza fissa.

Osservazioni:

- la pagina è volutamente minimalissima;
- il testo è organizzato come composizione tipografica più che come sezione descrittiva classica;
- `Direzione Artistica:` è la riga di riferimento per la larghezza (`fill-box__ref`).

Note importanti:

- se si cambia il testo dei servizi, il layout ottico può modificarsi molto;
- la larghezza del blocco dipende dall'elemento di riferimento usato da `fill-box`.

### 4.5 `appuntamento.html`

Ruolo: pagina di contatto/prenotazione.

Contenuto attuale:

- email;
- Instagram;
- telefono;
- nota finale `by appointment only`.

Osservazioni:

- è la pagina più semplice del sito;
- usa lo stesso pattern `fill-box` per allineare otticamente le righe;
- è di fatto una pagina contatti minimal.

---

## 5. Sistema visivo e CSS

Tutto il linguaggio visivo è centralizzato in `css/style.css`.

### 5.1 Font

È definito un solo font custom:

- `fonts/HelveticaNowVar.ttf`;
- registrato come `Helvetica Now`;
- usato sia per heading che per body.

Fallback:

- `Helvetica Neue`
- `Helvetica`
- `Arial`
- `sans-serif`

### 5.2 Colori

Palette attuale estremamente ridotta:

- `--color-primary: #000000`
- `--color-white: #ffffff`
- `--color-text: #000000`
- `--color-text-light: #777777`
- `--color-border: #e0e0e0`

Identità visiva attuale:

- bianco e nero pulito;
- grigio tenue per testo secondario;
- forte dipendenza dalla fotografia e dalla spaziatura per dare carattere.

### 5.3 Tipografia

Scelte chiave:

- molti testi in uppercase;
- letter-spacing molto ampio nei titoli e nei label;
- descrizioni in peso leggero (`300`) con tono editoriale;
- gerarchia ottenuta più tramite spazio e tracking che tramite grandi differenze cromatiche.

Valori ricorrenti:

- titoli sezione: `1.1rem`, `letter-spacing: 0.35em`, uppercase;
- link e label dettagli: simili, con estetica coerente e rigorosa;
- descrizioni collezione: più piccole, leggere e grigie.

### 5.4 Layout

#### Container

- larghezza: `90%`;
- max-width: `1200px`.

#### Header

- logo centrato;
- bottone menu fisso a destra della viewport;
- dropdown che si apre sotto il logo.

#### Collezioni

- grid a 3 colonne desktop;
- 1 colonna mobile.

#### Dettaglio collezione

- immagini affiancate in un contenitore largo circa il `50%`;
- blocco testuale sotto le immagini.

### 5.5 Responsive

Breakpoints presenti:

- `1024px`
- `768px`
- `400px`

Comportamenti principali su mobile:

- header più compatto;
- logo più grande in percentuale relativa;
- menu in colonna verticale;
- collezioni in una sola colonna;
- testi delle pagine informative ridotti;
- blocchi con `white-space: normal` e `word-break: break-word`.

### 5.6 Pattern notevoli del CSS

#### `fill-box`

Pattern importante del sito.  
Serve a far sì che più righe di testo abbiano visivamente la stessa larghezza della riga di riferimento.

Classi coinvolte:

- `.fill-box`
- `.fill-box__ref`
- `.fill-box__fit`

Funzionamento:

- uno degli elementi del blocco fa da riferimento di larghezza (`fill-box__ref`);
- gli altri elementi (`fill-box__fit`) ricevono `letter-spacing` dinamico via JS per “riempire” otticamente la stessa larghezza.

**Implicazione cruciale:** se si rimuove o si sbaglia l'elemento `.fill-box__ref`, il sistema perde il riferimento e l'impaginazione cambia.

#### Regole mobile attuali

La versione mobile deve essere letta come una **scalatura coerente del desktop**, non come un layout separato.

Principi attuali:

- il desktop resta la baseline di progetto da non alterare;
- il mobile deriva le proprie misure dal logo `CÉLESTE`, usando variabili dedicate ma proporzionali;
- il menu mobile resta a comparsa ma deve aprirsi **in flusso**, spingendo il contenuto verso il basso;
- lo stacco sotto `CÉLESTE` deve esistere anche su mobile, scalato in funzione dell'altezza del logo;
- i contenuti mobili devono restare centrati nell'area utile e non perdere i rapporti tipografici stabiliti nel desktop.

Variabili mobili chiave presenti in `css/style.css`:

- `--mobile-header-logo-width`
- `--mobile-header-logo-height`
- `--mobile-after-logo-extra-gap`
- `--mobile-content-offset-from-logo`
- `--mobile-content-side-padding`
- `--header-nav-item-gap` (ricalcolata su mobile)
- `--detail-rhythm-spacing` (ricalcolata su mobile)

---

## 6. JavaScript attuale (`js/main.js`)

Lo script è unico e globale.

### 6.1 Menu toggle

Funzione attiva in tutte le pagine che hanno:

- `#menuToggle`
- `#dropdown`

Comportamento:

- click su `Menù` → aggiunge/rimuove classe `open` sul dropdown;
- click su un link del dropdown → chiude il menu.

### 6.2 Toggle taglia/prezzo

Attivo sugli elementi con classe `.size-toggle`.

Comportamento:

- mostra taglia o prezzo alternandoli;
- ripristina gli altri elementi della stessa riga;
- al cambio richiama `applyFillBox()` quando i font sono pronti.

### 6.3 `applyFillBox()`

Funzione centrale per la resa tipografica delle pagine `studio`, `appuntamento` e `dettaglio`.

Passaggi logici:

1. trova ogni `.fill-box`;
2. cerca la riga di riferimento `.fill-box__ref`;
3. misura la larghezza del riferimento;
4. per ogni elemento da adattare, ricalcola il `letter-spacing`;
5. ripete il calcolo anche al resize con piccolo debounce.

### 6.4 Codice presente ma non usato nel markup attuale

Nel file esiste anche logica per un accordion:

- `#comeFunziona`
- `#comeFunzionaContent`

Attualmente **nessuna delle pagine HTML lette contiene questi ID**.  
Quindi questa parte di script oggi è **inattiva / preparata per futuro uso / residuo di una versione precedente**.

**Nota importante:** se in futuro si vuole una sezione `Come funziona`, esiste già una base JS pronta.

---

## 7. Asset, font e immagini

### 7.1 Font

- `fonts/HelveticaNowVar.ttf` → circa `144.716 KB`

### 7.2 Immagini principali

- `img/SFONDO_HOME.png` → circa `38.968.900 B` (~39 MB)
- `img/ARIA.png` → circa `9.556.081 B` (~9.6 MB)
- `img/METALLO.png` → circa `9.513.376 B` (~9.5 MB)
- `img/moirè.png` → circa `9.369.004 B` (~9.4 MB)

### 7.3 Asset secondari

- `img/CELESTE-LOGO.svg` → logo vettoriale del brand;
- `img/INFO.svg` → presente nel repository ma **non referenziato** nel codice HTML/CSS/JS attuale;
- `img/REF_PROPORZIONI_LOGO.png` → presente nel repository ma **non referenziato** nel codice HTML/CSS/JS attuale.

### 7.4 Considerazioni importanti sugli asset

1. **Le immagini sono molto pesanti** per un sito statico così minimale. Questo è il punto tecnico più critico dello stato attuale.
2. `SFONDO_HOME.png` da solo pesa circa **39 MB**. È un valore molto alto per la prima impressione della home.
3. Le tre immagini delle collezioni sono attorno ai **9–10 MB ciascuna**. Anche senza molte pagine, il sito può risultare lento soprattutto su mobile.
4. Il file `moirè.png` contiene un carattere accentato nel nome. Funziona in locale e in molti hosting moderni, ma è bene ricordarlo quando si gestiscono deploy, script o migrazioni asset.

---

## 8. Convenzioni strutturali già presenti

Per mantenere coerenza con il sito attuale, queste convenzioni vanno considerate standard di progetto finché non si decide esplicitamente di cambiarle.

### Naming CSS

- stile BEM-like semplificato: `blocco__elemento`;
- esempi: `header__logo`, `collezioni__grid`, `dettaglio__info-link`.

### Impostazione visiva

- minimalismo editoriale;
- forte spaziatura;
- tracking ampio;
- nero / bianco / grigio;
- tipografia come elemento principale dell'identità.

### Markup

- header quasi identico in ogni pagina;
- footer quasi identico in ogni pagina non-home;
- script incluso in fondo al `body`.

### Tono contenuti

- poetico, raffinato, essenziale;
- mai commerciale in modo aggressivo;
- lessico più vicino a studio creativo / floral direction che a e-commerce tradizionale.

---

## 9. Punti delicati da ricordare prima di modificare il sito

### 9.1 Header e footer duplicati

Se si modifica:

- navigazione;
- logo;
- CTA del menu;
- footer.

Bisogna aggiornare manualmente più pagine HTML.

### 9.2 `fill-box` è sensibile alla struttura del testo

Il sistema dipende da:

- numero di caratteri;
- righe separate;
- presenza di `.fill-box__ref`;
- caricamento corretto del font.

Anche piccoli cambi di copy possono alterare l'effetto visivo.

### 9.3 Alcuni testi sono intenzionalmente spezzati su più righe

Per esempio il blocco `Delivery:` nei dettagli collezione.  
Non è testo spezzato per caso: fa parte del layout tipografico.

### 9.4 Le pagine dettaglio sono molto ridondanti

`aria.html`, `metallo.html`, `moire.html` hanno struttura quasi uguale.  
Se si fanno cambi globali al layout dettaglio, conviene applicarli a tutte e tre insieme.

### 9.5 Prestazioni immagine

Qualsiasi intervento futuro dovrebbe considerare con priorità:

- compressione immagini;
- eventuale conversione in WebP/AVIF;
- ridimensionamento a misure reali di visualizzazione;
- eventuale lazy loading.

---

## 10. SEO e struttura semantica: stato attuale

### Presente

- `lang="it"`;
- `meta charset`;
- `meta viewport`;
- `meta description` su ogni pagina;
- titoli pagina specifici.

### Assente o non rilevato

- favicon;
- Open Graph / social meta tags;
- Twitter/X cards;
- canonical URL;
- dati strutturati;
- sitemap;
- robots.txt.

### Nota

Il sito è già ordinato e semplice, ma dal punto di vista SEO è ancora in una fase molto essenziale.

---

## 11. Accessibilità e UX: stato attuale

### Aspetti positivi

- struttura generalmente semplice;
- link riconoscibili;
- immagini con attributo `alt`;
- bottoni veri per l'apertura menu.

### Possibili miglioramenti futuri

- gestione stato accessibile del menu (`aria-expanded`, `aria-controls`);
- chiusura menu con tastiera / ESC;
- focus states più evidenti;
- lazy loading immagini non critiche;
- migliore semantica dei blocchi informativi;
- eventuale contrasto da verificare sulle scritte bianche in home a seconda dello sfondo.

---

## 12. Osservazioni tecniche importanti emerse dall'analisi

1. **Progetto completamente statico**: ottimo per semplicità, meno ottimo per riuso componenti.
2. **CSS unico**: facile da trovare, ma cresce rapidamente se il sito si espande.
3. **JS unico**: attualmente piccolo e leggibile.
4. **Presenza di codice JS non attivo** (`comeFunziona`) da tenere presente.
5. **Asset non usati**: `INFO.svg`, `REF_PROPORZIONI_LOGO.png`.
6. **Immagini molto pesanti**: probabile primo collo di bottiglia prestazionale.
7. **Naming con accento in `moirè.png`**: attenzione nelle future automazioni.
8. **Contenuti di contatto coerenti e ripetuti**: se cambiano, vanno aggiornati in più file.
9. **Anno nel footer**: `2026` hardcoded in ogni pagina interna.

---

## 13. Guida pratica per modifiche future coerenti

Quando si interviene sul progetto, seguire idealmente questo ordine mentale:

1. capire se la modifica è **globale** o **locale**;
2. verificare se impatta header/footer/menu;
3. verificare se impatta il sistema `fill-box`;
4. verificare se tocca più pagine gemelle (`aria`, `metallo`, `moire`);
5. controllare il comportamento su mobile;
6. controllare se il peso degli asset può peggiorare o migliorare.

### Se si modifica il layout

Controllare sempre:

- `index.html`;
- `collezioni.html`;
- almeno una pagina dettaglio;
- `studio.html`;
- `appuntamento.html`.

### Se si modifica il testo

Controllare sempre:

- spaziature tipografiche;
- allineamento `fill-box`;
- rotture di riga su mobile;
- coerenza del tono editoriale.

### Se si modifica il menu

Aggiornare in tutte le pagine HTML dove il menu è duplicato.

---

## 14. Checklist di controllo dopo ogni modifica futura

Usare questa checklist come mini protocollo operativo:

- [ ] Il menu si apre e si chiude correttamente?
- [ ] I link del menu puntano alle pagine giuste?
- [ ] La home mantiene la resa full-screen desiderata?
- [ ] Il logo resta leggibile su home e pagine interne?
- [ ] Le pagine `aria`, `metallo`, `moire` sono coerenti tra loro?
- [ ] I toggle delle taglie mostrano ancora correttamente i prezzi?
- [ ] Il sistema `fill-box` continua ad allineare bene i testi?
- [ ] Le righe non si rompono male su mobile?
- [ ] Il footer è aggiornato in tutte le pagine interne?
- [ ] Nuove immagini o font hanno peso ragionevole?

---

## 15. Registro modifiche future

Da qui in avanti conviene aggiornare questa sezione a ogni intervento importante.

### Template suggerito

```md
## YYYY-MM-DD
- pagine toccate:
- file toccati:
- cosa è stato cambiato:
- motivo:
- note da ricordare:
```

### Stato attuale

- 2026-03-07
  - creato questo `README.md`;
  - fotografato lo stato iniziale del sito;
  - documentate struttura, pagine, asset, font, comportamento JS e criticità tecniche.
  - aggiornata la home desktop: logo allineato a sinistra con dimensione non più percentuale e menu dropdown verticale sotto il logo, mantenendo il pulsante `Menù` a destra.
  - corretto il logo della home desktop impostando una larghezza esplicita pari alla dimensione originale dell'SVG, per evitarne la scomparsa nel layout flex.
  - definita la misura desktop del logo home a `53mm` di larghezza (proporzione SVG ≈ `5,5mm` di altezza), con override separato per preservare il comportamento mobile.
  - ricalibrata la misura desktop del logo home in `200px` per resa web più fedele, perché le unità `mm` nei browser possono apparire visivamente più piccole del previsto su schermo.
  - aumentata ulteriormente la larghezza del logo home desktop a `230px` per avvicinare la resa visiva al riferimento PDF mostrato a confronto sullo stesso schermo.
  - effettuata una nuova taratura visiva del logo home desktop a `250px` sulla base del confronto diretto con il PDF, per compensare la differenza percettiva ancora presente.
  - allineato il menu dropdown della home desktop al bordo inferiore del logo, rimuovendo il padding superiore extra del blocco navigazione.
  - aggiunto tra logo e menu dropdown della home desktop uno spazio pari all'altezza del logo stesso, calcolato in proporzione all'SVG per ottenere un distacco coerente.
  - corretta la definizione delle variabili CSS della home desktop spostandole sul contenitore `header`, così lo spazio tra logo e menu venga realmente applicato anche al dropdown.
  - portate le voci del dropdown home desktop alla stessa scala tipografica del pulsante `Menù` e aumentato il distacco superiore del menu a due altezze-logo complessive.
  - ancorati logo e voci del menu home a `5vw` dal bordo sinistro della viewport, per ottenere la stessa distanza laterale del pulsante `Menù` dal bordo destro.
  - uniformata anche sulle altre pagine la posizione desktop del logo `CÉLESTE`, allineando l'header globale a sinistra con lo stesso offset laterale della home e mantenendo separato l'override mobile.
  - uniformato anche sulle altre pagine il comportamento desktop del menu a tendina al modello della home (verticale, a sinistra, con stessa scala tipografica e spaziatura) e rimossi i titoli duplicati `Collezioni`, `Studio` e `Appuntamento` sotto al logo.
  - aggiornate le descrizioni della pagina `collezioni.html` con i testi corretti delle tre collezioni: `Aria`, `Metallo`, `Moiré`.
  - aggiunto nelle pagine `collezioni`, `studio` e `appuntamento` uno spazio tra logo e contenuto pari all'altezza del logo desktop, con reset dedicato su mobile.
  - uniformata la dimensione delle descrizioni piccole sotto le foto in `collezioni` e nelle pagine dettaglio collezione alla stessa scala tipografica usata per `small`, `medium`, `large`, mantenendo il match anche nei breakpoint mobile.
  - applicata la stessa spaziatura sotto `CÉLESTE` anche alle pagine dettaglio `Aria`, `Metallo` e `Moiré`, e collegata la dimensione di `Aria/Metallo/Moiré` e delle label `Sizes`, `Delivery`, `Contact` alla stessa variabile tipografica del menu per mantenerle sempre allineate.
  - centrata su desktop la colonna contenuti delle pagine dettaglio (`Aria`, `Metallo`, `Moiré`) restringendo il container editoriale, così il contenuto non cade più sotto il logo `CÉLESTE` mentre l'header resta con logo a sinistra e `Menù` a destra.
  - applicata la stessa centratura desktop della colonna contenuti anche a `studio` e `appuntamento`, mantenendo l'header indipendente con logo a sinistra e `Menù` a destra.
  - su desktop il dropdown del `Menù` è stato sganciato dal flusso del layout e posizionato in overlay sotto la colonna di `CÉLESTE`, così l'apertura del menu non spinge più in basso il contenuto delle pagine; su mobile resta invece nel flusso normale.
  - nelle pagine dettaglio `Aria`, `Metallo` e `Moiré` sono state capitalizzate le iniziali di descrizione e taglie (`Small`, `Medium`, `Large`) e aggiunti due stacchi verticali prima di `Delivery` e `Contact`, usando su desktop la stessa altezza del logo `CÉLESTE` come unità di spazio.
  - nelle stesse pagine dettaglio le immagini sono state aumentate del 50% su desktop e lo spazio tra il blocco foto e la descrizione sottostante è stato portato alla stessa altezza del logo `CÉLESTE`.
  - corretto il toggle delle taglie nelle pagine dettaglio: le etichette capitalizzate non tornano più in minuscolo, su desktop il prezzo appare direttamente al passaggio del mouse (`hover`) e su mobile resta il comportamento a click.
  - allineata anche la dimensione dei nomi `Aria`, `Metallo` e `Moiré` nella pagina `collezioni` alla stessa scala tipografica del menù, usando la medesima letter-spacing dei link di navigazione.
  - aggiornata nelle tre pagine dettaglio la frase sotto le foto da `Foto mostrata nella taglia Small.` a `Foto mostrata nella taglia piccolo.`, mantenendo solo l'iniziale della frase in maiuscolo.
  - aggiornata la città del testo `Delivery` nelle tre pagine dettaglio da `Firenze` a `Milano`, inclusa la riga del costo `Milano — 25€`.
  - aggiunta nella home la scritta `Milano` in basso a destra, allineata al margine del `Menù` e con la stessa scala tipografica del menu desktop.
  - ritoccato l'allineamento ottico del `Menù` nella home desktop riducendo leggermente l'offset verticale, così il testo si appoggia meglio alla linea di base visiva del logo `CÉLESTE` senza risultare troppo basso.
  - aggiunti nella pagina `studio.html` due stacchi verticali prima di `Direzione Artistica` e `Abbonamenti`, usando su desktop la stessa altezza del logo `CÉLESTE` come unità di spazio e riducendo il margine sui breakpoint mobili.
  - aggiunto nella pagina `studio.html` anche lo stesso stacco verticale subito sotto `Servizi:`, applicandolo al titolo `Vase en Résidence:` per mantenere la scansione verticale uniforme tra tutte le sezioni del blocco.
  - riallineati i blocchi centrali delle pagine interne (`studio`, `appuntamento` e pagine dettaglio) con centratura reale dentro il container editoriale, evitando che il contenuto risultasse otticamente spostato a sinistra rispetto allo spazio tra `CÉLESTE` e `Menù`.
  - corretta la centratura delle pagine dettaglio (`Aria`, `Metallo`, `Moiré`) raggruppando descrizione e blocchi informativi in un solo wrapper centrato: il gruppo ora resta in mezzo alla pagina, ma testo e sottosezioni tornano allineati a sinistra tra loro senza alterare il formato interno.
  - unificato ulteriormente il layout delle pagine dettaglio inserendo nello stesso wrapper centrato anche titolo e blocco immagini: `Aria/Metallo/Moiré`, foto, descrizione e informazioni ora condividono lo stesso asse sinistro, mentre l'intero gruppo resta centrato nella pagina.
  - verificata e corretta la scala dei label della pagina `studio.html`: `Servizi`, `Vase en Résidence`, `Direzione Artistica` e `Abbonamenti` usano ora sempre la stessa `font-size` del `Menù` in desktop e mobile, mentre le descrizioni restano su una scala testuale separata.
  - scalato il blocco contatti di `appuntamento.html` dalla regola del wrapper `.appuntamento__info`, così email, Instagram, telefono e `by appointment only` mantengono le proporzioni interne ma usano tutti la stessa dimensione-base del `Menù` nei vari breakpoint.
  - sostituiti i link telefonici `tel:` con link `wa.me` nelle sezioni contatto di `appuntamento.html`, `aria.html`, `metallo.html` e `moire.html`, così il tap sul numero apre direttamente il flusso WhatsApp invece della chiamata del dispositivo; i link email restano `mailto:` per demandare al sistema l'app/client predefinito configurato dall'utente.
  - corretto il ritmo verticale desktop tra logo, menu a tendina e contenuto delle pagine interne: `Servizi`/contenuto principale parte ora alla stessa quota della prima voce del dropdown (`Collezioni`), compensando il `padding-bottom` dell'header dentro una nuova variabile condivisa di offset.
  - sostituita la micro-correzione empirica con una regola condivisa più rigorosa: menu dropdown e primo label del blocco centrale (`Servizi`) usano ora le stesse metriche tipografiche (`line-height` e `padding` verticale) tramite variabili comuni, e l'offset del contenuto viene calcolato a partire da quelle stesse metriche per far coincidere davvero la quota del primo rigo con `Collezioni`.
  - ridotte ulteriormente le metriche verticali condivise dei primi righi desktop (`Collezioni` nel dropdown e `Servizi` nel blocco centrale): padding verticale azzerato e `line-height: 1`, così il testo non risulta più visivamente centrato nel proprio box ma appoggia alla baseline, eliminando lo spazio percepito sotto il primo rigo.
  - verificato e corretto anche `appuntamento.html`: la prima riga del blocco contatti (`studio@celestemilano.it`) usa ora le stesse metriche verticali condivise del menu dropdown, così il suo allineamento superiore non resta più più basso di `Collezioni` per effetto del `line-height` interno del wrapper.
  - uniformata anche la spaziatura verticale interna del blocco `appuntamento.html`: email, Instagram, numero e `by appointment only` usano ora la stessa altezza-riga e un `gap` costante tra le righe, così la distanza fra `+39 338 8978782` e `by appointment only` non risulta più maggiore delle altre.
  - allineate anche le metriche dei titoli dettaglio `Aria`, `Metallo` e `Moiré` al menu/dropdown: la `font-size` era già uguale, ma mancavano le stesse metriche di riga; ora i titoli usano anche `line-height` e padding verticale condivisi, così non risultano più otticamente più piccoli di `Collezioni`, `Studio` o `Appuntamento`.
  - completato il controllo di resa uniforme sul resto dei testi principali del sito: anche i nomi delle card in `collezioni.html` e le label `Sizes`, `Delivery`, `Contact` nelle pagine dettaglio usano ora le stesse metriche verticali condivise del menu, così la gerarchia tipografica “menu-like” resta coerente in tutto il sito.
  - uniformato il ritmo verticale delle pagine dettaglio (`Aria`, `Metallo`, `Moiré`) con una variabile unica basata sull'altezza del logo `CÉLESTE`: lo spazio sotto il titolo, sotto il blocco foto, sotto la descrizione, dopo `Sizes` e dopo `Delivery` usa ora sempre la stessa misura, mantenuta coerente anche nei breakpoint mobili con un'altezza-logo dedicata.
  - riorganizzata la pagina `collezioni.html` portando nome collezione e descrizione sopra l'immagine in ogni card (`Aria`, `Metallo`, `Moiré`): il primo rigo delle card ora si allinea alla quota del menu `Collezioni` come nelle altre pagine, e la distanza tra descrizione e foto segue il ritmo verticale condiviso del sito.
  - ridotto ulteriormente lo spazio tra descrizione grigia e foto nella pagina `collezioni.html`: il primo valore scelto era troppo vicino alla spaziatura precedente, quindi lo stacco è stato compattato a `1em` per ottenere un avvicinamento realmente visibile tra descrizione e immagine.
  - corretta la centratura desktop di tutte le pagine interne quando la finestra si stringe: `studio`, `appuntamento`, `collezioni` e pagine dettaglio si centrano ora dentro una “safe area” a destra della colonna riservata al menu a comparsa sotto `CÉLESTE`, così il contenuto non invade più quello spazio e, restringendo la viewport, scivola leggermente verso destra restando comunque centrato nell'area utile.
  - uniformata anche la distanza verticale tra le voci del menu a comparsa: il `gap` tra `Collezioni`, `Studio`, `Appuntamento` e `Instagram` deriva ora dall'altezza del logo `CÉLESTE` nei vari breakpoint, così la colonna del menu mantiene la stessa unità di respiro del resto del layout.
  - aggiunto un ulteriore stacco verticale uniforme sotto `CÉLESTE`, pari a un'altra altezza-logo, applicato sia all'inizio del menu a comparsa sia all'inizio del contenuto delle pagine: `Collezioni` nel dropdown e il contenuto centrale partono ora entrambi più in basso ma restano sincronizzati tra loro in tutte le pagine.
  - avviata l'implementazione della baseline mobile coerente con il desktop: nel breakpoint `max-width: 768px` il logo, il gap sotto `CÉLESTE`, il gap del menu e il ritmo dei dettagli sono ora derivati da variabili mobili proporzionali; il bottone `Menù` rientra nel flusso dell'header, il dropdown mobile espande il layout in documento e le sezioni interne riacquistano uno stacco superiore coerente con il logo anche su cellulare.
  - perfezionata la resa mobile dei blocchi testuali riportandoli verso la logica desktop corretta: `fill-box` resta attivo anche su mobile, i blocchi di `studio`, `appuntamento` e delle pagine dettaglio tornano `width: max-content` con centratura del gruppo, e vengono rimossi gli override più aggressivi che li appiattivano a piena larghezza rompendo la composizione.
  - riallineata anche la resa `small phone` (`max-width: 400px`) alla baseline mobile principale: il reload su viewport molto stretti non deve più produrre una seconda composizione più compressa, perché logo e testo usano ora le stesse proporzioni e la stessa scala del mobile standard invece di un set separato troppo ridotto.
  - aggiunto anche su mobile il “vuoto strutturale” presente su desktop sotto `CÉLESTE`: il menu mobile e il contenuto delle pagine non partono più subito dopo il logo, ma dopo uno stacco persistente derivato da un'altra altezza-logo, così il respiro sotto header e menu resta coerente tra desktop e cellulare.
  - corretto anche l'asse di composizione mobile: i contenuti delle pagine interne non sono più centrati come su desktop, ma allineati a sinistra sotto `CÉLESTE` e sotto il menu aperto, condividendo lo stesso asse iniziale del testo nelle versioni mobili.

---

## 16. Sintesi ultra-rapida per AI / futura manutenzione

Se un'AI deve lavorare velocemente su questo repository, deve sapere subito questo:

- è un **sito statico** senza framework;
- i file chiave sono `index.html`, `collezioni.html`, `studio.html`, `appuntamento.html`, `aria.html`, `metallo.html`, `moire.html`, `css/style.css`, `js/main.js`;
- c'è **un solo font locale**: `HelveticaNowVar.ttf`;
- la home usa uno **sfondo PNG molto pesante**;
- il mobile usa una famiglia di variabili proporzionali derivate dal logo per preservare il rapporto tra header, menu e contenuto;
- il sistema `fill-box` resta attivo anche su mobile, ma i blocchi vengono controllati tramite larghezze e spaziature più fedeli alla composizione desktop;
- le pagine dettaglio hanno **toggle taglia/prezzo** via JS;
- molte pagine usano il sistema tipografico **`fill-box`**;
- header e footer sono **duplicati** in ogni pagina HTML;
- ci sono asset **non usati** (`INFO.svg`, `REF_PROPORZIONI_LOGO.png`);
- le immagini principali sono **molto pesanti**;
- qualsiasi modifica globale va verificata su **desktop + mobile**.

---

## 17. Priorità tecniche consigliate per il futuro

Non sono modifiche richieste adesso, ma sono le prime aree da tenere d'occhio:

1. ottimizzazione immagini;
2. riduzione duplicazione header/footer;
3. miglioramento accessibilità del menu;
4. arricchimento SEO base;
5. eventuale strutturazione più modulare se il sito cresce.

---

Questo file va trattato come **fonte di verità operativa** del progetto nella sua fase attuale. Se il sito cambia in modo significativo, aggiornare qui prima o insieme alle modifiche, così chi lavora dopo non deve fare detective work floreale da zero.
