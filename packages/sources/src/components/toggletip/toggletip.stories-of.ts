import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ToggletipArgs, toggletipArgsMapper, toggletipArgTypes } from "./toggletip.args";
import { Toggletip } from "./toggletip.models";

export interface ToggletipTemplates<TemplateFnReturnType> {
  toggletipTemplate: (
    toggletipProperties: Toggletip
  ) => TemplateFnReturnType;
}

export function storiesOfToggletip<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, ToggletipTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Toggletip', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: toggletipArgTypes
    });

    const template = templateMapper<ToggletipArgs>((args, { toggletipTemplate }) => toggletipTemplate(toggletipArgsMapper(args)));

    stories.add(
      "Toggletip",
      template,
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
  });
}
