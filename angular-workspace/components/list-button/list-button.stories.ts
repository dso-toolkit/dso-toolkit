import { type Meta, moduleMetadata } from "@storybook/angular";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/list-button/readme.md?raw";
import { ListButtonArgs, listButtonMeta, listButtonStories } from "dso-toolkit";

import { TrustHtmlPipe } from "../trust-html.pipe";

const meta: Meta<ListButtonArgs> = {
  ...listButtonMeta({ readme }),
  title: "List Button",
  decorators: [
    moduleMetadata({
      imports: [TrustHtmlPipe],
    }),
  ],
};

export default meta;

const { SingleSelect, MultiSelect, CssLegacyReadonlyCount } = listButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listButtonTemplate } = templates;

    return {
      listButtonTemplate,
    };
  },
});

export { SingleSelect, MultiSelect, CssLegacyReadonlyCount };
