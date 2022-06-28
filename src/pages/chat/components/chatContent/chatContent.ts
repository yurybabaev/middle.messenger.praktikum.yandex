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
        onSendMessage: async (e: Event) => {
          e.preventDefault();
          if (this.validate()) {
            const values = this.getRawFormValues(e.target as HTMLFormElement);
            // eslint-disable-next-line no-console
            chatController.postToCurrentChat(values.message.toString());
            // chatController.postToCurrentChat('TEST MESSAGE 1');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 2');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 3');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 4');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 5');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 6');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 7');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 8');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 9');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 10');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 11');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 12');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 13');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 14');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 15');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 16');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 17');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 18');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 19');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 20');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 21');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 22');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 23');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 24');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 25');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 26');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 27');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 28');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 29');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 30');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 31');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 32');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 33');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 34');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 35');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 36');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 37');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 38');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 39');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 40');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 41');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 42');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 43');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 44');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 45');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 46');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 47');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 48');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 49');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 50');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 51');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 52');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 53');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 54');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 55');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 56');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 57');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 58');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 59');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 60');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 61');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 62');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 63');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 64');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 65');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 66');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 67');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 68');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 69');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 70');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 71');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 72');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 73');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 74');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 75');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 76');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 77');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 78');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 79');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 80');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 81');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 82');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 83');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 84');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 85');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 86');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 87');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 88');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 89');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 90');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 91');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 92');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 93');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 94');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 95');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 96');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 97');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 98');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 99');
            // await new Promise(r => setTimeout(r, 400));
            // chatController.postToCurrentChat('TEST MESSAGE 100');
            // await new Promise(r => setTimeout(r, 400));

            this.messageField.value = '';
            // chatController.getCurrentChatOldMessages();
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
});
export { chatContentStoreAware as ChatContent };
