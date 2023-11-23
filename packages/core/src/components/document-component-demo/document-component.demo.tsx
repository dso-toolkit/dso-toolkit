import { h, Component, ComponentInterface, State, Prop, Watch, Event, EventEmitter } from "@stencil/core";
import sampleSize from "lodash.samplesize";
import random from "lodash.random";

import {
  DocumentComponentOzonContentAnchorClickEvent,
  DocumentComponentOpenToggleEvent,
} from "../document-component/document-component.models";
import { DsoDocumentComponentCustomEvent } from "../../components";

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
    ontwerpTekststructuurDocumentComponenten?: DocumentComponent[];
    tekststructuurDocumentComponenten?: DocumentComponent[];
  };
}

@Component({
  tag: "dsot-document-component-demo",
  scoped: true,
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
  response?: DocumentComponent;

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

  private getEmbeddedDocumentComponents(documentComponent: DocumentComponent | undefined) {
    return (
      documentComponent?._embedded?.ontwerpTekststructuurDocumentComponenten ??
      documentComponent?._embedded?.tekststructuurDocumentComponenten
    );
  }

  private concatEmbeddedDocumentComponents(documentComponent: DocumentComponent): DocumentComponent[] {
    const embeddedDocuments = [...(this.getEmbeddedDocumentComponents(documentComponent) ?? [])];

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

      return;
    }

    const data = await fetch(this.jsonFile).then((r) => r.json());
    const lichaam = this.getEmbeddedDocumentComponents(data)?.find(
      (documentComponent) => documentComponent.type === "LICHAAM",
    );

    if (lichaam) {
      this.response = lichaam;

      this.notApplicable = this.selectRandomDocumentComponents(lichaam);
      this.filtered = this.selectRandomDocumentComponents(lichaam, this.notApplicable);
    }
  }

  private handleOpenToggle(
    _e: DsoDocumentComponentCustomEvent<DocumentComponentOpenToggleEvent>,
    documentComponent: DocumentComponent,
  ) {
    const isOpenOrClosed = this.openOrClosed.includes(documentComponent);

    this.openOrClosed = !isOpenOrClosed
      ? [...this.openOrClosed, documentComponent]
      : this.openOrClosed.filter((d) => d !== documentComponent);
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
      (this.getEmbeddedDocumentComponents(documentComponent)?.some((d) => this.hasFilteredChildren(d)) ?? false)
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
      this.getEmbeddedDocumentComponents(documentComponent)?.some(
        (d) => !!d.bevatOntwerpInformatie || this.hasNestedDraft(d),
      ) ?? false
    );
  }

  private showContent(documentComponent: DocumentComponent): boolean {
    return (
      this.isOpen(documentComponent) &&
      !!(this.getEmbeddedDocumentComponents(documentComponent)?.length || documentComponent.inhoud)
    );
  }

  private DocumentComponent = ({ path }: DocumentComponentProps) => {
    const documentComponent = path.at(-1);

    const { DocumentComponent } = this;

    return (
      <ul>
        {documentComponent &&
          this.getEmbeddedDocumentComponents(documentComponent)?.map((d, i) => (
            <li key={d.documentTechnischId}>
              <dso-document-component
                annotated={i % 3 === 2}
                bevatOntwerpInformatie={!!d.bevatOntwerpInformatie}
                filtered={this.isOpen(d) ? this.isFiltered(d) : this.hasFilteredChildren(d)}
                genesteOntwerpInformatie={this.hasNestedDraft(d)}
                gereserveerd={d.gereserveerd}
                heading="h2"
                inhoud={d.inhoud}
                label={d.labelXml}
                openAnnotation={this.isOpenedAnnotation(d)}
                notApplicable={this.isNotApplicable(d) || path.some((p) => this.isNotApplicable(p))}
                nummer={d.nummerXml}
                onDsoAnnotationToggle={() => this.handleAnnotationToggle(d)}
                onDsoOpenToggle={(e) => this.handleOpenToggle(e, d)}
                onDsoOzonContentAnchorClick={(e) => this.handleOzonContentAnchorClick(e)}
                open={this.isOpen(d)}
                opschrift={d.opschrift}
                type={d.type}
                vervallen={d.vervallen}
                wijzigactie={d.wijzigactie}
              >
                {this.isOpenedAnnotation(d) && (
                  <dso-annotation-output
                    slot="annotation"
                    open
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
      <dso-responsive-element class="dso-document-components">
        {this.response && <DocumentComponent path={[this.response]} />}
      </dso-responsive-element>
    );
  }
}

interface DocumentComponentProps {
  path: DocumentComponent[];
}
