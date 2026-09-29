import readme from "@dso-toolkit/core/src/components/truncate/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import {
  ingekortContent,
  ingekortMetRenvooiContent,
  passendContent,
  renvooiWijzigingNaLadenContent,
} from "./truncate.content.js";
import { decorator } from "./truncate.decorator.js";
import { truncateTemplate } from "./truncate.template.js";

type TruncateStory = StoryObj;

const meta: Meta = {
  title: "Core/Truncate",
  decorators: [decorator],
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Passend: TruncateStory = {
  render: () => truncateTemplate(passendContent),
};

export const Ingekort: TruncateStory = {
  render: () => truncateTemplate(ingekortContent),
};

export const IngekortMetRenvooi: TruncateStory = {
  render: () => truncateTemplate(ingekortMetRenvooiContent),
};

export const RenvooiWijzigingNaLaden: TruncateStory = {
  render: () => truncateTemplate(renvooiWijzigingNaLadenContent),
};
