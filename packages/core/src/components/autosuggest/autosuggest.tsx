import { Component, Element, Event, EventEmitter, Fragment, h, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import debounce from "debounce";
import { v4 } from "uuid";
import escapeStringRegexp from "escape-string-regexp";

import { AutosuggestMarkFunction, AutosuggestMarkItem, Suggestion } from "./autosuggest.interfaces";

const maxSuggestionsViewable = 10;
const listboxPaddingBlock = 8;
const listboxBorderWidth = 1;

@Component({
  tag: "dso-autosuggest",
  styleUrl: "autosuggest.scss",
  scoped: true,
})
export class Autosuggest {
  /**
   * The suggestions for the value of the slotted input element. Optionally a
   * Suggestion can have a `type` and `item`.
   *
   * The `type` is used to style the suggestion. `item` can be use to reference
   * the original object that was used to create the suggestion.
   *
   * The value should be null when no suggestions have been fetched.
   */
  @Prop()
  readonly suggestions: Suggestion[] | null = null;

  /**
   * Shows progress indicator when fetching results.
   */
  @Prop()
  loading = false;

  /**
   * To override progress indicator's default loading label.
   */
  @Prop()
  loadingLabel?: string = "Een moment geduld.";

  /**
   * To delay progress indicator showing (in ms).
   */
  @Prop()
  loadingDelayed?: number;

  /**
   * To show text when no results are found.
   */
  @Prop()
  notFoundLabel?: string;

  /**
   * Whether the previous suggestions will be presented when the input gets focus again.
   */
  @Prop()
  suggestOnFocus = false;

  /**
   * A function provided by the consumer of the autosuggest component, that returns an array of `AutosuggestMarkItem`s
   */
  @Prop()
  mark?: AutosuggestMarkFunction;

  /**
   * Emitted when a suggestion is selected.
   * The `detail` property of the `CustomEvent` will contain the selected suggestion.
   */
  @Event()
  dsoSelect!: EventEmitter<Suggestion>;

  /**
   * This is emitted debounced for every change for the slotted input type=text element.
   */
  @Event()
  dsoChange!: EventEmitter<string>;

  /**
   * Emitted when enter is pressed.
   * The `detail` property of the `CustomEvent` will contain the input text.
   */
  @Event()
  dsoSearch!: EventEmitter<string>;

  @Element()
  host!: HTMLDsoAutosuggestElement;

  @State()
  showSuggestions = false;

  @State()
  selectedSuggestion: Suggestion | undefined;

  @State()
  notFound = false;

  @State()
  showLoading = false;

  @State()
  listItemBlockSize = 0;

  @State()
  listboxContainerMaxBlockSize = 0;

  @Watch("suggestions")
  suggestionsWatcher() {
    this.resetSelectedSuggestion();

    if ((!this.showSuggestions || !this.notFound) && this.inputValue) {
      this.openSuggestions();
    } else if ((this.showSuggestions || this.notFound) && !this.inputValue) {
      this.closeSuggestions();
    }
  }

  private input?: HTMLInputElement;

  private listboxContainer: HTMLDsoScrollableElement | undefined;

  private listbox: HTMLUListElement | undefined;

  private listboxItems: HTMLLIElement[] = [];

  private listboxId: string = v4();

  private inputId: string = v4();

  private labelId: string = v4();

  private resizeObserver = new ResizeObserver(debounce(() => this.setListboxContainerMaxBlockSize(), 150));

  private debouncedEmitValue = debounce((value: string) => {
    this.dsoChange.emit(value);
    this.debouncedShowLoading();
  }, 200);

  private debouncedShowLoading = debounce(() => {
    if (this.inputValue) {
      this.showLoading = true;
    }
  }, this.loadingDelayed);

  private inputValue = "";

  private onInput = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
      // throw new Error("event.target is not instanceof HTMLInputElement"); #2293
    }

    this.showLoading = !this.loadingDelayed;
    this.inputValue = event.target.value;
    this.debouncedEmitValue(event.target.value.match(/(\S+)/g) ? event.target.value : "");
  };

  private onFocusIn = () => {
    if (this.suggestOnFocus) {
      this.openSuggestions();
    }
  };

  @Listen("click", { target: "document" })
  onDocumentClick(event: MouseEvent) {
    if (
      (this.showSuggestions || this.notFound) &&
      this.listbox &&
      event.target instanceof Node &&
      !this.listbox.contains(event.target) &&
      this.input !== event.target
    ) {
      this.closeSuggestions();
    }
  }

  connectedCallback() {
    setTimeout(() => {
      const input = this.host.querySelector('input[type="text"]');
      if (!(input instanceof HTMLInputElement)) {
        return;
        // throw new ReferenceError("Mandatory text input not found"); #2293
      }

      this.input = input;
      if (input.id) {
        this.inputId = input.id;
      } else {
        input.id = this.inputId;
      }

      if (!this.input.labels || this.input.labels.length < 1) {
        return;
        // throw new ReferenceError("Mandatory label for text input not found"); #2293
      }

      const label = this.input.labels[0];
      if (label?.id) {
        this.labelId = label.id;
      } else if (label) {
        label.id = this.labelId;
      }

      this.input.setAttribute("role", "combobox");
      this.input.setAttribute("aria-haspopup", "listbox");
      this.input.setAttribute("aria-controls", this.listboxId);
      this.input.setAttribute("aria-expanded", "false");
      this.input.setAttribute("autocomplete", "off");
      this.input.setAttribute("aria-autocomplete", "list");
      this.input.setAttribute("aria-activedescendant", "");
      this.input.addEventListener("input", this.onInput);
      this.input.addEventListener("keydown", this.onKeyDown);
      this.input.addEventListener("focusin", this.onFocusIn);

      window.addEventListener("resize", this.onWindowResize);

      document.addEventListener("scrollend", this.onScrollend);

      this.resizeObserver.observe(this.host);

      this.setListboxContainerMaxBlockSize();
    });
  }

  disconnectedCallback() {
    this.input?.removeEventListener("input", this.onInput);
    this.input?.removeEventListener("keydown", this.onKeyDown);
    this.input?.removeEventListener("focusin", this.onFocusIn);

    window.removeEventListener("resize", this.onWindowResize);

    document.removeEventListener("scrollend", this.onScrollend);

    this.resizeObserver.disconnect();
  }

  private onWindowResize = debounce(() => this.setListboxContainerMaxBlockSize(), 150);

  private onScrollend = () => this.setListboxContainerMaxBlockSize();

  private setListboxContainerMaxBlockSize(): void {
    if (!this.listboxContainer || !this.showSuggestions) {
      return;
    }

    if (this.listboxItems[0] && this.showSuggestions) {
      this.listItemBlockSize = this.listboxItems[0].getBoundingClientRect().height;
    }

    const availableBlockSize = window.innerHeight - this.host.getBoundingClientRect().bottom;
    const listboxMaxBlockSize =
      this.listItemBlockSize * maxSuggestionsViewable + 2 * listboxPaddingBlock + 2 * listboxBorderWidth;

    if (availableBlockSize > this.listItemBlockSize) {
      if (availableBlockSize < listboxMaxBlockSize) {
        this.listboxContainerMaxBlockSize = availableBlockSize - 2 * listboxPaddingBlock;
      } else {
        this.listboxContainerMaxBlockSize = listboxMaxBlockSize;
      }
    }
  }

  private showInputValueNotFound(text: string) {
    return this.processAutosuggestMarkItems(this.markTerms(text, this.input?.value.split(" ").filter((t) => t) ?? []));
  }

  private handleMark(
    suggestion: Suggestion,
    text: string,
    type?: "value" | "type" | "extra",
    extraIndex?: number,
  ): (VNode | string)[] {
    if (this.mark && type) {
      return this.processAutosuggestMarkItems(this.mark(suggestion, text, type, extraIndex));
    }
    return this.processAutosuggestMarkItems(this.markTerms(text, this.input?.value.split(" ").filter((t) => t) ?? []));
  }

  private markTerms(suggestionValue: string, terms: string[]): AutosuggestMarkItem[] {
    if (!suggestionValue || !terms || terms.length === 0 || terms[0] === undefined) {
      return [""];
    }

    const termRegex = new RegExp(`(${escapeStringRegexp(terms[0])})`, "gi");

    return suggestionValue.split(termRegex).reduce((total: AutosuggestMarkItem[], valuePart: string) => {
      if (!valuePart) {
        total.push(valuePart);
      } else if (termRegex.test(valuePart)) {
        total.push({ mark: valuePart });
      } else if (terms.length === 1) {
        total.push(valuePart);
      } else {
        total.push(...this.markTerms(valuePart, terms.slice(1)));
      }

      return total;
    }, []);
  }

  private processAutosuggestMarkItems(items: AutosuggestMarkItem[]): (VNode | string)[] {
    if (items.length === 0) {
      return [""];
    }

    return items.map((item) => {
      if (typeof item === "object") {
        return <mark>{item.mark}</mark>;
      }
      return item;
    });
  }

  private selectSuggestion(suggestion: Suggestion) {
    this.selectedSuggestion = suggestion;

    this.setAriaActiveDescendant();
  }

  private selectFirstSuggestion() {
    if (!this.suggestions) {
      return;
    }

    this.selectedSuggestion = this.suggestions[0];

    this.setAriaActiveDescendant(true);
  }

  private selectLastSuggestion() {
    if (!this.suggestions) {
      return;
    }

    this.selectedSuggestion = this.suggestions[this.suggestions.length - 1];

    this.setAriaActiveDescendant(true);
  }

  private selectNextSuggestion() {
    if (!this.suggestions) {
      return;
    }

    const index = this.selectedSuggestion ? this.suggestions.indexOf(this.selectedSuggestion) : -1;

    this.selectedSuggestion = this.suggestions[index + 1] ?? this.suggestions[0];

    this.setAriaActiveDescendant(true);
  }

  private selectPreviousSuggestion() {
    if (!this.suggestions) {
      return;
    }

    const index = this.selectedSuggestion ? this.suggestions.indexOf(this.selectedSuggestion) : 0;

    this.selectedSuggestion = this.suggestions[index - 1] ?? this.suggestions[this.suggestions.length - 1];

    this.setAriaActiveDescendant(true);
  }

  private setAriaActiveDescendant(scroll = false): void {
    if (this.selectedSuggestion) {
      const id = this.listboxItemId(this.selectedSuggestion);
      this.input?.setAttribute("aria-activedescendant", id);
      if (scroll) {
        document.getElementById(id)?.scrollIntoView({ block: "nearest" });
      }
    }
  }

  private resetSelectedSuggestion() {
    this.showLoading = !this.loadingDelayed;
    this.notFound = false;
    this.selectedSuggestion = undefined;
    this.input?.setAttribute("aria-activedescendant", "");
  }

  private openSuggestions(selectSuggestion?: "first" | "last") {
    this.showSuggestions = (this.suggestions && this.suggestions.length > 0) ?? false;
    this.notFound = this.suggestions?.length === 0 ?? false;
    this.input?.setAttribute("aria-expanded", (this.showSuggestions || this.notFound).toString());

    if (this.showSuggestions && selectSuggestion === "first") {
      this.selectFirstSuggestion();
    } else if (this.showSuggestions && selectSuggestion === "last") {
      this.selectLastSuggestion();
    }
  }

  private closeSuggestions() {
    this.showSuggestions = false;
    this.notFound = false;
    this.input?.setAttribute("aria-expanded", "false");
    this.selectFirstSuggestion();
  }

  private pickSelectedValue() {
    if (this.selectedSuggestion && this.showSuggestions) {
      this.dsoSelect.emit(this.selectedSuggestion);
    } else {
      this.dsoSearch.emit(this.input?.value);
    }

    this.closeSuggestions();
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || this.loading) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        if (!this.showSuggestions) {
          this.openSuggestions("first");
        } else {
          this.selectNextSuggestion();
        }

        break;

      case "ArrowUp":
        if (!this.showSuggestions) {
          this.openSuggestions("last");
        } else {
          this.selectPreviousSuggestion();
        }

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

  private listboxItemId(suggestion: Suggestion): string {
    if (!this.suggestions) {
      return "";
    }
    return `${this.inputId}-${this.suggestions.indexOf(suggestion) + 1}`;
  }

  private getChunkedExtras(extras: string[]): string[][] {
    return extras.reduce((resultArray: string[][], extra, index) => {
      const chunkIndex = Math.floor(index / 2);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex]?.push(extra);
      return resultArray;
    }, []);
  }

  render() {
    this.listboxItems = [];

    return (
      <>
        <slot />
        {this.loading && this.showLoading ? (
          <div class="autosuggest-progress-box">
            <dso-progress-indicator label={this.loadingLabel}></dso-progress-indicator>
          </div>
        ) : (
          <dso-scrollable
            class="listbox-container"
            ref={(element) => (this.listboxContainer = element)}
            style={{ "--max-block-size": `${this.listboxContainerMaxBlockSize}px` }}
          >
            <ul
              role="listbox"
              aria-live="polite"
              id={this.listboxId}
              aria-labelledby={this.labelId}
              ref={(element) => (this.listbox = element)}
              hidden={!this.showSuggestions && !this.notFound}
            >
              {(this.showSuggestions &&
                this.suggestions &&
                this.suggestions.map((suggestion) => (
                  <li
                    role="option"
                    id={this.listboxItemId(suggestion)}
                    key={suggestion.value}
                    onMouseEnter={() => this.selectSuggestion(suggestion)}
                    onMouseLeave={() => this.resetSelectedSuggestion()}
                    onClick={() => this.pickSelectedValue()}
                    aria-selected={(suggestion === this.selectedSuggestion).toString()}
                    aria-label={suggestion.value}
                    ref={(li) => li && this.listboxItems.push(li)}
                  >
                    <div class="suggestion-row">
                      <span class="value">{this.handleMark(suggestion, suggestion.value, "value")}</span>
                      {suggestion.type ? (
                        <span class="type">{this.handleMark(suggestion, suggestion.type, "type")}</span>
                      ) : undefined}
                    </div>
                    {suggestion.extras &&
                      this.getChunkedExtras(suggestion.extras).map((chunk, index) => (
                        <div class="suggestion-row">
                          {chunk.map((c, i) => (
                            <span class="extra">{this.handleMark(suggestion, c, "extra", index * 2 + i)}</span>
                          ))}
                        </div>
                      ))}
                  </li>
                ))) ||
                (this.notFound && (
                  <li>
                    <span class="value">
                      {!this.notFoundLabel ? (
                        this.showInputValueNotFound(`${this.inputValue} is niet gevonden.`)
                      ) : (
                        <span>{this.notFoundLabel}</span>
                      )}
                    </span>
                  </li>
                ))}
            </ul>
          </dso-scrollable>
        )}
      </>
    );
  }
}
