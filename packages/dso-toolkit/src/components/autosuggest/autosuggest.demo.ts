import { AutosuggestMarkItem, AutosuggestSuggestion, AutosuggestSuggestionGroup } from "./autosuggest.models.js";
import escapeStringRegexp from "escape-string-regexp";

const suggestionGroups: AutosuggestSuggestionGroup[] = [
  {
    groupLabel: "Eerste groep",
    suggestions: [
      { value: "Item 1 van de eerste groep" },
      { value: "Item 2 van de eerste groep" },
      { value: "Item 3 van de eerste groep" },
    ],
  },
  {
    groupLabel: "Tweede groep",
    suggestions: [
      { value: "Item 1 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 2 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 3 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 4 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 5 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 6 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 7 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 8 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 9 met een wat langere naam van de tweede groep", type: "Typering" },
    ],
  },
  {
    groupLabel: "Derde groep",
    suggestions: [
      {
        value: "Eenzaam item (met extra's)",
        type: "Typering",
        extras: ["Eerste extra", "Tweede extra", "Derde extra"],
      },
    ],
  },
  {
    groupLabel: "Vierde groep",
    suggestions: [{ value: "Slechts één item" }],
  },

  {
    groupLabel: "Thema's",
    suggestions: [
      {
        value: "bodem",
        item: {
          naam: "bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "bodem",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041278",
              annotatieId: "bodem",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "bodem",
            },
            {
              documentId: "/akn/nl/act/mnre1045/2024/PEH",
              annotatieId: "bodem",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "bodem",
            },
          ],
        },
      },
      {
        value: "milieu algemeen",
        item: {
          naam: "milieu algemeen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041297",
              annotatieId: "milieu algemeen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "milieu algemeen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041278",
              annotatieId: "milieu algemeen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "milieu algemeen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "milieu algemeen",
            },
          ],
        },
      },
      {
        value: "water en watersystemen",
        item: {
          naam: "water en watersystemen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1130/2024/Ontwerp_IRM",
              annotatieId: "water en watersystemen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "water en watersystemen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041278",
              annotatieId: "water en watersystemen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "water en watersystemen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "water en watersystemen",
            },
          ],
        },
      },
    ],
  },
  {
    groupLabel: "Gebiedsaanwijzingen",
    suggestions: [
      {
        value: "grondwaterlichaam_werkingsgebied",
        item: {
          naam: "grondwaterlichaam_werkingsgebied",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.gebiedsaanwijzing.013000000000000000000026",
            },
          ],
        },
      },
    ],
  },
  {
    groupLabel: "Activiteiten",
    suggestions: [
      {
        value: "Aanbrengen van lagen op metalen",
        item: {
          naam: "Aanbrengen van lagen op metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AanbrengenLagenMetalen",
            },
          ],
        },
      },
      {
        value:
          "Aanmaken en door vaste leidingen transporteren van gewasbeschermingsmiddelen, biociden of bladmeststoffen",
        item: {
          naam: "Aanmaken en door vaste leidingen transporteren van gewasbeschermingsmiddelen, biociden of bladmeststoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AanmakenTransportGewasbLeidingen",
            },
          ],
        },
      },
      {
        value: "Aanmaken van gewasbeschermingsmiddelen of meststoffen op landbouwgronden",
        item: {
          naam: "Aanmaken van gewasbeschermingsmiddelen of meststoffen op landbouwgronden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AanmakenGewasbeschermingLandbouw",
            },
          ],
        },
      },
      {
        value: "Aansluitactiviteit Gemeentes",
        item: {
          naam: "Aansluitactiviteit Gemeentes",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/OOWATRXX1",
              annotatieId: "nl.imow-mnre1034.activiteit.ATActTestAanslg",
            },
          ],
        },
      },
      {
        value: "Aanvraagvereisten binnenplanse omgevingsvergunning omgevingsplanactiviteit bouwwerken",
        item: {
          naam: "Aanvraagvereisten binnenplanse omgevingsvergunning omgevingsplanactiviteit bouwwerken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.AanvraagOpBouwwerken",
            },
          ],
        },
      },
      {
        value: "Activiteit die betrekking heeft op een gemeentelijk monument",
        item: {
          naam: "Activiteit die betrekking heeft op een gemeentelijk monument",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.ActBetrGemMonument",
            },
          ],
        },
      },
      {
        value: "Activiteit gereguleerd bij AMvB",
        item: {
          naam: "Activiteit gereguleerd bij AMvB",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.ActiviteitInAmvb",
            },
          ],
        },
      },
      {
        value: "Activiteit gereguleerd in de omgevingsverordening",
        item: {
          naam: "Activiteit gereguleerd in de omgevingsverordening",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.ActiviteitInOmgevingsver",
            },
          ],
        },
      },
      {
        value: "Activiteit gereguleerd in de omgevingsverordening provincie Drenthe",
        item: {
          naam: "Activiteit gereguleerd in de omgevingsverordening provincie Drenthe",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.992200000000000000000001",
            },
          ],
        },
      },
      {
        value: "Activiteit gereguleerd in het omgevingsplan",
        item: {
          naam: "Activiteit gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.ActInOmgevingsplan",
            },
          ],
        },
      },
      {
        value: "Activiteit gereguleerd in het omgevingsplan gemeente Meppel",
        item: {
          naam: "Activiteit gereguleerd in het omgevingsplan gemeente Meppel",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.ActInOmgevingsplanGem",
            },
          ],
        },
      },
      {
        value: "Activiteit gereguleerd in omgevingsplanregels",
        item: {
          naam: "Activiteit gereguleerd in omgevingsplanregels",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.ActInOpRegelsRijkswege",
            },
          ],
        },
      },
      {
        value: "Activiteit met gevolgen voor de fysieke leefomgeving",
        item: {
          naam: "Activiteit met gevolgen voor de fysieke leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.ActiviteitGevolgenFysiekeLeefomg",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.ActiviteitGevolgenFysiekeLeefomg",
            },
          ],
        },
      },
      {
        value: "Activiteit met mogelijke gevolgen voor Natura 2000-gebieden of bijzondere nationale natuurgebieden",
        item: {
          naam: "Activiteit met mogelijke gevolgen voor Natura 2000-gebieden of bijzondere nationale natuurgebieden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.ActGevolgNatuur",
            },
          ],
        },
      },
      {
        value: "Activiteit op een locatie met historische bodemverontreiniging zonder onaanvaardbaar risico",
        item: {
          naam: "Activiteit op een locatie met historische bodemverontreiniging zonder onaanvaardbaar risico",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.ActOpLocatieHistBodemVeront",
            },
          ],
        },
      },
      {
        value: "Afvalverbrandingsinstallatie en afvalmeeverbrandingsinstallatie",
        item: {
          naam: "Afvalverbrandingsinstallatie en afvalmeeverbrandingsinstallatie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Afvalverbrandingsinstal",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.Afvalverbrandingsinstal",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater of andere afvalstoffen, waarvan de lozing in een schoonwaterriool niet is vrijgesteld in het omgevingsplan, lozen in een schoonwaterriool",
        item: {
          naam: "Afvalwater of andere afvalstoffen, waarvan de lozing in een schoonwaterriool niet is vrijgesteld in het omgevingsplan, lozen in een schoonwaterriool",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenSchoonwRiool",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van afvalbeheer in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van afvalbeheer in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamAfvalbeheer",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamAfvalbeheer",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van basischemie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van basischemie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamBasischemie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamBasischemie",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van basismetaal, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van basismetaal, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamBasismetaal",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamBasismetaal",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van bedrijf voor behandeling van maximaal 25.000 m3 mest, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van bedrijf voor behandeling van maximaal 25.000 m3 mest, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterBedrijfMestbehandel",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterBedrijfMestbehandel",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van bedrijf voor telen en kweken van waterplanten of waterdieren, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van bedrijf voor telen en kweken van waterplanten of waterdieren, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterBedrijfTeeltWaterpl",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterBedrijfTeeltWaterpl",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van betoncentrale, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van betoncentrale, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenBijMakenBetonMortel",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van chemische producten industrie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van chemische producten industrie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterChemischeProductInd",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterChemischeProductInd",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van complexe minerale industrie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van complexe minerale industrie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterComplexeMineraleInd",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterComplexeMineraleInd",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van complexe papierindustrie, houtindustrie en textielindustrie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van complexe papierindustrie, houtindustrie en textielindustrie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterComplexePapierind",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterComplexePapierind",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van destructie of verwerken van kadavers of dierlijk afval in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van destructie of verwerken van kadavers of dierlijk afval in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterKadavDierlijkAfval",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterKadavDierlijkAfval",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van drinkwaterbedrijf, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van drinkwaterbedrijf, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterDrinkwaterbedrijf",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterDrinkwaterbedrijf",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een calamiteitenoefening, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van een calamiteitenoefening, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenCalamiteitOef",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van een gemeentelijke voorziening voor inzameling en transport van afvalwater, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van een gemeentelijke voorziening voor inzameling en transport van afvalwater, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenGemVoorzInzamelAfvalw",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van een grondbank of een grondreinigingsbedrijf, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een grondbank of een grondreinigingsbedrijf, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenGrondbankGrondreiniging",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenGrondbankGrondreiniging",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een milieubelastende activiteit, lozen op een zuiveringtechnisch werk",
        item: {
          naam: "Afvalwater, afkomstig van een milieubelastende activiteit, lozen op een zuiveringtechnisch werk",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOpZuiveringtechnischWerk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOpZuiveringtechnischWerk",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een militaire zeehaven, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een militaire zeehaven, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterMilitaireZeehaven",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterMilitaireZeehaven",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een open bodemenergiesysteem, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een open bodemenergiesysteem, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOpenBodemenergiesys",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOpenBodemenergiesys",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van een opslagbedrijf, transportbedrijf, groothandel en containeroverslag, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een opslagbedrijf, transportbedrijf, groothandel en containeroverslag, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOpslagTransportbedr",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOpslagTransportbedr",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een raffinaderij, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een raffinaderij, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamRaffinaderij",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamRaffinaderij",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een scheepswerf, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een scheepswerf, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterScheepswerven",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterScheepswerven",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een Seveso-inrichting, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een Seveso-inrichting, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterExploiterenSeveso",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterExploiterenSeveso",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een stortplaats of winningsvoorziening, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een stortplaats of winningsvoorziening, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterStortplWinningsvoor",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterStortplWinningsvoor",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van een voorziening voor het oefenen van brandbestrijdingstechnieken, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een voorziening voor het oefenen van brandbestrijdingstechnieken, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOefenenBrandbestr",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOefenenBrandbestr",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van een zuiveringsvoorziening voor ingezameld of afgegeven afvalwater, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een zuiveringsvoorziening voor ingezameld of afgegeven afvalwater, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterZelfstAfvalwatrzuiv",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterZelfstAfvalwatrzuiv",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van een zuiveringtechnisch werk, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van een zuiveringtechnisch werk, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenAfkZuiveringtechnW",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het grootschalig opwekken van energie (50 MW of meer), lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het grootschalig opwekken van energie (50 MW of meer), lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterGrootschEnergieopw",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterGrootschEnergieopw",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het grootschalig verwerken van mest (meer dan 25.000 m3 per jaar), lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het grootschalig verwerken van mest (meer dan 25.000 m3 per jaar), lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlGrootschMestverwer",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlGrootschMestverwer",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van het maken van betonmortel, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van het maken van betonmortel, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenMakenBetonmortel",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van het maken van cokes, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het maken van cokes, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamMakenCokes",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterlichaamMakenCokes",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het opslaan en overslaan van goederen, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van het opslaan en overslaan van goederen, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenOpslaanGoederen",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het opslaan of mechanisch ontwateren van grond of baggerspecie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het opslaan of mechanisch ontwateren van grond of baggerspecie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOpslaanZevenGrondBagger",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOpslaanZevenGrondBagger",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het opslaan van gebruikt substraatmateriaal, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het opslaan van gebruikt substraatmateriaal, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenAfvalwOpslGebrSubstr",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het opslaan van kuilvoer of vaste bijvoedermiddelen, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het opslaan van kuilvoer of vaste bijvoedermiddelen, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenAfvalwOpslagKuilvoer",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het opslaan van vloeistoffen in opslagtanks of in tankcontainers of verpakkingen gebruikt als opslagtank, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het opslaan van vloeistoffen in opslagtanks of in tankcontainers of verpakkingen gebruikt als opslagtank, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOpslagtankVloeistof",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOpslagtankVloeistof",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het reinigen van opslagtanks, verpakkingen, voertuigen of containers voor gevaarlijke stoffen, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het reinigen van opslagtanks, verpakkingen, voertuigen of containers voor gevaarlijke stoffen, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterTankautoreiniging",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterTankautoreiniging",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het reinigen van verpakkingen voor gewassen die biologisch zijn geteeld, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het reinigen van verpakkingen voor gewassen die biologisch zijn geteeld, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenAfvalwReinigenVerpakBiol",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het schoonmaken van drinkwaterleidingen, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van het schoonmaken van drinkwaterleidingen, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenSchoonmDrinkwleid",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van het telen van gewassen in een gebouw, lozen in het riool of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van het telen van gewassen in een gebouw, lozen in het riool of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenNietOppwTelenGewassenGebouw",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van het telen van gewassen in een gebouw, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het telen van gewassen in een gebouw, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterTelenGewassenGebouw",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het telen, kweken, spoelen of sorteren van gewassen, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van het telen, kweken, spoelen of sorteren van gewassen, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenTelenGewassen",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het verbranden van afvalstoffen in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het verbranden van afvalstoffen in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVerbrandAfvalstIPPC",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVerbrandAfvalstIPPC",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het verbranden van afvalstoffen, anders dan in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het verbranden van afvalstoffen, anders dan in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVerbAfvalstNietIPPC",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVerbAfvalstNietIPPC",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van het vergassen of vloeibaar maken van steenkool of andere brandstoffen, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het vergassen of vloeibaar maken van steenkool of andere brandstoffen, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVergassenSteenkool",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVergassenSteenkool",
            },
          ],
        },
      },
      {
        value: "Afvalwater, afkomstig van het vormgeven van betonproducten, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van het vormgeven van betonproducten, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenBijVormgevenBetonP",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van metaalproductenindustrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van metaalproductenindustrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterMetaalprodIndIPPC",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterMetaalprodIndIPPC",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van minerale producten industrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van minerale producten industrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterMineraleProdInd",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterMineraleProdInd",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van onderhoudswerkzaamheden aan bouwwerken, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvalwater, afkomstig van onderhoudswerkzaamheden aan bouwwerken, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenReinigenBouww",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van oppervlaktebehandeling met oplosmiddelen in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van oppervlaktebehandeling met oplosmiddelen in een ippc-installatie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOppvlaktebehOplosm",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterOppvlaktebehOplosm",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van papierindustrie, houtindustrie, textielindustrie en leerindustrie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van papierindustrie, houtindustrie, textielindustrie en leerindustrie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterPapierindustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterPapierindustrie",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van rubberindustrie en kunststofindustrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van rubberindustrie en kunststofindustrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterRubberKunststofIPPC",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterRubberKunststofIPPC",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, afkomstig van voedingsmiddelenindustrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Afvalwater, afkomstig van voedingsmiddelenindustrie (ippc-installatie), lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVoedingsmidIndIPPC",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVoedingsmidIndIPPC",
            },
          ],
        },
      },
      {
        value:
          "Afvalwater, waarvan het lozen op of in de bodem niet is vrijgesteld in het omgevingsplan, lozen op of in de bodem",
        item: {
          naam: "Afvalwater, waarvan het lozen op of in de bodem niet is vrijgesteld in het omgevingsplan, lozen op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenOpInBodem",
            },
          ],
        },
      },
      {
        value:
          "Afvloeiend hemelwater, niet afkomstig van een bodembeschermende voorziening, lozen in het riool of op of in de bodem",
        item: {
          naam: "Afvloeiend hemelwater, niet afkomstig van een bodembeschermende voorziening, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LozenHemelwater",
            },
          ],
        },
      },
      {
        value: "Afwijken van regels in het omgevingsplan",
        item: {
          naam: "Afwijken van regels in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.BouwwerkGebruiken",
            },
          ],
        },
      },
      {
        value: "Alarminstallatie hebben",
        item: {
          naam: "Alarminstallatie hebben",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.AlarminstallatieHebben",
            },
          ],
        },
      },
      {
        value: "Andere bedrijfstak dan hier genoemd",
        item: {
          naam: "Andere bedrijfstak dan hier genoemd",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AndereBedrijfstak",
            },
          ],
        },
      },
      {
        value: "Andere industrie bedoeld in § 3.4.12 van Besluit activiteiten leefomgeving",
        item: {
          naam: "Andere industrie bedoeld in § 3.4.12 van Besluit activiteiten leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AndereIndustrie",
            },
          ],
        },
      },
      {
        value:
          "Andere lozingen, bedoeld in § 6.2.7 van Besluit activiteiten leefomgeving, op een oppervlaktewaterlichaam in beheer bij het Rijk, niet zijnde de Noordzee",
        item: {
          naam: "Andere lozingen, bedoeld in § 6.2.7 van Besluit activiteiten leefomgeving, op een oppervlaktewaterlichaam in beheer bij het Rijk, niet zijnde de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AndereLozingenNietNoordzee",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.AndereLozingenNietNoordzee",
            },
          ],
        },
      },
      {
        value: "Andere lozingen, bedoeld in § 7.2.7 van Besluit activiteiten leefomgeving, in de Noordzee",
        item: {
          naam: "Andere lozingen, bedoeld in § 7.2.7 van Besluit activiteiten leefomgeving, in de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.AndereLozingenNoordzee",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.AndereLozingenNoordzee",
            },
          ],
        },
      },
      {
        value: "Archeologische rijksmonumentenactiviteit",
        item: {
          naam: "Archeologische rijksmonumentenactiviteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.RijksmonArchMonument",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.RijksmonArchMonument",
            },
          ],
        },
      },
      {
        value: "Assimilatiebelichting",
        item: {
          naam: "Assimilatiebelichting",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Assimilatiebelichting",
            },
          ],
        },
      },
      {
        value: "Autodemontagebedrijf en tweewielerdemontagebedrijf",
        item: {
          naam: "Autodemontagebedrijf en tweewielerdemontagebedrijf",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Autodemontagebedrijf",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Autodemontagebedrijf",
            },
          ],
        },
      },
      {
        value: "Autosport en motorsport, zoals crossterrein, racebaan of kartbaan",
        item: {
          naam: "Autosport en motorsport, zoals crossterrein, racebaan of kartbaan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Autosport",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Autosport",
            },
          ],
        },
      },
      {
        value: "Basischemie",
        item: {
          naam: "Basischemie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Basischemie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Basischemie",
            },
          ],
        },
      },
      {
        value: "Basismetaal",
        item: {
          naam: "Basismetaal",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Basismetaal",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Basismetaal",
            },
          ],
        },
      },
      {
        value: "Bedrijf voor behandeling van mest (maximaal 25.000 m3 per jaar)",
        item: {
          naam: "Bedrijf voor behandeling van mest (maximaal 25.000 m3 per jaar)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BedrijfMestbehandeling",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BedrijfMestbehandeling",
            },
          ],
        },
      },
      {
        value: "Behandelen van geoogste gewassen met gewasbeschermingsmiddelen",
        item: {
          naam: "Behandelen van geoogste gewassen met gewasbeschermingsmiddelen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BehandelenGeoogsteGewassem",
            },
          ],
        },
      },
      {
        value: "Behandelen, regelen en meten van aardgas",
        item: {
          naam: "Behandelen, regelen en meten van aardgas",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GasdrukRegelMeetStation",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.GasdrukRegelMeetStation",
            },
          ],
        },
      },
      {
        value: "Benzineterminal exploiteren",
        item: {
          naam: "Benzineterminal exploiteren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ExploiterenBenzineterminal",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een hoofdspoorweg of bijzondere spoorweg",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een hoofdspoorweg of bijzondere spoorweg",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BepActHoofdBijzSpoor",
            },
          ],
        },
      },
      {
        value:
          "Beperkingengebiedactiviteit met betrekking tot een hoofdspoorweg, lokale spoorweg of bijzondere spoorweg",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een hoofdspoorweg, lokale spoorweg of bijzondere spoorweg",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.BepGebActSpoorweg",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BepGebActSpoorweg",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BepGebActSpoorweg",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een installatie in een waterstaatswerk",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een installatie in een waterstaatswerk",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.BeperkgebInstalInWaterstaatswerk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.BeperkgebInstalInWaterstaatswerk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BeperkgebInstalInWaterstaatswerk",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een lokale spoorweg",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een lokale spoorweg",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BepLokaalSpoor",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BepLokaalSpoor",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een luchthaven",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een luchthaven",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.BepGebActLuchthaven",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BepGebActLuchthaven",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een waterstaatswerk in beheer bij het Rijk",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een waterstaatswerk in beheer bij het Rijk",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.BepgebiedactWaterstaatswerkRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.BepgebiedactWaterstaatswerkRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BepgebiedactWaterstaatswerkRijk",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een waterstaatswerk in de Noordzee",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een waterstaatswerk in de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BepgebiedactWaterstaatswerkNZ",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een waterstaatswerk Rijk niet zijnde Noordzee",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een waterstaatswerk Rijk niet zijnde Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BepgebactWaterstaatswRijkNietNZ",
            },
          ],
        },
      },
      {
        value: "Beperkingengebiedactiviteit met betrekking tot een weg in beheer bij het Rijk",
        item: {
          naam: "Beperkingengebiedactiviteit met betrekking tot een weg in beheer bij het Rijk",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BeperkingengebiedactWegRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.BeperkingengebiedactWegRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BeperkingengebiedactWegRijk",
            },
          ],
        },
      },
      {
        value: "beperkingengebiedactiviteiten met betrekking tot provinciale infrastructuur",
        item: {
          naam: "beperkingengebiedactiviteiten met betrekking tot provinciale infrastructuur",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000045",
            },
          ],
        },
      },
      {
        value: "bodem ontwateren",
        item: {
          naam: "bodem ontwateren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000061",
            },
          ],
        },
      },
      {
        value: "Bodemenergiesysteem",
        item: {
          naam: "Bodemenergiesysteem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Bodemenergiesysteem",
            },
          ],
        },
      },
      {
        value: "Bodemonderzoek",
        item: {
          naam: "Bodemonderzoek",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000032",
            },
          ],
        },
      },
      {
        value: "Boom kappen of houtopstand vellen",
        item: {
          naam: "Boom kappen of houtopstand vellen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.HoutopstandVellen",
            },
          ],
        },
      },
      {
        value: "Bouwactiviteit (omgevingsplan)",
        item: {
          naam: "Bouwactiviteit (omgevingsplan)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.BouwwerkBouwen",
            },
          ],
        },
      },
      {
        value: "Bouwactiviteit (omgevingsplan) gereguleerd in het Besluit bouwwerken leefomgeving",
        item: {
          naam: "Bouwactiviteit (omgevingsplan) gereguleerd in het Besluit bouwwerken leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041297",
              annotatieId: "nl.imow-mnre1034.activiteit.BouwactiviteitOmgevingsplanBbl",
            },
          ],
        },
      },
      {
        value:
          "Bouwkeet, bouwbord, steiger, heistelling, hijskraan, damwand, bouwweg, terreinverharding, terreininrichting of andere hulpconstructie bouwen, in stand houden of gebruiken",
        item: {
          naam: "Bouwkeet, bouwbord, steiger, heistelling, hijskraan, damwand, bouwweg, terreinverharding, terreininrichting of andere hulpconstructie bouwen, in stand houden of gebruiken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.BouwkeetBouwen",
            },
          ],
        },
      },
      {
        value: "Bouwwerk slopen in een gemeentelijk beschermd of rijksbeschermd stads- of dorpsgezicht",
        item: {
          naam: "Bouwwerk slopen in een gemeentelijk beschermd of rijksbeschermd stads- of dorpsgezicht",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.SlopenBeschStadsgezicht",
            },
          ],
        },
      },
      {
        value: "Bronbemaling",
        item: {
          naam: "Bronbemaling",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000033",
            },
          ],
        },
      },
      {
        value: "Buisleiding met gevaarlijke stoffen",
        item: {
          naam: "Buisleiding met gevaarlijke stoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BuisleidingGevaarlijkeStoffen",
            },
          ],
        },
      },
      {
        value: "Buisleiding voor warmtenet of koudenet",
        item: {
          naam: "Buisleiding voor warmtenet of koudenet",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.BuisleidingWarmteKoudenet",
            },
          ],
        },
      },
      {
        value: "Buiten stortplaatsen op of in de bodem brengen van bedrijfsafvalstoffen of gevaarlijke afvalstoffen",
        item: {
          naam: "Buiten stortplaatsen op of in de bodem brengen van bedrijfsafvalstoffen of gevaarlijke afvalstoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpInBodemBedrGevAfvalNietStortpl",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpInBodemBedrGevAfvalNietStortpl",
            },
          ],
        },
      },
      {
        value: "Buitenplanse omgevingsplanactiviteit",
        item: {
          naam: "Buitenplanse omgevingsplanactiviteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.BuitenplansOmgevPlAct",
            },
          ],
        },
      },
      {
        value: "Chemisch reinigen van textiel",
        item: {
          naam: "Chemisch reinigen van textiel",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ChemReinigenTextiel",
            },
          ],
        },
      },
      {
        value: "Chemische producten industrie",
        item: {
          naam: "Chemische producten industrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ChemischeProductenIndustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.ChemischeProductenIndustrie",
            },
          ],
        },
      },
      {
        value: "Chemische wasserij",
        item: {
          naam: "Chemische wasserij",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ChemischeWasserij",
            },
          ],
        },
      },
      {
        value: "Complexe minerale industrie",
        item: {
          naam: "Complexe minerale industrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ComplexeMineraleIndustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.ComplexeMineraleIndustrie",
            },
          ],
        },
      },
      {
        value: "Complexe papierindustrie, houtindustrie en textielindustrie",
        item: {
          naam: "Complexe papierindustrie, houtindustrie en textielindustrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ComplexePapierHoutTextielIndust",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.ComplexePapierHoutTextielIndust",
            },
          ],
        },
      },
      {
        value: "Composteren en opslaan van groenafval",
        item: {
          naam: "Composteren en opslaan van groenafval",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ComposterenOpslaanGroenafval",
            },
          ],
        },
      },
      {
        value: "Crematorium",
        item: {
          naam: "Crematorium",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Crematorium",
            },
          ],
        },
      },
      {
        value:
          "Dakraam, daklicht, lichtstraat of soortgelijke daglichtvoorziening bouwen, in stand houden of gebruiken",
        item: {
          naam: "Dakraam, daklicht, lichtstraat of soortgelijke daglichtvoorziening bouwen, in stand houden of gebruiken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.DakraamAndereLichtvoorz",
            },
          ],
        },
      },
      {
        value: "Datacentrum",
        item: {
          naam: "Datacentrum",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Datacentrum",
            },
          ],
        },
      },
      {
        value: "dempen",
        item: {
          naam: "dempen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000005",
            },
          ],
        },
      },
      {
        value: "Dierlijke mest opslaan",
        item: {
          naam: "Dierlijke mest opslaan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.DierlijkeMestOpslaan",
            },
          ],
        },
      },
      {
        value: "Elektriciteit opwekken met een windturbine die slagschaduw of lichtschittering veroorzaakt",
        item: {
          naam: "Elektriciteit opwekken met een windturbine die slagschaduw of lichtschittering veroorzaakt",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.ElektrWindturbine",
            },
          ],
        },
      },
      {
        value:
          "Energiebesparing bij milieubelastende activiteiten die niet zijn aangewezen in het Besluit activiteiten leefomgeving",
        item: {
          naam: "Energiebesparing bij milieubelastende activiteiten die niet zijn aangewezen in het Besluit activiteiten leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.Energiebesparing",
            },
          ],
        },
      },
      {
        value: "Energiegebruik bij bedrijfstakken die niet zijn aangewezen in het Besluit activiteiten leefomgeving",
        item: {
          naam: "Energiegebruik bij bedrijfstakken die niet zijn aangewezen in het Besluit activiteiten leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.EnergiegebruikAndereBedrijfstak",
            },
          ],
        },
      },
      {
        value: "Etsen en beitsen van metalen",
        item: {
          naam: "Etsen en beitsen van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.EtsenBeitsenMetalen",
            },
          ],
        },
      },
      {
        value: "Exploiteren van een openbaar zwembad",
        item: {
          naam: "Exploiteren van een openbaar zwembad",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Zwembad",
            },
          ],
        },
      },
      {
        value: "Flora- en fauna-activiteit gereguleerd bij AMvB",
        item: {
          naam: "Flora- en fauna-activiteit gereguleerd bij AMvB",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.FloraFaunaRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.FloraFaunaRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.FloraFaunaRijk",
            },
          ],
        },
      },
      {
        value: "Fotografisch materiaal ontwikkelen of afdrukken",
        item: {
          naam: "Fotografisch materiaal ontwikkelen of afdrukken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.FotoMateriaalOntw",
            },
          ],
        },
      },
      {
        value: "Gebruik van gewasbeschermingsmiddelen of meststoffen in de openlucht",
        item: {
          naam: "Gebruik van gewasbeschermingsmiddelen of meststoffen in de openlucht",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GebruikenGewasbeschMestLandbouw",
            },
          ],
        },
      },
      {
        value: "Gebruik van ontplofbare stoffen of voorwerpen op militaire objecten",
        item: {
          naam: "Gebruik van ontplofbare stoffen of voorwerpen op militaire objecten",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GebruikOntplofbareStofMilitair",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.GebruikOntplofbareStofMilitair",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.GelegenheidZwemmen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GelegenheidZwemmen",
            },
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000003",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemBadBadwaterbassin",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin voor eenmalig gebruik",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin voor eenmalig gebruik",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemBassinEenmalig",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin waarin het water wordt gedesinfecteerd",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin waarin het water wordt gedesinfecteerd",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemBassinDesinfect",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een zwemvijver",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een zwemvijver",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemZwemvijver",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in overige badwaterbassin",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in overige badwaterbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemOverigBassin",
            },
          ],
        },
      },
      {
        value:
          "Geluid veroorzaakt door civiele buitenschietbanen, militaire buitenschietbanen en militaire springterreinen",
        item: {
          naam: "Geluid veroorzaakt door civiele buitenschietbanen, militaire buitenschietbanen en militaire springterreinen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.GeluidProdSchietbaan",
            },
          ],
        },
      },
      {
        value: "Genetisch gemodificeerde organismen ingeperkt gebruiken gereguleerd in het omgevingsplan",
        item: {
          naam: "Genetisch gemodificeerde organismen ingeperkt gebruiken gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.GenetischGemOrganGebr",
            },
          ],
        },
      },
      {
        value: "Gesloten bodemenergiesysteem",
        item: {
          naam: "Gesloten bodemenergiesysteem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GeslotenBodemenergiesysteem",
            },
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000044",
            },
          ],
        },
      },
      {
        value: "Gesloten bodemenergiesysteem installeren gereguleerd in het omgevingsplan",
        item: {
          naam: "Gesloten bodemenergiesysteem installeren gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.GeslotenBodemenergInst",
            },
          ],
        },
      },
      {
        value:
          "Gewasbeschermingsmiddelen of biociden als bedoeld in de Wet gewasbeschermingsmiddelen en biociden te hebben, te gebruiken, te vervoeren of op/in de bodem te brengen",
        item: {
          naam: "Gewasbeschermingsmiddelen of biociden als bedoeld in de Wet gewasbeschermingsmiddelen en biociden te hebben, te gebruiken, te vervoeren of op/in de bodem te brengen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000069",
            },
          ],
        },
      },
      {
        value: "Graafwerkzaamheden",
        item: {
          naam: "Graafwerkzaamheden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000035",
            },
          ],
        },
      },
      {
        value: "Graven in bodem met een kwaliteit boven de interventiewaarde bodemkwaliteit",
        item: {
          naam: "Graven in bodem met een kwaliteit boven de interventiewaarde bodemkwaliteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GravenBovenInterW",
            },
          ],
        },
      },
      {
        value: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
        item: {
          naam: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GravenOnderInterW",
            },
          ],
        },
      },
      {
        value:
          "grond- of funderingswerken, sonderingen uit te voeren dan wel een bodemenergiesysteem in de bodem te drukken of te hebben",
        item: {
          naam: "grond- of funderingswerken, sonderingen uit te voeren dan wel een bodemenergiesysteem in de bodem te drukken of te hebben",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000073",
            },
          ],
        },
      },
      {
        value: "grondwater uit permanente bron onttrekken",
        item: {
          naam: "grondwater uit permanente bron onttrekken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000059",
            },
          ],
        },
      },
      {
        value: "Grondwater, afkomstig van een sanering of ontwatering, lozen in het riool of op of in de bodem",
        item: {
          naam: "Grondwater, afkomstig van een sanering of ontwatering, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.GrondwLozenSanering",
            },
          ],
        },
      },
      {
        value: "Grootschalig opwekken van energie (50 MW of meer)",
        item: {
          naam: "Grootschalig opwekken van energie (50 MW of meer)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GrootschaligeEnergieopwekking",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.GrootschaligeEnergieopwekking",
            },
          ],
        },
      },
      {
        value:
          "Grootschalig tanken van vaartuigen of drijvende werktuigen met vloeibare brandstoffen (meer dan 25 m3 per jaar)",
        item: {
          naam: "Grootschalig tanken van vaartuigen of drijvende werktuigen met vloeibare brandstoffen (meer dan 25 m3 per jaar)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GrootschaligTankenVaartuigen",
            },
          ],
        },
      },
      {
        value:
          "Grootschalig tanken van voertuigen, vliegtuigen of werktuigen met vloeibare brandstoffen (meer dan 25 m3 per jaar)",
        item: {
          naam: "Grootschalig tanken van voertuigen, vliegtuigen of werktuigen met vloeibare brandstoffen (meer dan 25 m3 per jaar)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GrootschaligTanken",
            },
          ],
        },
      },
      {
        value: "Grootschalig verwerken van mest (meer dan 25.000 m3 per jaar)",
        item: {
          naam: "Grootschalig verwerken van mest (meer dan 25.000 m3 per jaar)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GrootschaligeMestverwerking",
            },
          ],
        },
      },
      {
        value: "Grote stookinstallatie (50 MW of meer)",
        item: {
          naam: "Grote stookinstallatie (50 MW of meer)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GroteStookinstallatie",
            },
          ],
        },
      },
      {
        value: "Handelsreclame maken of voeren",
        item: {
          naam: "Handelsreclame maken of voeren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.MakenHandelsreclame",
            },
          ],
        },
      },
      {
        value: "Hemelwater of condenswater, afkomstig van kassen, lozen in het riool of op of in de bodem",
        item: {
          naam: "Hemelwater of condenswater, afkomstig van kassen, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OverigAfvalwaterKassen",
            },
          ],
        },
      },
      {
        value: "Hemelwater of condenswater, afkomstig van kassen, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Hemelwater of condenswater, afkomstig van kassen, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenHemelCondensKas",
            },
          ],
        },
      },
      {
        value: "Het op of in de bodem brengen van meststoffen",
        item: {
          naam: "Het op of in de bodem brengen van meststoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpInBodemMest",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpInBodemMest",
            },
          ],
        },
      },
      {
        value: "Het op of in de bodem brengen van zuiveringsslib",
        item: {
          naam: "Het op of in de bodem brengen van zuiveringsslib",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpInBodemZuiveringsslib",
            },
          ],
        },
      },
      {
        value: "Houden van een zwemlocatie",
        item: {
          naam: "Houden van een zwemlocatie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000047",
            },
          ],
        },
      },
      {
        value: "Huishoudelijk afvalwater lozen in het riool of op of in de bodem",
        item: {
          naam: "Huishoudelijk afvalwater lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.HuishAfvalwLozen",
            },
          ],
        },
      },
      {
        value: "Huishoudelijk afvalwater lozen op een oppervlaktewaterlichaam, niet zijnde de Noordzee",
        item: {
          naam: "Huishoudelijk afvalwater lozen op een oppervlaktewaterlichaam, niet zijnde de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenHuishoudelijkAfvalwNietNZ",
            },
          ],
        },
      },
      {
        value:
          "Huishoudelijk afvalwater, afkomstig van een pleziervaartuig, lozen op een oppervlaktewaterlichaam dat deel uitmaakt van de binnenwateren",
        item: {
          naam: "Huishoudelijk afvalwater, afkomstig van een pleziervaartuig, lozen op een oppervlaktewaterlichaam dat deel uitmaakt van de binnenwateren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenHuishAfvalwPleziervaar",
            },
          ],
        },
      },
      {
        value:
          "In een oppervlaktewaterlichaam opslaan of samenvoegen van zonder bewerking herbruikbare grond of baggerspecie",
        item: {
          naam: "In een oppervlaktewaterlichaam opslaan of samenvoegen van zonder bewerking herbruikbare grond of baggerspecie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagHerbrGrondBagInOppwater",
            },
          ],
        },
      },
      {
        value: "Informeren gemeente, rijksoverheid of provincie over overdracht vergunning",
        item: {
          naam: "Informeren gemeente, rijksoverheid of provincie over overdracht vergunning",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.InformerenOverdrachtNietWaterAct",
            },
          ],
        },
      },
      {
        value: "Informeren waterschap of Rijkswaterstaat over overdracht vergunning",
        item: {
          naam: "Informeren waterschap of Rijkswaterstaat over overdracht vergunning",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.InformerenOverdrachtWaterAct",
            },
          ],
        },
      },
      {
        value: "Ingeperkt gebruik van genetisch gemodificeerde organismen",
        item: {
          naam: "Ingeperkt gebruik van genetisch gemodificeerde organismen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.IngeperktGebruikGenetGemodOrg",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.IngeperktGebruikGenetGemodOrg",
            },
          ],
        },
      },
      {
        value: "kappen van een boom",
        item: {
          naam: "kappen van een boom",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000001",
            },
          ],
        },
      },
      {
        value: "Kappen van houtopstanden (buiten de bebouwde kom)",
        item: {
          naam: "Kappen van houtopstanden (buiten de bebouwde kom)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.VellenBeherenHoutopstanden",
            },
          ],
        },
      },
      {
        value: "Kleine en middelgrote stookinstallatie voor standaard brandstoffen (minder dan 50 MW)",
        item: {
          naam: "Kleine en middelgrote stookinstallatie voor standaard brandstoffen (minder dan 50 MW)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.KleinMiddelStookStandBrand",
            },
          ],
        },
      },
      {
        value:
          "Kleinschalig graven (25 m3 of minder) in bodem met een kwaliteit boven de interventiewaarde bodemkwaliteit",
        item: {
          naam: "Kleinschalig graven (25 m3 of minder) in bodem met een kwaliteit boven de interventiewaarde bodemkwaliteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.KleinschaligGravenBovenInt",
            },
          ],
        },
      },
      {
        value:
          "Kleinschalig tanken van vaartuigen of drijvende werktuigen met vloeibare brandstoffen (25 m3 per jaar of minder)",
        item: {
          naam: "Kleinschalig tanken van vaartuigen of drijvende werktuigen met vloeibare brandstoffen (25 m3 per jaar of minder)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.KleinschaligTankenVaartuigen",
            },
          ],
        },
      },
      {
        value:
          "Kleinschalig tanken van voertuigen, vliegtuigen of werktuigen met vloeibare brandstoffen (25 m3 per jaar of minder)",
        item: {
          naam: "Kleinschalig tanken van voertuigen, vliegtuigen of werktuigen met vloeibare brandstoffen (25 m3 per jaar of minder)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.KleinschaligTanken",
            },
          ],
        },
      },
      {
        value: "Koelinstallatie met kooldioxide, koolwaterstoffen of ammoniak",
        item: {
          naam: "Koelinstallatie met kooldioxide, koolwaterstoffen of ammoniak",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.KoelinstalKooldioKoolwstAmmo",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.KoelinstalKooldioKoolwstAmmo",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.KoelinstalKooldioKoolwstAmmo",
            },
          ],
        },
      },
      {
        value: "Koelwater lozen ergens anders dan op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater lozen ergens anders dan op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwater",
            },
          ],
        },
      },
      {
        value: "Koelwater lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterOppwaterl",
            },
          ],
        },
      },
      {
        value:
          "Koelwater, afkomstig van andere industrie bedoeld in § 3.4.12 van Besluit activiteiten leefomgeving, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van andere industrie bedoeld in § 3.4.12 van Besluit activiteiten leefomgeving, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterAndereIndustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterAndereIndustrie",
            },
          ],
        },
      },
      {
        value: "Koelwater, afkomstig van een datacentrum, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van een datacentrum, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterDatacentrum",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterDatacentrum",
            },
          ],
        },
      },
      {
        value:
          "Koelwater, afkomstig van een koelinstallatie met kooldioxide, koolwaterstoffen of ammoniak, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van een koelinstallatie met kooldioxide, koolwaterstoffen of ammoniak, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterKoelinstallatie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterKoelinstallatie",
            },
          ],
        },
      },
      {
        value:
          "Koelwater, afkomstig van een recyclingbedrijf voor rubber of kunststof, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van een recyclingbedrijf voor rubber of kunststof, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwRubberKunststofrecycl",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwRubberKunststofrecycl",
            },
          ],
        },
      },
      {
        value: "Koelwater, afkomstig van een stookinstallatie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van een stookinstallatie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterStookinstallatie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterStookinstallatie",
            },
          ],
        },
      },
      {
        value: "Koelwater, afkomstig van grafische industrie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van grafische industrie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterGrafischeIndustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterGrafischeIndustrie",
            },
          ],
        },
      },
      {
        value: "Koelwater, afkomstig van metaalproductenindustrie, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Koelwater, afkomstig van metaalproductenindustrie, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterMetaalproductenind",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenKoelwaterMetaalproductenind",
            },
          ],
        },
      },
      {
        value:
          "Koelwater, niet afkomstig van een milieubelastende activiteit die is aangewezen in hoofdstuk 3 van het Besluit activiteiten leefomgeving, lozen in het riool of op of in de bodem",
        item: {
          naam: "Koelwater, niet afkomstig van een milieubelastende activiteit die is aangewezen in hoofdstuk 3 van het Besluit activiteiten leefomgeving, lozen in het riool of op of in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.KoelwaterLozen",
            },
          ],
        },
      },
      {
        value: "Kuilvoer of vaste bijvoedermiddelen opslaan gereguleerd in het omgevingsplan",
        item: {
          naam: "Kuilvoer of vaste bijvoedermiddelen opslaan gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.KuilvoerOpslaan",
            },
          ],
        },
      },
      {
        value: "Laboratorium",
        item: {
          naam: "Laboratorium",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Laboratorium",
            },
          ],
        },
      },
      {
        value: "Landbouwmechanisatiebedrijf",
        item: {
          naam: "Landbouwmechanisatiebedrijf",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Landbouwmechanisatiebedrijf",
            },
          ],
        },
      },
      {
        value: "Lassen van metalen",
        item: {
          naam: "Lassen van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LassenMetalen",
            },
          ],
        },
      },
      {
        value: "lozen bij calamiteitenoefeningen",
        item: {
          naam: "lozen bij calamiteitenoefeningen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000085",
            },
          ],
        },
      },
      {
        value: "lozen bij maken van betonmortel en uitwassen van beton",
        item: {
          naam: "lozen bij maken van betonmortel en uitwassen van beton",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000086",
            },
          ],
        },
      },
      {
        value: "lozen bij ontgravingen, baggerwerkzaamheden en werkzaamheden door de waterbeheerder",
        item: {
          naam: "lozen bij ontgravingen, baggerwerkzaamheden en werkzaamheden door de waterbeheerder",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000124",
            },
          ],
        },
      },
      {
        value: "lozen bij schoonmaken drinkwaterleidingen",
        item: {
          naam: "lozen bij schoonmaken drinkwaterleidingen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000093",
            },
          ],
        },
      },
      {
        value: "lozen uit gemeentelijke voorzieningen voor inzameling en transport van afvalwater",
        item: {
          naam: "lozen uit gemeentelijke voorzieningen voor inzameling en transport van afvalwater",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000095",
            },
          ],
        },
      },
      {
        value: "lozen van afvloeiend hemelwater dat niet afkomstig is van een bodembeschermende voorziening",
        item: {
          naam: "lozen van afvloeiend hemelwater dat niet afkomstig is van een bodembeschermende voorziening",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000096",
            },
          ],
        },
      },
      {
        value: "lozing in de bodem",
        item: {
          naam: "lozing in de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000019",
            },
          ],
        },
      },
      {
        value: "Lozingsactiviteit afkomstig van een milieubelastende activiteit",
        item: {
          naam: "Lozingsactiviteit afkomstig van een milieubelastende activiteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingOppwatZuivertechWerkVanMBA",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingOppwatZuivertechWerkVanMBA",
            },
          ],
        },
      },
      {
        value: "Lozingsactiviteit op oppervlaktewaterlichaam of zuiveringtechnisch werk",
        item: {
          naam: "Lozingsactiviteit op oppervlaktewaterlichaam of zuiveringtechnisch werk",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingOppwaterZuivertechWerkRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingOppwaterZuivertechWerkRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingOppwaterZuivertechWerkRijk",
            },
          ],
        },
      },
      {
        value: "Lozingsactiviteiten op een oppervlaktewaterlichaam in beheer bij het Rijk, niet zijnde de Noordzee",
        item: {
          naam: "Lozingsactiviteiten op een oppervlaktewaterlichaam in beheer bij het Rijk, niet zijnde de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingOppervlaktewaterRijkNietNZ",
            },
          ],
        },
      },
      {
        value: "Maatwerkvoorschrift aanvragen bij de gemeente, de rijksoverheid of de provincie",
        item: {
          naam: "Maatwerkvoorschrift aanvragen bij de gemeente, de rijksoverheid of de provincie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MaatwerkNietWaterAct",
            },
          ],
        },
      },
      {
        value: "Maatwerkvoorschrift aanvragen bij het waterschap of Rijkswaterstaat",
        item: {
          naam: "Maatwerkvoorschrift aanvragen bij het waterschap of Rijkswaterstaat",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MaatwerkWateract",
            },
          ],
        },
      },
      {
        value: "Maden van vliegende insecten kweken",
        item: {
          naam: "Maden van vliegende insecten kweken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.MadenVliegInsectKweken",
            },
          ],
        },
      },
      {
        value: "Maken van cokes",
        item: {
          naam: "Maken van cokes",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MakenCokes",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MakenCokes",
            },
          ],
        },
      },
      {
        value: "Mechanisch bewerken van andere materialen dan steen en metalen",
        item: {
          naam: "Mechanisch bewerken van andere materialen dan steen en metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MechanischBewDiverseMaterialen",
            },
          ],
        },
      },
      {
        value: "Mechanisch bewerken van steen",
        item: {
          naam: "Mechanisch bewerken van steen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MechanischBewerkenSteen",
            },
          ],
        },
      },
      {
        value: "Mechanisch en thermisch bewerken van metalen",
        item: {
          naam: "Mechanisch en thermisch bewerken van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MechanischeThermischBewMetalen",
            },
          ],
        },
      },
      {
        value:
          "Mededeling voornemen mer-beoordeling indienen bij de gemeente, de rijksoverheid of de provincie (aanmeldnotitie)",
        item: {
          naam: "Mededeling voornemen mer-beoordeling indienen bij de gemeente, de rijksoverheid of de provincie (aanmeldnotitie)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041278",
              annotatieId: "nl.imow-mnre1034.activiteit.MededelingMerBeoordeling",
            },
          ],
        },
      },
      {
        value: "Mededeling voornemen mer-beoordeling indienen bij het waterschap of Rijkswaterstaat (aanmeldnotitie)",
        item: {
          naam: "Mededeling voornemen mer-beoordeling indienen bij het waterschap of Rijkswaterstaat (aanmeldnotitie)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041278",
              annotatieId: "nl.imow-mnre1034.activiteit.MededelingMerBeoordelingWsRijk",
            },
          ],
        },
      },
      {
        value: "Melden van een gelijkwaardige maatregel bij een milieubelastende activiteit",
        item: {
          naam: "Melden van een gelijkwaardige maatregel bij een milieubelastende activiteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GelijkwaardigheidMBA",
            },
          ],
        },
      },
      {
        value: "Mestbehandelingsinstallatie",
        item: {
          naam: "Mestbehandelingsinstallatie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Mestbehandelingsinstallatie",
            },
          ],
        },
      },
      {
        value: "Mestvergistingsinstallatie",
        item: {
          naam: "Mestvergistingsinstallatie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Mestvergistingsinstallatie",
            },
          ],
        },
      },
      {
        value: "Metaalproductenindustrie",
        item: {
          naam: "Metaalproductenindustrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Metaalproductenindustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Metaalproductenindustrie",
            },
          ],
        },
      },
      {
        value: "Middelgrote stookinstallatie voor niet-standaard brandstoffen (1 tot 50 MW)",
        item: {
          naam: "Middelgrote stookinstallatie voor niet-standaard brandstoffen (1 tot 50 MW)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MiddelgroteStookinstallatie",
            },
          ],
        },
      },
      {
        value: "Mijnbouw",
        item: {
          naam: "Mijnbouw",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Mijnbouw",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Mijnbouw",
            },
          ],
        },
      },
      {
        value: "Mijnbouwlocatieactiviteit",
        item: {
          naam: "Mijnbouwlocatieactiviteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.MijnbouwlocatieactiviteitRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.MijnbouwlocatieactiviteitRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MijnbouwlocatieactiviteitRijk",
            },
          ],
        },
      },
      {
        value: "milieubelastende activiteit",
        item: {
          naam: "milieubelastende activiteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000013",
            },
          ],
        },
      },
      {
        value: "Milieubelastende activiteit bij de voedingsmiddelenindustrie",
        item: {
          naam: "Milieubelastende activiteit bij de voedingsmiddelenindustrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.VoedingsmidIndustr",
            },
          ],
        },
      },
      {
        value: "Milieubelastende activiteit gereguleerd bij AMvB",
        item: {
          naam: "Milieubelastende activiteit gereguleerd bij AMvB",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.MilieubelastendeActiviteitRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MilieubelastendeActiviteitRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.MilieubelastendeActiviteitRijk",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MilieubelastendeActiviteitRijk",
            },
          ],
        },
      },
      {
        value: "Milieubelastende activiteit gereguleerd in het omgevingsplan",
        item: {
          naam: "Milieubelastende activiteit gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.MilieubelastendeAct",
            },
          ],
        },
      },
      {
        value: "Milieustraat",
        item: {
          naam: "Milieustraat",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Milieustraat",
            },
          ],
        },
      },
      {
        value: "Militaire kazerne",
        item: {
          naam: "Militaire kazerne",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireKazerne",
            },
          ],
        },
      },
      {
        value: "Militaire luchthaven",
        item: {
          naam: "Militaire luchthaven",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireLuchthaven",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireLuchthaven",
            },
          ],
        },
      },
      {
        value: "Militaire oefeningen houden op militaire objecten en terreinen",
        item: {
          naam: "Militaire oefeningen houden op militaire objecten en terreinen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireOefenOpMilitaireObjTerr",
            },
          ],
        },
      },
      {
        value: "Militaire schietbaan",
        item: {
          naam: "Militaire schietbaan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireSchietbaan",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireSchietbaan",
            },
          ],
        },
      },
      {
        value: "Militaire zeehaven",
        item: {
          naam: "Militaire zeehaven",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireZeehaven",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MilitaireZeehaven",
            },
          ],
        },
      },
      {
        value: "Minerale producten industrie",
        item: {
          naam: "Minerale producten industrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.MineraleProductenIndustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.MineraleProductenIndustrie",
            },
          ],
        },
      },
      {
        value: "Mobiel breken van bouw- en sloopafval",
        item: {
          naam: "Mobiel breken van bouw- en sloopafval",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041297",
              annotatieId: "nl.imow-mnre1034.activiteit.MobielBrekenBouwSloopafval",
            },
          ],
        },
      },
      {
        value: "Motorrevisiebedrijf",
        item: {
          naam: "Motorrevisiebedrijf",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Motorrevisiebedrijf",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Motorrevisiebedrijf",
            },
          ],
        },
      },
      {
        value: "Motorvoertuigen wassen",
        item: {
          naam: "Motorvoertuigen wassen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.MotorvoertuigWassen",
            },
          ],
        },
      },
      {
        value: "Nazorg na saneren van de bodem",
        item: {
          naam: "Nazorg na saneren van de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.NazorgNaSaneren",
            },
          ],
        },
      },
      {
        value: "Omgevingsplanactiviteit",
        item: {
          naam: "Omgevingsplanactiviteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.Omgevingsplanactiviteit",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.Omgevingsplanactiviteit",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Omgevingsplanactiviteit",
            },
          ],
        },
      },
      {
        value: "Onderhoud van de openbare ruimte",
        item: {
          naam: "Onderhoud van de openbare ruimte",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OnderhoudOpenbareRuimte",
            },
          ],
        },
      },
      {
        value:
          "Onderhouden en repareren van verbrandingsmotoren, gemotoriseerde voertuigen, vliegtuigen, vaartuigen of werktuigen",
        item: {
          naam: "Onderhouden en repareren van verbrandingsmotoren, gemotoriseerde voertuigen, vliegtuigen, vaartuigen of werktuigen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OnderhoudApparatVoertuigVaartuig",
            },
          ],
        },
      },
      {
        value: "Onderhoudswerkplaats voor autobus, trein, tram of metro",
        item: {
          naam: "Onderhoudswerkplaats voor autobus, trein, tram of metro",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OnderhWerkplBusTreinTramMetro",
            },
          ],
        },
      },
      {
        value:
          "Ongewoon voorval bij een beperkingengebiedactiviteit met betrekking tot een hoofdspoorweg of bijzondere spoorweg",
        item: {
          naam: "Ongewoon voorval bij een beperkingengebiedactiviteit met betrekking tot een hoofdspoorweg of bijzondere spoorweg",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvBepSpoorHoofdBijz",
            },
          ],
        },
      },
      {
        value: "Ongewoon voorval bij een beperkingengebiedactiviteit met betrekking tot een lokale spoorweg",
        item: {
          naam: "Ongewoon voorval bij een beperkingengebiedactiviteit met betrekking tot een lokale spoorweg",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalBepLokaalSpoor",
            },
          ],
        },
      },
      {
        value:
          "Ongewoon voorval bij een lozingsactiviteit afkomstig van een milieubelastende activiteit gereguleerd in het Besluit activiteiten leefomgeving",
        item: {
          naam: "Ongewoon voorval bij een lozingsactiviteit afkomstig van een milieubelastende activiteit gereguleerd in het Besluit activiteiten leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalLZABijMBA",
            },
          ],
        },
      },
      {
        value:
          "Ongewoon voorval bij een lozingsactiviteit op een oppervlaktewaterlichaam in beheer bij het Rijk, niet zijnde de Noordzee",
        item: {
          naam: "Ongewoon voorval bij een lozingsactiviteit op een oppervlaktewaterlichaam in beheer bij het Rijk, niet zijnde de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalLZANietNZ",
            },
          ],
        },
      },
      {
        value:
          "Ongewoon voorval bij een milieubelastende activiteit gereguleerd in het Besluit activiteiten leefomgeving",
        item: {
          naam: "Ongewoon voorval bij een milieubelastende activiteit gereguleerd in het Besluit activiteiten leefomgeving",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngewoonVoorvalMBA",
            },
          ],
        },
      },
      {
        value: "Ongewoon voorval bij een milieubelastende activiteit gereguleerd in het omgevingsplan",
        item: {
          naam: "Ongewoon voorval bij een milieubelastende activiteit gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.OngewoonVoorvalMBAOP",
            },
          ],
        },
      },
      {
        value: "Ongewoon voorval bij een wateronttrekkingsactiviteit gereguleerd bij AMvB",
        item: {
          naam: "Ongewoon voorval bij een wateronttrekkingsactiviteit gereguleerd bij AMvB",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalWaterontAmvb",
            },
          ],
        },
      },
      {
        value: "Ongewoon voorval bij het bieden van gelegenheid tot zwemmen of baden in een badwaterbassin",
        item: {
          naam: "Ongewoon voorval bij het bieden van gelegenheid tot zwemmen of baden in een badwaterbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalZwemBaden",
            },
          ],
        },
      },
      {
        value: "Ongewoon voorval bij het kappen van houtopstanden (buiten de bebouwde kom)",
        item: {
          naam: "Ongewoon voorval bij het kappen van houtopstanden (buiten de bebouwde kom)",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalVellenHout",
            },
          ],
        },
      },
      {
        value:
          "Ontplofbare stoffen en voorwerpen, afkomstig van het gebruik van ontplofbare stoffen of voorwerpen op een militair object, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Ontplofbare stoffen en voorwerpen, afkomstig van het gebruik van ontplofbare stoffen of voorwerpen op een militair object, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingenOntplofbStofMilitairObj",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozingenOntplofbStofMilitairObj",
            },
          ],
        },
      },
      {
        value: "Onttrekken of toevoegen van warmte aan de ondergrond",
        item: {
          naam: "Onttrekken of toevoegen van warmte aan de ondergrond",
          koppelingen: [
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000018",
            },
          ],
        },
      },
      {
        value:
          "Op de landbodem opslaan, zeven, mechanisch ontwateren of samenvoegen van zonder bewerking herbruikbare grond of baggerspecie",
        item: {
          naam: "Op de landbodem opslaan, zeven, mechanisch ontwateren of samenvoegen van zonder bewerking herbruikbare grond of baggerspecie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagHerbruikbareGrondBagger",
            },
          ],
        },
      },
      {
        value: "Open bodemenergiesysteem",
        item: {
          naam: "Open bodemenergiesysteem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpenBodemenergiesysteem",
            },
            {
              documentId: "/akn/nl/act/pv22/2023/omgevingsverordening",
              annotatieId: "nl.imow-pv22.activiteit.003000000000000000000043",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpenBodemenergiesysteem",
            },
          ],
        },
      },
      {
        value: "Oplosmiddeleninstallatie",
        item: {
          naam: "Oplosmiddeleninstallatie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Oplosmiddeleninstallatie",
            },
          ],
        },
      },
      {
        value: "Oppervlaktebehandeling met oplosmiddelen in een ippc-installatie",
        item: {
          naam: "Oppervlaktebehandeling met oplosmiddelen in een ippc-installatie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OppervlaktebehandelMetOplosmIPPC",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OppervlaktebehandelMetOplosmIPPC",
            },
          ],
        },
      },
      {
        value: "oppervlaktewaterlichaam graven",
        item: {
          naam: "oppervlaktewaterlichaam graven",
          koppelingen: [
            {
              documentId: "/akn/nl/act/ws0664/2023/waterschapsverordening",
              annotatieId: "nl.imow-ws0664.activiteit.013000000000000000000057",
            },
          ],
        },
      },
      {
        value: "Opslaan en bewerken van ontplofbare stoffen en voorwerpen op militaire objecten",
        item: {
          naam: "Opslaan en bewerken van ontplofbare stoffen en voorwerpen op militaire objecten",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanOntplofbStofMilitaireObj",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanOntplofbStofMilitaireObj",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanOntplofbStofMilitaireObj",
            },
          ],
        },
      },
      {
        value: "Opslaan van drijfmest, digestaat of dunne fractie in mestbassin",
        item: {
          naam: "Opslaan van drijfmest, digestaat of dunne fractie in mestbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanDrijfmestInMestbassin",
            },
          ],
        },
      },
      {
        value: "Opslaan van gebruikt substraatmateriaal",
        item: {
          naam: "Opslaan van gebruikt substraatmateriaal",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanGebruiktSubstraatmat",
            },
          ],
        },
      },
      {
        value: "Opslaan van kuilvoer of vaste bijvoedermiddelen",
        item: {
          naam: "Opslaan van kuilvoer of vaste bijvoedermiddelen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanKuilvoerVasteBijvoedermid",
            },
          ],
        },
      },
      {
        value: "Opslaan van vaste mest, champost of dikke fractie",
        item: {
          naam: "Opslaan van vaste mest, champost of dikke fractie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanVasteMestChampDikkeFract",
            },
          ],
        },
      },
      {
        value: "Opslaan van vaste minerale anorganische meststoffen",
        item: {
          naam: "Opslaan van vaste minerale anorganische meststoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanVasteMinerAnorgMeststof",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanVasteMinerAnorgMeststof",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanVasteMinerAnorgMeststof",
            },
          ],
        },
      },
      {
        value:
          "Opslaan, mengen, scheiden en verdichten van bedrijfsafval of gevaarlijk afval voorafgaand aan inzameling of afgifte",
        item: {
          naam: "Opslaan, mengen, scheiden en verdichten van bedrijfsafval of gevaarlijk afval voorafgaand aan inzameling of afgifte",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanBedrGevAfvalVoorafgInzam",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanBedrGevAfvalVoorafgInzam",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslaanBedrGevAfvalVoorafgInzam",
            },
          ],
        },
      },
      {
        value:
          "Opslaan, zeven, mechanisch ontwateren of samenvoegen van grond of baggerspecie die pas na bewerking herbruikbaar is",
        item: {
          naam: "Opslaan, zeven, mechanisch ontwateren of samenvoegen van grond of baggerspecie die pas na bewerking herbruikbaar is",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagGrondBagger",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagGrondBagger",
            },
          ],
        },
      },
      {
        value: "Opslagbedrijf, transportbedrijf, groothandel en containerterminal",
        item: {
          naam: "Opslagbedrijf, transportbedrijf, groothandel en containerterminal",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagTransportbedrijf",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagTransportbedrijf",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.OpslagTransportbedrijf",
            },
          ],
        },
      },
      {
        value: "Opstellen van voertuigen, opleggers of aanhangers met gevaarlijke stoffen",
        item: {
          naam: "Opstellen van voertuigen, opleggers of aanhangers met gevaarlijke stoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OpstellenVoertuigGevaarlStoffen",
            },
          ],
        },
      },
      {
        value:
          "Plaatsen of aanleggen van objecten in een beperkingengebied met betrekking tot een burgerluchthaven van regionale betekenis",
        item: {
          naam: "Plaatsen of aanleggen van objecten in een beperkingengebied met betrekking tot een burgerluchthaven van regionale betekenis",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ObjectBepBurgerLuchthavenRegio",
            },
          ],
        },
      },
      {
        value:
          "Plaatsen of aanleggen van objecten in een beperkingengebied met betrekking tot een militaire luchthaven",
        item: {
          naam: "Plaatsen of aanleggen van objecten in een beperkingengebied met betrekking tot een militaire luchthaven",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ObjectBepLuchtMili",
            },
          ],
        },
      },
      {
        value: "Polyesterhars verwerken gereguleerd in het omgevingsplan",
        item: {
          naam: "Polyesterhars verwerken gereguleerd in het omgevingsplan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.PolyesterharsVerw",
            },
          ],
        },
      },
      {
        value: "Praktijkruimte of laboratorium waar gericht gewerkt wordt met biologische agens in werking hebben",
        item: {
          naam: "Praktijkruimte of laboratorium waar gericht gewerkt wordt met biologische agens in werking hebben",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.LaboratoriumBiolAgens",
            },
          ],
        },
      },
      {
        value: "Proefdraaien van verbrandingsmotoren",
        item: {
          naam: "Proefdraaien van verbrandingsmotoren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ProefdraaienVerbrandingsmotoren",
            },
          ],
        },
      },
      {
        value: "Propaan of propeen opslaan in meer dan twee opslagtanks",
        item: {
          naam: "Propaan of propeen opslaan in meer dan twee opslagtanks",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.PropaanOpslaan",
            },
          ],
        },
      },
      {
        value: "Recyclingbedrijf voor metaal",
        item: {
          naam: "Recyclingbedrijf voor metaal",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Metaalrecyclingbedrijf",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Metaalrecyclingbedrijf",
            },
          ],
        },
      },
      {
        value: "Reinigen, lijmen en coaten van materialen",
        item: {
          naam: "Reinigen, lijmen en coaten van materialen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ReinigenCoatenDiverseMaterialen",
            },
          ],
        },
      },
      {
        value: "Repareren en verhuren van gemotoriseerde werktuigen",
        item: {
          naam: "Repareren en verhuren van gemotoriseerde werktuigen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ReparerenVerhurenGemotoWerktuig",
            },
          ],
        },
      },
      {
        value: "Rijksmonumentenactiviteit",
        item: {
          naam: "Rijksmonumentenactiviteit",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Rijksmonumentenactiviteit",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.Rijksmonumentenactiviteit",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Rijksmonumentenactiviteit",
            },
          ],
        },
      },
      {
        value: "Rijksmonumentenactiviteit met betrekking tot een gebouwd of aangelegd monument",
        item: {
          naam: "Rijksmonumentenactiviteit met betrekking tot een gebouwd of aangelegd monument",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.RijkmonMonument",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.RijkmonMonument",
            },
          ],
        },
      },
      {
        value: "Saneren van de bodem",
        item: {
          naam: "Saneren van de bodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Bodemsanering",
            },
          ],
        },
      },
      {
        value: "Schoonbranden van metalen",
        item: {
          naam: "Schoonbranden van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SchoonbrandenMetalen",
            },
          ],
        },
      },
      {
        value: "Schoonmaken van pleziervaartuigen",
        item: {
          naam: "Schoonmaken van pleziervaartuigen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SchoonmakenPleziervaartuigen",
            },
          ],
        },
      },
      {
        value: "Smelten en gieten van metalen",
        item: {
          naam: "Smelten en gieten van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SmeltenGietenMetalen",
            },
          ],
        },
      },
      {
        value: "Solderen van metalen",
        item: {
          naam: "Solderen van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SolderenMetalen",
            },
          ],
        },
      },
      {
        value: "Soortenbescherming",
        item: {
          naam: "Soortenbescherming",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Soortenbescherming",
            },
          ],
        },
      },
      {
        value: "Spoelen van bloembollen of bloemknollen die niet biologisch zijn geteeld",
        item: {
          naam: "Spoelen van bloembollen of bloemknollen die niet biologisch zijn geteeld",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SpoelenNietBioGeteeldBloemBollen",
            },
          ],
        },
      },
      {
        value: "Spoelen van gewassen die niet biologisch zijn geteeld, anders dan bloembollen of bloemknollen",
        item: {
          naam: "Spoelen van gewassen die niet biologisch zijn geteeld, anders dan bloembollen of bloemknollen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SpoelenGewassen",
            },
          ],
        },
      },
      {
        value: "Spoorwegemplacement",
        item: {
          naam: "Spoorwegemplacement",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Spoorwegemplacementen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Spoorwegemplacementen",
            },
          ],
        },
      },
      {
        value: "Stikstofemissie bij het uitvoeren van bouw- of sloopwerkzaamheden",
        item: {
          naam: "Stikstofemissie bij het uitvoeren van bouw- of sloopwerkzaamheden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041297",
              annotatieId: "nl.imow-mnre1034.activiteit.StikstofBijBouwSloop",
            },
          ],
        },
      },
      {
        value:
          "Stoffen of afvalwater, afkomstig van de beroepsvaart, lozen op een oppervlaktewaterlichaam dat deel uitmaakt van de binnenwateren",
        item: {
          naam: "Stoffen of afvalwater, afkomstig van de beroepsvaart, lozen op een oppervlaktewaterlichaam dat deel uitmaakt van de binnenwateren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenStofAfvalwBeroepsvaart",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenStofAfvalwBeroepsvaart",
            },
          ],
        },
      },
      {
        value:
          "Stoffen of afvalwater, afkomstig van het buiten stortplaatsen op of in de bodem brengen van bedrijfsafvalstoffen of gevaarlijke afvalstoffen, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Stoffen of afvalwater, afkomstig van het buiten stortplaatsen op of in de bodem brengen van bedrijfsafvalstoffen of gevaarlijke afvalstoffen, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppWStortBuitenStortplaats",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppWStortBuitenStortplaats",
            },
          ],
        },
      },
      {
        value:
          "Stoffen of afvalwater, afkomstig van het verwerken van bedrijfsafvalstoffen of gevaarlijke afvalstoffen, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Stoffen of afvalwater, afkomstig van het verwerken van bedrijfsafvalstoffen of gevaarlijke afvalstoffen, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVerwBedrGevAfvalst",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterVerwBedrGevAfvalst",
            },
          ],
        },
      },
      {
        value:
          "Stoffen, afkomstig van het gebruik van gewasbeschermingsmiddelen of meststoffen in de openlucht, lozen op een oppervlaktewaterlichaam",
        item: {
          naam: "Stoffen, afkomstig van het gebruik van gewasbeschermingsmiddelen of meststoffen in de openlucht, lozen op een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenOppwaterGebruikGewasbesch",
            },
          ],
        },
      },
      {
        value:
          "Stoffen, water of warmte, afkomstig van bouwen, reinigen, conserveren, of slopen van bouwwerken, lozen in de Noordzee",
        item: {
          naam: "Stoffen, water of warmte, afkomstig van bouwen, reinigen, conserveren, of slopen van bouwwerken, lozen in de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenBijBouwenNoordzee",
            },
          ],
        },
      },
      {
        value:
          "Stoffen, water of warmte, afkomstig van bouwen, reinigen, conserveren, of slopen van bouwwerken, lozen op een oppervlaktewaterlichaam, niet zijnde de Noordzee",
        item: {
          naam: "Stoffen, water of warmte, afkomstig van bouwen, reinigen, conserveren, of slopen van bouwwerken, lozen op een oppervlaktewaterlichaam, niet zijnde de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenBijBouwenNietNoordzee",
            },
          ],
        },
      },
      {
        value:
          "Stoffen, water of warmte, afkomstig van het telen en kweken op een oppervlaktewaterlichaam, niet zijnde de Noordzee",
        item: {
          naam: "Stoffen, water of warmte, afkomstig van het telen en kweken op een oppervlaktewaterlichaam, niet zijnde de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenAfkomstTelenKwekenNietNZ",
            },
          ],
        },
      },
      {
        value: "Stoffen, water of warmte, afkomstig van het telen en kweken, lozen in de Noordzee",
        item: {
          naam: "Stoffen, water of warmte, afkomstig van het telen en kweken, lozen in de Noordzee",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.LozenAfkomstTelenKwekenNZ",
            },
          ],
        },
      },
      {
        value: "Stralen van metalen",
        item: {
          naam: "Stralen van metalen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.StralenMetalen",
            },
          ],
        },
      },
      {
        value: "Substraatteelt van gewassen in de openlucht op stellingen of in een gotensysteem",
        item: {
          naam: "Substraatteelt van gewassen in de openlucht op stellingen of in een gotensysteem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SubstTeeltGewasStellingOpenLucht",
            },
          ],
        },
      },
      {
        value: "Substraatteelt van gewassen in de openlucht, anders dan op stellingen of in een gotensysteem",
        item: {
          naam: "Substraatteelt van gewassen in de openlucht, anders dan op stellingen of in een gotensysteem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.SubstraatteeltGewassenOpenLucht",
            },
          ],
        },
      },
      {
        value: "Toepassen van bouwstoffen in een oppervlaktewaterlichaam",
        item: {
          naam: "Toepassen van bouwstoffen in een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ToepassenBouwstoffenInOppwater",
            },
          ],
        },
      },
      {
        value: "Toepassen van bouwstoffen op of in de landbodem",
        item: {
          naam: "Toepassen van bouwstoffen op of in de landbodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ToepassenBouwstoffen",
            },
          ],
        },
      },
      {
        value: "Toepassen van grond of baggerspecie in een oppervlaktewaterlichaam",
        item: {
          naam: "Toepassen van grond of baggerspecie in een oppervlaktewaterlichaam",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ToepassenGrondBaggerInOppwater",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.ToepassenGrondBaggerInOppwater",
            },
          ],
        },
      },
      {
        value: "Toepassen van grond of baggerspecie op of in de landbodem",
        item: {
          naam: "Toepassen van grond of baggerspecie op of in de landbodem",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ToepassenGrondBagger",
            },
          ],
        },
      },
      {
        value: "Toestemming gelijkwaardige maatregel aanvragen bij de gemeente, de rijksoverheid of de provincie",
        item: {
          naam: "Toestemming gelijkwaardige maatregel aanvragen bij de gemeente, de rijksoverheid of de provincie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.AanvraagGelijkwNietWater",
            },
          ],
        },
      },
      {
        value: "Toestemming gelijkwaardige maatregel aanvragen bij het waterschap of Rijkswaterstaat",
        item: {
          naam: "Toestemming gelijkwaardige maatregel aanvragen bij het waterschap of Rijkswaterstaat",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.AanvraagGelijkwWateract",
            },
          ],
        },
      },
      {
        value: "Traumahelikopter",
        item: {
          naam: "Traumahelikopter",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Traumahelikopter",
            },
          ],
        },
      },
      {
        value: "Tuinmeubilair bouwen, in stand houden of gebruiken",
        item: {
          naam: "Tuinmeubilair bouwen, in stand houden of gebruiken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.TuinmeubilairBouwen",
            },
          ],
        },
      },
      {
        value: "Uitweg maken, hebben of veranderen of het gebruik daarvan veranderen",
        item: {
          naam: "Uitweg maken, hebben of veranderen of het gebruik daarvan veranderen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.UitwegMakenHebbenVeranderen",
            },
          ],
        },
      },
      {
        value: "Veiligheid bij het uitvoeren van bouw- of sloopwerkzaamheden",
        item: {
          naam: "Veiligheid bij het uitvoeren van bouw- of sloopwerkzaamheden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041297",
              annotatieId: "nl.imow-mnre1034.activiteit.VeiligheidBijBouwSloop",
            },
          ],
        },
      },
      {
        value: "Vellen en beheren van houtopstanden gereguleerd bij AMvB",
        item: {
          naam: "Vellen en beheren van houtopstanden gereguleerd bij AMvB",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.VellenBeherenHoutopstandAMVB",
            },
          ],
        },
      },
      {
        value: "Vergassen of vloeibaar maken van steenkool of andere brandstoffen",
        item: {
          naam: "Vergassen of vloeibaar maken van steenkool of andere brandstoffen",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.VergassenVloeibaarMakenSteenkool",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.VergassenVloeibaarMakenSteenkool",
            },
          ],
        },
      },
      {
        value: "Verwerken van rubbercompounds",
        item: {
          naam: "Verwerken van rubbercompounds",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.VerwerkenRubbercompounds",
            },
          ],
        },
      },
      {
        value: "Verwerken van thermoplastisch kunststof",
        item: {
          naam: "Verwerken van thermoplastisch kunststof",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.VerwerkenThermoplastischKunstst",
            },
          ],
        },
      },
      {
        value: "Vlaggenmast bouwen, in stand houden of gebruiken",
        item: {
          naam: "Vlaggenmast bouwen, in stand houden of gebruiken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.VlaggenmastBouwen",
            },
          ],
        },
      },
      {
        value: "Voedingsmiddelenindustrie",
        item: {
          naam: "Voedingsmiddelenindustrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Voedingsmiddelenindustrie",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Voedingsmiddelenindustrie",
            },
          ],
        },
      },
      {
        value: "Voedsel bereiden, geen voedingsmiddelenindustrie",
        item: {
          naam: "Voedsel bereiden, geen voedingsmiddelenindustrie",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.NietIndVoedselbereid",
            },
          ],
        },
      },
      {
        value: "Vormgeven van betonproducten",
        item: {
          naam: "Vormgeven van betonproducten",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.VormgevenBetonproducten",
            },
          ],
        },
      },
      {
        value: "Vullen van gasflessen met propaan of butaan",
        item: {
          naam: "Vullen van gasflessen met propaan of butaan",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.VullenGasflessenPropaanButaan",
            },
          ],
        },
      },
      {
        value: "Wateronttrekkingsactiviteit gereguleerd bij AMvB",
        item: {
          naam: "Wateronttrekkingsactiviteit gereguleerd bij AMvB",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.Wateronttrekkingsactiviteit",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041313",
              annotatieId: "nl.imow-mnre1034.activiteit.Wateronttrekkingsactiviteit",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Wateronttrekkingsactiviteit",
            },
          ],
        },
      },
      {
        value: "Werk, niet zijnde bouwwerk, of werkzaamheid uitvoeren",
        item: {
          naam: "Werk, niet zijnde bouwwerk, of werkzaamheid uitvoeren",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.WerkzaamheidUitv",
            },
          ],
        },
      },
      {
        value: "Werkzaamheden met een verplaatsbaar mijnbouwwerk",
        item: {
          naam: "Werkzaamheden met een verplaatsbaar mijnbouwwerk",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.WerkzaamhedenVerplaatsbMijnbouw",
            },
          ],
        },
      },
      {
        value: "Zendmast",
        item: {
          naam: "Zendmast",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.Zendmasten",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.Zendmasten",
            },
          ],
        },
      },
      {
        value: "Zuiveringsvoorziening voor ingezameld of afgegeven afvalwater",
        item: {
          naam: "Zuiveringsvoorziening voor ingezameld of afgegeven afvalwater",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2018/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZelfstandigeAfvalwaterzuivering",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/reg0001",
              annotatieId: "nl.imow-mnre1034.activiteit.ZelfstandigeAfvalwaterzuivering",
            },
          ],
        },
      },
      {
        value: "Zwembad, bubbelbad of soortgelijke voorziening of vijver bouwen, in stand houden of gebruiken",
        item: {
          naam: "Zwembad, bubbelbad of soortgelijke voorziening of vijver bouwen, in stand houden of gebruiken",
          koppelingen: [
            {
              documentId: "/akn/nl/act/gm0119/2020/omgevingsplan",
              annotatieId: "nl.imow-gm0119.activiteit.ZwembadBouwen",
            },
          ],
        },
      },
    ],
  },
];

