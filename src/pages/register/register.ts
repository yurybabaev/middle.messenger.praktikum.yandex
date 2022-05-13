import DataContainerBlock from '../../utils/dataContainerBlock';
import template from './register.hbs';
import * as classes from './register.module.scss';

class Register extends DataContainerBlock {
  constructor() {
    super({
      classes,
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
          console.log(this.getFormValues(e.target as HTMLFormElement));
        }
      },
    });
  }

  protected get template() {
    return template;
  }
}

export default Register;
