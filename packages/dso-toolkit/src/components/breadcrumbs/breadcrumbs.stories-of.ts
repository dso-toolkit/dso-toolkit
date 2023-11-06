import { ComponentAnnotations, Renderer } from "@storybook/types";

import { BreadcrumbsArgs, breadcrumbsArgTypes, breadcrumbsArgsMapper } from "./breadcrumbs.args.js";
import { Breadcrumbs } from "./breadcrumbs.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type BreadcrumbsStory = StoryObj<BreadcrumbsArgs, Renderer>;

interface BreadcrumbsStories {
  Breadcrumb: BreadcrumbsStory;
}

interface BreadcrumbsStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    BreadcrumbsTemplates<TemplateFnReturnType>
  > {}

interface BreadcrumbsTemplates<TemplateFnReturnType> {
  breadcrumbsTemplate: (breadcrumbsProperties: Breadcrumbs) => TemplateFnReturnType;
}

export function breadcrumbsMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  BreadcrumbsArgs
> {
  return {
    argTypes: breadcrumbsArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function breadcrumbsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: BreadcrumbsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): BreadcrumbsStories {
  return {
    Breadcrumb: {
      args: {
        breadcrumbs: [
          {
            label: "Home",
            url: "#",
          },
          {
            label: "Zelf aan de slag",
            url: "#",
          },
          {
            label: "Inhoud",
          },
        ],
      },
      render: templateContainer.render(storyTemplates, (args, { breadcrumbsTemplate }) =>
        breadcrumbsTemplate(breadcrumbsArgsMapper(args))
      ),
    },
  };
}
