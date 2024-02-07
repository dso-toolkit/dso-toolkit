// import { storiesOf } from "@storybook/angular";

// import { storiesOfHelpcenterPanel } from "dso-toolkit";
// import { templateContainer } from "../../templates";

// import readme from "./readme.md?raw";

import type { Meta } from "@storybook/web-components";

import { HelpcenterPanelArgs, helpcenterPanelMeta, helpcenterPanelStories } from "dso-toolkit";
import { DsoHelpcenterPanel } from "../../projects/component-library/src/public-api";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<HelpcenterPanelArgs> = {
  ...helpcenterPanelMeta({ readme }),
  title: "Helpcenter Panel",
  parameters: [
    {
      component: DsoHelpcenterPanel,
    },
  ],
};

export default meta;

const { HelpcenterPanel } = helpcenterPanelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { helpcenterPanelTemplate } = templates;

    return {
      helpcenterPanelTemplate,
    };
  },
});

export { HelpcenterPanel };

// storiesOfHelpcenterPanel({
//   parameters: {
//     module,
//     storiesOf,
//     readme,
//     storyApiOptions: {
//       parameters: [
//         {
//           component: DsoHelpcenterPanel,
//         },
//       ],
//     },
//   },
//   templateContainer,
//   storyTemplates: ({ helpcenterPanelTemplate }) => ({ helpcenterPanelTemplate }),
// });
