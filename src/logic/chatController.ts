import chatApi from '../api/chatApi';
import userApi from '../api/userApi';
import ApplicationError from '../models/error';
import Chat from '../models/chat';
import store from '../utils/store';
import StoreKeys from '../utils/storeKeys';
import messagingApi from '../api/messagingApi';
import User from '../models/user';
import ChatMessage from '../models/chatMessage';

class ChatController {
  constructor() {
    messagingApi.on('messages', (newMessages: ChatMessage[]) => {
      store.put(
        StoreKeys.CURRENT_MESSAGES,
        store.get<ChatMessage[]>(StoreKeys.CURRENT_MESSAGES).concat(newMessages),
      );
    });
  }

  public async getChats(): Promise<void> {
    try {
      const chats = await chatApi.read();
      store.put(StoreKeys.CHAT_LIST, chats);
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async createChat(chat: Chat): Promise<void> {
    try {
      await chatApi.create(chat);
      store.put(StoreKeys.LAST_ERROR, null);
      await this.getChats();
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async addUserToCurrentChat(userId: number): Promise<void> {
    try {
      await chatApi.addUser([userId], store.get<Chat>(StoreKeys.CURRENT_CHAT).id);
      store.put(StoreKeys.LAST_ERROR, null);
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async deleteUserFromCurrentChat(userId: number): Promise<void> {
    try {
      await chatApi.deleteUser([userId], store.get<Chat>(StoreKeys.CURRENT_CHAT).id);
      store.put(StoreKeys.LAST_ERROR, null);
      await this.getCurrentChatUsers();
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async changeAvatar(avatar: File): Promise<void> {
    try {
      if (!avatar.size) {
        store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError('You should select file first'));
        return;
      }
      const currentUser = await userApi.changeAvatar(avatar);
      store.put(StoreKeys.CURRENT_USER, currentUser);
      store.put(StoreKeys.LAST_ERROR, null);
      // router.go('/user/view');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async getCurrentChatUsers(): Promise<void> {
    try {
      const users = await userApi.getChatUsers(store.get<Chat>(StoreKeys.CURRENT_CHAT).id);
      store.put(StoreKeys.CHAT_USERS_LIST, users);
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async changeCurrentChat(chat: Chat): Promise<void> {
    if (store.get<Chat>(StoreKeys.CURRENT_CHAT)?.id === chat.id) {
      return;
    }
    try {
      store.put(StoreKeys.CURRENT_CHAT, chat);
      store.put(StoreKeys.CURRENT_MESSAGES, []);
      const token = await chatApi.getToken(chat);
      messagingApi.initNewConnection(
        store.get<User>(StoreKeys.CURRENT_USER).id,
        chat.id,
        token,
      );
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async postToCurrentChat(message: string) {
    try {
      messagingApi.sendMessage(message);
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async getCurrentChatOldMessages() {
    try {
      messagingApi.requestOldMessages(store.get<ChatMessage[]>(StoreKeys.CURRENT_MESSAGES).length);
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }
}
export default new ChatController();
