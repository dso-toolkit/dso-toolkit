import { ComponentAnnotations, Renderer } from "@storybook/types";

import { WhiteboxArgs, whiteboxArgsMapper, whiteboxArgTypes } from "./whitebox.args.js";
import { Whitebox } from "./whitebox.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type WhiteboxStory = StoryObj<WhiteboxArgs, Renderer>;

interface WhiteboxStories {
  Default: WhiteboxStory;
  WithCounter: WhiteboxStory;
  WithIcon: WhiteboxStory;
}

interface WhiteboxStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, WhiteboxTemplates<TemplateFnReturnType>> {}

interface WhiteboxTemplates<TemplateFnReturnType> {
  whiteboxTemplate: (whiteboxProperties: Whitebox) => TemplateFnReturnType;
}

export function whiteboxMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  WhiteboxArgs
> {
  return {
    argTypes: whiteboxArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function whiteboxStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: WhiteboxStoriesParameters<Implementation, Templates, TemplateFnReturnType>): WhiteboxStories {
  return {
    Default: {
      args: {
        title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
        description: "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?",
        label: "Direct naar aanvragen",
        imageSource: "images/indienen.png",
        imageAlt: "",
      },
      render: templateContainer.render(storyTemplates, (args, { whiteboxTemplate }) =>
        whiteboxTemplate(whiteboxArgsMapper(args)),
      ),
    },
    WithCounter: {
      args: {
        count: 3,
        title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
        description: "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?",
        label: "Direct naar aanvragen",
        imageSource: "images/indienen.png",
        imageAlt: "",
      },
      render: templateContainer.render(storyTemplates, (args, { whiteboxTemplate }) =>
        whiteboxTemplate(whiteboxArgsMapper(args)),
      ),
    },
    WithIcon: {
      args: {
        icon: "check",
        iconLabel: "afgerond",
        title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
        description: "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?",
        label: "Direct naar aanvragen",
        imageSource: "images/indienen.png",
        imageAlt: "",
      },
      render: templateContainer.render(storyTemplates, (args, { whiteboxTemplate }) =>
        whiteboxTemplate(whiteboxArgsMapper(args)),
      ),
    },
  };
}
