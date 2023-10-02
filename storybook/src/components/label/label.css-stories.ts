// import { decorator } from "./label.decorator";

import type { Meta } from "@storybook/web-components";
import { labelArgTypes, labelStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-label",
  title: "HTML|CSS/Label",
  argTypes: labelArgTypes,
};

export default meta;

const { Plain, WithAction, Truncate, WithSymbolImage, WithSymbolColor } = labelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { labelTemplate } = templates;

    return {
      labelTemplate,
    };
  },
});

export { Plain, WithAction, Truncate, WithSymbolImage, WithSymbolColor };

// storiesOfLabel(
//   {
//     parameters: {
//       module,
//       storiesOf,
//       readme: cssReadme,
//       root: StoryRoot.HtmlCss,
//     },
//     templateContainer,
//     storyTemplates: ({ labelTemplate }) => ({ labelTemplate }),
//   },
//   {
//     decorator,
//   }
// );

// storiesOfLabel(
//   {
//     parameters: {
//       module,
//       storiesOf,
//       readme: coreReadme,
//       root: StoryRoot.Core,
//     },
//     templateContainer,
//     storyTemplates: ({ labelTemplate }) => ({ labelTemplate }),
//   },
//   {
//     decorator,
//   }
// );
