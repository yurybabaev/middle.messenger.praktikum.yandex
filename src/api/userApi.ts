import User from '../models/user';
import BaseApi from './baseApi';

function userModelToApiUser(userModel: User): Record<string, unknown> {
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

function apiUserToUserModel(apiUser: Record<string, unknown>): User {
  return {
    id: Number(apiUser.id),
    firstName: String(apiUser.first_name),
    secondName: String(apiUser.second_name),
    displayName: String(apiUser.display_name),
    login: String(apiUser.login),
    email: String(apiUser.email),
    phone: String(apiUser.phone),
    avatarUrl: String(apiUser.avatar),
    password: String(apiUser.password),
  };
}

class UserApi extends BaseApi<User> {
  public async create(item: User): Promise<User> {
    const res = await this.request.post('/auth/signup', {
      data: userModelToApiUser(item),
    });
    this.checkResponseStatus(res);
    return apiUserToUserModel(JSON.parse(res.response));
  }

  public async read(): Promise<User | User[]> {
    const res = await this.request.get('/auth/user', {});
    this.checkResponseStatus(res);
    return apiUserToUserModel(JSON.parse(res.response));
  }

  public async logout(): Promise<void> {
    const res = await this.request.post('/auth/logout', {});
    this.checkResponseStatus(res);
  }

  public async login(login: string, password: string): Promise<void> {
    const res = await this.request.post('/auth/signin', {
      data: {
        login,
        password,
      },
    });
    this.checkResponseStatus(res);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(item: User): User {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(item: User): boolean {
    throw new Error('Method not implemented.');
  }
}

export default new UserApi();
