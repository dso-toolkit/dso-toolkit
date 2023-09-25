import { WebComponentsRenderer } from "@storybook/web-components";

import { BadgeArgs, badgeArgsMapper } from "./badge.args.js";
import { Badge } from "./badge.models.js";

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
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, BadgeTemplates<TemplateFnReturnType>> {}

interface BadgeTemplates<TemplateFnReturnType> {
  badgeTemplate: (badgeProperties: Badge) => TemplateFnReturnType;
}

export function badgeStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: BadgeStoriesParameters<Implementation, Templates, TemplateFnReturnType>): BadgeStories {
  return {
    Plain: {
      args: {
        message: "Plain",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Primary: {
      args: {
        status: "primary",
        message: "Primary",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Success: {
      args: {
        status: "success",
        message: "Success",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Info: {
      args: {
        status: "info",
        message: "Info",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Warning: {
      args: {
        status: "warning",
        message: "Warning",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Danger: {
      args: {
        status: "danger",
        message: "Danger",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Error: {
      args: {
        status: "error",
        message: "Error",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Outline: {
      args: {
        status: "outline",
        message: "Outline",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
    Attention: {
      args: {
        status: "attention",
        message: "Attention",
      },
      render: templateContainer.render(storyTemplates, (args, { badgeTemplate }) =>
        badgeTemplate(badgeArgsMapper(args))
      ),
    },
  };
}
