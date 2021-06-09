import { Alert, AlertWithHeadingsContent } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// Todo: Move to @dso-toolkit/sources ?
const statusMap = new Map<string, string>([
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);

export function alertTemplate({ status, message, onClick, withRoleAlert }: Alert<TemplateResult>) {
  return html`
    <div class="alert alert-${status}" role="${ifDefined(withRoleAlert ? 'alert' : undefined)}">
      <span class="sr-only">${statusMap.get(status)}:</span>
      <div class="dso-rich-content">
        ${typeof message === 'string'
          ? html`
            <p>${unsafeHTML(message)}</p>
          `
          : message
        }
        ${onClick
          ? html`
              <button type="button" class="btn" @click=${onClick}>Button</button>
            `
          : nothing
        }
      </div>
    </div>
  `;
}

export function alertWithHeadingsTemplate({
  h2,
  h3,
  h4,
  h5,
  h6,
  content
}: AlertWithHeadingsContent) {
  return html`
    <h2>${h2}</h2>
    <p>${content}</p>
    <h3>${h3}</h3>
    <p>${content}</p>
    <h4>${h4}</h4>
    <p>${content}</p>
    <h5>${h5}</h5>
    <p>${content}</p>
    <h6>${h6}</h6>
    <p>${content}</p>
  `;
}
