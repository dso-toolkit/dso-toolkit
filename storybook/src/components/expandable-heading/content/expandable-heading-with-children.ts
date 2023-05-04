import { ExpandableHeading } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { Templates } from "../../../templates";
import {
  annotationAddons,
  annotationContent,
  annotationHeader,
  expandandableHeadingDemoContent,
  parentExpandableHeadingContent,
} from "./expandable-heading.content";
import { EditAction } from "@dso-toolkit/core";

function expandableHeadingDemoListContent(
  { ozonContentTemplate, annotationButtonTemplate, annotationOutputTemplate }: Templates,
  key: number
): TemplateResult {
  return html`<ol>
    <li>
      <div style="float: right;">${annotationButtonTemplate({ identifier: `annotatie-list-${key}` })}</div>
      <div>
        ${annotationOutputTemplate({
          identifier: `annotatie-list-${key}`,
          content: annotationContent,
          title: annotationHeader,
          addons: annotationAddons,
          prefix: "Dit lid heeft annotaties:",
        })}
        ${ozonContentTemplate({
          slotName: "title",
          content: `<Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/' xmlns:ns5='http://www.opengis.net/se' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns7='http://www.opengis.net/ogc' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns9='http://www.w3.org/2001/SMIL20/'><Al>Het is verboden gronden of bouwwerken te gebruiken op een wijze die niet in overeenstemming is met een in afdeling <IntRef ref='chp_2__subchp_2.3'>2.3</IntRef> aan een locatie gegeven gebruiksdoel en de daarop betrekking hebbende regels, of op een wijze die in strijd is met de regels over gebruik, bedoeld in afdeling <IntRef ref='chp_2__subchp_2.3'>2.3</IntRef>.</Al></Inhoud>`,
          dsoAnchorClick: () => void 0,
          dsoClick: () => void 0,
          inline: true,
        })}
      </div>
    </li>
  </ol>`;
}

function nestedExpandableHeading1(templates: Templates, editAction?: EditAction) {
  const { expandableHeadingTemplate, ozonContentTemplate } = templates;

  return {
    title: ozonContentTemplate({
      slotName: "title",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Opschrift
        xmlns="https://standaarden.overheid.nl/stop/imop/tekst/"
        xmlns:ns6="http://www.w3.org/1999/xlink"
        xmlns:ns5="http://www.opengis.net/se"
        xmlns:ns8="http://www.opengis.net/gml"
        xmlns:ns7="http://www.opengis.net/ogc"
        xmlns:data="https://standaarden.overheid.nl/stop/imop/data/"
        xmlns:DSO-PI12="https://standaarden.overheid.nl/lvbb/DSO-PI12"
        xmlns:ns9="http://www.w3.org/2001/SMIL20/"
        xmlns:ns10="http://www.w3.org/2001/SMIL20/Language"
        xmlns:ns2="https://standaarden.overheid.nl/stop/imop/consolidatie/"
        xmlns:ns3="https://standaarden.overheid.nl/lvbb/stop/uitlevering/"
      >Algemene bepalingen</Opschrift>
    `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: html`<span slot="prefix">Afdeling 2.1 </span>`,
      inline: true,
    }),
    editAction,
    content: html`${[1, 2, 3].map((article) =>
      expandableHeadingTemplate({
        heading: "h4",
        color: "black",
        title: ozonContentTemplate({
          slotName: "title",
          content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Opschrift
              xmlns="https://standaarden.overheid.nl/stop/imop/tekst/"
              xmlns:ns6="http://www.w3.org/1999/xlink"
              xmlns:ns5="http://www.opengis.net/se"
              xmlns:ns8="http://www.opengis.net/gml"
              xmlns:ns7="http://www.opengis.net/ogc"
              xmlns:data="https://standaarden.overheid.nl/stop/imop/data/"
              xmlns:DSO-PI12="https://standaarden.overheid.nl/lvbb/DSO-PI12"
              xmlns:ns9="http://www.w3.org/2001/SMIL20/"
              xmlns:ns10="http://www.w3.org/2001/SMIL20/Language"
              xmlns:ns2="https://standaarden.overheid.nl/stop/imop/consolidatie/"
              xmlns:ns3="https://standaarden.overheid.nl/lvbb/stop/uitlevering/"
            ></Opschrift>
          `,
          dsoAnchorClick: () => void 0,
          dsoClick: () => void 0,
          prefix: html`<span slot="prefix">Artikel 2.1.${article} </span>`,
          inline: true,
        }),
        content: expandableHeadingDemoListContent(templates, article),
      })
    )}`,
  };
}

function nestedExpandableHeading2(templates: Templates, renvooi: boolean) {
  const { expandableHeadingTemplate, ozonContentTemplate } = templates;

  return {
    title: ozonContentTemplate({
      slotName: "title",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Opschrift
        xmlns="https://standaarden.overheid.nl/stop/imop/tekst/"
        xmlns:ns6="http://www.w3.org/1999/xlink"
        xmlns:ns5="http://www.opengis.net/se"
        xmlns:ns8="http://www.opengis.net/gml"
        xmlns:ns7="http://www.opengis.net/ogc"
        xmlns:data="https://standaarden.overheid.nl/stop/imop/data/"
        xmlns:DSO-PI12="https://standaarden.overheid.nl/lvbb/DSO-PI12"
        xmlns:ns9="http://www.w3.org/2001/SMIL20/"
        xmlns:ns10="http://www.w3.org/2001/SMIL20/Language"
        xmlns:ns2="https://standaarden.overheid.nl/stop/imop/consolidatie/"
        xmlns:ns3="https://standaarden.overheid.nl/lvbb/stop/uitlevering/"
      >Water</Opschrift>
    `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: html`<span slot="prefix">Afdeling 2.2 </div>`,
      inline: true,
    }),
    content: html`${[1, 2, 3].map((article) =>
      expandableHeadingTemplate({
        heading: "h4",
        color: "black",
        title: ozonContentTemplate({
          slotName: "title",
          content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Opschrift
              xmlns="https://standaarden.overheid.nl/stop/imop/tekst/"
              xmlns:ns6="http://www.w3.org/1999/xlink"
              xmlns:ns5="http://www.opengis.net/se"
              xmlns:ns8="http://www.opengis.net/gml"
              xmlns:ns7="http://www.opengis.net/ogc"
              xmlns:data="https://standaarden.overheid.nl/stop/imop/data/"
              xmlns:DSO-PI12="https://standaarden.overheid.nl/lvbb/DSO-PI12"
              xmlns:ns9="http://www.w3.org/2001/SMIL20/"
              xmlns:ns10="http://www.w3.org/2001/SMIL20/Language"
              xmlns:ns2="https://standaarden.overheid.nl/stop/imop/consolidatie/"
              xmlns:ns3="https://standaarden.overheid.nl/lvbb/stop/uitlevering/"
            ></Opschrift>
          `,
          dsoAnchorClick: () => void 0,
          dsoClick: () => void 0,
          prefix: html`<span slot="prefix">Artikel 2.1.${article} </span>`,
          inline: true,
        }),
        editAction: renvooi && article === 2 ? "insert" : undefined,
        content: expandableHeadingDemoListContent(templates, article),
      })
    )}`,
  };
}

function nestedExpandableHeading3(templates: Templates, editAction?: EditAction) {
  const { ozonContentTemplate } = templates;

  return {
    title: ozonContentTemplate({
      slotName: "title",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Opschrift
        xmlns="https://standaarden.overheid.nl/stop/imop/tekst/"
        xmlns:ns6="http://www.w3.org/1999/xlink"
        xmlns:ns5="http://www.opengis.net/se"
        xmlns:ns8="http://www.opengis.net/gml"
        xmlns:ns7="http://www.opengis.net/ogc"
        xmlns:data="https://standaarden.overheid.nl/stop/imop/data/"
        xmlns:DSO-PI12="https://standaarden.overheid.nl/lvbb/DSO-PI12"
        xmlns:ns9="http://www.w3.org/2001/SMIL20/"
        xmlns:ns10="http://www.w3.org/2001/SMIL20/Language"
        xmlns:ns2="https://standaarden.overheid.nl/stop/imop/consolidatie/"
        xmlns:ns3="https://standaarden.overheid.nl/lvbb/stop/uitlevering/"
      >Rijkswateren</Opschrift>
    `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: html`<span slot="prefix">Afdeling 2.3 </span>`,
      inline: true,
    }),
    editAction,
    content: expandandableHeadingDemoContent(templates),
  };
}

