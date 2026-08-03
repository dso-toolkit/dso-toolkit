import readme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { OzonContentArgs, ozonContentArgTypes, ozonContentArgsMapper } from "./ozon-content.args.js";
import { content } from "./ozon-content.content.js";
import { ozonContentTemplate } from "./ozon-content.template.js";

type OzonContentStory = StoryObj<OzonContentArgs, Renderer>;

const meta: Meta<OzonContentArgs> = {
  title: "Core/Ozon Content",
  argTypes: ozonContentArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: OzonContentArgs) => ozonContentTemplate(ozonContentArgsMapper(args));
const storyArgs = (title: string): OzonContentArgs => {
  const story = content.find((item) => item.title === title);

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

export const Abbr: OzonContentStory = { args: storyArgs("Abbr"), render };
export const Al: OzonContentStory = { args: storyArgs("Al"), render };
export const Begrippenlijst: OzonContentStory = { args: storyArgs("Begrippenlijst"), render };
export const ComplexeTableZonderColsepEnMetRowsep: OzonContentStory = {
  args: storyArgs("ComplexeTableZonderColsepEnMetRowsep"),
  render,
};
export const ExtIoRef: OzonContentStory = { args: storyArgs("ExtIoRef"), render };
export const ExtRef: OzonContentStory = { args: storyArgs("ExtRef"), render };
export const Figuur: OzonContentStory = { args: storyArgs("Figuur"), render };
export const Inhoud: OzonContentStory = { args: storyArgs("Inhoud"), render };
export const InhoudAlNoot: OzonContentStory = { args: storyArgs("InhoudAlNoot"), render };
export const IntIoRef: OzonContentStory = { args: storyArgs("IntIoRef"), render };
export const IntIoRefNotAnnotated: OzonContentStory = { args: storyArgs("IntIoRefNotAnnotated"), render };
export const IntRef: OzonContentStory = { args: storyArgs("IntRef"), render };
export const IntRefBegrip: OzonContentStory = { args: storyArgs("IntRefBegrip"), render };
export const Kop: OzonContentStory = { args: storyArgs("Kop"), render };
export const KopMetRenvooi: OzonContentStory = { args: storyArgs("KopMetRenvooi"), render };
export const Lijst: OzonContentStory = { args: storyArgs("Lijst"), render };
export const RenvooiWeergave: OzonContentStory = { args: storyArgs("RenvooiWeergave"), render };
export const Table: OzonContentStory = { args: storyArgs("Table"), render };
export const TableMetBron: OzonContentStory = { args: storyArgs("TableMetBron"), render };
export const TableMetNoot: OzonContentStory = { args: storyArgs("TableMetNoot"), render };
export const TableMetThead: OzonContentStory = { args: storyArgs("TableMetThead"), render };
export const TableZonderColsepEnMetRowsep: OzonContentStory = {
  args: storyArgs("TableZonderColsepEnMetRowsep"),
  render,
};
