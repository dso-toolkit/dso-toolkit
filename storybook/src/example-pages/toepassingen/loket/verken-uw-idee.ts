import { html } from "lit-html";
import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";

examplePageFactory(
  "Toepassingen/Loket",
  "Verken uw idee",
  ({ anchorTemplate, highlightBoxTemplate, richContentTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        <div
          class="row dso-banner no-button-banner dso-banner-implementation-specific-image"
          style="background-image: url('images/hero2.jpeg')"
        >
          <div class="col-lg-6 col-sm-8 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h1>Verken uw idee</h1>
                  <p>
                    Heeft u een idee voor een project dat u wilt verkennen? Of heeft u een plan, maar u wilt u eerst de
                    mogelijkheden bespreken voor u het verder uitwerkt? Dan kunt u daarover overleggen met bijvoorbeeld
                    uw gemeente of waterschap. Kijk op de website van uw gemeente of waterschap voor de mogelijkheden.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured dso-equal-heights">
          <div class="col-xs-12"><h2>Verken uw idee</h2></div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              icon: "map-location",
              content: richContentTemplate({
                children: html`
                  <h3>De mogelijkheden van uw idee verkennen</h3>
                  <p>
                    Heeft u een idee voor bijvoorbeeld een nieuw bedrijf of een groot bouwproject? En wilt u eerst de
                    mogelijkheden bespreken? Dan kunt u in overleg met uw gemeente of waterschap om uw idee te
                    verkennen.
                  </p>
                `,
              }),
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              icon: "balloon",
              content: richContentTemplate({
                children: html`
                  <h3>Samenwerking bespreken met overheidsinstanties</h3>
                  <p>
                    Wilt u een groot project starten waarvoor u moet samenwerken met verschillende overheidsinstanties?
                    Dan kunt u met de overheidsinstanties om de tafel om uw project te bespreken.
                  </p>
                `,
              }),
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              icon: "house",
              content: richContentTemplate({
                children: html`
                  <h3>Kleine werkzaamheden aan uw huis of bedrijf</h3>
                  <p>
                    Wilt u iets veranderen aan uw huis, tuin of bedrijf? Dan hoeft u niet eerst in overleg. Doe de
                    Vergunningcheck om te kijken of u een vergunning nodig heeft.
                  </p>
                  <p>${anchorTemplate({ label: "Doe de Vergunningcheck", url: "#", modifier: "dso-secondary" })}</p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-md-8 col-sm-12 col-xs-12">
            ${highlightBoxTemplate({
              yellow: true,
              content: richContentTemplate({
                children: html`
                  <h2>Verken uw idee</h2>
                  <p>
                    Als u iets wilt veranderen aan uw huis, tuin of bedrijf dan kunt u in het Omgevingsloket een
                    aanvraag doen. Of de Vergunningcheck doen om te controleren of u een vergunning nodig heeft. Het kan
                    ook zijn dat u wel een idee heeft voor een project, maar nog niet zo ver bent om al een vergunning
                    aan te vragen. U wilt eerst uw idee verkennen. Of u heeft een plan, maar u wilt u eerst de
                    mogelijkheden bespreken voordat u het verder uitwerkt. Wilt u daarover overleggen met bijvoorbeeld
                    uw gemeente of waterschap? Ga dan naar de website van uw gemeente of waterschap voor de
                    mogelijkheden.
                  </p>
                `,
              }),
            })}
            <h2>Contact met uw gemeente of waterschap</h2>
            <p>
              Bedenk eerst met welke overheidsinstantie u wilt overleggen. Dat kan bijvoorbeeld uw gemeente of
              waterschap zijn. Kijk op de website van uw gemeente of waterschap of zij de mogelijkheid bieden om uw idee
              te verkennen. En op welke manieren zij dit aanbieden. Bieden zij dit aan, dan kunt u kunt rechtstreeks
              contact opnemen met uw gemeente of waterschap.
            </p>
            <h2>Kosten</h2>
            <p>
              Wilt u met uw gemeente of waterschap overleggen? Dan zijn hier mogelijk kosten aan verbonden. Kijk daarom
              op de website van uw gemeente of waterschap voor meer informatie.
            </p>
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
