/* eslint-disable @typescript-eslint/no-unused-vars */
import { nanoid } from 'nanoid';
import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './chat.hbs';
import * as classes from './chat.module.scss';
import ChatModel from '../../models/Chat';
import store from '../../utils/store';
import StoreKeys from '../../utils/storeKeys';
import Block from '../../utils/block';

export class Chat extends DataContainerBlock {
  constructor() {
    super({
      classes,
      onAddChat: () => {
        console.log(this.refs.addChatModal as Block);
        (this.refs.addChatModal as Block).show();
      },
    });
  }

  componentDidMount(oldProps: any): void {
  }

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'Chat';
  }
}

export default Chat;
