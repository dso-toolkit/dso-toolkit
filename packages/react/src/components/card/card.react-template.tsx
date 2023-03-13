import { DsoCardClickedEvent } from "@dso-toolkit/core/dist/types/components/card/card.interfaces";
import { Card, isButtonInterface, isLabelInterface, isToggletipInterface } from "dso-toolkit";
import * as React from "react";

import { DsoCard } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactCard: ComponentImplementation<Card<JSX.Element>> = {
  component: "card",
  implementation: "react",
  template: ({ iconTemplate, labelTemplate, toggletipTemplate, selectableTemplate }) =>
    function cardTemplate({ label, selectable, content, interactions, image, clickable, dsoCardClicked }) {
      return (
        <DsoCard clickable={clickable} onDsoCardClicked={(e: CustomEvent<DsoCardClickedEvent>) => dsoCardClicked?.(e)}>
          {selectable && selectableTemplate(selectable)}
          {image && <img slot="image" src={image} />}
          {clickable ? (
            <a slot="heading" href="#">
              <h2>
                <span id="card-title">{label}</span>
                {iconTemplate({ icon: "chevron-right" })}
              </h2>
            </a>
          ) : (
            <h2 slot="heading">
              <span id="card-title">{label}</span>
            </h2>
          )}
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
                      {interaction.icon && !interaction.iconMode && iconTemplate(interaction.icon)}
                      <span className={interaction.iconMode === "only" ? "sr-only" : undefined}>
                        {interaction.screenreaderPrefix ? (
                          <span className="sr-only">{interaction.screenreaderPrefix}</span>
                        ) : undefined}
                        {interaction.label}
                        {interaction.screenreaderSuffix ? (
                          <span className="sr-only">{interaction.screenreaderSuffix}</span>
                        ) : undefined}
                      </span>
                      {interaction.icon && interaction.iconMode && iconTemplate(interaction.icon)}
                    </button>
                  )}
                  {isLabelInterface(interaction) && labelTemplate(interaction)}
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
