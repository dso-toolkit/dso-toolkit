import { FunctionalComponent, JSX, h } from "@stencil/core";

import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { wijzigactieToClassName } from "../functions/wijzigactie-to-class-name.function";
import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentWijzigActie } from "../ozon-content.interfaces";

interface BegripProps {
  wijzigactieBegrip: OzonContentWijzigActie | undefined;
  node: ChildNode;
  mapNodeToJsx: (node: Node | NodeList | Node[]) => JSX.Element;
}

const Term: FunctionalComponent<BegripProps> = ({ wijzigactieBegrip, node, mapNodeToJsx }) => {
  const content = mapNodeToJsx(node.childNodes);
  const wijzigactie = parseWijzigactieFromNode(node);
  const className = wijzigactieToClassName(wijzigactie);

  return (
    <dt class={className}>
      <WrapWijzigactie wijzigactie={wijzigactieBegrip || wijzigactie}>{content}</WrapWijzigactie>
    </dt>
  );
};

const Definitie: FunctionalComponent<BegripProps> = ({ wijzigactieBegrip, node, mapNodeToJsx }) => {
  const content = mapNodeToJsx(node.childNodes);
  const wijzigactie = parseWijzigactieFromNode(node);
  const className = wijzigactieToClassName(wijzigactie);

  return (
    <dd class={className}>
      <WrapWijzigactie wijzigactie={wijzigactieBegrip || wijzigactie}>{content}</WrapWijzigactie>
    </dd>
  );
};

export class OzonContentBegripNode implements OzonContentNode {
  name = "Begrip";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const wijzigactie = parseWijzigactieFromNode(node);
    const className = wijzigactieToClassName(wijzigactie);

    const childNodes = Array.from(node.childNodes);
    const terms = childNodes.filter((n) => getNodeName(n) === "Term");
    const definitions = childNodes.filter((n) => getNodeName(n) === "Definitie");

    return (
      <div class={className}>
        {terms.map((term) => (
          <Term node={term} wijzigactieBegrip={wijzigactie} mapNodeToJsx={mapNodeToJsx} />
        ))}
        {definitions.map((definition) => (
          <Definitie node={definition} wijzigactieBegrip={wijzigactie} mapNodeToJsx={mapNodeToJsx} />
        ))}
      </div>
    );
  }
}
