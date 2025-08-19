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
      labelUrl,
      logoUrl,
      ribbon,
      mainMenu,
      compact,
      authStatus,
      loginUrl,
      logoutUrl,
      showHelp,
      helpUrl,
      userProfileUrl,
      userProfileName,
      userHomeUrl,
      userHomeActive,
      dsoHeaderClick,
    }) {
      return html`<dso-header
        .mainMenu=${mainMenu}
        compact=${ifDefined(compact)}
        auth-status=${ifDefined(authStatus)}
        login-url=${ifDefined(loginUrl)}
        logout-url=${ifDefined(logoutUrl)}
        ?show-help=${showHelp}
        help-url=${ifDefined(helpUrl)}
        user-profile-url=${ifDefined(userProfileUrl)}
        user-profile-name=${ifDefined(userProfileName)}
        user-home-url=${ifDefined(userHomeUrl)}
        user-home-active=${ifDefined(userHomeActive)}
        @dsoHeaderClick=${dsoHeaderClick}
      >
        <div slot="logo">${logoTemplate({ label, ribbon, labelUrl, logoUrl })}</div>
      </dso-header>`;
    },
};
