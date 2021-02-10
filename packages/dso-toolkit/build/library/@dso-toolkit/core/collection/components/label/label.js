import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';
export class Label {
  render() {
    const status = this.status && Label.statusMap.get(this.status);
    return (h("span", { class: clsx('dso-label', { [`dso-label-${this.status}`]: this.status }) },
      status && (h("span", { class: "sr-only" },
        status,
        ": ")),
      h("slot", null),
      h("slot", { name: "action" })));
  }
  static get is() { return "dso-label"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["label.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["label.css"]
  }; }
  static get properties() { return {
    "status": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'primary' | 'info' | 'success' | 'warning' | 'danger'",
        "resolved": "\"danger\" | \"info\" | \"primary\" | \"success\" | \"warning\" | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "status",
      "reflect": false
    }
  }; }
}
Label.statusMap = new Map([
  ['primary', 'Primair'],
  ['info', 'Info'],
  ['success', 'Succes'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Gevaar']
]);
