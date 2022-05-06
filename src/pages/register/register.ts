import Block from '../../utils/block';
import template from './register.hbs';
import './register.scss';

class Register extends Block {
  // eslint-disable-next-line class-methods-use-this
  protected render(): string {
    return template();
  }
}

export default Register;
