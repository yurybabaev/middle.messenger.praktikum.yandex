/* eslint-disable @typescript-eslint/no-unused-vars */
import template from './chat.hbs';
import './chat.scss';
import mockChatData from './mockChatData.json';

export default () => template({
  chats: mockChatData,
});
