import { HelpcenterPanel } from "@dso-toolkit/sources";
import { html } from "lit-html";

export function helpcenterPanelTemplate({ label, url }: HelpcenterPanel) {
  return html`<dso-helpcenter-panel label=${label} url=${url} />`;
}
