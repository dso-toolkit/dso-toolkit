import { ShoppingCart } from '@dso-toolkit/sources';
import { html } from 'lit-html';


export function shoppingCartTemplate({ collapsed, hideSummary, items, shoppingcartTitleTag, shoppingcartTitle }: ShoppingCart) {
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
            <!-- {%- if not hideSummary %} -->
            ${!hideSummary && html`
              <button type="button" class="dso-status">
                ${!collapsed ? html`
                  <dso-icon icon="chevron-up"></dso-icon>
                `
                : html`
                  <dso-icon icon="chevron-down"></dso-icon>
                `}
                <!-- U heeft {{ items | countSubitems }} activiteit{% if ((items | countSubitems) > 1) %}en{% endif %} gekozen -->
              </button>
            `}
            ${!collapsed && html`
              <ul class="dso-items">
                ${items.map(item => html`
                  <li>
                    <!-- {% if (item.subitems | hasWarning) %}<dso-icon icon="status-warning"></dso-icon><span class="sr-only">waarschuwing</span>{% endif %} -->
                    ${item.label}
                    ${!item.readonly && !item.edit && item.additive && html`
                      <span class="dso-additive">${item.additive}</span>
                    `}
                    <!-- {% if not item.readonly %} -->
                    ${item.readonly && html`
                      ${item.edit && html`
                        <div class="dso-edit-additive">
                          <label for="additive-{{ _self.name }}-{{ loop.index0 }}">Bewerk toevoeging</label>
                          <input type="text" class="dso-edit-name" id="additive-{{ _self.name }}-{{ loop.index0 }}" value="{{ item.additive }}" />
                        </div>
                      `}

                      <!-- {% if not item.edit %}
                        {% render '@button', {type: 'button', modifier: 'dso-tertiary dso-edit-cart-item', label: 'Naam bewerken', icon: 'pencil', iconOnly: true} %}
                      {% endif %} -->
                    `}
                    ${item.edit && html`
                      <button type="button" class="dso-delete">
                        <span class="sr-only">Verwijder</span>
                        <dso-icon icon="trash"></dso-icon>
                      </button>
                    `}
                    ${item.subitems.length && html`
                      <ul class="dso-subitems">
                        ${item.subitems.map(subitem => html`
                          <li>
                            ${subitem.warning && html`
                              <dso-icon icon="status-warning"></dso-icon><span class="sr-only">waarschuwing</span>
                            `}
                            ${subitem.label}
                            <button type="button" class="dso-delete">
                              <span class="sr-only">Verwijder</span>
                              <dso-icon icon="trash"></dso-icon>
                            </button>
                          </li>
                        `)}
                      </ul>
                    `}
                  </li>
                `)}
              </ul>
            `}
          `
          : html`
            <p class="dso-empty">U heeft nog geen activiteiten gekozen</p>
          `}
      </div>

      <!-- {% if items.length > 0 and (items | hasWarning) and open %}
        <p class="dso-warning">
          <strong>Let op:</strong> Voor de werkzaamheden met een <dso-icon icon="status-warning"></dso-icon> zijn geen maatregelen opgenomen in dit overzicht met maatregelen. Dit betekent niet dat er geen voorschriften en maatregelen van toepassing zijn.
        </p>
      {% endif %} -->
    </div>
  `;
}
