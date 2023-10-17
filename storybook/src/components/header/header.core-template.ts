import { Header } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreHeader: ComponentImplementation<Header> = {
  component: "header",
  implementation: "core",
  template: ({ logoTemplate }) =>
    function headerTemplate({
      label,
      ribbon,
      mainMenu,
      useDropDownMenu,
      authStatus,
      loginUrl,
      logoutUrl,
      userProfileUrl,
      userProfileName,
      userHomeUrl,
      userHomeActive,
      dsoHeaderClick,
    }) {
      return html`<dso-header
        .mainMenu=${mainMenu}
        use-drop-down-menu=${ifDefined(useDropDownMenu)}
        auth-status=${ifDefined(authStatus)}
        login-url=${ifDefined(loginUrl)}
        logout-url=${ifDefined(logoutUrl)}
        user-profile-url=${ifDefined(userProfileUrl)}
        user-profile-name=${ifDefined(userProfileName)}
        user-home-url=${ifDefined(userHomeUrl)}
        user-home-active=${ifDefined(userHomeActive)}
        @dsoHeaderClick=${dsoHeaderClick}
      >
        <div slot="logo">${logoTemplate({ label, ribbon })}</div>
      </dso-header>`;
    },
};
