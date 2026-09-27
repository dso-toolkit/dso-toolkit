import { Decorator } from "@storybook/web-components-vite";

export const decorator: Decorator = (story) => {
  setTimeout(() => {
    const storybookRoot = document.getElementById("storybook-root");

    const dialog = storybookRoot?.querySelector("dialog");

    dialog?.showModal();
  }, 0);

  return story();
};
