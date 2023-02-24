import { ExpandableHeading } from "dso-toolkit";

import { Templates } from "../../../templates";
import { nestedExpandableHeading, parentExpandableHeadingContent } from "./expandable-heading.content";

function nestedExpandableHeading1(templates: Templates) {
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
      >Algemene bepalingen</Opschrift>
    `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: "Afdeling 2.1 ",
      inline: true,
    }),
    content: nestedExpandableHeading(templates),
  };
}

function nestedExpandableHeading2(templates: Templates) {
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
      >Water</Opschrift>
    `,
      dsoAnchorClick: () => void 0,
      dsoClick: () => void 0,
      prefix: "Afdeling 2.2 ",
      inline: true,
    }),
    content: nestedExpandableHeading(templates),
  };
}

function nestedExpandableHeading3(templates: Templates) {
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
      prefix: "Afdeling 2.3 ",
      inline: true,
    }),
    content: nestedExpandableHeading(templates),
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
    addonsStart: labelTemplate({ slotName: "addons-start", label: "een label", status: "danger", compact: true }),
    addonsEnd: annotationButtonTemplate({ slotName: "addons-end", identifier: "annotatie-id" }),
    content: parentExpandableHeadingContent(templates, [
      nestedExpandableHeading1(templates),
      nestedExpandableHeading2(templates),
      nestedExpandableHeading3(templates),
    ]),
  };
}
