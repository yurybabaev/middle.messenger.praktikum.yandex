import Block from '../../utils/block';
import template from './mockMain.hbs';
import * as classes from './mockMain.module.scss';

export interface MockMainProps {
  links: { text: string, url: string }[];
}

export class MockMain extends Block {
  constructor(props: MockMainProps) {
    super({
      ...props,
      classes,
    });
  }

  protected get template() {
    return template;
  }

  public static get ComponentName(): string {
    return 'MockMain';
  }
}
