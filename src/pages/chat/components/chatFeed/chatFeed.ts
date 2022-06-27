import template from './chatFeed.hbs';
import * as classes from './chatFeed.module.scss';
import Chat from '../../../../models/chat';
import Block from '../../../../utils/block';
import StoreKeys from '../../../../utils/storeKeys';
import storeAware from '../../../../utils/storeAware';
import chatController from '../../../../logic/chatController';

export interface ChatContentProps {
  chat: Chat;
}

class ChatFeed extends Block {
  constructor(props: any) {
    super(
      {
        ...props,
        classes,
      },
    );
  }
  
  private _initialLoaded = false;

  protected componentDidUpdate(newProps: any): void {
    console.log(newProps);
    if (newProps.loadedChat
      && newProps.loadedChat.Id === this.props.chat.Id
      && !this._initialLoaded) {
      this._initialLoaded = true;
      chatController.getCurrentChatOldMessages();
    }
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatFeed';
  }
}

export const storeAwareChatFeed = storeAware(ChatFeed, {
  chat: StoreKeys.CURRENT_CHAT,
  loadedChat: StoreKeys.LOADED_CHAT,
  messages: StoreKeys.CURRENT_MESSAGES,
});
export { storeAwareChatFeed as ChatFeed };
