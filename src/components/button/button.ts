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
  constructor(props: /* ButtonProps */ any) {
    super(props);
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
