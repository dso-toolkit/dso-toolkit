import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { TabItem, dsoCloseEvent, dsoContentSwitchEvent } from "./legend.interfaces";

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
  tabItems: TabItem[] = [];

  /**
   * Emitted when a tabItems is pressed.
   * The `tabItem` property contains the information of the tab being pressed.
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
          <div class="tabs" role="tablist">
            {this.tabItems.map((tabItem) => (
              <button
                class={clsx("tab", { "dso-active": tabItem.active })}
                role="tab"
                onClick={(e) =>
                  this.dsoContentSwitch.emit({
                    originalEvent: e,
                    isModifiedEvent: e instanceof MouseEvent ? isModifiedEvent(e) : false,
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
