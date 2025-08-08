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
            [showHelp]="showHelp"
            [helpUrl]="helpUrl"
            [userProfileName]="userProfileName"
            [userHomeUrl]="userHomeUrl"
            [userHomeActive]="userHomeActive"
            (dsoHeaderClick)="dsoHeaderClick($event)"
          >
            <div slot="logo">
              <dso-logo [label]="label" [ribbon]="ribbon" [logoUrl]="logoUrl" [labelUrl]="labelUrl"></dso-logo>
            </div>
          </dso-header>
        `,
      };
    },
};
