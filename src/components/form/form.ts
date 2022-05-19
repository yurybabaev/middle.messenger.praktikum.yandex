import Block from '../../utils/block';
import template from './form.hbs';
import * as classes from './form.module.scss';

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

  public static get ComponentName(): string {
    return 'Form';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
