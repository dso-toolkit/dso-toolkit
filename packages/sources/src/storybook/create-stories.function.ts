import { ArgTypes } from './arg-types.type';
import { StorybookParameters } from './storybook-parameters.interface';

export function createStories<ComponentArgs>(
  name: string,
  { storiesOf, readme, module: mainModule, root }: StorybookParameters,
  argTypes?: ArgTypes<ComponentArgs>, // DO NOT MERGE
) {
  const stories = storiesOf(root ? `${root}/${name}` : name, mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  // REMOVE -- DO NOT MERGE
  if (argTypes) {
    stories.addParameters({
      argTypes
    });
  }
  // END REMOVE

  return stories;
}
