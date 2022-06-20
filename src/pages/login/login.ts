import userController from '../../logic/userController';
import ApplicationError from '../../models/error';
import User from '../../models/user';
import DataContainerBlock from '../../utils/dataContainerBlock';
import store from '../../utils/store';
import StoreKeys from '../../utils/storeKeys';
import template from './login.hbs';
import * as classes from './login.module.scss';

export class Login extends DataContainerBlock {
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

    store.on(StoreKeys.LAST_ERROR, (error: ApplicationError) => {
      this.setProps({
        error,
      });
      store.put(StoreKeys.LAST_ERROR, {}, false);
    });
  }

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'Login';
  }
}

export default Login;
