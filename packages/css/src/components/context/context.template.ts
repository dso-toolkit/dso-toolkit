import { Context } from '@dso-toolkit/sources';

import { html, TemplateResult } from 'lit-html';

function contextLabelTemplate(label: TemplateResult, content: TemplateResult, children: TemplateResult) {
  return html`
    <div class="dso-context-wrapper">
      <span class="control-label dso-context-label">
        ${label}
      </span>
      <div class="dso-context-container">
        ${content}
      </div>
      ${children}
    </div>
  `;
}

function contextFieldsetTemplate(label: TemplateResult, content: TemplateResult, children: TemplateResult) {
  return html`
    <fieldset class="dso-context-wrapper">
      <legend class="control-label dso-context-label">
        ${label}
      </legend>
      <div class="dso-context-container">
        ${content}
      </div>
      ${children}
    </div>
  `;
}

export function contextTemplate({ label, type, content, children }: Context<TemplateResult>) {
  switch (type) {
    case 'label':
      return contextLabelTemplate(label, content, children);
    case 'legend':
      return contextFieldsetTemplate(label, content, children);
    default:
      throw new TypeError('type can only be label or legend');
  }
}
