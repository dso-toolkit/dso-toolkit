import { ClientStoryApi } from '@storybook/addons';

/**
 * Interface which stories need to extend and every component then implements.
 * 
 * The extended interface describes the template function that Storybook will use to render the stories.
 */
 export interface TemplateFn<ComponentArgs, TemplateFnReturnType> {
  (args: ComponentArgs): TemplateFnReturnType;
}

/**
 * Interface which stories need to extend and every component then implements.
 * 
 * The extended interface describes the parameters needed for Storybook to create the stories.
 */
export interface Parameters<ComponentArgs, TemplateFnReturnType> {
  template: TemplateFn<ComponentArgs, TemplateFnReturnType>;
  module: NodeModule;
  storiesOf: ClientStoryApi<TemplateFnReturnType>['storiesOf'];
  readme: string;
}
