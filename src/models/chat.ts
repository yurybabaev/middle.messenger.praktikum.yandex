import BaseModel from './baseModel';
import ChatMessage from './ChatMessage';
import User from './user';

export default class Chat extends BaseModel {
  id: number;

  user: User;

  lastMessage?: ChatMessage;
}
