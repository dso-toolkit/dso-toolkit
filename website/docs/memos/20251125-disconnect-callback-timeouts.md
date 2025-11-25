# Timeouts en intervals in stencil componenten

## Probleem
Wanneer een Stencil-component gebruikmaakt van setTimeout of setInterval, worden deze timers gestart en blijven ze actief totdat ze expliciet worden gestopt. Als de component echter uit de DOM wordt verwijderd (bijvoorbeeld door navigatie naar een andere pagina of het conditioneel verbergen van de component), worden deze timers niet automatisch opgeruimd.

Dit kan leiden tot een aantal ongewenste situaties:

1. **Fouten bij state updates:** De timer kan nog steeds proberen om @State-properties of andere interne component-data bij te werken. Omdat de component niet langer bestaat, resulteert dit in runtime-fouten of waarschuwingen.
2. **Geheugenlekken:** Timers die blijven lopen houden een referentie naar de component vast in het geheugen. Hierdoor wordt de component niet correct verwijderd door de garbage collector, wat op langere termijn kan leiden tot geheugenlekken. 
3. **Onverwachte bijwerkingen:** Actieve timers kunnen functionaliteit blijven uitvoeren die niet meer relevant is, zoals het triggeren van events of het aanpassen van de UI, wat kan leiden tot onvoorspelbaar gedrag in de applicatie.

## Oplossing
Gebruik de Stencil lifecycle hook `disconnectedCallback` om timers op te ruimen bij het verwijderen van de component.

---

## Voorbeeld in de praktijk

```ts
import { Component, h, State } from "@stencil/core";

@Component({
  tag: "my-timer",
  shadow: true,
})
export class MyTimer {
  private timeoutId?: number;

  @State() message = "Wachten...";

  componentDidLoad() {
    // Start de timeout
    this.timeoutId = window.setTimeout(() => {
      this.message = "Timeout voltooid!";
    }, 2000);
  }

  disconnectedCallback() {
    // Clear de timeout bij disconnect
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  render() {
    return <div>{this.message}</div>;
  }
}
```

## Belangrijke tips

- Altijd timers en intervals opruimen om:
  - fouten bij state updates op niet-bestaande componenten te voorkomen
  - onnodige CPU-belasting te vermijden
  - mogelijke geheugenlekken bij complexe componenten te voorkomen 
- Documenteer bij complexe components welke timers/intervals er lopen en waar ze worden gecleared.
- Overweeg helper-functies om cleanup overzichtelijk te houden als er veel async logica is.