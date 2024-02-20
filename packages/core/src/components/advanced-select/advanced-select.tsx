import { Component, ComponentInterface, Prop, h, FunctionalComponent, Event, EventEmitter } from "@stencil/core";

import {
  AdvancedSelectGroupRedirect,
  AdvancedSelectOption,
  AdvancedSelectOptionsOrGroup,
} from "./advanced-select.models";
import {
  AdvancedSelectClickEvent,
  AdvancedSelectOptionClickEvent,
  AdvancedSelectRedirectClickEvent,
} from "./advanced-select.interfaces";

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
  options: AdvancedSelectOptionsOrGroup<unknown>[] = [];

  /**
   * The active option. By object reference.
   */
  @Prop()
  active?: AdvancedSelectOption<unknown>;

  /**
   * The open state of the options list.
   */
  @Prop()
  open: boolean = false;

  /**
   * Emitted when user clicks the select.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<AdvancedSelectClickEvent>;

  /**
   * Emitted when user clicks an option
   */
  @Event({ bubbles: false })
  dsoOptionClick!: EventEmitter<AdvancedSelectOptionClickEvent>;

  /**
   * Emitted when user clicks a redirect link.
   */
  @Event({ bubbles: false })
  dsoRedirectClick!: EventEmitter<AdvancedSelectRedirectClickEvent>;

  private handleClick = (event: MouseEvent) => {
    this.dsoClick.emit({ originalEvent: event });
  };

  private handleOptionClick = (event: MouseEvent, value: AdvancedSelectOption<unknown>) => {
    this.dsoOptionClick.emit({ originalEvent: event, value });
  };

  private handleRedirectClick = (event: MouseEvent, value: AdvancedSelectGroupRedirect) => {
    this.dsoRedirectClick.emit({ originalEvent: event, value });
  };

  render() {
    return (
      <div>
        <button class={{ "active-option": true, open: this.open }} type="button" onClick={this.handleClick}>
          <span class="active-option-label">{this.active?.label ?? "Selecteer een optie"}</span>
          <div class="active-option-aside">
            {this.options.some((option) => "summaryCounter" in option && option?.summaryCounter) ? (
              <div class="badges">
                {this.options
                  .filter((option) => "summaryCounter" in option && option?.summaryCounter)
                  .map((option) => {
                    if ("options" in option) {
                      return <dso-badge status={option.variant ?? "outline"}>{option.options.length}</dso-badge>;
                    }
                  })}
              </div>
            ) : (
              ""
            )}
            <dso-icon icon="caret-down"></dso-icon>
          </div>
        </button>
        <div class={{ "groups-container": true, open: this.open }}>
          <div class="groups">
            {this.options.map((optionsOrGroup) => {
              if ("options" in optionsOrGroup) {
                return (
                  <div class={{ group: true, [`group-${optionsOrGroup.variant ?? "outline"}`]: true }}>
                    {optionsOrGroup.label && <p class="group-label">{optionsOrGroup.label}</p>}
                    <div class="options">
                      {optionsOrGroup.options.map((option) => (
                        <OptionElement option={option} active={this.active} cb={this.handleOptionClick} />
                      ))}
                    </div>
                    {optionsOrGroup.redirect && (
                      <a
                        class="group-link"
                        href={optionsOrGroup.redirect.href}
                        onClick={(e: MouseEvent) =>
                          this.handleRedirectClick(e, optionsOrGroup.redirect as AdvancedSelectGroupRedirect)
                        }
                      >
                        {optionsOrGroup.redirect.label}
                        <dso-icon icon="chevron-right"></dso-icon>
                      </a>
                    )}
                  </div>
                );
              }
              return <OptionElement option={optionsOrGroup} active={this.active} cb={this.handleOptionClick} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const OptionElement: FunctionalComponent<{
  option: AdvancedSelectOption<unknown>;
  active?: AdvancedSelectOption<unknown>;
  cb: (event: MouseEvent, value: AdvancedSelectOption<unknown>) => void;
}> = ({ option, active, cb }) => (
  <button
    class={{ option: true, "option-active": active === option }}
    type="button"
    onClick={(e: MouseEvent) => cb(e, option)}
  >
    <span class="option-label">{option.label}</span>
  </button>
);
