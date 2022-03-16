import { ViewerGridThemeTile } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { iconTemplate } from '../icon/icon.template';

export function viewerGridThemeTile({
  title,
  icon,
}: ViewerGridThemeTile<TemplateResult>) {
  return html`
    <a class="dso-theme-tile" href="#">
      <div class="dso-theme-tile-icon">
        ${iconTemplate(icon)}
      </div>
      <div class="dso-theme-tile-title">${title}</div>
    </a>
  `;
}
