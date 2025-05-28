import type { Meta } from "@storybook/react";
import { ModalArgs, modalMeta, modalStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  datePickerBody,
  loadingBody,
  passiveBody,
  passiveFooter,
} from "./modal.content";
import readme from "./readme.md?raw";

const meta: Meta<ModalArgs> = {
  ...modalMeta({ readme }),
  title: "Modal",
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
      loadingBody: loadingBody(templates),
      datePickerBody: datePickerBody(templates),
    };
  },
});

export { Active, Confirm, Fullscreen, Loading, Passive, WithDatepicker };
