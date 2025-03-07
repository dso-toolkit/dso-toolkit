import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { definitions1, definitions2, definitions3, definitions4, definitions5, mainMenu } from "./begrippen.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Stelselcatalogus",
  "Begrippen",
  ({ definitionListTemplate, buttonRowTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu })}

      <main>
        <h1>Aanlegplaats</h1>
        <p role="doc-subtitle">Begrip uit het Omgevingsloket</p>

        <h2>Algemeen</h2>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions1(templates) })}
        ${buttonRowTemplate({
          buttons: [
            {
              label: "Bekijk minder details",
              variant: "secondary",
              type: "button",
              icon: { icon: "chevron-up" },
              ariaExpanded: false,
            },
          ],
        })}

        <h3>Unieke identificatie</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions2(templates) })}

        <h3>Relaties binnen AQUO begrippenkader</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions3(templates) })}

        <h3>Relaties buiten AQUO begrippenkader</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions4(templates) })}

        <h3>Technisch</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions5(templates) })}
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
