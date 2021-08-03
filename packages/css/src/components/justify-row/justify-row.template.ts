import { JustifyRow } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { buttonTemplate } from '../button/button.template';

export function justifyRowTemplate({ label }: JustifyRow) {
  return html`
    <div class="dso-justify-row">
      <label class="dso-justify-row-label">
        ${label}
      </label>
      <div class="dso-justify-row-container">
        ${buttonTemplate({ url: '#', modifier: 'btn btn-tertiary', label: 'Versies', icon: { icon: 'chevron-down' } })}
      </div>
      <div class="row">
        <div class="col-xs-12">
          [..]
        </div>
      </div>
    </div>
  `;
}
