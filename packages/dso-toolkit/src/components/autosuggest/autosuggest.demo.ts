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
    ],
  },
  {
    groupLabel: "Derde groep",
    suggestions: [
      {
        value: "Eenzaam item (met extra's)",
        type: "Typering",
        extras: ["Eerste extra", "Tweede extra", "Laatste extra"],
      },
    ],
  },
  {
    groupLabel: "Laatste groep",
    suggestions: [{ value: "Groep met slechts één item" }],
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
