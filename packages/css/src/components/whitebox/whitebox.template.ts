import { Whitebox } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

import { iconTemplate } from '../icon/icon.template';
import { imageTemplate } from '../image/image.template';

export function whiteboxTemplate({ count, icon, iconLabel, image, label, description, title }: Whitebox) {
  return html`
    <div class="dso-whitebox ${classMap({ 'dso-has-counter': !!(count || (icon && iconLabel)) })}">
      ${icon && iconLabel
        ? html`
          <div class="dso-step-counter">
            ${iconTemplate(icon)}
            <span class="sr-only">${iconLabel}</span>
          </div>
        `
        : nothing
      }${count
        ? html`
          <div class="dso-step-counter">
            ${count}
          </div>
        `
        : nothing
      }
      <div class="dso-whitebox-title">
        <h2>${title}</h2>
      </div>
      <div class="dso-whitebox-link">
        <a href="#" class="dso-tertiary">
          ${iconTemplate({ icon: 'angle-right' })}
          ${label}
        </a>
      </div>
      <div class="dso-whitebox-icon">
        ${imageTemplate(image)}
      </div>
      <div class="dso-rich-content">
        <p>${description}</p>
      </div>
  `;
}
