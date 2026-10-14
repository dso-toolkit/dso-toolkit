import { Component, Element, Host, forceUpdate, h } from "@stencil/core";

/**
 * @slot - The dso-tab elements. These should be direct children of the dso-tabs element.
 * @slot panel - The panel with the content for the active tab
 */
@Component({
  tag: "dso-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  private mutationObserver?: MutationObserver;

  @Element()
  host!: HTMLDsoTabsElement;

  private get enabledTabs() {
    // Only enabled tabs (not disabled) are needed for setting focus via ArrowRight and ArrowLeft
    return Array.from(this.host.querySelectorAll<HTMLDsoTabElement>(":scope > dso-tab")).reduce<HTMLDsoTabElement[]>(
      (tabs, tab) => {
        if (!tab.disabled) {
          tabs.push(tab);
        }

        return tabs;
      },
      [],
    );
  }

  private get firstTab() {
    return this.enabledTabs[0];
  }

  private get lastTab() {
    return this.enabledTabs[this.enabledTabs.length - 1];
  }

  private moveFocusToTab(tab: HTMLDsoTabElement | undefined) {
    tab?._dsoFocus();
  }

  private moveFocusToPreviousTab(focussedTab: HTMLElement) {
    const index = this.enabledTabs.findIndex((tab) => tab === focussedTab);
    const next = this.enabledTabs[index - 1] ?? this.lastTab;

    this.moveFocusToTab(next);
  }

  private moveFocusToNextTab(focussedTab: HTMLElement) {
    const index = this.enabledTabs.findIndex((tab) => tab === focussedTab);
    const next = this.enabledTabs[index + 1] ?? this.firstTab;

    this.moveFocusToTab(next);
  }

  // Keep track of tabs to set focus on next or previous enabled (not disabled) tab.
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

  connectedCallback(): void {
    this.mutationObserver ??= new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { childList: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  render() {
    return (
      <Host>
        <div class="tabs" role="tablist" onKeyUp={this.keyUpHandler}>
          <slot />
        </div>
        <div role="tabpanel" tabindex="0">
          <slot name="panel" />
        </div>
      </Host>
    );
  }
}
