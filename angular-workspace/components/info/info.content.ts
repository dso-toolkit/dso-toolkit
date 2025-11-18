import { AngularTemplateResult } from "../angular-story-types";

export function richContent(): AngularTemplateResult {
  return {
    template: `
      <div class="dso-rich-content">
        <h2>Heading 2</h2>
        <p>
            De <a href="#">Bouwregelgeving</a> is een database met alle <strong>bouwregelgeving</strong> in Nederland,
            die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan{" "}
            <a href="#" class="download">
              de eisen van de Omgevingswet (3B's)
            </a>
            , en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
          </p>

        <div class="dso-button-row">
          <a href="#" class="dso-primary"><span>Primaire button</span></a>
          <a href="#" class="dso-secondary"><span>Secundaire button</span></a>
          <a href="#" class="dso-tertiary">
            <span>Tertiaire button</span>
            <dso-icon icon="chevron-down"></dso-icon>
          </a>
        </div>
      </div>
    `,
  };
}
