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

    const intRefOnClick = (event: MouseEvent) => {
      emitClick({
        type: "IntIoRefToggleAnnotation",
        node,
        originalEvent: event,
      });
    };

    return (
      <Fragment>
        <dso-ref-toggletip icon="map-location">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          <p>
            Gebieden op de kaart tonen:{" "}
            <button type="button" class="dso-tertiary" onClick={intRefOnClick}>
              <span>Kenmerken en kaart</span>
              <dso-icon icon="label" />
            </button>
          </p>
          <p>
            Officiële publicaties:{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={href ?? undefined}
              title="Opent andere website in nieuw tabblad"
            >
              <span>{mapNodeToJsx(node.childNodes)}</span>
              <dso-icon icon="external-link" />
            </a>
          </p>
        </dso-ref-toggletip>
      </Fragment>
    );
  }
}
