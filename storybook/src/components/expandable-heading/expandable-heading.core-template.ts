import { ExpandableHeading } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
// import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

const ozonContent =
  "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns5='http://www.opengis.net/se' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns7='http://www.opengis.net/ogc' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:ns9='http://www.w3.org/2001/SMIL20/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'>Toepassingsbereik</Opschrift>";

// /** Template is used to demo a list of expandable headings */
// export const coreDemoExpandableHeading: ComponentImplementation<ExpandableHeading<TemplateResult>> = {

// };

export const coreExpandableHeading: ComponentImplementation<ExpandableHeading<TemplateResult>> = {
  component: "expandableHeading",
  implementation: "core",
  template: ({ annotationButtonTemplate, labelTemplate, ozonContentTemplate }) =>
    function expandableHeadingTemplate({ content }) {
      return html`<dso-expandable-heading>
        ${ozonContentTemplate({
          slotName: "title",
          content: ozonContent,
          dsoAnchorClick: () => void 0,
          dsoClick: () => void 0,
          prefix: "Artikel 2.1 ",
          inline: true,
        })}
        ${labelTemplate({ slotName: "addons-start", label: "een label", status: "danger" })}
        ${annotationButtonTemplate({ slotName: "addons-end", identifier: "testidentifier" })} ${content}
      </dso-expandable-heading>`;
    },
};
