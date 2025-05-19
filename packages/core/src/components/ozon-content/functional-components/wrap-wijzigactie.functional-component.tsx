import { FunctionalComponent, h } from "@stencil/core";
import { OzonContentWijzigActie } from "../ozon-content.interfaces";

export interface WrapWijzigactieProps {
  wijzigactie: OzonContentWijzigActie | undefined;
}

export const WrapWijzigactie: FunctionalComponent<WrapWijzigactieProps> = ({ wijzigactie }, children) => {
  if (wijzigactie === "voegtoe") {
    return <ins>{children}</ins>;
  }

  if (wijzigactie === "verwijder") {
    return <del>{children}</del>;
  }

  return children;
};
