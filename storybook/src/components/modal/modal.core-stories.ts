import readme from "@dso-toolkit/core/src/components/modal/readme.md?raw";
import type { Meta } from "@storybook/web-components";
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

const meta: Meta<ModalArgs> = {
  ...modalMeta({ readme }),
  title: "Core/Modal",
};

export default meta;

const { Passive, Confirm, Fullscreen, Active, WithDatepicker, Loading } = modalStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { modalTemplate } = templates;

    return {
      modalTemplate,
      activeBody: activeBody(),
      activeFooter: activeFooter(templates),
      passiveBody: passiveBody(templates),
      passiveFooter: passiveFooter(templates),
      confirmBody: confirmBody(templates),
      confirmFooter: confirmFooter(templates),
      loadingBody: loadingBody(templates),
      datePickerBody: datePickerBody(templates),
    };
  },
});

export { Active, Confirm, Fullscreen, Loading, Passive, WithDatepicker };
