import template from './chatFeed.hbs';
import * as classes from './chatFeed.module.scss';
import Chat from '../../../../models/chat';
import Block from '../../../../utils/block';
import StoreKeys from '../../../../utils/storeKeys';
import storeAware from '../../../../utils/storeAware';
import chatController from '../../../../logic/chatController';
import { json } from 'stream/consumers';

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

  private _lastChatId?: number;

  protected componentDidUpdate(newProps: any): void {
    if (this._lastChatId !== newProps.chat.id) {
      //alert("New chat! " + (this._lastChatId === newProps.chat.id) + " " + JSON.stringify(newProps));
      this._lastChatId = newProps.chat.id;
      
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
  //messages: StoreKeys.CURRENT_MESSAGES,
});
export { storeAwareChatFeed as ChatFeed };
