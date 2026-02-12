import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, Watch, h } from "@stencil/core";

import { LegendMode } from "../legend.interfaces";

/**
 * @slot heading - The heading/label for this Legend Group. Should be targeted with `<h3 slot="heading">...</h3>` or `<span slot="heading">...</span>`
 * @slot - The legend items for this group. Should contain `dso-legend-item` elements.
 */
@Component({
  tag: "dso-legend-group",
  styleUrl: "legend-group.scss",
  shadow: true,
})
export class LegendGroup implements ComponentInterface {
  @Element()
  host!: HTMLDsoLegendGroupElement;

  /**
   * Controls whether this Legend Group and its child Legend Items are in edit or view mode.
   * When not set, no edit/view toggle icon is shown.
   */
  @Prop({ reflect: true })
  mode?: LegendMode;

  private mutationObserver?: MutationObserver;

  private get legendItems() {
    return Array.from(this.host.querySelectorAll<HTMLDsoLegendItemElement>("dso-legend-item"));
  }

  @Watch("mode")
  handleModeChange() {
    if (this.mode) {
      this.legendItems.forEach((item) => {
        item.mode = this.mode!;
      });
    }
  }

  @Event()
  dsoLegendGroupModeChange!: EventEmitter<LegendMode>;

  private toggleMode = () => {
    const newMode: LegendMode = this.mode === "view" ? "edit" : "view";
    this.dsoLegendGroupModeChange.emit(newMode);
  };

  connectedCallback() {
    this.mutationObserver = new MutationObserver(() => {
      // When new legend-items are added, update their mode
      this.handleModeChange();
    });

    this.mutationObserver.observe(this.host, { childList: true, subtree: true });

    // Initialize child legend-items with current mode
    this.handleModeChange();
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
    delete this.mutationObserver;
  }

  render() {
    return (
      <Host>
        <div class="legend-group-header">
          <slot name="heading" />
          {this.mode && (
            <dso-icon-button
              label={this.mode === "view" ? "Bewerk" : "Bekijk"}
              icon={this.mode === "view" ? "pencil" : "check"}
              variant="tertiary"
              onDsoClick={this.toggleMode}
            />
          )}
        </div>
        <slot />
      </Host>
    );
  }
}
