import Block from '../../../../utils/block';
import template from './chatContent.hbs';
import * as classes from './chatContent.module.scss';
import { GlobalEvents, globalEventBus } from '../../../../utils/globalEvents';
import { Chat } from '../../../../models';

export interface ChatContentProps {
  chat: Chat;
}

export class ChatContent extends Block {
  constructor(props: any) {
    super(
      {
        ...props,
        classes,
      },
    );
    globalEventBus.on(GlobalEvents.CURRENT_CHAT_CHANGED, (chat: Chat) => {
      this.setProps({
        chat,
      });
    });
  }

  public static get ComponentName(): string {
    return 'ChatContent';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
