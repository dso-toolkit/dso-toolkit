import { AccordionSection, AccordionSectionActiveChangeEvent, AccordionSectionToggleClickEvent } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const defaultItemContent = html`
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

const addedItemContent = html`
  <dso-plekinfo-card-item wijzigactie="voegtoe" active>
    <span class="symboolcode" data-symboolcode="vszt030" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

const deletedItemContent = html`
  <dso-plekinfo-card-item wijzigactie="verwijder" active>
    <span class="symboolcode" data-symboolcode="vszt030" slot="symbol"></span>
    <span slot="label">vergunningplicht</span>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

const labelChangeItemContent = html`
  <dso-plekinfo-card-item>
    <span class="symboolcode" data-symboolcode="vgz023" slot="symbol"></span>
    <dso-renvooi slot="label" .value=${{ was: "vergunningplicht", wordt: "toegestaan" }}></dso-renvooi>
    <span slot="sublabel">in: bebouwde kom, industrie zone, dorpskern</span>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

const deletedItemContentRenvooi = html`
  <dso-plekinfo-card-item wijzigactie="verwijder" active>
    <span class="symboolcode" data-symboolcode="vszt030" slot="symbol"></span>
    <dso-renvooi slot="label" .value=${{ verwijderd: "vergunningplicht" }}></dso-renvooi>
    <dso-renvooi slot="sublabel" .value=${{ verwijderd: "in: bebouwde kom, industrie zone, dorpskern" }}></dso-renvooi>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

function dsoToggleClick(e: CustomEvent<AccordionSectionToggleClickEvent>) {
  if (e.target instanceof HTMLElement) {
    (e.target as HTMLDsoAccordionSectionElement).open = e.detail.open;
  }
}

function dsoActiveChange(e: CustomEvent<AccordionSectionActiveChangeEvent>) {
  if (e.target instanceof HTMLElement) {
    (e.target as HTMLDsoAccordionSectionElement).active = e.detail.next;
  }
}

export const plekinfoCardInAccordionSections: AccordionSection<TemplateResult>[] = [
  {
    handleTitle: "bijbehorend bouwwerk bouwen",
    heading: "h2",
    open: true,
    activatable: true,
    active: false,
    dsoToggleClick,
    dsoActiveChange,
    content: html`${defaultItemContent}${deletedItemContent}`,
  },
  {
    handleTitle: "bouwactiviteit",
    heading: "h2",
    open: true,
    activatable: true,
    active: false,
    dsoToggleClick,
    dsoActiveChange,
    content: html`${addedItemContent}${labelChangeItemContent}${deletedItemContentRenvooi}`,
  },
];
