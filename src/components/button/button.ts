// import Handlebars from 'handlebars';
import Block from '../../utils/block';
import template from './button.hbs';
import * as classes from './button.module.scss';

export interface ButtonProps {
  caption: string,
  class?: string,
  onClick?: EventListenerOrEventListenerObject
}

export class Button extends Block {
  public static get ComponentName(): string {
    return 'Button';
  }

  constructor(props: ButtonProps) {
    super({ ...props, classes }, {
      click: props.onClick,
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
