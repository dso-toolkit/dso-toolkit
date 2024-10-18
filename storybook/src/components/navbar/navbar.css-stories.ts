import type { Meta } from "@storybook/web-components";

import { NavbarArgs, navbarMeta, navbarStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/navbar/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<NavbarArgs> = {
  ...navbarMeta({ readme }),
  title: "HTML|CSS/Navbar",
};

export default meta;

const { Primary, Secondary, WithExtension } = navbarStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { navbarTemplate, markBarTemplate } = templates;

    return {
      navbarTemplate,
      extension: markBarTemplate({ label: "Zoeken", current: 1, totalCount: 10 }),
    };
  },
});

export { Primary, Secondary, WithExtension };
