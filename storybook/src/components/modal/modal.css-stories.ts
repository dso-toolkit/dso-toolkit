import type { Meta } from "@storybook/web-components-vite";
import { ModalArgs, modalMeta, modalStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/modal/readme.md?raw";

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
import { decorator } from "./modal.decorator";

const meta: Meta<ModalArgs> = {
  ...modalMeta({ readme }),
  title: "HTML|CSS/Modal (Deprecated)",
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
  decorator,
});

export { Active, Confirm, Fullscreen, Loading, Passive, WithDatepicker };
