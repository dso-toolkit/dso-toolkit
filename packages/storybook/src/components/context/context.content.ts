import { html } from "lit-html";

export const content = html`
  <div class="dso-context-select">
    <label for="sorting-select">Sorteer op:</label>
    <select id="sorting-select">
      <option value="most-chosen">Meest gekozen</option>
      <option value="alphabetic" selected>Alfabetisch</option>
    </select>
  </div>
`;

export const children = html`
  <div class="row">
    <div class="col-xs-12">[..]</div>
  </div>
`;

export const label = html` <h4>5 activiteiten</h4> `;
