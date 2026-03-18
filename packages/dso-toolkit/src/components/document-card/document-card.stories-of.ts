import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  DocumentCardArgs,
  documentCardArgTypes,
  documentCardArgs,
  documentCardArgsMapper,
} from "./document-card.args.js";
import { DocumentCard } from "./document-card.models.js";

type DocumentCardStory<TemplateFnReturnType> = StoryObj<DocumentCardArgs<TemplateFnReturnType>, Renderer>;

interface DocumentCardStories<TemplateFnReturnType> {
  Default: DocumentCardStory<TemplateFnReturnType>;
  WithLabel: DocumentCardStory<TemplateFnReturnType>;
  WithTypeToelichting: DocumentCardStory<TemplateFnReturnType>;
  WithStatusToelichting: DocumentCardStory<TemplateFnReturnType>;
}

interface DocumentCardStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  DocumentCardTemplates<TemplateFnReturnType>
> {}

interface DocumentCardTemplates<TemplateFnReturnType> {
  documentCardTemplate: (documentCardProperties: DocumentCard<TemplateFnReturnType>) => TemplateFnReturnType;
  typeItems: TemplateFnReturnType[];
}

export function documentCardMeta<TRenderer extends Renderer, TemplateFnReturnType>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer, DocumentCardArgs<TemplateFnReturnType>> {
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
}: DocumentCardStoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType
>): DocumentCardStories<TemplateFnReturnType> {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate, typeItems }) =>
        documentCardTemplate(documentCardArgsMapper(args, typeItems)),
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
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate, typeItems }) =>
        documentCardTemplate(documentCardArgsMapper(args, typeItems)),
      ),
    },
    WithTypeToelichting: {
      args: {
        ...documentCardArgs,
        typeToelichting: {
          children: "Extra informatie",
          label: `Toon informatie over type`,
          position: "right",
          small: false,
          secondary: false,
        },
      },
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate, typeItems }) =>
        documentCardTemplate(documentCardArgsMapper(args, typeItems)),
      ),
    },
    WithStatusToelichting: {
      args: {
        ...documentCardArgs,
        statusToelichtingOutline: {
          status: "outline",
          message: "!",
        },
        statusToelichtingWarning: {
          status: "warning",
          message: "!",
        },
      },
      render: templateContainer.render(storyTemplates, (args, { documentCardTemplate, typeItems }) =>
        documentCardTemplate(documentCardArgsMapper(args, typeItems)),
      ),
    },
  };
}
