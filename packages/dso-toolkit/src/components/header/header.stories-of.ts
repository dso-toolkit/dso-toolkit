import { ComponentAnnotations, Renderer } from "@storybook/types";

import { HeaderArgs, headerArgsMapper, headerArgTypes } from "./header.args.js";
import { Header } from "./header.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type HeaderStory = StoryObj<HeaderArgs, Renderer>;

interface HeaderStories {
  Default: HeaderStory;
  WithLabel: HeaderStory;
  WithLabelAndLabelUrl: HeaderStory;
  WithLogoUrlAndLabelAndLabelUrl: HeaderStory;
  WithRibbon: HeaderStory;
  WithLabelAndRibbon: HeaderStory;
  UserHomeActive: HeaderStory;
  WithLinkToHelp: HeaderStory;
  WithButtonToHelp: HeaderStory;
}

interface HeaderStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, HeaderTemplates<TemplateFnReturnType>> {}

interface HeaderTemplates<TemplateFnReturnType> {
  headerTemplate: (headerProperties: Header) => TemplateFnReturnType;
}

export function headerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HeaderArgs
> {
  return {
    argTypes: headerArgTypes,
    args: {
      mainMenu: [
        {
          label: "Home",
          url: "#home",
          active: true,
        },
        {
          label: "Vergunningscheck",
          url: "#vergunningscheck",
        },
        {
          label: "Aanvragen",
          url: "#aanvragen",
        },
        {
          label: "Regels op de kaart",
          url: "#regelsopdekaart",
        },
        {
          label: "Maatregelen op maat",
          url: "#maatregelenopmaat",
        },
        {
          label: "Hulpcentrum",
          url: "#hulpcentrum",
        },
      ],
      noMainMenu: false,
      useDropDownMenu: "auto",
      authStatus: "loggedIn",
      loginUrl: "#login",
      logoutUrl: "#logout",
      userProfileName: "J.A. Jansen",
      userProfileUrl: "#profiel",
      userHomeUrl: "#myhome",
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function headerStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HeaderStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HeaderStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithLabel: {
      args: {
        label: "Maatregelen op maat",
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithLabelAndLabelUrl: {
      args: {
        label: "Maatregelen op maat",
        labelUrl: "maatregelen-op-maat",
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithLogoUrlAndLabelAndLabelUrl: {
      args: {
        label: "Maatregelen op maat",
        labelUrl: "maatregelen-op-maat",
        logoUrl: "/",
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithRibbon: {
      args: {
        ribbon: "beta",
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithLabelAndRibbon: {
      args: {
        label: "Maatregelen op maat",
        ribbon: "beta",
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    UserHomeActive: {
      args: {
        mainMenu: [
          {
            label: "Home",
            url: "#home",
          },
          {
            label: "Vergunningscheck",
            url: "#vergunningscheck",
          },
          {
            label: "Aanvragen",
            url: "#aanvragen",
          },
          {
            label: "Regels op de kaart",
            url: "#regelsopdekaart",
          },
          {
            label: "Maatregelen op maat",
            url: "#maatregelenopmaat",
          },
          {
            label: "Hulpcentrum",
            url: "#hulpcentrum",
          },
        ],
        userHomeActive: true,
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithLinkToHelp: {
      args: {
        showHelp: true,
        helpUrl: "#help",
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
    WithButtonToHelp: {
      args: {
        showHelp: true,
      },
      render: templateContainer.render(storyTemplates, (args, { headerTemplate }) =>
        headerTemplate(headerArgsMapper(args)),
      ),
    },
  };
}
