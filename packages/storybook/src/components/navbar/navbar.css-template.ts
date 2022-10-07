import { Navbar, NavbarItem } from '@dso-toolkit/sources';

import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const cssNavbar: ComponentImplementation<Navbar> = {
  component: 'navbar',
  implementation: 'css',
  template: ({ iconTemplate }) => function navbarTemplate({ items, modifier, open }: Navbar) {
    return html`
      <nav class="dso-navbar ${classMap({'dso-open': !!open})}">
        ${modifier === 'main'
          ? html`
            <div class="dso-navbar-header">
              <button type="button" class="dso-navbar-toggle dso-secondary" aria-expanded="${ifDefined(open ? 'true' : 'false')}">
                ${iconTemplate({ icon: 'bars' })}
                <span class="sr-only">Menu</span>
              </button>
            </div>
          `
          : nothing
        }
        <ul class="dso-nav dso-nav-${modifier}">
          ${items.map((item: NavbarItem) => html`
            <li class="${ifDefined(item.active ? 'dso-active' : undefined)}">
              <a href="${item.href}" aria-current="${ifDefined(item.active ? 'page' : undefined)}">
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}
