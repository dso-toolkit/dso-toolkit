import { LabelParameters } from "@dso-toolkit/sources";
import * as React from "react";

export const decorator: LabelParameters<JSX.Element>["decorator"] = (story, css) => (
  <>
    {story()}

    <style>{css}</style>
  </>
);
