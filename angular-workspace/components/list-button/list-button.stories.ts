import { type Meta, moduleMetadata } from "@storybook/angular";
import { ListButtonArgs, listButtonMeta, listButtonStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/list-button/readme.md?raw";

import { DsoListButton } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { TrustHtmlPipe } from "../trust-html.pipe";

const meta: Meta<ListButtonArgs> = {
  ...listButtonMeta({ readme }),
  title: "List Button",
  decorators: [
    moduleMetadata({
      imports: [DsoListButton, TrustHtmlPipe],
    }),
  ],
};

export default meta;

const { SingleSelect, MultiSelect } = listButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listButtonTemplate } = templates;

    return {
      listButtonTemplate,
    };
  },
});

export { MultiSelect, SingleSelect };
