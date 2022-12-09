import * as React from "react";

import { Context } from "dso-toolkit";

function contextLabelTemplate(label: JSX.Element, content: JSX.Element, children: JSX.Element) {
  return (
    <>
      <div className="dso-context-wrapper">
        <span className="dso-context-label">{label}</span>
        <div className="dso-context-container">{content}</div>
      </div>
      {children}
    </>
  );
}

function contextFieldsetTemplate(label: JSX.Element, content: JSX.Element, children: JSX.Element) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="dso-context-wrapper">
        <span className="dso-context-label" aria-hidden="true">
          {label}
        </span>
        <div className="dso-context-container">{content}</div>
      </div>
      {children}
    </fieldset>
  );
}

export function contextTemplate({ label, type, content, children }: Context<JSX.Element>) {
  switch (type) {
    case "label":
      return contextLabelTemplate(label, content, children);
    case "legend":
      return contextFieldsetTemplate(label, content, children);
    default:
      throw new TypeError("type can only be label or legend");
  }
}
