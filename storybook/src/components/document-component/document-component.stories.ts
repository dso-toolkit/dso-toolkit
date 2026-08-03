import { DsotDocumentComponentDemoCustomEvent } from "@dso-toolkit/core";
import readme from "@dso-toolkit/core/src/components/document-component/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { compiler } from "markdown-to-jsx/react";
import { HandlerFunction } from "storybook/actions";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { StoryObj } from "../../shared/story-obj.js";
import { annotationTemplate } from "../annotation/annotation.template.js";
import { definitionListTemplate } from "../definition-list/definition-list.template.js";
import { OzonContentBegripResolver, OzonContentUrlResolver } from "../ozon-content/ozon-content.models.js";

import {
  DocumentComponentArgs,
  documentComponentArgTypes,
  documentComponentArgs,
  documentComponentMapper,
} from "./document-component.args.js";
import { imroContent } from "./document-component.content.js";
import { decorator } from "./document-component.decorator";
import {
  DocumentComponentMode,
  DocumentComponentOzonContentClickEvent,
  DocumentComponentTableOfContentsClickEvent,
} from "./document-component.models.js";
import { documentComponentTemplate } from "./document-component.template.js";

interface DocumentComponentDemoArgs {
  jsonFile: string;
  openDefault: boolean;
  showCanvas: boolean;
  showBesluitversie: boolean;
  mode: DocumentComponentMode;
  dsoOzonContentClick: HandlerFunction;
  dsoTableOfContentsClick: HandlerFunction;
  ozonContentUrlResolver?: OzonContentUrlResolver;
  ozonContentBegripResolver?: OzonContentBegripResolver;
}

type DocumentComponentStory = StoryObj<DocumentComponentArgs, Renderer>;
type DocumentComponentDemoStory = StoryObj<DocumentComponentDemoArgs, Renderer>;

const begripResolver: OzonContentBegripResolver = (ref, element) => {
  if ((ref === "eId_van_begrip" || ref === "chp_1__art_1.2__list_o_1__item_1") && element) {
    return "<ns4:Definitie xmlns:ns4='https://standaarden.overheid.nl/stop/imop/tekst/'><ns4:Al>De snelle paarse vos eet enthousiast blauwe bananen onder de zingende regenboog, een veelbelovende dag om vuurwerk (zie <ns4:ExtRef soort='JCI' ref='jci1.3:c:BWBR0013360'>Vuurwerkbesluit</ns4:ExtRef>) te verkennen.</ns4:Al> <ns4:Al>Ook keken de mensen graag naar het spectaculaire vuurwerk dat de avondhemel verlichtte met felle kleuren.</ns4:Al> </ns4:Definitie>";
  }

  return undefined;
};

const childrenTemplate = html`<div slot="annotations">
  ${definitionListTemplate({
    definitions: [
      {
        term: html`Type regel`,
        descriptions: [
          {
            content: html`<dso-renvooi value="Regel voor iedereen"></dso-renvooi>`,
          },
        ],
      },
    ],
  })}
  <hr />
  ${annotationTemplate({ type: "locatie", locatieNoemer: "Locatie 1", symboolCode: "vag000" })}
  ${annotationTemplate({
    type: "locatie",
    locatieNoemer: "locatieNoemer",
    symboolCode: "vszt030",
    gewijzigdeLocatie: true,
  })}
  ${annotationTemplate({ type: "locatie", locatieNoemer: "Locatie 3", symboolCode: "vag000" })}
  ${annotationTemplate({ type: "locatie", locatieNoemer: "Locatie 4", symboolCode: "vszt030" })}
  <hr />
  ${annotationTemplate({ type: "gebiedsaanwijzing", naam: "Beschermingszone dijk", symboolCode: "vag000" })}
  ${annotationTemplate({ type: "gebiedsaanwijzing", naam: "Opwekking energie", symboolCode: "vszt030" })}
  ${annotationTemplate({ type: "gebiedsaanwijzing", naam: "Opwekking windenergie", symboolCode: "vag000" })}
</div>`;

