import { Args, ArgsStoryFn, Renderer, StoryAnnotations } from "@storybook/types";

export type StoryObj<TArgs, TRenderer extends Renderer> = StoryAnnotations<TRenderer, TArgs>;

export interface StoriesParameters<Implementation, Templates, TemplateFnReturnType, StoryTemplates> {
  templateContainer: TemplateContainer<Implementation, Templates, TemplateFnReturnType>;
  storyTemplates: (templates: Templates) => StoryTemplates;
}

export interface BaseComponentImplementation<
  Model,
  Implementation,
  Templates,
  TemplateFnReturnType,
  TemplateFunction = DefaultTemplateFunction<Model, TemplateFnReturnType>,
> {
  component: string;
  implementation: Implementation;
  template(templates: Templates): TemplateFunction;
}

export type SlottableTemplate = {
  slotName?: string;
};

export interface DefaultTemplateFunction<Model, TemplateFnReturnType> {
  (model: Model & SlottableTemplate): TemplateFnReturnType;
}

export type ComponentsToTemplates<Components, TemplateFnReturnType> = {
  [P in keyof Components & string as `${P}Template`]: DefaultTemplateFunction<Components[P], TemplateFnReturnType>;
};

export interface Options {
  getNameByTitle?(title: string): string | undefined;
}

export class TemplateContainer<
  Implementation,
  Templates,
  TemplateFnReturnType,
  TemplateFunction = DefaultTemplateFunction<never, TemplateFnReturnType>,
> {
  private getNameByTitle: Options["getNameByTitle"] | undefined;

  private componentImplementations: BaseComponentImplementation<
    never,
    Implementation,
    Templates,
    TemplateFnReturnType,
    TemplateFunction
  >[] = [];

  constructor(options?: Options) {
    this.getNameByTitle = options?.getNameByTitle;
  }

  add<Model>(
    componentImplementation: BaseComponentImplementation<
      Model,
      Implementation,
      Templates,
      TemplateFnReturnType,
      TemplateFunction
    >,
  ) {
    this.componentImplementations.push(componentImplementation);
  }

  getImplementationTypes(): Implementation[] {
    return this.componentImplementations.reduce<Implementation[]>(
      (types, componentImplementation) =>
        types.includes(componentImplementation.implementation)
          ? types
          : [...types, componentImplementation.implementation],
      [],
    );
  }

  render<StoryTemplates, TRenderer extends Renderer, TArgs extends Args>(
    storyTemplates: (templates: Templates) => StoryTemplates,
    callback: (args: TArgs, storyTemplates: StoryTemplates) => TemplateFnReturnType,
  ): ArgsStoryFn<TRenderer, TArgs & { preferredImplementation?: Implementation }> {
    return (a, context) => {
      const { preferredImplementation } = a;
      const args = { ...a };
      delete args.preferredImplementation;

      const templates = this.create(preferredImplementation, context.title);

      return callback(args, storyTemplates(templates));
    };
  }

  create(preferredImplementation: Implementation | undefined, title: string): Templates {
    const container = this.componentImplementations.reduce<
      Templates & { [key: string]: BaseComponentImplementation<never, Implementation, Templates, TemplateFnReturnType> }
    >((templates, { component, implementation, template }) => {
      const functionName = `${component}Template`;

      if (
        !templates[functionName] &&
        ((preferredImplementation ?? this.getNameByTitle?.(title)) === implementation ||
          this.componentImplementations.filter(({ component: c }) => component === c).length === 1)
      ) {
        Object.defineProperty(templates, functionName, { get: () => template(templates) });
      }

      return templates;
    }, {} as never);

    return container;
  }
}
