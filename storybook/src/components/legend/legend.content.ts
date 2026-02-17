import { type LegendGroup, type LegendItem, type LegendMode } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Templates } from "../../templates";

const defaultSymbol = html`<span class="symboolcode" data-symboolcode="regelingsgebied"></span>`;

const legendGroup = (p: LegendGroup<TemplateResult>) =>
  html`<dso-legend-group mode=${ifDefined(p.mode)} @dsoLegendGroupModeChange=${ifDefined(p.dsoLegendGroupModeChange)}>
    ${p.heading || nothing} ${p.children || nothing}
  </dso-legend-group>`;

const legendItem = (p: LegendItem<TemplateResult>) =>
  html`<dso-legend-item
    ?disabled=${p.disabled}
    .disabledMessage=${ifDefined(p.disabledMessage)}
    @dsoMouseEnter=${ifDefined(p.dsoMouseEnter)}
    @dsoMouseLeave=${ifDefined(p.dsoMouseLeave)}
    @dsoActiveChange=${ifDefined(p.dsoActiveChange)}
    @dsoDelete=${ifDefined(p.dsoDelete)}
    .active=${p.active}
    .activatable=${p.activatable}
    .mode=${ifDefined(p.mode)}
  >
    ${p.symbol ? html`<span slot="symbol">${p.symbol}</span>` : nothing} ${p.content}
    ${p.options ? html`<div slot="options">${p.options}</div>` : nothing}
  </dso-legend-item>`;

export function legendaRichContent(
  { inputRangeTemplate }: Templates,
  mode: LegendMode,
  dsoLegendGroupModeChange?: (e: CustomEvent) => void,
  dsoDelete?: (e: CustomEvent) => void,
) {
  const optionsWithInputRange = inputRangeTemplate({ label: "Transparantie", unit: "%" });

  return html`${legendGroup({
      heading: html`<h3 slot="heading">Legenda</h3>`,
      children: html`${legendItem({
        content: html`<span slot="label">Document</span>`,
        symbol: defaultSymbol,
      })}
      ${legendItem({
        content: html`<span slot="label">Gekozen locatie</span>`,
        symbol: defaultSymbol,
      })}`,
    })}
    <hr />
    ${legendGroup({
      mode,
      dsoLegendGroupModeChange,
      heading: html`<h3 slot="heading">Geselecteerde kenmerken</h3>`,
      children: html`${legendItem({
        content: html`<span slot="label">Acculader in werking</span>`,
        activatable: true,
        symbol: defaultSymbol,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Bomen kappen</span>`,
        activatable: true,
        active: true,
        symbol: defaultSymbol,
        options: optionsWithInputRange,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Niet activeerbaar</span>`,
        activatable: false,
        symbol: defaultSymbol,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Alleen symbool</span>`,
        activatable: false,
        symbol: defaultSymbol,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Uitgeschakeld</span>`,
        activatable: true,
        disabled: true,
        disabledMessage: "Dit item is uitgeschakeld",
        symbol: defaultSymbol,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Zonder symbool</span>`,
        activatable: true,
        active: true,
        dsoDelete,
      })}`,
    })}`;
}

export function kaartlagenRichContent(
  { infoButtonTemplate }: Templates,
  mode: LegendMode,
  dsoLegendGroupModeChange?: (e: CustomEvent) => void,
  dsoDelete?: (e: CustomEvent) => void,
) {
  return html`${legendGroup({
      mode,
      dsoLegendGroupModeChange,
      heading: html`<h3 slot="heading">Informatie</h3>`,
      children: html`${legendItem({
        content: html`<span slot="label">BAG panden</span>`,
        activatable: true,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Kadastrale kaart</span>`,
        activatable: true,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Gemeentegrenzen</span>`,
        activatable: true,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Waterschapsgrenzen</span>`,
        activatable: true,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Provinciegrenzen</span>`,
        activatable: true,
        active: true,
        dsoDelete,
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
      ${legendItem({
        content: html`<span slot="label">Landgrenzen</span>`,
        activatable: true,
        active: true,
        dsoDelete,
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
    ${legendGroup({
      mode,
      dsoLegendGroupModeChange,
      heading: html`<h3 slot="heading">Achtergrond</h3>`,
      children: html`${legendItem({
        content: html`<span slot="label">Topgrafie (BRT)</span>`,
        activatable: true,
        active: true,
        dsoDelete,
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
      ${legendItem({
        content: html`<span slot="label">
          Grootschalige topgrafie (BGT)
          ${infoButtonTemplate({
            label: "Begeleidende tekst met lange content",
            children: "Een info-button bij de banner met lange content",
          })}
        </span>`,
        activatable: true,
        active: true,
        dsoDelete,
      })}
      ${legendItem({
        content: html`<span slot="label">Luchtfoto</span>`,
        activatable: true,
        dsoDelete,
      })}`,
    })}`;
}
