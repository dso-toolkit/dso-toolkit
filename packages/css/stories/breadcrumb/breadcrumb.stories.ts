import { storiesOfBreadcrumb, BreadcrumbArgs, BreadcrumbTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: BreadcrumbTemplateFn<TemplateResult> = ({ breadcrumbs }: BreadcrumbArgs) => html`
  <nav aria-label="U bevindt zich hier:">
    <ol class="breadcrumb" itemscope itemtype="//schema.org/BreadcrumbList">
      ${breadcrumbs.map((breadcrumb, index) => {
        const active = index === breadcrumbs.length - 1;

        return html`
          <li
            class="${ifDefined(active ? 'active' : undefined)}"
            aria-current="${ifDefined(active ? 'page' : undefined)}"
            itemscope=""
            itemprop="itemListElement"
            itemtype="//schema.org/ListItem"
          >
            ${index === breadcrumbs.length - 1
              ? html`
                <span itemprop="name">${breadcrumb.label}</span>
              `
              : html`
                <a
                  itemprop="item"
                  href="${breadcrumb.url}"
                >
                  <span itemprop="name">
                    ${breadcrumb.label}
                  </span>
                </a>
              `
            }
            <meta itemprop="position" content="${breadcrumb.position}">
          </li>
        `;
      })}
    </ol>
  </nav>
`;

storiesOfBreadcrumb<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
