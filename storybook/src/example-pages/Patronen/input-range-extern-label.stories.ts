import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";

const meta: Meta = {
  title: "Patronen/Input Range extern label",
};

export default meta;

export const ExternLabel = examplePageStories(
  () => html`
    <main style="padding:1rem;">
      <form id="test-form" class="form-horizontal">
          <div class="dso-label-container">
              <label for="input-range-transparantie" class="control-label">Transparantie</label>
          </div>
          <div class="dso-field-container">
              <dso-input-range
                id="input-range-transparantie"
                name="transparantie"
                min="0"
                max="100"
                value="50"
                step="5"
                unit="%"
              ></dso-input-range>
          </div>
        </div>
      </form>
    </main>
  `,
);
