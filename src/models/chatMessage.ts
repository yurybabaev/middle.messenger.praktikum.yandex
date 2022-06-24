import BaseModel from './baseModel';

export default class ChatMessage extends BaseModel {
  userId: number;

  chatId: number;

  text?: string;

  time: Date;
}
