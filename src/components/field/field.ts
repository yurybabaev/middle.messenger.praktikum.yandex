import Handlebars from 'handlebars';
import Block from '../../utils/block';
import template from './field.hbs';
import './field.scss';

export class Field extends Block {

  public static get ComponentName(): string {
    return 'Field';
  }

  protected get template(): (data?: any) => string {
      return template;
  }
}
