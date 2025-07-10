import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { noControl } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { documentListMapper, documentListStickyMapper } from "./document-list.args.js";
import { DocumentList, DocumentListItemStatusDemoContent } from "./document-list.models.js";

interface DocumentListStories {
  Default: StoryObj<Record<string, never>, Renderer>;
  Sticky: StoryObj<Record<string, never>, Renderer>;
}

interface DocumentListStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentListTemplates<TemplateFnReturnType>
  > {}

export interface DocumentListTemplates<TemplateFnReturnType> {
  documentListTemplate: (documentListProperties: DocumentList<TemplateFnReturnType>) => TemplateFnReturnType;
  statusDemoMap: (status: DocumentListItemStatusDemoContent) => TemplateFnReturnType;
}

export function documentListMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    args: {
      ...noControl,
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

export function documentListStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: DocumentListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DocumentListStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (_args, { documentListTemplate, statusDemoMap }) =>
        documentListTemplate(documentListMapper(statusDemoMap)),
      ),
    },
    Sticky: {
      render: templateContainer.render(storyTemplates, (_args, { documentListTemplate, statusDemoMap }) =>
        documentListTemplate(documentListStickyMapper(statusDemoMap)),
      ),
    },
  };
}
