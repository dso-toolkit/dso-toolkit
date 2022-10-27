import { StorybookParameters } from './storybook-parameters.interface';

export function createStories(
  name: string,
  { storiesOf, readme, module: mainModule, root }: StorybookParameters
) {
  const stories = storiesOf(root ? `${root}/${name}` : name, mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  return stories;
}
