import { FormGroup } from '../models/form-group.model';

export const content: FormGroup<unknown>[] = [
  {
    group: 'input',
    id: 'mijn-naam',
    type: 'text',
    label: 'Uw naam'
  },
  {
    group: 'input',
    id: 'mijn-email',
    type: 'email',
    label: 'Email'
  }
];
