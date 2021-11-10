import { bindTemplate, StorybookParameters } from "../../stories-helpers";

import { toggletipArgsMapper, toggletipArgTypes } from "./toggletip.args";
import { Toggletip } from "./toggletip.models";

export interface ToggletipParameters<TemplateFnReturnType> {
  toggletipTemplate: (
    toggletipProperties: Toggletip
  ) => TemplateFnReturnType;
}

export function storiesOfToggletip<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { toggletipTemplate }: ToggletipParameters<TemplateFnReturnType>
) {
  const stories = storiesOf("Toggletip", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: toggletipArgTypes,
  });

  stories.add(
    "Toggletip",
    bindTemplate(toggletipArgsMapper, toggletipTemplate),
    {
      args: {
        children: `
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
