import { Fragment, h } from "@stencil/core";

import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

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

  render(node: Element, { mapNodeToJsx, emitClick }: OzonContentNodeContext) {
    const handleKopClick = (event: MouseEvent) => {
      emitClick({
        type: "Kop",
        node,
        originalEvent: event,
      });
    };

    const { label, nummer, opschrift, subtitels } = mapData(node);

    const wijzigactieLabel = label ? parseWijzigactieFromNode(label) : undefined;
    const wijzigactieNummer = nummer ? parseWijzigactieFromNode(nummer) : undefined;
    const wijzigactieOpschrift = opschrift ? parseWijzigactieFromNode(opschrift) : undefined;

    return (
      <WrapWijzigactie wijzigactie={parseWijzigactieFromNode(node)}>
        <div onClick={handleKopClick} part="_kop" class="kop">
          {label && <WrapWijzigactie wijzigactie={wijzigactieLabel}>{mapNodeToJsx(label.childNodes)}</WrapWijzigactie>}
          {nummer && (
            <Fragment>
              {" "}
              <WrapWijzigactie wijzigactie={wijzigactieNummer}>{mapNodeToJsx(nummer.childNodes)}</WrapWijzigactie>
            </Fragment>
          )}
          {opschrift && (
            <Fragment>
              {" "}
              <WrapWijzigactie wijzigactie={wijzigactieOpschrift}>{mapNodeToJsx(opschrift.childNodes)}</WrapWijzigactie>
            </Fragment>
          )}
        </div>
        {subtitels.length > 0 && (
          <div class="subtitels-container" part="_subtitels">
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
