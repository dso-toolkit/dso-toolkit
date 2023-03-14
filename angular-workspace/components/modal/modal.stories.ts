import { moduleMetadata, storiesOf } from "@storybook/angular";

import { storiesOfModal } from "dso-toolkit";

import { DsoModal } from "../../projects/component-library/src/public-api";
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
          declarations: [TrustHtmlPipe],
        }),
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ modalTemplate }, templates) => ({
    modalTemplate,
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
