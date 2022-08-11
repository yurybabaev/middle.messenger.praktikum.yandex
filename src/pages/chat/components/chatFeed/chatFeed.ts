import template from './chatFeed.hbs';
import classes from './chatFeed.module.scss';
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
      {
        scroll: () => {
          this._lastScrollHeight = this.chatFeed.scrollHeight;
          if (this.chatFeed.scrollTop === 0) {
            this._loadingRequested = true;
            chatController.getCurrentChatOldMessages();
          }
        },
      },
    );
  }

  private _initialLoaded = false;

  private _lastMessageCount = 0;

  private _lastScrollHeight = 0;

  private _loadingRequested = false;

  protected get chatFeed() {
    return this.refs.chatFeed as HTMLElement;
  }

  protected componentDidUpdate(newProps: any): void {
    if (newProps.loadedChat
      && newProps.loadedChat.Id === this.props.chat.Id
      && !this._initialLoaded) {
      this._initialLoaded = true;
      chatController.getCurrentChatOldMessages();
    }
    if (newProps.messages && newProps.messages.length !== this._lastMessageCount) {
      this._lastMessageCount = newProps.messages.length;
      if (this._loadingRequested) {
        this.chatFeed.scrollTo(0, this.chatFeed.scrollHeight - this._lastScrollHeight);
        this._loadingRequested = false;
      } else {
        this.chatFeed.scrollTo(0, this.chatFeed.scrollHeight);
      }
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
