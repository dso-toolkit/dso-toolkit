import { ToggletipDecorator } from "dso-toolkit";
import React from "react";

export const decorator: ToggletipDecorator<React.JSX.Element> = (story, args) => {
  const side = (args.position || "right") as string;
  const alignItems: Record<string, string> = {
    left: "center",
    right: "center",
    top: "flex-end",
    bottom: "flex-start",
  };
  const justifyContent: Record<string, string> = {
    left: "flex-end",
    right: "flex-start",
    top: "center",
    bottom: "center",
  };

  const s = story();
  if (!React.isValidElement(s)) {
    throw new Error("Expected a valid JSX element");
  }

  return (
    <>
      <div className="toggletip-decorator">{s}</div>

      <style>
        {`
          .toggletip-decorator {
            display: flex;
            align-items: ${alignItems[side]};
            justify-content: ${justifyContent[side]};
            height: calc(100vh - 40px);
            width: 100%;
          }
      `}
      </style>
    </>
  );
};
