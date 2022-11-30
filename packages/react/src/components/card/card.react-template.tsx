import { Card } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoCard, DsoSelectable, DsoIcon } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactCard: ComponentImplementation<Card<JSX.Element>> = {
  component: "card",
  implementation: "react",
  template: () =>
    function cardTemplate({ label, selectable, content, interactions, image, dsoCardClicked }) {
      return (
        <DsoCard onDsoCardClicked={(e: CustomEvent) => dsoCardClicked?.(e.detail)}>
          {selectable && <DsoSelectable {...selectable}>{selectable.label}</DsoSelectable>}
          {image && <img slot="image" src={image} />}
          <a slot="heading" href="#">
            <h2>
              <span>{label}</span>
              <DsoIcon icon="chevron-right"></DsoIcon>
            </h2>
          </a>
          {interactions && interactions.length > 0 && (
            <div slot="interactions" className="dso-card-interactions">
              {interactions.map((interaction, index) => (
                <div key={index} className="dso-card-interaction">
                  <button
                    type={interaction.type}
                    id={interaction.id}
                    className="dso-tertiary"
                    disabled={interaction.disabled}
                    aria-describedby={interaction.ariaDescribedby}
                    aria-expanded={interaction.ariaExpanded}
                    aria-haspopup={interaction.ariaHaspopup}
                    aria-roledescription={interaction.ariaRoledescription}
                  >
                    {interaction.icon && !interaction.iconMode && <DsoIcon icon={interaction.icon.icon}></DsoIcon>}
                    <span className={interaction.iconMode === "only" ? "sr-only" : undefined}>{interaction.label}</span>
                    {interaction.icon && interaction.iconMode && <DsoIcon icon={interaction.icon.icon}></DsoIcon>}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div slot="content" className="dso-rich-content">
            <p>{content}</p>
          </div>
        </DsoCard>
      );
    },
};
