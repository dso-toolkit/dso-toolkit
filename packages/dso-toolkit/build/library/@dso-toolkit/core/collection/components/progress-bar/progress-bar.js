import { Component, h, Prop } from '@stencil/core';
export class ProgressBar {
  constructor() {
    this.min = 0;
    this.max = 100;
  }
  render() {
    const progress = Math.round(this.progress / this.max * 100);
    return (h("div", { class: "progress" },
      h("div", { class: "progress-bar", role: "progressbar", "aria-valuenow": progress, "aria-valuemin": this.min, "aria-valuemax": this.max, style: { width: `${progress}%` } },
        h("span", null,
          h("slot", null, `${progress}%`)))));
  }
  static get is() { return "dso-progress-bar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["progress-bar.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["progress-bar.css"]
  }; }
  static get properties() { return {
    "progress": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "progress",
      "reflect": false
    },
    "min": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "min",
      "reflect": false,
      "defaultValue": "0"
    },
    "max": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "max",
      "reflect": false,
      "defaultValue": "100"
    }
  }; }
}
