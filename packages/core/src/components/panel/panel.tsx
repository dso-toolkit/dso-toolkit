import { Component, ComponentInterface, h } from "@stencil/core";

// import {  } from "./panel.interfaces";

@Component({
  tag: "dso-panel",
  styleUrl: "panel.scss",
  shadow: true,
})
export class Panel implements ComponentInterface {
  render() {
    return (
      <div class="dso-panel">
        <div class="panel-header">
          <h2 class="panel-title">Panel title</h2>
          <button type="button" class="panel-close">
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">Sluiten</span>
          </button>
        </div>
        <div class="panel-body">
          <slot>panel body</slot>
        </div>
      </div>
    );
  }
}
