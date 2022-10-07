import { Header } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreHeader: ComponentImplementation<Header> = {
  component: 'header',
  implementation: 'core',
  template: () => function headerTemplate({
    logo,
    subLogo,
    mainMenu,
    useDropDownMenu,
    authStatus,
    loginUrl,
    logoutUrl,
    userProfileUrl,
    userProfileName,
    userHomeUrl,
    dsoHeaderClick,
  }: Header) {
    return html`<dso-header
      .mainMenu=${mainMenu}
      use-drop-down-menu=${ifDefined(useDropDownMenu)}
      auth-status=${ifDefined(authStatus)}
      login-url=${ifDefined(loginUrl)}
      logout-url=${ifDefined(logoutUrl)}
      user-profile-url=${ifDefined(userProfileUrl)}
      user-profile-name=${ifDefined(userProfileName)}
      user-home-url=${ifDefined(userHomeUrl)}
      @dsoHeaderClick=${dsoHeaderClick}
    >
      <div slot="logo"><img alt="Omgevingsloket" src="${logo}" /></div>
      ${subLogo ? html`<div slot="sub-logo"><img alt="Regels op de kaart" src="${subLogo}" /></div>` : undefined}
    </dso-header>`;
  }
}
