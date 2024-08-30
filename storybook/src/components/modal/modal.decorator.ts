import { html, TemplateResult } from "lit-html";
import { ModalDecorator } from "dso-toolkit";

export const decorator: ModalDecorator<TemplateResult> = (story) => {
  setTimeout(() => {
    const storybookRoot = document.getElementById("storybook-root");

    const dialog = storybookRoot?.querySelector("dialog");

    dialog?.showModal();
  }, 0);

  return html`${story()}`;
};
