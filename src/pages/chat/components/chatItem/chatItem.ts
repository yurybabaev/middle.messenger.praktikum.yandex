import Block from '../../../../utils/block';
import template from './chatItem.hbs';
import * as classes from './chatItem.module.scss';
import { GlobalEvents, globalEventBus } from '../../../../utils/globalEvents';
import { Chat } from '../../../../models';

export interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelected: (chatItem: ChatItem) => void;
}

export class ChatItem extends Block {
  constructor(props: any) {
    super(
      {
        ...props,
        classes,
      },
      {
        click: () => {
          this.onSelected();
        },
      },
    );
    globalEventBus.on(GlobalEvents.CURRENT_CHAT_CHANGED, (chat: Chat) => {
      this.setProps({
        isSelected: chat.id === this.props.chat.id,
      });
    });
  }

  private onSelected() {
    globalEventBus.emit(GlobalEvents.CURRENT_CHAT_CHANGED, this.props.chat);
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatItem';
  }
}
