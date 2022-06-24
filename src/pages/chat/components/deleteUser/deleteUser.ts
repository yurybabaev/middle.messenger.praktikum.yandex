import chatController from '../../../../logic/chatController';
import DataContainerBlock from '../../../../utils/dataContainerBlock';
import storeAware from '../../../../utils/storeAware';
import StoreKeys from '../../../../utils/storeKeys';
import template from './deleteUser.hbs';
import * as classes from './deleteUser.module.scss';

class DeleteUser extends DataContainerBlock {
  constructor(props: object) {
    super({
      ...props,
      classes,
      onDeleteUserClick: (tag: string) => {
        chatController.deleteUserFromCurrentChat(Number(tag));
      },
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'DeleteUser';
  }
}

const storeAwareDeleteUser = storeAware(DeleteUser, {
  error: StoreKeys.LAST_ERROR,
  users: StoreKeys.CHAT_USERS_LIST,
});
// eslint-disable-next-line import/prefer-default-export
export { storeAwareDeleteUser as DeleteUser };
