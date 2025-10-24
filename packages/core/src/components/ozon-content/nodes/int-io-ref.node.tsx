import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntIoRefNode implements OzonContentNode {
  name = "IntIoRef";

  render(node: Element, { mapNodeToJsx, emitClick, urlResolver }: OzonContentNodeContext) {
    const value = node.getAttribute("ref");
    const href = urlResolver ? urlResolver("IntIoRef", "ref", value, node) : value;

    if (!value) {
      return mapNodeToJsx(node.childNodes);
    }

    const intRefOnClick = (event: MouseEvent, openAnnotation = false) => {
      event.preventDefault();

      const target = event.currentTarget;
      if (!(target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement)) {
        return;
      }

      emitClick({
        type: openAnnotation ? "IntIoRefAnnotation" : "IntIoRef",
        node,
        originalEvent: event,
      });
    };

    return (
      <Fragment>
        <dso-reference-toggletip icon="map-location">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          <Fragment>
            <p>
              Gebieden op de kaart tonen:{" "}
              <button class="dso-tertiary" onClick={(e) => intRefOnClick(e, true)}>
                <span>Kenmerken en kaart</span>
                <dso-icon icon="label" />
              </button>
            </p>
            <p>
              Officiële publicaties:{" "}
              <a href={href ?? undefined} onClick={intRefOnClick}>
                <span>{mapNodeToJsx(node.childNodes)}</span>
                <dso-icon icon="external-link" />
              </a>
            </p>
          </Fragment>
        </dso-reference-toggletip>
      </Fragment>
    );
  }
}
