import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";

const meta: Meta = {
  title: "Patronen/Modal with background content",
};

export default meta;

const ModalWithBackgroundContent = examplePageStories((templates) => {
  const { buttonTemplate, modalTemplate } = templates;

  return html`
    <div class="container">
      <main>
        <h1>Modal with background content</h1>
        <p>
          Het Digitaal Stelsel Omgevingswet (DSO) vormt de digitale ondersteuning van de Omgevingswet en helpt
          overheden, bedrijven en inwoners bij het vinden, beheren en toepassen van informatie over de fysieke
          leefomgeving. Het stelsel brengt gegevens, regelgeving en processen samen die voorheen verspreid waren over
          verschillende systemen en loketten. Hierdoor ontstaat een meer overzichtelijke en toegankelijke manier van
          werken. Gebruikers kunnen via het DSO informatie raadplegen over onderwerpen zoals bouwen, milieu,
          waterbeheer, natuur en ruimtelijke ontwikkeling. Het doel is om procedures eenvoudiger te maken, samenwerking
          tussen organisaties te verbeteren en inwoners beter inzicht te geven in de regels die voor hun omgeving
          gelden.
        </p>

        <p>
          Een belangrijk onderdeel van het DSO is de mogelijkheid om regels op een locatiegerichte manier te raadplegen.
          Door een adres of locatie op de kaart te selecteren, kunnen gebruikers zien welke regels en beperkingen van
          toepassing zijn op een specifieke plek. Dit maakt het eenvoudiger om plannen voor bijvoorbeeld een verbouwing,
          een evenement of een ruimtelijke ontwikkeling voor te bereiden. Naast het tonen van regelgeving ondersteunt
          het stelsel ook het uitvoeren van vergunningchecks en het indienen van aanvragen. Hierdoor kunnen
          initiatiefnemers in een vroeg stadium bepalen welke stappen nodig zijn voordat een activiteit kan worden
          uitgevoerd.
        </p>

        <p>
          Overheidsorganisaties zoals gemeenten, provincies, waterschappen en het Rijk publiceren hun
          omgevingsdocumenten via het DSO volgens landelijke standaarden. Deze documenten worden centraal beschikbaar
          gesteld zodat gebruikers toegang hebben tot actuele en betrouwbare informatie. Doordat alle bestuurslagen
          gebruikmaken van dezelfde digitale infrastructuur, ontstaat meer samenhang tussen verschillende regelingen en
          besluiten. Dit helpt niet alleen professionals die dagelijks met regelgeving werken, maar ook inwoners die
          willen begrijpen welke ontwikkelingen plaatsvinden in hun leefomgeving. De centrale beschikbaarheid van
          informatie draagt daarnaast bij aan transparantie en een betere dienstverlening.
        </p>

        <p>
          Het DSO is ontwikkeld als een uitgebreid digitaal ecosysteem waarin gegevensuitwisseling, toegankelijkheid en
          interoperabiliteit centraal staan. Verschillende softwareleveranciers en overheidsorganisaties kunnen hun
          systemen koppelen aan het stelsel door gebruik te maken van open standaarden en gestandaardiseerde interfaces.
          Hierdoor kunnen gegevens efficiënt worden uitgewisseld en blijft informatie consistent beschikbaar binnen de
          keten. Daarnaast wordt veel aandacht besteed aan gebruiksvriendelijkheid, toegankelijkheid en
          toekomstbestendigheid, zodat het stelsel kan meegroeien met nieuwe wetgeving, technologische ontwikkelingen en
          veranderende behoeften van gebruikers. Op die manier vormt het DSO een belangrijke digitale basis voor de
          uitvoering van de Omgevingswet in Nederland.
        </p>
        ${modalTemplate({
          modalTitle: "Verwijderen werkzaamheid",
          body: html`
            <p>
              U wilt de werkzaamheid <strong>Dakkapel plaatsen, vervangen of veranderen</strong> verwijderen. Uw
              antwoorden op de vragen worden dan ook verwijderd. Wilt u doorgaan?
            </p>
          `,
          footer: html`
            ${buttonTemplate({
              label: "Annuleren",
              type: "button",
              variant: "tertiary",
            })}
            ${buttonTemplate({
              label: "Secundaire actie",
              type: "button",
              variant: "secondary",
            })}
            ${buttonTemplate({
              label: "Bevestigen",
              type: "button",
              variant: "primary",
            })}
          `,
          closable: true,
        })}
      </main>
    </div>
  `;
});

export { ModalWithBackgroundContent };
