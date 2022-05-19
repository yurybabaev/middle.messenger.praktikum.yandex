import template from './chatContent.hbs';
import * as classes from './chatContent.module.scss';
import { GlobalEvents, globalEventBus } from '../../../../utils/globalEvents';
import { Chat } from '../../../../models';
import DataContainerBlock from '../../../../utils/dataContainerBlock';
import { Field } from '../../../../components/field/field';

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
    globalEventBus.on(GlobalEvents.CURRENT_CHAT_CHANGED, (chat: Chat) => {
      this.setProps({
        chat,
      });
    });
  }

  public static get ComponentName(): string {
    return 'ChatContent';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
