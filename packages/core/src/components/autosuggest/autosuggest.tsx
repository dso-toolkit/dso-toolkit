import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  FunctionalComponent,
  h,
  Listen,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";

import debounce from "debounce";
import escapeStringRegexp from "escape-string-regexp";

import { v4 } from "uuid";

import { i18n } from "../../utils/i18n";

import { AutosuggestMarkFunction, AutosuggestMarkItem, Suggestion, SuggestionGroup } from "./autosuggest.interfaces";
import { translations } from "./autosuggest.i18n";

interface MarkedSuggestion {
  value: (VNode | string)[];
  type?: (VNode | string)[];
  extras?: (VNode | string)[][][];
}

const maxSuggestionsViewable = 10;
const listboxPaddingBlock = 8;
const listboxBorderWidth = 1;

const Option: FunctionalComponent<{
  id: string;
  mouseEnter: () => void;
  mouseLeave: () => void;
  click: () => void;
  selected: string;
  suggestion: Suggestion;
  markedSuggestion: MarkedSuggestion;
  ref: (element: HTMLDivElement | undefined) => void;
}> = ({ id, mouseEnter, mouseLeave, click, selected, suggestion, ref, markedSuggestion }) => (
  <div
    class="option"
    role="option"
    id={id}
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
    onClick={click}
    aria-selected={selected}
    aria-label={suggestion.value}
    ref={ref}
  >
    <div class="suggestion-row">
      <span class="value">{markedSuggestion.value}</span>
      {markedSuggestion.type ? <span class="type">{markedSuggestion.type}</span> : undefined}
    </div>
    {markedSuggestion.extras &&
      markedSuggestion.extras.map((markedChunk) => (
        <div class="suggestion-row">
          {markedChunk.map((extra) => (
            <span class="extra">{extra}</span>
          ))}
        </div>
      ))}
  </div>
);

function isGrouped(suggestions: Suggestion[] | SuggestionGroup[] | null): suggestions is SuggestionGroup[] {
  return (
    !!suggestions &&
    suggestions.length > 0 &&
    suggestions.every(
      (suggestion) =>
        suggestion !== undefined &&
        "groupLabel" in suggestion &&
        suggestion.groupLabel !== undefined &&
        "suggestions" in suggestion &&
        suggestion.suggestions.length > 0,
    )
  );
}

function isFlat(suggestions: Suggestion[] | SuggestionGroup[] | null): suggestions is Suggestion[] {
  return (
    !!suggestions &&
    suggestions.length > 0 &&
    suggestions.every(
      (suggestion) => suggestion !== undefined && "value" in suggestion && suggestion.value !== undefined,
    )
  );
}

@Component({
  tag: "dso-autosuggest",
  styleUrl: "autosuggest.scss",
  scoped: true,
})
export class Autosuggest {
  /**
   * The suggestions for the value of the slotted input element.
   *
   * This can be an array of type Suggestion or an Array of type SuggestionGroup.
   *
   * A suggestionGroup must have a `groupLabel` and `suggestions`.
   *
   * A suggestion must have a `value` and can have a `type`, an `item` or `extras`.
   *
   * The `type` is used to style the suggestion. `item` can be use to reference the original object that was used to
   * create the suggestion. `extras` is an array of additional strings to further specify the suggestion.
   *
   * The value should be null when no suggestions have been fetched.
   */
  @Prop()
  readonly suggestions: Suggestion[] | SuggestionGroup[] | null = null;

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
  selectedSuggestionGroup: SuggestionGroup | undefined;

  @State()
  notFound = false;

  @State()
  showLoading = false;

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

  private listbox: HTMLDivElement | undefined;

  // ListboxItems are used for the calculation of the listboxContainerMaxBlockSize
  private listboxItems: HTMLDivElement[] = [];

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

  private text = i18n(() => this.host, translations);

  componentDidRender() {
    this.setListboxContainerMaxBlockSize();
  }

