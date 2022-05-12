import { Button } from '../../components/button/button';
import Block from '../../utils/block';
import template from './register.hbs';
import './register.scss';

class Register extends Block {
  constructor() {
    super({
      onRegisterClick: (e) => { alert('wanna register! '); console.log(e); },
    });
  }

  protected get template() {
    return template;
  } 
}

export default Register;
