import { Breadcrumbs } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function breadcrumbsTemplate({ breadcrumbs }: Breadcrumbs) {
  return html`
    <nav aria-label="U bevindt zich hier:">
      <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        ${breadcrumbs.map((breadcrumb, index) => {
          const last = index === breadcrumbs.length - 1;

          return html`
            <li
              class=${ifDefined(last ? 'active' : undefined)}
              aria-current=${ifDefined(last ? 'page' : undefined)}
              itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem"
            >
              ${last
                ? html`
                  <span itemprop="name">${breadcrumb.label}</span>
                `
                : html`
                  <a itemprop="item" href=${breadcrumb.url}>
                    <span itemprop="name">
                      ${breadcrumb.label}
                    </span>
                  </a>
                `
              }
              <meta itemprop="position" content=${index + 1}>
            </li>
          `;
        })}
      </ol>
    </nav>
  `;
}
