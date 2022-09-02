import { bindTemplate, componentArgs, createStories, StorybookParameters } from '../../storybook';

import { WhiteboxArgs, whiteboxArgsMapper, whiteboxArgTypes } from './whitebox.args';
import { Whitebox } from './whitebox.models';

export interface WhiteboxParameters<TemplateFnReturnType> {
  whiteboxTemplate: (whiteboxProperties: Whitebox) => TemplateFnReturnType;
}

export function storiesOfWhitebox<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    whiteboxTemplate
  }: WhiteboxParameters<TemplateFnReturnType>
) {
  type ComponentArgs = Pick<WhiteboxArgs, 'title' | 'description' | 'label' | 'imageSource' | 'imageAlt'>;
  const stories = createStories('Whitebox', parameters, whiteboxArgTypes)
    .addParameters({
      args: componentArgs<ComponentArgs>({
        title: 'Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.',
        description: 'Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?',
        label: 'Direct naar aanvragen',
        imageSource: 'images/indienen.png',
        imageAlt: 'Indienen'
      })
    });

  const template = bindTemplate(whiteboxArgsMapper, whiteboxTemplate);

  stories.add(
    'default',
    template
  );

  type WithCounterArgs = Pick<WhiteboxArgs, 'count'>;

  stories.add(
    'with counter',
    template,
    {
      args: componentArgs<WithCounterArgs>({
        count: 3
      })
    }
  );

  type WithIconArgs = Pick<WhiteboxArgs, 'icon' | 'iconLabel'>;

  stories.add(
    'with icon',
    template,
    {
      args: componentArgs<WithIconArgs>({
        icon: 'check',
        iconLabel: 'afgerond'
      })
    }
  );
}
