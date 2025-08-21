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
      return (
        <DsoHeader
          mainMenu={mainMenu}
          compact={compact}
          authStatus={authStatus}
          loginUrl={loginUrl}
          logoutUrl={logoutUrl}
          showHelp={showHelp}
          helpUrl={helpUrl}
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
