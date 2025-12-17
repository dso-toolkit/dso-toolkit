import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { LegendCloseEvent, LegendContentSwitchEvent, LegendTabItem } from "./legend.interfaces";

@Component({
  tag: "dso-legend",
  styleUrl: "legend.scss",
  shadow: true,
})
export class Legend implements ComponentInterface {
  @Element()
  host!: HTMLDsoLegendElement;

  /**
   * TabItems in the legend topbar
   */
  @Prop()
  tabItems: LegendTabItem[] = [];

  /**
   * Emitted when a tabItem is pressed.
   */
  @Event()
  dsoContentSwitch!: EventEmitter<LegendContentSwitchEvent>;

  /**
   * Emitted when the user closes the Legend.
   */
  @Event()
  dsoClose!: EventEmitter<LegendCloseEvent>;

  private get tabs() {
    return Array.from(this.host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  }

  private get firstTab() {
    return this.tabs[0];
  }

  private get lastTab() {
    return this.tabs[this.tabs.length - 1];
  }

  private moveFocusToTab(tab: HTMLButtonElement | undefined) {
    tab?.focus();
  }

  private moveFocusToPreviousTab(focussedTab: HTMLElement) {
    const index = this.tabs.findIndex((tab) => tab === focussedTab);
    const next = this.tabs[index - 1] ?? this.lastTab;

    this.moveFocusToTab(next);
  }

  private moveFocusToNextTab(focussedTab: HTMLElement) {
    const index = this.tabs.findIndex((tab) => tab === focussedTab);
    const next = this.tabs[index + 1] ?? this.firstTab;

    this.moveFocusToTab(next);
  }

  private keyUpHandler = (e: KeyboardEvent) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        this.moveFocusToNextTab(e.target);
        break;

      case "ArrowLeft":
      case "ArrowUp":
        this.moveFocusToPreviousTab(e.target);
        break;

      default:
        return;
    }
  };

  // A button handles an "enter" and a "space" keypress as a normal click."
  private clickHandler = (e: MouseEvent) => {
    const index = this.tabs.findIndex((tab) => tab === e.currentTarget);
    const tabItem = this.tabItems[index];

    if (!tabItem || tabItem.active) {
      return;
    }

    this.dsoContentSwitch.emit({
      originalEvent: e,
      isModifiedEvent: isModifiedEvent(e),
    });
  };

  render() {
    return (
      <Host>
        <div class="topbar">
          <div class="tabs" role="tablist" onKeyUp={this.keyUpHandler}>
            {this.tabItems.map((tabItem) => (
              <button
                class={clsx("tab", { active: tabItem.active })}
                role="tab"
                aria-selected={tabItem.active ? "true" : "false"}
                tabIndex={tabItem.active ? 0 : -1}
                onClick={this.clickHandler}
              >
                {tabItem.label}
              </button>
            ))}
          </div>

          <dso-icon-button
            icon="times"
            variant="tertiary"
            label="Sluit legenda"
            class="close-button"
            onClick={(e) => this.dsoClose.emit({ originalEvent: e })}
          />
        </div>

        <dso-scrollable class="content">
          <slot />
        </dso-scrollable>
      </Host>
    );
  }
}
