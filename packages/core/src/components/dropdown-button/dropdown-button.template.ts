import { DropdownButton } from "@dso-toolkit/sources";
import { html } from "lit-html";

export function dropdownButtonTemplate({}: DropdownButton) {
  return html`
    <dso-dropdown-button>
      <button type="button" class="btn btn-default" slot="button">
        <span>Button</span>
      </button>
      <h2 class="dso-group-label">Versies</h2>
      <ul>
        <li>
          <a href="#">10.6.0</a>
        </li>
        <li>
          <a href="#">10.5.0</a>
        </li>
        <li>
          <a href="#">10.4.0</a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">master</a>
        </li>
      </ul>
      <h2 class="dso-group-label">Branch releases</h2>
      <ul>
        <li>
          <a href="#">#500-Margins-Testbuilds</a>
        </li>
        <li>
          <a href="#">#611-Pager-component-uitbreiden</a>
        </li>
        <li>
          <a href="#">#663-Dropdown-button-toegankelijk-maken</a>
        </li>
      </ul>
    </dso-dropdown-button>
  `;
}
