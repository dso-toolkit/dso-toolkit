import { IconOverviewDecorator } from "dso-toolkit";
import React from "react";

export const decorator: IconOverviewDecorator<React.JSX.Element> = (story, icons) => {
  return (
    <>
      <ul id="icon-overview-list">
        {icons.map((icon) => {
          const s = story({ args: { icon } });
          if (!React.isValidElement(s)) {
            throw new Error("Expected a valid JSX element");
          }

          return (
            <li>
              {s}
              <br />
              <code>{icon}</code>
            </li>
          );
        })}
      </ul>

      <style>
        {`
          ul {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            list-style: none;
            padding: 0;
            margin: 16px 48px;
            gap: 4px;
          }
    
          li {
            text-align: center;
            padding: 16px;
            background-color: #efefef;
          }
    
          dso-icon {
            margin-block-end: 16px;
          }
      `}
      </style>
    </>
  );
};
