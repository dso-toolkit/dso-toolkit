import type { Meta } from "@storybook/web-components";
import { badgeArgTypes, badgeStories, badgeArgs } from "dso-toolkit";

// import { storiesOfBadge, StoryRoot } from "dso-toolkit";
// import { storiesOf } from "@storybook/web-components";

// import cssReadme from "dso-toolkit/src/components/badge/readme.md?raw";
// import coreReadme from "@dso-toolkit/core/src/components/badge/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-alert",
  title: "HTML|CSS/Alert",
  args: badgeArgs,
  argTypes: badgeArgTypes,
};

export default meta;

const { Primary, Success, Info, Warning, Error, Danger, Outline, Attention } = badgeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { badgeTemplate } = templates;

    return {
      badgeTemplate,
    };
  },
});

export { Primary, Success, Info, Warning, Error, Danger, Outline, Attention };

// storiesOfBadge({
//   parameters: {
//     storiesOf,
//     module,
//     readme: cssReadme,
//     root: StoryRoot.HtmlCss,
//   },
//   templateContainer,
//   storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
// });

// storiesOfBadge({
//   parameters: {
//     module,
//     storiesOf,
//     readme: coreReadme,
//     root: StoryRoot.Core,
//   },
//   templateContainer,
//   storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
// });
