import { Header } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularHeader: ComponentImplementation<Header> = {
  component: "header",
  implementation: "angular",
  template: () =>
    function headerTemplate(props) {
      return {
        props,
        template: `
            <dso-header
            [mainMenu]="mainMenu"
            [useDropDownMenu]="useDropDownMenu"
            [authStatus]="authStatus"
            [loginUrl]="loginUrl"
            [logoutUrl]="logoutUrl"
            [userProfileName]="userProfileName"
            [userHomeUrl]="userHomeUrl"
            [userHomeActive]="userHomeActive"
            (dsoHeaderClick)="dsoHeaderClick()"
            >
            <div slot="logo">
              <dso-logo [label]="label" [ribbon]="ribbon"></dso-logo>
            </div>
          </dso-header>
        `,
      };
    },
};
