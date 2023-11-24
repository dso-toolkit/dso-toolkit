import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { DefinitionListArgs, definitionListArgsMapper, definitionListArgTypes } from "./definition-list.args.js";
import { Definition, DefinitionList } from "./definition-list.models.js";

export interface DefinitionListTemplates<TemplateFnReturnType> {
  definitionListTemplate: (definitionListProperties: DefinitionList<TemplateFnReturnType>) => TemplateFnReturnType;
  definitions: Definition<TemplateFnReturnType>[];
  definitionsSrOnlyColon: Definition<TemplateFnReturnType>[];
  columnDefinitions: Definition<TemplateFnReturnType>[];
  smallContentDefinitions: Definition<TemplateFnReturnType>[];
  listDefinitions: Definition<TemplateFnReturnType>[];
}

export function storiesOfDefinitionList<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DefinitionListTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Definition List", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: definitionListArgTypes,
    });

    stories.add(
      "default",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    );

    stories.add(
      "vertical",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
      {
        args: {
          modifier: "dso-vertical",
        },
      },
    );

    stories.add(
      "emphasize description",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
      {
        args: {
          modifier: "dso-emphasize-description",
        },
      },
    );

    stories.add(
      "vertical with emphasized description",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
      {
        args: {
          modifier: "dso-vertical dso-emphasize-description",
        },
      },
    );

    stories.add(
      "columns 1-3",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, columnDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
      ),
      {
        args: {
          modifier: "dso-columns-1-3 dso-with-header",
        },
      },
    );

    stories.add(
      "columns 2-2",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, columnDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
      ),
      {
        args: {
          modifier: "dso-columns-2-2 dso-with-header",
        },
      },
    );

    stories.add(
      "columns 3-1",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, columnDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
      ),
      {
        args: {
          modifier: "dso-columns-3-1",
        },
      },
    );

    stories.add(
      "two columns small-content",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, smallContentDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions)),
      ),
      {
        args: {
          modifier: "dso-columns dso-2-columns",
        },
      },
    );

    stories.add(
      "two columns",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
      {
        args: {
          modifier: "dso-columns dso-2-columns",
        },
      },
    );

    stories.add(
      "three columns small-content",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, smallContentDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions)),
      ),
      {
        args: {
          modifier: "dso-columns dso-3-columns",
        },
      },
    );

    stories.add(
      "three columns",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
      {
        args: {
          modifier: "dso-columns dso-3-columns",
        },
      },
    );

    stories.add(
      "bordered",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, definitionsSrOnlyColon }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon)),
      ),
      {
        args: {
          modifier: "dso-bordered",
        },
      },
    );

    stories.add(
      "columns list",
      templateMapper<DefinitionListArgs>((args, { definitionListTemplate, listDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, listDefinitions)),
      ),
      {
        args: {
          modifier: "dso-columns-list",
        },
      },
    );

    return stories;
  });
}
