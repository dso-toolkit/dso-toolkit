import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { LogoArgs, logoArgTypes, logoArgsMapper } from "./logo.args.js";
import { Logo } from "./logo.models.js";

type LogoStory = StoryObj<LogoArgs, Renderer>;

interface LogoStories {
  Default: LogoStory;
  WithName: LogoStory;
  WithLogoUrl: LogoStory;
  WithLabel: LogoStory;
  WithLabelAndLabelUrl: LogoStory;
  WithLogoUrlAndLabelAndLabelUrl: LogoStory;
  WithRibbon: LogoStory;
  WithLabelAndRibbon: LogoStory;
}

export interface LogoTemplates<TemplateFnReturnType> {
  logoTemplate: (logoProperties: Logo) => TemplateFnReturnType;
}

interface LogoStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, LogoTemplates<TemplateFnReturnType>> {}

export function logoMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LogoArgs
> {
  return {
    argTypes: logoArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function logoStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: LogoStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LogoStories {
  const render = templateContainer.render(storyTemplates, (args: LogoArgs, { logoTemplate }) =>
    logoTemplate(logoArgsMapper(args)),
  );
  return {
    Default: { render },
    WithName: {
      args: {
        name: "Environment & Planning| Portal",
      },
      render,
    },
    WithLabel: {
      args: {
        label: "Regels op de kaart",
      },
      render,
    },
    WithLabelAndLabelUrl: {
      args: {
        label: "Regels op de kaart",
        labelUrl: "regels-op-de-kaart",
      },
      render,
    },
    WithLogoUrl: {
      args: {
        logoUrl: "/",
      },
      render,
    },
    WithLogoUrlAndLabelAndLabelUrl: {
      args: {
        label: "Regels op de kaart",
        labelUrl: "regels-op-de-kaart",
        logoUrl: "/",
      },
      render,
    },
    WithRibbon: {
      args: {
        ribbon: "beta",
      },
      render,
    },
    WithLabelAndRibbon: {
      args: {
        ribbon: "beta",
        label: "Regels op de kaart",
      },
      render,
    },
  };
}
