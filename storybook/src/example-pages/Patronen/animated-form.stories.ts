import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";
import { header } from "../content/header.content";
import { mainMenu } from "../content/main-menu.content";
import { footerPartial } from "../partials/footer";
import { headerPartial } from "../partials/header";

import { getAnimatedFormContent } from "./animated-form.content";

const meta: Meta = {
  title: "Patronen/Animated Form",
};

export default meta;

export const AnimatedForm = examplePageStories((templates) => {
  const { applicationHeadingTemplate, formGroupInputTemplate } = templates;

  const content = getAnimatedFormContent(templates);

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
      ${headerPartial(templates, {
        ...header,
        mainMenu: mainMenu("Aanvragen"),
      })}
      <main>${template()}</main>
      ${footerPartial(templates)}
    </div>
  `;
});
