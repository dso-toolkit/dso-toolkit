import {
  h,
  Component,
  Element,
  ComponentInterface,
  State,
  Prop,
  Watch,
  Fragment,
  Event,
  EventEmitter,
  Listen,
} from "@stencil/core";
import sampleSize from "lodash.samplesize";
import random from "lodash.random";
import { debounce } from "debounce";

import {
  DocumentComponentOzonContentAnchorClickEvent,
  DocumentComponentOpenToggleEvent,
} from "../document-component/document-component.models";
import { DsoDocumentComponentCustomEvent } from "../../components";

/*
  Bekende performance optimalisatie beperkingen
  ---------------------------------------------

  * Firefox is nog een beetje jumpy, vermoedelijk omdat het scrollen daar instantaan lijkt te gaan, bij Chrome zit er toch een bepaalde "smooth" factor.
  * Ongetest in Safari of smartphones
  * Héél soms een stuiterbal situatie, ik vermoed vanwege de margin die we niet verwerken in de height van het dummy element
  * Firefox scroll naar Document Component werkt nog niet, ook hier vermoedelijk vanwege de instantaan zoeken.
  
  Voor de Firefox problemen denk ik toch dat we naar een setInterval() met lage interval moeten zodat we de browser forceren om te blijven scrollen tot het gewenste document component in beeld is.

  Deze setInterval() moeten we op bepaalde user input natuurlijk cancelen.

  Andere ideeen:

  - In een localStorage/sessionStorage de heights cachen voor bij een volgend bezoek
  - Home/End (naar begin van document / naar eind van document) springen werkt niet optimaal. We kunnen het gewenste gedrag nabouwen met een eigen scrollToTop() / scrollToBottom()
*/

interface DocumentComponent {
  identificatie: string;
  expressie: string;
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

interface DummyDocumentComponentProps {
  documentComponent: DocumentComponent;
}

@Component({
  tag: "dsot-document-component-demo",
  scoped: true,
  styleUrl: "document-component.demo.scss",
})
export class DocumentComponentDemo implements ComponentInterface {
  @Element()
  host!: HTMLDsotDocumentComponentDemoElement;

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
    exclude: DocumentComponent[] = []
  ): DocumentComponent[] {
    const documentComponents = this.concatEmbeddedDocumentComponents(documentComponent).filter(
      (d) => !exclude.includes(d)
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
      (documentComponent) => documentComponent.type === "LICHAAM"
    );

    if (lichaam) {
      this.response = lichaam;

      this.notApplicable = this.selectRandomDocumentComponents(lichaam);
      this.filtered = this.selectRandomDocumentComponents(lichaam, this.notApplicable);
    }
  }

