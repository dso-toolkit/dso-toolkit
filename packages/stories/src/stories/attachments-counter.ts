import { TemplateFn, Parameters } from '@core';

export interface AttachmentsCounterArgs {
  count: number;
}

export interface AttachmentsCounterTemplateFn<TemplateFnReturnType> extends TemplateFn<AttachmentsCounterArgs, TemplateFnReturnType> {
}

export interface AttachmentsCounterParameters<TemplateFnReturnType> extends Parameters<AttachmentsCounterArgs, TemplateFnReturnType> {
}

export function storiesOfAttachmentsCounter<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: AttachmentsCounterParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Attachments Counter', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        count: {
          control: {
            type: 'number'
          }
        }
      }
    });

  stories.add(
    'Attachments Counter',
    template as any,
    {
      args: {
        count: 3
      }
    }
  );
}
