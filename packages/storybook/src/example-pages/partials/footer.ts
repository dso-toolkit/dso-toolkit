import { html } from "lit-html";
import { Templates } from "../../templates";

export function footerPartial({ linkListTemplate }: Templates) {
  return html`
    <footer>
      <div class="row">
        <div class="col-sm-6 col-md-3">
          <h2>Basic link</h2>
          ${linkListTemplate({ links: [{ label: 'Normale link', url: '#' }, { label: 'Test link', url: '#' }] })}
        </div>
        <div class="col-sm-6 col-md-3">
          <h2>Externe links</h2>
          ${linkListTemplate({ links: [{ label: 'Externe link', url: '#', modifier: 'extern' }, { label: 'Extra externe link', url: '#', modifier: 'extern' }, { label: 'Laatste externe link', url: '#', modifier: 'extern' }] })}
        </div>
        <div class="col-sm-6 col-md-3">
          <h2>Tekst paragraaf</h2>
          <p>
            Loop goed na welke inhoud essentieel is voor de footer. Creeër met rows en cols de gewenste indeling van uw footer.
          </p>
        </div>
        <div class="col-sm-6 col-md-3">
          <h2>Combinatie links en tekst</h2>
          <p>
            Tekst kan worden gevolgd door verscheidene <a href="#">links</a>.
          </p>
          ${linkListTemplate({ links: [{ label: 'Combinatie link', url: '#' }, { label: 'Combinatie link 2', url: '#' }] })}
        </div>
      </div>
    </footer>
  `;
}