  connectedCallback() {
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

    if (this.showSuggestions) {
      let blockSizeViewableListItems = 0;
      let listboxContainerMaxBlockSize = 0;

      // The total number of list items to reserve vertical space for.
      const total = this.listboxItems.length ? Math.min(this.listboxItems.length, maxSuggestionsViewable) : 0;
      for (let i = 0; i < total; i++) {
        blockSizeViewableListItems =
          blockSizeViewableListItems + (this.listboxItems[i]?.getBoundingClientRect().height || 0);
      }

      const availableBlockSize = window.innerHeight - this.host.getBoundingClientRect().bottom;
      const listboxMaxBlockSize = blockSizeViewableListItems + 2 * listboxPaddingBlock + 2 * listboxBorderWidth;

      if (availableBlockSize < listboxMaxBlockSize || availableBlockSize <= blockSizeViewableListItems) {
        listboxContainerMaxBlockSize = availableBlockSize - 2 * listboxPaddingBlock;
      } else {
        listboxContainerMaxBlockSize = listboxMaxBlockSize;
      }

      this.listboxContainer.style.setProperty("--_dso-autosuggest-max-block-size", `${listboxContainerMaxBlockSize}px`);
    }
  }

  private showInputValueNotFound(text?: string) {
    return this.processAutosuggestMarkItems(this.markTerms(this.input?.value.split(" ").filter((t) => t) ?? [], text));
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
    return this.processAutosuggestMarkItems(this.markTerms(this.input?.value.split(" ").filter((t) => t) ?? [], text));
  }

