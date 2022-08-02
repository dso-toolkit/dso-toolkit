import { Form } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { formGroupTemplate } from './form-group.template';

export function formTemplate({ legend, legendHeading, mode, formGroups }: Form<TemplateResult>) {
  return html`
    <form class=${ifDefined(mode === 'horizontal' ? 'form-horizontal' : undefined)}>
      <fieldset>
        <legend>
          ${
            legendHeading === 'h1' // if
            ? html`<h1>${legend}</h1>`
            : legendHeading === 'h2' // else if
            ? html`<h2>${legend}</h2>`
            : legendHeading === 'h3' // else if
            ? html`<h3>${legend}</h3>`
            : legendHeading === 'h4' // else if
            ? html`<h4>${legend}</h4>`
            : legendHeading === 'h5' // else if
            ? html`<h5>${legend}</h5>`
            : legendHeading === 'h6' // else if
            ? html`<h6>${legend}</h6>`
            : html`${legend}`
          }
        </legend>
        ${'_$litType$' in formGroups ? formGroups : formGroups.map(formGroup => formGroupTemplate(formGroup))}
      </fieldset>
    </form>
  `;
}
