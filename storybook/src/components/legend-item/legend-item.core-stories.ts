import type { Meta } from "@storybook/web-components";
import { LegendItemArgs, legendItemMeta, legendItemStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { defaultSymbol } from "./legend-item.content";

import { decorator } from "./legend-item.decorator";

import readme from "@dso-toolkit/core/src/components/legend-item/readme.md?raw";
import { html } from "lit-html";

const meta: Meta<LegendItemArgs> = {
  ...legendItemMeta({ readme }),
  title: "Core/Legend Item",
};

export default meta;

const { Default, WithSelectable, Removable, WithSelectables, WithInputRange } = legendItemStories({
  templateContainer,
  storyTemplates: ({ legendItemTemplate, selectableTemplate, inputRangeTemplate }) => {
    function selectableDemo(label: string, disabled: boolean) {
      return selectableTemplate({
        type: "checkbox",
        id: "1",
        value: "1",
        label,
        disabled,
      });
    }

    const bodyWithSelectables = html`<fieldset>
      <legend>Wijzig eigenschap</legend>
      <div>
        ${selectableTemplate({ type: "radio", id: "waarde1", value: "waarde1", label: "Waarde één" })}
        ${selectableTemplate({ type: "radio", id: "waarde2", value: "waarde2", label: "Waarde twee" })}
        ${selectableTemplate({ type: "radio", id: "waarde3", value: "waarde3", label: "Waarde drie" })}
      </div>
    </fieldset>`;

    const bodyWithInputRange = inputRangeTemplate({ label: "Transparantie", unit: "%" });

    return {
      legendItemTemplate,
      bodyWithSelectables,
      bodyWithInputRange,
      defaultSymbol,
      selectableDemo,
    };
  },
  decorator,
});

export { Default, WithSelectable, Removable, WithSelectables, WithInputRange };
