import { html } from "lit-html";

export const defaultSymbol = html`<span class="symboolcode" data-symboolcode="vszt030"></span>`;

export const WithItemsContent = html`
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
  </dso-plekinfo-card-item>
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <span slot="label">toegestaan</span>
    <span slot="sublabel">in: ontwikkelzone</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <span slot="label">verbod</span>
    <span slot="sublabel">in: buitengebied</span>
  </dso-plekinfo-card-item>
`;
