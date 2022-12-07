import { storiesOfResponsiveElement } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";

import * as React from "react";

import { templateContainer } from "../../templates";

import readme from "./readme.md";

const css = `
  dso-responsive-element:not([small]) .demo-small {
    display: none;
  }

  dso-responsive-element:not([medium]) .demo-medium {
    display: none;
  }

  dso-responsive-element:not([large]) .demo-large {
    display: none;
  }

  .demo-small,
  .demo-medium,
  .demo-large {
    padding: 8px;
  }

  .demo-small {
    background-color: #ebf3e6;
  }

  .demo-medium {
    background-color: #afcf9d;
  }

  .demo-large {
    background-color: #79b929;
  }
`;

storiesOfResponsiveElement({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ responsiveElementTemplate }) => ({
    gridTemplate: (dsoSizeChange, grid) => {
      return (
        <>
          <style type="text/css">{css}</style>
          {grid.map((cols) => (
            <div className="row">
              {cols.map((col) => (
                <div className={col}>
                  {responsiveElementTemplate({
                    dsoSizeChange,
                    children: (
                      <>
                        <div className="demo-small">
                          <p>
                            <strong>small</strong>
                          </p>
                          <div>${col}</div>
                        </div>
                        <div className="demo-medium">
                          <p>
                            <strong>medium</strong>
                          </p>
                          <div>${col}</div>
                        </div>
                        <div className="demo-large">
                          <p>
                            <strong>large</strong>
                          </p>
                          <div>${col}</div>
                        </div>
                      </>
                    ),
                  })}
                </div>
              ))}
            </div>
          ))}
        </>
      );
    },
  }),
});
