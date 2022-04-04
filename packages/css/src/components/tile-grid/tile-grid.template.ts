import {  TileGrid } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function tileGridTemplate({ children }: TileGrid<TemplateResult>) {
  return html`
    <div class="dso-tile-grid">
      ${children}
    </div>
  `;
}
