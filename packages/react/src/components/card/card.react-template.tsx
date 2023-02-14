import { DsoCardClickedEvent } from "@dso-toolkit/core/dist/types/components/card/card.interfaces";
import { Card, isButtonInterface, isToggletipInterface } from "dso-toolkit";
import * as React from "react";

import { DsoCard, DsoSelectable, DsoIcon } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactCard: ComponentImplementation<Card<JSX.Element>> = {
  component: "card",
  implementation: "react",
  template: ({ labelTemplate, toggletipTemplate }) =>
    function cardTemplate({ label, selectable, content, interactions, image, clickable, addon, dsoCardClicked }) {
      return (
        <DsoCard clickable={clickable} onDsoCardClicked={(e: CustomEvent<DsoCardClickedEvent>) => dsoCardClicked?.(e)}>
          {selectable && <DsoSelectable {...selectable}>{selectable.label}</DsoSelectable>}
          {image && <img slot="image" src={image} />}
          {clickable ? (
            <a slot="heading" href="#">
              <h2>
                <span>{label}</span>
                <DsoIcon icon="chevron-right"></DsoIcon>
              </h2>
            </a>
          ) : (
            <h2 slot="heading">
              <span>{label}</span>
            </h2>
          )}
          {addon && labelTemplate(addon)}
          {interactions && interactions.length > 0 && (
            <div slot="interactions" className="dso-card-interactions">
              {interactions.map((interaction, index) => (
                <div key={index} className="dso-card-interaction">
                  {isButtonInterface(interaction) && (
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
                      <span className={interaction.iconMode === "only" ? "sr-only" : undefined}>
                        {interaction.label}
                      </span>
                      {interaction.icon && interaction.iconMode && <DsoIcon icon={interaction.icon.icon}></DsoIcon>}
                    </button>
                  )}
                  {isToggletipInterface(interaction) && toggletipTemplate(interaction)}
                </div>
              ))}
            </div>
          )}
          <div slot="content" className="dso-rich-content">
            {content}
          </div>
        </DsoCard>
      );
    },
};
