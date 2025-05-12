import { FunctionalComponent, h } from "@stencil/core";

import { OzonContentWijzigActie } from "../ozon-content.interfaces";

export interface WrapWijzigactieProps {
  wijzigactie: OzonContentWijzigActie | undefined;
  className?: string;
}

export const WrapWijzigactie: FunctionalComponent<WrapWijzigactieProps> = ({ wijzigactie, className }, children) => {
  if (wijzigactie === "voegtoe") {
    return <ins class={className}>{children}</ins>;
  }

  if (wijzigactie === "verwijder") {
    return <del class={className}>{children}</del>;
  }

  return children;
};
