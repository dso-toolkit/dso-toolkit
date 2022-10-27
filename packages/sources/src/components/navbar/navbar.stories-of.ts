import { componentArgs } from '../../storybook';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { NavbarArgs, navbarArgsMapper, navbarArgTypes } from './navbar.args';
import { Navbar } from './navbar.models';

export interface NavbarTemplates<TemplateFnReturnType> {
  navbarTemplate: (navbarProperties: Navbar) => TemplateFnReturnType;
}

export const storiesOfNavbar = storiesOfFactory<NavbarTemplates<any>, NavbarArgs>('Navbar', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: navbarArgTypes,
    args: componentArgs<NavbarArgs>({
      open: false,
      modifier: '',
      items: []
    })
  });

  const template = templateMapper((args, { navbarTemplate }) => navbarTemplate(navbarArgsMapper(args)));

  stories.add(
    'primary',
    template,
    {
      args: componentArgs<Pick<NavbarArgs, 'modifier' | 'items'>>({
        modifier: 'main',
        items: [
          {
            label: 'Home',
            active: true,
            href: '#'
          },
          {
            label: 'Vergunningcheck',
            href: '#'
          },
          {
            label: 'Aanvragen',
            href: '#'
          },
          {
            label: 'Regels op de kaart',
            href: '#'
          },
          {
            label: 'Mijn Omgevingsloket',
            href: '#'
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
            active: true,
            href: '#'
          },
          {
            label: 'Regels',
            href: '#'
          },
          {
            label: 'Overige informatie',
            href: '#'
          }
        ]
      })
    }
  );
});