  private markTerms(terms: string[], suggestionValue?: string): AutosuggestMarkItem[] {
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
        total.push(...this.markTerms(terms.slice(1), valuePart));
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

  private selectSuggestion(suggestion: Suggestion, group?: SuggestionGroup) {
    this.selectedSuggestion = suggestion;
    this.selectedSuggestionGroup = group;

    this.setAriaActiveDescendant();
  }

  private selectFirstSuggestion() {
    if (!this.suggestions) {
      return;
    }

    if (isGrouped(this.suggestions) && this.selectedSuggestionGroup) {
      this.selectedSuggestion = this.selectedSuggestionGroup.suggestions[0];
    } else {
      if (isFlat(this.suggestions)) {
        this.selectedSuggestion = this.suggestions[0];
      }
    }

    this.setAriaActiveDescendant(true);
  }

  private selectLastSuggestion() {
    if (!this.suggestions) {
      return;
    }

    if (isGrouped(this.suggestions) && this.selectedSuggestionGroup) {
      this.selectedSuggestion =
        this.selectedSuggestionGroup.suggestions[this.selectedSuggestionGroup.suggestions.length - 1];
    } else {
      if (isFlat(this.suggestions)) {
        this.selectedSuggestion = this.suggestions[this.suggestions.length - 1];
      }
    }
    this.setAriaActiveDescendant(true);
  }

  private selectNextSuggestion() {
    if (!this.suggestions) {
      return;
    }

    if (isGrouped(this.suggestions)) {
      this.selectNextGroupedSuggestion();
    } else {
      const index = this.selectedSuggestion ? this.suggestions.indexOf(this.selectedSuggestion) : -1;

      this.selectedSuggestion = this.suggestions[index + 1] ?? this.suggestions[0];
    }

    this.setAriaActiveDescendant(true);
  }

  private selectNextGroupedSuggestion() {
    if (!this.suggestions) {
      return;
    }

    if (this.selectedSuggestionGroup) {
      const indexInGroup = this.selectedSuggestion
        ? this.selectedSuggestionGroup.suggestions.indexOf(this.selectedSuggestion)
        : -1;

      if (indexInGroup === this.selectedSuggestionGroup.suggestions.length - 1) {
        // Move to first suggestion in next or first group
        const groupIndex = this.suggestionGroups.indexOf(this.selectedSuggestionGroup);
        this.selectedSuggestionGroup = this.suggestionGroups[groupIndex + 1] ?? this.suggestionGroups[0];
        this.selectedSuggestion = this.selectedSuggestionGroup!.suggestions[0];
      } else {
        // Within this group
        this.selectedSuggestion = this.selectedSuggestionGroup.suggestions[indexInGroup + 1];
      }
    } else {
      this.selectedSuggestionGroup = this.suggestionGroups[0];
      this.selectedSuggestion = this.selectedSuggestionGroup!.suggestions[0];
    }
  }

  private selectPreviousSuggestion() {
    if (!this.suggestions) {
      return;
    }

    if (isGrouped(this.suggestions)) {
      this.selectPreviousGroupedSuggestion();
    } else {
      const index = this.selectedSuggestion ? this.suggestions.indexOf(this.selectedSuggestion) : 0;

      this.selectedSuggestion = this.suggestions[index - 1] ?? this.suggestions[this.suggestions.length - 1];
    }

    this.setAriaActiveDescendant(true);
  }

  private selectPreviousGroupedSuggestion() {
    if (!this.suggestions) {
      return;
    }

    if (this.selectedSuggestionGroup) {
      const indexInGroup = this.selectedSuggestion
        ? this.selectedSuggestionGroup.suggestions.indexOf(this.selectedSuggestion)
        : -1;

      if (indexInGroup === 0) {
        // Move to last suggestion in previous or last group
        const groupIndex = this.suggestionGroups.indexOf(this.selectedSuggestionGroup);

        this.selectedSuggestionGroup =
          this.suggestionGroups[groupIndex - 1] ?? this.suggestionGroups[this.suggestions.length - 1];
        this.selectedSuggestion =
          this.selectedSuggestionGroup!.suggestions[this.selectedSuggestionGroup!.suggestions.length - 1];
      } else {
        // Within this group
        this.selectedSuggestion = this.selectedSuggestionGroup.suggestions[indexInGroup - 1];
      }
    } else {
      this.selectedSuggestionGroup = this.suggestionGroups[this.suggestions.length - 1];
      this.selectedSuggestion =
        this.selectedSuggestionGroup!.suggestions[this.selectedSuggestionGroup!.suggestions.length - 1];
    }
  }

  private get suggestionGroups(): SuggestionGroup[] {
    return isGrouped(this.suggestions) ? this.suggestions : [];
  }

  private setAriaActiveDescendant(scroll = false): void {
    if (this.selectedSuggestion) {
      const id = this.selectedSuggestionGroup
        ? this.listboxGroupedItemId(this.selectedSuggestionGroup, this.selectedSuggestion)
        : this.listboxItemId(this.selectedSuggestion);
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
    this.selectedSuggestionGroup = undefined;
    this.input?.setAttribute("aria-activedescendant", "");
  }

  private openSuggestions(selectSuggestion?: "first" | "last") {
    this.showSuggestions = (this.suggestions && this.suggestions.length > 0) ?? false;
    this.notFound = (this.suggestions && this.suggestions?.length === 0) ?? false;
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
    return `${this.inputId}-${isFlat(this.suggestions) && this.suggestions.indexOf(suggestion) + 1}`;
  }

  private listboxGroupedItemId(suggestionGroup: SuggestionGroup, suggestion: Suggestion): string {
    if (!this.suggestions) {
      return "";
    }

    return `${this.inputId}-${this.suggestionGroups.indexOf(suggestionGroup) + 1}-${suggestionGroup.suggestions.indexOf(suggestion) + 1}`;
  }

  private getMarkedChunkedExtras(extras: string[], suggestion: Suggestion): (string | VNode)[][][] {
    const chunkedExtras = extras.reduce((resultArray: string[][], extra, index) => {
      const chunkIndex = Math.floor(index / 2);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex]?.push(extra);
      return resultArray;
    }, []);

    return chunkedExtras.map((chunk, index) =>
      chunk.map((c, i) => this.handleMark(suggestion, c, "extra", index * 2 + i)),
    );
  }

  private getMarkedSuggestions(suggestion: Suggestion): MarkedSuggestion {
    return {
      value: this.handleMark(suggestion, suggestion.value, "value"),
      type: suggestion.type ? this.handleMark(suggestion, suggestion.type, "type") : undefined,
      extras: suggestion.extras ? this.getMarkedChunkedExtras(suggestion.extras, suggestion) : undefined,
    };
  }

  private getAutosuggestStatus() {
    if (this.notFound) {
      return `"${this.inputValue}" is niet gevonden.`;
    }

    let totalSuggestions = 0;

    if (isFlat(this.suggestions)) {
      totalSuggestions = this.suggestions.length;
    } else if (isGrouped(this.suggestions)) {
      totalSuggestions = this.suggestions.reduce((count, group) => count + group.suggestions.length, 0);
    }

    return `${totalSuggestions} resultaten gevonden.`;
  }

  render() {
    this.listboxItems = [];

    const showListbox = this.showSuggestions || this.notFound;

    const grouped = isGrouped(this.suggestions);
    const flat = isFlat(this.suggestions);

    if (showListbox && this.input) {
      this.input.setAttribute("aria-controls", this.listboxId);
    } else if (this.input) {
      this.input.removeAttribute("aria-controls");
    }

    return (
      <>
        <slot />
        {this.loading && this.showLoading ? (
          <div class="autosuggest-progress-box">
            <dso-progress-indicator label={this.loadingLabel}></dso-progress-indicator>
          </div>
        ) : (
          showListbox && (
            <>
              <dso-scrollable class="listbox-container" ref={(element) => (this.listboxContainer = element)}>
                <div
                  class="listbox"
                  role="listbox"
                  id={this.listboxId}
                  aria-labelledby={this.labelId}
                  ref={(element) => (this.listbox = element)}
                  tabindex="0"
                >
                  {(flat &&
                    this.showSuggestions &&
                    this.suggestions &&
                    this.suggestions.map((suggestion) => (
                      <Option
                        id={this.listboxItemId(suggestion)}
                        mouseEnter={() => this.selectSuggestion(suggestion)}
                        mouseLeave={() => this.resetSelectedSuggestion()}
                        click={() => this.pickSelectedValue()}
                        selected={(suggestion === this.selectedSuggestion).toString()}
                        suggestion={suggestion}
                        ref={(element) => element && this.listboxItems.push(element)}
                        markedSuggestion={this.getMarkedSuggestions(suggestion)}
                      />
                    ))) ||
                    (grouped &&
                      this.showSuggestions &&
                      this.suggestions &&
                      this.suggestions.map((suggestionGroup) => {
                        const groupLabelId = v4();
                        return (
                          <div role="group" class="group" aria-labelledby={groupLabelId}>
                            <div
                              class="group-label"
                              role="presentation"
                              id={groupLabelId}
                              ref={(element) => element && this.listboxItems.push(element)}
                            >
                              {suggestionGroup.groupLabel}
                            </div>
                            {suggestionGroup.suggestions.map((suggestion) => (
                              <Option
                                id={this.listboxGroupedItemId(suggestionGroup, suggestion)}
                                mouseEnter={() => this.selectSuggestion(suggestion, suggestionGroup)}
                                mouseLeave={() => this.resetSelectedSuggestion()}
                                click={() => this.pickSelectedValue()}
                                selected={(suggestion === this.selectedSuggestion).toString()}
                                suggestion={suggestion}
                                ref={(element) => element && this.listboxItems.push(element)}
                                markedSuggestion={this.getMarkedSuggestions(suggestion)}
                              />
                            ))}
                          </div>
                        );
                      })) ||
                    (this.notFound && (
                      <div class="option">
                        <span class="value">
                          {this.notFoundLabel ||
                            this.showInputValueNotFound(this.text("notFound", { inputValue: this.inputValue }))}
                        </span>
                      </div>
                    ))}
                </div>
              </dso-scrollable>
              <div class="sr-only" aria-live="polite" aria-atomic="true">
                {this.getAutosuggestStatus()}
              </div>
            </>
          )
        )}
      </>
    );
  }
}
