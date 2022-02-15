import { Header } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export function headerTemplate({
  logo,
  subLogo,
  mainMenu,
  useDropDownMenu,
  showSubLogo,
  loginUrl,
  logoutUrl,
  isLoggedIn,
  showLoggedIn,
  userProfileUrl,
  userProfileName,
  userHomeUrl,
}: Header) {
  const bindLoginUrl = showLoggedIn && loginUrl ? loginUrl : undefined;
  const bindLogoutUrl = showLoggedIn && logoutUrl ? logoutUrl : undefined;
  return showSubLogo
    ? html`<dso-header
        .mainMenu=${mainMenu}
        use-drop-down-menu=${ifDefined(useDropDownMenu)}
        is-logged-in=${ifDefined(isLoggedIn)}
        login-url=${ifDefined(bindLoginUrl)}
        logout-url=${ifDefined(bindLogoutUrl)}
        user-profile-url=${ifDefined(userProfileUrl)}
        user-profile-name=${ifDefined(userProfileName)}
        user-home-url=${ifDefined(userHomeUrl)}
      >
        <div slot="logo"><img height="40px" alt="Omgevingsloket" src="images/logo/omgevingsloket-beta.svg" /></div>
        <div slot="sub-logo">${unsafeHTML(subLogo)}</div>
      </dso-header>`
    : html`<dso-header
        .mainMenu=${mainMenu}
        use-drop-down-menu=${ifDefined(useDropDownMenu)}
        is-logged-in=${ifDefined(isLoggedIn)}
        login-url=${ifDefined(bindLoginUrl)}
        logout-url=${ifDefined(bindLogoutUrl)}
        user-profile-url=${ifDefined(userProfileUrl)}
        user-profile-name=${ifDefined(userProfileName)}
        user-home-url=${ifDefined(userHomeUrl)}
      >
        <div slot="logo">${unsafeHTML(logo)}</div>
      </dso-header>`;
}
