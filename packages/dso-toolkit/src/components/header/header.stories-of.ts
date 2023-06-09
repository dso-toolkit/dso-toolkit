import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { HeaderArgs, headerArgsMapper, headerArgTypes } from "./header.args.js";
import { logo, subLogo } from "./header.logos.js";
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
        logo,
        subLogo,
        showSubLogo: false,
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
        authStatus: "none",
        loginUrl: "#login",
        logoutUrl: "#logout",
        userProfileName: "J.A. Jansen",
        userProfileUrl: "#profiel",
        userHomeUrl: "#myhome",
      },
    });

    const template = templateMapper<HeaderArgs>((args, { headerTemplate }) => headerTemplate(headerArgsMapper(args)));

    stories.add("default", template);

    stories.add("with sub logo", template, {
      args: {
        showSubLogo: true,
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

    return stories;
  });
}
