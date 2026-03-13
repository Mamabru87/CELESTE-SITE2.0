# CÉLESTE — JS e interazioni

Verificato su `js/main.js` il **2026-03-13**.

## File unico

Tutta la logica interattiva del sito vive in:

- `js/main.js`

Lo script parte su `DOMContentLoaded`.

## 1. Menu toggle

Elementi attesi:

- `#menuToggle`
- `#dropdown`

Comportamento attuale:

- click su `Menù` → toggle classe `open` sul dropdown;
- click su qualunque link del dropdown → chiusura menu.

Limiti attuali:

- non gestisce `Esc`;
- non aggiorna `aria-expanded`;
- non usa `aria-controls`;
- non gestisce focus trapping.

## 2. Toggle taglia/prezzo

Elementi attesi:

- `.size-toggle`
- dataset `data-size`
- dataset `data-price`

Etichetta iniziale:

- viene salvata in `data-label` all'avvio.

### Desktop

Se il device supporta hover fine:

- `mouseenter` → mostra il prezzo;
- `mouseleave` → ripristina il nome della taglia.

### Mobile / touch

Se hover fine non è disponibile:

- click su una taglia → mostra il prezzo di quella taglia;
- click sulla stessa taglia già aperta → ripristina il nome;
- click su una taglia diversa → reset delle altre e apertura della nuova.

## 3. `applyFillBox()`

Funzione centrale del sito.

Flusso:

1. trova ogni `.fill-box`;
2. cerca la riga `.fill-box__ref`;
3. misura la `scrollWidth` del riferimento;
4. ricalcola il `letter-spacing` degli elementi `.fill-box__fit`;
5. applica lo stesso adattamento anche al riferimento per allineare i `:` sul bordo destro.

Dettaglio importante:

- il calcolo viene rifatto dopo il caricamento dei font con `document.fonts.ready`;
- viene rifatto anche dopo hover/click delle taglie;
- viene rifatto al resize con debounce di `150ms`.

## 4. Codice inattivo ma presente

Nel file esiste logica per un accordion:

- `#comeFunziona`
- `#comeFunzionaContent`

Verifica effettuata:

- questi ID **non compaiono nel markup HTML attuale**;
- la logica è quindi inattiva ma pronta per eventuale riuso futuro.

## 5. Dipendenze implicite da ricordare

- il menu dipende da ID hardcoded;
- il toggle taglie dipende dalla classe `.size-toggle` e dal wrapper `.dettaglio__sizes`;
- `fill-box` dipende dalla struttura HTML, non solo dal CSS.

## Mini checklist quando si tocca il JS

- [ ] il menu apre/chiude ancora?
- [ ] i link del dropdown lo richiudono?
- [ ] su desktop il prezzo appare in hover?
- [ ] su mobile/touch il click alterna correttamente nome/prezzo?
- [ ] il `fill-box` viene ricalcolato dopo il cambio testo?
- [ ] il resize non rompe gli allineamenti?

## Quando allegare questo file

Allega `docs/04-js-e-interazioni.md` quando la richiesta riguarda:

- menu a tendina;
- interazioni hover/click;
- taglie e prezzi;
- `fill-box` lato JS;
- comportamento responsive delle interazioni;
- pulizia o refactor di `main.js`.
