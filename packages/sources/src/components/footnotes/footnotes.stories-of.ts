import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import {
  FootnotesExampleArgs,
  FootnotesReferenceArgs,
  FootnotesListArgs,
  footnotesExampleArgTypes,
  footnotesListArgsMapper,
  footnotesReferenceArgsMapper,
  footnotesListArgTypes,
  footnotesReferenceArgTypes,
} from "./footnotes.args";
import { footnotes } from "./footnotes.content";
import { Footnote } from "./footnotes.models";

export interface FootnotesTemplates<TemplateFnReturnType> {
  footnoteTemplate: (footnote: Footnote) => TemplateFnReturnType;
  footnotesTemplate: (footnotes: Footnote[]) => TemplateFnReturnType;
  footnotesExampleTemplate: (footnote14: Footnote, footnote15: Footnote, list: Footnote[]) => TemplateFnReturnType;
}

export function storiesOfFootnotes<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    FootnotesTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Footnotes", storiesOfArguments, (stories, templateMapper) => {
    stories.add(
      "example",
      templateMapper<FootnotesExampleArgs>((args, { footnotesExampleTemplate }) =>
        footnotesExampleTemplate(args.footnote14, args.footnote15, footnotes)
      ),
      {
        argTypes: footnotesExampleArgTypes,
        args: {
          footnote14: footnotes[0],
          footnote15: footnotes[1],
          footnotes,
        },
      }
    );

    stories.add(
      "reference",
      templateMapper<FootnotesReferenceArgs>((args, { footnoteTemplate: footnotesReferenceTemplate }) =>
        footnotesReferenceTemplate(footnotesReferenceArgsMapper(args))
      ),
      {
        argTypes: footnotesReferenceArgTypes,
        args: {
          label: footnotes[0].label,
          number: footnotes[0].number,
        },
      }
    );

    stories.add(
      "list",
      templateMapper<FootnotesListArgs>((args, { footnotesTemplate }) =>
        footnotesTemplate(footnotesListArgsMapper(args))
      ),
      {
        argTypes: footnotesListArgTypes,
        args: componentArgs<FootnotesListArgs>({
          footnotes,
        }),
      }
    );
  });
}
