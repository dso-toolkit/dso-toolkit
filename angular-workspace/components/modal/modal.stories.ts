import { Meta, moduleMetadata } from "@storybook/angular";
import { ModalArgs, modalMeta, modalStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/modal/readme.md?raw";

import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  passiveBody,
  passiveFooter,
  loadingBody,
  datePickerBody,
} from "./modal.content";
import { TrustHtmlPipe } from "../trust-html.pipe";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

const meta: Meta<ModalArgs> = {
  ...modalMeta({ readme }),
  title: "Modal",
  decorators: [
    moduleMetadata({
      declarations: [TrustHtmlPipe],
    }),
  ],
};

export default meta;

const { Passive, Confirm, Fullscreen, Active, WithDatepicker, Loading } = modalStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { modalTemplate } = templates;

    return {
      modalTemplate,
      activeBody,
      activeFooter,
      passiveBody,
      passiveFooter,
      confirmBody,
      confirmFooter,
      loadingBody: loadingBody(templates).template,
      datePickerBody: datePickerBody(templates).template,
    };
  },
  decorator: (story) => {
    const s = story();
    if (!isStoryFnAngularReturnTypeTemplate(s)) {
      throw new Error("Expected a valid Angular template");
    }

    setTimeout(() => {
      const storybookRoot = document.getElementById("storybook-root");

      const dialog = storybookRoot?.querySelector("dialog");

      dialog?.showModal();
    }, 0);

    const { props, template } = s;

    return {
      props,
      template: `${template}`,
    };
  },
});

export { Passive, Confirm, Fullscreen, Active, WithDatepicker, Loading };
