import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { DefinitionListArgs, definitionListArgTypes, definitionListArgsMapper } from "./definition-list.args.js";
import { Definition, DefinitionList } from "./definition-list.models.js";

type DefinitionListStory = StoryObj<DefinitionListArgs, Renderer>;

interface DefinitionListStories {
  Default: DefinitionListStory;
  Vertical: DefinitionListStory;
  EmphasizeDescription: DefinitionListStory;
  VerticalWithEmphasizeDescription: DefinitionListStory;
  ColumnVariantOneThree: DefinitionListStory;
  ColumnVariantTwoTwo: DefinitionListStory;
  ColumnVariantThreeOne: DefinitionListStory;
  TwoColumnsSmall: DefinitionListStory;
  TwoColumns: DefinitionListStory;
  ThreeColumnsSmall: DefinitionListStory;
  ThreeColumns: DefinitionListStory;
  Bordered: DefinitionListStory;
  ColumnsList: DefinitionListStory;
}

interface DefinitionListStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DefinitionListTemplates<TemplateFnReturnType>
  > {}

interface DefinitionListTemplates<TemplateFnReturnType> {
  definitionListTemplate: (definitionListProperties: DefinitionList<TemplateFnReturnType>) => TemplateFnReturnType;
  definitions: Definition<TemplateFnReturnType>[];
  definitionsSrOnlyColon: Definition<TemplateFnReturnType>[];
  columnDefinitions: Definition<TemplateFnReturnType>[];
  smallContentDefinitions: Definition<TemplateFnReturnType>[];
  listDefinitions: Definition<TemplateFnReturnType>[];
}

export function definitionListMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  DefinitionListArgs
> {
  return {
    argTypes: definitionListArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function definitionListStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: DefinitionListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DefinitionListStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    },
    Vertical: {
      args: {
        modifier: "dso-vertical",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    },
    EmphasizeDescription: {
      args: {
        modifier: "dso-emphasize-description",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    },
    VerticalWithEmphasizeDescription: {
      args: {
        modifier: "dso-vertical dso-emphasize-description",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    },
    ColumnVariantOneThree: {
      args: {
        modifier: "dso-columns-1-3 dso-with-header",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, columnDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
      ),
    },
    ColumnVariantTwoTwo: {
      args: {
        modifier: "dso-columns-2-2 dso-with-header",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, columnDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
      ),
    },
    ColumnVariantThreeOne: {
      args: {
        modifier: "dso-columns-3-1",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, columnDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
      ),
    },
    TwoColumnsSmall: {
      args: {
        modifier: "dso-columns dso-2-columns",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, smallContentDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions)),
      ),
    },
    TwoColumns: {
      args: {
        modifier: "dso-columns dso-2-columns",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    },
    ThreeColumnsSmall: {
      args: {
        modifier: "dso-columns dso-3-columns",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, smallContentDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions)),
      ),
    },
    ThreeColumns: {
      args: {
        modifier: "dso-columns dso-3-columns",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitions)),
      ),
    },
    Bordered: {
      args: {
        modifier: "dso-bordered",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, definitionsSrOnlyColon }) =>
        definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon)),
      ),
    },
    ColumnsList: {
      args: {
        modifier: "dso-columns-list",
      },
      render: templateContainer.render(storyTemplates, (args, { definitionListTemplate, listDefinitions }) =>
        definitionListTemplate(definitionListArgsMapper(args, listDefinitions)),
      ),
    },
  };
}