  private handleOpenToggle(
    _e: DsoDocumentComponentCustomEvent<DocumentComponentOpenToggleEvent>,
    documentComponent: DocumentComponent
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
    e: DsoDocumentComponentCustomEvent<DocumentComponentOzonContentAnchorClickEvent>
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
        (d) => !!d.bevatOntwerpInformatie || this.hasNestedDraft(d)
      ) ?? false
    );
  }

  private showContent(documentComponent: DocumentComponent): boolean {
    return (
      this.isOpen(documentComponent) &&
      !!(this.getEmbeddedDocumentComponents(documentComponent)?.length || documentComponent.inhoud)
    );
  }

  private intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!(entry.target instanceof HTMLElement)) {
          throw new Error("element not instanceof HTMLElement");
        }

        const observing = this.getObservingByElement(entry.target);
        if (!observing) {
          throw new Error("observing not found");
        }

        // Volgens mij zit in de viewer ObserveVisibilityDirective een bug: Zowel setVisible() als setInvisible() worden bij entry.isIntersecting === true aangeroepen.
        if (entry.isIntersecting) {
          this.setVisible(observing.documentComponent);
        } else {
          this.setInvisible(observing.documentComponent);
        }
      }
    },
    /*
      - Een positieve margin werkt buiten de viewport.
      - "100%" verlegt over de Y-as de intersection de volledige viewport hoogte naar onder en naar boven, en:
      - verlegt over de X-as de intersection de volledige viewport breedte naar links en naar rechts.

      Ofwel, de "renderport" is 3x de viewport en valt daarmee ruim buiten de viewport.
    */
    { rootMargin: "100%" }
  );

  // Array van gerenderde DocumentComponents. @State decorator zodat er bij wijzigingen een nieuwe render gaat.
  @State()
  private visible: DocumentComponent[] = [];

  private isVisible(documentComponent: DocumentComponent) {
    return this.visible.some((d) => d === documentComponent);
  }

  private setVisible(documentComponent: DocumentComponent) {
    this.visible = [...this.visible, documentComponent];
  }

  private setInvisible(documentComponent: DocumentComponent) {
    this.visible = this.visible.filter((d) => d !== documentComponent);
  }

  // Bewust één @State() decorator: Deze array wordt ongecontroleerd bijgewerkt in componentDidRender(), met @State() zou dit infinite render loops veroorzaken
  private heightsCache: Array<{ documentComponent: DocumentComponent; height: number }> = [];

  private setHeight(documentComponent: DocumentComponent, height: number) {
    const cache = this.heightsCache.find(({ documentComponent: d }) => d === documentComponent);

    if (!cache) {
      this.heightsCache.push({ documentComponent, height });
    } else if (cache.height < height) {
      // Note: Dit is enigszins dubieus, want een Document Component kan ook in ingeklapte vorm weggepoetst worden. Dan wil je de actuele (kleinere) height.
      cache.height = height;
    }
  }

  // Note: Moet deze hoogte nog worden gecorrigeerd voor de margin?
  private getDummyHeight(documentComponent: DocumentComponent) {
    return `${this.heightsCache.find(({ documentComponent: d }) => d === documentComponent)?.height || 123}px`; // 123 is in de developer tools makkelijk te herleiden tot fallback value.
  }

  // Bewust géén @State() decorator: Deze array wordt bijgehouden in render() via observeVisibility(), met @State() zou dit infinite render loops veroorzaken
  private observing: Array<{ documentComponent: DocumentComponent; element: HTMLElement }> = [];

  private getObservingByDocumentComponentExpressie(expressie: string) {
    return this.observing.find(({ documentComponent: d }) => d.expressie === expressie);
  }

  private getObservingByDocumentComponent(documentComponent: DocumentComponent) {
    return this.observing.find(({ documentComponent: d }) => d === documentComponent);
  }

  private getObservingByElement(element: HTMLElement) {
    return this.observing.find(({ element: e }) => e === element);
  }

  private isObservingElement(element: HTMLElement) {
    return this.observing.some(({ element: e }) => e === element);
  }

  private observeVisibility = (documentComponent: DocumentComponent, element: HTMLElement | undefined) => {
    const observing = this.getObservingByDocumentComponent(documentComponent);

    /*
      Als:
        de IntersectionObserver een element behorend bij een documentComponent observeert
      en:
        géén element (element === undefined) is OF,
        het element is anders dan het vorige element
      dan:
        unobserve het element behorend bij het documentComponent
    */
    if (observing && (!element || observing.element !== element)) {
      const index = this.observing.indexOf(observing);
      this.observing.splice(index, 1);
      this.intersectionObserver.unobserve(observing.element);
    }

    /*
      Als:
        Er een element is die nog niet wordt observed
      dan:
        observe het element behorend bij een documentComponent
    */
    if (element && !this.isObservingElement(element)) {
      this.observing.push({ documentComponent, element });
      this.intersectionObserver.observe(element);
    }
  };

  private DummyDocumentComponent = ({ documentComponent }: DummyDocumentComponentProps) => {
    return <div style={{ height: this.getDummyHeight(documentComponent) }} class="dummy"></div>;
  };

  private countElements(root: ShadowRoot | HTMLElement): number {
    const elements = root.querySelectorAll("*");

    return (
      elements.length +
      Array.from(elements).reduce(
        (t, e) => t + (e.shadowRoot instanceof ShadowRoot ? this.countElements(e.shadowRoot) : 0),
        0
      )
    );
  }

  private DocumentComponent = ({ path }: DocumentComponentProps) => {
    const documentComponent = path.at(-1);

    const { DocumentComponent, DummyDocumentComponent } = this;

    const embeddedDocumentComponents = this.getEmbeddedDocumentComponents(documentComponent);

    return (
      <>
        {(embeddedDocumentComponents?.length ?? 0) > 0 && (
          <ul>
            {embeddedDocumentComponents?.map((d, i) => (
              <li key={d.documentTechnischId} ref={(element) => this.observeVisibility(d, element)}>
                {this.isVisible(d) ? (
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
                ) : (
                  <DummyDocumentComponent documentComponent={d} />
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  @State()
  scrollTo?: string[];

  private startScrollTo(expressie: string) {
    /*
      Door de array te reversen wordt er eerst naar het meest specifieke document component gezocht.
    */
    this.scrollTo = expressie
      .split("__")
      .reduce<string[]>((t, p) => {
        t.push([t.at(-1), p].filter((a) => !!a).join("__"));

        return t;
      }, [])
      .reverse();
  }

  render() {
    const { DocumentComponent } = this;

    return (
      <>
        <div
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "white",
            zIndex: "1",
            margin: "0 -8px",
            padding: "0 8px",
          }}
        >
          <button
            class="dso-primary"
            onClick={(_) => this.startScrollTo("chp_6__subchp_6.2__subsec_6.2.7__subsec_6.2.7.1__art_6.53__para_1")}
          >
            Scroll!
          </button>
          &nbsp;
          <span>Elements: {this.countElements(this.host)}</span>
        </div>
        <dso-responsive-element class="dso-document-components">
          {this.response && <DocumentComponent path={[this.response]} />}
        </dso-responsive-element>
      </>
    );
  }

  componentDidRender(): void {
    for (const { documentComponent, element } of this.observing) {
      this.setHeight(documentComponent, element.scrollHeight);
    }

    this.scrollAfterRender();
  }

  // Cancel scrollTo ook bij touch, of click?
  @Listen("wheel", { target: "window" })
  @Listen("keydown", { target: "window" })
  scrollHandler(_: Event) {
    if (this.scrollTo) {
      this.scrollTo = undefined;
    }
  }

  /*
    Ik denk dat deze debounce van 10ms vervangen kan worden door bij te houden wanneer een <dso-document-component> daadwerkelijk wordt gerendered.

    componentDidRender() is 'n volatiele lifecycle hook en gaat heel vaak af. Vandaar de debounce.
  */
  private scrollAfterRender = debounce(() => {
    if (this.scrollTo) {
      for (const [i, path] of this.scrollTo.entries()) {
        const observing = this.getObservingByDocumentComponentExpressie(path);

        if (observing) {
          observing.element.scrollIntoView();

          this.scrollTo = i === 0 ? undefined : this.scrollTo.filter((s) => s !== path);

          break;
        }
      }
    }
  }, 10);
}

interface DocumentComponentProps {
  path: DocumentComponent[];
}
