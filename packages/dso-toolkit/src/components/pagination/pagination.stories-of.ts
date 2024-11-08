import { ComponentAnnotations, Renderer } from "@storybook/types";

import { PaginationArgs, paginationArgsMapper, paginationArgTypes } from "./pagination.args.js";
import { Pagination } from "./pagination.models.js";
import { StoriesParameters, StoryObj } from "../../template-container";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { compiler } from "markdown-to-jsx";

interface PaginationStories {
  Pagination: StoryObj<PaginationArgs, Renderer>;
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
  return {
    Pagination: {
      args: {
        totalPages: 16,
        currentPage: 8,
      },
      argTypes: {
        totalPages: {
          control: { type: "number", min: 1 },
        },
        currentPage: {
          control: { type: "number", min: 1 },
        },
      },
      render: templateContainer.render(storyTemplates, (args, { paginationTemplate }) =>
        paginationTemplate(paginationArgsMapper(args)),
      ),
    },
  };
}
