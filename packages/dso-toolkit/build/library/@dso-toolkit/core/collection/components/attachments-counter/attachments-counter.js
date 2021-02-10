import { Component, h, Prop } from "@stencil/core";
export class AttachmentsCounter {
  render() {
    return (h("span", { class: "dso-attachments" },
      this.count,
      " ",
      h("span", { class: "sr-only" },
        "bijlage",
        this.count !== 1 ? 'n' : '')));
  }
  static get is() { return "dso-attachments-counter"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["attachments-counter.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["attachments-counter.css"]
  }; }
  static get properties() { return {
    "count": {
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
      "attribute": "count",
      "reflect": false
    }
  }; }
}
