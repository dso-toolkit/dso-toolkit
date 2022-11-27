import { storiesOf } from "@storybook/angular";

import { storiesOfBadge } from "../../../sources";
import { templateContainer } from "../../templates";
import { DsoBadge } from "../../projects/component-library/src/public-api";

import cssReadme from "./readme.md";

storiesOfBadge(
  {
    parameters: {
      module,
      storiesOf,
      readme: cssReadme,
    },
    templateContainer,
    storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
  },
  { component: DsoBadge }
);
