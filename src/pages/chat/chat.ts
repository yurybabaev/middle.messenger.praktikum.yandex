/* eslint-disable @typescript-eslint/no-unused-vars */
import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './chat.hbs';
import * as classes from './chat.module.scss';
import mockChatData from './mockChatData.json';
import { Chat as ChatModel } from '../../models/Chat';

export class Chat extends DataContainerBlock {
  constructor() {
    super({
      chats: mockChatData.map((c) => ({
        id: c.id,
        user: {
          id: 0,
          name: c.user,
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
      } as ChatModel)),
      classes,
    });
  }

  protected get template() {
    return template;
  }
}

export default Chat;
