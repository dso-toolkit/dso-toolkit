import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { ProjectItemArgs, projectItemArgTypes, projectItemArgs, projectItemArgsMapper } from "./project-item.args.js";
import { ProjectItem } from "./project-item.models.js";

type ProjectItemStory = StoryObj<ProjectItemArgs, Renderer>;

interface ProjectItemStories {
  Default: ProjectItemStory;
}

interface ProjectItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ProjectItemTemplates<TemplateFnReturnType>
  > {}

interface ProjectItemTemplates<TemplateFnReturnType> {
  projectItemTemplate: (projectItemProperties: ProjectItem<TemplateFnReturnType | string>) => TemplateFnReturnType;
}

export function projectItemMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ProjectItemArgs
> {
  return {
    argTypes: projectItemArgTypes,
    args: projectItemArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function projectItemStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ProjectItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ProjectItemStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { projectItemTemplate }) =>
        projectItemTemplate(projectItemArgsMapper(args)),
      ),
    },
  };
}
