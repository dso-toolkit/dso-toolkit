import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { ExpandableHeading } from "dso-toolkit";

import { Templates } from "../../../templates";
import { nestedExpandableHeading, parentExpandableHeadingContent } from "./expandable-heading.content";

const nestedExpandableHeading1: ExpandableHeading<StoryFnAngularReturnType> = {
  title: {
    template: `
        <dso-ozon-content
          slot="title"
          content="<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns5='http://www.opengis.net/se' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns7='http://www.opengis.net/ogc' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:ns9='http://www.w3.org/2001/SMIL20/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'>Algemene bepalingen</Opschrift>"
        >
          <span slot="prefix">Afdeling 2.1 </span>
        </dso-ozon-content>
      `,
  },
  content: nestedExpandableHeading,
};

const nestedExpandableHeading2: ExpandableHeading<StoryFnAngularReturnType> = {
  title: {
    template: `
        <dso-ozon-content
          slot="title"
          content="<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns5='http://www.opengis.net/se' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns7='http://www.opengis.net/ogc' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:ns9='http://www.w3.org/2001/SMIL20/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'>Water</Opschrift>"
        >
          <span slot="prefix">Afdeling 2.2 </span>
        </dso-ozon-content>
      `,
  },
  content: nestedExpandableHeading,
};

const nestedExpandableHeading3: ExpandableHeading<StoryFnAngularReturnType> = {
  title: {
    template: `
        <dso-ozon-content
          slot="title"
          content="<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns5='http://www.opengis.net/se' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns7='http://www.opengis.net/ogc' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:ns9='http://www.w3.org/2001/SMIL20/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'>Rijkswateren</Opschrift>"
        >
          <span slot="prefix">Afdeling 2.3 </span>
        </dso-ozon-content>
      `,
  },
  content: nestedExpandableHeading,
};

export function expandableHeadingWithChildList(templates: Templates): ExpandableHeading<StoryFnAngularReturnType> {
  const { annotationButtonTemplate, labelTemplate } = templates;

  return {
    title: {
      template: `
        <dso-ozon-content
          slot="title"
          content="<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' xmlns:ns6='http://www.w3.org/1999/xlink' xmlns:ns5='http://www.opengis.net/se' xmlns:ns8='http://www.opengis.net/gml' xmlns:ns7='http://www.opengis.net/ogc' xmlns:data='https://standaarden.overheid.nl/stop/imop/data/' xmlns:DSO-PI12='https://standaarden.overheid.nl/lvbb/DSO-PI12' xmlns:ns9='http://www.w3.org/2001/SMIL20/' xmlns:ns10='http://www.w3.org/2001/SMIL20/Language' xmlns:ns2='https://standaarden.overheid.nl/stop/imop/consolidatie/' xmlns:ns3='https://standaarden.overheid.nl/lvbb/stop/uitlevering/'>Aanwijzing en geometrische begrenzing van locaties</Opschrift>"
        >
          <span slot="prefix">Hoofdstuk 2 </span>
        </dso-ozon-content>
      `,
    },
    addonsStart: labelTemplate(
      { slotName: "addons-start", label: "een label", status: "danger", compact: true },
      { slotName: "'addons-start'", label: "'een label'", status: "'danger'", compact: "'true'" }
    ),
    addonsEnd: annotationButtonTemplate(
      { slotName: "addons-end", identifier: "annotatie-id" },
      { slotName: "'addons-end'", identifier: "'annotatie-id'" }
    ),
    content: parentExpandableHeadingContent(templates, [
      nestedExpandableHeading1,
      nestedExpandableHeading2,
      nestedExpandableHeading3,
    ]),
  };
}
