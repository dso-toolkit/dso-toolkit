import { moduleMetadata } from "@storybook/angular";
// eslint-disable-next-line no-duplicate-imports -- Todo: #2593
import type { Meta } from "@storybook/angular";
import { HeaderArgs, headerMeta, headerStories } from "dso-toolkit";
import { DsoHeader } from "../../projects/component-library/src/public-api";

import { templateContainer } from "../../templates";
import { TrustUrlPipe } from "../trust-url.pipe";

import readme from "./readme.md?raw";

const meta: Meta<HeaderArgs> = {
  ...headerMeta({ readme }),
  title: "Header",
  decorators: [
    moduleMetadata({
      declarations: [TrustUrlPipe],
    }),
  ],
  parameters: [
    {
      component: DsoHeader,
    },
  ],
};

export default meta;

const { Default, WithLabel, WithRibbon, WithLabelAndRibbon, UserHomeActive, WithLinkToHelp, WithButtonToHelp } =
  headerStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { headerTemplate } = templates;

      return {
        headerTemplate,
      };
    },
  });

export { Default, WithLabel, WithRibbon, WithLabelAndRibbon, UserHomeActive, WithLinkToHelp, WithButtonToHelp };

// storiesOfHeader({
//   parameters: {
//     module,
//     storiesOf,
//     readme,
//     storyApiOptions: {
//       parameters: [
//         {
//           component: DsoHeader,
//         },
//       ],
//       decorators: [
//         moduleMetadata({
//           declarations: [TrustUrlPipe],
//         }),
//       ],
//     },
//   },
//   templateContainer,
//   storyTemplates: ({ headerTemplate }) => ({ headerTemplate }),
// });
