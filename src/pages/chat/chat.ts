import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './chat.hbs';
import * as classes from './chat.module.scss';
import Block from '../../utils/block';
import storeAware from '../../utils/storeAware';
import StoreKeys from '../../utils/storeKeys';
import { AddChat } from './components/addChat/addChat';
import chatController from '../../logic/chatController';

class Chat extends DataContainerBlock {
  constructor() {
    super({
      classes,
      onAddChat: () => {
        (this.refs.addChatModal as Block).show();
        (this.refs.addChat as AddChat).clear();
      },
    });
    chatController.getChats();
  }

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'Chat';
  }
}

const storeAwareChat = storeAware(Chat, {
  chats: StoreKeys.CHAT_LIST,
});
// eslint-disable-next-line import/prefer-default-export
export { storeAwareChat as Chat };
