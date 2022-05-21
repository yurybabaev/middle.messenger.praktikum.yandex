import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './register.hbs';
import * as classes from './register.module.scss';
import { validationRules } from '../../utils/validationRules';

export class Register extends DataContainerBlock {
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

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'Register';
  }
}

export default Register;
