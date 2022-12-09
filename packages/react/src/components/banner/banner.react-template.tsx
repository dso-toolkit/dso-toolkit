import { Banner } from "dso-toolkit";
import * as React from "react";

import { DsoBanner } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactBanner: ComponentImplementation<Banner<JSX.Element>> = {
  component: "banner",
  implementation: "react",
  template: ({ iconTemplate }) =>
    function bannerTemplate({ status, content, onClick }) {
      return (
        <DsoBanner status={status}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                {content}
                <button type="button" className="dso-tertiary" onClick={(e) => onClick?.(e.nativeEvent)}>
                  <span className="sr-only">Sluiten</span>
                  {iconTemplate({ icon: "times" })}
                </button>
              </div>
            </div>
          </div>
        </DsoBanner>
      );
    },
};
