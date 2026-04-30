import { Redirect } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Redirect to={(siteConfig.themeConfig["navbar"] as any)?.["logo"]?.["href"] ?? "/intro"} />;
}
