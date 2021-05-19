import { Parameters, TemplateFn } from '@core';

export interface HighlightBoxArgs<TemplateFnReturnType> {
  yellow: boolean;
  white: boolean;
  dropShadow: boolean;
  border: boolean;
  step?: number;
  icon?: string;
  richContent: TemplateFnReturnType;
}

export interface HighlightBoxTemplateFn<TemplateFnReturnType> extends TemplateFn<HighlightBoxArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface HighlightBoxParameters<TemplateFnReturnType> extends Parameters<HighlightBoxArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface HighlightBoxExtraParameters<TemplateFnReturnType> {
  richContent: TemplateFnReturnType;
}

export function storiesOfHighlightBox<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: HighlightBoxParameters<TemplateFnReturnType>, {
  richContent
}: HighlightBoxExtraParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Highlight Box', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        yellow: false,
        white: false,
        border: false,
        dropShadow: false,
        step: null,
        icon: null,
        richContent
      },
      argTypes: {
        yellow: {
          control: {
            type: 'boolean'
          }
        },
        white: {
          control: {
            type: 'boolean'
          }
        },
        dropShadow: {
          control: {
            type: 'boolean'
          }
        },
        border: {
          control: {
            type: 'boolean'
          }
        },
        step: {
          control: {
            type: 'number',
            min: 0
          }
        },
        icon: {
          control: {
            type: 'select',
            options: [undefined, 'plus', 'table']
          }
        }
      }
    });

  stories.add(
    'default',
    template as any
  );

  stories.add(
    'yellow',
    template as any,
    {
      args: {
        yellow: true
      }
    }
  );

  stories.add(
    'white with dropshadow',
    template as any,
    {
      args: {
        white: true,
        dropShadow: true
      }
    }
  );

  stories.add(
    'with border',
    template as any,
    {
      args: {
        border: true
      }
    }
  );

  stories.add(
    'with step',
    template as any,
    {
      args: {
        yellow: true,
        step: 2
      }
    }
  );

  stories.add(
    'with icon',
    template as any,
    {
      args: {
        yellow: true,
        icon: 'plus'
      }
    }
  );
}
