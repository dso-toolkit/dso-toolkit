import { CardContainer, isCardInterface } from "dso-toolkit";
import React from "react";

import { DsoCardContainer } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactCardContainer: ComponentImplementation<CardContainer<React.JSX.Element>> = {
  component: "cardContainer",
  implementation: "react",
  template: ({ cardTemplate }) =>
    function cardContainerTemplate({ mode, cards }) {
      return (
        <DsoCardContainer mode={mode}>
          {cards.map((card, index) =>
            mode === "list" ? (
              <li key={index}>{isCardInterface(card) && cardTemplate(card)}</li>
            ) : (
              isCardInterface(card) && cardTemplate(card)
            ),
          )}
        </DsoCardContainer>
      );
    },
};
