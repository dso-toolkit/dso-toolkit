import readme from "@dso-toolkit/core/src/components/selectable/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { v4 as uuidv4 } from "uuid";

import { StoryObj } from "../../shared/story-obj.js";

import { SelectableArgs, selectableArgTypes, selectableArgsMapper } from "./selectable.args.js";
import { infoRichContent } from "./selectable.content.js";
import { Selectable } from "./selectable.models.js";
import { selectableTemplate } from "./selectable.template.js";

type SelectableStory = StoryObj<SelectableArgs<TemplateResult>, Renderer>;

const meta: Meta<SelectableArgs<TemplateResult>> = {
  title: "Core/Selectable",
  argTypes: selectableArgTypes,
  args: {
    type: "radio",
    checked: false,
    disabled: false,
    id: uuidv4(),
    indeterminate: false,
    infoActive: false,
    infoFixed: false,
    invalid: false,
    label: "Label",
    required: false,
    value: "the-value",
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: SelectableArgs<TemplateResult>) =>
  selectableTemplate(selectableArgsMapper(args, infoRichContent));

export const Radio: SelectableStory = {
  args: {
    type: "radio",
  },
  render,
};

export const Checkbox: SelectableStory = {
  args: {
    type: "checkbox",
  },
  render,
};

export const WithInfo: SelectableStory = {
  args: {
    infoFixed: false,
  },
  render,
};

export const Nested: SelectableStory = {
  args: {
    options: [
      {
        value: "1.1",
        type: "checkbox",
        label: "Optie op niveau 1 - keuze 1",
        id: "checkbox-sub-1-1",
        name: "checkbox-sub-1",
        checked: true,
        info: {
          active: true,
          content:
            '<div class="dso-rich-content" slot="info"><h4>Toelichting bij antwoord: "Optie op niveau 1 - keuze 1"</h4><p>Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk het Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.</p></div>',
        },
        options: [
          {
            value: "1.1.1",
            type: "checkbox",
            label: "Optie op niveau 1.1 - keuze 1",
            id: "checkbox-sub-1-1-1",
            name: "checkbox-sub-1-1",
          },
          {
            value: "1.1.2",
            type: "checkbox",
            label: "Optie op niveau 1.1 - keuze 2",
            id: "checkbox-sub-1-1-2",
            name: "checkbox-sub-1-1",
          },
        ],
      },
      {
        value: "1.2",
        type: "checkbox",
        label: "Optie op niveau 1 - keuze 2",
        id: "checkbox-sub-1-2",
        name: "checkbox-sub-1",
        options: [
          {
            value: "1.2.1",
            type: "checkbox",
            label: "Optie op niveau 1.2 - keuze 1",
            id: "checkbox-sub-1-2-1",
            name: "checkbox-sub-1-2",
          },
          {
            value: "1.2.2",
            type: "checkbox",
            label: "Optie op niveau 1.2 - keuze 2",
            id: "checkbox-sub-1-2-2",
            name: "checkbox-sub-1-2",
          },
        ],
      },
      {
        value: "1.3",
        type: "checkbox",
        label: "Optie op niveau 1 - keuze 3",
        id: "checkbox-sub-1-3",
        name: "checkbox-sub-1",
        options: [
          {
            value: "1.3.1",
            type: "radio",
            label: "Optie op niveau 1.3 - keuze 1",
            id: "radio-sub-1-3-1",
            name: "radio-sub-1-3",
          },
          {
            value: "1.3.2",
            type: "radio",
            label: "Optie op niveau 1.3 - keuze 2",
            id: "radio-sub-1-3-2",
            name: "radio-sub-1-3",
          },
        ],
      },
      {
        value: "1.4",
        type: "checkbox",
        label: "Optie op niveau 1 - keuze 4",
        id: "checkbox-sub-1-4",
        name: "checkbox-sub-1",
      },
    ] satisfies Selectable<TemplateResult>[],
  },
  render,
};
