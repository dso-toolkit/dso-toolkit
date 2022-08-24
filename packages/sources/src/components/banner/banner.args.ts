import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../storybook';

import { Banner } from './banner.models';

export interface BannerArgs<TemplateFnReturnType> {
  status: string;
  richContent: TemplateFnReturnType;
  onClick: HandlerFunction;
}

export const bannerArgTypes: ArgTypes<BannerArgs<unknown>> = {
  richContent: {
    control: {
      disable: true
    }
  },
  status: {
    options: ['warning', 'danger'],
    control: {
      type: 'select'
    }
  },
  onClick: {
    action: 'closed'
  }
};

export function bannerArgsMapper(a: BannerArgs<any>): Banner<any> {
  return {
    onClick: (e: Event) => a.onClick(e),
    richContent: a.richContent,
    status: a.status
  };
}
