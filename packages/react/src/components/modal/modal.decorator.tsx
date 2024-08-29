import { ModalDecorator } from "dso-toolkit";
import React from "react";

export const decorator: ModalDecorator<JSX.Element> = (story) => {
  setTimeout(() => {
    const storybookRoot = document.getElementById("storybook-root");

    const dialog = storybookRoot?.querySelector("dialog");

    dialog?.showModal();
  }, 0);

  return <>{story()}</>;
};
