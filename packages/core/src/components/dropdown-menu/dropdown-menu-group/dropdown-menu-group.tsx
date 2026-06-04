import { Component, ComponentInterface, Element, Host, Prop, forceUpdate, h } from "@stencil/core";
import { clsx } from "clsx";
import { v4 as uuidv4 } from "uuid";

import { DropdownMenuInternalState } from "../dropdown-menu.interfaces";

@Component({
  tag: "dso-dropdown-menu-group",
  styleUrl: "dropdown-menu-group.scss",
  shadow: true,
})
export class DropdownMenuGroup implements ComponentInterface {
  @Element()
  host!: HTMLDsoDropdownMenuGroupElement;
  /**
   * The label of the dropdown menu group.
   */
  @Prop({ reflect: true })
  label?: string;

  private dropdownMenuState?: DropdownMenuInternalState;

  private get dropdownMenu() {
    return this.host.closest("dso-dropdown-menu");
  }

  componentWillLoad() {
    this.dropdownMenu?._getState().then((state) => {
      this.dropdownMenuState = state;

      forceUpdate(this.host);
    });
  }

  render() {
    const { checkable } = this.dropdownMenuState ?? {};
    const labelId = this.label ? uuidv4() : undefined;

    return (
      <Host>
        <div aria-labelledby={labelId} role="group">
          {this.label && (
            <div id={labelId} class={clsx(["group-label", { checkable }])} role="none">
              {this.label}
            </div>
          )}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
