import { Args, StoryApi } from '@storybook/addons';

import { TemplateContainer } from '../template-container';

import { createStories } from './create-stories.function';
import { StorybookParameters } from './storybook-parameters.interface';

export function storiesOfFactory<StoryTemplates, StoryArgs, StoryParameters = undefined>(
  name: string,
  factory: (
    stories: StoryApi,
    templateMapper: <StoryVariantArgs = StoryArgs>(cb: (args: StoryVariantArgs, storyTemplates: StoryTemplates) => StoryApi) => (args: Args, context: any) => void,
    ...storyParameters: (StoryParameters extends undefined ? [undefined?] : [StoryParameters])
  ) => void
) {
  return <Implementation, Templates, TemplateFnReturnType>(
    parameters: StorybookParameters,
    templateContainer: TemplateContainer<Implementation, Templates, TemplateFnReturnType>,
    storyTemplates: ((templates: Templates, allTemplates: Templates) => StoryTemplates),
    ...storyParameters: (StoryParameters extends undefined ? [undefined?] : [StoryParameters])
  ) => {
    const stories = createStories(name, parameters);

    const preferredImplementation = parameters.root === 'Core' ? 'core' : 'css';

    const implementations = templateContainer.getImplementationTypes();
    if (implementations.length > 99) { // insert condition for example pages only
      stories.addParameters({
        argTypes: {
          preferredImplementation: {
            options: implementations,
            control: {
              type: 'select'
            },
            table: {
              category: 'Settings'
            }
          }
        },
        args: {
          preferredImplementation
        }
      });
    }

    factory(
      stories,
      mapper => a => {
        // misschien fuseren met TemplateContainer.fromArgs() ?
        const { preferredImplementation } = a;
        const args = { ...a };
        delete args.preferredImplementation;

        const templates = templateContainer.render(preferredImplementation ?? (parameters.root === 'Core' ? 'core' : 'css'));

        return mapper(args as any, storyTemplates(templates, templates));
      },
      ...storyParameters
    );
  }
}
