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
import { DsoModal } from "../../projects/component-library/src/public-api";

const meta: Meta<ModalArgs> = {
  ...modalMeta({ readme }),
  component: DsoModal,
  title: "Modal",
  decorators: [
    moduleMetadata({
      imports: [TrustHtmlPipe],
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
});

export { Passive, Confirm, Fullscreen, Active, WithDatepicker, Loading };
