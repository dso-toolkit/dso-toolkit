import { Component, Element, Event, EventEmitter, Prop, h, Host } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";
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
   * Adds a unique identifier for the tab. Use this instead of html `id` attribute.
   *
   * Auto generated if not set.
   */
  @Prop()
  identifier = uuidv4();

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

  private emitEvent = (e: MouseEvent | KeyboardEvent) => {
    this.dsoTabSwitch.emit({
      originalEvent: e,
      isModifiedEvent: e instanceof MouseEvent ? isModifiedEvent(e) : false,
    });
  };

  private keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === " " && !this.disabled) {
      this.emitEvent(e);
    }
  };

  private clickHandler = (e: MouseEvent) => {
    if (this.disabled && this.href) {
      e.preventDefault();
    } else {
      this.emitEvent(e);
    }
  };

  render() {
    return (
      <Host>
        {this.href ? (
          <a
            role="tab"
            href={this.href}
            id={`${this.identifier}-tab`}
            onKeyUp={this.keyUpHandler}
            onClick={this.clickHandler}
            aria-controls={this.identifier}
            aria-selected={this.active ? "true" : "false"}
            {...(!this.active ? { tabIndex: -1 } : {})}
          >
            <slot />
          </a>
        ) : (
          <button
            role="tab"
            class="dso-tertiary"
            disabled={this.disabled}
            id={`${this.identifier}-tab`}
            type="button"
            onClick={this.clickHandler}
            aria-controls={this.identifier}
            aria-selected={this.active ? "true" : "false"}
            {...(!this.active ? { tabIndex: -1 } : {})}
          >
            <slot />
          </button>
        )}
      </Host>
    );
  }
}
