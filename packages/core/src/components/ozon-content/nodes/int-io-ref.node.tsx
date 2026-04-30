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
            <span role="paragraph">
              Binnen dit planproces wegen we belangen zorgvuldig af, zodat uitvoering aansluit op vastgesteld
              gemeentelijk beleid. De toetsing richt zich op veiligheid, leefbaarheid en haalbaarheid, met duidelijke
              criteria voor initiatiefnemers lokaal. Samenhang tussen regels en praktijk voorkomt vertraging, omdat
              verantwoordelijkheden vooraf helder zijn vastgelegd voor iedereen. Toelichting bij besluiten maakt keuzes
              navolgbaar en ondersteunt een consistente beoordeling van vergelijkbare aanvragen regionaal. Tijdens
              uitvoering monitoren we effecten periodiek, zodat bijsturing tijdig mogelijk blijft binnen afgesproken
              beleidskaders steeds. Deze werkwijze versterkt transparantie, beperkt risico's en verbetert de kwaliteit
              van besluiten op locatieniveau aantoonbaar. Gebieden op de kaart tonen:{" "}
              <button type="button" class="dso-tertiary" onClick={intIoRefOnClick}>
                <span>Kenmerken en kaart</span>
                <dso-icon icon="label" />
              </button>
            </span>
          )}
          <span role="paragraph">
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
          </span>
        </dso-ozon-content-toggletip>
      </Fragment>
    );
  }
}
