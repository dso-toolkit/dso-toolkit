import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface Breadcrumb {
  label: string;
  url?: string;
}

export interface BreadcrumbsArgs {
  breadcrumbs: Breadcrumb[];
}

export interface BreadcrumbsTemplateFn<TemplateFnReturnType> extends TemplateFn<BreadcrumbsArgs, TemplateFnReturnType> {
}

export interface BreadcrumbsParameters<TemplateFnReturnType> extends Parameters<BreadcrumbsArgs, TemplateFnReturnType> {
}

export function storiesOfBreadcrumbs<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: BreadcrumbsParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Breadcrumb', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        breadcrumbs: {
          control: {
            disable: true
          }
        }
      }
    });

  const args: BreadcrumbsArgs = {
    breadcrumbs: [
      {
        label: 'Home',
        url: '#'
      },
      {
        label: 'Zelf aan de slag',
        url: '#'
      },
      {
        label: 'Inhoud'
      }
    ]
  };

  stories.add(
    'breadcrumb',
    bindTemplate(template),
    {
      args
    }
  );
}
