import { h, Component, ComponentInterface, State, Prop, Watch, Event, EventEmitter, Fragment } from "@stencil/core";
import sampleSize from "lodash.samplesize";
import random from "lodash.random";

import {
  DocumentComponentOzonContentAnchorClickEvent,
  DocumentComponentRecursiveToggleEvent,
  DocumentComponentWijzigactie,
} from "../document-component/document-component.models";
import { DsoDocumentComponentCustomEvent } from "../../components";

interface DocumentEmbedded {
  _embedded?: {
    ontwerpTekststructuurDocumentComponenten?: DocumentComponent[];
    tekststructuurDocumentComponenten?: DocumentComponent[];
  };
}

interface DocumentComponent extends DocumentEmbedded {
  documentTechnischId: string;
  type?: string;
  labelXml?: string;
  nummerXml?: string;
  volgordeNummer: number;
  opschrift?: string;
  inhoud?: string;
  gereserveerd?: boolean;
  vervallen?: boolean;
  bevatOntwerpInformatie?: boolean;
  wijzigactie?: DocumentComponentWijzigactie;
}

@Component({
  tag: "dsot-document-component-demo",
  scoped: true, // scoped because we are immitating the usage of <dso-document-component> in a page
  styleUrl: "document-component.demo.scss",
})
export class DocumentComponentDemo implements ComponentInterface {
  /**
   * Show canvas to where Document Component extends.
   */
  @Prop({ reflect: true })
  showCanvas = false;

  /**
   * Name of the file to load.
   */
  @Prop()
  jsonFile?: string;

  /**
   * The default state for all Document Components.
   */
  @Prop()
  openDefault = false;

  /**
   * To demo user interacting with IntRef or IntIoRef elements.
   */
  @Event()
  dsotOzonContentAnchorClick!: EventEmitter<DocumentComponentOzonContentAnchorClickEvent>;

  @State()
  response?: DocumentEmbedded;

  @State()
  document?: DocumentComponent;

  @State()
  openOrClosed: DocumentComponent[] = [];

  @State()
  openedAnnotation: DocumentComponent[] = [];

  @State()
  filtered: DocumentComponent[] = [];

  @State()
  notApplicable: DocumentComponent[] = [];

  @State()
  activeAnnotationSelectables: DocumentComponent[] = [];

  @Watch("jsonFile")
  async jsonFileWatcher() {
    this.openOrClosed = [];

    await this.loadData();
  }

  @Watch("openDefault")
  async openDefaultWatcher() {
    this.openOrClosed = [];

    await this.loadData();
  }

  async componentDidLoad(): Promise<void> {
    await this.loadData();
  }

  private getEmbeddedDocumentComponents(documentEmbedded: DocumentEmbedded | undefined) {
    if (documentEmbedded?._embedded?.ontwerpTekststructuurDocumentComponenten) {
      return {
        documentComponents: documentEmbedded._embedded.ontwerpTekststructuurDocumentComponenten,
        ontwerp: true,
      };
    }

    if (documentEmbedded?._embedded?.tekststructuurDocumentComponenten) {
      return {
        documentComponents: documentEmbedded._embedded.tekststructuurDocumentComponenten,
        ontwerp: false,
      };
    }

    return undefined;
  }

  private concatEmbeddedDocumentComponents(documentComponent: DocumentComponent): DocumentComponent[] {
    const embeddedDocuments = [...(this.getEmbeddedDocumentComponents(documentComponent)?.documentComponents ?? [])];

    for (const d of embeddedDocuments) {
      embeddedDocuments.push(...this.concatEmbeddedDocumentComponents(d));
    }

    return embeddedDocuments;
  }

  private selectRandomDocumentComponents(
    documentComponent: DocumentComponent,
    exclude: DocumentComponent[] = [],
  ): DocumentComponent[] {
    const documentComponents = this.concatEmbeddedDocumentComponents(documentComponent).filter(
      (d) => !exclude.includes(d),
    );
    const size = random(0, Math.floor(documentComponents.length / 10));

    return sampleSize(documentComponents, size);
  }

