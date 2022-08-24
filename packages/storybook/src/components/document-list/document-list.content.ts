import { DocumentListItemStatusDemoContent } from '@dso-toolkit/sources'
import { html } from 'lit-html'

import { badgeTemplate } from '@dso-toolkit/css/src/components/badge/badge.template'

export function documentListStatusDemoContentMapper({ badge, date }: DocumentListItemStatusDemoContent) {
  return html`${badgeTemplate(badge)} ${date}`;
}
