import { Alert, AlertWithHeadingsContent } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export function alertTemplate({ status, message, onClick, withRoleAlert }: Alert<TemplateResult>) {
  return html`
    <dso-alert status=${status} ?role-alert=${withRoleAlert}>
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
    </dso-alert>
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
