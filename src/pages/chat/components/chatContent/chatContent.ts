import template from './chatContent.hbs';
import * as classes from './chatContent.module.scss';
import Chat from '../../../../models/chat';
import DataContainerBlock from '../../../../utils/dataContainerBlock';
import { Field } from '../../../../components/field/field';
import store from '../../../../utils/store';
import StoreKeys from '../../../../utils/storeKeys';

export interface ChatContentProps {
  chat: Chat;
}

export class ChatContent extends DataContainerBlock {
  get messageField() {
    return this.refs.messageField as Field;
  }

  constructor(props: any) {
    super(
      {
        ...props,
        classes,
        onSendMessage: (e: Event) => {
          e.preventDefault();
          if (this.validate()) {
            const values = this.getFormValues(e.target as HTMLFormElement);
            // eslint-disable-next-line no-console
            console.log(values);
            this.messageField.value = '';
          }
        },
      },
    );
    store.watch(StoreKeys.CURRENT_CHAT, (chat: Chat) => {
      this.setProps({
        chat,
      });
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChatContent';
  }
}
