import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import { type Meta, moduleMetadata } from "@storybook/angular";
import { Icon, IconArgs, iconMeta, iconStories } from "dso-toolkit";
import icons from "dso-toolkit/storybook-assets/icons.json";

import { DsoIcon } from "../../projects/component-library/src/public-api";
import { AngularTemplateFunction, SlottableTemplate } from "../../templates";

import { iconTemplate } from "./icon.angular-template";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoIcon],
    }),
  ],
  title: "Icon",
};

export default meta;

const { Default } = iconStories({
  storyTemplates: (): {
    iconTemplate: AngularTemplateFunction<
      Icon & SlottableTemplate,
      {
        props: Icon & SlottableTemplate;
        template: string;
      }
    >;
  } => {
    return {
      iconTemplate,
    };
  },
  icons,
});

export { Default };
