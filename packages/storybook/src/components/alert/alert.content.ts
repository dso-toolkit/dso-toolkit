import { AlertWithHeadingsContent } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function alertWithHeadingsTemplate({
  h2,
  h3,
  h4,
  h5,
  h6,
  content
}: AlertWithHeadingsContent) {
  return html`
    <h2>${h2}</h2>
    <p>${content}</p>
    <h3>${h3}</h3>
    <p>${content}</p>
    <h4>${h4}</h4>
    <p>${content}</p>
    <h5>${h5}</h5>
    <p>${content}</p>
    <h6>${h6}</h6>
    <p>${content}</p>
  `;
}
