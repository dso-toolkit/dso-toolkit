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
      logo: `
        <img alt="Omgevingsloket" src="images/logo/omgevingsloket-beta.svg" />
        `,
      subLogo: `
        <img alt="Regels op de kaart" src="images/logo/regels-op-de-kaart.svg" />
      `,
      showSubLogo: true,
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
      useDropDownMenu: "auto",
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
