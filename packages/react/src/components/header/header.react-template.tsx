import { Header } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoHeader } from "../..";

import { ComponentImplementation } from "../../templates";

export const reactHeader: ComponentImplementation<Header> = {
  component: "header",
  implementation: "react",
  template: () =>
    function headerTemplate({
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
    }) {
      return (
        <DsoHeader
          mainMenu={mainMenu}
          useDropDownMenu={useDropDownMenu}
          authStatus={authStatus}
          loginUrl={loginUrl}
          logoutUrl={logoutUrl}
          userProfileUrl={userProfileUrl}
          userProfileName={userProfileName}
          userHomeUrl={userHomeUrl}
          onDsoHeaderClick={dsoHeaderClick}
        >
          <div slot="logo">
            <img alt="Omgevingsloket" src={logo} />
          </div>
          {subLogo && (
            <div slot="sub-logo">
              <img alt="Regels op de kaart" src={subLogo} />
            </div>
          )}
        </DsoHeader>
      );
    },
};
