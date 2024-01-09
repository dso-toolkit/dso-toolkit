import { moduleMetadata, storiesOf } from "@storybook/angular";
import { storiesOfListButton } from "dso-toolkit";

import { templateContainer } from "../../templates";
import readme from "./readme.md?raw";
import { TrustHtmlPipe } from "../trust-html.pipe";

storiesOfListButton({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      decorators: [
        moduleMetadata({
          declarations: [TrustHtmlPipe],
        }),
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ listButtonTemplate }) => ({ listButtonTemplate }),
});
