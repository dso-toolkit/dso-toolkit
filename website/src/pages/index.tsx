import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import { Redirect } from "react-router-dom";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Redirect to={(siteConfig.themeConfig["navbar"] as any)?.["logo"]?.["href"] ?? "/intro"} />;
}
