import { Banner } from "dso-toolkit";
import * as React from "react";

import { DsoBanner } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactBanner: ComponentImplementation<Banner<JSX.Element>> = {
  component: "banner",
  implementation: "react",
  template: () =>
    function bannerTemplate({ status, compact, noIcon, content }) {
      return (
        <DsoBanner status={status} compact={compact} noIcon={noIcon}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">{content}</div>
            </div>
          </div>
        </DsoBanner>
      );
    },
};
