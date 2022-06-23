import chatApi from '../api/chatApi';
import userApi from '../api/userApi';
import ApplicationError from '../models/error';
import Chat from '../models/chat';
import router from '../utils/router';
import store from '../utils/store';
import StoreKeys from '../utils/storeKeys';

class ChatController {
  public async createChat(chat: Chat): Promise<void> {
    try {
      await chatApi.create(chat);
      store.put(StoreKeys.LAST_ERROR, null);
      router.go('/');
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
}
export default new ChatController();
