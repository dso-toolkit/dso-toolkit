import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";
import { HandlerFunction } from "@storybook/addon-actions";

import {
  documentComponentMapper,
  documentComponentArgTypes,
  documentComponentArgs,
  DocumentComponentArgs,
} from "./document-component.args.js";
import { imroContent } from "./document-component.content.js";
import { DocumentComponent } from "./document-component.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

export type DocumentComponentDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

interface DocumentComponentStories {
  Default: StoryObj<DocumentComponentArgs, Renderer>;
  Demo: StoryObj<
    {
      jsonFile: string;
      openDefault: boolean;
      showCanvas: boolean;
      ozonContentAnchorClick: HandlerFunction;
    },
    Renderer
  >;
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
  demoTemplate: (
    jsonFile: string,
    openDefault: boolean,
    showCanvas: boolean,
    ozonContentAnchorClick: HandlerFunction,
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
      args: documentComponentArgs,
      argTypes: documentComponentArgTypes,
      render: templateContainer.render(storyTemplates, (args, { documentComponentTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args)),
      ),
    },
    Demo: {
      decorators: [(story) => decorator(story)],
      args: {
        jsonFile: "ozon-response-omgevingsvisie.json",
        openDefault: true,
        showCanvas: false,
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
        ozonContentAnchorClick: {
          action: "dsoOzonContentAnchorClick",
        },
      },
      parameters: { layout: "fullscreen" },
      render: templateContainer.render(storyTemplates, (args, { demoTemplate }) =>
        demoTemplate(args.jsonFile, args.openDefault, args.showCanvas, args.ozonContentAnchorClick),
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
        content: imroContent,
      },
      argTypes: documentComponentArgTypes,
      render: templateContainer.render(storyTemplates, (args, { documentComponentTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args)),
      ),
    },
  };
}
