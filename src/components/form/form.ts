import Block from '../../utils/block';
import template from './form.hbs';
import './form.scss';

export class Form extends Block {

  public static get ComponentName(): string {
    return 'Form';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}