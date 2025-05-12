import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";
import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { OzonContentWijzigActie } from "../ozon-content.interfaces";

function mapData(node: Element) {
  return {
    label: node.querySelector("Label"),
    nummer: node.querySelector("Nummer"),
    opschrift: node.querySelector("Opschrift"),
    subtitels: node.querySelectorAll("Subtitel"),
  };
}

function wijzigactieToClassName(wijzigactie: OzonContentWijzigActie | undefined): string | undefined {
  if (wijzigactie === "voegtoe") {
    return "new-text";
  }

  if (wijzigactie === "verwijder") {
    return "removed-text";
  }

  return undefined;
}

export class OzonContentKopNode implements OzonContentNode {
  name = "Kop";

  handles = ["Label", "Nummer", "Opschrift", "Subtitel"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const { label, nummer, opschrift, subtitels } = mapData(node);

    const wijzigactieKop = parseWijzigactieFromNode(node);
    const classNameKop = wijzigactieToClassName(wijzigactieKop);

    const wijzigactieLabel = label ? parseWijzigactieFromNode(label) : undefined;
    const classNameLabel = wijzigactieToClassName(wijzigactieLabel);

    const wijzigactieNummer = nummer ? parseWijzigactieFromNode(nummer) : undefined;
    const classNameNummer = wijzigactieToClassName(wijzigactieNummer);

    const wijzigactieOpschrift = opschrift ? parseWijzigactieFromNode(opschrift) : undefined;
    const classNameOpschrift = wijzigactieToClassName(wijzigactieOpschrift);

    return (
      <WrapWijzigactie wijzigactie={wijzigactieKop} className={classNameKop}>
        {label && (
          <WrapWijzigactie wijzigactie={wijzigactieLabel} className={classNameLabel}>
            {mapNodeToJsx(label.childNodes)}
          </WrapWijzigactie>
        )}
        {nummer && (
          <>
            {" "}
            <WrapWijzigactie wijzigactie={wijzigactieNummer} className={classNameNummer}>
              {mapNodeToJsx(nummer.childNodes)}
            </WrapWijzigactie>
          </>
        )}
        {opschrift && (
          <>
            {" "}
            <WrapWijzigactie wijzigactie={wijzigactieOpschrift} className={classNameOpschrift}>
              {mapNodeToJsx(opschrift.childNodes)}
            </WrapWijzigactie>
          </>
        )}
        {Array.from(subtitels).map((subtitel) => {
          const wijzigactieSubtitel = parseWijzigactieFromNode(subtitel);
          const classNameSubtitel = wijzigactieToClassName(wijzigactieSubtitel);

          return (
            <div class="subtitel" part="subtitel">
              <WrapWijzigactie wijzigactie={wijzigactieSubtitel} className={classNameSubtitel}>
                {mapNodeToJsx(subtitel.childNodes)}
              </WrapWijzigactie>
            </div>
          );
        })}
      </WrapWijzigactie>
    );
  }
}
