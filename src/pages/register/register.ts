import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './register.hbs';
import * as classes from './register.module.scss';
import { validationRules } from '../../utils/validationRules';
import User from '../../models/user';
import storeAware from '../../utils/storeAware';
import StoreKeys from '../../utils/storeKeys';
import userController from '../../logic/userController';

class Register extends DataContainerBlock {
  constructor() {
    super({
      classes,
      validationRules,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const newUser = this.getFormValues<User>(e.target as HTMLFormElement);
          userController.createUser(newUser);
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

const registerStoreAware = storeAware(Register, {
  newUser: StoreKeys.NEW_USER,
  error: StoreKeys.LAST_ERROR,
});
// eslint-disable-next-line import/prefer-default-export
export { registerStoreAware as Register };
