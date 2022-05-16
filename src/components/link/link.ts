import Block from '../../utils/block';
import template from './link.hbs';
import * as classes from './link.module.scss';

export class Link extends Block {
  constructor(props: any) {
    super({ ...props, classes });
  }

  public static get ComponentName(): string {
    return 'Link';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}

export default Link;
