import { WebComponentsRenderer } from "@storybook/web-components";

import { BreadcrumbsArgs, breadcrumbsArgsMapper } from "./breadcrumbs.args.js";
import { Breadcrumbs } from "./breadcrumbs.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";

type BreadcrumbsStory = StoryObj<BreadcrumbsArgs, WebComponentsRenderer>;

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
