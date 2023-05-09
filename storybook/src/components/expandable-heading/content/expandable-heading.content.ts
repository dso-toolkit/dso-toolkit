import { ExpandableHeading } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { Templates } from "../../../templates";

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

export function expandandableHeadingDemoContent({ ozonContentTemplate }: Templates) {
  return ozonContentTemplate({
    content: `
      <Inhoud
        xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'
        xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12'
        xmlns:data='https://standaarden.overheid.nl/stop/imop/data/'
        xmlns:ns10='http://www.w3.org/2001/SMIL20/Language'
        xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/'
        xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'
        xmlns:ns5='http://www.opengis.net/se'
        xmlns:ns6='http://www.w3.org/1999/xlink'
        xmlns:ns7='http://www.opengis.net/ogc'
        xmlns:ns8='http://www.opengis.net/gml'
        xmlns:ns9='http://www.w3.org/2001/SMIL20/'
      >
        <Al>Begripsbepalingen die zijn opgenomen in de bijlage bij de Omgevingswet en in bijlage I bij het Besluit activiteiten leefomgeving, bijlage I bij het Besluit bouwwerken leefomgeving, bijlage I bij het Omgevingsbesluit en bijlage I bij de Omgevingsregeling, zijn van overeenkomstige toepassing op dit omgevingsplan, tenzij in artikel <IntRef ref='chp_1__art_1.2'>1.2</IntRef> daarvan is afgeweken.</Al>
      </Inhoud>
    `,
    dsoAnchorClick: () => void 0,
    dsoClick: () => void 0,
  });
}

export function parentExpandableHeadingContent(
  { annotationOutputTemplate, expandableHeadingTemplate, ozonContentTemplate }: Templates,
  nestedExpandableHeadings?: ExpandableHeading<TemplateResult>[]
) {
  return html`
    ${annotationOutputTemplate({
      identifier: "annotatie-id",
      content: annotationContent,
      title: annotationHeader,
      addons: annotationAddons,
    })}
    ${ozonContentTemplate({
      content: `
        <Inhoud
          xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'
          xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12'
          xmlns:data='https://standaarden.overheid.nl/stop/imop/data/'
          xmlns:ns10='http://www.w3.org/2001/SMIL20/Language'
          xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/'
          xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'
          xmlns:ns5='http://www.opengis.net/se'
          xmlns:ns6='http://www.w3.org/1999/xlink'
          xmlns:ns7='http://www.opengis.net/ogc'
          xmlns:ns8='http://www.opengis.net/gml'
          xmlns:ns9='http://www.w3.org/2001/SMIL20/'
        >
          <Al>Het is verboden gronden of bouwwerken te gebruiken op een wijze die niet in overeenstemming is met een in afdeling <IntRef ref='chp_2__subchp_2.3'>2.3</IntRef> aan een locatie gegeven gebruiksdoel en de daarop betrekking hebbende regels, of op een wijze die in strijd is met de regels over gebruik, bedoeld in afdeling <IntRef ref='chp_2__subchp_2.3'>2.3</IntRef>.</Al>
        </Inhoud>`,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
    })}
    ${nestedExpandableHeadings &&
    nestedExpandableHeadings.map((nestedExpandableHeading) => expandableHeadingTemplate(nestedExpandableHeading))}
  `;
}
