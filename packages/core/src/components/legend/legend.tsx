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
   * The `tabItem` property contains the information of the tab being pressed.
   */
  @Event()
  dsoContentSwitch!: EventEmitter<LegendContentSwitchEvent>;

  /**
   * Emitted when the user closes the Legend.
   */
  @Event()
  dsoClose!: EventEmitter<LegendCloseEvent>;

  render() {
    return (
      <Host>
        <div class="topbar">
          <div class="tabs" role="tablist">
            {this.tabItems.map((tabItem) => (
              <button
                class={clsx("tab", { active: tabItem.active })}
                role="tab"
                aria-selected={tabItem.active ? "true" : "false"}
                {...(!tabItem.active ? { tabIndex: -1 } : {})}
                onClick={(e) =>
                  this.dsoContentSwitch.emit({
                    originalEvent: e,
                    isModifiedEvent: e instanceof MouseEvent ? isModifiedEvent(e) : false,
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
            class="close-button"
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
