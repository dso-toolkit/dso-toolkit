import { Header } from "dso-toolkit";
import * as React from "react";

import { DsoHeader, DsoLogo } from "../../components";

import { ComponentImplementation } from "../../templates";

export const reactHeader: ComponentImplementation<Header> = {
  component: "header",
  implementation: "react",
  template: () =>
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
          userHomeActive={userHomeActive}
          onDsoHeaderClick={dsoHeaderClick}
        >
          <div slot="logo">
            <DsoLogo label={label} ribbon={ribbon}></DsoLogo>
          </div>
        </DsoHeader>
      );
    },
};
