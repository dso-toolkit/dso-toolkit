import readme from "@dso-toolkit/core/src/components/modal/readme.md?raw";
import { type Meta, moduleMetadata } from "@storybook/angular";
import { ModalArgs, modalMeta, modalStories } from "dso-toolkit";

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

const meta: Meta<ModalArgs> = {
  ...modalMeta({ readme }),
  title: "Modal",
  decorators: [
    moduleMetadata({
      imports: [DsoModal, TrustHtmlPipe],
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

const VisualRegression = {
  render: () => ({
    template: `
      <div style="background: grey; padding: 50px; min-height: 100vh;">
        <h1>Dit is een gevulde pagina layout</h1>
        <p>
          De achtergrond moet zichtbaar blijven rondom de modal dialog. Als er een ongewenste witte achtergrond optreedt
          door min-inline-size, faalt de visuele regressietest.
        </p>

        <dso-modal modalTitle="Visuele regressie test" [closable]="true">
          <div slot="body">
            <p>Modal content hier...</p>
          </div>
        </dso-modal>
      </div>
    `,
  }),
};

export { Active, Confirm, Fullscreen, Loading, Passive, VisualRegression, WithDatepicker };
