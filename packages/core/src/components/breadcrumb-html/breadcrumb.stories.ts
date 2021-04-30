import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

const template: ArgsStoryFn<TemplateResult> = ({ crumbs }: any) => html`
  ${crumbs && html`
    <nav aria-label="U bevindt zich hier:">
      <ol class="breadcrumb" itemscope itemtype="//schema.org/BreadcrumbList">
        ${crumbs.map((crumb: any) => html`
          <li class="${ifDefined(crumb.active ? 'active' : undefined)}" aria-current="${ifDefined(crumb.active ? 'page' : undefined)}" itemscope="" itemprop="itemListElement" itemtype="//schema.org/ListItem">
          ${crumb.active
            ? html`
              <span itemprop="name">${crumb.label}</span>
            `
            : html`
              <a
              itemprop="item"
              href="${crumb.url}">
                <span itemprop="name">
                  ${crumb.label}
                </span>
              </a>
            `
          }
            <meta itemprop="position" content="${crumb.position}" />
          </li>
        `)}
      </ol>
    </nav>
  `}
`;

const stories = storiesOf('Breadcrumb (HTML)', module)
  .addParameters({
    argTypes: {
      crumbs: {
        control: {
          disable: true
        }
      }
    }
  });

stories.add(
  'breadcrumb',
  template,
  {
    args: {
      crumbs: [
        {
          label: 'Home',
          url: '#',
          position: 1
        },
        {
          label: 'Zelf aan de slag',
          url: '#',
          position: 2
        },
        {
          label: 'Inhoud',
          position: 2,
          active: true
        }
      ]
    }
  }
);
