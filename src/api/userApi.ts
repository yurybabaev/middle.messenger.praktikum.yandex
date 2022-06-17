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

function apiUserTouserModel(apiUser: Record<string, unknown>): User {
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

export default class UserApi extends BaseApi<User> {
  public async create(item: User): Promise<User> {
    const res = await this.request.post('/auth/sign', {
      data: userModelToApiUser(item),
    });
    console.log(res.response);
  }

  public read(): User | User[] {
    throw new Error('Method not implemented.');
  }

  public update(item: User): User {
    throw new Error('Method not implemented.');
  }

  public delete(item: User): boolean {
    throw new Error('Method not implemented.');
  }
}
