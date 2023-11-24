import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { NavbarArgs, navbarArgsMapper, navbarArgTypes } from "./navbar.args.js";
import { Navbar } from "./navbar.models.js";

export interface NavbarTemplates<TemplateFnReturnType> {
  navbarTemplate: (navbarProperties: Navbar<TemplateFnReturnType>) => TemplateFnReturnType;
  extension: TemplateFnReturnType;
}

export function storiesOfNavbar<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    NavbarTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Navbar", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: navbarArgTypes,
      args: componentArgs<Omit<NavbarArgs, "extension" | "extensionOpen" | "dsoExtensionToggle">>({
        open: false,
        modifier: "",
        items: [],
      }),
    });

    const template = templateMapper<NavbarArgs>((args, { navbarTemplate }) => navbarTemplate(navbarArgsMapper(args)));

    stories.add("primary", template, {
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
    });

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

    stories.add("secondary", template, {
      args: secondaryArgs,
    });

    stories.add(
      "with extension",
      templateMapper<NavbarArgs>((args, { navbarTemplate, extension }) =>
        navbarTemplate(navbarArgsMapper(args, extension)),
      ),
      {
        args: {
          ...secondaryArgs,
          extensionOpen: true,
        },
      },
    );

    return stories;
  });
}
