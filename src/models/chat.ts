import { ChatMessage } from './ChatMessage';
import { User } from './user';

export interface Chat {
  id: number;
  user: User;
  lastMessage?: ChatMessage;
}
