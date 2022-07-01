import BaseModel from './baseModel';

export default class User extends BaseModel {
  id: number;

  firstName?: string;

  secondName?: string;

  displayName?: string;

  login?: string;

  email?: string;

  phone?: string;

  avatarUrl?: string;

  password?: string;

  passwordRepeat?: string;
}
