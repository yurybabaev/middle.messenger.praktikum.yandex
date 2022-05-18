/* eslint-disable @typescript-eslint/no-unused-vars */
import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './chat.hbs';
import * as classes from './chat.module.scss';
import mockChatData from './mockChatData.json';

class Chat extends DataContainerBlock {
  constructor() {
    super({
      chats: mockChatData,
      classes,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const values = this.getFormValues(e.target as HTMLFormElement);
          // eslint-disable-next-line no-console
          console.log(values);
        }
      },
    });
  }

  protected get template() {
    return template;
  }
}

export default Chat;