  private async loadData() {
    if (!this.jsonFile) {
      this.response = undefined;
      this.document = undefined;

      return;
    }

    this.response = await fetch(this.jsonFile).then((r) => r.json());
    this.document = this.getEmbeddedDocumentComponents(this.response)?.documentComponents[0];

    if (this.document?.type === "LICHAAM") {
      this.notApplicable = this.selectRandomDocumentComponents(this.document);
      this.filtered = this.selectRandomDocumentComponents(this.document, this.notApplicable);
    } else {
      this.notApplicable = [];
      this.filtered = [];
    }
  }

  private handleOpenToggle(documentComponent: DocumentComponent, force?: boolean) {
    const isOpenOrClosed = typeof force === "boolean" ? force : this.openOrClosed.includes(documentComponent);

    if (isOpenOrClosed && this.openOrClosed.includes(documentComponent)) {
      this.openOrClosed = this.openOrClosed.filter((d) => d !== documentComponent);
    } else if (!isOpenOrClosed && !this.openOrClosed.includes(documentComponent)) {
      this.openOrClosed = [...this.openOrClosed, documentComponent];
    }
  }

  private handleAnnotationToggle(documentComponent: DocumentComponent) {
    this.openedAnnotation = this.isOpenedAnnotation(documentComponent)
      ? this.openedAnnotation.filter((d) => d !== documentComponent)
      : [...this.openedAnnotation, documentComponent];

    if (!this.isOpen(documentComponent)) {
      this.openOrClosed = [...this.openOrClosed, documentComponent];
    }
  }

  private handleSelectableChange(documentComponent: DocumentComponent) {
    this.activeAnnotationSelectables = this.isCheckedSlideToggle(documentComponent)
      ? this.activeAnnotationSelectables.filter((d) => d !== documentComponent)
      : [...this.activeAnnotationSelectables, documentComponent];
  }

  private handleOzonContentAnchorClick(
    e: DsoDocumentComponentCustomEvent<DocumentComponentOzonContentAnchorClickEvent>,
  ) {
    this.dsotOzonContentAnchorClick.emit(e.detail);
  }

  private isCheckedSlideToggle(documentComponent: DocumentComponent) {
    return this.activeAnnotationSelectables.includes(documentComponent);
  }

  private hasFilteredChildren(documentComponent: DocumentComponent): boolean {
    return (
      this.filtered.includes(documentComponent) ||
      (this.getEmbeddedDocumentComponents(documentComponent)?.documentComponents.some((d) =>
        this.hasFilteredChildren(d),
      ) ??
        false)
    );
  }

