import { html } from "lit-html";
import { Templates } from "../../templates";

export function children({ anchorTemplate }: Templates) {
  return html`
    <div class="dso-rich-content">
      <h2>Samenspel tussen wetgever en ontwikkelaars</h2>
      <p>
        Het DSO wordt ontwikkeld door het programma
        ${anchorTemplate({
          label: "Aan de slag met de Omgevingswet",
          url: "https://aandeslagmetdeomgevingswet.nl/digitaal-stelsel/",
        })}
        in samenwerking met haar partners. De ontwikkeling vraagt een intensief samenspel tussen de wetgever en de
        ontwikkelpartners van het DSO. Enerzijds moeten wetgever en de ontwikkelpartners zorgen dat alles wat in de wet-
        en regelgeving wordt geregeld ook makkelijk toegankelijk is of kan worden. Anderzijds moeten zij zorgen dat
        alles wat digitaal wordt gerealiseerd, ook juridisch verankerd is of kan worden.
      </p>
    </div>
  `;
}
