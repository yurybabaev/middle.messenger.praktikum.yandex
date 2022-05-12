import Block from '../../utils/block';
import template from './register.hbs';
import * as classes from './register.module.scss';

console.log(classes);

class Register extends Block {
  constructor() {
    super({
      classes,
      onRegisterClick: () => { alert('wanna register! '); },
      onSubmit: (e: Event) => {alert('submit'); e.preventDefault(); console.log(this.children); }
    });
  }

  protected get template() {
    return template;
  } 
}

export default Register;
