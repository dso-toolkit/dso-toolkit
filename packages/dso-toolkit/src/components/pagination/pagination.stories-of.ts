import { ComponentAnnotations, Renderer } from "@storybook/types";

import { PaginationArgs, paginationArgsMapper, paginationArgTypes } from "./pagination.args.js";
import { Pagination } from "./pagination.models.js";
import { StoriesParameters, StoryObj } from "../../template-container";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { compiler } from "markdown-to-jsx";

type PaginationStory = StoryObj<PaginationArgs, Renderer>;

interface PaginationStories {
  Pagination: PaginationStory;
  PaginationWithoutTotal: PaginationStory;
}

interface PaginationStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    PaginationTemplates<TemplateFnReturnType>
  > {}

export interface PaginationTemplates<TemplateFnReturnType> {
  paginationTemplate: (paginationProperties: Pagination) => TemplateFnReturnType;
}

export function paginationMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  PaginationArgs
> {
  return {
    argTypes: paginationArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function paginationStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: PaginationStoriesParameters<Implementation, Templates, TemplateFnReturnType>): PaginationStories {
  const render = templateContainer.render(storyTemplates, (args: PaginationArgs, { paginationTemplate }) =>
    paginationTemplate(paginationArgsMapper(args)),
  );
  return {
    Pagination: {
      args: {
        totalPages: 16,
        currentPage: 8,
      },
      render,
    },
    PaginationWithoutTotal: {
      args: {
        currentPage: 8,
      },
      render,
    },
  };
}
