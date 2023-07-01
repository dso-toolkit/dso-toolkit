import { Addon_StoryFn } from "@storybook/types";

export interface BaseComponentImplementation<
  Model,
  Implementation,
  Templates,
  TemplateFnReturnType,
  TemplateFunction = DefaultTemplateFunction<Model, TemplateFnReturnType>
> {
  component: string;
  implementation: Implementation;
  template(templates: Templates): TemplateFunction;
}

export interface DefaultTemplateFunction<Model, TemplateFnReturnType> {
  (model: Model): TemplateFnReturnType;
}

export type ComponentsToTemplates<Components, TemplateFnReturnType> = {
  [P in keyof Components & string as `${P}Template`]: DefaultTemplateFunction<Components[P], TemplateFnReturnType>;
};

export interface Options {
  getNameByKind?(kind: string): string | undefined;
}

export class TemplateContainer<
  Implementation,
  Templates,
  TemplateFnReturnType,
  TemplateFunction = DefaultTemplateFunction<never, TemplateFnReturnType>
> {
  private getNameByKind: Options["getNameByKind"] | undefined;

  private componentImplementations: BaseComponentImplementation<
    never,
    Implementation,
    Templates,
    TemplateFnReturnType,
    TemplateFunction
  >[] = [];

  constructor(options?: Options) {
    this.getNameByKind = options?.getNameByKind;
  }

  add<Model>(
    componentImplementation: BaseComponentImplementation<
      Model,
      Implementation,
      Templates,
      TemplateFnReturnType,
      TemplateFunction
    >
  ) {
    this.componentImplementations.push(componentImplementation);
  }

  getImplementationTypes(): Implementation[] {
    return this.componentImplementations.reduce<Implementation[]>(
      (types, componentImplementation) =>
        types.includes(componentImplementation.implementation)
          ? types
          : [...types, componentImplementation.implementation],
      []
    );
  }

  fromArgs<StoryArgs>(
    mapper: (args: StoryArgs, templates: Templates) => TemplateFnReturnType
  ): Addon_StoryFn<TemplateFnReturnType> {
    return (a, context) => {
      const { preferredImplementation } = a;
      const args = { ...a };
      delete args["preferredImplementation"];

      return mapper(args as StoryArgs, this.create(preferredImplementation, context.kind));
    };
  }

  create(preferredImplementation: Implementation | undefined, kind: string): Templates {
    const container = this.componentImplementations.reduce<
      Templates & { [key: string]: BaseComponentImplementation<never, Implementation, Templates, TemplateFnReturnType> }
    >((templates, { component, implementation, template }) => {
      const functionName = `${component}Template`;

      if (
        !templates[functionName] &&
        ((preferredImplementation ?? this.getNameByKind?.(kind)) === implementation ||
          this.componentImplementations.filter(({ component: c }) => component === c).length === 1)
      ) {
        Object.defineProperty(templates, functionName, { get: () => template(templates) });
      }

      return templates;
    }, {} as never);

    return container;
  }
}
