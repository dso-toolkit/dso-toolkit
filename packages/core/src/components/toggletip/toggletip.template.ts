import { Toggletip } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function toggletipTemplate({}: Toggletip) {
  return html`
    <dso-toggletip>
      <div class="dso-rich-content">
        <h2>Test</h2>
        <p>Hoi</p>
      </div>
    </dso-toggletip>
  `;
}
