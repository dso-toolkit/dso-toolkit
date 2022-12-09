import { AttachmentsCounter } from "dso-toolkit";
import * as React from "react";

import { DsoAttachmentsCounter } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAttachmentsCounter: ComponentImplementation<AttachmentsCounter> = {
  component: "attachmentsCounter",
  implementation: "react",
  template: () =>
    function attachmentsCounterTemplate({ count }) {
      return <DsoAttachmentsCounter count={count}></DsoAttachmentsCounter>;
    },
};
