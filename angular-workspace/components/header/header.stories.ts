import { moduleMetadata, storiesOf } from "@storybook/angular";
import { SanitizeUrlPipe } from "../../components/sanitize-url.pipe";

import { storiesOfHeader } from "dso-toolkit";
import { DsoHeader } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

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
          declarations: [SanitizeUrlPipe],
        }),
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ headerTemplate }) => ({ headerTemplate }),
});
