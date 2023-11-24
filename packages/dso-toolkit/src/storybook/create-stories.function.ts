import { compiler } from "markdown-to-jsx";

import { StorybookParameters } from "./storybook-parameters.interface.js";

export function createStories(
  name: string,
  { storiesOf, readme, module: mainModule, root, storyApiOptions }: StorybookParameters,
) {
  const stories = storiesOf(root ? `${root}/${name}` : name, mainModule).addParameters({
    docs: {
      page: () => compiler(readme, { forceBlock: true }),
    },
  });

  const { decorators, parameters } = { decorators: [], parameters: [], ...storyApiOptions };

  for (const decorator of decorators) {
    stories.addDecorator(decorator);
  }

  for (const parameter of parameters) {
    stories.addParameters(parameter);
  }

  return stories;
}
