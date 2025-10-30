import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Fragment,
  FunctionalComponent,
  Host,
  Prop,
  h,
} from "@stencil/core";

import { DsoOzonContentCustomEvent } from "../../components";
import { isModifiedEvent } from "../../utils/is-modified-event";
import { parseWijzigactieFromNode } from "../ozon-content/functions/parse-wijzigactie-from-node.function";
import {
  OzonContentAnchorClickEvent,
  OzonContentClickEvent,
  OzonContentUrlResolver,
} from "../ozon-content/ozon-content.interfaces";

import { Heading } from "./document-component-heading";
import {
  DocumentComponentAantekenElement,
  DocumentComponentAnnotationsWijzigactie,
  DocumentComponentInputType,
  DocumentComponentMarkFunction,
  DocumentComponentMarkItemHighlightEvent,
  DocumentComponentMode,
  DocumentComponentOpenToggleEvent,
  DocumentComponentOzonContentAnchorClickEvent,
  DocumentComponentRecursiveToggleEvent,
  DocumentComponentRecursiveToggleState,
  DocumentComponentTableOfContentsClickEvent,
  DocumentComponentToggleAnnotationEvent,
  DocumentComponentWijzigactie,
} from "./document-component.interfaces";

const wijzigactieLabels: { [wijzigactie in DocumentComponentWijzigactie]: string } = {
  nieuweContainer: "Toegevoegd",
  verwijder: "Verwijderd",
  verwijderContainer: "Verwijderd",
  voegtoe: "Toegevoegd",
};

const AantekenStatus: FunctionalComponent<{
  gereserveerd?: DocumentComponentAantekenElement;
  vervallen?: DocumentComponentAantekenElement;
}> = ({ gereserveerd, vervallen }) => {
  return (
    <Fragment>
      {" "}
      {gereserveerd && (
        <dso-label
          compact
          {...(gereserveerd.wijzigactie
            ? { status: gereserveerd.wijzigactie === "voegtoe" ? "toegevoegd" : "verwijderd" }
            : {})}
        >
          {gereserveerd.type}
        </dso-label>
      )}{" "}
      {vervallen && (
        <dso-label
          compact
          {...(vervallen.wijzigactie
            ? { status: vervallen.wijzigactie === "voegtoe" ? "toegevoegd" : "verwijderd" }
            : {})}
        >
          {vervallen.type}
        </dso-label>
      )}
    </Fragment>
  );
};

const AantekenAlert: FunctionalComponent<{
  gereserveerd?: DocumentComponentAantekenElement;
  vervallen?: DocumentComponentAantekenElement;
}> = ({ gereserveerd, vervallen }) => {
  if (gereserveerd && gereserveerd.wijzigactie !== "verwijder" && !vervallen) {
    return <dso-alert status="info">Dit onderdeel is gereserveerd voor toekomstige toevoeging.</dso-alert>;
  }

  if (vervallen && vervallen.wijzigactie !== "voegtoe" && !gereserveerd) {
    return <dso-alert status="info">Dit onderdeel is vervallen.</dso-alert>;
  }

  return null;
};

const parser = new DOMParser();

/**
 * @part _annotation-container - private part, do not touch.
 * @part _children-container - private part, do not touch.
 * @part _content - private part, do not touch.
 * @part _heading-container - private part, do not touch.
 */
@Component({
  tag: "dso-document-component",
  styleUrl: "document-component.scss",
  shadow: true,
})
export class DocumentComponent implements ComponentInterface {
  /**
   * The heading element to use.
   */
  @Prop()
  heading: "h2" | "h3" | "h4" | "h5" | "h6" = "h2";

  private _kopInput?: DocumentComponentInputType;
  private _kop?: XMLDocument;
  /**
   * The Kop XML.
   */
  @Prop()
  get kop(): DocumentComponentInputType | undefined {
    return this._kopInput;
  }
  set kop(value: DocumentComponentInputType | undefined) {
    this._kopInput = value;
    this._kop = typeof value === "string" ? parser.parseFromString(value, "application/xml") : value;
  }

