import { bindTemplate, StorybookParameters } from "../../stories-helpers";
import {
  helpcenterPanelArgsMapper,
  HelpcenterPanelArgTypes,
} from "./helpcenter-panel.args";
import { HelpcenterPanel } from "./helpcenter-panel.models";

export interface HelpcenterPanelParameters<TemplateFnReturnType> {
  helpcenterPanelTemplate: (
    helpcenterPanelProperties: HelpcenterPanel
  ) => TemplateFnReturnType;
}

export function storiesOfHelpcenterPanel<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { helpcenterPanelTemplate }: HelpcenterPanelParameters<TemplateFnReturnType>
) {
  const stories = storiesOf("Helpcenter Panel", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: HelpcenterPanelArgTypes,
  });

  stories.add(
    "Helpcenter Panel",
    bindTemplate(helpcenterPanelArgsMapper, helpcenterPanelTemplate),
    {
      args: {
        label: "Hulp nodig",
        url: "https://core.dso-toolkit.nl/_1376-helpcenter-panel/?path=/docs/helpcenter-panel--helpcenter-panel",
        width: "50%",
        content: `
          <div class="dso-rich-content">
            <h2>Samenspel tussen wetgever en ontwikkelaars</h2>
            <p>
              Het DSO wordt ontwikkeld door het programma <a href="https://aandeslagmetdeomgevingswet.nl/digitaal-stelsel/">
              Aan de slag met de Omgevingswet</a> in samenwerking met haar partners. De ontwikkeling vraagt een intensief samenspel
              tussen de wetgever en de ontwikkelpartners van het DSO. Enerzijds moeten wetgever en de ontwikkelpartners zorgen dat
              alles wat in de wet- en regelgeving wordt geregeld ook makkelijk toegankelijk is of kan worden. Anderzijds moeten zij
              zorgen dat alles wat digitaal wordt gerealiseerd, ook juridisch verankerd is of kan worden.
            </p>
          </div>
        `,
      },
    }
  );
}
