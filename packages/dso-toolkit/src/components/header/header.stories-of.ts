import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { HeaderArgs, headerArgsMapper, headerArgTypes } from "./header.args.js";
import { Header } from "./header.models.js";

export interface HeaderTemplates<TemplateFnReturnType> {
  headerTemplate: (headerProperties: Header) => TemplateFnReturnType;
}

export function storiesOfHeader<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HeaderTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Header", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
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
    });

    const template = templateMapper<HeaderArgs>((args, { headerTemplate }) => headerTemplate(headerArgsMapper(args)));

    stories.add("default", template);

    stories.add("with label", template, {
      args: {
        label: "Maatregelen op maat",
      },
    });

    stories.add("with ribbon", template, {
      args: {
        ribbon: "beta",
      },
    });

    stories.add("with label and ribbon", template, {
      args: {
        label: "Maatregelen op maat",
        ribbon: "beta",
      },
    });

    stories.add("user home active", template, {
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
    });

    stories.add("with link to help", template, {
      args: {
        showHelp: true,
        helpUrl: "#help",
      },
    });

    stories.add("with button to help", template, {
      args: {
        showHelp: true,
      },
    });

    return stories;
  });
}
