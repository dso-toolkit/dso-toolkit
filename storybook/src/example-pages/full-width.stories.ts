import type { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import { examplePageStories } from "../example-page-stories";

import { header } from "./content/header.content";
import { mainMenu } from "./content/main-menu.content";
import { definitionList, listGroup } from "./full-width.content";
import { footerPartial } from "./partials/footer";
import { headerPartial } from "./partials/header";

const meta: Meta = {
  title: "Voorbeeldpagina's/Full Width",
};

export default meta;

const FullWidth = examplePageStories(
  ({ linkTemplate, definitionListTemplate, listTemplate, richContentTemplate, tableTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Maatregelen op maat") })}
      <main>
        <div class="row dso-featured">
          <div class="col-md-6">
            ${richContentTemplate({
              children: html`
                <h2>Welkom</h2>
                <p>Op deze testpagina</p>
                <h3>What is deze pagina?</h3>
                <p>
                  This paragraph is simply dummy text of the printing and typesetting industry. This paragraph has been
                  the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                  leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                  with the release of Letraset sheets containing this paragraph passages, and more recently with desktop
                  publishing software like Aldus PageMaker including versions of this paragraph.
                </p>
              `,
            })}
          </div>
          <div class="col-md-6">${definitionListTemplate(definitionList)}</div>
        </div>

        <div class="row">
          <div class="col-md-6">${richContentTemplate({ children: listTemplate(listGroup) })}</div>
          <div class="col-md-6">
            ${tableTemplate({
              noModal: true,
              headingColumns: true,
              content: {
                caption: "Titel van de tabel voor screenreaders",
                head: [
                  { label: "Nummer" },
                  { label: "Voornaam" },
                  { label: "Achternaam" },
                  { label: "Github gebruikersnaam" },
                  { label: "Modifier" },
                ],
                rows: [
                  ["1", linkTemplate({ label: "Fabien", url: "#" }), "Potentier", "fabpot", html`<code>tr</code>`],
                  ["2", linkTemplate({ label: "Andrew", url: "#" }), "Nesbitt", "andrew", html`<code>tr</code>`],
                  ["3", linkTemplate({ label: "Taylor", url: "#" }), "Otwell", "taylorotwell", html`<code>tr</code>`],
                  ["4", linkTemplate({ label: "Kitty", url: "#" }), "Giraudel", "KittyGiraudel", html`<code>tr</code>`],
                ],
              },
            })}
          </div>
        </div>

        ${richContentTemplate({
          children: html`
            <h2>History (h2)</h2>
            <p>
              See also:
              ${linkTemplate({
                label: "Timeline of The Hague",
                url: "https://en.wikipedia.org/wiki/Timeline_of_The_Hague",
                mode: "extern",
              })}
            </p>
            <h3>Early history (h3)</h3>
            <p>
              The Hague originated around 1230, when Count Floris IV of Holland purchased land alongside a pond, the
              present-day Hofvijver, in order to build a hunting residence. In 1248, his son and successor William II,
              King of the Romans, decided to extend the residence to a palace, which would later be called the Binnenhof
              (Inner Court). He died in 1256 before this palace was completed but parts of it were finished by his son
              Floris V, of which the Ridderzaal (Knights' Hall), still intact, is the most prominent.
            </p>
            <h4>Trivia (h4)</h4>
            ${listTemplate({
              items: [
                {
                  text: 'The village that originated around the Binnenhof was first mentioned as Haga in a charter dating from 1242. In the 15th century, des Graven hage came into use, literally "The Count\'s Wood", with connotations like "The Count\'s Hedge, Private Enclosure or Hunting Grounds".',
                },
                {
                  text: '\'s-Gravenhage was officially used for the city from the 17th century onwards. Today, this name is only used in some official documents like birth and marriage certificates. The city itself uses "Den Haag" in all its communication.',
                },
              ],
            })}
            <h5>More information (h5)</h5>
            <p>
              See
              ${linkTemplate({
                label: "Wikipedia",
                url: "https://en.wikipedia.org/wiki/The_Hague",
                mode: "extern",
              })}
            </p>
            <h3>Modern history (h3)</h3>
            <p>
              Only in 1806, when the {% render '@anchor', {label: 'Kingdom of Holland', url:
              'https://en.wikipedia.org/wiki/Kingdom_of_Holland', modifier: 'extern') %} was a puppet state of the First
              French Empire, was the settlement granted city rights by Louis Bonaparte. After the Napoleonic Wars,
              modern-day Belgium and the Netherlands were combined in the United Kingdom of the Netherlands to form a
              buffer against France. As a compromise, Brussels and Amsterdam alternated as capital every two years, with
              the government remaining in The Hague. After the separation of Belgium in 1830, Amsterdam remained the
              capital of the Netherlands, while the government was situated in The Hague. When the government started to
              play a more prominent role in Dutch society after 1850, The Hague quickly expanded. Many streets were
              specifically built for the large number of civil servants employed in the country's government and for the
              Dutchmen who were retiring from the administration of the Netherlands East Indies.
            </p>
            <h4>World War II (h4)</h4>
            <p>
              The city sustained heavy damage during World War II. Additionally, the Atlantic Wall was built through the
              city, causing a large quarter to be torn down by the Nazi occupants. On 3 March 1945, the Royal Air Force
              mistakenly bombed the Bezuidenhout quarter. The target was an installation of V-2 rockets in the nearby
              Haagse Bos park, but because of navigational errors, the bombs fell on a heavily populated and historic
              part of the city. The bombardment wreaked widespread destruction in the area and caused 511 fatalities.
            </p>
            <h5>More information (h5)</h5>
            <p>
              See
              ${linkTemplate({
                label: "Wikipedia",
                url: "https://en.wikipedia.org/wiki/The_Hague",
                mode: "extern",
              })}
            </p>
          `,
        })}
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);

export { FullWidth };
