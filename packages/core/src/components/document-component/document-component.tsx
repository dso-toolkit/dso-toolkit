import {
  h,
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Fragment,
  FunctionalComponent,
  Host,
  Prop,
} from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

export interface DocumentComponentOpenToggleEvent {
  originalEvent: Event;
  open: boolean;
}

export interface DocumentComponentToggleAnnotationEvent {
  originalEvent: Event;
}

export type DocumentComponentWijzigactie = "voegtoe" | "verwijder" | "nieuweContainer" | "verwijderContainer";

interface DocumentComponentHeadingProps {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: FunctionalComponent<DocumentComponentHeadingProps & JSXBase.HTMLAttributes<HTMLHeadingElement>> = (
  { heading, ...props },
  children
) => {
  switch (heading) {
    default:
    case "h2":
      return <h2 {...props}>{children}</h2>;
    case "h3":
      return <h3 {...props}>{children}</h3>;
    case "h4":
      return <h4 {...props}>{children}</h4>;
    case "h5":
      return <h5 {...props}>{children}</h5>;
    case "h6":
      return <h6 {...props}>{children}</h6>;
  }
};

const wijzigActieLabels: { [wijzigActie in DocumentComponentWijzigactie]: string } = {
  nieuweContainer: "Toegevoegd",
  verwijder: "Verwijderd",
  verwijderContainer: "Verwijderd",
  voegtoe: "Toegevoegd",
};

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

  /**
   * The Label XML.
   */
  @Prop()
  label?: string;

  /**
   * The Nummer XML.
   */
  @Prop()
  nummer?: string;

  /**
   * The Opschrift XML.
   */
  @Prop()
  opschrift?: string;

  /**
   * The Inhoud XML.
   */
  @Prop()
  inhoud?: string;

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
  nestedDraft = false;

  /**
   * Marks as draft.
   */
  @Prop({ reflect: true })
  draft = false;

  /**
   * Enables annotations.
   */
  @Prop({ reflect: true })
  annotated = false;

  /**
   * Marks Document Component as reserved.
   */
  @Prop()
  reserved = false;

  /**
   * Marks the Document Component as expired.
   */
  @Prop()
  expired = false;

  /**
   * Type of Document Component.
   */
  @Prop({ reflect: true })
  type?: string;

  /**
   * The wijzigactie as in STOP.
   */
  @Prop()
  wijzigactie?: DocumentComponentWijzigactie;

  /**
   * Emitted when the user activates the toggle.
   */
  @Event({ bubbles: false })
  dsoOpenToggle!: EventEmitter<DocumentComponentOpenToggleEvent>;

  /**
   * Emitted when the user activates the annotation button.
   */
  @Event({ bubbles: false })
  dsoAnnotationToggle!: EventEmitter<DocumentComponentToggleAnnotationEvent>;

  private get wijzigactieLabel(): string | undefined {
    return this.wijzigactie && wijzigActieLabels[this.wijzigactie];
  }

  private handleHeadingClick = (e: MouseEvent) => {
    if (this.type !== "LID") {
      this.dsoOpenToggle.emit({ originalEvent: e, open: !this.open });
    }
  };

  private suffix(): string | undefined {
    if (this.expired) {
      return "vervallen";
    }

    if (this.reserved) {
      return "gereserveerd";
    }

    return undefined;
  }

  render() {
    const suffix = this.suffix();

    return (
      <Host wijzigactie={this.wijzigactie}>
        <div class="heading-container">
          {this.wijzigactie && <span class="wijzigactie-label">{this.wijzigactieLabel}:</span>}
          <div class="heading">
            <Heading heading={this.heading} class="heading-element" onClick={this.handleHeadingClick}>
              {this.type !== "LID" && (
                <button type="button" class="toggle-button">
                  <dso-icon icon={this.open ? "chevron-down" : "chevron-right"}></dso-icon>
                </button>
              )}
              <div class="title">
                {this.notApplicable && <span class="not-applicable">Niet van toepassing:</span>}
                <dso-ozon-content content={this.label} inline></dso-ozon-content>{" "}
                <dso-ozon-content content={this.nummer} inline></dso-ozon-content>{" "}
                <dso-ozon-content content={this.opschrift} inline></dso-ozon-content>
                {suffix && <span> - [{suffix}]</span>}
              </div>
            </Heading>
            {this.nestedDraft && !this.open && !this.draft && (
              <>
                <dso-badge status="warning" aria-describedby="nested-draft-description">
                  !
                </dso-badge>
                <dso-tooltip id="nested-draft-description">Er is een ontwerp beschikbaar.</dso-tooltip>
              </>
            )}
            {(this.draft || this.annotated) && (
              <div class="addons">
                {this.draft && (
                  <dso-label status="warning" compact>
                    Ontwerp
                  </dso-label>
                )}
                {this.annotated && (
                  <dso-annotation-button
                    identifier="expandable"
                    onDsoClick={(e) => this.dsoAnnotationToggle.emit({ originalEvent: e })}
                  ></dso-annotation-button>
                )}
              </div>
            )}
          </div>
        </div>
        <slot name="annotation" />
        {this.open && (this.inhoud || this.reserved) && (
          <div class="content">
            {this.reserved && (
              <dso-alert status="info">Dit onderdeel is gereserveerd voor toekomstige toevoeging.</dso-alert>
            )}
            <dso-ozon-content content={this.inhoud}></dso-ozon-content>
          </div>
        )}
        <slot />
      </Host>
    );
  }
}
