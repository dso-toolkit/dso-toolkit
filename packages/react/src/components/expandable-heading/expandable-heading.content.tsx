import * as React from "react";
import { ExpandableHeading } from "dso-toolkit";

import { Templates } from "../../templates";

export const annotationContent = (
  <>
    <p>Gebruik de volgende bestandsformaten voor een document:</p>
    <ul>
      <li>Foto's en gescande documenten: PNG, TIFF</li>
      <li>Digitale documenten: ODT1.2, PDF/A-1, PDF/A-2</li>
      <li>Tekeningen: PDF/A-2, 5VG</li>
      <li>Spreadsheet: [SV, 0E1512, PDF/A</li>
    </ul>
  </>
);

export const annotationHeader = <h3 slot="title">Annotaties</h3>;

export const annotationAddons = (
  <div slot="addons" className="dso-selectable">
    <input type="checkbox" id="ca8ecb1d-56b4-4dc9-b64a-726277104732" value="Akkoord" />
    <label htmlFor="ca8ecb1d-56b4-4dc9-b64a-726277104732">Toon uitgebreide weergave</label>
  </div>
);

const nestedExpandableHeading = <p>genest!</p>;

function parentExpandableHeadingContent(
  { annotationOutputTemplate, expandableHeadingTemplate }: Templates,
  nestedExpandableHeadings?: ExpandableHeading<JSX.Element>[]
) {
  return (
    <>
      {annotationOutputTemplate({
        identifier: "annotatie-id",
        content: annotationContent,
        title: annotationHeader,
        addons: annotationAddons,
      })}
      <p>
        Dit is de content van een uitklapbare titel. Deze kan vrij ingevuld worden met rich content.
        <a href="#" className="extern">
          Bijvoorbeeld
        </a>
        externe links.
      </p>
      {nestedExpandableHeadings &&
        nestedExpandableHeadings.map((nestedExpandableHeading) => expandableHeadingTemplate(nestedExpandableHeading))}
    </>
  );
}

function nestedExpandableHeading1({ ozonContentTemplate }: Templates) {
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
      prefix: "Afdeling 2.1 ",
      inline: true,
    }),
    content: nestedExpandableHeading,
  };
}

function nestedExpandableHeading2({ ozonContentTemplate }: Templates) {
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
      prefix: "Afdeling 2.2 ",
      inline: true,
    }),
    content: nestedExpandableHeading,
  };
}

function nestedExpandableHeading3({ ozonContentTemplate }: Templates) {
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
      prefix: "Afdeling 2.3 ",
      inline: true,
    }),
    content: nestedExpandableHeading,
  };
}

export function expandableHeading(templates: Templates): ExpandableHeading<JSX.Element> {
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
        >Toepassingsbereik</Opschrift>
      `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: "Artikel 1.1 ",
      inline: true,
    }),
    addonsStart: labelTemplate({ slotName: "addons-start", label: "een label", status: "danger" }),
    addonsEnd: annotationButtonTemplate({ slotName: "addons-end", identifier: "annotatie-id" }),
    content: parentExpandableHeadingContent(templates),
  };
}

export function expandableHeadingWithChildList(templates: Templates): ExpandableHeading<JSX.Element> {
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
      prefix: "Hoofdstuk 2 ",
      inline: true,
    }),
    addonsStart: labelTemplate({ slotName: "addons-start", label: "een label", status: "danger" }),
    addonsEnd: annotationButtonTemplate({ slotName: "addons-end", identifier: "annotatie-id" }),
    content: parentExpandableHeadingContent(templates, [
      nestedExpandableHeading1(templates),
      nestedExpandableHeading2(templates),
      nestedExpandableHeading3(templates),
    ]),
  };
}
