import { Element, Component, h, Host, State } from "@stencil/core";

import { TabsItem } from "./tabs.interfaces";

@Component({
  tag: "dso-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  @Element()
  host!: HTMLDsoTabsElement;

  @State()
  activeTab?: string;

  @State()
  focussedTab?: string;

  private enabledTabs?: TabsItem[];
  private firstTab?: string;
  private lastTab?: string;

  private moveFocusToTab(id?: string): void {
    this.focussedTab = id;
    const a = this.host.querySelector(`[identifier="${id}"]`)?.shadowRoot?.querySelector("a");
    const button = this.host.querySelector(`[identifier="${id}"]`)?.shadowRoot?.querySelector("button");
    a?.focus();
    button?.focus();
  }

  private moveFocusToPreviousTab(focussedTab?: string) {
    let index;

    if (focussedTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.enabledTabs?.findIndex((tab) => tab.identifier === focussedTab);
      if (index !== undefined && index >= 0 && this.enabledTabs !== undefined && index < this.enabledTabs?.length) {
        this.moveFocusToTab(this.enabledTabs[index - 1]?.identifier);
      }
    }
  }

  private moveFocusToNextTab(focussedTab?: string) {
    let index;

    if (focussedTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.enabledTabs?.findIndex((tab) => tab.identifier === focussedTab);
      if (index !== undefined && index >= 0 && this.enabledTabs !== undefined && index < this.enabledTabs?.length) {
        this.moveFocusToTab(this.enabledTabs[index + 1]?.identifier);
      }
    }
  }

  // Keep track of tabs to set focus on next or previous enabled (not disabled) tab
  // When this component gets focus it will be on the activeTab
  private keyUpHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        this.moveFocusToNextTab(this.focussedTab || this.activeTab);
        break;
      case "ArrowLeft":
        this.moveFocusToPreviousTab(this.focussedTab || this.activeTab);
        break;
      default:
        return;
    }
  };

  componentWillLoad(): void | Promise<void> {
    const tabElements = this.host.querySelectorAll("dso-tab");

    if (tabElements) {
      // Only enabled tabs (not disabled) are needed for setting focus via ArrowRight and ArrowLeft
      this.enabledTabs = Array.from(tabElements).reduce((tabs: TabsItem[], tab) => {
        const id = tab.getAttribute("identifier");

        if (id && !tab.disabled) {
          tabs.push({
            label: tab.label,
            identifier: id,
            active: tab.active,
          });
        }
        return tabs;
      }, []);

      this.activeTab = this.enabledTabs.find((tab) => tab.active)?.identifier;
      this.firstTab = this.enabledTabs[0]?.identifier;
      this.lastTab = this.enabledTabs[this.enabledTabs.length - 1]?.identifier;
    }
  }

  render() {
    return (
      <Host onKeyUp={this.keyUpHandler}>
        <div class="nav nav-tabs" role="tablist">
          <slot />
        </div>
        <div role="tabpanel" tabindex="0" aria-labelledby={this.activeTab}>
          <slot name="panel" />
        </div>
      </Host>
    );
  }
}
