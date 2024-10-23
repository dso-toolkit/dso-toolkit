import { Component, ComponentInterface, h } from "@stencil/core";

// import {  } from "./skiplinks.interfaces";

@Component({
  tag: "dso-skiplinks",
  styleUrl: "skiplinks.scss",
  shadow: true,
})
export class Skiplinks implements ComponentInterface {
  render() {
    return (
      <div>
        <a href="#navigation" class="dso-skip">
          Ga naar navigatie
          <dso-icon icon="chevron-right"></dso-icon>
        </a>
        <a href="#main" class="dso-skip">
          Ga naar inhoud
          <dso-icon icon="chevron-right"></dso-icon>
        </a>
        <a href="#footer" class="dso-skip">
          Ga naar website-informatie
          <dso-icon icon="chevron-right"></dso-icon>
        </a>
      </div>
    );
  }
}
