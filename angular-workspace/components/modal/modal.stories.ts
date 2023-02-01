import { moduleMetadata, storiesOf } from "@storybook/angular";

import { storiesOfModal } from "dso-toolkit";

import { SanitizeHtmlPipe } from "../../components/sanitize-html.pipe";
import { DsoModal } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
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
          declarations: [SanitizeHtmlPipe],
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
  }),
});
