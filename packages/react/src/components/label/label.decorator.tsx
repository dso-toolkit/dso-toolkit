import { LabelDecorator } from "dso-toolkit";
import * as React from "react";

export const decorator: LabelDecorator<JSX.Element> = (story, css) => (
  <>
    {story() as React.ReactNode}

    <style>{css}</style>
  </>
);
