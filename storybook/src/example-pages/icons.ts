import { html } from "lit-html";

import { examplePageFactory } from "../example-page-factory";

examplePageFactory(
  null,
  "Iconen",
  ({ iconTemplate }) => html`
    <ul style="display: flex; flex-wrap: wrap; list-style: none; padding: 0; margin: 16px auto; width: 50%; gap: 4px;">
      ${process.env.ICONS?.split(",").map(
        (icon) =>
          html`<li style="flex: 0 0 calc(25% - 4px); text-align: center; padding: 8px; background-color: #efefef;">
            ${iconTemplate({ icon })}
            <br /><code>${icon}</code>
          </li>`
      )}
    </ul>
  `
);
