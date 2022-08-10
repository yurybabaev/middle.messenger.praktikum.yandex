import BaseModel from './baseModel';
import User from './user';

export default class Chat extends BaseModel {
  id: number;

  title: string;

  avatarUrl?: string;

  unreadCount: number;

  lastMessage?: {
    user: User,
    time: Date,
    text: string
  };
}
