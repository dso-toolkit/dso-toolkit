import { moduleMetadata, storiesOf } from "@storybook/angular";

import { storiesOfModal } from "dso-toolkit";

import {
  DsoModal,
  DsoToolkitModule,
  ModalControllerDemo,
  ModalDemoContentComponent,
} from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { TrustHtmlPipe } from "../trust-html.pipe";
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

import readme from "./readme.md";

storiesOfModal({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoModal,
        },
      ],
      decorators: [
        moduleMetadata({
          imports: [DsoToolkitModule],
          declarations: [TrustHtmlPipe, ModalControllerDemo, ModalDemoContentComponent],
        }),
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ modalTemplate, modalControllerTemplate }, templates) => ({
    modalTemplate,
    modalControllerTemplate,
    activeBody,
    activeFooter,
    passiveBody,
    passiveFooter,
    confirmBody,
    confirmFooter,
    loadingBody: loadingBody(templates).template,
    datePickerBody: datePickerBody(templates).template,
  }),
});
