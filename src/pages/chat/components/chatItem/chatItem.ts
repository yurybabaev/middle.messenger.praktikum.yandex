import Block, { Props } from '../../../../utils/block';
import template from './chatItem.hbs';
import classes from './chatItem.module.scss';
import Chat from '../../../../models/chat';
import StoreKeys from '../../../../utils/storeKeys';
import chatController from '../../../../logic/chatController';
import storeAware from '../../../../utils/storeAware';

export interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelected: (chatItem: ChatItem) => void;
}

class ChatItem extends Block {
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
  }

  protected componentWillUpdate(_oldProps: Props, newProps: Props) {
    // eslint-disable-next-line no-param-reassign
    newProps.isSelected = newProps.currentChat.id === newProps.chat.id;
    return true;
  }

  private async onSelected() {
    await chatController.changeCurrentChat(this.props.chat);
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatItem';
  }
}

const storeAwareChatItem = storeAware(ChatItem, {
  currentChat: StoreKeys.CURRENT_CHAT,
});

export { storeAwareChatItem as ChatItem };
