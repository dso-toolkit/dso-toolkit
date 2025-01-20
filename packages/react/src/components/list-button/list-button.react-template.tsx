import { ListButton } from "dso-toolkit";
import * as React from "react";

import { DsoListButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactListButton: ComponentImplementation<ListButton> = {
  component: "listButton",
  implementation: "react",
  template: () =>
    function listButtonTemplate({
      disabled,
      label,
      sublabel,
      subcontent,
      subcontentPrefix,
      count,
      checked,
      min,
      max,
      dsoSelectedChange,
      dsoCountChange,
    }) {
      return (
        <DsoListButton
          label={label}
          sublabel={sublabel}
          count={count}
          min={min}
          max={max}
          disabled={disabled}
          checked={checked}
          subcontentPrefix={subcontentPrefix}
          onDsoCountChange={dsoCountChange}
          onDsoSelectedChange={dsoSelectedChange}
        >
          {subcontent && <span slot="subcontent" dangerouslySetInnerHTML={{ __html: subcontent }} />}
        </DsoListButton>
      );
    },
};
