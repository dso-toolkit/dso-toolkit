import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { componentArgs } from "../../storybook/index.js";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { NavbarArgs, navbarArgTypes, navbarArgs, navbarArgsMapper } from "./navbar.args.js";
import { Navbar } from "./navbar.models.js";

type NavbarStory = StoryObj<NavbarArgs, Renderer>;

interface NavbarStories {
  Primary: NavbarStory;
  Secondary: NavbarStory;
  WithExtension: NavbarStory;
}

interface NavbarStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  NavbarTemplates<TemplateFnReturnType>
> {}

export interface NavbarTemplates<TemplateFnReturnType> {
  navbarTemplate: (navbarProperties: Navbar<TemplateFnReturnType>) => TemplateFnReturnType;
  extension: TemplateFnReturnType;
}

export function navbarMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  NavbarArgs
> {
  return {
    argTypes: navbarArgTypes,
    args: navbarArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function navbarStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: NavbarStoriesParameters<Implementation, Templates, TemplateFnReturnType>): NavbarStories {
  const render = templateContainer.render(storyTemplates, (args: NavbarArgs, { navbarTemplate }) =>
    navbarTemplate(navbarArgsMapper(args)),
  );

  const secondaryArgs = componentArgs<Pick<NavbarArgs, "modifier" | "items">>({
    modifier: "sub",
    items: [
      {
        label: "Deze locatie",
        active: true,
        href: "#",
      },
      {
        label: "Regels",
        href: "#",
      },
      {
        label: "Overige informatie",
        href: "#",
      },
    ],
  });

  return {
    Primary: {
      args: componentArgs<Pick<NavbarArgs, "modifier" | "items">>({
        modifier: "main",
        items: [
          {
            label: "Home",
            active: true,
            href: "#",
          },
          {
            label: "Vergunningcheck",
            href: "#",
          },
          {
            label: "Aanvragen",
            href: "#",
          },
          {
            label: "Regels op de kaart",
            href: "#",
          },
          {
            label: "Mijn Omgevingsloket",
            href: "#",
          },
        ],
      }),
      render,
    },
    Secondary: {
      args: secondaryArgs,
      render,
    },
    WithExtension: {
      args: {
        ...secondaryArgs,
        extensionOpen: true,
      },
      render: templateContainer.render(storyTemplates, (args: NavbarArgs, { navbarTemplate, extension }) =>
        navbarTemplate(navbarArgsMapper(args, extension)),
      ),
    },
  };
}