const suggestions: AutosuggestSuggestion[] = [
  {
    type: "adres in Amsterdam",
    value: "Amsteldijk 130A-H, 1078RT Amsterdam",
  },
  {
    value: "Rotterdamse Rijweg 15A, 3043BG Rotterdam",
  },
  {
    value: "Amsteldijk 152A-H, 1079LG Amsterdam",
  },
  {
    value: "Darwindreef 1, Utrecht",
  },
  {
    value: "Amstelkade 166A-H, 1078AX Amsterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 13A, 3043BG Rotterdam",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstelkade 169A-H, 1078AZ Amsterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Bantoedreef 1, Utrecht",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstelveenseweg 170B-H, 1075XP Amsterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Dichtersplein 1, Utrecht",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 13B, 3043BG Rotterdam",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstel 312A-H, 1017AP Amsterdam",
  },
  {
    value: "Amstel 312A-O, 1017AP Amsterdam",
  },
  {
    value: "Isotopenweg 1, Utrecht",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstelbeststraat 6C-2, 1096GD Amsterdam",
  },
  {
    type: "adres in Amsterdam",
    value: "Amsteldijk 26A-1, 1074HT Amsterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 1A, 3043BE Rotterdam",
    item: 123,
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 1B, 3043BE Rotterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Kanaaldijk 1, Utrecht",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 7A, 3043BE Rotterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 9-BGA, 3043BE Rotterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 9-BGV, 3043BE Rotterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 15B, 3043BG Rotterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Carmendreef 1, Utrecht",
  },
  {
    value: "Rotterdamse Rijweg 7B, 3043BE Rotterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Catharijneplateau 1, Utrecht",
  },
  {
    type: "adres in Utrecht",
    value: "Chiosdreef 1, Utrecht",
  },
  {
    type: "adres in Utrecht",
    value: "Karpaten 1, Utrecht",
  },
  {
    value: "Amstelbeststraat 6C-1, 1096GD Amsterdam",
  },
  {
    value: "Kosdreef 1, Utrecht",
  },
  {
    value: "Slopen (zonder vragen)",
  },
  {
    value: "Slopen (zonder sttr bestand)",
  },
  {
    extras: ["In werking vanaf 01-01-2024", "gemeente Groningen", "/akn/nl/act/gm0014/2020/omgevingsplan"],
    type: "omgevingsplan (omgevingswet)",
    value: "Omgevingsplan gemeente Groningen",
  },
  {
    extras: ["Ontwerp 18-01-2024", "gemeente Groningen", "/akn/nl/act/gm0014/2020/omgevingsplan"],
    type: "omgevingsplan (omgevingswet)",
    value: "Omgevingsplan gemeente Groningen",
  },
  {
    extras: ["Ontwerp 16-06-2023 - in voorbereiding", "gemeente Groningen", "NL.IMRO.0202.OGV888-0201"],
    type: "omgevingsplan (omgevingswet)",
    value: "Omgevingsvergunning Friesestraatweg 141-36",
  },
  {
    extras: ["onherroepelijk 08-05-1962", "gemeente Berkelland", "NL.IMRO.18590000BGBCL19620508-"],
    type: "Gemeentelijk plan; Bestemmingsplan artikel 10",
    value: "Uitbreidingsplan in Hoofdzaken van de gemeente Borculo",
  },
  {
    value: "1e suggestie van 20",
  },
  {
    value: "2e suggestie van 20",
  },
  {
    value: "3e suggestie van 20",
  },
  {
    value: "4e suggestie van 20",
  },
  {
    value: "5e suggestie van 20",
  },
  {
    value: "6e suggestie van 20",
  },
  {
    value: "7e suggestie van 20",
  },
  {
    value: "8e suggestie van 20",
  },
  {
    value: "9e suggestie van 20",
  },
  {
    value: "10e suggestie van 20",
  },
  {
    value: "11e suggestie van 20",
  },
  {
    value: "12e suggestie van 20",
  },
  {
    value: "13e suggestie van 20",
  },
  {
    value: "14e suggestie van 20",
  },
  {
    value: "15e suggestie van 20",
  },
  {
    value: "16e suggestie van 20",
  },
  {
    value: "17e suggestie van 20",
  },
  {
    value: "18e suggestie van 20",
  },
  {
    value: "19e suggestie van 20",
  },
  {
    value: "20e suggestie van 20",
  },
];

