import { bindTemplate, componentArgs, createStories, StorybookParameters } from '../../storybook';

import { NavbarArgs, navbarArgsMapper, navbarArgTypes } from './navbar.args';
import { Navbar } from './navbar.models';

export interface NavbarParameters<TemplateFnReturnType> {
  navbarTemplate: (navbarProperties: Navbar) => TemplateFnReturnType;
}

export function storiesOfNavbar<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    navbarTemplate
  }: NavbarParameters<TemplateFnReturnType>
) {
  const stories = createStories('Navbar', parameters, navbarArgTypes)
    .addParameters({
      args: componentArgs<NavbarArgs>({
        open: false,
        modifier: '',
        items: []
      })
    });

  const template = bindTemplate(navbarArgsMapper, navbarTemplate);

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
}
