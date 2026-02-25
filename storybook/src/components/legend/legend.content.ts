import { type LegendArgs, type LegendGroup, type LegendItem } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

const defaultSymbol = html`<span class="symboolcode" data-symboolcode="regelingsgebied"></span>`;

const legendGroupTemplate = (p: LegendGroup<TemplateResult>) =>
  html`<dso-legend-group .mode=${ifDefined(p.mode)} @dsoLegendGroupModeChange=${ifDefined(p.dsoLegendGroupModeChange)}>
    ${p.heading || nothing} ${p.options ? html`<div slot="options">${p.options}</div>` : nothing}
    ${p.children || nothing}
  </dso-legend-group>`;

const legendItemTemplate = (p: LegendItem<TemplateResult>) =>
  html`<dso-legend-item
    .disabled=${p.disabled}
    .disabledMessage=${ifDefined(p.disabledMessage)}
    @dsoMouseEnter=${ifDefined(p.dsoMouseEnter)}
    @dsoMouseLeave=${ifDefined(p.dsoMouseLeave)}
    @dsoActiveChange=${ifDefined(p.dsoActiveChange)}
    @dsoDelete=${ifDefined(p.dsoDelete)}
    .active=${p.active}
    .activatable=${p.activatable}
  >
    ${p.symbol ? html`<span slot="symbol">${p.symbol}</span>` : nothing} ${p.content}
    ${p.options ? html`<div slot="options">${p.options}</div>` : nothing}
  </dso-legend-item>`;

const zichtbaarheidOption = html`<label>Zichtbaarheid</label
  ><dso-input-range label="Transparantie" unit="%"></dso-input-range>`;

const wijzigKaartLaagOption = html`<fieldset class="form-group dso-radios" aria-errormessage="mijn-id-error-text">
  <legend class="sr-only">Wijzig kaartlaag kleur</legend>
  <div class="dso-label-container">
    <span class="control-label" aria-hidden="true">Wijzig kaartlaag kleur</span>
  </div>
  <div class="dso-field-container">
    <dso-selectable type="radio" name="kaartlaag-kleur" checked identifier="1" value="kleur"> Kleur </dso-selectable>
    <dso-selectable type="radio" name="kaartlaag-kleur" identifier="2" value="grijstinten">
      Grijstinten
    </dso-selectable>
    <dso-selectable type="radio" name="kaartlaag-kleur" identifier="3" value="opties-3">Pastel</dso-selectable>
  </div>
</fieldset>`;

export function legendaRichContent(args: LegendArgs) {
  const modeChangeHandler = (e: CustomEvent) => args.dsoLegendGroupModeChange(e.detail);
  const deleteHandler = (e: CustomEvent) => args.dsoDelete(e.detail);

  return html`${legendGroupTemplate({
      heading: html`<h3 slot="heading">Legenda</h3>`,
      children: html`${legendItemTemplate({
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
      mode: args.mode,
      dsoLegendGroupModeChange: modeChangeHandler,
      heading: html`<h3 slot="heading">Geselecteerde kenmerken</h3>`,
      options: zichtbaarheidOption,
      children: html` ${legendItemTemplate({
        content: html`<span slot="label">Acculader in werking</span>`,
        activatable: true,
        symbol: defaultSymbol,
        dsoDelete: deleteHandler,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Bomen kappen</span>`,
        activatable: true,
        active: true,
        symbol: defaultSymbol,
        dsoDelete: deleteHandler,
      })}`,
    })}`;
}

export function kaartlagenRichContent(args: LegendArgs) {
  return html`${legendGroupTemplate({
      heading: html`<h3 slot="heading">Informatie</h3>`,
      children: html`${legendItemTemplate({
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
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Landgrenzen</span>`,
        activatable: true,
      })}`,
    })}
    <hr />
    ${legendGroupTemplate({
      heading: html`<h3 slot="heading">Achtergrond</h3>`,
      children: html`${legendItemTemplate({
        content: html`<span slot="label">${args.label}</span>`,
        activatable: args.activatable,
        active: args.active,
        disabled: args.disabled,
        disabledMessage: args.disabledMessage || undefined,
        options: wijzigKaartLaagOption,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Grootschalige topografie (BGT)</span>`,
        activatable: true,
        active: true,
        options: wijzigKaartLaagOption,
      })}
      ${legendItemTemplate({
        content: html`<span slot="label">Luchtfoto</span>`,
        activatable: true,
      })}`,
    })}`;
}
