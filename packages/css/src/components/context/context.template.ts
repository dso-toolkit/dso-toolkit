import { Context } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { buttonTemplate } from '../button/button.template';

export function contextTemplate({ children, label, type }: Context) {
  return html`
    ${type == 'label'
      ? html`
        <div class="dso-context-wrapper">
          <span class="control-label dso-context-label">
            ${label}
          </span>
          <div class="dso-context-container">
            ${children}
            ${buttonTemplate({ url: '#', modifier: 'btn btn-tertiary', label: 'Versies', icon: { icon: 'chevron-down' } })}
          </div>
          <div class="row">
            <div class="col-xs-12">
              [..]
            </div>
          </div>
        </div>
      `
      : nothing
    }
    ${type == 'legend'
      ? html`
        <fieldset>
          <legend class="sr-only">
            ${label}
          </legend>
          <div class="dso-context-wrapper">
            <span class="control-label dso-context-label">
              ${label}
            </span>
            <div class="dso-context-container">
              ${children}
              ${buttonTemplate({ url: '#', modifier: 'btn btn-tertiary', label: 'Versies', icon: { icon: 'chevron-down' } })}
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              [..]
            </div>
          </div>
        </fieldset>
      `
      : nothing
    }
  `;
}
