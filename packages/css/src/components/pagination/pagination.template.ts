import { Pagination } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';

export function paginationTemplate({ current, count, label }: Pagination) {
  return html`
    <nav aria-label=${label}>
      <ul class="pagination">
        ${current !== 1
          ? html`
            <li>
              <a href="#" aria-label="Vorige">
                <span class="dso-previous" aria-hidden="true"></span>
              </a>
            </li>
            <li>
              <a href="#">1</a>
            </li>
          `
          : nothing
        }
        ${(current !== count || count >= 4) && (current === count && current !== 1)
          ? html`
            <li>
              <a href="#">${current - 2}</a>
            </li>
          `
          : nothing
        }
        ${current >= 3 && ((current >= 3 && count <= 5) || (count > 5 && current !== count - 2))
          ? html`
            <li>
              <a href="#">${current - 1}</a>
            </li>
          `
          : nothing
        }
        <li class="active">
          <span aria-current="page">${current}</span>
        </li>
        ${current <= (count - 2) && ((current <= 3 && count <= 5) || (current !== 3 && count > 5))
          ? html`
            <li>
              <a href="#">${current + 1}</a>
            </li>
          `
          : nothing
        }
        ${current === 1 && count > (current + 2)
          ? html`
            <li>
              <a href="#">${current + 2}</a>
            </li>
          `
          : nothing
        }
        ${current !== count
          ? html`
            <li>
              <a href="#">${count}</a>
            </li>
            <li>
              <a href="#" aria-label="Volgende">
                <span class="dso-next" aria-hidden="true"></span>
              </a>
            </li>
          `
          : nothing
        }
      </ul>
    </nav>
  `;
}
