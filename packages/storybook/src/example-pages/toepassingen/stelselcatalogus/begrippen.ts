import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { definitions1, definitions2, definitions3, definitions4, definitions5, mainMenu } from "./begrippen.content";

examplePageFactory(
  "Toepassingen/Stelselcatalogus",
  "Begrippen",
  ({ definitionListTemplate, buttonRowTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu })}

      <main>
        <h1>Aanlegplaats</h1>
        <p role="doc-subtitle">Begrip uit het Omgevingsloket</p>

        <h2>Algemeen</h2>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions1 })}
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
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions2 })}

        <h3>Relaties binnen AQUO begrippenkader</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions3 })}

        <h3>Relaties buiten AQUO begrippenkader</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions4 })}

        <h3>Technisch</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions5 })}
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
