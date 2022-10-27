import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { LinkListArgs, linkListArgsMapper, linkListArgTypes } from './link-list.args';
import { links, navLinks } from './link-list.content';
import { LinkList, LinkListType } from './link-list.models';

export interface LinkListTemplates<TemplateFnReturnType> {
  linkListTemplate: (linkListProperties: LinkList) => TemplateFnReturnType;

  /**
   * Make sure to render the Link List in every variant:
   * * default (no arguments)
   * * `yellow`
   * * `border`
   * * `drop-shadow white`
   */
  inHighlightBoxTemplate: (linkList: TemplateFnReturnType) => TemplateFnReturnType;

  /**
   * Template to demonstrate the Link List inside footer
   */
  inFooterTemplate: (linkList: TemplateFnReturnType) => TemplateFnReturnType;
}

export const storiesOfLinkList = storiesOfFactory<LinkListTemplates<any>, LinkListArgs>('Link List', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: linkListArgTypes,
    args: {
      links
    }
  });

  const template = templateMapper((args, { linkListTemplate }) => linkListTemplate(linkListArgsMapper(args)));

  stories.add(
    'ul',
    template,
    {
      args: {
        type: LinkListType.Ul
      }
    }
  );

  stories.add(
    'ol',
    template,
    {
      args: {
        type: LinkListType.Ol
      }
    }
  );

  stories.add(
    'in highlight box',
    templateMapper((args, { inHighlightBoxTemplate, linkListTemplate }) => inHighlightBoxTemplate(linkListTemplate(linkListArgsMapper(args))))
  );

  stories.add(
    'in nav',
    template,
    {
      args: {
        links: navLinks,
        navLabel: 'Projecttaken',
        type: LinkListType.Ul
      }
    }
  );

  stories.add(
    'in footer',
    templateMapper((args, { inFooterTemplate, linkListTemplate }) => inFooterTemplate(linkListTemplate(linkListArgsMapper(args))))
  );
});
