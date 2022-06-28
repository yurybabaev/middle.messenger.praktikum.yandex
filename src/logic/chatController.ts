import chatApi from '../api/chatApi';
import userApi from '../api/userApi';
import ApplicationError from '../models/error';
import Chat from '../models/chat';
import store from '../utils/store';
import StoreKeys from '../utils/storeKeys';
import messagingApi from '../api/messagingApi';
import User from '../models/user';
import ChatMessage from '../models/chatMessage';
import UserDictionary from '../models/userDictionary';

class ChatController {
  constructor() {
    messagingApi.on('messages', async (newMessages: ChatMessage[] | ChatMessage) => {
      const storedMessages = store.get<ChatMessage[]>(StoreKeys.CURRENT_MESSAGES) || [];
      const currentUser = store.get<User>(StoreKeys.CURRENT_USER);
      let newStoredMessages = [];
      if (Array.isArray(newMessages)) {
        newStoredMessages = newMessages.reverse().concat(storedMessages); // history messages
      } else {
        newStoredMessages = storedMessages.concat(newMessages); // new single message
      }
      const knownUsers = store.get<UserDictionary>(StoreKeys.KNOWN_USERS) || new UserDictionary();
      const unknownUserIds = new Set<number>();
      newStoredMessages.forEach(async (message) => {
        if (!knownUsers.getUser(message.userId)) {
          unknownUserIds.add(message.userId);
        }
      });
      const userRequests = Array.from(unknownUserIds).map((id) => userApi.readById(id));
      const userResults = await Promise.all(userRequests);
      userResults.forEach((u) => {
        knownUsers.setUser(u.id, u);
      });
      newStoredMessages = newStoredMessages.map((m) => ({
        ...m,
        isMine: m.userId === currentUser.id,
        user: knownUsers.getUser(m.userId),
      }));
      store.put(StoreKeys.KNOWN_USERS, knownUsers);
      store.put(
        StoreKeys.CURRENT_MESSAGES,
        newStoredMessages,
      );
    });
  }

  private updateMessageUserData(message: ChatMessage) {

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
      store.put(StoreKeys.LOADED_CHAT, null);
      store.put(StoreKeys.CURRENT_MESSAGES, []);
      store.put(StoreKeys.CURRENT_CHAT, chat);
      const token = await chatApi.getToken(chat);
      await messagingApi.initNewConnection(
        store.get<User>(StoreKeys.CURRENT_USER).id,
        chat.id,
        token,
      );
      store.put(StoreKeys.LOADED_CHAT, chat);
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
      const oldMessages = store.get<ChatMessage[]>(StoreKeys.CURRENT_MESSAGES) || [];
      messagingApi.requestOldMessages(oldMessages.length);
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }
}
export default new ChatController();
