import { Component, ComponentInterface, Prop, h } from "@stencil/core";

import { AdvancedSelectOption, AdvancedSelectOptionsOrGroup } from "./advanced-select.models";

@Component({
  tag: "dso-advanced-select",
  styleUrl: "advanced-select.scss",
  shadow: true,
})
export class AdvancedSelect implements ComponentInterface {
  /**
   * The options to display in the select.
   */
  @Prop()
  options: AdvancedSelectOptionsOrGroup[] = [];

  /**
   * The active option. By object reference.
   */
  @Prop()
  active?: AdvancedSelectOption;

  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(
            {
              activeInOptions: this.active && this.options?.includes(this.active),
              active: this.active,
              options: this.options,
            },
            null,
            2,
          )}
        </pre>
      </div>
    );
  }
}
