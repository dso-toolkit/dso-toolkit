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
   * An extra text for the active option. Only visible in the list of options.
   */
  @Prop()
  activeHint?: string;

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
  dsoOptionClick!: EventEmitter<AdvancedSelectOptionClickEvent<unknown>>;

  /**
   * Emitted when user clicks a redirect link.
   */
  @Event({ bubbles: false })
  dsoRedirectClick!: EventEmitter<AdvancedSelectRedirectClickEvent>;

  private handleClick = (event: MouseEvent) => {
    this.dsoClick.emit({ originalEvent: event });
  };

  private handleOptionClick = (event: MouseEvent, option: AdvancedSelectOption<unknown>) => {
    this.dsoOptionClick.emit({ originalEvent: event, option });
  };

  private handleRedirectClick = (event: MouseEvent, redirect: AdvancedSelectGroupRedirect) => {
    this.dsoRedirectClick.emit({ originalEvent: event, redirect });
  };

  render() {
    return (
      <div>
        <button class={{ "active-option": true, open: this.open }} type="button" onClick={this.handleClick}>
          <span class="active-option-label">{this.active?.label ?? "Selecteer een optie"}</span>
          <span class="active-option-aside">
            {this.options.some((option) => "summaryCounter" in option && option?.summaryCounter) ? (
              <span class="badges">
                {this.options
                  .filter((option) => "summaryCounter" in option && option?.summaryCounter)
                  .map((option) => {
                    if ("options" in option) {
                      return <dso-badge status={option.variant ?? "outline"}>{option.options.length}</dso-badge>;
                    }
                  })}
              </span>
            ) : (
              ""
            )}
            <dso-icon icon="caret-down"></dso-icon>
          </span>
        </button>
        <div class={{ "groups-container": true, open: this.open }}>
          <ul class="groups" role="list">
            {this.options.map((optionsOrGroup) => {
              if ("options" in optionsOrGroup) {
                return (
                  <li class={{ group: true, [`group-${optionsOrGroup.variant}`]: !!optionsOrGroup.variant }}>
                    {optionsOrGroup.label && <p class="group-label">{optionsOrGroup.label}</p>}
                    <ul class="options" role="list">
                      {optionsOrGroup.options.map((option) => (
                        <OptionElement
                          option={option}
                          active={this.active}
                          activeHint={this.activeHint}
                          cb={this.handleOptionClick}
                        />
                      ))}
                    </ul>
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
                  </li>
                );
              }
              return (
                <OptionElement
                  option={optionsOrGroup}
                  active={this.active}
                  activeHint={this.activeHint}
                  cb={this.handleOptionClick}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const OptionElement: FunctionalComponent<{
  option: AdvancedSelectOption<unknown>;
  active?: AdvancedSelectOption<unknown>;
  activeHint?: string;
  cb: (event: MouseEvent, value: AdvancedSelectOption<unknown>) => void;
}> = ({ option, active, activeHint, cb }) => (
  <li>
    <button
      class={{ option: true, "option-active": active === option }}
      type="button"
      onClick={(e: MouseEvent) => cb(e, option)}
    >
      <span class="option-label">{option.label}</span>
      {activeHint && active === option && <span class="option-hint">{activeHint}</span>}
    </button>
  </li>
);
