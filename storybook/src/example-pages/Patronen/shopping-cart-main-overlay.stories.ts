import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";

const meta: Meta = {
  title: "Patronen/Shopping Cart Main Overlay",
};

export default meta;

const ShoppingCartMainOverlay = examplePageStories((templates) => {
  const { gridColumnTemplate, shoppingCartTemplate } = templates;

  return html`
    <div class="container">
      <main>
        <h1>Shopping Cart Main Overlay</h1>
        <p>
          De shopping cart in de "main" variant kan gebruikt worden als overlay modal. Dit patroon toont hoe je dit
          instelt met behulp van het
          <code>gridColumnTemplate</code> met de <code>overlay</code> property.
        </p>

        <div class="row">
          ${gridColumnTemplate({
            columns: "xs-12",
            overlay: true,
            content: shoppingCartTemplate({
              variant: "main",
              shoppingcartTitle: "Winkelwagen",
              items: [
                {
                  label: "Item 1",
                  variant: "main",
                },
                {
                  label: "Item 2",
                  variant: "main",
                },
                {
                  label: "Item 3",
                  variant: "main",
                },
              ],
            }),
          })}
        </div>
      </main>
    </div>
  `;
});

export const Default = ShoppingCartMainOverlay;
