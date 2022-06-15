import template from './chatFeed.hbs';
import * as classes from './chatFeed.module.scss';
import Chat from '../../../../models/chat';
import ChatMessage from '../../../../models/chatMessage';
import Block from '../../../../utils/block';
import StoreKeys from '../../../../utils/storeKeys';
import storeAware from '../../../../utils/storeAware';

export interface ChatContentProps {
  chat: Chat;
}

class ChatFeed extends Block {
  constructor(props: any) {
    super(
      {
        ...props,
        classes,
        messages: [
          {
            date: 'Today',
            id: 0,
            user: props.chat.user,
            text: props.chat.lastMessage.text,
          },
        ] as ChatMessage[],
      },
    );
    // store.watch(StoreKeys.CURRENT_CHAT, (chat: Chat) => {
    //   this.setProps({
    //     chat,
    //   });
    // });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatFeed';
  }
}

export const storeAwareChatFeed = storeAware(ChatFeed, { chat: StoreKeys.CURRENT_CHAT });
export { storeAwareChatFeed as ChatFeed };
