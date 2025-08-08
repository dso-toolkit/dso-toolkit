import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { PaginationArgs, paginationArgTypes, paginationArgsMapper } from "./pagination.args";
import { Pagination } from "./pagination.models.js";

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
    args: {
      dsoSelectPage: fn(),
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
