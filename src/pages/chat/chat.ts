/* eslint-disable @typescript-eslint/no-unused-vars */
import { nanoid } from 'nanoid';
import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './chat.hbs';
import * as classes from './chat.module.scss';
import mockChatData from './mockChatData.json';
import { Chat as ChatModel } from '../../models/Chat';
import { GlobalEvents, globalEventBus } from '../../utils/globalEvents';
import { Request } from '../../utils/request';

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

  protected get template() {
    return template;
  }

  componentDidMount(oldProps: any): void {
    globalEventBus.emit(GlobalEvents.CURRENT_CHAT_CHANGED, this.props.chats[0]);
  }
}

export default Chat;
