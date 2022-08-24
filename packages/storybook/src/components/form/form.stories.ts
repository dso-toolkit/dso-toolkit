import { storiesOfForm } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { formGroupCheckboxesTemplate } from '@dso-toolkit/css/src/components/form/form-groups/checkboxes/form-group-checkboxes.template';
import { formGroupConfirmTemplate } from '@dso-toolkit/css/src/components/form/form-groups/confirm/form-group-confirm.template';
import { formGroupFilesTemplate } from '@dso-toolkit/css/src/components/form/form-groups/files/form-group-files.template';
import { formGroupInputTemplate } from '@dso-toolkit/css/src/components/form/form-groups/input/form-group-input.template';
import { formGroupInputNumberTemplate } from '@dso-toolkit/css/src/components/form/form-groups/input-number/form-group-input-number.template';
import { formGroupRadiosTemplate } from '@dso-toolkit/css/src/components/form/form-groups/radios/form-group-radios.template';
import { formGroupSearchBarTemplate } from '@dso-toolkit/css/src/components/form/form-groups/search-bar/form-group-search-bar.template';
import { formGroupSelectTemplate } from '@dso-toolkit/css/src/components/form/form-groups/select/form-group-select.template';
import { formGroupStaticTemplate } from '@dso-toolkit/css/src/components/form/form-groups/static/form-group-static.template';
import { formGroupTextareaTemplate } from '@dso-toolkit/css/src/components/form/form-groups/textarea/form-group-textarea.template';

import { formTemplate } from '@dso-toolkit/css/src/components/form/form.template';
import readme from '@dso-toolkit/css/src/components/form/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfForm(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    formTemplate,
    formGroupDecorator: story => html`<form><fieldset><legend>Example</legend>${story()}</fieldset></form>`,
    formGroupCheckboxesTemplate,
    formGroupConfirmTemplate,
    formGroupFilesTemplate,
    formGroupInputTemplate,
    formGroupInputNumberTemplate,
    formGroupRadiosTemplate,
    formGroupSearchBarTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
    formGroupTextareaTemplate
  }
);
