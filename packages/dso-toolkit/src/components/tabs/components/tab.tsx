import { Component, Element, Event, EventEmitter, Method, Prop, h } from "@stencil/core";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import { TabsSwitchEvent } from "../tabs.interfaces";

/**
 * @slot - The label for this tab
 */
@Component({
  tag: "dso-tab",
  styleUrl: "tab.scss",
  shadow: true,
})
export class Tab {
  @Element()
  host!: HTMLDsoTabElement;

  /**
   * Makes the tab active. The tab for which the tabpanel is visible is the active tab.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Disables the tab. A disabled tab cannot be activated and it's tabpanel cannot be shown.
   */
  @Prop({ reflect: true })
  disabled?: boolean;

  /**
   * The optional href of the tab. Creates an anchor if present. Creates a button if absent.
   */
  @Prop()
  href?: string;

  /**
   * Emitted when the user activates tab via click or arrow keys followed by space or enter.
   */
  @Event()
  dsoTabSwitch!: EventEmitter<TabsSwitchEvent>;

  /**
   * @internal
   */
  @Method()
  async _dsoFocus() {
    this.anchorOrButtonRef?.focus();
  }

  private anchorOrButtonRef?: HTMLAnchorElement | HTMLButtonElement;

  private emitEvent = (e: MouseEvent | KeyboardEvent) => {
    this.dsoTabSwitch.emit({
      originalEvent: e,
      isModifiedEvent: e instanceof MouseEvent ? isModifiedEvent(e) : false,
    });
  };

  private keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === " " && !this.disabled && !this.active) {
      this.emitEvent(e);
    }
  };

  private clickHandler = (e: MouseEvent) => {
    if ((this.disabled && this.href) || this.active) {
      e.preventDefault();
    } else {
      this.emitEvent(e);
    }
  };

  render() {
    return this.href ? (
      <a
        role="tab"
        href={this.href}
        onKeyUp={this.keyUpHandler}
        onClick={this.clickHandler}
        aria-selected={this.active ? "true" : "false"}
        {...(!this.active ? { tabIndex: -1 } : {})}
        ref={(element) => (this.anchorOrButtonRef = element)}
      >
        <slot />
      </a>
    ) : (
      <button
        role="tab"
        type="button"
        disabled={this.disabled}
        onClick={this.clickHandler}
        aria-selected={this.active ? "true" : "false"}
        {...(!this.active ? { tabIndex: -1 } : {})}
        ref={(element) => (this.anchorOrButtonRef = element)}
      >
        <slot />
      </button>
    );
  }
}