const imroTemplate = (imroContentValue: string) => html`${unsafeHTML(imroContentValue)}`;

function demoTemplate(
  jsonFile: string,
  openDefault: boolean,
  showCanvas: boolean,
  showBesluitversie: boolean,
  mode: DocumentComponentMode,
  ozonContentClick: DocumentComponentDemoArgs["dsoOzonContentClick"],
  tableOfContentsClick: DocumentComponentDemoArgs["dsoTableOfContentsClick"],
  ozonContentUrlResolver?: OzonContentUrlResolver,
  ozonContentBegripResolver?: OzonContentBegripResolver,
) {
  return html`<dsot-document-component-demo
    @dsotOzonContentClick=${(e: DsotDocumentComponentDemoCustomEvent<DocumentComponentOzonContentClickEvent>) =>
      ozonContentClick(e.detail)}
    .jsonFile=${jsonFile}
    ?open-default=${openDefault}
    ?show-canvas=${showCanvas}
    ?show-besluitversie=${showBesluitversie}
    .mode=${mode}
    .ozonContentUrlResolver=${ozonContentUrlResolver}
    .ozonContentBegripResolver=${ozonContentBegripResolver}
    @dsotTableOfContentsClick=${(
      e: DsotDocumentComponentDemoCustomEvent<DocumentComponentTableOfContentsClickEvent>,
    ) => {
      if (!e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
      }
      tableOfContentsClick(e.detail);
    }}
  ></dsot-document-component-demo>`;
}

