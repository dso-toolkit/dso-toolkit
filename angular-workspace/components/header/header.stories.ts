import { moduleMetadata, storiesOf } from "@storybook/angular";

import { storiesOfHeader } from "dso-toolkit";

import { DsoHeader } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { TrustUrlPipe } from "../trust-url.pipe";

import readme from "./readme.md";

storiesOfHeader({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoHeader,
        },
      ],
      decorators: [
        moduleMetadata({
          declarations: [TrustUrlPipe],
        }),
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ headerTemplate }) => ({ headerTemplate }),
});
