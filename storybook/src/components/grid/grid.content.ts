import { html } from "lit-html";

export function mainColumnContent() {
  return html`<p>
    Deze kolom heeft de classes <code>col-xs-12 col-sm-8</code>. Zet <code>overlay</code> aan op de Grid Column ernaast,
    dan valt die kolom vanaf de sm-breakpoint over deze kolom heen.
  </p>`;
}

export function gridColumnContent() {
  return html`<p>Deze kolom is een <code>dso-grid-column</code> met <code>columns="xs-12 sm-4"</code>.</p>`;
}