  private _inhoudInput?: DocumentComponentInputType;
  private _inhoud?: XMLDocument;
  /**
   * The Inhoud XML.
   */
  @Prop()
  get inhoud(): DocumentComponentInputType | undefined {
    return this._inhoudInput;
  }
  set inhoud(value: DocumentComponentInputType | undefined) {
    this._inhoudInput = value;
    this._inhoud = typeof value === "string" ? parser.parseFromString(value, "application/xml") : value;
  }

  /**
   * This boolean attribute indicates whether the children are visible.
   */
  @Prop({ reflect: true })
  open = false;

  /**
   * Marks this Document Component as belonging to an active filter.
   */
  @Prop({ reflect: true })
  filtered = false;

  /**
   * Marks this Document Component as not-applicable.
   */
  @Prop({ reflect: true })
  notApplicable = false;

  /**
   * When a child Document Component has a status "Draft".
   */
  @Prop({ reflect: true })
  genesteOntwerpInformatie = false;

  /**
   * Marks as draft.
   */
  @Prop({ reflect: true })
  bevatOntwerpInformatie = false;

  /**
   * Enables annotations.
   */
  @Prop({ reflect: true })
  annotated = false;

  private _gereserveerdInput?: DocumentComponentInputType;
  private _gereserveerd?: DocumentComponentAantekenElement;
  /**
   * Marks Document Component as reserved.
   */
  @Prop()
  get gereserveerd(): DocumentComponentInputType | undefined {
    return this._gereserveerdInput;
  }
  set gereserveerd(value: DocumentComponentInputType | undefined) {
    this._gereserveerdInput = value;
    this._gereserveerd = this.parseAantekenElement(value);
  }

  private _vervallenInput?: DocumentComponentInputType;
  private _vervallen?: DocumentComponentAantekenElement;
  /**
   * Marks the Document Component as expired.
   */
  @Prop()
  get vervallen(): DocumentComponentInputType | undefined {
    return this._vervallenInput;
  }
  set vervallen(value: DocumentComponentInputType | undefined) {
    this._vervallenInput = value;
    this._vervallen = this.parseAantekenElement(value);
  }

  /**
   * When the Annotation is opened, set this to true.
   */
  @Prop({ reflect: true })
  openAnnotation = false;

  /**
   * An alternative title to show when there is nothing to create a title.
   */
  @Prop({ reflect: true })
  alternativeTitle?: string;

  /**
   * Type of Document Component.
   */
  @Prop({ reflect: true })
  type?: string;

  /**
   * The wijzigactie as in STOP.
   */
  @Prop({ reflect: true })
  wijzigactie?: DocumentComponentWijzigactie;

  /**
   * The wijzigactie for all annotations.
   */
  @Prop({ reflect: true })
  annotationsWijzigactie?: DocumentComponentAnnotationsWijzigactie;

  /**
   * To mark text.
   */
  @Prop()
  mark?: DocumentComponentMarkFunction;

  /**
   * Shows the recursive toggle button. When the user activates this button the event `dsoRecursiveToggle` is emitted.
   */
  @Prop()
  recursiveToggle: DocumentComponentRecursiveToggleState;

  /**
   * A UrlResolver that will be called for all STOP elements that render to HTML5 elements with external references.
   */
  @Prop()
  ozonContentUrlResolver?: OzonContentUrlResolver;

  /**
   * The mode of the Document Component. One of "document" or "table-of-contents". Defaults to "document"
   */
  @Prop({ reflect: true })
  mode: DocumentComponentMode = "document";

  /**
   * The URL to which the Heading links (only in mode="table-of-contents").
   */
  @Prop({ reflect: true })
  href?: string;

  /**
   * Emitted when the user activates the recursive toggle.
   */
  @Event({ bubbles: false })
  dsoRecursiveToggle!: EventEmitter<DocumentComponentRecursiveToggleEvent>;

  /**
   * Emitted when the user activates the toggle.
   */
  @Event({ bubbles: false })
  dsoOpenToggle!: EventEmitter<DocumentComponentOpenToggleEvent>;

