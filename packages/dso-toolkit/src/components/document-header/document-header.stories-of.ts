import { ComponentAnnotations, Renderer } from "@storybook/types";

import { DocumentHeaderArgs, documentHeaderArgsMapper, documentHeaderArgTypes } from "./document-header.args";
import { DocumentHeader } from "./document-header.models";
import { DefinitionList } from "../definition-list";
import { options } from "../advanced-select/advanced-select.content";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type DocumentHeaderStory = StoryObj<DocumentHeaderArgs, Renderer>;

interface DocumentHeaderStories {
  Default: DocumentHeaderStory;
  Sticky: DocumentHeaderStory;
}

export interface DocumentHeaderTemplates<TemplateFnReturnType> {
  documentHeaderTemplate: (documentHeaderProperties: DocumentHeader<TemplateFnReturnType>) => TemplateFnReturnType;
  features: DefinitionList<TemplateFnReturnType>;
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
  return {
    Default: {
      args: {
        title: "Omgevingsplan gemeente Gouda",
        type: "Een omgevingsplan waar de omgeving mooier van wordt",
        owner: "Gemeente Gouda",
        advancedSelect: {
          options,
        },
      },
      render: templateContainer.render(storyTemplates, (args, { documentHeaderTemplate, features }) =>
        documentHeaderTemplate(documentHeaderArgsMapper(args, features)),
      ),
    },
    Sticky: {
      args: {
        title: "Omgevingsplan gemeente Gouda",
        type: "Een omgevingsplan waar de omgeving mooier van wordt",
        owner: "Gemeente Gouda",
        sticky: true,
        advancedSelect: {
          options,
        },
      },
      render: templateContainer.render(storyTemplates, (args, { documentHeaderTemplate, features }) =>
        documentHeaderTemplate(documentHeaderArgsMapper(args, features)),
      ),
    },
  };
}
