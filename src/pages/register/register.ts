import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './register.hbs';
import * as classes from './register.module.scss';
import { validationRules } from '../../utils/validationRules';
import User from '../../models/user';

export class Register extends DataContainerBlock {
  constructor() {
    super({
      classes,
      validationRules,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const newUser = this.getFormValues<User>(e.target as HTMLFormElement);
          userApi.create(newUser);
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
