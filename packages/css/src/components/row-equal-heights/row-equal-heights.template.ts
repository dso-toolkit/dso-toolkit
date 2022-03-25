import { RowEqualHeights } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function rowEqualHeightsTemplate({ children }: RowEqualHeights<TemplateResult>) {
  return html`
    <div class="row dso-equal-heights">
      ${children}
    </div>
  `;
}
