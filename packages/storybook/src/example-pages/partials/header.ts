import { Header } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { Templates } from "../../templates";
import { breadcrumbs } from "./header.content";

export function headerPartial({ headerTemplate, breadcrumbsTemplate }: Templates, header: Header) {
  return html`<header>${headerTemplate(header)} ${breadcrumbsTemplate(breadcrumbs)}</header>`;
}
