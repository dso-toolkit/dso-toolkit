import { Decorator } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";

export const decorator = (story: Parameters<Decorator>[0]): TemplateResult => {
  setTimeout(() => {
    const storybookRoot = document.getElementById("storybook-root");

    const dialog = storybookRoot?.querySelector("dialog");

    dialog?.showModal();
  }, 0);

  return html`${story()}`;
};
