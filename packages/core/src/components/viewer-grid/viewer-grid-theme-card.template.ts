import { ViewerGridThemeCard } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { iconTemplate } from '../icon/icon.template';

export function viewerGridThemeCard({
  title,
  icon,
}: ViewerGridThemeCard<TemplateResult>) {
  return html`
    <a class="dso-theme-card" href="#">
      <div class="dso-theme-card-icon">
        ${iconTemplate(icon)}
      </div>
      <div class="dso-theme-card-title">${title}</div>
    </a>
  `;
}
