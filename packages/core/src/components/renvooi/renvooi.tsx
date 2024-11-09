import { Component, ComponentInterface, Fragment, FunctionalComponent, Prop, h } from "@stencil/core";

import { RenvooiValue } from "./renvooi.interfaces";

interface RenvooiRenderProps {
  value: RenvooiValue | RenvooiValue[] | undefined;
  nested?: boolean;
}

const RenvooiRender: FunctionalComponent<RenvooiRenderProps> = ({ value, nested }) => {
  if (typeof value === "string" || !value) {
    // This element is used for --_dso-renvooi-text-decoration
    return nested ? value : <span class="text">{value}</span>;
  }

  if (Array.isArray(value)) {
    return (
      <>
        {value.map((v, i, { length }) => (
          <>
            <RenvooiRender value={v} nested />
            {i < length - 1 ? ", " : ""}
          </>
        ))}
      </>
    );
  }

  if ("toegevoegd" in value) {
    return <ins>{value.toegevoegd}</ins>;
  }

  if ("verwijderd" in value) {
    return <del>{value.verwijderd}</del>;
  }

  return (
    <>
      <del>{value.was}</del> <ins>{value.wordt}</ins>
    </>
  );
};

/**
 * Met dit component kan een `RenvooiValue` worden gepresenteerd.
 */
@Component({
  tag: "dso-renvooi",
  styleUrl: "renvooi.scss",
  shadow: true,
})
export class Renvooi implements ComponentInterface {
  /**
   * The renvooi value to render.
   */
  @Prop()
  value?: RenvooiValue | RenvooiValue[];

  render() {
    return <RenvooiRender value={this.value} />;
  }
}
