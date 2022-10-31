import { RowEqualHeights } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssRowEqualHeights: ComponentImplementation<RowEqualHeights<TemplateResult>> = {
  component: 'rowEqualHeights',
  implementation: 'css',
  template: () => function rowEqualHeightsTemplate({ children }) {
    return html`
      <div class="row dso-equal-heights">
        ${children}
      </div>
    `;
  }
};
