// import { action } from "@storybook/addon-actions";
// import { Addon_PartialStoryFn } from "@storybook/types";

import { WebComponentsRenderer } from "@storybook/web-components";

import { LabelArgs, labelArgsMapper } from "./label.args.js";
import { Label } from "./label.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";

type LabelStory = StoryObj<LabelArgs, WebComponentsRenderer>;

interface LabelStories {
  Plain: LabelStory;
  WithAction: LabelStory;
  Truncate: LabelStory;
  WithSymbolImage: LabelStory;
  WithSymbolColor: LabelStory;
}

// export interface LabelParameters<TemplateFnReturnType> {
//   decorator: (story: Addon_PartialStoryFn<TemplateFnReturnType>, css: string) => TemplateFnReturnType;
// }

interface LabelStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, LabelTemplates<TemplateFnReturnType>> {}

interface LabelTemplates<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
}

export function labelStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
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
        // button: {
        //   title: "Verwijder",
        //   icon: "times",
        //   onClick: action("Clicked remove"),
        // },
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
