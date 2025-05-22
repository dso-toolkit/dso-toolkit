import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";
import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";

function mapData(node: Element) {
  return {
    label: node.querySelector("Label"),
    nummer: node.querySelector("Nummer"),
    opschrift: node.querySelector("Opschrift"),
    subtitels: Array.from(node.querySelectorAll("Subtitel")),
  };
}

export class OzonContentKopNode implements OzonContentNode {
  name = "Kop";

  handles = ["Label", "Nummer", "Opschrift", "Subtitel"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const { label, nummer, opschrift, subtitels } = mapData(node);

    const wijzigactieLabel = label ? parseWijzigactieFromNode(label) : undefined;

    const wijzigactieNummer = nummer ? parseWijzigactieFromNode(nummer) : undefined;

    const wijzigactieOpschrift = opschrift ? parseWijzigactieFromNode(opschrift) : undefined;

    return (
      <WrapWijzigactie wijzigactie={parseWijzigactieFromNode(node)}>
        {label && <WrapWijzigactie wijzigactie={wijzigactieLabel}>{mapNodeToJsx(label.childNodes)}</WrapWijzigactie>}
        {nummer && (
          <>
            {" "}
            <WrapWijzigactie wijzigactie={wijzigactieNummer}>{mapNodeToJsx(nummer.childNodes)}</WrapWijzigactie>
          </>
        )}
        {opschrift && (
          <>
            {" "}
            <WrapWijzigactie wijzigactie={wijzigactieOpschrift}>{mapNodeToJsx(opschrift.childNodes)}</WrapWijzigactie>
          </>
        )}
        {subtitels.length > 0 && (
          <div class="subtitels-container" part="subtitels">
            {subtitels.map((subtitel) => {
              const wijzigactieSubtitel = parseWijzigactieFromNode(subtitel);

              return (
                <div class="subtitel">
                  <WrapWijzigactie wijzigactie={wijzigactieSubtitel}>
                    {mapNodeToJsx(subtitel.childNodes)}
                  </WrapWijzigactie>
                </div>
              );
            })}
          </div>
        )}
      </WrapWijzigactie>
    );
  }
}
