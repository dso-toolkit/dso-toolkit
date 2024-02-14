import {
  Component,
  ComponentInterface,
  Prop,
  h,
  FunctionalComponent,
  Element,
  Event,
  EventEmitter,
  State,
  Host,
  Listen,
} from "@stencil/core";
import clsx from "clsx";
import {
  AdvancedSelectGroup,
  AdvancedSelectGroupRedirect,
  AdvancedSelectOption,
  AdvancedSelectOptionClickEvent,
  AdvancedSelectOptionOrGroup,
  AdvancedSelectRedirectClickEvent,
} from "./advanced-select.models";
import { createFocusTrap, FocusTrap } from "focus-trap";

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
   * Emitted when user clicks an option
   */
  @Event({ bubbles: false })
  dsoOptionClick!: EventEmitter<AdvancedSelectOptionClickEvent<never>>;

  /**
   * Emitted when user clicks a redirect link.
   */
  @Event({ bubbles: false })
  dsoRedirectClick!: EventEmitter<AdvancedSelectRedirectClickEvent>;

  @Listen("keydown", { target: "window" })
  keyDownListener(event: KeyboardEvent) {
    if (this.open && event.key === "ArrowUp") {
      this.handleTab(-1);
    }
    if (this.open && event.key === "ArrowDown") {
      this.handleTab(1);
    }
  }

  get toggleButtonElement(): HTMLButtonElement {
    const button = this.host.shadowRoot?.querySelector(".active-option");

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error("Toggle button not found");
    }

    return button;
  }

  get tabbableElements(): HTMLElement[] {
    if (!this.host.shadowRoot) {
      return [];
    }
    const buttons = this.host.shadowRoot.querySelectorAll("a, button") as NodeListOf<HTMLElement>;
    if (buttons.length > 0) {
      return Array.from(buttons);
    }
    return [];
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

  private close = () => {
    if (this.open) {
      this.toggleOpen();
    }
  };

  private createTrap() {
    this.trap = createFocusTrap(this.host, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      tabbableOptions: {
        getShadowRoot: true,
      },
      setReturnFocus: this.toggleButtonElement ?? false,
      initialFocus: this.toggleButtonElement ?? false,
      onDeactivate: () => {
        this.close();
        this.removeTrap();
      },
    }).activate();
  }

  private removeTrap() {
    this.trap?.deactivate();
    delete this.trap;
  }

  private handleTab(direction: number) {
    const tabs = this.tabbableElements;
    const currentIndex = tabs.findIndex((e) => e === this.host.shadowRoot?.activeElement);

    let nextIndex = currentIndex + direction;
    if (nextIndex >= tabs.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = tabs.length - 1;
    }

    tabs[nextIndex]?.focus();
  }

  private handleOptionClick = (event: MouseEvent, option: AdvancedSelectOption<never>) => {
    this.dsoOptionClick.emit({ originalEvent: event, option });
    this.toggleOpen();
  };

  private handleRedirectClick = (event: MouseEvent, redirect: AdvancedSelectGroupRedirect) => {
    this.dsoRedirectClick.emit({ originalEvent: event, redirect });
    this.toggleOpen();
  };

  render() {
    return (
      <Host>
        <button
          aria-expanded={this.open.toString()}
          class={clsx(["active-option", { open: this.open }])}
          type="button"
          onClick={this.toggleOpen}
        >
          <span class="active-option-label">{this.active?.label ?? "Selecteer een optie"}</span>
          <span class="active-option-aside">
            {this.options.some((option) => "summaryCounter" in option && option?.summaryCounter) && (
              <span class="badges">
                {this.options
                  .filter(
                    (option): option is AdvancedSelectGroup<never> =>
                      "options" in option && "summaryCounter" in option && !!option?.summaryCounter,
                  )
                  .map((option) => {
                    return <dso-badge status={option.variant ?? "outline"}>{option.options.length}</dso-badge>;
                  })}
              </span>
            )}
            <dso-icon icon="caret-down"></dso-icon>
          </span>
        </button>
        {this.open && (
          <div class="groups-container">
            <ul class="groups">
              {this.options.map((optionsOrGroup) => {
                if ("options" in optionsOrGroup) {
                  return (
                    <li class={{ group: true, [`group-${optionsOrGroup.variant}`]: !!optionsOrGroup.variant }}>
                      {optionsOrGroup.label && <p class="group-label">{optionsOrGroup.label}</p>}
                      <ul class="options">
                        {optionsOrGroup.options.map((option) => (
                          <OptionElement
                            option={option}
                            active={this.active}
                            activeHint={this.activeHint}
                            callback={this.handleOptionClick}
                          />
                        ))}
                      </ul>
                      {optionsOrGroup.redirect && (
                        <a
                          class="group-link"
                          href={optionsOrGroup.redirect.href}
                          onClick={(e) =>
                            optionsOrGroup.redirect && this.handleRedirectClick(e, optionsOrGroup.redirect)
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
                    callback={this.handleOptionClick}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </Host>
    );
  }
}

const OptionElement: FunctionalComponent<{
  option: AdvancedSelectOption<never>;
  active?: AdvancedSelectOption<never>;
  activeHint?: string;
  callback: (event: MouseEvent, value: AdvancedSelectOption<never>) => void;
}> = ({ option, active, activeHint, callback }) => (
  <li>
    <button
      class={{ option: true, "option-active": active === option }}
      type="button"
      onClick={(e) => callback(e, option)}
    >
      <span class="option-label">{option.label}</span>
      {activeHint && active === option && <span class="option-hint">{activeHint}</span>}
    </button>
  </li>
);
