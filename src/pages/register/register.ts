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

  protected render() {
    return /* html */ `<div class="container container__centered container__fullHeight">
    <div class="register register__container shadowBox">
      <span class="register__label">Register</span>
      {{#> form}}
      {{> field caption="Email" type="email" name="email" classModifier="field_register"}}
      {{> field caption="Login" type="text" name="login" classModifier="field_register"}}
      {{> field caption="First name" type="text" name="first_name" classModifier="field_register"}}
      {{> field caption="Second name" type="text" name="second_name" classModifier="field_register"}}
      {{> field caption="Phone" type="text" name="phone" classModifier="field_register"}}
      {{> field caption="Password" type="password" name="password" classModifier="field_register"}}
      {{> field caption="Repeat password" type="password" name="password_repeat" classModifier="field_register"}}
      <div class="register__buttonContainer">
        {{!-- {{> button caption="Register" classModifier="button_primary" }} --}}
        {{{Button caption="Register" classModifier="button_primary" onClick=onRegisterClick }}}
      </div>
      {{/form}}
      {{> link caption="Sign in" url="/login" classModifier="register__link"}}
    </div>
  </div>`;
  }
}

export default Register;
