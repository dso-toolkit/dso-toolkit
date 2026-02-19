import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, Watch, h } from "@stencil/core";

import { i18n } from "../../../utils/i18n";
import { LegendGroupModeChangeEvent, LegendMode } from "../legend.interfaces";

import { translations } from "./legend-group.i18n";

/**
 * @slot heading - The heading/label for this Legend Group. Should be targeted with `<h3 slot="heading">...</h3>`
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

  @Watch("mode")
  handleModeChange() {
    if (this.mode) {
      const mode = this.mode;
      this.legendItems.forEach((item) => {
        item.mode = mode;
      });
    }
  }

  /**
   * Emitted when the user toggles the mode of the Legend Group.
   */
  @Event({ bubbles: false })
  dsoLegendGroupModeChange!: EventEmitter<LegendGroupModeChangeEvent>;

  private text = i18n(() => this.host, translations);

  private mutationObserver?: MutationObserver;

  private get legendItems() {
    return Array.from(this.host.querySelectorAll("dso-legend-item"));
  }

  private toggleMode = (e: CustomEvent<{ originalEvent: MouseEvent }>) => {
    this.dsoLegendGroupModeChange.emit({
      originalEvent: e.detail.originalEvent,
      next: this.mode === "view" ? "edit" : "view",
    });
  };

  connectedCallback() {
    this.mutationObserver = new MutationObserver(() => {
      // When new legend-items are added, update their mode
      this.handleModeChange();
    });

    this.mutationObserver.observe(this.host, { childList: true });

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
              label={this.mode === "view" ? this.text("edit") : this.text("view")}
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
