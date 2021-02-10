import { Component, h, Prop, Element } from '@stencil/core'; // 
import clsx from 'clsx';
export class WhiteBox {
  render() {
    var _a;
    const whiteboxClass = this.small ? 'dso-whitebox-small' : 'dso-whitebox';
    const hasCounter = this.step || !!this.element.querySelector('[slot=icon]');
    const classes = clsx(whiteboxClass, {
      'dso-has-counter': hasCounter
    });
    return (h("div", { class: classes },
      hasCounter && (h("div", { class: "dso-step-counter" }, (_a = this.step) !== null && _a !== void 0 ? _a : (h("slot", { name: "icon" })))),
      this.small ? (h("a", { href: "#" },
        h("span", { class: "dso-whitebox-icon" },
          h("slot", { name: "img" })),
        h("span", { class: "dso-whitebox-link" }, this.label))) : (h("p", null, "ik ben groot"))));
  }
  static get is() { return "dso-whitebox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["whitebox.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["whitebox.css"]
  }; }
  static get properties() { return {
    "small": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "small",
      "reflect": false
    },
    "label": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "label",
      "reflect": false
    },
    "step": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "step",
      "reflect": false
    }
  }; }
  static get elementRef() { return "element"; }
}
