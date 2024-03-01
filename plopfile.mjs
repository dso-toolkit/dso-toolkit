import * as prettier from "prettier";

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
        templateFile: "plop-templates/storybook-boilerplate/component.args.ts.hbs",
        path: "packages/dso-toolkit/src/components/{{ kebabCase name }}/{{ kebabCase name }}.args.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.models.ts.hbs",
        path: "packages/dso-toolkit/src/components/{{ kebabCase name }}/{{ kebabCase name }}.models.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.stories-of.ts.hbs",
        path: "packages/dso-toolkit/src/components/{{ kebabCase name }}/{{ kebabCase name }}.stories-of.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/index.ts.hbs",
        path: "packages/dso-toolkit/src/components/{{ kebabCase name }}/index.ts",
      },
      {
        type: "modify",
        path: "packages/dso-toolkit/src/index.ts",
        transform: async (fileContent, data) => {
          const lines = new Lines(fileContent);

          lines.insert(1, plop.renderString('export * from "./components/{{ kebabCase name }}";', data));

          return await lines.toString("packages/dso-toolkit/src/index.ts");
        },
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.core-stories.ts.hbs",
        path: "storybook/src/components/{{ kebabCase name }}/{{ kebabCase name }}.core-stories.ts",
      },
      {
        type: "add",
        templateFile: "plop-templates/storybook-boilerplate/component.core-template.ts.hbs",
        path: "storybook/src/components/{{ kebabCase name }}/{{ kebabCase name }}.core-template.ts",
      },
      {
        type: "modify",
        path: "storybook/src/templates.ts",
        transform: async (fileContent, data) => {
          const lines = new Lines(fileContent);

          lines.add("named template model imports", plop.renderString("{{ pascalCase name }},", data));
          lines.add(
            "import templates",
            plop.renderString(
              'import { core{{ pascalCase name }} } from "./components/{{ kebabCase name }}/{{ kebabCase name }}.core-template";',
              data,
            ),
          );
          lines.add("Components interface", plop.renderString("{{ camelCase name }}: {{ pascalCase name }};", data));
          lines.add(
            "add templates to container",
            plop.renderString("templateContainer.add(core{{ pascalCase name }});", data),
          );

          return await lines.toString("storybook/src/templates.ts");
        },
      },
    ],
  });
}

class Lines {
  constructor(contents) {
    this.contents = contents.split("\n");
  }

  add(section, item) {
    const { before, items, after } = getLines(this.contents, section);

    if (items.every((i) => !i.includes(item))) {
      items.push(item);
    }

    items.sort((a, b) => a.trim().localeCompare(b.trim()));

    this.contents = [...before, ...items, ...after];
  }

  insert(index, item) {
    this.contents.splice(index, 0, item);
  }

  async toString(filepath) {
    return prettier.format(this.contents.join("\n"), {
      ...(await prettier.resolveConfig(filepath)),
      filepath,
    });
  }
}

function getLines(lines, section) {
  const start = lines.findIndex((line) => line.includes(`// Start: ${section}`));
  const end = lines.slice(start).findIndex((line) => line.includes(`// End: ${section}`));

  if (start === -1 || end === -1) {
    throw new Error(`Section "${section}" not found`);
  }

  return {
    before: lines.slice(0, start + 1),
    items: lines.slice(start + 1, start + end),
    after: lines.slice(start + end),
  };
}
