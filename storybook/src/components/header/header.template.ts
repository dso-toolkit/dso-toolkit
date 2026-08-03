import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Header } from "./header.models.js";

function logoTemplate({
  name,
  label,
  ribbon,
  labelUrl,
  logoUrl,
  dsoLogoClick,
  dsoLabelClick,
}: {
  name?: string;
  label?: string;
  ribbon?: string;
  labelUrl?: string;
  logoUrl?: string;
  dsoLogoClick?: (event: Event) => void;
  dsoLabelClick?: (event: Event) => void;
}) {
  return html`<dso-logo
    .name=${ifDefined(name)}
    .label=${ifDefined(label)}
    .labelUrl=${ifDefined(labelUrl)}
    .logoUrl=${ifDefined(logoUrl)}
    ribbon=${ifDefined(ribbon)}
    @dsoLogoClick=${ifDefined(dsoLogoClick)}
    @dsoLabelClick=${ifDefined(dsoLabelClick)}
  ></dso-logo>`;
}

export function headerTemplate({
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
}: Header) {
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
}
