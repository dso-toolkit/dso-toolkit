import { ComponentAnnotations, Renderer } from "@storybook/types";

import {
  DocumentCardArgs,
  documentCardArgs,
  documentCardArgTypes,
  documentCardArgsMapper,
} from "./document-card.args.js";
import { DocumentCard } from "./document-card.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type DocumentCardStory = StoryObj<DocumentCardArgs, Renderer>;

interface DocumentCardStories {
  Default: DocumentCardStory;
  WithLabel: DocumentCardStory;
  WithTypeToeliching: DocumentCardStory;
}

interface DocumentCardStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentCardTemplates<TemplateFnReturnType>
  > {}

interface DocumentCardTemplates<TemplateFnReturnType> {
  documentCardTemplate: (documentCardProperties: DocumentCard) => TemplateFnReturnType;
}

export function documentCardMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  DocumentCardArgs
> {
  return {
    argTypes: documentCardArgTypes,
    args: documentCardArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function documentCardStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: DocumentCardStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DocumentCardStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate }) =>
        documentCardTemplate(documentCardArgsMapper(args)),
      ),
    },
    WithLabel: {
      args: {
        ...documentCardArgs,
        meta: {
          status: "warning",
          compact: true,
          label: "Ontwerp",
        },
      },
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate }) =>
        documentCardTemplate(documentCardArgsMapper(args)),
      ),
    },
    WithTypeToeliching: {
      args: {
        ...documentCardArgs,
        typeToelichting: {
          children: "Extra informatie",
          label: `Toon informatie over "${documentCardArgs.type}"`,
          position: "right",
          small: false,
          secondary: false,
        },
      },
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate }) =>
        documentCardTemplate(documentCardArgsMapper(args)),
      ),
    },
  };
}
