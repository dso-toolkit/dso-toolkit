import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/footer/readme.md?raw";
import { footerMeta, footerStories } from "dso-toolkit";
import { children } from "./footer.content";

const meta: Meta = {
  ...footerMeta({ readme }),
  title: "HTML|CSS/Footer",
};

export default meta;

const { Footer } = footerStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { footerTemplate } = templates;

    return {
      footerTemplate,
      children: children(templates),
    };
  },
});

export { Footer };
