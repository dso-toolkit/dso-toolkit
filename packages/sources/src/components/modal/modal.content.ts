import { v4 as uuid } from "uuid";
import { ModalArgs, ModalLoadingArgs } from "./modal.args";

export const content: { [key in ModalArgs["variant"]]: ModalArgs | ModalLoadingArgs } = {
  active: {
    variant: "active",
    role: "dialog",
    id: uuid(),
    heading: "Verwijderen werkzaamheid",
    body: "<p>U wilt de werkzaamheid <strong>Dakkapel plaatsen, vervangen of veranderen</strong> verwijderen. Uw antwoorden op de vragen worden dan ook verwijderd. Wilt u doorgaan?</p>",
    buttons: [
      {
        variant: "tertiary",
        type: "button",
        label: "Annuleren",
      },
      {
        variant: "secondary",
        type: "button",
        label: "Secundaire actie",
      },
      {
        variant: "primary",
        type: "button",
        label: "Verwijderen",
      },
    ],
  },
  passive: {
    variant: "passive",
    id: uuid(),
    role: "dialog",
    heading: "Bestandsformaten",
    body: `
      <p>Gebruik de volgende bestandsformaten voor een document:</p>
      <ul>
        <li>Foto's en gescande documenten: PNG, TIFF</li>
        <li>Digitale documenten: ODT1.2, PDF/A-1, PDF/A-2</li>
        <li>Tekeningen: PDF/A-2, 5VG</li>
        <li>Spreadsheet: [SV, 0E1512, PDF/A</li>
      </ul>
      <p>Als u documenten in een ander formaat opstuurt, moet u het document mogelijk nog een keer sturen, maar dan in het juiste bestandsformaat. Dit geldt voor:</p>
      <ul>
        <li>Digitale documenten: DOC, DOCX PDF1.7</li>
        <li>Foto's en gescande documenten: WEG</li>
        <li>Geografische bestanden (2D en 3D): GML33.1 ESRI SHAPE (inclusief aanvullende metabestanden)</li>
        <li>Tekeningen: DXF, PDF 17</li>
        <li>Bint-bestanden (2D en 30): IFC en IFCXML</li>
        <li>Spreadsheet: XLS, XLSX</li>
        <li>Data: XML en RDF</li>
        <li>Lozingsrisico's SDF</li>
        <li>CAD bestanden: DWG, DGN en DXF</li>
      </ul>
    `,
    buttons: [
      {
        variant: "tertiary",
        type: "button",
        label: "Sluiten",
      },
    ],
  },
  confirm: {
    variant: "confirm",
    id: uuid(),
    role: "dialog",
    heading: "Disclaimer",
    body: `
      <p>Welkom op het nieuwe Omgevingsloket. Deze website is nog in ontwikkeling. Dat betekent dat bepaalde onderdelen nog niet beschikbaar zijn. En dat u geen rechten kunt ontlenen aan de teksten in de vergunningcheck en regels op de kaart. Ook kunt u nog geen aanvraag of melding indienen via dit loket.</p>
      <p>De website <a href="#">Aan de stag met de omgevingswet</a> biedt extra uitleg over het Omgevingsloket en de ontwikkeling ervan. Ook vindt u informatie over hoe u kunt oefenen met aansluiten van uw lokale systemen op het loket.</p>
    `,
    buttons: [
      {
        variant: "secondary",
        type: "button",
        label: "Secundaire actie",
      },
      {
        variant: "primary",
        type: "button",
        label: "Akkoord",
      },
    ],
  },
  loading: {
    variant: "loading",
    role: "alert",
    progressIndicatorLabel: "Resultaten laden. Een moment geduld.",
  },
};
