import { CardContainer } from "dso-toolkit";
import * as React from "react";

import { DsoCardContainer } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactCardContainer: ComponentImplementation<CardContainer<JSX.Element>> = {
  component: "cardContainer",
  implementation: "react",
  template: ({ cardTemplate }) =>
    function cardContainerTemplate({ mode, cards }) {
      return (
        <DsoCardContainer mode={mode}>
          {cards.map((card, index) =>
            mode === "list" ? <li key={index}>{cardTemplate(card)}</li> : cardTemplate(card)
          )}
        </DsoCardContainer>
      );
    },
};
