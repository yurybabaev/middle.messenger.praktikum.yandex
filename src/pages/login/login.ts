import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './login.hbs';
import * as classes from './login.module.scss';

class Login extends DataContainerBlock {
  constructor() {
    super({
      classes,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          const values = this.getFormValues(e.target as HTMLFormElement);
          // eslint-disable-next-line no-console
          console.log(values);
        }
      },
    });
  }

  protected get template() {
    return template;
  }
}

export default Login;
