import Chat from '../models/chat';
import User from '../models/user';
import BaseApi from './baseApi';
import userApi from './userApi';

class ChatApi extends BaseApi<Chat> {
  chatModelToApiChat(chatModel: Chat): Record<string, unknown> {
    return {
      id: chatModel.id,
      title: chatModel.title,
      avatar: chatModel.avatarUrl,
      unread_count: chatModel.unreadCount,
    };
  }

  apiChatToChatModel(apiChat: Record<string, unknown>): Chat {
    const apiLastMessage = apiChat.last_message as Record<string, unknown>;
    return {
      id: Number(apiChat.id),
      title: String(apiChat.title),
      unreadCount: Number(apiChat.unread_count),
      avatarUrl: apiChat.avatar ? this.request.combineURLs(
        this.baseResourcesUrl,
        String(apiChat.avatar),
      ) : undefined,
      lastMessage: apiLastMessage ? {
        user: userApi.apiUserToUserModel(apiLastMessage.user as Record<string, unknown>),
        time: new Date(String(apiLastMessage.time)),
        text: String(apiLastMessage.content),
      } : undefined,
    };
  }

  public async create(item: Chat): Promise<Chat> {
    const res = await this.request.post('/chats', {
      data: JSON.stringify(this.chatModelToApiChat(item)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
    return this.apiChatToChatModel(JSON.parse(res.response));
  }

  public async read(): Promise<Chat | Chat[]> {
    const res = await this.request.get('/chats', {});
    this.checkResponseStatus(res);
    return (JSON.parse(res.response) as Array<Record<string, unknown>>)
      .map(this.apiChatToChatModel);
  }

  public async addUser(users: number[], chatId: number): Promise<void> {
    const res = await this.request.put('/chats/users', {
      data: JSON.stringify({
        users,
        chatId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
  }

  public async deleteUser(users: number[], chatId: number): Promise<void> {
    const res = await this.request.delete('/chats/users', {
      data: JSON.stringify({
        users,
        chatId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
  }

  public async changeAvatar(avatar: File): Promise<Chat> {
    const data = new FormData();
    data.append('avatar', avatar);
    const res = await this.request.put('/user/profile/avatar', {
      data,
    });
    this.checkResponseStatus(res);
    return this.apiChatToChatModel(JSON.parse(res.response));
  }

  public async getToken(chat: Chat): Promise<string> {
    const res = await this.request.post(`/chats/token/${chat.id}`, {});
    this.checkResponseStatus(res);
    return JSON.parse(res.response).token;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(item: User): boolean {
    throw new Error('Method not implemented.');
  }
}

export default new ChatApi();
