import {
  Card,
  CardClickEvent,
  isButtonInterface,
  isLabelInterface,
  isSlideToggleInterface,
  isToggletipInterface,
} from "dso-toolkit";
import * as React from "react";

import { DsoCard } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactCard: ComponentImplementation<Card<JSX.Element>> = {
  component: "card",
  implementation: "react",
  template: ({ iconTemplate, labelTemplate, toggletipTemplate, selectableTemplate, slideToggleTemplate }) =>
    function cardTemplate({ label, selectable, content, interactions, href, active, mode, dsoCardClick }) {
      return (
        <DsoCard
          href={href}
          mode={mode}
          active={active}
          onDsoCardClick={(e: CustomEvent<CardClickEvent>) => {
            if (!e.detail.isModifiedEvent) {
              e.detail.originalEvent.preventDefault();
            }

            dsoCardClick?.(e);
          }}
        >
          {selectable && selectableTemplate(selectable)}
          <h2 slot="heading">
            <span id="card-title">{label}</span>
          </h2>
          {interactions && interactions.length > 0 && (
            <div slot="interactions">
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
                  {isSlideToggleInterface(interaction) && slideToggleTemplate(interaction)}
                </div>
              ))}
            </div>
          )}
          {content && (
            <div slot="content" className="dso-rich-content">
              {content}
            </div>
          )}
        </DsoCard>
      );
    },
};
