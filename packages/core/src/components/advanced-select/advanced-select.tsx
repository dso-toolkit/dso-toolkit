import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  FunctionalComponent,
  Listen,
  Prop,
  State,
  h,
} from "@stencil/core";
import clsx from "clsx";
import { FocusTrap, createFocusTrap } from "focus-trap";
import { tabbable } from "tabbable";

import { isModifiedEvent } from "../../utils/is-modified-event";

import {
  AdvancedSelectChangeEvent,
  AdvancedSelectGroup,
  AdvancedSelectGroupRedirect,
  AdvancedSelectOption,
  AdvancedSelectOptionOrGroup,
  AdvancedSelectRedirectEvent,
} from "./advanced-select.interfaces";

@Component({
  tag: "dso-advanced-select",
  styleUrl: "advanced-select.scss",
  shadow: true,
})
export class AdvancedSelect implements ComponentInterface {
  private trap?: FocusTrap;

  @Element()
  host!: HTMLDsoAdvancedSelectElement;

  /**
   * The options to display in the select.
   */
  @Prop()
  options: AdvancedSelectOptionOrGroup<never>[] = [];

  /**
   * The active option. By object reference.
   */
  @Prop()
  active?: AdvancedSelectOption<never>;

  /**
   * An extra text for the active option. Only visible in the list of options.
   */
  @Prop()
  activeHint?: string;

  /**
   * The open state of the options list.
   */
  @State()
  open: boolean = false;

  /**
   * Emitted when user selects an option
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<AdvancedSelectChangeEvent<never>>;

  /**
   * Emitted when user activates a group redirect link.
   */
  @Event({ bubbles: false })
  dsoRedirect!: EventEmitter<AdvancedSelectRedirectEvent>;

  private toggleButtonElementRef: HTMLButtonElement | undefined;

  @Listen("keydown", { target: "window" })
  keyDownListener(event: KeyboardEvent) {
    if (this.open && event.key === "ArrowUp") {
      event.preventDefault();
      this.handleTab(-1);
    } else if (this.open && event.key === "ArrowDown") {
      event.preventDefault();
      this.handleTab(1);
    }
  }

  componentDidRender() {
    if (this.open && !this.trap) {
      this.createTrap();
    } else if (!this.open && this.trap) {
      this.removeTrap();
    }
  }

  private toggleOpen = () => {
    this.open = !this.open;
  };

