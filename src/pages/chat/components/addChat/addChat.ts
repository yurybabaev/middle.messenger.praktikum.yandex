import { Field } from '../../../../components/field/field';
import chatController from '../../../../logic/chatController';
import Chat from '../../../../models/chat';
import DataContainerBlock from '../../../../utils/dataContainerBlock';
import storeAware from '../../../../utils/storeAware';
import StoreKeys from '../../../../utils/storeKeys';
import template from './addChat.hbs';
import * as classes from './addChat.module.scss';

class AddChat extends DataContainerBlock {
  constructor(props: object) {
    super({
      ...props,
      classes,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const chat = this.getFormValues<Chat>(e.target as HTMLFormElement);
          chatController.createChat(chat);
        }
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
    return 'AddChat';
  }
}

const storeAwareAddChat = storeAware(AddChat, {
  error: StoreKeys.LAST_ERROR,
});
// eslint-disable-next-line import/prefer-default-export
export { storeAwareAddChat as AddChat };
