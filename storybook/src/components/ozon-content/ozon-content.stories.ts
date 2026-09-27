import readme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { OzonContentArgs, ozonContentArgTypes, ozonContentArgsMapper } from "./ozon-content.args.js";
import { content } from "./ozon-content.content.js";
import { ozonContentTemplate } from "./ozon-content.template.js";

type OzonContentStory = StoryObj<OzonContentArgs>;

const meta: Meta<OzonContentArgs> = {
  title: "Core/Ozon Content",
  argTypes: ozonContentArgTypes,
  render: (args) => ozonContentTemplate(ozonContentArgsMapper(args)),
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const storyArgs = (title: string): OzonContentArgs => {
  const story = content().find((item) => item.title === title);

  if (!story) {
    throw new Error(`Unknown Ozon Content story: ${title}`);
  }

  return {
    dsoClick: fn(),
    dsoOzonContentMarkItemHighlight: fn(),
    content: story.content,
    inline: false,
    annotated: title === "IntIoRef",
    ...story.args,
  };
};

export const Abbr: OzonContentStory = { args: storyArgs("Abbr") };
export const Al: OzonContentStory = { args: storyArgs("Al") };
export const Begrippenlijst: OzonContentStory = { args: storyArgs("Begrippenlijst") };
export const ComplexeTableZonderColsepEnMetRowsep: OzonContentStory = {
  args: storyArgs("ComplexeTableZonderColsepEnMetRowsep"),
};
export const ExtIoRef: OzonContentStory = { args: storyArgs("ExtIoRef") };
export const ExtRef: OzonContentStory = { args: storyArgs("ExtRef") };
export const Figuur: OzonContentStory = { args: storyArgs("Figuur") };
export const Inhoud: OzonContentStory = { args: storyArgs("Inhoud") };
export const InhoudAlNoot: OzonContentStory = { args: storyArgs("InhoudAlNoot") };
export const IntIoRef: OzonContentStory = { args: storyArgs("IntIoRef") };
export const IntIoRefNotAnnotated: OzonContentStory = { args: storyArgs("IntIoRefNotAnnotated") };
export const IntRef: OzonContentStory = { args: storyArgs("IntRef") };
export const IntRefBegrip: OzonContentStory = { args: storyArgs("IntRefBegrip") };
export const Kop: OzonContentStory = { args: storyArgs("Kop") };
export const KopMetRenvooi: OzonContentStory = { args: storyArgs("KopMetRenvooi") };
export const Lijst: OzonContentStory = { args: storyArgs("Lijst") };
export const RenvooiWeergave: OzonContentStory = { args: storyArgs("RenvooiWeergave") };
export const Table: OzonContentStory = { args: storyArgs("Table") };
export const TableMetBron: OzonContentStory = { args: storyArgs("TableMetBron") };
export const TableMetNoot: OzonContentStory = { args: storyArgs("TableMetNoot") };
export const TableMetThead: OzonContentStory = { args: storyArgs("TableMetThead") };
export const TableZonderColsepEnMetRowsep: OzonContentStory = {
  args: storyArgs("TableZonderColsepEnMetRowsep"),
};
