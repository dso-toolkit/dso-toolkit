import type { Meta } from "@storybook/web-components";
import { RenvooiArgs, renvooiMeta, renvooiStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/renvooi/readme.md?raw";

const meta: Meta<RenvooiArgs> = {
  ...renvooiMeta({ readme }),
  title: "Core/Renvooi",
};

export default meta;

const { Default } = renvooiStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { renvooiTemplate } = templates;

    return {
      renvooiTemplate,
    };
  },
});

export { Default };
