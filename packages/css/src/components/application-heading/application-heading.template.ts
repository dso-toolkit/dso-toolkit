import { ApplicationHeading } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function applicationHeadingTemplate({ title, subtitle, step }: ApplicationHeading) {
  return html`
    <div class="dso-app-heading">
      ${title
        ? html`
          <h1>${title}</h1>
        `
        : nothing
      }
      ${subtitle
        ? html`
          <h2
            class=${ifDefined(step ? 'dso-steps-indicator' : undefined)}
          >
            ${subtitle}
            ${step
              ? html `
                <span class="dso-step">${step}</span>
              `
              : nothing
            }
          </h2>
          `
        : nothing
      }
    </div>
  `;
}
