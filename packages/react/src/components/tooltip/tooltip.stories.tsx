import * as React from "react";
import type { Meta } from "@storybook/react";
import { HandlerFunction } from "@storybook/addon-actions";

import { templateContainer } from "../../templates";

import { TooltipArgs, tooltipMeta, tooltipStories } from "dso-toolkit";

import readme from "./readme.md?raw";

const meta: Meta<TooltipArgs> = {
  ...tooltipMeta({ readme }),
  title: "Tooltip",
};

export default meta;

function asChildTemplate(tooltip: JSX.Element, id: string, action: HandlerFunction) {
  return (
    <button type="button" aria-describedby={id} onClick={action}>
      <span>Hover or focus me</span>
      {tooltip}
    </button>
  );
}

function asSiblingTemplate(tooltip: JSX.Element, id: string, action: HandlerFunction) {
  return (
    <>
      <button type="button" aria-describedby={id} onClick={action}>
        <span>Hover or focus me</span>
      </button>
      {tooltip}
    </>
  );
}

const richContent = (
  <>
    <p>
      Uitleg over wat u hier kunt doen en zit. Met een link naar{" "}
      <a href="#" className="extern">
        meer informatie
      </a>
      .
    </p>
    <div className="dso-button-row dso-align-right">
      <button type="button" className="dso-primary">
        <span>Oke!</span>
        <svg className="di di-chevron-right">
          <use href="dso-toolkit/dist/dso-icons.svg#chevron-right"></use>
        </svg>
      </button>
    </div>
  </>
);

const headingContent = <h5 slot="heading">Tip: Onboarding</h5>;

const { AsChild, AsSibling, Onboarding } = tooltipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tooltipTemplate } = templates;

    return {
      tooltipTemplate,
      asChildTemplate,
      asSiblingTemplate,
      richContent,
      headingContent,
    };
  },
});

export { AsChild, AsSibling, Onboarding };