  /**
   * Emitted when the user clicks the heading in mode="table-of-contents".
   */
  @Event({ bubbles: false })
  dsoTableOfContentsClick!: EventEmitter<DocumentComponentTableOfContentsClickEvent>;

  /**
   * Emitted when the user actives intRef or intIoRef anchors in Ozon Content
   */
  @Event({ bubbles: false })
  dsoOzonContentAnchorClick!: EventEmitter<DocumentComponentOzonContentAnchorClickEvent>;

  /**
   * Emitted when the user activates the annotation button.
   */
  @Event({ bubbles: false })
  dsoAnnotationToggle!: EventEmitter<DocumentComponentToggleAnnotationEvent>;

  /**
   * Emitted each time a marked item gets highlighted.
   */
  @Event({ bubbles: false })
  dsoMarkItemHighlight!: EventEmitter<DocumentComponentMarkItemHighlightEvent>;

  private get wijzigactieLabel(): string | undefined {
    return this.wijzigactie && wijzigactieLabels[this.wijzigactie];
  }

  private handleHeadingClick = (e: MouseEvent) => {
    if (this.mode === "table-of-contents") {
      this.dsoTableOfContentsClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
    } else if (this.type !== "LID") {
      this.dsoOpenToggle.emit({ originalEvent: e, open: !this.open });
    }
  };

  private handleOzonContentAnchorClick = (e: DsoOzonContentCustomEvent<OzonContentAnchorClickEvent>) => {
    this.dsoOzonContentAnchorClick.emit({ originalEvent: e, ozonContentAnchorClick: e.detail });
  };

  private handleOzonContentClick = (event: DsoOzonContentCustomEvent<OzonContentClickEvent>) => {
    const { detail } = event;

    if (detail.type === "Kop") {
      this.handleHeadingClick(detail.originalEvent);
    }
  };

  private handleRecursiveToggleClick = (e: MouseEvent) => {
    this.dsoRecursiveToggle.emit({
      originalEvent: e,
      current: this.recursiveToggle,
      next: this.recursiveToggle !== true,
    });
  };

  private showOntwerpBadge(): boolean {
    return (
      this.genesteOntwerpInformatie &&
      !this.bevatOntwerpInformatie &&
      ((!this.open && this.mode === "document") || this.mode === "table-of-contents")
    );
  }

  private parseAantekenElement(input?: DocumentComponentInputType): DocumentComponentAantekenElement | undefined {
    if (!input) {
      return undefined;
    }

    let element: Element | null = null;

    if (typeof input === "string") {
      const doc = parser.parseFromString(input, "application/xml");
      element = doc.documentElement;
    } else if (input instanceof XMLDocument) {
      element = input.documentElement;
    }

    if (!element) {
      return undefined;
    }

    const wijzigactie = parseWijzigactieFromNode(element);
    const tag = element.tagName.toLowerCase();

    let type: DocumentComponentAantekenElement["type"] | undefined;
    if (tag === "vervallen") {
      type = "Vervallen";
    } else if (tag === "gereserveerd") {
      type = "Gereserveerd";
    }

    if (!type) {
      return undefined;
    }

    return { type, wijzigactie };
  }

