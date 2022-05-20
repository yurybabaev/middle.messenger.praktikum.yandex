import template from './chatFeed.hbs';
import * as classes from './chatFeed.module.scss';
import { GlobalEvents, globalEventBus } from '../../../../utils/globalEvents';
import { Chat, ChatMessage } from '../../../../models';
import Block from '../../../../utils/block';

export interface ChatContentProps {
  chat: Chat;
}

export class ChatFeed extends Block {
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
    globalEventBus.on(GlobalEvents.CURRENT_CHAT_CHANGED, (chat: Chat) => {
      this.setProps({
        chat,
      });
    });
  }

  public static get ComponentName(): string {
    return 'ChatFeed';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
