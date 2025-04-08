import { Fragment, h, JSX } from "@stencil/core";

import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

type BijschriftProps = {
  bijschrift?: IBijschrift;
  bron?: ChildNode;
  mapNodeToJsx: (node: Node | NodeList | Node[]) => JSX.Element;
};

interface IBijschrift {
  inhoud: NodeListOf<ChildNode>;
  locatie: string;
}

interface Illustratie {
  naam: string | null;
  breedte: string | null;
  hoogte: string | null;
  dpi: string | null;
  uitlijning: string | null;
  alt: string | null;
}

const Bijschrift = ({ bijschrift, bron, mapNodeToJsx }: BijschriftProps): HTMLSpanElement => {
  return (
    <span class="figuur-bijschrift">
      {bijschrift && bijschrift.inhoud && mapNodeToJsx(bijschrift.inhoud)}
      {bron && (
        <Fragment>
          {`${bijschrift ? " " : ""}(bron: `}
          {mapNodeToJsx(bron)})
        </Fragment>
      )}
    </span>
  );
};

export class OzonContentFiguurNode implements OzonContentNode {
  name = ["Figuur"];

  getStyle(illustratie: Illustratie) {
    const widthPixels = Number(illustratie.breedte);
    const heightPixels = Number(illustratie.hoogte);

    if (widthPixels && heightPixels) {
      // This is the STOP formula to calculate the width in percentage
      // see: https://koop.gitlab.io/stop/standaard/1.4.0-ic/regeltekst_afbeelding.html
      // We maximise it to 100% in the case of missing dpi or a calculated percentage greater than 100%
      const widthPercentage = Math.min(illustratie.dpi ? (16.4 * widthPixels) / Number(illustratie.dpi) : 100, 100);
      return {
        "--ozon-illustratie-aspect-ratio": (widthPixels / heightPixels).toString(),
        "--ozon-illustratie-width": `${widthPercentage}%`,
      };
    }
    return;
  }

  render(node: Element, { mapNodeToJsx, urlResolver }: OzonContentNodeContext) {
    const childNodes = Array.from(node.childNodes);
    const titel = childNodes.find((n) => getNodeName(n) === "Titel")?.textContent;
    const bron = childNodes.find((n) => getNodeName(n) === "Bron");

    const illustratieNode = childNodes.find((n) => getNodeName(n) === "Illustratie");
    const bijschriftNode = childNodes.find((n) => getNodeName(n) === "Bijschrift");

    const wijzigactie = node.getAttribute("wijzigactie") || undefined;

    if (illustratieNode instanceof Element) {
      const illustratie = {
        naam: illustratieNode.getAttribute("naam"),
        breedte: illustratieNode.getAttribute("breedte"),
        hoogte: illustratieNode.getAttribute("hoogte"),
        dpi: illustratieNode.getAttribute("dpi"),
        uitlijning: illustratieNode.getAttribute("uitlijning") || "start",
        alt: illustratieNode.getAttribute("alt"),
      };

      const bijschrift =
        bijschriftNode instanceof Element
          ? {
              inhoud: bijschriftNode.childNodes,
              locatie: bijschriftNode.getAttribute("locatie") ?? "onder",
            }
          : undefined;

      const src = urlResolver ? urlResolver("Illustratie", "naam", illustratie.naam, node) : illustratie.naam;

      return (
        <div
          class={`dso-ozon-figuur ${bijschrift ? `bijschrift-${bijschrift.locatie}` : "onder"}`}
          style={{ "--ozon-illustratie-uitlijning": `${illustratie.uitlijning}` }}
        >
          {titel && <span class="figuur-titel">{titel}</span>}
          {bijschrift?.locatie === "boven" && (
            <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} />
          )}
          <dso-image-overlay
            wijzigactie={wijzigactie}
            class="dso-ozon-figuur-reserve-space"
            style={this.getStyle(illustratie)}
          >
            {titel && (
              <div slot="titel">
                <span>{titel}</span>
              </div>
            )}
            <img src={src ?? undefined} alt={illustratie.alt ?? titel ?? illustratie.naam ?? undefined} />
            {(bijschrift || bron) && (
              <div slot="bijschrift">
                <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} />
              </div>
            )}
          </dso-image-overlay>
          {(bijschrift?.locatie === "onder" || (!bijschrift && bron)) && (
            <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} />
          )}
        </div>
      );
    }
  }
}
