import BaseModel from './baseModel';
import ChatMessage from './ChatMessage';

export default class Chat extends BaseModel {
  id: number;

  title: string;

  avatarUrl?: string;

  unreadCount: number;

  lastMessage?: ChatMessage;
}
