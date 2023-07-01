import { storiesOf } from "@storybook/angular";

import { storiesOfBadge } from "dso-toolkit";
import { DsoBadge } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfBadge({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoBadge,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
});
