import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';
export class Alert {
  render() {
    const status = Alert.statusMap.get(this.status);
    if (!status) {
      throw new Error(`Invalid status ${this.status}`);
    }
    return (h("div", { class: clsx('alert', `alert-${this.status}`), role: "alert" },
      h("span", { class: "sr-only" },
        status,
        ":"),
      h("slot", null)));
  }
  static get is() { return "dso-alert"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["alert.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["alert.css"]
  }; }
  static get properties() { return {
    "status": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'success' | 'info' | 'warning' | 'danger'",
        "resolved": "\"danger\" | \"info\" | \"success\" | \"warning\"",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "status",
      "reflect": false
    }
  }; }
}
Alert.statusMap = new Map([
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);
