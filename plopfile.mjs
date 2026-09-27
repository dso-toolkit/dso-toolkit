export default function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator("new-stencil-component", {
    description: "Create a new Stencil Component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        templateFile: "plop-templates/new-stencil-component/stencil-component.tsx.hbs",
        path: "packages/core/src/components/{{ kebabCase name }}/{{ kebabCase name }}.tsx",
      },
      {
        type: "add",
        templateFile: "plop-templates/new-stencil-component/stencil-component.interfaces.ts.hbs",
        path: "packages/core/src/components/{{ kebabCase name }}/{{ kebabCase name }}.interfaces.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/new-stencil-component/stencil-component.i18n.ts.hbs",
        path: "packages/core/src/components/{{ kebabCase name }}/{{ kebabCase name }}.i18n.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/new-stencil-component/stencil-component.scss.hbs",
        path: "packages/core/src/components/{{ kebabCase name }}/{{ kebabCase name }}.scss",
      },
      {
        type: "add",
        templateFile: "plop-templates/new-stencil-component/readme.md.hbs",
        path: "packages/core/src/components/{{ kebabCase name }}/readme.md",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.models.ts.hbs",
        path: "storybook/src/components/{{ kebabCase name }}/{{ kebabCase name }}.models.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.args.ts.hbs",
        path: "storybook/src/components/{{ kebabCase name }}/{{ kebabCase name }}.args.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.template.ts.hbs",
        path: "storybook/src/components/{{ kebabCase name }}/{{ kebabCase name }}.template.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.stories.ts.hbs",
        path: "storybook/src/components/{{ kebabCase name }}/{{ kebabCase name }}.stories.ts",
      },
    ],
  });
}