  private createTrap() {
    this.trap = createFocusTrap(this.host, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      setReturnFocus: this.toggleButtonElementRef,
      tabbableOptions: {
        getShadowRoot: true,
      },
      onDeactivate: () => {
        this.open = false;
      },
    }).activate();
  }

  private removeTrap() {
    this.trap?.deactivate();
    delete this.trap;
  }

  private handleTab(direction: number) {
    const elements = this.host.isConnected ? tabbable(this.host, { getShadowRoot: true }) : [];
    const currentIndex = elements.findIndex((e) => e === this.host.shadowRoot?.activeElement);

    let nextIndex = currentIndex + direction;
    if (nextIndex >= elements.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = elements.length - 1;
    }

    elements[nextIndex]?.focus();
  }

  private handleOptionClick = (event: MouseEvent, option: AdvancedSelectOption<never>) => {
    this.dsoChange.emit({ originalEvent: event, option });
    this.open = false;
  };

  private handleRedirectClick = (event: MouseEvent, redirect: AdvancedSelectGroupRedirect) => {
    this.dsoRedirect.emit({ originalEvent: event, isModifiedEvent: isModifiedEvent(event), redirect });
    this.open = false;
  };

  render() {
    return (
      <>
        <button
          aria-expanded={this.open.toString()}
          class={clsx(["active-option", { open: this.open }])}
          type="button"
          onClick={this.toggleOpen}
          ref={(element) => (this.toggleButtonElementRef = element)}
        >
          <ActiveGroupLabel active={this.active} options={this.options} />
          <span class="active-option-label">{this.active?.label ?? "Selecteer een optie"}</span>
          <span class="active-option-aside">
            {this.options.some(
              (optionOrGroup) => "summaryCounter" in optionOrGroup && optionOrGroup?.summaryCounter,
            ) && (
              <span class="badges">
                {this.options
                  .filter(
                    (option): option is AdvancedSelectGroup<never> =>
                      "options" in option && "summaryCounter" in option && !!option?.summaryCounter,
                  )
                  .map((group) => (
                    <dso-badge status={group.variant ?? "outline"}>{group.options.length}</dso-badge>
                  ))}
              </span>
            )}
            <dso-icon icon="caret-down"></dso-icon>
          </span>
        </button>
        {this.open && (
          <div class="groups-container">
            <ul class="groups">
              {this.options.map(
                (optionOrGroup) =>
                  ("options" in optionOrGroup && (
                    <li class={clsx(["group", { [`group-${optionOrGroup.variant}`]: !!optionOrGroup.variant }])}>
                      <p class="group-label">{optionOrGroup.label}</p>
                      <ul class="options">
                        {optionOrGroup.options.map((option) => (
                          <li>
                            <OptionButton
                              option={option}
                              active={this.active}
                              activeHint={this.activeHint}
                              callback={this.handleOptionClick}
                            />
                          </li>
                        ))}
                      </ul>
                      {optionOrGroup.redirect && (
                        <RedirectAnchor
                          redirect={optionOrGroup.redirect}
                          callback={this.handleRedirectClick}
                        ></RedirectAnchor>
                      )}
                    </li>
                  )) ||
                  ("placeholder" in optionOrGroup && (
                    <li class="group">
                      <p class="group-label">{optionOrGroup.label}</p>
                      <p class="placeholder">{optionOrGroup.placeholder}</p>
                      {optionOrGroup.redirect && (
                        <RedirectAnchor
                          redirect={optionOrGroup.redirect}
                          callback={this.handleRedirectClick}
                        ></RedirectAnchor>
                      )}
                    </li>
                  )) || (
                    <li>
                      <OptionButton
                        option={optionOrGroup}
                        active={this.active}
                        activeHint={this.activeHint}
                        callback={this.handleOptionClick}
                      />
                    </li>
                  ),
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
}

interface OptionButtonProps {
  option: AdvancedSelectOption<never>;
  active: AdvancedSelectOption<never> | undefined;
  activeHint: string | undefined;
  callback: (event: MouseEvent, value: AdvancedSelectOption<never>) => void;
}

const OptionButton: FunctionalComponent<OptionButtonProps> = ({ option, active, activeHint, callback }) => (
  <button
    class={clsx(["option", { "option-active": active === option }])}
    type="button"
    onClick={(e) => callback(e, option)}
  >
    <span class="option-label">{option.label}</span>
    {!!activeHint && active === option && <span class="option-hint">({activeHint})</span>}
  </button>
);

interface RedirectAnchorProps {
  redirect: AdvancedSelectGroupRedirect;
  callback: (event: MouseEvent, value: AdvancedSelectGroupRedirect) => void;
}

const RedirectAnchor: FunctionalComponent<RedirectAnchorProps> = ({ redirect, callback }) => (
  <a class="group-link" href={redirect.href} onClick={(e) => callback(e, redirect)}>
    {redirect.label}
    <dso-icon icon="chevron-right"></dso-icon>
  </a>
);

interface ActiveGroupLabelProps {
  active: AdvancedSelectOption<never> | undefined;
  options: AdvancedSelectOptionOrGroup<never>[];
}

const ActiveGroupLabel: FunctionalComponent<ActiveGroupLabelProps> = ({ active, options }) => {
  const group = options.find(
    (optionOrGroup): optionOrGroup is AdvancedSelectGroup<never> =>
      "options" in optionOrGroup &&
      !!optionOrGroup.options.find((option) => option === active) &&
      !!optionOrGroup.activeLabel,
  );

  return group ? (
    <dso-label compact status={group.variant}>
      {group.activeLabel}
    </dso-label>
  ) : undefined;
};
