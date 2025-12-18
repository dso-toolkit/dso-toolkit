import { html } from "lit-html";

import { Templates } from "../../templates";
import { defaultSymbol } from "../legend-item/legend-item.content";

export function legendaRichContent({ legendItemTemplate, richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      ${legendItemTemplate({
        content: html`<h3>Legenda</h3>`,
      })}
      ${legendItemTemplate({
        content: html` Document`,
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html` Gekozen locatie`,
        symbol: defaultSymbol,
      })}
      <hr />
      ${legendItemTemplate({
        content: html`<h3>Geselecteerde kenmerken</h3>`,
        options: html`<label>Zichtbaarheid</label><dso-input-range label="Transparantie" unit="%"></dso-input-range>`,
      })}
      ${legendItemTemplate({
        content: html`Acculader in werking`,
        activatable: true,
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html`Bomen kappen`,
        activatable: true,
        active: true,
        symbol: defaultSymbol,
      })}
    `,
  });
}

export function kaartlagenRichContent({ legendItemTemplate, richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      ${legendItemTemplate({
        content: html`<h3>Informatie</h3>`,
      })}
      ${legendItemTemplate({
        content: html`BAG panden`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`Kadastrale kaart`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`Gemeentegrenzen`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`Waterschapsgrenzen`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`Provinciegrenzen`,
        activatable: true,
        active: true,
        options: html`Content`,
      })}
      ${legendItemTemplate({
        content: html`Landgrenzen`,
        activatable: true,
        active: true,
        options: html`Content`,
      })}
      <hr />
      ${legendItemTemplate({
        content: html`<h3>Achtergrond</h3>`,
      })}
      ${legendItemTemplate({
        content: html`Topgrafie (BRT)`,
        activatable: true,
        active: true,
        options: html`<fieldset class="form-group dso-radios" aria-errormessage="mijn-id-error-text">
          <legend class="sr-only">Wijzig kaartlaag kleur</legend>
          <div class="dso-label-container">
            <span class="control-label" aria-hidden="true">Wijzig kaartlaag kleur</span>
          </div>
          <div class="dso-field-container">
            <dso-selectable type="radio" name="kaartlaag-kleur" checked identifier="1" value="kleur">
              Kleur
            </dso-selectable>
            <dso-selectable type="radio" name="kaartlaag-kleur" identifier="2" value="grijstinten">
              Grijstinten
            </dso-selectable>
            <dso-selectable type="radio" name="kaartlaag-kleur" identifier="3" value="opties-3">Pastel</dso-selectable>
          </div>
        </fieldset>`,
      })}
      ${legendItemTemplate({
        content: html`Grootschalige topgrafie (BGT)`,
        activatable: true,
        active: true,
      })}
      ${legendItemTemplate({
        content: html`Luchtfoto`,
        activatable: true,
      })}
    `,
  });
}
