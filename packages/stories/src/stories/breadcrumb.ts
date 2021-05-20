import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface Breadcrumb {
  label: string;
  url?: string;
  position: number;
}

export interface BreadcrumbArgs {
  breadcrumbs: Breadcrumb[];
}

export interface BreadcrumbTemplateFn<TemplateFnReturnType> extends TemplateFn<BreadcrumbArgs, TemplateFnReturnType> {
}

export interface BreadcrumbParameters<TemplateFnReturnType> extends Parameters<BreadcrumbArgs, TemplateFnReturnType> {
}

export function storiesOfBreadcrumb<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: BreadcrumbParameters<TemplateFnReturnType>) {
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

  const args: BreadcrumbArgs = {
    breadcrumbs: [
      {
        label: 'Home',
        url: '#',
        position: 1
      },
      {
        label: 'Zelf aan de slag',
        url: '#',
        position: 2
      },
      {
        label: 'Inhoud',
        position: 2
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
