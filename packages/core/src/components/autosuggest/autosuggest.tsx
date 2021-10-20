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
} from "@stencil/core";
import debounce from "debounce";
import { v4 } from "uuid";

export interface Suggestion {
  value: string;
  type?: string;
}

interface SuggestionState extends Suggestion {
  selected: boolean;
  id: string;
}

@Component({
  tag: "dso-autosuggest",
  styleUrl: "autosuggest.scss",
  scoped: true,
})
export class Autosuggest {
  /**
   * A method that will be called debounced with the input value as its first parameter.
   * This method will also be called when the input is reduced to an empty string.
   * @returns A promise with an array of `Suggestion`s. You should limit this array to ten items.
   */
  @Prop()
  fetchSuggestions!: (value: string) => Promise<Array<Suggestion>>;

  /**
   * Whether the previous suggestions will be presented when the input gets focus again.
   */
  @Prop()
  suggestOnFocus: boolean = false;

  /**
   * Emitted when a suggestion is selected.
   * The `detail` property of the `CustomEvent` will contain the selected suggestion.
   */
  @Event()
  selected: EventEmitter<string> | undefined;

  @Element()
  host!: HTMLElement;

  @State()
  suggestions: Array<SuggestionState> = [];

  selectedIndex: number = -1;

  terms: string[] = [];

  @State()
  showSuggestions: boolean = false;

  input!: HTMLInputElement;

  listboxId: string = v4();

  inputId: string = v4();

  labelId: string = v4();

  listbox: HTMLUListElement | undefined;

  debouncedFetchSuggestions = debounce(
    (terms: string[]) =>
      this.fetchSuggestions(terms.join(" "))
        .then((result) => {
          this.suggestions = result.map((suggestion, index) => ({
            value: suggestion.value,
            type: suggestion.type,
            selected: false,
            id: `${index}-${this.inputId}`,
          }));
          this.terms = terms;
          this.openSuggestions();
        })
        .catch(() => {
          this.closeSuggestions();
          this.suggestions = [];
        }),
    200
  );

  onInput = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("event.target not a instance of HTMLInputElement");
    }

    this.debouncedFetchSuggestions(
      `${event.target.value}`.match(/(\S+)/g) ?? []
    );
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
    const input = this.host.querySelectorAll('input[type="text"]')[0];
    if (!(input instanceof HTMLInputElement)) {
      throw new ReferenceError("Mandatory text input not found");
    }

    this.input = input;
    if (input.id) {
      this.inputId = input.id;
    } else {
      input.id = this.inputId;
    }

    if (!this.fetchSuggestions) {
      throw new Error("fetchSuggestions is mandatory");
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

  markTerms(
    suggestionValue: string,
    terms: string[]
  ): (VNode | string)[] {
    if (!suggestionValue || !terms || terms.length == 0) {
      return [""];
    }

    const termRegex = new RegExp(`(${terms[0]})`, "gi");
    return suggestionValue.split(termRegex).map((valuePart: string) => {
      if (!valuePart) {
        return "";
      }

      if (termRegex.test(valuePart)) {
        return <mark>{valuePart}</mark>;
      }

      if (terms.length == 1) {
        return <span>{valuePart}</span>;
      }

      return this.markTerms(valuePart, terms.slice(1));
    });
  }

  setSelectedSuggestion(index: number) {
    this.suggestions.forEach((suggestion) => (suggestion.selected = false));
    if (index < 0 || index >= this.suggestions.length) {
      this.selectedIndex = -1;
      this.input.setAttribute("aria-activedescendant", "");
    } else {
      this.selectedIndex = index;
      this.suggestions[index].selected = true;
      this.input.setAttribute(
        "aria-activedescendant",
        this.suggestions[index].id
      );
    }

    this.suggestions = [...this.suggestions];
  }

  onMouseEnterOption = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const id = event.target.id;
      this.setSelectedSuggestion(this.suggestions.findIndex((s) => s.id == id));
    }
  };

  onMouseLeaveOption = () => {
    this.setSelectedSuggestion(-1);
  };

  onClickOption = () => {
    this.pickSelectedValue();
  };

  openSuggestions() {
    this.showSuggestions = this.suggestions.length > 0;
    this.input.setAttribute("aria-expanded", `${this.showSuggestions}`);
    this.setSelectedSuggestion(-1);
  }

  closeSuggestions() {
    this.showSuggestions = false;
    this.input.setAttribute("aria-expanded", "false");
    this.setSelectedSuggestion(-1);
  }

  pickSelectedValue() {
    if (this.selectedIndex >= 0) {
      this.input.value = this.suggestions[this.selectedIndex].value;
      this.selected?.emit(this.input.value);
    }

    this.suggestions = [];
    this.closeSuggestions();
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        if (!this.showSuggestions) {
          this.openSuggestions();
        }

        this.setSelectedSuggestion(
          this.selectedIndex >= this.suggestions.length - 1
            ? 0
            : this.selectedIndex + 1
        );
        break;

      case "ArrowUp":
        if (!this.showSuggestions) {
          this.openSuggestions();
        }

        this.setSelectedSuggestion(
          this.selectedIndex <= 0
            ? this.suggestions.length - 1
            : this.selectedIndex - 1
        );
        break;

      case "Tab":
        this.closeSuggestions();
        return;

      case "Escape":
        this.closeSuggestions();
        break;

      case "Enter":
        this.pickSelectedValue();
        break;

      default:
        return;
    }

    event.preventDefault();
  };

  render() {
    return (
      <>
        <slot />
        <ul
          role="listbox"
          id={this.listboxId}
          aria-labelledby={this.labelId}
          ref={(e) => (this.listbox = e)}
          style={{ display: this.showSuggestions ? "block" : "none" }}
        >
          {this.showSuggestions
            ? this.suggestions.map((suggestion) => (
                <li
                  role="option"
                  id={suggestion.id}
                  key={suggestion.id}
                  onMouseEnter={this.onMouseEnterOption}
                  onMouseLeave={this.onMouseLeaveOption}
                  onClick={this.onClickOption}
                  aria-selected={"" + suggestion.selected}
                  aria-label={suggestion.value}
                >
                  <span class="value">
                    {this.markTerms(suggestion.value, this.terms)}
                  </span>
                  {suggestion.type ? (
                    <span class="type">{suggestion.type}</span>
                  ) : undefined}
                </li>
              ))
            : undefined}
        </ul>
      </>
    );
  }
}