  render() {
    const collapsible = !!((this._kop || this.alternativeTitle) && this.type !== "LID");

    const showHeading = !!(
      this.wijzigactie ||
      collapsible ||
      this._kop ||
      this.alternativeTitle ||
      this.bevatOntwerpInformatie ||
      this.annotated
    );

    return (
      <Host not-collapsible={!collapsible}>
        {showHeading && (
          <div class="heading-container" part="_heading-container">
            {this.wijzigactie && <span class="editaction-label">{this.wijzigactieLabel}:</span>}
            <div class="heading">
              <Heading
                heading={this.heading}
                class="heading-element"
                onClick={this.alternativeTitle ? this.handleHeadingClick : undefined}
                mode={this.mode}
                href={this.href}
              >
                {collapsible && this.mode === "document" && (
                  <dso-icon-button
                    label={this.open ? "Invouwen" : "Uitvouwen"}
                    class="toggle-button"
                    icon={this.open ? "chevron-down" : "chevron-right"}
                    variant="tertiary"
                    onDsoClick={(e) => this.handleHeadingClick(e.detail.originalEvent)}
                  />
                )}
                <span id="heading-title">
                  {this.notApplicable && <span class="sr-only">Niet van toepassing:</span>}

                  {this._kop ? (
                    <dso-ozon-content
                      class="kop"
                      content={this._kop}
                      onDsoAnchorClick={this.handleOzonContentAnchorClick}
                      onDsoClick={this.handleOzonContentClick}
                      mark={this.mark && ((text) => this.mark?.(text, "kop"))}
                      onDsoOzonContentMarkItemHighlight={(e) =>
                        this.dsoMarkItemHighlight.emit({ ...e.detail, source: "kop" })
                      }
                      inline
                      urlResolver={this.ozonContentUrlResolver}
                    />
                  ) : (
                    this.alternativeTitle
                  )}

                  <AantekenStatus gereserveerd={this._gereserveerd} vervallen={this._vervallen} />
                </span>
              </Heading>

              {this.recursiveToggle !== undefined && this.open && this.mode === "document" && (
                <dso-icon-button
                  label={this.recursiveToggle === true ? "Verberg alles" : "Toon alles"}
                  class="recursive-toggle"
                  icon={this.recursiveToggle === true ? "eye" : "eye-slash"}
                  variant="tertiary"
                  onDsoClick={(e) => this.handleRecursiveToggleClick(e.detail.originalEvent)}
                />
              )}

              {this.showOntwerpBadge() && (
                <Fragment>
                  <dso-badge status="warning" aria-describedby="nested-draft-description">
                    !
                  </dso-badge>
                  <dso-tooltip id="nested-draft-description">
                    Er zijn onderliggende onderdelen die veranderen binnen dit ontwerp.
                  </dso-tooltip>
                </Fragment>
              )}

              {(this.bevatOntwerpInformatie || this.annotated) && (
                <div class="addons">
                  {this.bevatOntwerpInformatie && (
                    <dso-label status="warning" compact>
                      Ontwerp
                    </dso-label>
                  )}
                  {this.annotated && this.mode === "document" && (
                    <dso-icon-button
                      label={`Kenmerken en kaartgegevens ${this.openAnnotation ? "verbergen" : "tonen"}`}
                      icon="label"
                      variant="tertiary"
                      onDsoClick={(e) => this.dsoAnnotationToggle.emit({ originalEvent: e.detail.originalEvent })}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {this.openAnnotation && (
          <div class="annotation-container" part="_annotation-container">
            <dso-panel
              id="annotations"
              onDsoCloseClick={(e) => this.dsoAnnotationToggle.emit({ originalEvent: e })}
              closeButtonLabel="Kenmerken en kaartgegevens verbergen"
            >
              <h2 slot="heading">Kenmerken en kaart</h2>
              <slot name="annotations" />
            </dso-panel>
          </div>
        )}

        {this.open && (this._inhoud || this._gereserveerd || this._vervallen) && this.mode === "document" && (
          <div class="content" part="_content">
            <AantekenAlert gereserveerd={this._gereserveerd} vervallen={this._vervallen} />

            {this._inhoud && (
              <dso-ozon-content
                content={this._inhoud}
                onDsoAnchorClick={this.handleOzonContentAnchorClick}
                onDsoClick={this.handleOzonContentClick}
                mark={this.mark && ((text) => this.mark?.(text, "inhoud"))}
                onDsoOzonContentMarkItemHighlight={(e) =>
                  this.dsoMarkItemHighlight.emit({ ...e.detail, source: "inhoud" })
                }
                urlResolver={this.ozonContentUrlResolver}
              />
            )}
          </div>
        )}

        <div class="children-container" part="_children-container">
          <slot />
        </div>
      </Host>
    );
  }
}
