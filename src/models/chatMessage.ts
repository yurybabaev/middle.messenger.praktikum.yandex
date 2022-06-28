import BaseModel from './baseModel';
import User from './user';

export default class ChatMessage extends BaseModel {
  id: number;

  userId: number;

  chatId: number;

  text?: string;

  time: Date;

  isMine?: boolean;

  user?: User;
}
