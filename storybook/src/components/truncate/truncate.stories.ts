import readme from "@dso-toolkit/core/src/components/truncate/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { TruncateArgs } from "./truncate.args.js";
import { ingekortContent, ingekortMetRenvooiContent, passendContent } from "./truncate.content.js";
import { decorator } from "./truncate.decorator.js";
import { truncateTemplate } from "./truncate.template.js";

type TruncateStory = StoryObj<TruncateArgs>;

const meta: Meta<TruncateArgs> = {
  title: "Core/Truncate",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: ({ content }) => truncateTemplate({ children: content }),
};

export default meta;

export const Passend: TruncateStory = {
  args: {
    content: passendContent,
  },
  decorators: [decorator],
};

export const Ingekort: TruncateStory = {
  args: {
    content: ingekortContent,
  },
  decorators: [decorator],
};

export const IngekortMetRenvooi: TruncateStory = {
  args: {
    content: ingekortMetRenvooiContent,
  },
  decorators: [decorator],
};
