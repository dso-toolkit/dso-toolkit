import { h, Component, ComponentInterface, Fragment, State } from "@stencil/core";
import { DocumentComponentOpenToggleEvent, DsoDocumentComponentCustomEvent } from "../../components";

interface DocumentComponent {
  documentTechnischId: string;
  type?: string;
  labelXml?: string;
  nummerXml?: string;
  opschrift?: string;
  inhoud?: string;
  gereserveerd?: boolean;
  vervallen?: boolean;
  bevatOntwerpInformatie?: boolean;
  wijzigactie?: "voegtoe" | "verwijder" | "nieuweContainer" | "verwijderContainer";
  _embedded?: {
    ontwerpTekststructuurDocumentComponenten: DocumentComponent[];
  };
}

@Component({
  tag: "dsot-document-component-demo",
})
export class DocumentComponentDemo implements ComponentInterface {
  @State()
  response?: DocumentComponent;

  @State()
  open: DocumentComponent[] = [];

  @State()
  openedAnnotation: DocumentComponent[] = [];

  @State()
  filtered: DocumentComponent[] = [];

  @State()
  notApplicable: DocumentComponent[] = [];

  @State()
  activeAnnotationSelectables: DocumentComponent[] = [];

  private fixData(documentComponent: DocumentComponent): DocumentComponent {
    return {
      ...documentComponent,
      nummerXml:
        documentComponent.type === "LID" && !documentComponent.nummerXml?.startsWith("<?")
          ? `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Nummer xmlns="https://standaarden.overheid.nl/stop/imop/tekst/">${documentComponent.nummerXml}</Nummer>`
          : documentComponent.nummerXml,
      _embedded: documentComponent._embedded && {
        ontwerpTekststructuurDocumentComponenten:
          documentComponent._embedded.ontwerpTekststructuurDocumentComponenten.map((d) => this.fixData(d)),
      },
    };
  }

  componentDidLoad(): void {
    fetch("ozon-response.json")
      .then((response) => response.json())
      .then((result) => {
        this.response = this.fixData(result);

        this.filtered = [
          this.response?._embedded?.ontwerpTekststructuurDocumentComponenten[0]!._embedded
            ?.ontwerpTekststructuurDocumentComponenten[10]!._embedded?.ontwerpTekststructuurDocumentComponenten[2]!
            ._embedded?.ontwerpTekststructuurDocumentComponenten[0]!,
          this.response?._embedded?.ontwerpTekststructuurDocumentComponenten[0]!._embedded
            ?.ontwerpTekststructuurDocumentComponenten[10]!._embedded?.ontwerpTekststructuurDocumentComponenten[0]!,
        ];

        this.notApplicable = [
          this.response?._embedded?.ontwerpTekststructuurDocumentComponenten[0]!._embedded
            ?.ontwerpTekststructuurDocumentComponenten[4]!,
          this.response?._embedded?.ontwerpTekststructuurDocumentComponenten[0]!._embedded
            ?.ontwerpTekststructuurDocumentComponenten[4]!._embedded?.ontwerpTekststructuurDocumentComponenten[0]!,
          this.response?._embedded?.ontwerpTekststructuurDocumentComponenten[0]!._embedded
            ?.ontwerpTekststructuurDocumentComponenten[9]!._embedded?.ontwerpTekststructuurDocumentComponenten[1]!,
        ];
      });
  }

  private handleOpenToggle(
    e: DsoDocumentComponentCustomEvent<DocumentComponentOpenToggleEvent>,
    documentComponent: DocumentComponent
  ) {
    const isOpen = this.isOpen(documentComponent);

    if (e.detail.open && !isOpen) {
      this.open = [...this.open, documentComponent];
    } else if (!e.detail.open && isOpen) {
      this.open = this.open.filter((d) => d !== documentComponent);
    }
  }

  private handleAnnotationToggle(documentComponent: DocumentComponent) {
    this.openedAnnotation = this.isOpenedAnnotation(documentComponent)
      ? this.openedAnnotation.filter((d) => d !== documentComponent)
      : [...this.openedAnnotation, documentComponent];

    if (!this.isOpen(documentComponent)) {
      this.open = [...this.open, documentComponent];
    }
  }

