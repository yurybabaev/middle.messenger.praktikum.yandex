/* eslint-disable @typescript-eslint/no-unused-vars */
import { nanoid } from 'nanoid';
import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './chat.hbs';
import * as classes from './chat.module.scss';
import mockChatData from './mockChatData.json';
import ChatModel from '../../models/Chat';
import store from '../../utils/store';
import StoreKeys from '../../utils/storeKeys';

export class Chat extends DataContainerBlock {
  constructor() {
    const chats = mockChatData.map((c) => ({
      id: c.id,
      user: {
        id: 0,
        name: c.user,
        avatarUrl: `https://i.pravatar.cc/64?u=${nanoid(8)}`,
      },
      lastMessage: {
        id: 0,
        text: c.text,
        date: c.date,
        user: {
          id: 0,
          name: c.user,
        },
      },
    } as ChatModel));

    super({
      chats,
      classes,
    });
  }

  componentDidMount(oldProps: any): void {
    store.put(StoreKeys.CURRENT_CHAT, this.props.chats[0]);
  }

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'Chat';
  }
}

export default Chat;
