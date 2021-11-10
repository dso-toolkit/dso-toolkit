import { AutosuggestSuggestion } from './autosuggest.models';
import escapeStringRegexp from 'escape-string-regexp';

const suggestions: AutosuggestSuggestion[] = [
  {
    type: 'adres in Amsterdam',
    value: 'Amsteldijk 130A-H, 1078RT Amsterdam',
  },
  {
    value: 'Rotterdamse Rijweg 15A, 3043BG Rotterdam',
  },
  {
    value: 'Amsteldijk 152A-H, 1079LG Amsterdam',
  },
  {
    value: 'Darwindreef 1, Utrecht',
  },
  {
    value: 'Amstelkade 166A-H, 1078AX Amsterdam',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 13A, 3043BG Rotterdam',
  },
  {
    type: 'adres in Amsterdam',
    value: 'Amstelkade 169A-H, 1078AZ Amsterdam',
  },
  {
    type: 'adres in Utrecht',
    value: 'Bantoedreef 1, Utrecht',
  },
  {
    type: 'adres in Amsterdam',
    value: 'Amstelveenseweg 170B-H, 1075XP Amsterdam',
  },
  {
    type: 'adres in Utrecht',
    value: 'Dichtersplein 1, Utrecht',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 13B, 3043BG Rotterdam',
  },
  {
    type: 'adres in Amsterdam',
    value: 'Amstel 312A-H, 1017AP Amsterdam',
  },
  {
    value: 'Amstel 312A-O, 1017AP Amsterdam',
  },
  {
    value: 'Isotopenweg 1, Utrecht',
  },
  {
    type: 'adres in Amsterdam',
    value: 'Amstelbeststraat 6C-2, 1096GD Amsterdam',
  },
  {
    type: 'adres in Amsterdam',
    value: 'Amsteldijk 26A-1, 1074HT Amsterdam',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 1A, 3043BE Rotterdam',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 1B, 3043BE Rotterdam',
  },
  {
    type: 'adres in Utrecht',
    value: 'Kanaaldijk 1, Utrecht',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 7A, 3043BE Rotterdam',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 9-BGA, 3043BE Rotterdam',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 9-BGV, 3043BE Rotterdam',
  },
  {
    type: 'adres in Rotterdam',
    value: 'Rotterdamse Rijweg 15B, 3043BG Rotterdam',
  },
  {
    type: 'adres in Utrecht',
    value: 'Carmendreef 1, Utrecht',
  },
  {
    value: 'Rotterdamse Rijweg 7B, 3043BE Rotterdam',
  },
  {
    type: 'adres in Utrecht',
    value: 'Catharijneplateau 1, Utrecht',
  },
  {
    type: 'adres in Utrecht',
    value: 'Chiosdreef 1, Utrecht',
  },
  {
    type: 'adres in Utrecht',
    value: 'Karpaten 1, Utrecht',
  },
  {
    value: 'Amstelbeststraat 6C-1, 1096GD Amsterdam',
  },
  {
    value: 'Kosdreef 1, Utrecht',
  },
  {
    value: 'Slopen (zonder vragen)',
  },
  {
    value: 'Slopen (zonder sttr bestand)',
  },
];

export function fetchSuggestions(value: string): AutosuggestSuggestion[] {
  const terms = value.match(/(\S+)/g);

  return terms
    ? suggestions
        .filter(suggestion => terms.every(term => new RegExp(escapeStringRegexp(term), 'i').test(suggestion.value)))
        .slice(0, 10)
    : [];
}
