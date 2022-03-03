import { ShoppingCart } from '@dso-toolkit/sources';

import { html, nothing } from 'lit-html';

import { buttonTemplate } from '../button/button.template';
import { iconTemplate } from '../icon/icon.template';

function accumulateItems(items: any) {
  return items.reduce((t: any, item: any) => t.concat(item.subitems), []);
}

function countSubitems(items: any) {
  return accumulateItems(items).length;
}

function hasWarning(items: any) {
  return items && (items.some((a: any) => a.subitems) ? accumulateItems(items) : items)
    .some((a: any) => a.warning);
}

export function shoppingCartTemplate({ collapsed, hideSummary, isOpen, items, shoppingcartTitleTag, shoppingcartTitle }: ShoppingCart) {
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
                <button type="button" class="dso-status">
                  ${!collapsed ? html`
                    ${iconTemplate({ icon: 'chevron-up' })}
                  `
                  : html`
                    ${iconTemplate({ icon: 'chevron-down' })}
                  `}
                  U heeft ${countSubitems(items)} activiteit${((countSubitems(items) > 1) ? html`en` : nothing )} gekozen
                </button>
              `
              : nothing
            }
            ${!collapsed
              ? html`
                <ul class="dso-items">
                  ${items.map(item => html`
                    <li>
                      ${(hasWarning(item.subitems))
                        ? html`
                          ${iconTemplate({ icon: 'status-warning' })}
                          <span class="sr-only">waarschuwing</span>
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
                                <input type="text" class="dso-edit-name" id="additive-${item.id}" value="${item.additive}" />
                              </div>
                            `
                            : nothing
                          }

                          ${!item.edit
                            ? html`
                              ${buttonTemplate({ type: 'button', modifier: 'dso-tertiary dso-edit-cart-item', variant: null, label: 'Naam bewerken', icon: { icon: 'pencil' }, iconMode: 'only' })}
                            `
                            : nothing
                          }
                        `
                        : nothing
                      }
                      ${!item.edit
                        ? html`
                          <button type="button" class="dso-delete" title="Verwijder">
                            ${iconTemplate({ icon: 'trash' })}
                          </button>
                        `
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
                                <button type="button" class="dso-delete" title="Verwijder">
                                  ${iconTemplate({ icon: 'trash' })}
                                </button>
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
