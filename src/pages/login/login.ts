import userController from '../../logic/userController';
import User from '../../models/user';
import DataContainerBlock from '../../utils/dataContainerBlock';
import storeAware from '../../utils/storeAware';
import StoreKeys from '../../utils/storeKeys';
import template from './login.hbs';
import classes from './login.module.scss';

console.log(classes);

class Login extends DataContainerBlock {
  constructor() {
    super({
      classes,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const user = this.getFormValues<User>(e.target as HTMLFormElement);
          userController.login(user.login!, user.password!);
          // eslint-disable-next-line no-console
        }
      },
    });
  }

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'Login';
  }
}

const loginStoreAware = storeAware(Login, { error: StoreKeys.LAST_ERROR });
// eslint-disable-next-line import/prefer-default-export
export { loginStoreAware as Login };
