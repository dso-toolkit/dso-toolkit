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

  getStyle(breedte: number, hoogte: number) {
    if (breedte && hoogte) {
      return {
        "--img-aspect-ratio": (breedte / hoogte).toString(),
      };
    }
    return;
  }

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
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
        uitlijning: illustratieNode.getAttribute("uitlijning"),
        alt: illustratieNode.getAttribute("alt"),
      };

      const bijschrift =
        bijschriftNode instanceof Element
          ? {
              inhoud: bijschriftNode.childNodes,
              locatie: bijschriftNode.getAttribute("locatie") ?? "onder",
            }
          : undefined;

      const preventLayoutShift = !!Number(illustratie.breedte) && !!Number(illustratie.hoogte);

      return (
        <div class={`dso-ozon-figuur ${bijschrift ? `bijschrift-${bijschrift.locatie}` : "onder"}`}>
          {titel && <span class="figuur-titel">{titel}</span>}
          {bijschrift?.locatie === "boven" && (
            <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx} />
          )}
          <dso-image-overlay wijzigactie={wijzigactie}>
            {titel && (
              <div slot="titel">
                <span>{titel}</span>
              </div>
            )}
            <img
              src={illustratie.naam ?? undefined}
              alt={illustratie.alt ?? titel ?? illustratie.naam ?? undefined}
              class={{ "dso-ozon-figuur-reserve-space": preventLayoutShift }}
              style={this.getStyle(Number(illustratie.breedte), Number(illustratie.hoogte))}
            />
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
