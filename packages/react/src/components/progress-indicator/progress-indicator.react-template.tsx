import { ProgressIndicator } from "dso-toolkit";
import * as React from "react";

import { DsoProgressIndicator } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactProgressIndicator: ComponentImplementation<ProgressIndicator> = {
  component: "progressIndicator",
  implementation: "react",
  template: () =>
    function progressIndicatorTemplate({ label, block, size }) {
      return <DsoProgressIndicator label={label} block={block || undefined} size={size} />;
    },
};
