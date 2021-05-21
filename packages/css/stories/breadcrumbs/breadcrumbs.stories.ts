import { storiesOfBreadcrumbs, BreadcrumbsArgs, BreadcrumbsTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: BreadcrumbsTemplateFn<TemplateResult> = ({ breadcrumbs }: BreadcrumbsArgs) => html`
  <nav aria-label="U bevindt zich hier:">
    <ol class="breadcrumb" itemscope itemtype="//schema.org/BreadcrumbList">
      ${breadcrumbs.map((breadcrumb, index) => {
        const last = index === breadcrumbs.length - 1;

        return html`
          <li
            class=${ifDefined(last ? 'active' : undefined)}
            aria-current=${ifDefined(last ? 'page' : undefined)}
            itemscope=""
            itemprop="itemListElement"
            itemtype="//schema.org/ListItem"
          >
            ${last
              ? html`
                <span itemprop="name">${breadcrumb.label}</span>
              `
              : html`
                <a
                  itemprop="item"
                  href=${breadcrumb.url}
                >
                  <span itemprop="name">
                    ${breadcrumb.label}
                  </span>
                </a>
              `
            }
            <meta itemprop="position" content=${breadcrumb.position}>
          </li>
        `;
      })}
    </ol>
  </nav>
`;

storiesOfBreadcrumbs<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
