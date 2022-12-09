import { HelpcenterPanel } from "dso-toolkit";
import * as React from "react";

import { DsoHelpcenterPanel } from "../../components";

import { ComponentImplementation } from "../../templates";

export const reactHelpcenterPanel: ComponentImplementation<HelpcenterPanel> = {
  component: "helpcenterPanel",
  implementation: "react",
  template: () =>
    function helpcenterPanelTemplate({ label, url }) {
      return <DsoHelpcenterPanel label={label} url={url}></DsoHelpcenterPanel>;
    },
};
