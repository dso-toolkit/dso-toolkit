import { ShoppingCart, ShoppingCartItem, ShoppingCartSubitem } from '@dso-toolkit/sources';

import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

function accumulateItems(items: ShoppingCartItem[]) {
  return items.reduce<ShoppingCartItem[]>((t, item) => t.concat(item), []);
}

function countItems(items: ShoppingCartItem[]) {
  return accumulateItems(items).length;
}

function hasWarning(items: ShoppingCartItem[] | ShoppingCartSubitem[]) {
  for (const item of items) {
    if ('subitems' in item) {
      if (item.subitems?.some(subitem => subitem.warning)) {
        return true;
      }
    } else if ('warning' in item) {
      if (item.warning) {
        return true;
      }
    }
  }

  return false;
}

export const cssShoppingCart: ComponentImplementation<ShoppingCart> = {
  component: 'shoppingCart',
  implementation: 'css',
  template: ({ buttonTemplate, iconTemplate }) => function shoppingCartTemplate({ collapsable, collapsed, hideSummary, removeAll, isOpen, items, shoppingcartTitleTag, shoppingcartTitle }) {
    return html`
      ${ shoppingcartTitleTag == 'h2'
        ? html`
          <h2>${shoppingcartTitle}</h2>
        `
        : html`
          <h3>${shoppingcartTitle}</h3>
        `
      }

      <div class="dso-shopping-cart">
        <div class="dso-contents">
          ${items.length > 0
            ? html`
              ${!hideSummary
                ? html`
                  ${collapsable
                    ? html `
                    <button
                      type="button"
                      class="dso-status"
                      aria-expanded="${ifDefined(collapsed ? 'false' : 'true')}">
                      ${!collapsed ? html`
                        ${iconTemplate({ icon: 'chevron-up' })}
                      `
                      : html`
                        ${iconTemplate({ icon: 'chevron-down' })}
                      `}
                      U heeft ${countItems(items)} activiteit${((countItems(items) > 1) ? html`en` : nothing )} gekozen
                    </button>`
                  : html `
                    <span class="dso-status">U heeft ${countItems(items)} activiteit${((countItems(items) > 1) ? html`en` : nothing )} gekozen</span>
                  `}
                  ${removeAll
                    ? buttonTemplate({ type: 'button', modifier: 'dso-delete', variant: null, label: 'Verwijder alle activiteiten', icon: { icon: 'trash' }, iconMode: 'only' })
                    : nothing
              }
                `
                : nothing
              }
              ${!collapsed
                ? html`
                  <ul class="dso-items">
                    ${items.map(item => html`
                      <li>
                        ${item.subitems
                          ? html`
                            ${(hasWarning(item.subitems))
                              ? html`
                                ${iconTemplate({ icon: 'status-warning' })}
                                <span class="sr-only">waarschuwing</span>
                              `
                              : nothing
                            }
                          `
                          : nothing
                        }
                        ${item.label}
                        ${!item.readonly && !item.edit && item.additive
                          ? html`
                            <span class="dso-additive">${item.additive}</span>
                          `
                          : nothing
                        }
                        ${!item.readonly
                          ? html`
                            ${item.edit
                              ? html`
                                <div class="dso-edit-additive">
                                  <label for="additive-${item.id}">Bewerk toevoeging</label>
                                  <input type="text" class="dso-edit-name" id="additive-${item.id}" value=${item.additive} />
                                </div>
                              `
                              : nothing
                            }

                            ${!item.edit
                              ? buttonTemplate({ type: 'button', modifier: 'dso-edit-cart-item', variant: 'tertiary', label: 'Naam veranderen van ' + item.label, icon: { icon: 'pencil' }, iconMode: 'only' })
                              : nothing
                            }
                          `
                          : nothing
                        }
                        ${!item.edit
                          ? buttonTemplate({ type: 'button', modifier: 'dso-delete', variant: null, label: 'Verwijder ' + item.label, icon: { icon: 'trash' }, iconMode: 'only' })
                          : nothing
                        }
                        ${item.subitems
                          ? html`
                            <ul class="dso-subitems">
                              ${item.subitems.map(subitem => html`
                                <li>
                                  ${subitem.warning && html`
                                    ${iconTemplate({ icon: 'status-warning' })}
                                    <span class="sr-only">waarschuwing</span>
                                  `}
                                  ${subitem.label}
                                  ${buttonTemplate({ type: 'button', modifier: 'dso-delete', variant: null, label: 'Verwijder ' + subitem.label, icon: { icon: 'trash' }, iconMode: 'only' })}
                                </li>
                              `)}
                            </ul>
                          `
                          : nothing
                        }
                      </li>
                    `)}
                  </ul>
              `
              : nothing
              }
            `
            : html`
              <p class="dso-empty">U heeft nog geen activiteiten gekozen</p>
            `}
        </div>

        ${items && (hasWarning(items)) && isOpen
          ? html`
            <p class="dso-warning">
              <strong>Let op:</strong> Voor de werkzaamheden met een ${iconTemplate({ icon: 'status-warning' })} zijn geen maatregelen opgenomen in dit overzicht met maatregelen. Dit betekent niet dat er geen voorschriften en maatregelen van toepassing zijn.
            </p>
          `
          : nothing
        }
      </div>
    `;
  }

}
