import { Field } from '../../../../components/field/field';
import chatController from '../../../../logic/chatController';
import userController from '../../../../logic/userController';
import DataContainerBlock from '../../../../utils/dataContainerBlock';
import storeAware from '../../../../utils/storeAware';
import StoreKeys from '../../../../utils/storeKeys';
import template from './addUser.hbs';
import * as classes from './addUser.module.scss';

class AddUser extends DataContainerBlock {
  private get userNameField() {
    return this.refs.userNameField as Field;
  }

  constructor(props: object) {
    super({
      ...props,
      classes,
      onSearchClick: () => {
        if (this.userNameField.value) {
          userController.search(this.userNameField.value, true);
        }
      },
      onAddUserClick: (tag: string) => {
        chatController.addUserToCurrentChat(Number(tag));
        this.setProps({
          users: [],
        });
      },
    });
  }

  public clear() {
    (this.refs.chatNameField as Field).value = null;
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'AddUser';
  }
}

const storeAwareAddUser = storeAware(AddUser, {
  error: StoreKeys.LAST_ERROR,
  users: StoreKeys.SEARCH_USERS_LIST,
});
// eslint-disable-next-line import/prefer-default-export
export { storeAwareAddUser as AddUser };
