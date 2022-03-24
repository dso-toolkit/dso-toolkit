import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Fragment,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { ContentAnchor } from "./ozon-content.interfaces";

@Component({
  tag: "dso-ozon-content",
  styleUrl: "ozon-content.scss",
  shadow: true,
})
export class OzonContent implements ComponentInterface {
  @Prop()
  content: string | undefined;

  xmlContent!: Document;

  @State()
  notes: boolean[] = [];

  @Event()
  anchorClick!: EventEmitter<ContentAnchor>;

  @Watch("content")
  contentChanged() {
    this.connectedCallback();
  }

  getAttribute = (node: Node, name: string): string => {
    return node instanceof Element ? node.getAttribute(name) ?? "" : "";
  };

  getLocalName = (node: Node) => {
    return node instanceof Element ? node.localName : node.nodeName;
  };

  childNodesToJsx = (node: Node, childNodeName?: string) => {
    return Array.from(node.childNodes)
      .filter((n) => !childNodeName || this.getLocalName(n) === childNodeName)
      .map((n) => this.nodeToJsx(n));
  };

  nodeToJsx = (node: Node): JSX.Element => {
    switch (this.getLocalName(node)) {
      case "#text":
        return <>{node.textContent}</>;

      case "#document":
        return <>{this.childNodesToJsx(node)}</>;

      case "Inhoud":
      case "Opschrift":
      case "ContainerBlocksType":
      case "BlockMixedcontentMetMaximaleInlinesMarkersPopupsType":
        return <div class="dso-rich-content">{this.childNodesToJsx(node)}</div>;

      case "IntRef":
        const intRefHref = `#${this.getAttribute(node, "ref")}`;
        const intRefOnClick: (event: MouseEvent) => void = (event) => {
          const target = event.currentTarget;
          if (!(target instanceof HTMLAnchorElement)) {
            return;
          }

          event.preventDefault();
          const href = target.href;
          this.anchorClick.emit({
            href,
            documentComponent: href.substring(href.indexOf("#") + 1),
            originalEvent: event,
          });
        };

        return (
          <a href={intRefHref} onClick={intRefOnClick}>
            {this.childNodesToJsx(node)}
          </a>
        );

      case "ExtRef":
      case "ExtIoRef":
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.getAttribute(node, "ref")}
          >
            <span class="sr-only">opent in nieuw venster</span>
            {this.childNodesToJsx(node)}
          </a>
        );

      case "Al":
        return <span class="paragraph">{this.childNodesToJsx(node)}</span>;

      case "sub":
        return <sub>{this.childNodesToJsx(node)}</sub>;

      case "sup":
        return <sup>{this.childNodesToJsx(node)}</sup>;

      case "strong":
        return <strong>{this.childNodesToJsx(node)}</strong>;

      case "b":
        return <b>{this.childNodesToJsx(node)}</b>;

      case "i":
        return <i>{this.childNodesToJsx(node)}</i>;

      case "u":
        return <u>{this.childNodesToJsx(node)}</u>;

      case "Illustratie":
      case "InlineTekstAfbeelding":
        return (
          <img
            src={this.getAttribute(node, "naam")}
            alt={this.getAttribute(node, "naam")}
            height={this.getAttribute(node, "hoogte")}
            width={this.getAttribute(node, "breedte")}
          />
        );

      case "br":
        return <br />;

      case "NootNummer":
        return <>{node.textContent}</>;

      case "Noot":
        const noteId = parseInt(this.getAttribute(node, "note-id"), 10);
        const noteIsOpen = this.notes[noteId];
        const noteControlsId = `dso-ozon-note-${noteId}`;
        const noteHref = `#${noteControlsId}`;
        const onClickNote = (event: MouseEvent) => {
          event.preventDefault();
          this.notes[noteId] = !noteIsOpen;
          this.notes = [...this.notes];
        };

        return (
          <>
            <a
              class={{ noot: true, "dso-open": noteIsOpen }}
              href={noteHref}
              aria-controls={noteControlsId}
              aria-expanded={noteIsOpen ? "true" : "false"}
              onClick={onClickNote}
            >
              <sup>{this.childNodesToJsx(node, "NootNummer")}</sup>
            </a>
            ,
            <div class="od-Al" id={noteControlsId}>
              {this.childNodesToJsx(node, "Al")}
            </div>
            ,
          </>
        );

      case "table":
        return (
          <div class="od-Tabel">
            <table class="table">
              {this.childNodesToJsx(node, "title")}
              {this.childNodesToJsx(node, "tgroup")}
            </table>
            {this.childNodesToJsx(node, "Bron")}
          </div>
        );

      case "tgroup":
        return (
          <>
            {this.childNodesToJsx(node, "thead")}
            {this.childNodesToJsx(node, "tbody")}
          </>
        );

      case "title":
        return <caption>{this.childNodesToJsx(node)}</caption>;

      case "thead":
        return <thead>{this.childNodesToJsx(node, "row")}</thead>;

      case "tbody":
        return <tbody>{this.childNodesToJsx(node, "row")}</tbody>;

      case "row":
        return <tr>{this.childNodesToJsx(node, "entry")}</tr>;

      case "entry":
        const moreRows = this.getAttribute(node, "morerows");
        const rowSpan = moreRows ? parseInt(moreRows, 10) + 1 : undefined;
        const nameStart = this.getAttribute(node, "namest");
        const nameEnd = this.getAttribute(node, "nameend");
        let colSpan = undefined;
        if (nameStart && nameEnd && nameStart !== nameEnd) {
          const colSpecs = Array.from(
            node.parentNode?.parentNode?.parentNode?.childNodes ?? []
          ).filter((n) => this.getLocalName(n) === "colspec");
          const colSpecStartNode = colSpecs.find(
            (n) => this.getAttribute(n, "colname") == nameStart
          );
          const colSpecEndNode = colSpecs.find(
            (n) => this.getAttribute(n, "colname") == nameEnd
          );
          if (colSpecStartNode && colSpecEndNode) {
            const colSpecStartNum = parseInt(
              this.getAttribute(colSpecStartNode, "colnum"),
              10
            );
            const colSpecEndNum = parseInt(
              this.getAttribute(colSpecEndNode, "colnum"),
              10
            );
            colSpan = colSpecEndNum - colSpecStartNum + 1;
          }
        }

        if (this.getLocalName(node.parentNode?.parentNode ?? node) == "thead") {
          return (
            <th scope="col" colSpan={colSpan} rowSpan={rowSpan}>
              {this.childNodesToJsx(node)}
            </th>
          );
        }

        return (
          <td colSpan={colSpan} rowSpan={rowSpan}>
            {this.childNodesToJsx(node)}
          </td>
        );

      default:
        return (
          <div class={`od-${this.getLocalName(node)}`}>
            {this.childNodesToJsx(node)}
          </div>
        );
    }
  };

  serializer = new DOMParser();

  connectedCallback() {
    this.xmlContent = this.serializer.parseFromString(
      this.content ?? "",
      "text/xml"
    );
    const notes = this.xmlContent.querySelectorAll("Noot");
    this.notes = Array.from(notes).map(() => false);
    notes.forEach((note: Element, key: number) =>
      note.setAttribute("note-id", `${key}`)
    );
  }

  render(): JSX.Element | null {
    return this.nodeToJsx(this.xmlContent.getRootNode());
  }
}
