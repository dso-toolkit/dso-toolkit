import { ArgTypes } from './arg-types.type';
import { StorybookParameters } from './storybook-parameters.interface';

export function createStories<ComponentArgs>(
  name: string,
  {
    module: mainModule,
    storiesOf,
    readme,
    root
  }: StorybookParameters,
  argTypes: ArgTypes<ComponentArgs>
) {
  const stories = storiesOf(root ? `${root}/${name}` : name, mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes
    });

  return stories;
}
