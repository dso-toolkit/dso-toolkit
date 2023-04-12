import { Header } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { Templates } from "../../templates";
import { breadcrumbs } from "./header.content";

export function headerPartial(
  { headerTemplate, breadcrumbsTemplate }: Templates,
  header: Header,
  showBreadcrumbs = false
) {
  return html`<header>
    ${headerTemplate(header)} ${showBreadcrumbs ? breadcrumbsTemplate(breadcrumbs) : nothing}
  </header>`;
}
