import Block from '../../utils/block';
import template from './system.hbs';
import * as classes from './system.module.scss';

export interface SystemProps {
  code: string,
  text: string
}

export class System extends Block {
  constructor(props: SystemProps) {
    super({
      ...props,
      classes,
    });
  }

  protected get template() {
    return template;
  }
}
