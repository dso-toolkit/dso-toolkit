import {
  Component,
  Element,
  h,
  Listen,
  Prop,
  State,
  Fragment,
  Event,
  EventEmitter,
  VNode,
  Watch,
} from "@stencil/core";
import debounce from "debounce";
import { v4 } from "uuid";
import escapeStringRegexp from "escape-string-regexp";

export interface Suggestion {
  value: string;
  type?: string;
}

@Component({
  tag: "dso-autosuggest",
  styleUrl: "autosuggest.scss",
  scoped: true,
})
export class Autosuggest {
  /**
   * The suggestions for the value of the slotted input element
   */
  @Prop()
  readonly suggestions: Suggestion[] = [];

  /**
   * Whether the previous suggestions will be presented when the input gets focus again.
   */
  @Prop()
  suggestOnFocus: boolean = false;

  /**
   * Emitted when a suggestion is selected.
   * The `detail` property of the `CustomEvent` will contain the selected suggestion.
   */
  @Event({ eventName: 'dsoSelect' })
  selectEmitter!: EventEmitter<Suggestion>;

  /**
   * This is emitted debounced for every change for the slotted input type=text element.
   */
  @Event({ eventName: 'dsoChange' })
  changeEmitter!: EventEmitter<string>;

  @Element()
  host!: HTMLElement;

  @State()
  showSuggestions: boolean = false;

  @State()
  selectedSuggestion: Suggestion | undefined;

  @Watch('suggestions')
  suggestionsWatcher() {
    this.resetSelectedSuggestion();

    if (!this.showSuggestions && this.suggestions.length > 0) {
      this.openSuggestions();
    }
    else if (this.showSuggestions && this.suggestions.length === 0) {
      this.closeSuggestions();
    }
  }

  input!: HTMLInputElement;

  listbox: HTMLUListElement | undefined;

  listboxId: string = v4();

  inputId: string = v4();

  labelId: string = v4();

  debouncedEmitValue = debounce((value: string) => this.changeEmitter.emit(value), 200);

