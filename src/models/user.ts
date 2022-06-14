import BaseModel from './baseModel';

export default class User extends BaseModel {
  id: number;

  name: string;

  avatarUrl?: string;
}
