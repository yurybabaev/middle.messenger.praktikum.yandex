import Block from '../../../../utils/block';
import template from './chatItem.hbs';
import * as classes from './chatItem.module.scss';
import Chat from '../../../../models/chat';
import store from '../../../../utils/store';
import StoreKeys from '../../../../utils/storeKeys';

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
    store.watch(StoreKeys.CURRENT_CHAT, (chat: Chat) => {
      this.setProps({
        isSelected: chat.id === this.props.chat.id,
      });
    });
  }

  private onSelected() {
    store.put(StoreKeys.CURRENT_CHAT, this.props.chat);
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatItem';
  }
}
