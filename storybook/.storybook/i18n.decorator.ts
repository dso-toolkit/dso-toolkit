import { TemplateResult, html } from "lit-html";
import { keyed } from "lit-html/directives/keyed.js";
import { PartialStoryFn, StoryContext } from "storybook/internal/types";

type I18nDecorator<TemplateFnReturnType> = (story: PartialStoryFn, context: StoryContext) => TemplateFnReturnType;

let count = 0;

export const i18nDecorator: I18nDecorator<TemplateResult> = (story: PartialStoryFn, context: StoryContext) => {
  // We zetten het lang-attribuut op het root html-element op de waarde van de Storybook global Internationalization locale zoals gedefinieerd in preview.ts
  document.documentElement.lang = context.globals.locale || "nl";

  // We gebruiken lit's directive keyed met een oplopende teller om de render te forceren, zodat het web-component
  // opnieuw op zoek gaat naar het lang-attribuut
  // Zie: https://lit.dev/docs/templates/directives/#keyed
  return html`${keyed(count++, html`<div id="dt-i18n-decorator-container">${story()}</div>`)}`;
};
