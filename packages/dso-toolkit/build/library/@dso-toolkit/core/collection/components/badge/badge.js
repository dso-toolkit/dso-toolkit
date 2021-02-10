import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';
export class Badge {
  render() {
    return (h("span", { class: clsx('dso-badge', { [`badge-${this.status}`]: this.status }) },
      h("span", { class: "sr-only" },
        this.status ? Badge.statusMap.get(this.status) : 'Badge',
        ": "),
      h("slot", null)));
  }
  static get is() { return "dso-badge"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["badge.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["badge.css"]
  }; }
  static get properties() { return {
    "status": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'primary' | 'success' | 'info' | 'warning' | 'danger'",
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
Badge.statusMap = new Map([
  ['primary', 'Primair'],
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);
