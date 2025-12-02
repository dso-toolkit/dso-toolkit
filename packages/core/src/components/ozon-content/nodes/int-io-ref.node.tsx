import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntIoRefNode implements OzonContentNode {
  name = "IntIoRef";

  render(node: Element, { mapNodeToJsx, emitClick, urlResolver }: OzonContentNodeContext) {
    const value = node.getAttribute("ref");

    if (!value) {
      return mapNodeToJsx(node.childNodes);
    }

    const href = urlResolver ? urlResolver("IntIoRef", "ref", value, node) : value;

    const intIoRefOnClick = (event: MouseEvent) => {
      emitClick({
        type: "IntIoRef",
        node,
        originalEvent: event,
      });
    };

    return (
      <Fragment>
        <dso-ozon-content-toggletip icon="map-location">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          <p>
            Gebieden op de kaart tonen:{" "}
            <button type="button" class="dso-tertiary" onClick={intIoRefOnClick}>
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
        </dso-ozon-content-toggletip>
      </Fragment>
    );
  }
}
