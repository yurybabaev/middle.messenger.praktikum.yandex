import User from '../models/user';
import BaseApi from './baseApi';

class UserApi extends BaseApi<User> {
  userModelToApiUser(userModel: User): Record<string, unknown> {
    return {
      id: userModel.id,
      first_name: userModel.firstName,
      second_name: userModel.secondName,
      display_name: userModel.displayName,
      login: userModel.login,
      email: userModel.email,
      phone: userModel.phone,
      avatar: userModel.avatarUrl,
      password: userModel.password,
    };
  }

  public apiUserToUserModel(apiUser: Record<string, unknown>): User {
    return {
      id: Number(apiUser.id),
      firstName: String(apiUser.first_name),
      secondName: String(apiUser.second_name),
      displayName: apiUser.display_name ? String(apiUser.display_name) : undefined,
      login: String(apiUser.login),
      email: String(apiUser.email),
      phone: String(apiUser.phone),
      avatarUrl: apiUser.avatar ? this.request.combineURLs(
        this.baseResourcesUrl,
        String(apiUser.avatar),
      ) : undefined,
      password: String(apiUser.password),
    };
  }

  public async create(item: User): Promise<User> {
    const res = await this.request.post('/auth/signup', {
      data: JSON.stringify(this.userModelToApiUser(item)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
    return this.apiUserToUserModel(JSON.parse(res.response));
  }

  public async read(): Promise<User | User[]> {
    const res = await this.request.get('/auth/user', {});
    this.checkResponseStatus(res);
    return this.apiUserToUserModel(JSON.parse(res.response));
  }

  public async logout(): Promise<void> {
    const res = await this.request.post('/auth/logout', {});
    this.checkResponseStatus(res);
  }

  public async login(login: string, password: string): Promise<void> {
    const res = await this.request.post('/auth/signin', {
      data: JSON.stringify({
        login,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
  }

  public async update(item: User): Promise<User> {
    const res = await this.request.put('/user/profile', {
      data: JSON.stringify(this.userModelToApiUser(item)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
    return this.apiUserToUserModel(JSON.parse(res.response));
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const res = await this.request.put('/user/password', {
      data: JSON.stringify({
        oldPassword,
        newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
  }

  public async changeAvatar(avatar: File): Promise<User> {
    const data = new FormData();
    data.append('avatar', avatar);
    const res = await this.request.put('/user/profile/avatar', {
      data,
    });
    this.checkResponseStatus(res);
    return this.apiUserToUserModel(JSON.parse(res.response));
  }

  public async search(login: string): Promise<User | User[]> {
    const res = await this.request.post('/user/search', {
      data: JSON.stringify({
        login,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.checkResponseStatus(res);
    return (JSON.parse(res.response) as Array<Record<string, unknown>>)
      .map(this.apiUserToUserModel.bind(this));
  }

  public async getChatUsers(chatId: number): Promise<User | User[]> {
    const res = await this.request.get(`/chats/${chatId}/users`, {});
    this.checkResponseStatus(res);
    return (JSON.parse(res.response) as Array<Record<string, unknown>>)
      .map(this.apiUserToUserModel.bind(this));
  }

  public async readById(id: number): Promise<User> {
    const res = await this.request.get(`/user/${id}`, {});
    this.checkResponseStatus(res);
    return this.apiUserToUserModel(JSON.parse(res.response));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(_items: User): boolean {
    throw new Error('Method not implemented.');
  }
}

export default new UserApi();
