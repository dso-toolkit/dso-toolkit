import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { LabelArgs, labelArgTypes, labelArgsMapper } from "./label.args.js";
import { Label } from "./label.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { css } from "./label.demo.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

export type LabelDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type LabelStory = StoryObj<LabelArgs, Renderer>;

interface LabelStories {
  Plain: LabelStory;
  WithAction: LabelStory;
  Truncate: LabelStory;
  WithSymbolImage: LabelStory;
  WithSymbolColor: LabelStory;
}

interface LabelStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, LabelTemplates<TemplateFnReturnType>> {
  decorator: LabelDecorator<TemplateFnReturnType>;
}

interface LabelTemplates<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
}

export function labelMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LabelArgs
> {
  return {
    argTypes: labelArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function labelStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: LabelStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LabelStories {
  return {
    Plain: {
      args: {
        label: "Label",
      },
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args))
      ),
    },
    WithAction: {
      args: {
        label: "Label",
        removable: true,
      },
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args))
      ),
    },
    Truncate: {
      args: {
        label: "Een hele lange label die je eigenlijk visueel wil afbreken.",
        truncate: true,
      },
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args))
      ),
    },
    WithSymbolImage: {
      args: {
        label: "Label",
        status: "bright",
        symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>',
      },
      decorators: [(story) => decorator(story, css)],
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args))
      ),
    },
    WithSymbolColor: {
      args: {
        label: "Label",
        status: "bright",
        symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
      },
      decorators: [(story) => decorator(story, css)],
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args))
      ),
    },
  };
}

// export function storiesOfLabel<Implementation, Templates, TemplateFnReturnType>(
//   storiesOfArguments: StoriesOfArguments<
//     Implementation,
//     Templates,
//     TemplateFnReturnType,
//     LabelTemplates<TemplateFnReturnType>
//   >,
//   { decorator }: LabelParameters<TemplateFnReturnType>
// ) {
//   return storiesOfFactory("Label", storiesOfArguments, (stories, templateMapper) => {
//     stories
//       .addParameters({
//         argTypes: labelArgTypes,
//         args: {
//           label: "Label",
//         },
//       })
//       .addDecorator((story) => decorator(story, css));

//     const template = templateMapper<LabelArgs>((args, { labelTemplate }) => labelTemplate(labelArgsMapper(args)));

//     stories.add("default", template);

//     stories.add("with action", template, {
//       args: {
//         removable: true,
//         button: {
//           title: "Verwijder",
//           icon: "times",
//           onClick: action("Clicked remove"),
//         },
//       },
//     });

//     stories.add("truncate", template, {
//       args: {
//         label: "Een hele lange label die je eigenlijk visueel wil afbreken.",
//         truncate: true,
//         button: {
//           title: "Verwijder",
//           icon: "times",
//           onClick: action("Clicked remove"),
//         },
//       },
//     });

//     stories.add("with symbol (image)", template, {
//       args: {
//         status: "bright",
//         symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>',
//       },
//     });

//     stories.add("with symbol (color)", template, {
//       args: {
//         status: "bright",
//         symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
//       },
//     });

//     return stories;
//   });
// }
