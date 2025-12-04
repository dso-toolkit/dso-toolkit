import { compiler } from "markdown-to-jsx";
import { HandlerFunction } from "storybook/actions";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, noControl } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";
import { OzonContentBegripResolver, OzonContentUrlResolver } from "../ozon-content";
import { begripResolver } from "../ozon-content/ozon-content.content";

import {
  DocumentComponentArgs,
  documentComponentArgTypes,
  documentComponentArgs,
  documentComponentMapper,
} from "./document-component.args.js";
import { imroContent } from "./document-component.content.js";
import { DocumentComponent, DocumentComponentMode } from "./document-component.models.js";

export type DocumentComponentDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type DocumentComponentStoryDemo = StoryObj<
  {
    jsonFile: string;
    openDefault: boolean;
    showCanvas: boolean;
    mode: DocumentComponentMode;
    dsoOzonContentClick: HandlerFunction;
    dsoTableOfContentsClick: HandlerFunction;
    ozonContentUrlResolver?: OzonContentUrlResolver;
    ozonContentBegripResolver?: OzonContentBegripResolver;
  },
  Renderer
>;

interface DocumentComponentStories {
  Default: StoryObj<DocumentComponentArgs, Renderer>;
  Contents: DocumentComponentStoryDemo;
  Inhoudsopgave: DocumentComponentStoryDemo;
  IMRO: StoryObj<DocumentComponentArgs, Renderer>;
}

interface DocumentComponentStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentComponentTemplates<TemplateFnReturnType>
  > {}

export interface DocumentComponentTemplates<TemplateFnReturnType> {
  documentComponentTemplate: (
    documentComponentProperties: DocumentComponent<TemplateFnReturnType>,
  ) => TemplateFnReturnType;
  childrenTemplate: TemplateFnReturnType;
  imroTemplate: (imroContent: string) => TemplateFnReturnType;
  demoTemplate: (
    jsonFile: string,
    openDefault: boolean,
    showCanvas: boolean,
    mode: DocumentComponentMode,
    dsoOzonContentClick: HandlerFunction,
    dsoTableOfContentsClick: HandlerFunction,
    ozonContentUrlResolver?: OzonContentUrlResolver,
    ozonContentBegripResolver?: OzonContentBegripResolver,
  ) => TemplateFnReturnType;
}

export function documentComponentMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function documentComponentStories<Implementation, Templates, TemplateFnReturnType>(
  {
    storyTemplates,
    templateContainer,
  }: DocumentComponentStoriesParameters<Implementation, Templates, TemplateFnReturnType>,
  decorator: DocumentComponentDecorator<TemplateFnReturnType>,
): DocumentComponentStories {
  return {
    Default: {
      decorators: [(story) => decorator(story)],
      args: documentComponentArgs,
      argTypes: documentComponentArgTypes,
      render: templateContainer.render(storyTemplates, (args, { documentComponentTemplate, childrenTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args, childrenTemplate)),
      ),
    },
    Contents: {
      decorators: [(story) => decorator(story)],
      args: {
        jsonFile: "ozon-response.json",
        openDefault: true,
        showCanvas: false,
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
              // ozon-response.json
              return `images/${value}`;
            }
            if (figuurWId?.startsWith("mnre1034")) {
              // ozon-response-bal.json
              return `https://ketenacceptatie.document-viewer.dso.kadaster.nl/bff/ozon/presenteren/v8/afbeeldingen/mnre1034/_akn_nl_act_mnre1034_2018_OW10146b7397b3f85255ca2exa3acc48_nld_6_0/${value}`;
            }
            if (figuurWId?.startsWith("gm0262")) {
              // ozon-response-omgevingsvisie.json
              return `https://document-viewer.dso.kadaster.nl/bff/ozon/presenteren/v8/afbeeldingen/gm0262/_akn_nl_act_gm0262_2024_Regelingafc0c6a68c684c5190bc3924b2c99adc_nld_2024_10_10_14210083/${value}`;
            }
            if (figuurWId?.startsWith("gm1980")) {
              // ozon-response-strategische-omgevingsvisie-dijk-en-waard.json
              return `https://document-viewer.dso.kadaster.nl/bff/ozon/presenteren/v8/afbeeldingen/gm1980/_akn_nl_act_gm1980_2024_omgevingsvisie_nld_1041/${value}`;
            }
            // ozon-response-waterschappen.json bevat geen illustraties

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
        mode: {
          options: ["document", "table-of-contents"],
          control: {
            type: "select",
          },
        },
        dsoOzonContentClick: argTypeAction(),
        dsoTableOfContentsClick: argTypeAction(),
        ozonContentUrlResolver: {
          ...noControl,
        },
        ozonContentBegripResolver: {
          ...noControl,
        },
      },
      parameters: { layout: "fullscreen" },
      render: templateContainer.render(storyTemplates, (args, { demoTemplate }) =>
        demoTemplate(
          args.jsonFile,
          args.openDefault,
          args.showCanvas,
          args.mode,
          args.dsoOzonContentClick,
          args.dsoTableOfContentsClick,
          args.ozonContentUrlResolver,
          args.ozonContentBegripResolver,
        ),
      ),
    },
    Inhoudsopgave: {
      decorators: [(story) => decorator(story)],
      args: {
        jsonFile: "ozon-response.json",
        openDefault: true,
        showCanvas: false,
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
      render: templateContainer.render(storyTemplates, (args, { demoTemplate }) =>
        demoTemplate(
          args.jsonFile,
          args.openDefault,
          args.showCanvas,
          args.mode,
          args.dsoOzonContentClick,
          args.dsoTableOfContentsClick,
        ),
      ),
    },
    IMRO: {
      args: {
        ...documentComponentArgs,
        wijzigactie: undefined,
        inhoud: undefined,
        type: undefined,
        vervallen: undefined,
        notApplicable: undefined,
        gereserveerd: undefined,
        genesteOntwerpInformatie: undefined,
        filtered: undefined,
        bevatOntwerpInformatie: undefined,
        annotated: undefined,
        open: true,
        alternativeTitle: "Adequaat aanbod openbaar vervoer",
        kop: undefined,
      },
      argTypes: documentComponentArgTypes,
      render: templateContainer.render(storyTemplates, (args, { documentComponentTemplate, imroTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args, imroTemplate(imroContent))),
      ),
    },
  };
}
