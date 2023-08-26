import { h, Component, ComponentInterface, Event, EventEmitter, Fragment, Prop } from "@stencil/core";
import {
  DocumentComponentOpenToggleEvent,
  DocumentComponentToggleAnnotationEvent,
  DocumentComponentOzonContentAnchorClickEvent,
  DocumentComponentWijzigactie,
} from "./document-component.models";
import { OzonContentAnchorClickEvent } from "../ozon-content/ozon-content.interfaces";
import { Heading } from "./document-component-heading";

import { DsoOzonContentCustomEvent } from "../../components";

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

  /**
   * Marks Document Component as reserved.
   */
  @Prop()
  gereserveerd = false;

  /**
   * Marks the Document Component as expired.
   */
  @Prop()
  vervallen = false;

  /**
   * When the Annotation Output is opened, set this to true.
   */
  @Prop()
  openAnnotation = false;

  /**
   * An alternative title to show when there is nothing to create a title.
   */
  @Prop()
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
   * Emitted when the user activates the toggle.
   */
  @Event({ bubbles: false })
  dsoOpenToggle!: EventEmitter<DocumentComponentOpenToggleEvent>;

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

  private get wijzigactieLabel(): string | undefined {
    return this.wijzigactie && wijzigActieLabels[this.wijzigactie];
  }

  private handleHeadingClick = (e: MouseEvent) => {
    if (this.type !== "LID") {
      this.dsoOpenToggle.emit({ originalEvent: e, open: !this.open });
    }
  };

  private suffix(): string | undefined {
    if (this.vervallen) {
      return "vervallen";
    }

    if (this.gereserveerd) {
      return "gereserveerd";
    }

    return undefined;
  }

  private handleOzonContentAnchorClick = (e: DsoOzonContentCustomEvent<OzonContentAnchorClickEvent>) => {
    this.dsoOzonContentAnchorClick.emit({ originalEvent: e, ozonContentAnchorClick: e.detail });
  };

  render() {
    const suffix = this.suffix();

    return (
      <>
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
                {this.label || this.nummer || this.opschrift ? (
                  <>
                    {this.label && (
                      <>
                        {" "}
                        <dso-ozon-content
                          content={this.label}
                          onDsoAnchorClick={this.handleOzonContentAnchorClick}
                          inline
                        ></dso-ozon-content>
                      </>
                    )}
                    {this.nummer && (
                      <>
                        {" "}
                        <dso-ozon-content
                          content={this.nummer}
                          onDsoAnchorClick={this.handleOzonContentAnchorClick}
                          inline
                        ></dso-ozon-content>
                      </>
                    )}
                    {this.opschrift && (
                      <>
                        {" "}
                        <dso-ozon-content
                          content={this.opschrift}
                          onDsoAnchorClick={this.handleOzonContentAnchorClick}
                          inline
                        ></dso-ozon-content>
                      </>
                    )}
                  </>
                ) : (
                  this.alternativeTitle
                )}
                {suffix && <span> - [{suffix}]</span>}
              </div>
            </Heading>
            {this.genesteOntwerpInformatie && !this.open && !this.bevatOntwerpInformatie && (
              <>
                <dso-badge status="warning" aria-describedby="nested-draft-description">
                  !
                </dso-badge>
                <dso-tooltip id="nested-draft-description">Er is een ontwerp beschikbaar.</dso-tooltip>
              </>
            )}
            {(this.bevatOntwerpInformatie || this.annotated) && (
              <div class="addons">
                {this.bevatOntwerpInformatie && (
                  <dso-label status="warning" compact>
                    Ontwerp
                  </dso-label>
                )}
                {this.annotated && (
                  <dso-annotation-button
                    identifier="expandable"
                    open={this.openAnnotation}
                    onDsoClick={(e) => this.dsoAnnotationToggle.emit({ originalEvent: e })}
                  ></dso-annotation-button>
                )}
              </div>
            )}
          </div>
        </div>
        <slot name="annotation" />
        {this.open && (this.inhoud || this.gereserveerd || this.vervallen) && (
          <div class="content">
            {this.gereserveerd && (
              <dso-alert status="info">Dit onderdeel is gereserveerd voor toekomstige toevoeging.</dso-alert>
            )}
            {this.vervallen && <dso-alert status="info">Dit onderdeel is vervallen.</dso-alert>}
            {this.inhoud && (
              <dso-ozon-content
                content={this.inhoud}
                onDsoAnchorClick={this.handleOzonContentAnchorClick}
              ></dso-ozon-content>
            )}
          </div>
        )}
        <slot />
      </>
    );
  }
}
