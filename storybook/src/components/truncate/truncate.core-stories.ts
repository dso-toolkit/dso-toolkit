import type { Meta } from "@storybook/web-components-vite";
import { truncateMeta, truncateStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  ingekortContent,
  ingekortMetRenvooiContent,
  passendContent,
  renvooiWijzigingNaLadenContent,
} from "./truncate.content";
import { decorator } from "./truncate.decorator";

const meta: Meta = {
  ...truncateMeta(),
  title: "Core/Truncate",
};

export default meta;

const { Passend, Ingekort, IngekortMetRenvooi, RenvooiWijzigingNaLaden } = truncateStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { truncateTemplate } = templates;

    return {
      truncateTemplate,
      passendContent,
      ingekortContent,
      ingekortMetRenvooiContent,
      renvooiWijzigingNaLadenContent,
    };
  },
  decorator,
});

export { Ingekort, IngekortMetRenvooi, Passend, RenvooiWijzigingNaLaden };
