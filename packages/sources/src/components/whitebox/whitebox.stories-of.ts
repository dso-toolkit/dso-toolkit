import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { WhiteboxArgs, whiteboxArgsMapper, whiteboxArgTypes } from "./whitebox.args";
import { Whitebox } from "./whitebox.models";

export interface WhiteboxTemplates<TemplateFnReturnType> {
  whiteboxTemplate: (whiteboxProperties: Whitebox) => TemplateFnReturnType;
}

export function storiesOfWhitebox<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    WhiteboxTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Whitebox", storiesOfArguments, (stories, templateMapper) => {
    type ComponentArgs = Pick<WhiteboxArgs, "title" | "description" | "label" | "imageSource" | "imageAlt">;

    stories.addParameters({
      argTypes: whiteboxArgTypes,
      args: componentArgs<ComponentArgs>({
        title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
        description: "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?",
        label: "Direct naar aanvragen",
        imageSource: "images/indienen.png",
        imageAlt: "",
      }),
    });

    const template = templateMapper<WhiteboxArgs>((args, { whiteboxTemplate }) =>
      whiteboxTemplate(whiteboxArgsMapper(args))
    );

    stories.add("default", template);

    type WithCounterArgs = Pick<WhiteboxArgs, "count">;

    stories.add("with counter", template, {
      args: componentArgs<WithCounterArgs>({
        count: 3,
      }),
    });

    type WithIconArgs = Pick<WhiteboxArgs, "icon" | "iconLabel">;

    stories.add("with icon", template, {
      args: componentArgs<WithIconArgs>({
        icon: "check",
        iconLabel: "afgerond",
      }),
    });
  });
}
