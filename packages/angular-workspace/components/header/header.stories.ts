import { moduleMetadata, storiesOf } from "@storybook/angular";
import { SanitizeUrlPipe } from "projects/component-library/src/lib/sanitize-url.pipe";

import { storiesOfHeader } from "../../../sources";
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
