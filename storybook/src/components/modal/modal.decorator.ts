import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

export const decorator = (story: PartialStoryFn): TemplateResult => {
  setTimeout(() => {
    const storybookRoot = document.getElementById("storybook-root");

    const dialog = storybookRoot?.querySelector("dialog");

    dialog?.showModal();
  }, 0);

  return html`${story()}`;
};
