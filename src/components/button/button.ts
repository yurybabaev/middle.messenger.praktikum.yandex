// import Handlebars from 'handlebars';
import Block from '../../utils/block';
import template from './button.hbs';
import './button.scss';

// const registerPartial = () => Handlebars.registerPartial('button', template);
// export { registerPartial };
export interface ButtonProps {
  caption: string,
  class?: string
}

export class Button extends Block {
  public static get ComponentName(): string {
    return 'Button';
  }

  constructor(props: /* ButtonProps */ any) {
    super(props);
  }

  protected render() {
    return /* html */ `
    <button class="button {{classModifier}}" type="button">
    <span class="button__text">{{caption}}</span>
</button>
    `;
  }
}
