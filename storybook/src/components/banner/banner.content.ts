import { html } from "lit-html";

import { Templates } from "../../templates";

function closeButton({ buttonTemplate }: Templates) {
  return buttonTemplate({
    label: "Sluiten",
    type: "button",
    variant: "tertiary",
    onClick: () => null,
    icon: { icon: "times" },
    iconMode: "only",
  });
}

export function warningRichContent(templates: Templates) {
  const { linkTemplate, richContentTemplate } = templates;

  return html`
    ${richContentTemplate({
      children: html`
        <h2>Onderhoudsmelding:</h2>
        <p>
          Op <strong>zondag 8 december 2019 van 10.00 uur tot 17.00 uur</strong> vindt er onderhoud plaats aan het
          Omgevingsloket. ${linkTemplate({ label: "Meer informatie", url: "#", mode: "download" })}
        </p>
      `,
    })}
    ${closeButton(templates)}
  `;
}

export function warningNonRemovableRichContent({ richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html` <p>Een waarschuwende banner met icon die je niet weg kan klikken.</p> `,
  });
}

export function errorRichContent(templates: Templates) {
  const { linkTemplate, richContentTemplate } = templates;

  return html`${richContentTemplate({
    children: html`
      <h2>Storingsmelding:</h2>
      <p>
        Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een
        ${linkTemplate({
          label: "aanvraag",
          url: "#",
          mode: "download",
        })}
        of melding indienen.
      </p>
    `,
  })}
  ${closeButton(templates)} `;
}

export function infoRichContent(templates: Templates) {
  const { linkTemplate, richContentTemplate } = templates;

  return html`${richContentTemplate({
    children: html`
      <p>
        Een informatieve banner die je weg kan klikken.
        ${linkTemplate({ label: "Meer informatie", url: "#", mode: "download" })}
      </p>
    `,
  })}
  ${closeButton(templates)} `;
}

export function infoCompactNonRemovableRichContent({ richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      <p>Deze minder hoge variant van de banner met links uitgelijnde tekst is wat minder opvallend.</p>
    `,
  });
}

export function richWarningRichContent(templates: Templates) {
  const { richContentTemplate } = templates;

  return html`${richContentTemplate({
    children: html`
      <h2>Onderhoudsmelding:</h2>
      <p>
        Banners zullen vaak worden ingezet voor 'one-liners', maar kunnen ook rijkere content bevatten, zoals meerdere
        paragrafen, en/of een geordende lijst. Zolang de markup maar aan de juiste voorschriften voldoet gaat dit prima:
      </p>
      <ul>
        <li>class <code>.dso-rich-content</code> op de omringende <code>&lt;div&gt;</code></li>
        <li>een <code>&lt;p&gt;</code>-tag om paragrafen</li>
      </ul>
    `,
  })}
  ${closeButton(templates)} `;
}

export function richInfoRichContent({ richContentTemplate, toggletipTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      <p>
        Deze variant van de <strong>banner</strong> is wat minder opvallend.
        ${toggletipTemplate({ position: "right", secondary: true, children: html`<p>Een toggletip bij de banner</p>` })}
      </p>
      <p>Maar kan ook rich content bevatten, bijvoorbeeld een extra paragraaf om meer uit te kunnen leggen</p>
    `,
  });
}

export function successRichContent(templates: Templates) {
  const { richContentTemplate } = templates;

  return html`${richContentTemplate({
    children: html`
      <h2>Gelukt!</h2>
      <p>U bent succesvol ingelogd.</p>
    `,
  })}
  ${closeButton(templates)} `;
}
