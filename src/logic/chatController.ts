import chatApi from '../api/chatApi';
import userApi from '../api/userApi';
import ApplicationError from '../models/error';
import Chat from '../models/chat';
import store from '../utils/store';
import StoreKeys from '../utils/storeKeys';

class ChatController {

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
}
export default new ChatController();
