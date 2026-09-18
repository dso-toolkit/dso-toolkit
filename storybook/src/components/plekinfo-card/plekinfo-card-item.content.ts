import { html } from "lit-html";

export const defaultSymbol = html`<span class="symboolcode" data-symboolcode="vszt030"></span>`;

export const defaultItemContent = html`
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

export const addedItemContent = html`
  <dso-plekinfo-card-item wijzigactie="voegtoe" active>
    <span class="symboolcode" data-symboolcode="vszt030" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

export const deletedItemContent = html`
  <dso-plekinfo-card-item wijzigactie="verwijder" active>
    <span class="symboolcode" data-symboolcode="vszt030" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

export const labelChangeItemContent = html`
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <dso-renvooi slot="label" .value=${{ was: "vergunningplicht", wordt: "toegestaan" }}></dso-renvooi>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

export const sublistContent = html`
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
