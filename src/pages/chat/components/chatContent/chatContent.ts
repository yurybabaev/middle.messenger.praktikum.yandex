import template from './chatContent.hbs';
import * as classes from './chatContent.module.scss';
import Chat from '../../../../models/chat';
import DataContainerBlock from '../../../../utils/dataContainerBlock';
import { Field } from '../../../../components/field/field';
import StoreKeys from '../../../../utils/storeKeys';
import storeAware from '../../../../utils/storeAware';
import { Dropdown } from '../../../../components/dropdown/dropdown';
import Block from '../../../../utils/block';
import chatController from '../../../../logic/chatController';

export interface ChatContentProps {
  chat: Chat;
}

class ChatContent extends DataContainerBlock {
  get messageField() {
    return this.refs.messageField as Field;
  }

  constructor(props: ChatContentProps) {
    super(
      {
        ...props,
        classes,
        onSendMessage: (e: Event) => {
          e.preventDefault();
          if (this.validate()) {
            const values = this.getRawFormValues(e.target as HTMLFormElement);
            // eslint-disable-next-line no-console
            chatController.postToCurrentChat(values.message.toString());
            this.messageField.value = '';
          }
        },
        onChatMenuClick: () => {
          const chatMenu = this.refs.chatMenu as Dropdown;
          chatMenu.target = this.refs.chatMenuButton as HTMLElement;
          chatMenu.show();
        },
        onAddUserClick: () => {
          (this.refs.addUserModal as Block).show();
        },
        onDeleteUserClick: () => {
          chatController.getCurrentChatUsers();
          (this.refs.deleteUserModal as Block).show();
        },
      },
    );
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatContent';
  }
}

const chatContentStoreAware = storeAware(ChatContent, {
  chat: StoreKeys.CURRENT_CHAT,
  error: StoreKeys.LAST_ERROR,
});
export { chatContentStoreAware as ChatContent };
