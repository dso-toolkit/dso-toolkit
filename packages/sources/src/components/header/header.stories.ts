import { bindTemplate, StorybookParameters } from "../../stories-helpers";
import { headerArgsMapper, HeaderArgTypes } from "./header.args";
import { Header } from "./header.models";

export interface HeaderParameters<TemplateFnReturnType> {
  headerTemplate: (headerProperties: Header) => TemplateFnReturnType;
}

export function storiesOfHeader<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { headerTemplate }: HeaderParameters<TemplateFnReturnType>
) {
  const stories = storiesOf("Header", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: HeaderArgTypes,
  });

  stories.add("Header", bindTemplate(headerArgsMapper, headerTemplate), {
    args: {
      logo: `(O) Omgevingsloket`,
      subLogo: `Regels op de kaart`,
      showSubLogo: true,
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
      ],
      loginUrl: "#login",
      logoutUrl: "#logout",
      isLoggedIn: false,
      showLoggedIn: true,
      userProfileName: "J.A. Jansen",
      userProfileUrl: "#profiel",
      userHomeUrl: "#myhome",
    },
  });
}