  private isOpen(documentComponent: DocumentComponent): boolean {
    return documentComponent.type === "LID" || this.openDefault
      ? !this.openOrClosed.includes(documentComponent)
      : this.openOrClosed.includes(documentComponent);
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
      this.getEmbeddedDocumentComponents(documentComponent)?.documentComponents.some(
        (d) => !!d.bevatOntwerpInformatie || this.hasNestedDraft(d),
      ) ?? false
    );
  }

  private showContent(documentComponent: DocumentComponent): boolean {
    return (
      this.isOpen(documentComponent) &&
      !!(this.getEmbeddedDocumentComponents(documentComponent)?.documentComponents.length || documentComponent.inhoud)
    );
  }

  private recursiveToggleState(documentComponent: DocumentComponent): undefined | boolean | "indeterminate" {
    const embeddedDocuments = this.getEmbeddedDocumentComponents(documentComponent);

    if (
      !embeddedDocuments ||
      embeddedDocuments.documentComponents.length <= 1 ||
      !embeddedDocuments.documentComponents.some((d) => d.type === "ARTIKEL")
    ) {
      return undefined;
    }

    return embeddedDocuments.documentComponents.every((d) => this.isOpen(d));
  }

  private handleRecursiveToggle = (
    documentComponent: DocumentComponent,
    detail: DocumentComponentRecursiveToggleEvent,
  ) => {
    const embeddedDocuments = this.getEmbeddedDocumentComponents(documentComponent);
    if (!embeddedDocuments) {
      return;
    }

    for (const d of embeddedDocuments.documentComponents) {
      this.handleOpenToggle(d, detail.next);
    }
  };

  private DocumentComponent = ({ path }: DocumentComponentProps) => {
    const documentComponent = path.at(-1);
    if (!documentComponent) {
      return <Fragment />;
    }

    const { DocumentComponent } = this;

    const embeddedDocuments = this.getEmbeddedDocumentComponents(documentComponent);

    return (
      <dso-document-component
        annotated={documentComponent.volgordeNummer % 4 === 2}
        bevatOntwerpInformatie={!!documentComponent.bevatOntwerpInformatie}
        filtered={
          this.isOpen(documentComponent)
            ? this.isFiltered(documentComponent)
            : this.hasFilteredChildren(documentComponent)
        }
        genesteOntwerpInformatie={this.hasNestedDraft(documentComponent)}
        gereserveerd={documentComponent.gereserveerd}
        heading="h2"
        inhoud={documentComponent.inhoud}
        label={documentComponent.labelXml}
        openAnnotation={this.isOpenedAnnotation(documentComponent)}
        notApplicable={this.isNotApplicable(documentComponent) || path.some((p) => this.isNotApplicable(p))}
        nummer={documentComponent.nummerXml}
        onDsoAnnotationToggle={() => this.handleAnnotationToggle(documentComponent)}
        onDsoOpenToggle={() => this.handleOpenToggle(documentComponent)}
        onDsoOzonContentAnchorClick={(e) => this.handleOzonContentAnchorClick(e)}
        open={this.isOpen(documentComponent)}
        opschrift={documentComponent.opschrift}
        type={documentComponent.type}
        vervallen={documentComponent.vervallen}
        wijzigactie={documentComponent.wijzigactie}
        recursiveToggle={this.recursiveToggleState(documentComponent)}
        onDsoRecursiveToggle={(e) => this.handleRecursiveToggle(documentComponent, e.detail)}
      >
        {this.isOpenedAnnotation(documentComponent) && (
          <div slot="annotations">
            <dso-annotation-locatie
              active={this.isCheckedSlideToggle(documentComponent)}
              gewijzigde-locatie
              locatieNoemer={"Winkelgebied"}
              onDsoActiveChange={() => this.handleSelectableChange(documentComponent)}
            >
              <span class="symboolcode" slot="symbool" data-symboolcode="vszt030"></span>
            </dso-annotation-locatie>
          </div>
        )}
        {this.showContent(documentComponent) && embeddedDocuments?.documentComponents.length && (
          <ul class="dso-document-component-list">
            {embeddedDocuments.documentComponents.map((d) => (
              <li key={d.documentTechnischId}>
                <DocumentComponent path={[...path, d]} />
              </li>
            ))}
          </ul>
        )}
      </dso-document-component>
    );
  };

  render() {
    const { DocumentComponent, MenuButton } = this;

    return (
      <dso-responsive-element class="dso-document-components">
        <div class="dso-navbar">
          <ul class="dso-nav dso-nav-sub">
            {this.getEmbeddedDocumentComponents(this.response)?.documentComponents?.map((d) => (
              <li class={this.document === d ? "dso-active" : undefined}>
                <MenuButton documentComponent={d} />
              </li>
            ))}
          </ul>
        </div>
        {this.document && <DocumentComponent path={[this.document]} />}
      </dso-responsive-element>
    );
  }

  private MenuButton = ({ documentComponent }: MenuItemProps) => {
    const { labelXml, nummerXml, type } = documentComponent;

    return (
      <button type="button" onClick={() => (this.document = documentComponent)}>
        {!labelXml && !nummerXml ? (
          <span>
            <i>{type}</i>
          </span>
        ) : (
          <>
            {labelXml && (
              <>
                <dso-ozon-content content={labelXml} inline></dso-ozon-content>
              </>
            )}
            {nummerXml && (
              <>
                {" "}
                <dso-ozon-content content={nummerXml} inline></dso-ozon-content>
              </>
            )}
          </>
        )}
      </button>
    );
  };
}

interface MenuItemProps {
  documentComponent: DocumentComponent;
}

interface DocumentComponentProps {
  path: DocumentComponent[];
}
