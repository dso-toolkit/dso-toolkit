import { ExpandableHeading } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { Templates } from "../../templates";

export const annotationContent = html`<p>Gebruik de volgende bestandsformaten voor een document:</p>
  <ul>
    <li>Foto's en gescande documenten: PNG, TIFF</li>
    <li>Digitale documenten: ODT1.2, PDF/A-1, PDF/A-2</li>
    <li>Tekeningen: PDF/A-2, 5VG</li>
    <li>Spreadsheet: [SV, 0E1512, PDF/A</li>
  </ul>`;

export const annotationHeader = html`<h3 slot="title">Annotaties</h3>`;

export const annotationAddons = html`<div slot="addons" class="dso-selectable">
  <input type="checkbox" id="ca8ecb1d-56b4-4dc9-b64a-726277104732" value="Akkoord" />
  <label for="ca8ecb1d-56b4-4dc9-b64a-726277104732">Toon uitgebreide weergave</label>
</div>`;

export const nestedExpandableHeading = html`<p>genest!</p>`;

export function defaultExpandableHeaderContent({
  anchorTemplate,
  annotationOutputTemplate,
  expandableHeadingTemplate,
}: Templates) {
  return html`
    ${annotationOutputTemplate({
      identifier: "testidentifier",
      content: annotationContent,
      title: annotationHeader,
      addons: annotationAddons,
    })}
    <p>
      Dit is de content van een uitklapbare titel. Deze kan vrij ingevuld worden met rich content.
      ${anchorTemplate({ label: "Bijvoorbeeld", url: "#", modifier: "extern" })} externe links.
    </p>
    ${expandableHeadingTemplate({ content: nestedExpandableHeading })}
  `;
}

export function expandableHeaderContent({
  anchorTemplate,
  annotationOutputTemplate,
  expandableHeadingTemplate,
}: Templates) {
  return html`
    ${annotationOutputTemplate({
      identifier: "testidentifier",
      content: annotationContent,
      title: annotationHeader,
      addons: annotationAddons,
    })}
    <p>
      Dit is de content van een uitklapbare titel. Deze kan vrij ingevuld worden met rich content.
      ${anchorTemplate({ label: "Bijvoorbeeld", url: "#", modifier: "extern" })} externe links.
    </p>
    ${expandableHeadingTemplate({ content: nestedExpandableHeading })}
  `;
}

// export interface ExpandableHeading<> {
//   title:
// }

export function expandableHeaderDemoTemplate(
  headings: ExpandableHeading<TemplateResult>[],
  { expandableHeaderTemplate }: Templates
) {
  return html``;
}

const expandableHeadings: ExpandableHeading<TemplateResult>[] = [
  {
    title: ({ ozonContentTemplate }: Templates) =>
      ozonContentTemplate({
        slotName: "title",
        content:
          "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns5='http://www.opengis.net/se' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns7='http://www.opengis.net/ogc' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:ns9='http://www.w3.org/2001/SMIL20/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'>Toepassingsbereik</Opschrift>",
        dsoAnchorClick: () => void 0,
        dsoClick: () => void 0,
        prefix: "Artikel 1.1 ",
        inline: true,
      }),
    content: ({ anchorTemplate, annotationOutputTemplate, expandableHeadingTemplate }: Templates) => html`
      ${annotationOutputTemplate({
        identifier: "testidentifier",
        content: annotationContent,
        title: annotationHeader,
        addons: annotationAddons,
      })}
      <p>
        Dit is de content van een uitklapbare titel. Deze kan vrij ingevuld worden met rich content.
        ${anchorTemplate({ label: "Bijvoorbeeld", url: "#", modifier: "extern" })} externe links.
      </p>
      ${expandableHeadingTemplate({ content: nestedExpandableHeading })}
    `,
  },
];
