import { html, nothing } from "lit-html";

import { breadcrumbsTemplate } from "../../components/breadcrumbs/breadcrumbs.template.js";
import type { Header } from "../../components/header/header.models.js";
import { headerTemplate } from "../../components/header/header.template.js";
import { breadcrumbs } from "../content/header.content.js";

export function headerPartial(header: Header, showBreadcrumbs = false) {
  return html`<header>
    ${headerTemplate(header)} ${showBreadcrumbs ? breadcrumbsTemplate(breadcrumbs) : nothing}
  </header>`;
}
