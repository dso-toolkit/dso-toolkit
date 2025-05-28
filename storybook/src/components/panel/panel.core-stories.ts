import readme from "@dso-toolkit/core/src/components/panel/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { PanelArgs, panelMeta, panelStories } from "dso-toolkit";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta<PanelArgs> = {
  ...panelMeta({ readme }),
  title: "Core/Panel",
};

export default meta;

const { Default, Emphasized } = panelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { panelTemplate, richContentTemplate } = templates;

    return {
      panelTemplate,
      heading: html`<h2 slot="heading">Panel titel</h2>`,
      children: richContentTemplate({
        children: html`
          <ul>
            <li>Locatie 1</li>
            <li>
              Locatie 2
              <div class="dso-info">
                ${richContentTemplate({
                  children: html`<p><strong>Let op:</strong> <i>voorbehoud A bij Locatie 2.</i></p>`,
                })}
              </div>
            </li>
            <li>
              Locatie 3
              <ul>
                <li>Locatie 3.1</li>
                <li>Locatie 3.2</li>
              </ul>
            </li>
          </ul>
        `,
      }),
    };
  },
});

export { Default, Emphasized };
