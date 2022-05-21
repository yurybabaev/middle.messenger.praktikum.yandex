import Block from '../../../utils/block';
import template from './userView.hbs';
import * as classes from './userView.module.scss';

export class UserView extends Block {
  constructor() {
    super({ classes });
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}

export default UserView;
