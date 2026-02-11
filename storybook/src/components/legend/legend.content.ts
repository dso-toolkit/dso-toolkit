import { LegendMode } from "dso-toolkit";
import { html } from "lit-html";

import { Templates } from "../../templates";
import { defaultSymbol } from "./legend-item/legend-item.content";

export function legendaRichContent(
  { legendItemTemplate, legendGroupTemplate, inputRangeTemplate }: Templates,
  mode: LegendMode,
) {
  const optionsWithInputRange = inputRangeTemplate({ label: "Transparantie", unit: "%" });

  return html`${legendGroupTemplate({
    heading: html`<h3 slot="heading">Legenda</h3>`,
    children: html`
      ${legendItemTemplate({
        content: html`<span slot="label">Document</span>`,
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Gekozen locatie</span>`,
        symbol: defaultSymbol,
      })}`,
  })}
  <hr />
  ${legendGroupTemplate({
    mode,
    heading: html`<h3 slot="heading">Geselecteerde kenmerken</h3>`,
    children: html`
      ${legendItemTemplate({
        content: html`<span slot="label">Acculader in werking</span>`,
        activatable: true,
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Bomen kappen</span>`,
        activatable: true,
        active: true,
        symbol: defaultSymbol,
        options: optionsWithInputRange,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Niet activeerbaar</span>`,
        activatable: false,
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Alleen symbool</span>`,
        activatable: false,
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Uitgeschakeld</span>`,
        activatable: true,
        disabled: true,
        disabledMessage: "Dit item is uitgeschakeld",
        symbol: defaultSymbol,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Zonder symbool</span>`,
        activatable: true,
        active: true,
      })}`,
  })}`;
}

export function kaartlagenRichContent(
  { legendItemTemplate, legendGroupTemplate, infoButtonTemplate }: Templates,
  mode: LegendMode,
) {
  return html`${legendGroupTemplate({
    mode,
    heading: html`<h3 slot="heading">Informatie</h3>`,
    children: html`
      ${legendItemTemplate({
        content: html`<span slot="label">BAG panden</span>`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Kadastrale kaart</span>`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Gemeentegrenzen</span>`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Waterschapsgrenzen</span>`,
        activatable: true,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Provinciegrenzen</span>`,
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
        content: html`<span slot="label">Landgrenzen</span>`,
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
      })}`,
  })}
  <hr />
  ${legendGroupTemplate({
    mode,
    heading: html`<h3 slot="heading">Achtergrond</h3>`,
    children: html`
      ${legendItemTemplate({
        content: html`<span slot="label">Topgrafie (BRT)</span>`,
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
        content: html`<span slot="label">
          Grootschalige topgrafie (BGT)
          ${infoButtonTemplate({
            label: "Begeleidende tekst met lange content",
            children: "Een toggletip bij de banner met lange content",
          })}
        </span>`,
        activatable: true,
        active: true,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Luchtfoto</span>`,
        activatable: true,
      })}`,
  })}`;
}
