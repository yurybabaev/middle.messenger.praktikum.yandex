import BaseModel from './baseModel';
import User from './user';

export default class UserDictionary extends BaseModel {
  private _users: Record<number, User> = {};

  public getUser(id: number) {
    return this._users[id];
  }

  public setUser(id: number, user: User) {
    this._users[id] = user;
  }
}
