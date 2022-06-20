import userController from '../../../logic/userController';
import Block from '../../../utils/block';
import storeAware from '../../../utils/storeAware';
import StoreKeys from '../../../utils/storeKeys';
import template from './userView.hbs';
import * as classes from './userView.module.scss';

class UserView extends Block {
  constructor() {
    super({
      classes,
      logout: () => {
        userController.logout();
      },
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'UserView';
  }
}

export const storeAwareUserView = storeAware(UserView, { user: StoreKeys.CURRENT_USER });
export { storeAwareUserView as UserView };
