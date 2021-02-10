import { Component, Prop, h, getAssetPath } from '@stencil/core';
import clsx from 'clsx';
export class Icon {
  render() {
    return (h("svg", { class: clsx('di', this.icon) },
      h("use", { href: `${getAssetPath('./icon-assets/dso-icons.svg')}#${this.icon}` })));
  }
  static get is() { return "dso-icon"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./icon.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["icon.css"]
  }; }
  static get assetsDirs() { return ["icon-assets"]; }
  static get properties() { return {
    "icon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "icon",
      "reflect": false
    }
  }; }
}
