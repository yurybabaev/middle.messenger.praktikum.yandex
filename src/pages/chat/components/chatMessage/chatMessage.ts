import template from './chatMessage.hbs';
import * as classes from './chatMessage.module.scss';
import ChatMessageModel from '../../../../models/chatMessage';
import Block from '../../../../utils/block';
import { Field } from '../../../../components/field/field';

export interface ChatContentProps {
  message: ChatMessageModel;
}

export class ChatMessage extends Block {
  get messageField() {
    return this.refs.messageField as Field;
  }

  constructor(props: any) {
    super(
      {
        ...props,
        classes,
      },
    );
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatMessage';
  }
}
