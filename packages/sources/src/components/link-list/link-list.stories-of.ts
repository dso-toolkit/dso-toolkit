import { Args } from '@storybook/addons';
import { ArgsError, bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { LinkListArgs, linkListArgsMapper, linkListArgTypes } from './link-list.args';
import { links, navLinks } from './link-list.content';
import { LinkList, LinkListType } from './link-list.models';

export interface LinkListParameters<TemplateFnReturnType> {
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

export function storiesOfLinkList<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    linkListTemplate,
    inHighlightBoxTemplate,
    inFooterTemplate
  }: LinkListParameters<TemplateFnReturnType>
) {
  const stories = createStories('Link List', parameters, linkListArgTypes)
    .addParameters({
      args: {
        links
      }
    });

  const template = bindTemplate(linkListArgsMapper, linkListTemplate);

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
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as LinkListArgs;

      return inHighlightBoxTemplate(linkListTemplate(linkListArgsMapper(args)));
    }
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
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as LinkListArgs;
      return inFooterTemplate(linkListTemplate(linkListArgsMapper(args)));
    }
  );
}