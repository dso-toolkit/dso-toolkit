import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";
import { TabItem, dsoCloseEvent, dsoContentSwitchEvent } from "dso-toolkit";

@Component({
  tag: "dso-legend",
  styleUrl: "legend.scss",
  shadow: true,
})
export class Legend implements ComponentInterface {
  @Element()
  host!: HTMLDsoLegendElement;

  /**
   * Navbar items in the legend
   */
  @Prop()
  tabItems: TabItem[] = [];

  /**
   * Emitted when a navbar item is pressed.
   * The `detail` property of the `CustomEvent` will contain the text of the anchor.
   */
  @Event()
  dsoContentSwitch!: EventEmitter<dsoContentSwitchEvent>;

  /**
   * Emitted when the user closes the Legend.
   */
  @Event()
  dsoClose!: EventEmitter<dsoCloseEvent>;

  render() {
    return (
      <Host>
        <div class="topbar">
          <div class="tabs">
            {this.tabItems.map((tabItem) => (
              <button
                class={clsx("tab", { "dso-active": tabItem.active })}
                role="tab"
                onClick={() =>
                  this.dsoContentSwitch.emit({
                    tabItem,
                  })
                }
              >
                {tabItem.label}
              </button>
            ))}
          </div>
          <dso-icon-button
            icon="times"
            variant="tertiary"
            label="Sluit legenda"
            class="dso-close-button"
            onClick={(e) => this.dsoClose.emit({ originalEvent: e })}
          />
        </div>
        <dso-scrollable class="content">
          <slot></slot>
        </dso-scrollable>
      </Host>
    );
  }
}
