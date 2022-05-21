import DataContainerBlock from '../../../utils/dataContainerBlock';
import { validationRules } from '../../../utils/validationRules';
import template from './userEdit.hbs';
import * as classes from './userEdit.module.scss';

export class UserEdit extends DataContainerBlock {
  constructor() {
    super({
      classes,
      validationRules,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const values = this.getFormValues(e.target as HTMLFormElement);
          // eslint-disable-next-line no-console
          console.log(values);
        }
      },
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}

export default UserEdit;
