import { Button } from '../../components/button/button';
import Block from '../../utils/block';
import template from './register.hbs';
import './register.scss';

class Register extends Block {
  constructor() {
    super({
      button: new Button({
        caption: 'Register',
        classModifier: 'button_primary',
        events: {
          click: () => alert('To register'),
        }
      }),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected render() {
    const btn = new Button({ caption: 'Hello!' });
    /// renderDom('registerBtn', btn);

    return this.compile(template, { button: btn });
  }
}

export default Register;