export function fetchSuggestions(value: string): AutosuggestSuggestion[] {
  const terms = value.match(/(\S+)/g);

  return terms
    ? suggestions.filter((suggestion) =>
        terms.every((term) => new RegExp(escapeStringRegexp(term), "i").test(suggestion.value)),
      )
    : [];
}

export function fetchSuggestionGroups(value: string): AutosuggestSuggestionGroup[] {
  const suggestionGroupsDeepCopy: AutosuggestSuggestionGroup[] = JSON.parse(JSON.stringify(suggestionGroups));

  const terms = value.match(/(\S+)/g);

  return terms
    ? suggestionGroupsDeepCopy.filter((suggestionGroup) => {
        const filteredSuggestions = suggestionGroup.suggestions.filter((suggestion) =>
          terms.every((term) => new RegExp(escapeStringRegexp(term), "i").test(suggestion.value)),
        );

        suggestionGroup.suggestions = filteredSuggestions;

        return filteredSuggestions.length > 0;
      })
    : [];
}

export function mark(
  _suggestion: AutosuggestSuggestion,
  _text: string,
  type: "value" | "type" | "extra",
  extraIndex?: number,
): AutosuggestMarkItem[] {
  const extras: AutosuggestMarkItem[][] = [
    ["Ontwerp ", { mark: "18-" }, "01-2024"],
    ["gemeente Gron", { mark: "ing" }, "en"],
    ["/akn/nl/act/gm0014/2020/", { mark: "omg" }, "evingsplan"],
  ];

  let result: AutosuggestMarkItem[] = [""];

  switch (type) {
    case "value":
      result = [{ mark: "Omg" }, "evingsplan gemeente Groningen"];
      break;
    case "type":
      result = [{ mark: "omg" }, "evingsplan (", { mark: "omg" }, "evingswet)"];
      break;
    case "extra":
      if (extraIndex !== undefined && extraIndex >= 0 && extraIndex <= extras.length) {
        result = extras[extraIndex]!;
      }
  }

  return result;
}
