import BaseModel from './baseModel';
import User from './user';

export default class ChatMessage extends BaseModel {
  user: User;

  id: number;

  text?: string;

  date: string; // TODO
}
