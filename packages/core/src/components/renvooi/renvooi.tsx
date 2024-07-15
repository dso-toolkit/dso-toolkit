import { Component, ComponentInterface, Fragment, Prop, h } from "@stencil/core";

import { RenvooiValue } from "./renvooi.interfaces";

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
    const { value } = this;

    if (typeof value === "string" || !value) {
      return value;
    }

    if (Array.isArray(value)) {
      return (
        <>
          {value.map((v, i, { length }) => (
            <>
              <dso-renvooi value={v} />
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
  }
}
