import userController from '../../../logic/userController';
import DataContainerBlock from '../../../utils/dataContainerBlock';
import storeAware from '../../../utils/storeAware';
import StoreKeys from '../../../utils/storeKeys';
import { validationRules } from '../../../utils/validationRules';
import template from './userChangePassword.hbs';
import * as classes from './userChangePassword.module.scss';

class UserChangePassword extends DataContainerBlock {
  constructor() {
    super({
      classes,
      validationRules,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const values = this.getRawFormValues(e.target as HTMLFormElement);
          userController.changePassword(
            values.oldPassword as string,
            values.newPassword as string,
            values.newPasswordRepeat as string,
          );
        }
      },
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'UserChangePassword';
  }
}

export const storeAwareUserView = storeAware(UserChangePassword, { error: StoreKeys.LAST_ERROR });
export { storeAwareUserView as UserChangePassword };
