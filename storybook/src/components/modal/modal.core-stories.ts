import readme from "@dso-toolkit/core/src/components/modal/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ModalArgs, modalMeta, modalStories } from "dso-toolkit";
import { html } from "lit-html";

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

const VisualRegression = {
  render: () => html`
    <div style="background: grey; padding: 50px; min-height: 100vh;">
      <h1>Dit is een gevulde pagina layout</h1>
      <p>
        De achtergrond moet zichtbaar blijven rondom de modal dialog. Als er een ongewenste witte achtergrond optreedt
        door min-inline-size, faalt de visuele regressietest.
      </p>

      <dso-modal .modalTitle=${"Visuele regressie test"} .closable=${true}>
        <div slot="body">
          <p>Modal content hier...</p>
        </div>
      </dso-modal>
    </div>
  `,
};

export { Active, Confirm, Fullscreen, Loading, Passive, VisualRegression, WithDatepicker };
