import { Addon_DecoratorFunction } from "@storybook/types";
import { html, TemplateResult } from "lit-html";

export const decorator: Addon_DecoratorFunction<TemplateResult> = (story) => {
  setTimeout(() => {
    const storybookRoot = document.getElementById("storybook-root");

    const dialog = storybookRoot?.querySelector("dialog");

    dialog?.showModal();
  }, 0);

  return html`${story()}`;
};
