import { User } from "./user";

export interface ChatMessage {
  user: User;
  id: number;
  text?: string;
  date: string; // TODO
}