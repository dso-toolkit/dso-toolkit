import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";
import { HandlerFunction } from "@storybook/addon-actions";

import {
  documentComponentMapper,
  documentComponentArgTypes,
  documentComponentArgs,
  DocumentComponentArgs,
} from "./document-component.args.js";
import { imroContent } from "./document-component.content.js";
import { DocumentComponent, DocumentComponentMode } from "./document-component.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

export type DocumentComponentDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type DocumentComponentStoryDemo = StoryObj<
  {
    jsonFile: string;
    openDefault: boolean;
    showCanvas: boolean;
    mode: DocumentComponentMode;
    ozonContentAnchorClick: HandlerFunction;
    tableOfContentsClick: HandlerFunction;
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
    ozonContentAnchorClick: HandlerFunction,
    tableOfContentsClick: HandlerFunction,
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
      },
      argTypes: {
        jsonFile: {
          options: [
            "ozon-response.json",
            "ozon-response-bal.json",
            "ozon-response-waterschappen.json",
            "ozon-response-omgevingsvisie.json",
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
        ozonContentAnchorClick: {
          action: "dsoOzonContentAnchorClick",
        },
        tableOfContentsClick: {
          action: "dsoTableOfContentsClick",
        },
      },
      parameters: { layout: "fullscreen" },
      render: templateContainer.render(storyTemplates, (args, { demoTemplate }) =>
        demoTemplate(
          args.jsonFile,
          args.openDefault,
          args.showCanvas,
          args.mode,
          args.ozonContentAnchorClick,
          args.tableOfContentsClick,
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
      },
      argTypes: {
        jsonFile: {
          options: [
            "ozon-response.json",
            "ozon-response-bal.json",
            "ozon-response-waterschappen.json",
            "ozon-response-omgevingsvisie.json",
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
        ozonContentAnchorClick: {
          action: "dsoOzonContentAnchorClick",
        },
        tableOfContentsClick: {
          action: "dsoTableOfContentsClick",
        },
      },
      parameters: { layout: "fullscreen" },
      render: templateContainer.render(storyTemplates, (args, { demoTemplate }) =>
        demoTemplate(
          args.jsonFile,
          args.openDefault,
          args.showCanvas,
          args.mode,
          args.ozonContentAnchorClick,
          args.tableOfContentsClick,
        ),
      ),
    },
    IMRO: {
      args: {
        ...documentComponentArgs,
        label: undefined,
        nummer: undefined,
        opschrift: undefined,
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
      },
      argTypes: documentComponentArgTypes,
      render: templateContainer.render(storyTemplates, (args, { documentComponentTemplate, imroTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args, imroTemplate(imroContent))),
      ),
    },
  };
}
