import { Component, ComponentInterface, Prop, h } from "@stencil/core";

import { AdvancedSelectOption, AdvancedSelectOptionsOrGroup } from "./advanced-select.models";

@Component({
  tag: "dso-advanced-select",
  styleUrl: "advanced-select.scss",
  shadow: true,
})
export class AdvancedSelect implements ComponentInterface {
  /**
   * The options to display in the select.
   */
  @Prop()
  options: AdvancedSelectOptionsOrGroup[] = [];

  /**
   * The active option. By object reference.
   */
  @Prop()
  active?: AdvancedSelectOption;

  /**
   * The open state of the options list.
   */
  @Prop()
  open?: boolean;

  render() {
    return (
      <div>
        <div class={{ "active-option": true, "open": this.open === true }}>
          <span>In werking (Laatst gewijzigd: 01-01-2024)</span>
          <div class="active-option-aside">
            <div class="summaries">
              <div class="summary summary-info">1</div>
              <div class="summary summary-bright">2</div>
              <div class="summary summary-success">3</div>
              <div class="summary summary-warning">4</div>
              <div class="summary summary-error">5</div>
              <div class="summary">6</div>
            </div>
            <dso-icon icon={this.open ? 'chevron-up' : 'chevron-down'}></dso-icon>
          </div>
        </div>
        <div class={{ "groups-container": true, "open": this.open === true }}>
          <div class="groups">
            <div class="group group-success">
              <p class="group-label">Geldende versie</p>
              <div class="options">
                <div class="option option-active">
                  <span class="option-label">In werking - Laatst gewijzigd: 01-01-2024 (deze bekijkt u nu)</span>
                </div>
              </div>
              <a class="group-link" href="#">
                Bekijk eerder vastgestelde versies
                <dso-icon icon="chevron-right"></dso-icon>
              </a>
            </div>
            <div class="group">
              <p class="group-label">Toekomstige versies</p>
              <div class="options">
                <div class="option">
                  <span class="option-label">In werking - Laatst gewijzigd: 01-01-2024</span>
                </div>
                <div class="option">
                  <span class="option-label">In werking - Laatst gewijzigd: 01-01-2024</span>
                </div>
              </div>
            </div>
            <div class="group group-warning">
              <p class="group-label">Ontwerp versies ter inzage</p>
              <div class="options">
                <div class="option">
                  <span class="option-label">In werking - Laatst gewijzigd: 01-01-2024</span>
                </div>
                <div class="option">
                  <span class="option-label">In werking - Laatst gewijzigd: 01-01-2024</span>
                </div>
                <div class="option">
                  <span class="option-label">In werking - Laatst gewijzigd: 01-01-2024</span>
                </div>
              </div>
              <a class="group-link" href="#">
                Bekijk ontwerpen met afgeronde inzage termijn
                <dso-icon icon="chevron-right"></dso-icon>
              </a>
            </div>
          </div>
        </div>
        <pre>
          {JSON.stringify(
              {
                activeInOptions: this.active && this.options?.includes(this.active),
                active: this.active,
              options: this.options,
            },
            null,
            2,
          )}
        </pre>
      </div>
    );
  }
}
