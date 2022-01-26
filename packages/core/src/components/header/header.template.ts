import { Header } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export function headerTemplate({
  logo,
  subLogo,
  mainMenu,
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
  return html` <dso-header
    .mainMenu=${mainMenu}
    is-logged-in=${ifDefined(isLoggedIn)}
    login-url=${ifDefined(bindLoginUrl)}
    logout-url=${ifDefined(bindLogoutUrl)}
    user-profile-url=${ifDefined(userProfileUrl)}
    user-profile-name=${ifDefined(userProfileName)}
    user-home-url=${ifDefined(userHomeUrl)}
  >
    <div slot="logo">${unsafeHTML(logo)}</div>
    <div slot="sub-logo">${showSubLogo ? unsafeHTML(subLogo) : undefined}</div>
  </dso-header>`;
}
