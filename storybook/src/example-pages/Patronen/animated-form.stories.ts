import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";

import { applicationHeadingTemplate } from "../../components/application-heading/application-heading.template.js";
import { formGroupInputTemplate } from "../../components/form-group/form-group-input.template.js";
import { examplePageStory } from "../../example-page-story.js";
import { header } from "../content/header.content.js";
import { mainMenu } from "../content/main-menu.content.js";
import { footerPartial } from "../partials/footer.js";
import { headerPartial } from "../partials/header.js";

import { getAnimatedFormContent } from "./animated-form.content.js";

const meta: Meta = {
  title: "Patronen/Animated Form",
};

export default meta;

export const AnimatedForm = examplePageStory(() => {
  const content = getAnimatedFormContent();

  const template = (): TemplateResult => html`
    <form class="form-horizontal">
      ${applicationHeadingTemplate({
        title: "Aanvragen",
        subtitle: "1. Project",
        step: "Stap 1/7",
      })}
      ${formGroupInputTemplate({
        group: "input",
        id: "vraag-1",
        type: "text",
        label: "Wat is de naam van uw project?",
      })}
      ${formGroupInputTemplate({
        group: "input",
        id: "vraag-2",
        type: "text",
        label: "Projectomschrijving",
      })}
      ${content}
      <div class="dso-form-buttons">
        <button type="button" class="dso-primary">
          <span>Verzenden</span>
        </button>
      </div>
    </form>
  `;

  return html`
    <div class="container">
      ${headerPartial({
        ...header,
        mainMenu: mainMenu("Aanvragen"),
      })}
      <main>${template()}</main>
      ${footerPartial()}
    </div>
  `;
});
