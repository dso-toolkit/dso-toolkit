import { Header } from "../../../sources";
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
            (dsoHeaderClick)="dsoHeaderClick()"
          >
            <div slot="logo"><img alt="Omgevingsloket" [src]="logo | sanitizeUrl" /></div>
          	<div *ngIf="subLogo" slot="sub-logo"><img alt="Regels op de kaart" [src]="subLogo | sanitizeUrl" /></div>
          </dso-header>
        `,
      };
    },
};
