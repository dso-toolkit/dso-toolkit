const symbolImage = '<span class="symboolcode" data-symboolcode="vag000"></span>';
const symbolColor = '<span class="symboolcode" data-symboolcode="vszt030"></span>';

module.exports = {
  label: 'Label (CSS)',
  notes: `
## Technische opmerkingen
* Het label component kent een normale en een een smalle variant (\`.dso-compact\`);
* De hover state voor het Web Component is onderdeel van de werkvorm, voor de CSS versie moet deze door developers worden geimplementeerd dmv. class \`.dso-label-hover\` op de \`<span class="dso-label">\`;

## Gedrag en toegankelijkheid
De kleur van een label mag geen zelfstandige betekenis hebben. Gelet op [WCAG succescriterium 1.4.1](https://www.w3.org/Translations/WCAG21-nl/#gebruik-van-kleur) gebruik van kleur mag de kleur van een label nooit een zelfstandige betekenis hebben. Kleurverschillen mogen wel worden gebruikt als extra visuele hint, maar als kleurverschillen een betekenis hebben dan moet deze betekenis daarnaast afleidbaar zijn uit de zichtbare tekst of een andere visuele hint in combinatie met een sr-only tekst.

**Voorbeeld:**
Op een pagina met de uitslag van een quiz wordt gemeld dat de gebruiker 4 antwoorden goed en 6 antwoorden fout heeft gekozen. We adviseren om een op zichzelf duidelijke tekst te kiezen voor het label en de groene / rode achtergrondkleur alleen decoratief te gebruiken.

### Variant met verwijder kruisje
Het tekstalternatief voor een verwijder knopje in een label is: verwijder [tekst label]. De tekst van het label wordt in het verwijder knopje herhaald om te zorgen dat voor screen reader gebruikers altijd duidelijk is welk verwijder knopje bij welk label hoort. Dit stelt hen in staat sneller te werken en voorkomt het per ongeluk verwijderen van het verkeerde item.
  `,
  status: 'ready',
  collated: true,
  collator: (markup, item) => `<div class="col-xs-4" style="height: 3em;"><p>${item.context._ignore ? '' : markup}</p></div>`,
  default: 'default',
  variants: [
    {
      name: 'default',
      context: {
        label: 'Label (standaard)'
      }
    },
    {
      name: 'default button',
      context: {
        label: 'Label (standaard)',
        removable: true
      }
    },
    {
      name: 'default compact',
      context: {
        label: 'Label (standaard)',
        compact: true
      }
    },
    {
      name: 'info',
      context: {
        status: 'info',
        label: 'Label (info)'
      }
    },
    {
      name: 'info button',
      context: {
        status: 'info',
        label: 'Label (info)',
        removable: true
      }
    },
    {
      name: 'info compact',
      context: {
        status: 'info',
        label: 'Label (info)',
        compact: true
      }
    },
    {
      name: 'primary',
      context: {
        status: 'primary',
        label: 'Label (primair)'
      }
    },
    {
      name: 'primary button',
      context: {
        status: 'primary',
        label: 'Label (primair)',
        removable: true
      }
    },
    {
      name: 'primary compact',
      context: {
        status: 'primary',
        label: 'Label (primair)',
        compact: true
      }
    },
    {
      name: 'success',
      context: {
        status: 'success',
        label: 'Label (succes)'
      }
    },
    {
      name: 'success button',
      context: {
        status: 'success',
        label: 'Label (succes)',
        removable: true
      }
    },
    {
      name: 'success compact',
      context: {
        status: 'success',
        label: 'Label (succes)',
        compact: true
      }
    },
    {
      name: 'warning',
      context: {
        status: 'warning',
        label: 'Label (waarschuwing)'
      }
    },
    {
      name: 'warning button',
      context: {
        status: 'warning',
        label: 'Label (waarschuwing)',
        removable: true
      }
    },
    {
      name: 'warning compact',
      context: {
        status: 'warning',
        label: 'Label (waarschuwing)',
        compact: true
      }
    },
    {
      name: 'danger',
      context: {
        status: 'danger',
        label: 'Label (fout)'
      }
    },
    {
      name: 'danger button',
      context: {
        status: 'danger',
        label: 'Label (fout)',
        removable: true
      }
    },
    {
      name: 'danger compact',
      context: {
        status: 'danger',
        label: 'Label (fout)',
        compact: true
      }
    },
    {
      name: 'bright',
      context: {
        status: 'bright',
        label: 'Label (helder)'
      }
    },
    {
      name: 'bright button',
      context: {
        status: 'bright',
        label: 'Label (helder)',
        removable: true
      }
    },
    {
      name: 'bright compact',
      context: {
        status: 'bright',
        label: 'Label (helder)',
        compact: true
      }
    },
    {
      name: 'bright symbol image',
      context: {
        status: 'bright',
        label: 'Met symbool (image)',
        symbol: symbolImage
      }
    },
    {
      name: 'bright button symbol image',
      context: {
        status: 'bright',
        label: 'Met symbool (image)',
        removable: true,
        symbol: symbolImage
      }
    },
    {
      name: 'bright compact symbol image',
      context: {
        status: 'bright',
        label: 'Met symbool (image)',
        compact: true,
        symbol: symbolImage
      }
    },
    {
      name: 'bright symbol color',
      context: {
        status: 'bright',
        label: 'Met symbool (color)',
        symbol: symbolColor
      }
    },
    {
      name: 'bright button symbol color',
      context: {
        status: 'bright',
        label: 'Met symbool (color)',
        removable: true,
        symbol: symbolColor
      }
    },
    {
      name: 'bright compact symbol color',
      context: {
        status: 'bright',
        label: 'Met symbool (color)',
        compact: true,
        symbol: symbolColor
      }
    },
    {
      name: 'default hover',
      context: {
        _ignore: true
      }
    },
    {
      name: 'default button hover',
      context: {
        status: 'default',
        label: 'Hover',
        removable: true,
        hover: true
      }
    }
  ]
};
