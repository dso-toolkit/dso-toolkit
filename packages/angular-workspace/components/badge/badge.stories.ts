import { storiesOf } from "@storybook/angular";

import { storiesOfBadge } from "../../../sources";
import { DsoBadge } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

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