  private handleSelectableChange(documentComponent: DocumentComponent) {
    this.activeAnnotationSelectables = this.isCheckedSlideToggle(documentComponent)
      ? this.activeAnnotationSelectables.filter((d) => d !== documentComponent)
      : [...this.activeAnnotationSelectables, documentComponent];
  }

  private isCheckedSlideToggle(documentComponent: DocumentComponent) {
    return this.activeAnnotationSelectables.includes(documentComponent);
  }

  private hasFilteredChildren(documentComponent: DocumentComponent): boolean {
    return (
      this.filtered.includes(documentComponent) ||
      (documentComponent._embedded?.ontwerpTekststructuurDocumentComponenten.some((d) => this.hasFilteredChildren(d)) ??
        false)
    );
  }

  private isOpen(documentComponent: DocumentComponent): boolean {
    return documentComponent.type === "LID" || this.open.includes(documentComponent);
  }

  private isOpenedAnnotation(documentComponent: DocumentComponent): boolean {
    return this.openedAnnotation.includes(documentComponent);
  }

  private isFiltered(documentComponent: DocumentComponent): boolean {
    return this.filtered.includes(documentComponent);
  }

  private isNotApplicable(documentComponent: DocumentComponent): boolean {
    return this.notApplicable.includes(documentComponent);
  }

  private hasNestedDraft(documentComponent: DocumentComponent): boolean {
    return (
      documentComponent._embedded?.ontwerpTekststructuurDocumentComponenten.some(
        (d) => !!d.bevatOntwerpInformatie || this.hasNestedDraft(d)
      ) ?? false
    );
  }

  private showContent(documentComponent: DocumentComponent): boolean {
    return (
      this.isOpen(documentComponent) &&
      !!(documentComponent._embedded?.ontwerpTekststructuurDocumentComponenten.length || documentComponent.inhoud)
    );
  }

  private DocumentComponent = ({ path }: DocumentComponentProps) => {
    const documentComponent = path.at(-1);

    const { DocumentComponent } = this;

    return (
      <ul>
        {documentComponent?._embedded?.ontwerpTekststructuurDocumentComponenten.map((d, i) => (
          <li key={d.documentTechnischId}>
            <dso-document-component
              nummer={d.nummerXml}
              label={d.labelXml}
              opschrift={d.opschrift}
              inhoud={d.inhoud}
              open={this.isOpen(d)}
              filtered={this.isOpen(d) ? this.isFiltered(d) : this.hasFilteredChildren(d)}
              notApplicable={this.isNotApplicable(d) || path.some((p) => this.isNotApplicable(p))}
              type={d.type}
              reserved={d.gereserveerd}
              expired={d.vervallen}
              draft={!!d.bevatOntwerpInformatie}
              nestedDraft={this.hasNestedDraft(d)}
              annotated={i % 3 === 2}
              wijzigactie={d.wijzigactie}
              onDsoOpenToggle={(e) => this.handleOpenToggle(e, d)}
              onDsoAnnotationToggle={() => this.handleAnnotationToggle(d)}
            >
              {this.isOpenedAnnotation(d) && (
                <dso-annotation-output
                  slot="annotation"
                  identifier="test"
                  onDsoClose={() => this.handleAnnotationToggle(d)}
                >
                  <span slot="title">Annotaties</span>
                  <dso-slide-toggle
                    checked={this.isCheckedSlideToggle(d)}
                    onDsoActiveChange={() => this.handleSelectableChange(d)}
                  >
                    Delfzijl
                  </dso-slide-toggle>
                </dso-annotation-output>
              )}
              {this.showContent(d) && <DocumentComponent path={[...path, d]} />}
            </dso-document-component>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { DocumentComponent } = this;

    return (
      <div style={{ margin: "0 8px", borderLeft: "1px dashed pink", borderRight: "1px dashed pink" }}>
        <dso-responsive-element class="dso-document-components">
          {this.response?._embedded?.ontwerpTekststructuurDocumentComponenten.map((d) => (
            <>
              <DocumentComponent path={[d]} />
              <hr />
            </>
          ))}
        </dso-responsive-element>
      </div>
    );
  }
}

interface DocumentComponentProps {
  path: DocumentComponent[];
}
