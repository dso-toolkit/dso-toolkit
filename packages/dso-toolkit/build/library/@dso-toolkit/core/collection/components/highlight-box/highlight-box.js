import { Component, h, Prop, Element } from '@stencil/core';
import clsx from 'clsx';
export class HighlightBox {
  render() {
    var _a;
    const hasCounter = this.step || !!this.element.querySelector('[slot=icon]');
    const classes = clsx('dso-highlight-box', {
      'dso-yellow': this.yellow,
      'dso-border': this.border,
      'dso-white': this.white,
      'dso-drop-shadow': this.dropShadow,
      'dso-has-counter': hasCounter
    });
    return (h("div", { class: classes },
      hasCounter && (h("div", { class: "dso-step-counter" }, (_a = this.step) !== null && _a !== void 0 ? _a : (h("slot", { name: "icon" })))),
      h("slot", null)));
  }
  static get is() { return "dso-highlight-box"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["highlight-box.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["highlight-box.css"]
  }; }
  static get properties() { return {
    "yellow": {
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
      "attribute": "yellow",
      "reflect": false
    },
    "border": {
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
      "attribute": "border",
      "reflect": false
    },
    "white": {
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
      "attribute": "white",
      "reflect": false
    },
    "dropShadow": {
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
      "attribute": "drop-shadow",
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
