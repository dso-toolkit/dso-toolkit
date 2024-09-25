import { Element, Component, h, Host, forceUpdate } from "@stencil/core";

import { TabsItem } from "./tabs.interfaces";

/**
 * @slot - The dso-tabs
 * @slot panel - The panel with the content for the active tab
 */
@Component({
  tag: "dso-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  @Element()
  host!: HTMLDsoTabsElement;

  private activeTab?: HTMLDsoTabElement;
  private firstTab?: HTMLDsoTabElement;
  private lastTab?: HTMLDsoTabElement;
  private focussedTab?: HTMLDsoTabElement;

  private get enabledTabs(): Array<{ tabsItem: TabsItem; element: HTMLDsoTabElement }> {
    const tabElements = this.host.querySelectorAll("dso-tab");

    if (tabElements) {
      // Only enabled tabs (not disabled) are needed for setting focus via ArrowRight and ArrowLeft
      return Array.from(tabElements).reduce((tabs: Array<{ tabsItem: TabsItem; element: HTMLDsoTabElement }>, tab) => {
        if (!tab.disabled) {
          tabs.push({
            tabsItem: {
              active: tab.active,
            },
            element: tab,
          });
        }
        return tabs;
      }, []);
    }

    return [];
  }

  private moveFocusToTab(tab?: HTMLDsoTabElement) {
    tab?._dsoFocus();
    this.focussedTab = tab;
  }

  private moveFocusToPreviousTab(focussedTab?: HTMLDsoTabElement) {
    const index = this.enabledTabs?.findIndex((tab) => tab.element === focussedTab);

    if (index === 0) {
      this.moveFocusToTab(this.lastTab);
    } else {
      this.moveFocusToTab(this.enabledTabs[index - 1]?.element);
    }
  }

  private moveFocusToNextTab(focussedTab?: HTMLDsoTabElement) {
    const index = this.enabledTabs?.findIndex((tab) => tab.element === focussedTab);

    if (index === this.enabledTabs?.length - 1) {
      this.moveFocusToTab(this.firstTab);
    } else {
      this.moveFocusToTab(this.enabledTabs[index + 1]?.element);
    }
  }

  // Keep track of tabs to set focus on next or previous enabled (not disabled) tab
  // When this component gets focus it will be on the activeTab
  private keyUpHandler = (e: KeyboardEvent) => {
    this.activeTab = this.enabledTabs.find((tab) => tab.tabsItem.active)?.element;
    this.firstTab = this.enabledTabs[0]?.element;
    this.lastTab = this.enabledTabs[this.enabledTabs.length - 1]?.element;

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

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      forceUpdate(this.host);
    });

    this.mutationObserver.observe(this.host, { childList: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  render() {
    return (
      <Host onKeyUp={this.keyUpHandler}>
        <div class="tabs" role="tablist">
          <slot />
        </div>
        <div role="tabpanel" tabindex="0">
          <slot name="panel" />
        </div>
      </Host>
    );
  }
}
