import type { Meta } from "@storybook/react-vite";
import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";
import * as React from "react";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<InfoArgs> = {
  ...infoMeta({ readme }),
  title: "Info",
};

export default meta;

const { Default, Fixed } = infoStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoTemplate, iconTemplate } = templates;

    return {
      infoTemplate,
      richContent: (
        <div className="dso-rich-content">
          <h2>Heading 2</h2>
          <p>
            De <a href="#">Bouwregelgeving</a> is een database met alle <strong>bouwregelgeving</strong> in Nederland,
            die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan{" "}
            <a href="#" className="download">
              de eisen van de Omgevingswet (3B's)
            </a>
            , en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
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
    };
  },
});

export { Default, Fixed };
