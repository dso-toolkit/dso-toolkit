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
            <div slot="logo"><img alt="Omgevingsloket" [src]="logo | trustUrl" /></div>
            <img
              *ngIf="subLogo"
              slot="sub-logo"
              alt="Regels op de kaart"
              [src]="subLogo | trustUrl"
            />
          </dso-header>
        `,
      };
    },
};
