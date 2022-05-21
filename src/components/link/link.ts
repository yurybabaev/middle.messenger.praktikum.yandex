import Block from '../../utils/block';
import template from './link.hbs';
import * as classes from './link.module.scss';

export class Link extends Block {
  constructor(props: any) {
    super({ ...props, classes });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Link';
  }
}

export default Link;
