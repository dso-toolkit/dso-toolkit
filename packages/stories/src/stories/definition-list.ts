import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface Definition {
  term: string;
  descriptions: string[];
}

export interface DefinitionListArgs {
  modifier?: string;
  definitions: Definition[];
}

export interface DefinitionListTemplateFn<TemplateFnReturnType> extends TemplateFn<DefinitionListArgs, TemplateFnReturnType> {
}

export interface DefinitionListParameters<TemplateFnReturnType> extends Parameters<DefinitionListArgs, TemplateFnReturnType> {
}

const definitions: Definition[] = [
  {
    term: 'Thema',
    descriptions: [
      'Wonen',
      'Werken'
    ]
  },
  {
    term: 'Regelkwalificatie',
    descriptions: [
      'Instructieregels'
    ]
  },
  {
    term: 'Onderwerp',
    descriptions: [
      'Bedrijventerrein'
    ]
  },
  {
    term: 'Functie',
    descriptions: [
      'Bedrijventerrein > Bedrijventerrein'
    ]
  },
  {
    term: 'Type regel',
    descriptions: [
      'Bindend voor bestuursorganen'
    ]
  },
  {
    term: 'Normadressaat',
    descriptions: [
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
      '<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
    ]
  },
  {
    term: 'Pneumonoultramicroscopicsilicovolcanoconiosisfantasismus',
    descriptions: [
      '<p>Een factitious (quasi-fictieve) vorm van pneumoconiose (stoflongen), veroorzaakt door het inademen van microscopisch kleine silicadeeltjes uit vulkanen.</p>'
    ]
  },
  {
    term: 'De stoflongziekte (mijnwerkers-pneumoconiose)',
    descriptions: [
      '<p>Veroorzaakt door lange blootstelling aan kolengruis.</p>'
    ]
  },
  {
    term: 'Pneumoconiose',
    descriptions: [
      '<p>Pneumoconiose of stoflong is een longaandoening die door de inhalatie van stof wordt veroorzaakt.</p>'
    ]
  }
];

const columnDefinitions: Definition[] = [
  {
    term: 'Verzoek 1',
    descriptions: [
      'Aanleg rondweg Leiden traject Rijnland route 1'
    ]
  },
  {
    term: 'Verzoeknummer',
    descriptions: [
      '20181024 00729 000'
    ]
  },
  {
    term: 'Datum ingediend',
    descriptions: [
      '24/10/2018'
    ]
  },
  {
    term: 'Ingediend bij',
    descriptions: [
      'Gemeente Den Haag'
    ]
  },
  {
    term: 'Uw verzoek wordt behandeld door',
    descriptions: [
      'Omgevingsdienst Haaglanden'
    ]
  }
];

const smallContentDefinitions: Definition[] = [
  {
    term: 'Organisator',
    descriptions: [
      'Gemeente Rotterdam'
    ]
  },
  {
    term: 'Verzoeknummer',
    descriptions: [
      '12123497987'
    ]
  },
  {
    term: 'Status',
    descriptions: [
      'Open'
    ]
  },
  {
    term: 'Creatiedatum',
    descriptions: [
      '17-12-2019'
    ]
  },
  {
    term: 'Contactpersoon',
    descriptions: [
      'Jan van Veen'
    ]
  },
  {
    term: 'Emailadres',
    descriptions: [
      'j.veen@testmail.nl'
    ]
  },
  {
    term: 'Telefoonnummer',
    descriptions: [
      '06-12345678'
    ]
  }
];

export function storiesOfDefinitionList<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: DefinitionListParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Definition List', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        definitions
      },
      argTypes: {
        definitions: {
          control: {
            disable: true
          }
        }
      }
    });

  stories.add(
    'default',
    bindTemplate(template)
  );

  stories.add(
    'vertical',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-vertical'
      }
    }
  );

  stories.add(
    'emphasize description',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-emphasize-description'
      }
    }
  );

  stories.add(
    'vertical with emphasized description',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-vertical dso-emphasize-description'
      }
    }
  );

  stories.add(
    'columns 1-3',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns-1-3 dso-with-header',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'columns 2-2',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns-2-2 dso-with-header',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'columns 3-1',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns-3-1',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'two columns small-content',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns dso-2-columns',
        definitions: smallContentDefinitions
      }
    }
  );

  stories.add(
    'two columns',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns dso-2-columns'
      }
    }
  );

  stories.add(
    'three columns small-content',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns dso-3-columns',
        definitions: smallContentDefinitions
      }
    }
  );

  stories.add(
    'three columns',
    bindTemplate(template),
    {
      args: {
        modifier: 'dso-columns dso-3-columns'
      }
    }
  );
}
