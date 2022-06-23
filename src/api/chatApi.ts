import Chat from '../models/chat';
import User from '../models/user';
import BaseApi from './baseApi';

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
    return {
      id: Number(apiChat.id),
      title: String(apiChat.title),
      unreadCount: Number(apiChat.unread_count),
      avatarUrl: apiChat.avatar ? this.request.combineURLs(
        this.baseResourcesUrl,
        String(apiChat.avatar),
      ) : undefined,
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
    const res = await this.request.get('/auth/user', {});
    this.checkResponseStatus(res);
    return this.apiChatToChatModel(JSON.parse(res.response));
  }

  public async update(item: Chat): Promise<User> {
    const res = await this.request.put('/user/profile', {
      data: JSON.stringify(this.userModelToApiUser(item)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
    return this.apiChatToChatModel(JSON.parse(res.response));
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(item: User): boolean {
    throw new Error('Method not implemented.');
  }
}

export default new ChatApi();
