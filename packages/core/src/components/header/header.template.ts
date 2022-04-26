import { Header } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

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
  menuItemClick,
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
        @menuItemClick=${menuItemClick}
      >
        <div slot="logo"><img height="40" alt="Omgevingsloket" src="${logo}" /></div>
        <div slot="sub-logo"><img alt="Regels op de kaart" src="${subLogo}" /></div></div>
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
        @menuItemClick=${menuItemClick}
      >
        <div slot="logo"><img alt="Omgevingsloket" src="${logo}" /></div>
      </dso-header>`;
}
