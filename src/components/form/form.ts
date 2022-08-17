import Block from '../../utils/block';
import template from './form.hbs';
import classes from './form.module.scss';

export interface FormProps {
  onSubmit?: EventListener;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      classes,
    }, {
      submit: props.onSubmit,
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Form';
  }
}
