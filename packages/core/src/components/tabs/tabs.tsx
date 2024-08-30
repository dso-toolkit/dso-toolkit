import { Component, Element, Event, EventEmitter, Fragment, h, Method } from "@stencil/core";
import clsx from "clsx";

import { Tab, TabsSwitchEvent } from "./tabs.interfaces";

@Component({
  tag: "dso-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  private tabs?: Tab[];

  @Element()
  host!: HTMLDsoTabsElement;

  /**
   * Emitted when the user activates tab via click or arrow keys.
   */
  @Event()
  dsoTabSwitch!: EventEmitter<TabsSwitchEvent>;

  /**
   * @internal
   */
  @Method()
  async updateActiveTab(tabId: string) {
    const currentActive = this.tabs?.findIndex((tab) => tab.active);
    const nextActive = this.tabs?.findIndex((tab) => tab.id === tabId);

    if (this.tabs && typeof currentActive === "number" && typeof nextActive === "number") {
      const currentActiveTab = this.tabs[currentActive];
      const nextActiveTab = this.tabs[nextActive];

      if (currentActiveTab && nextActiveTab) {
        currentActiveTab.active = false;
        nextActiveTab.active = true;
        this.host.shadowRoot?.querySelector<HTMLAnchorElement>(`#${tabId} > a`)?.focus();
      }
    }
  }

  componentWillLoad(): void | Promise<void> {
    const tabElements = this.host.querySelectorAll("dso-tab");

    if (tabElements) {
      this.tabs = Array.from(tabElements)
        .map<Tab | undefined>((tab) => {
          const id = tab.getAttribute("identifier");

          if (id) {
            return {
              label: tab.label,
              id,
              active: tab.active,
              disabled: tab.disabled,
            };
          }

          return undefined;
        })
        .filter<Tab>((tab): tab is Tab => !!tab);
    }
  }

  private emitEvent = (originalEvent: MouseEvent | KeyboardEvent, selected: string) => {
    this.dsoTabSwitch.emit({
      originalEvent,
      selected,
    });
  };

  private keyUpHandler = (event: KeyboardEvent) => {
    const anchor = event.currentTarget;
    if (
      !(event.key === "ArrowLeft" || event.key === "ArrowRight") ||
      !(anchor instanceof HTMLAnchorElement) ||
      !this.tabs
    ) {
      return;
    }

    const currentTab = this.tabs.find((tab) => tab.id === anchor.closest("li")?.id);

    if (currentTab) {
      const enabledTabs = this.tabs?.filter((tab) => !tab.disabled);
      const indexOfCurrentTab = enabledTabs.indexOf(currentTab);

      if (typeof indexOfCurrentTab === "number") {
        let selected;

        if (event.key === "ArrowLeft" && indexOfCurrentTab > 0) {
          selected = enabledTabs[indexOfCurrentTab - 1]?.id;
        }

        if (event.key === "ArrowRight" && indexOfCurrentTab < this.tabs.length - 1) {
          selected = enabledTabs[indexOfCurrentTab + 1]?.id;
        }

        if (selected) {
          this.emitEvent(event, selected);
        }
      }
    }
  };

  private clickHandler = (event: MouseEvent) => {
    if (!this.tabs) {
      return;
    }

    event.preventDefault();

    const anchor = event.currentTarget;

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const selected = anchor.closest("li")?.id;
    const currentTab = this.tabs.find((tab) => tab.id === selected);

    if (selected && currentTab && !currentTab.disabled) {
      this.emitEvent(event, selected);
    }
  };

  render() {
    return (
      <>
        <ul class="nav nav-tabs" role="tablist">
          {this.tabs?.map((tab) => (
            <li role="presentation" class={clsx({ active: tab.active, disabled: tab.disabled })} id={tab.id}>
              <a
                href="#"
                role="tab"
                onKeyUp={this.keyUpHandler}
                onClick={this.clickHandler}
                aria-selected={tab.active ? "true" : "false"}
                {...(!tab.active ? { tabIndex: -1 } : {})}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <slot />
      </>
    );
  }
}
