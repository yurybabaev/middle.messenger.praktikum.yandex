import { Button } from '../../components/button/button';
import Block from '../../utils/block';
import renderDom from '../../utils/renderDom';
import template from './register.hbs';
import './register.scss';

class Register extends Block {
  // eslint-disable-next-line class-methods-use-this
  protected render(): string {
    const btn = new Button({ caption: 'Hello!' });
    /// renderDom('registerBtn', btn);

    return template();
  }
}

export default Register;
