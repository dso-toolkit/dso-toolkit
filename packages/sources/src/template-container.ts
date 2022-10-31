import { Args } from "@storybook/addons";

export interface BaseComponentImplementation<Model, Implementation, Templates, TemplateFnReturnType> {
  component: string;
  implementation: Implementation;
  template(templates: Templates): TemplateFunction<Model, TemplateFnReturnType>;
}

export interface TemplateFunction<Model, TemplateFnReturnType> {
  (model: Model): TemplateFnReturnType;
}

export type ComponentsToTemplates<Components, TemplateFnReturnType> = {
  [P in keyof Components & string as `${P}Template`]: TemplateFunction<Components[P], TemplateFnReturnType>;
};

export class TemplateContainer<Implementation, Templates, TemplateFnReturnType> {
  private componentImplementations: BaseComponentImplementation<
    never,
    Implementation,
    Templates,
    TemplateFnReturnType
  >[] = [];

  add<Model>(
    componentImplementation: BaseComponentImplementation<Model, Implementation, Templates, TemplateFnReturnType>
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

  fromArgs<StoryArgs>(mapper: (args: StoryArgs, templates: Templates) => TemplateFnReturnType) {
    return (a: Args) => {
      const { preferredImplementation } = a;
      const args = { ...a };
      delete args.preferredImplementation;

      return mapper(args as StoryArgs, this.render(preferredImplementation ?? "css"));
    };
  }

  render(preferredImplementation: Implementation | undefined): Templates {
    const container = this.componentImplementations.reduce<
      Templates & { [key: string]: BaseComponentImplementation<never, Implementation, Templates, TemplateFnReturnType> }
    >((templates, { component, implementation, template }) => {
      const functionName = `${component}Template`;

      if (
        !templates[functionName] &&
        (preferredImplementation === implementation ||
          this.componentImplementations.filter(({ component: c }) => component === c).length === 1)
      ) {
        Object.defineProperty(templates, functionName, { get: () => template(templates) });
      }

      return templates;
    }, {} as never);

    return container;
  }
}
