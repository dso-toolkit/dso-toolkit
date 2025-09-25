import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult, html, render } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";

import { examplePageStories } from "../example-page-stories";

const meta: Meta = {
  title: "Voorbeeldpagina's/POC dynamische vragenbomen",
};

export default meta;

type Question = {
  inputs: { id: string; label: string; type: string }[];
};

const DynamischeVragenBomen = examplePageStories((templates) => {
  const { buttonTemplate, expandableTemplate, formGroupInputTemplate } = templates;

  const containerRef = createRef<HTMLDivElement>();

  // Startvragen
  let questions: Question[] = [
    {
      inputs: [{ id: "Vraag 1", label: "Vraag 1", type: "text" as const }],
    },
  ];

  function renderQuestions(): TemplateResult {
    return html`
      ${questions.map((q, index) =>
        expandableTemplate({
          open: index === 0,
          enableAnimation: true,
          content: html`
            ${q.inputs.map((i) =>
              formGroupInputTemplate({
                group: "input",
                id: i.id,
                type: "text",
                label: i.label,
                value: "",
              }),
            )}
            ${index > 0 ? buttonTemplate({ variant: "secondary", label: "Vorige vraag" }) : ""}
            ${index < questions.length - 1 ? buttonTemplate({ variant: "primary", label: "Volgende vraag" }) : ""}
          `,
        }),
      )}
    `;
  }

  function updateView() {
    if (!containerRef.value) return;

    const tpl = html`
      ${renderQuestions()}
      <hr />
      ${buttonTemplate({ variant: "tertiary", label: "Vraag toevoegen" })}
    `;

    render(tpl, containerRef.value);

    addEventListeners();
    hookAddButton();
  }

  function addEventListeners() {
    const expandables = Array.from(containerRef.value?.querySelectorAll("dso-expandable") ?? []) as (HTMLElement & {
      open: boolean;
    })[];

    const timeOutMs = 225;

    expandables.forEach((exp, index) => {
      const buttons = exp.querySelectorAll("button");
      buttons.forEach((btn) => {
        if (!(btn instanceof HTMLButtonElement)) return;
        const label = btn.textContent?.trim();

        if (label === "Volgende vraag" && expandables[index + 1]) {
          btn.addEventListener("click", () => {
            exp.open = false;
            setTimeout(() => {
              const next = expandables[index + 1];
              if (next) {
                next.open = true;
              }
            }, timeOutMs);
          });
        }

        if (label === "Vorige vraag" && expandables[index - 1]) {
          btn.addEventListener("click", () => {
            exp.open = false;
            setTimeout(() => {
              const next = expandables[index - 1];
              if (next) {
                next.open = true;
              }
            }, timeOutMs);
          });
        }
      });
    });
  }

  function hookAddButton() {
    const buttons = containerRef.value?.querySelectorAll("button") ?? [];
    buttons.forEach((btn) => {
      if (btn instanceof HTMLButtonElement && btn.textContent?.trim() === "Vraag toevoegen") {
        btn.addEventListener("click", addNewQuestion);
      }
    });
  }

  function addNewQuestion() {
    const nextIndex = questions.length + 1;
    questions = [
      ...questions,
      {
        inputs: [
          {
            id: `vraag-${nextIndex}`,
            label: `Extra vraag ${nextIndex}`,
            type: "text",
          },
        ],
      },
    ];

    updateView();
  }

  // init
  setTimeout(() => updateView());

  return html` <style>
      :root {
        --_dso-expandable-height-animation-time: 500ms;
        --_dso-expandable-opacity-animation-time: 1000ms;
      }
    </style>
    <div class="container" ${ref(containerRef)}></div>`;
});

export { DynamischeVragenBomen };
