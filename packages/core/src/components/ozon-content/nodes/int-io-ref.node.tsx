import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntIoRefNode implements OzonContentNode {
  name = "IntIoRef";

  render(node: Element, { mapNodeToJsx, emitClick, urlResolver, annotated }: OzonContentNodeContext) {
    const ref = node.getAttribute("ref");

    if (!ref) {
      return mapNodeToJsx(node.childNodes);
    }

    const href = urlResolver ? urlResolver("IntIoRef", "ref", ref, node) : ref;

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
          {annotated && (
            <span role="paragraph" class="int-io-ref-toggletip-paragraph">
              Gebieden op de kaart tonen:
              <button type="button" class="dso-tertiary int-io-ref-toggletip-content" onClick={intIoRefOnClick}>
                <span>Kenmerken en kaart</span>
                <dso-icon icon="label" />
              </button>
            </span>
          )}
          <span role="paragraph" class="int-io-ref-toggletip-paragraph">
            Officiële publicaties:
            <a
              class="int-io-ref-toggletip-content"
              target="_blank"
              rel="noopener noreferrer"
              href={href ?? undefined}
              title="Opent andere website in nieuw tabblad"
            >
              <span>{mapNodeToJsx(node.childNodes)}</span>
              <dso-icon icon="external-link" />
            </a>
          </span>
        </dso-ozon-content-toggletip>
      </Fragment>
    );
  }
}
