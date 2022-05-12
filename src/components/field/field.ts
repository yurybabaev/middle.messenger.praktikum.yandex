import Block from '../../utils/block';
import template from './field.hbs';
import * as classes from './field.module.scss';

export interface FieldProps {

}

export class Field extends Block {
  constructor(props: FieldProps) {
    super(
      {
        ...props,
        classes,
      },
      {
        change: (e: Event) => {
          const input = e.target as HTMLInputElement;
          alert(input.value);
          this.setProps({
            validationError: input.value === 'a',
          });
        },
      },
    );
  }

  public static get ComponentName(): string {
    return 'Field';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
