import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { NavbarArgs, navbarArgsMapper, navbarArgTypes } from './navbar.args';
import { Navbar } from './navbar.models';

export interface NavbarParameters<TemplateFnReturnType> {
  navbarTemplate: (navbarProperties: Navbar) => TemplateFnReturnType;
}

export function storiesOfNavbar<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    navbarTemplate
  }: NavbarParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(navbarArgsMapper, navbarTemplate);

  const stories = storiesOf('Navbar', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: navbarArgTypes,
      args: componentArgs<NavbarArgs>({
        open: false,
        modifier: '',
        items: []
      })
    });

  stories.add(
    'primary',
    template,
    {
      args: componentArgs<Pick<NavbarArgs, 'modifier' | 'items'>>({
        modifier: 'main',
        items: [
          {
            label: 'Home',
            active: true
          },
          {
            label: 'Vergunningcheck'
          },
          {
            label: 'Aanvragen'
          },
          {
            label: 'Regels op de kaart'
          },
          {
            label: 'Mijn Omgevingsloket'
          }
        ]
      })
    }
  );

  stories.add(
    'secondary',
    template,
    {
      args: componentArgs<Pick<NavbarArgs, 'modifier' | 'items'>>({
        modifier: 'sub',
        items: [
          {
            label: 'Deze locatie',
            active: true
          },
          {
            label: 'Regels'
          },
          {
            label: 'Overige informatie'
          }
        ]
      })
    }
  );
}
