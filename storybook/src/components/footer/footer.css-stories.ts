import type { Meta } from "@storybook/web-components";
import { footerMeta, footerStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/footer/readme.md?raw";

import { templateContainer } from "../../templates";

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
