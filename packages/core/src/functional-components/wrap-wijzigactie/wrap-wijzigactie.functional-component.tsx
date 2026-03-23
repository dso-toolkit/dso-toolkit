import { FunctionalComponent, h } from "@stencil/core";

export type Wijzigactie = "voegtoe" | "verwijder";

export interface WrapWijzigactieProps {
  wijzigactie: Wijzigactie | undefined;
  class?: string;
}

export const WrapWijzigactie: FunctionalComponent<WrapWijzigactieProps> = (
  { wijzigactie, class: className },
  children,
) => {
  if (wijzigactie === "voegtoe") {
    return <ins class={className}>{children}</ins>;
  }

  if (wijzigactie === "verwijder") {
    return <del class={className}>{children}</del>;
  }

  if (className) {
    return <div class={className}>{children}</div>;
  }

  return children;
};
