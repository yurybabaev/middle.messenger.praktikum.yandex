import Block from '../../utils/block';
import template from './system.hbs';
import classes from './system.module.scss';

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

  public static get ComponentName(): string {
    return 'System';
  }
}
