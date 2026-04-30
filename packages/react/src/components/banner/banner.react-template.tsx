import { Banner } from "dso-toolkit";
import React, { JSX } from "react";

import { DsoBanner } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactBanner: ComponentImplementation<Banner<JSX.Element>> = {
  component: "banner",
  implementation: "react",
  template: () =>
    function bannerTemplate({ status, compact, icon, content }) {
      return (
        <DsoBanner status={status} compact={compact} icon={icon || !compact}>
          <div className="dso-banner-inner">{content}</div>
        </DsoBanner>
      );
    },
};