export function expandableHeadingWithChildList(
  templates: Templates,
  renvooi = false
): ExpandableHeading<TemplateResult> {
  const { annotationButtonTemplate, labelTemplate, ozonContentTemplate } = templates;

  return {
    title: ozonContentTemplate({
      slotName: "title",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Opschrift
          xmlns="https://standaarden.overheid.nl/stop/imop/tekst/"
          xmlns:ns6="http://www.w3.org/1999/xlink"
          xmlns:ns5="http://www.opengis.net/se"
          xmlns:ns8="http://www.opengis.net/gml"
          xmlns:ns7="http://www.opengis.net/ogc"
          xmlns:data="https://standaarden.overheid.nl/stop/imop/data/"
          xmlns:DSO-PI12="https://standaarden.overheid.nl/lvbb/DSO-PI12"
          xmlns:ns9="http://www.w3.org/2001/SMIL20/"
          xmlns:ns10="http://www.w3.org/2001/SMIL20/Language"
          xmlns:ns2="https://standaarden.overheid.nl/stop/imop/consolidatie/"
          xmlns:ns3="https://standaarden.overheid.nl/lvbb/stop/uitlevering/"
        >Aanwijzing en geometrische begrenzing van locaties</Opschrift>
      `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: html`<span slot="prefix">Hoofdstuk 2 </span>`,
      inline: true,
    }),
    addonsStart: labelTemplate({ slotName: "addons-start", label: "een label", status: "danger", compact: true }),
    addonsEnd: annotationButtonTemplate({ slotName: "addons-end", identifier: "annotatie-id" }),
    content: parentExpandableHeadingContent(templates, [
      renvooi ? nestedExpandableHeading1(templates, "delete") : nestedExpandableHeading1(templates),
      nestedExpandableHeading2(templates, renvooi),
      renvooi ? nestedExpandableHeading3(templates, "insert") : nestedExpandableHeading3(templates),
    ]),
  };
}
