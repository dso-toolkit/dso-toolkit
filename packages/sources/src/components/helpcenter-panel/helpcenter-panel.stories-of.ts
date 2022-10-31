import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { HelpcenterPanelArgs, helpcenterPanelArgsMapper, helpcenterPanelArgTypes } from "./helpcenter-panel.args";
import { HelpcenterPanel } from "./helpcenter-panel.models";

export interface HelpcenterPanelTemplates<TemplateFnReturnType> {
  helpcenterPanelTemplate: (helpcenterPanelProperties: HelpcenterPanel) => TemplateFnReturnType;
}

export function storiesOfHelpcenterPanel<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HelpcenterPanelTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Helpcenter Panel", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: helpcenterPanelArgTypes,
    });

    stories.add(
      "Helpcenter Panel",
      templateMapper<HelpcenterPanelArgs>((args, { helpcenterPanelTemplate }) =>
        helpcenterPanelTemplate(helpcenterPanelArgsMapper(args))
      ),
      {
        args: {
          label: "Hulp nodig",
          url: window.location.origin + "/iframe.html?id=core-helpcenter-panel--helpcenter-panel&viewMode=docs",
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
  });
}
