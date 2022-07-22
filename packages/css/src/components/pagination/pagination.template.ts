import { Pagination } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';

export function paginationTemplate({ currentPage, totalPages }: Pagination) {
  return html`
    <ul class="pagination">
      ${currentPage !== 1
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
      ${(currentPage !== totalPages || totalPages >= 4) && (currentPage === totalPages && currentPage !== 1)
        ? html`
          <li>
            <a href="#">${currentPage - 2}</a>
          </li>
        `
        : nothing
      }
      ${currentPage >= 3 && ((currentPage >= 3 && totalPages <= 5) || (totalPages > 5 && currentPage !== totalPages - 2))
        ? html`
          <li>
            <a href="#">${currentPage - 1}</a>
          </li>
        `
        : nothing
      }
      <li class="active">
        <span aria-current="page">${currentPage}</span>
      </li>
      ${currentPage <= (totalPages - 2) && ((currentPage <= 3 && totalPages <= 5) || (currentPage !== 3 && totalPages > 5))
        ? html`
          <li>
            <a href="#">${currentPage + 1}</a>
          </li>
        `
        : nothing
      }
      ${currentPage === 1 && totalPages > (currentPage + 2)
        ? html`
          <li>
            <a href="#">${currentPage + 2}</a>
          </li>
        `
        : nothing
      }
      ${currentPage !== totalPages
        ? html`
          <li>
            <a href="#">${totalPages}</a>
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
  `;
}