  onInput = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("event.target is not instanceof HTMLInputElement");
    }

    this.debouncedEmitValue(event.target.value.match(/(\S+)/g) ? event.target.value : '');
  };

  onFocusIn = () => {
    if (this.suggestOnFocus) {
      this.openSuggestions();
    }
  };

  @Listen("click", { target: "document" })
  onDocumentClick(event: MouseEvent) {
    if (
      this.showSuggestions &&
      this.listbox &&
      event.target instanceof Node &&
      !this.listbox.contains(event.target) &&
      this.input != event.target
    ) {
      this.closeSuggestions();
    }
  }

  connectedCallback() {
    const input = this.host.querySelector('input[type="text"]');
    if (!(input instanceof HTMLInputElement)) {
      throw new ReferenceError("Mandatory text input not found");
    }

    this.input = input;
    if (input.id) {
      this.inputId = input.id;
    } else {
      input.id = this.inputId;
    }

    if (!this.input.labels || this.input.labels.length < 1) {
      throw new ReferenceError("Mandatory label for text input not found");
    }

    const label = this.input.labels[0];
    if (label.id) {
      this.labelId = label.id;
    } else {
      label.id = this.labelId;
    }

    this.input.setAttribute("role", "combobox");
    this.input.setAttribute("aria-haspopup", "listbox");
    this.input.setAttribute("aria-owns", this.listboxId);
    this.input.setAttribute("aria-expanded", "false");
    this.input.setAttribute("autocomplete", "off");
    this.input.setAttribute("aria-autocomplete", "list");
    this.input.setAttribute("aria-activedescendant", "");
    this.input.addEventListener("input", this.onInput);
    this.input.addEventListener("keydown", this.onKeyDown);
    this.input.addEventListener("focusin", this.onFocusIn);
  }

  disconnectedCallback() {
    this.input.removeEventListener("input", this.onInput);
    this.input.removeEventListener("keydown", this.onKeyDown);
    this.input.removeEventListener("focusin", this.onFocusIn);
  }

  markTerms(suggestionValue: string, terms: string[]): (VNode | string)[] {
    if (!suggestionValue || !terms || terms.length === 0) {
      return [''];
    }

    const termRegex = new RegExp(`(${escapeStringRegexp(terms[0])})`, 'gi');

    return suggestionValue.split(termRegex).map((valuePart: string) => {
      if (!valuePart) {
        return '';
      }

      if (termRegex.test(valuePart)) {
        return <mark>{valuePart}</mark>;
      }

      if (terms.length === 1) {
        return <span>{valuePart}</span>;
      }

      return this.markTerms(valuePart, terms.slice(1));
    });
  }

  selectSuggestion(suggestion: Suggestion) {
    this.selectedSuggestion = suggestion;

    this.input.setAttribute("aria-activedescendant", this.listboxItemId(suggestion));
  }

  selectFirstSuggestion() {
    this.selectedSuggestion = this.suggestions[0];

    if (this.selectedSuggestion) {
      this.input.setAttribute('aria-activedescendant', this.listboxItemId(this.selectedSuggestion));
    }
  }

  selectLastSuggestion() {
    this.selectedSuggestion = this.suggestions[this.suggestions.length - 1];

    if (this.selectedSuggestion) {
      this.input.setAttribute('aria-activedescendant', this.listboxItemId(this.selectedSuggestion));
    }
  }

  selectNextSuggestion() {
    const index = this.selectedSuggestion ? this.suggestions.indexOf(this.selectedSuggestion) : -1;

    this.selectedSuggestion = this.suggestions[index + 1] ?? this.suggestions[0];

    if (this.selectedSuggestion) {
      this.input.setAttribute('aria-activedescendant', this.listboxItemId(this.selectedSuggestion));
    }
  }

  selectPreviousSuggestion() {
    const index = this.selectedSuggestion ? this.suggestions.indexOf(this.selectedSuggestion) : 0;

    this.selectedSuggestion = this.suggestions[index - 1] ?? this.suggestions[this.suggestions.length - 1];

    if (this.selectedSuggestion) {
      this.input.setAttribute('aria-activedescendant', this.listboxItemId(this.selectedSuggestion));
    }
  }

  resetSelectedSuggestion() {
    this.selectedSuggestion = undefined;
    this.input.setAttribute('aria-activedescendant', '');
  }

  openSuggestions(selectSuggestion?: 'first' | 'last') {
    this.showSuggestions = this.suggestions.length > 0;
    this.input.setAttribute("aria-expanded", this.showSuggestions.toString());

    if (selectSuggestion === 'first') {
      this.selectFirstSuggestion();
    }
    else if (selectSuggestion === 'last') {
      this.selectLastSuggestion();
    }
  }

  closeSuggestions() {
    this.showSuggestions = false;
    this.input.setAttribute("aria-expanded", "false");
    this.selectFirstSuggestion();
  }

  pickSelectedValue() {
    if (this.selectedSuggestion) {
      this.selectEmitter.emit(this.selectedSuggestion);
    }

    this.closeSuggestions();
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        if (!this.showSuggestions) {
          this.openSuggestions('first');
        }
        else {
          this.selectNextSuggestion();
        }

        break;

      case 'ArrowUp':
        if (!this.showSuggestions) {
          this.openSuggestions('last');
        }
        else {
          this.selectPreviousSuggestion();
        }

        break;

      case 'Tab':
        this.closeSuggestions();
        return;

      case 'Escape':
        this.closeSuggestions();
        break;

      case 'Enter':
        this.pickSelectedValue();
        break;

      default:
        return;
    }

    event.preventDefault();
  };

  listboxItemId(suggestion: Suggestion): string {
    return `${this.inputId}-${this.suggestions.indexOf(suggestion) + 1}`;
  }

  render() {
    const terms = this.input.value.split(' ').filter(t => t);

    return (
      <>
        <slot />
        <ul
          role="listbox"
          id={this.listboxId}
          aria-labelledby={this.labelId}
          ref={element => this.listbox = element}
          hidden={!this.showSuggestions}
        >
          {this.showSuggestions
            ? this.suggestions.map((suggestion) => (
                <li
                  role="option"
                  id={this.listboxItemId(suggestion)}
                  key={suggestion.value}
                  onMouseEnter={() => this.selectSuggestion(suggestion)}
                  onMouseLeave={() => this.resetSelectedSuggestion()}
                  onClick={() => this.pickSelectedValue()}
                  aria-selected={(suggestion === this.selectedSuggestion).toString()}
                  aria-label={suggestion.value}
                >
                  <span class="value">
                    {this.markTerms(suggestion.value, terms)}
                  </span>
                  {suggestion.type
                    ? (
                      <span class="type">{suggestion.type}</span>
                    )
                    : undefined
                  }
                </li>
              ))
            : undefined
          }
        </ul>
      </>
    );
  }
}
