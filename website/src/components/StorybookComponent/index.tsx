import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { useState } from "react";

type Implementation = "core" | "css" | "react";

const allImplementations = ["core", "css", "react"] as const;

interface Props {
  name: string;
  implementations: [Implementation, Implementation?, Implementation?] | "$all";
}

function getVersion() {
  return "master";
}

function getStoryUrl(name: string, implementation: Implementation): string {
  const subDomain = implementation === "react" ? "react" : "storybook";

  return `https://${window.location.host}/!${subDomain}/${getVersion()}/iframe.html?id=${getStoryId(
    name,
    implementation
  )}&viewMode=story`;
}

function getStoryId(name: string, implementation: Implementation) {
  if (implementation === "react") {
    return name;
  }

  return `${implementation === "css" ? "html-css" : "core"}-${name}--success`;
}

export function StorybookComponent({ name, implementations }: Props) {
  const [implementation, setImplementation] = useState<Implementation>(
    implementations === "$all" ? allImplementations[0] : implementations[0]
  );

  return (
    <div>
      <BrowserOnly>
        {() => <iframe src={getStoryUrl(name, implementation)} style={{ display: "block", width: "100%" }}></iframe>}
      </BrowserOnly>
      <div>
        {allImplementations.map((i) => (
          <button key={i} type="button" onClick={() => setImplementation(i)}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
