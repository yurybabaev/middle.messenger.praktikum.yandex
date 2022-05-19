import Block from '../../utils/block';
import template from './flyout.hbs';
import * as classes from './flyout.module.scss';

export interface FlyoutProps {
  returnUrl: string;
}

export class Flyout extends Block {
  public static get ComponentName(): string {
    return 'Flyout';
  }

  constructor(props: FlyoutProps) {
    super({
      ...props,
      classes,
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}

export default Flyout;