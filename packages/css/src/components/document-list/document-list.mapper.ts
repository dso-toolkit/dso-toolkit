import { DocumentListItemStatusDemoContent } from '@dso-toolkit/sources'
import { html } from 'lit-html'

import { badgeTemplate } from '../badge/badge.template'

export function documentListStatusDemoContentMapper({ badge, date }: DocumentListItemStatusDemoContent) {
  return html`${badgeTemplate(badge)} ${date}`;
}
