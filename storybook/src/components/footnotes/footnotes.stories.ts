import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/footnotes/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { footnoteTemplate } from "./footnote.template.js";
import {
  FootnotesExampleArgs,
  FootnotesListArgs,
  FootnotesReferenceArgs,
  footnotesExampleArgTypes,
  footnotesListArgTypes,
  footnotesListArgsMapper,
  footnotesReferenceArgTypes,
  footnotesReferenceArgsMapper,
} from "./footnotes.args.js";
import { footnotes } from "./footnotes.content.js";
import { footnotesTemplate } from "./footnotes.template.js";

type FootnotesExampleStory = StoryObj<FootnotesExampleArgs, Renderer>;
type FootnotesReferenceStory = StoryObj<FootnotesReferenceArgs, Renderer>;
type FootnotesListStory = StoryObj<FootnotesListArgs, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "HTML|CSS/Footnotes",
  argTypes: {},
  args: {},
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const exampleRender = (args: FootnotesExampleArgs) => html`
  <p>
    In juli 2018 is er een quick scan natuur uitgevoerd voor het plangebied${footnoteTemplate(args.footnote14)}. Dit
    onderzoek is een actualisatie van een eerder door Blom Ecologie uitgevoerd oriënterend onderzoek dat vanwege de
    datum van uitvoering haar geldigheid was verloren. In januari 2019 is dit onderzoek
    aangevuld${footnoteTemplate(args.footnote15)} met vrije kavel, welke eveneens onderdeel zijn van dit
    bestemmingsplan.
  </p>
  ${footnotesTemplate(args.footnotes)}
`;

export const Example: FootnotesExampleStory = {
  argTypes: footnotesExampleArgTypes,
  args: {
    footnote14: footnotes[0]!,
    footnote15: footnotes[1]!,
    footnotes,
  },
  render: exampleRender,
};

export const Reference: FootnotesReferenceStory = {
  argTypes: footnotesReferenceArgTypes,
  args: {
    label: footnotes[0]!.label,
    number: footnotes[0]!.number,
  },
  render: (args) => footnoteTemplate(footnotesReferenceArgsMapper(args)),
};

export const List: FootnotesListStory = {
  argTypes: footnotesListArgTypes,
  args: {
    footnotes,
  },
  render: (args) => footnotesTemplate(footnotesListArgsMapper(args)),
};
