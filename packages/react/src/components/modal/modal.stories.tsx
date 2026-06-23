import { Meta } from "@storybook/react-vite";
import { ModalArgs, modalMeta, modalStories } from "dso-toolkit";
import React from "react";

import { DsoModal } from "../../components";
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

const VisualRegression = {
  render: () => (
    <div style={{ background: "grey", padding: "50px", minHeight: "100vh" }}>
      <h1>Dit is een gevulde pagina layout</h1>
      <p>
        De achtergrond moet zichtbaar blijven rondom de modal dialog. Als er een ongewenste witte achtergrond optreedt
        door min-inline-size, faalt de visuele regressietest.
      </p>

      <DsoModal modalTitle="Visuele regressie test" closable>
        <div slot="body">
          <p>Modal content hier...</p>
        </div>
      </DsoModal>
    </div>
  ),
};

export { Active, Confirm, Fullscreen, Loading, Passive, VisualRegression, WithDatepicker };
