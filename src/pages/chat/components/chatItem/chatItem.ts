import Block from '../../../../utils/block';
import template from './chatItem.hbs';
import * as classes from './chatItem.module.scss';

export class ChatItem extends Block {
  constructor(props: any) {
    super({ ...props, classes });
  }

  public static get ComponentName(): string {
    return 'ChatItem';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}

export default ChatItem;
