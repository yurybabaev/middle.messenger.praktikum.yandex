import userController from '../../../logic/userController';
import User from '../../../models/user';
import DataContainerBlock from '../../../utils/dataContainerBlock';
import storeAware from '../../../utils/storeAware';
import StoreKeys from '../../../utils/storeKeys';
import { validationRules } from '../../../utils/validationRules';
import template from './userEdit.hbs';
import classes from './userEdit.module.scss';

class UserEdit extends DataContainerBlock {
  constructor(props: object) {
    super({
      ...props,
      classes,
      validationRules,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const user = this.getFormValues<User>(e.target as HTMLFormElement);
          userController.editUser(user);
        }
      },
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'UserEdit';
  }
}

export const storeAwareUserView = storeAware(UserEdit, {
  user: StoreKeys.CURRENT_USER,
  error: StoreKeys.LAST_ERROR,
});
export { storeAwareUserView as UserEdit };
