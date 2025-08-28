import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";
import { options } from "../advanced-select/advanced-select.content";

import { DocumentHeaderArgs, documentHeaderArgTypes, documentHeaderArgsMapper } from "./document-header.args.js";
import { DocumentHeader, Features } from "./document-header.models.js";

type DocumentHeaderStory = StoryObj<DocumentHeaderArgs, Renderer>;

interface DocumentHeaderStories {
  Default: DocumentHeaderStory;
  DefaultOntwerp: DocumentHeaderStory;
  DefaultBesluitversie: DocumentHeaderStory;
  Sticky: DocumentHeaderStory;
  StickyOntwerp: DocumentHeaderStory;
  StickyBesluitversie: DocumentHeaderStory;
}

export interface DocumentHeaderTemplates<TemplateFnReturnType> {
  documentHeaderTemplate: (documentHeaderProperties: DocumentHeader<TemplateFnReturnType>) => TemplateFnReturnType;
  features: Features<TemplateFnReturnType>[];
}

interface DocumentHeaderStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentHeaderTemplates<TemplateFnReturnType>
  > {}

export function documentHeaderMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  DocumentHeaderArgs
> {
  return {
    argTypes: documentHeaderArgTypes,
    args: {
      advancedSelect: {
        options,
      },
      title: "Omgevingsplan gemeente Gouda",
      type: "Een omgevingsplan waar de omgeving mooier van wordt",
      owner: "Gemeente Gouda",
      featuresOpen: false,
      sticky: false,
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function documentHeaderStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: DocumentHeaderStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DocumentHeaderStories {
  const render = templateContainer.render(
    storyTemplates,
    (args: DocumentHeaderArgs, { documentHeaderTemplate, features }) =>
      documentHeaderTemplate(documentHeaderArgsMapper(args, features)),
  );

  return {
    Default: {
      render,
    },
    DefaultOntwerp: {
      args: {
        statusMessage: "Wijzigingen door ontwerpbesluit",
        variant: "ontwerp",
      },
      render,
    },
    DefaultBesluitversie: {
      args: {
        statusMessage: "Wijzigingen in regeling door wijzigingbesluit",
        variant: "besluitversie",
      },
      render,
    },
    Sticky: {
      args: {
        sticky: true,
      },
      render,
    },
    StickyOntwerp: {
      args: {
        sticky: true,
        variant: "ontwerp",
      },
      render,
    },
    StickyBesluitversie: {
      args: {
        sticky: true,
        variant: "besluitversie",
      },
      render,
    },
  };
}
