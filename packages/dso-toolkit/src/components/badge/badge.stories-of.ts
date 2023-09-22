import { WebComponentsRenderer } from "@storybook/web-components";

import { BadgeArgs, badgeArgsMapper, badgeArgTypes } from "./badge.args.js";
import { Badge, BadgeStatus } from "./badge.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";

type BadgeStory = StoryObj<BadgeArgs, WebComponentsRenderer>;

interface BadgeStories {
  Plain: BadgeStory;
  Primary: BadgeStory;
  Success: BadgeStory;
  Info: BadgeStory;
  Warning: BadgeStory;
  Danger: BadgeStory;
  Error: BadgeStory;
  Outline: BadgeStory;
  Attention: BadgeStory;
}

interface BadgeStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, BadgeTemplates> {}

interface BadgeTemplates {
  badgeTemplate: (badgeProperties: Badge) => TemplateFnReturnType;
}

export function badgeStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: BadgeStoriesParameters<Implementation, Templates, TemplateFnReturnType>): BadgeStories {
  return {
    Plain: {
      args: {
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate })) =>
        "Plain"
      ),
    },
    Primary: {
      args: {
        status: BadgeStatus.Primary,
        message: "Primary",
      },
    },
    Success: {
      args: {
        status: BadgeStatus.Success,
        message: "Success",
      },
    },
    Info: {
      args: {
        status: BadgeStatus.Info,
        message: "Info",
      },
    },
    Warning: {
      args: {
        status: BadgeStatus.Warning,
        message: "Warning",
      },
    },
    Danger: {
      args: {
        status: BadgeStatus.Danger,
        message: "Danger",
      },
    },
    Error: {
      args: {
        status: BadgeStatus.Error,
        message: "Error",
      },
    },
    Outline: {
      args: {
        status: BadgeStatus.Outline,
        message: "Outline",
      },
    },
    Attention: {
      args: {
        status: BadgeStatus.Attention,
        message: "Attention",
      },
    },
  };
}
// export function badgeStories<Implementation, Templates, TemplateFnReturnType>(
//   storiesOfArguments: StoriesOfArguments<
//     Implementation,
//     Templates,
//     TemplateFnReturnType,
//     BadgeTemplates<TemplateFnReturnType>
//   >
// ) {
//   return storiesOfFactory("Badge", storiesOfArguments, (stories, templateMapper) => {
//     stories.addParameters({
//       argTypes: badgeArgTypes,
//     });

//     const template = templateMapper<BadgeArgs>((args, { badgeTemplate }) => badgeTemplate(badgeArgsMapper(args)));

//     stories.add("plain", template, {
//       args: {
//         message: "Plain",
//       },
//     });

//     stories.add("primary", template, {
//       args: {
//         status: "primary",
//         message: "Primary",
//       },
//     });

//     stories.add("success", template, {
//       args: {
//         status: "success",
//         message: "Success",
//       },
//     });

//     stories.add("info", template, {
//       args: {
//         status: "info",
//         message: "Info",
//       },
//     });

//     stories.add("warning", template, {
//       args: {
//         status: "warning",
//         message: "Warning",
//       },
//     });

//     stories.add("danger", template, {
//       args: {
//         status: "danger",
//         message: "Danger",
//       },
//     });

//     stories.add("error", template, {
//       args: {
//         status: "error",
//         message: "Error",
//       },
//     });

//     stories.add("outline", template, {
//       args: {
//         status: "outline",
//         message: "Outline",
//       },
//     });

//     stories.add("attention", template, {
//       args: {
//         status: "attention",
//         message: "Attention",
//       },
//     });

//     return stories;
//   });
// }
