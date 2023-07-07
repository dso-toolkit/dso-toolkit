import { storiesOfInfo } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfInfo({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ infoTemplate, iconTemplate }) => ({
    infoTemplate,
    richContent: (
      <div className="dso-rich-content">
        <h2>Heading 2</h2>
        <p>
          Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nullam non metus dolor. Pellentesque
          velit arcu, pellentesque at lacus sit amet, porta semper est. Praesent mollis lorem lorem, non varius nisl
          lacinia et. Integer quis sollicitudin arcu. <a href="#">Nullam</a> lacinia non ipsum sit amet varius. Praesent
          consequat ligula id tortor elementum pretium. Integer ligula justo, volutpat sed tellus eu, faucibus fringilla
          lectus.
        </p>
        <div className="dso-button-row">
          <a href="#" className="dso-primary">
            <span>Primaire button</span>
          </a>
          <a href="#" className="dso-secondary">
            <span>Secundaire button</span>
          </a>
          <a href="#" className="dso-tertiary">
            <span>Tertiaire button</span>
            {iconTemplate({ icon: "chevron-down" })}
          </a>
        </div>
      </div>
    ),
  }),
});
