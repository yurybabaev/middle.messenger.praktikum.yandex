import Block from '../../../utils/block';
import template from './userView.hbs';
import * as classes from './userView.module.scss';

export class UserView extends Block {
  public static get ComponentName(): string {
    return 'UserView';
  }

  constructor() {
    super({ classes });
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}

export default UserView;
