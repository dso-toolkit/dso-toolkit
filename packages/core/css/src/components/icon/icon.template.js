import { html } from 'lit-html';
export function iconTemplate({ icon }) {
  return html `
    <svg class="di di-${icon}">
      <use href="dso-icons.svg#${icon}" />
    </svg>
  `;
}
