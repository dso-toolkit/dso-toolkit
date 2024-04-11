import { html } from "lit-html";

export const defaultLabel = html`<span id="legenda-item-label">Legenda item label</span>`;

export const defaultSymbol = html`<span class="symboolcode" data-symboolcode="regelingsgebied"></span>`;

export const selectable = html`<dso-selectable id="1" type="checkbox" disabvalue="1"
  >Legenda item label</dso-selectable
>`;

export const bodyWithSelectables = html`<fieldset>
  <legend>Wijzig eigenschap</legend>
  <div>
    <dso-selectable id="waarde1" type="radio" name="eigenschap" value="waarde1">Waarde één</dso-selectable>
    <dso-selectable id="waarde2" type="radio" name="eigenschap" value="waarde2">Waarde twee</dso-selectable>
    <dso-selectable id="waarde3" type="radio" name="eigenschap" value="waarde3">Waarde drie</dso-selectable>
  </div>
</fieldset>`;

export const bodyWithInputRange = html`<dso-input-range
  label="label"
  unit="%"
  description="description"
></dso-input-range>`;