const meta: Meta = {
  title: "Core/Document Component",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: DocumentComponentStory = {
  decorators: [(story) => decorator(story)],
  args: documentComponentArgs,
  argTypes: documentComponentArgTypes,
  render: (args: DocumentComponentArgs) => documentComponentTemplate(documentComponentMapper(args, childrenTemplate)),
};

export const Contents: DocumentComponentDemoStory = {
  decorators: [(story) => decorator(story)],
  args: {
    jsonFile: "ozon-response.json",
    openDefault: true,
    showCanvas: false,
    showBesluitversie: false,
    mode: "document",
    dsoOzonContentClick: fn(),
    dsoTableOfContentsClick: fn(),
    ozonContentUrlResolver: (name, attribute, value, element) => {
      if (!value) {
        return "";
      }

      if (name === "Illustratie" && attribute === "naam" && element) {
        const figuurWId = element.getAttribute("wId");
        if (figuurWId?.startsWith("gm1979")) {
          return `images/${value}`;
        }
        if (figuurWId?.startsWith("mnre1034")) {
          return `https://ketenacceptatie.document-viewer.dso.kadaster.nl/bff/ozon/presenteren/v8/afbeeldingen/mnre1034/_akn_nl_act_mnre1034_2018_OW10146b7397b3f85255ca2exa3acc48_nld_6_0/${value}`;
        }
        if (figuurWId?.startsWith("gm0262")) {
          return `https://document-viewer.dso.kadaster.nl/bff/ozon/presenteren/v8/afbeeldingen/gm0262/_akn_nl_act_gm0262_2024_Regelingafc0c6a68c684c5190bc3924b2c99adc_nld_2024_10_10_14210083/${value}`;
        }
        if (figuurWId?.startsWith("gm1980")) {
          return `https://document-viewer.dso.kadaster.nl/bff/ozon/presenteren/v8/afbeeldingen/gm1980/_akn_nl_act_gm1980_2024_omgevingsvisie_nld_1041/${value}`;
        }

        return value;
      }

      if (name === "InlineTekstAfbeelding" && attribute === "naam" && element) {
        return value;
      }

      if (name === "ExtRef" && attribute === "ref" && element) {
        const soort = element.getAttribute("soort");
        switch (soort) {
          case "JCI":
            return `http://wetten.overheid.nl/${value}`;
          case "document":
            return `https://zoek.officielebekendmakingen.nl/${value}`;
          case "AKN":
          case "URL":
          default:
            return value;
        }
      }

      if (name === "ExtIoRef" && attribute === "ref" && element) {
        return `https://identifier-eto.overheid.nl/${value}`;
      }

      if (name === "IntIoRef" && attribute === "ref" && element) {
        return `#${value}`;
      }

      return value;
    },
    ozonContentBegripResolver: begripResolver,
  },
  argTypes: {
    jsonFile: {
      options: [
        "ozon-response.json",
        "ozon-response-bal.json",
        "ozon-response-waterschappen.json",
        "ozon-response-omgevingsvisie.json",
        "ozon-response-strategische-omgevingsvisie-dijk-en-waard.json",
      ],
      control: {
        type: "select",
      },
    },
    openDefault: {
      control: {
        type: "boolean",
      },
    },
    showCanvas: {
      control: {
        type: "boolean",
      },
    },
    showBesluitversie: {
      control: {
        type: "boolean",
      },
    },
    mode: {
      options: ["document", "table-of-contents"],
      control: {
        type: "select",
      },
    },
    dsoOzonContentClick: argTypeAction(),
    dsoTableOfContentsClick: argTypeAction(),
    ozonContentUrlResolver: argTypeAction(),
    ozonContentBegripResolver: argTypeAction(),
  },
  parameters: { layout: "fullscreen" },
  render: (args: DocumentComponentDemoArgs) =>
    demoTemplate(
      args.jsonFile,
      args.openDefault,
      args.showCanvas,
      args.showBesluitversie,
      args.mode,
      args.dsoOzonContentClick,
      args.dsoTableOfContentsClick,
      args.ozonContentUrlResolver,
      args.ozonContentBegripResolver,
    ),
};

export const Inhoudsopgave: DocumentComponentDemoStory = {
  decorators: [(story) => decorator(story)],
  args: {
    jsonFile: "ozon-response.json",
    openDefault: true,
    showCanvas: false,
    showBesluitversie: false,
    mode: "table-of-contents",
    dsoOzonContentClick: fn(),
    dsoTableOfContentsClick: fn(),
  },
  argTypes: {
    jsonFile: {
      options: [
        "ozon-response.json",
        "ozon-response-bal.json",
        "ozon-response-waterschappen.json",
        "ozon-response-omgevingsvisie.json",
        "ozon-response-strategische-omgevingsvisie-dijk-en-waard.json",
      ],
      control: {
        type: "select",
      },
    },
    openDefault: {
      control: {
        type: "boolean",
      },
    },
    showCanvas: {
      control: {
        type: "boolean",
      },
    },
    showBesluitversie: {
      control: {
        type: "boolean",
      },
    },
    mode: {
      options: ["document", "table-of-contents"],
      control: {
        type: "select",
      },
    },
    dsoOzonContentClick: argTypeAction(),
    dsoTableOfContentsClick: argTypeAction(),
  },
  parameters: { layout: "fullscreen" },
  render: (args: DocumentComponentDemoArgs) =>
    demoTemplate(
      args.jsonFile,
      args.openDefault,
      args.showCanvas,
      args.showBesluitversie,
      args.mode,
      args.dsoOzonContentClick,
      args.dsoTableOfContentsClick,
    ),
};

export const IMRO: DocumentComponentStory = {
  args: {
    ...documentComponentArgs,
    wijzigactie: undefined,
    inhoud: undefined,
    type: undefined,
    vervallen: undefined,
    notApplicable: undefined,
    gereserveerd: undefined,
    badge: undefined,
    badgeStatus: undefined,
    badgeTooltip: undefined,
    filtered: undefined,
    label: undefined,
    labelStatus: undefined,
    annotated: undefined,
    open: true,
    alternativeTitle: "Adequaat aanbod openbaar vervoer",
    kop: undefined,
  },
  argTypes: documentComponentArgTypes,
  render: (args: DocumentComponentArgs) =>
    documentComponentTemplate(documentComponentMapper(args, imroTemplate(imroContent))),
};
