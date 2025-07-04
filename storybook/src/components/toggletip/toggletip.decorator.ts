import { ToggletipDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: ToggletipDecorator<TemplateResult> = (story, args) => {
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

  return html`
    <div class="toggletip-decorator">${story()}</div>

    <style>
      .toggletip-decorator {
        display: flex;
        align-items: ${alignItems[side]};
        justify-content: ${justifyContent[side]};
        height: calc(100vh - 40px);
        width: 100%;
        margin-block-end: 200vh;
      }
    </style>
  `;
};
