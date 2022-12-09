import { html } from "lit-html";
import { Templates } from "../../templates";

export function warningRichContent({ anchorTemplate }: Templates) {
  return html`
    <div class="dso-rich-content">
      <h2>Onderhoudsmelding:</h2>
      <p>
        Op <strong>zondag 8 december 2019 van 10.00 uur tot 17.00 uur</strong> vindt er onderhoud plaats aan het
        Omgevingsloket. ${anchorTemplate({ label: "Meer informatie", url: "#" })}
      </p>
    </div>
  `;
}

export const dangerRichContent = html`
  <div class="dso-rich-content">
    <h2>Storingsmelding:</h2>
    <p>Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.</p>
  </div>
`;

export const richWarningRichContent = html`
  <div class="dso-rich-content">
    <h2>Onderhoudsmelding:</h2>
    <p>
      Banners zullen vaak worden ingezet voor 'one-liners', maar kunnen ook rijkere content bevatten, zoals meerdere
      paragrafen, en/of een geordende lijst. Zolang de markup maar aan de juiste voorschriften voldoet gaat dit prima:
    </p>
    <ul>
      <li>class <code>.dso-rich-content</code> op de omringende <code>&lt;div&gt;</code></li>
      <li>een <code>&lt;p&gt;</code>-tag om paragrafen</li>
    </ul>
  </div>
`;

export function dangerWithHeadingsRichContent({ anchorTemplate }: Templates) {
  return html`
    <div class="dso-rich-content">
      <h2>Storingsmelding:</h2>
      <p>Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.</p>
      <h2>Dit is een H2</h2>
      <p>
        Dit is een informatiemelding. Deze wordt gebruikt voor
        ${anchorTemplate({ label: "aanvullende", url: "#", modifier: "extern" })} informatie of tips.
      </p>
      <h3>Dit is een H3</h3>
      <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
      <h4>Dit is een H4</h4>
      <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
      <h5>Dit is een H5</h5>
      <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
      <h6>Dit is een H6</h6>
      <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    </div>
  `;
}
