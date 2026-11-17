import { Fragment, FunctionalComponent, JSX, h } from "@stencil/core";

import { getEIdFromNode } from "../functions/get-eid-from-node.function";
import { hasContent } from "../functions/has-content.function";
import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

type BijschriftProps = {
  bijschrift?: IBijschrift;
  bron?: ChildNode;
  mapNodeToJsx: (node: Node | NodeList | Node[], mark?: boolean) => JSX.Element;
  ignoreMark?: boolean;
};

interface IBijschrift {
  inhoud: NodeListOf<ChildNode>;
}

interface Illustratie {
  naam: string | null;
  breedte: number;
  hoogte: number;
  dpi: number;
  uitlijning: "start" | "center" | "end";
  alt: string | null;
}

const Bijschrift: FunctionalComponent<BijschriftProps> = ({ bijschrift, bron, mapNodeToJsx, ignoreMark }) => (
  <span class="figuur-bijschrift">
    {bijschrift && mapNodeToJsx(bijschrift.inhoud, ignoreMark)}
    {bron && (
      <Fragment>
        {`${bijschrift ? " " : ""}(bron: `}
        {mapNodeToJsx(bron, ignoreMark)})
      </Fragment>
    )}
  </span>
);

export class OzonContentFiguurNode implements OzonContentNode {
  name = ["Figuur"];

  private getStyle(illustratie: Illustratie) {
    const widthPixels = Number(illustratie.breedte);
    const heightPixels = Number(illustratie.hoogte);

    const style = {
      "--_dso-ozon-content-illustratie-uitlijning": illustratie.uitlijning,
    };

    if (widthPixels && heightPixels) {
      // This is the STOP formula to calculate the width in percentage
      // see: https://koop.gitlab.io/stop/standaard/1.4.0-ic/regeltekst_afbeelding.html
      // We maximise it to 100% in the case of missing dpi or a calculated percentage greater than 100%
      const widthPercentage = Math.min(illustratie.dpi ? (16.4 * widthPixels) / Number(illustratie.dpi) : 100, 100);

      Object.assign(style, {
        "--_dso-ozon-content-illustratie-aspect-ratio": (widthPixels / heightPixels).toString(),
        "--_dso-ozon-content-illustratie-width": `${widthPercentage}%`,
      });
    }

    return style;
  }

  private mapIllustratieNode(node: Element): Illustratie {
    return {
      naam: node.getAttribute("naam"),
      breedte: Number(node.getAttribute("breedte")),
      hoogte: Number(node.getAttribute("hoogte")),
      dpi: Number(node.getAttribute("dpi")),
      uitlijning:
        ["start", "center", "end"].find((u): u is Illustratie["uitlijning"] => node.getAttribute("uitlijning") === u) ??
        "start",
      alt: node.getAttribute("alt"),
    };
  }

  render(node: Element, { mapNodeToJsx, urlResolver }: OzonContentNodeContext) {
    const childNodes = Array.from(node.childNodes);
    const titel = childNodes.find((n) => getNodeName(n) === "Titel" && hasContent(n));
    const bron = childNodes.find((n) => getNodeName(n) === "Bron" && hasContent(n));

    const illustratieNode = childNodes.find((n) => getNodeName(n) === "Illustratie");
    const bijschriftNode = childNodes.find((n) => getNodeName(n) === "Bijschrift");

    const wijzigactie = node.getAttribute("wijzigactie") || undefined;

    if (illustratieNode instanceof Element) {
      const illustratie = this.mapIllustratieNode(illustratieNode);

      const locatie = (bijschriftNode instanceof Element && bijschriftNode.getAttribute("locatie")) || "onder";
      const bijschrift =
        bijschriftNode instanceof Element && hasContent(bijschriftNode)
          ? { inhoud: bijschriftNode.childNodes }
          : undefined;

      const src =
        urlResolver && illustratie.naam ? urlResolver("Illustratie", "naam", illustratie.naam, node) : illustratie.naam;

      return (
        <div
          id={getEIdFromNode(node)}
          class={`dso-ozon-figuur bijschrift-${locatie}`}
          style={this.getStyle(illustratie)}
        >
          {titel && <span class="figuur-titel">{mapNodeToJsx(titel)}</span>}
          {locatie === "boven" && (bijschrift || bron) && (
            <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} />
          )}
          <dso-image-overlay wijzigactie={wijzigactie}>
            {titel && (
              <div slot="titel">
                <span>{mapNodeToJsx(titel, true)}</span>
              </div>
            )}
            <img src={src ?? undefined} alt={illustratie.alt ?? ""} />
            {(bijschrift || bron) && (
              <div slot="bijschrift">
                <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} ignoreMark />
              </div>
            )}
          </dso-image-overlay>
          {locatie !== "boven" && (bijschrift || bron) && (
            <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} />
          )}
        </div>
      );
    }
  }
}
