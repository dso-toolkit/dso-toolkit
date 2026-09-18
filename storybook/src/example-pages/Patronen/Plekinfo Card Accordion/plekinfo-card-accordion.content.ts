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

// deleted state can also be shown with dso-renvooi (strikethrough on the text values) instead of the plain
// `wijzigactie` background; the plain variant is already demonstrated by deletedItemContent above.
const deletedItemContentRenvooi = html`
  <dso-plekinfo-card-item wijzigactie="verwijder" active>
    <span class="symboolcode" data-symboolcode="vszt030" slot="symbol"></span>
    <dso-renvooi slot="label" .value=${{ verwijderd: "vergunningplicht" }}></dso-renvooi>
    <dso-renvooi slot="sublabel" .value=${{ verwijderd: "in: bebouwde kom, industrie zone, dorpskern" }}></dso-renvooi>
    <div slot="meta"><dso-label status="warning" compact>Ontwerp</dso-label></div>
  </dso-plekinfo-card-item>
`;

export const plekinfoCardAccordionDemoCss = `
  .symboolcode {
    background-color: #fff;
    display: block;
    float: left;
    height: 20px;
    margin-block-start: 2px;
    width: 24px;
    overflow: hidden;
    position: relative;
  }

  .symboolcode[data-symboolcode="vgz023"] {
    background-image: url(images/rectangle2.png);
  }

  .symboolcode[data-symboolcode="vszt030"] {
    background-color: rgba(235, 225, 235, 0.5);
    border-width: 1px;
    border-color: #000001;
    border-style: solid;
  }
`;

function dsoToggleClick(e: CustomEvent<AccordionSectionToggleClickEvent>) {
  (e.target as HTMLDsoAccordionSectionElement).open = e.detail.open;
}

function dsoActiveChange(e: CustomEvent<AccordionSectionActiveChangeEvent>) {
  (e.target as HTMLDsoAccordionSectionElement).active = e.detail.next;
}

export const plekinfoCardAccordionSections: AccordionSection<TemplateResult>[] = [
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
