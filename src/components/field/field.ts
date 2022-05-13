import Block from '../../utils/block';
import template from './field.hbs';
import * as classes from './field.module.scss';

export interface FieldProps {
  value?: any;
  required?: boolean;
  regexp?: string;
}

export class Field extends Block {
  private _value: any;

  protected get value(): any {
    return this._value;
  }

  protected set value(val: any) {
    if (val === undefined) {
      this._value = null;
    } else {
      this._value = val;
    }
  }

  protected _focus = false;

  protected _selectionStart: number | null = 0;

  constructor(props: FieldProps) {
    super(
      {
        ...props,
        // value: props.value || "a",
        classes,
      },
      {
        change: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.value = input.value;
          this._selectionStart = input.selectionStart;
        },
        focusout: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this._focus = false;
          this._selectionStart = input.selectionStart;
          this.validate();
        },
        focusin: () => {
          this._focus = true;
          this.validationError = false;
        },
      },
    );
    this.value = props.value;
  }

  private _validationError = false;

  public get validationError() {
    return this._validationError;
  }

  public set validationError(value) {
    this._validationError = value;
    this.setProps({
      validationError: this._validationError,
    });
  }

  protected get inputControl() {
    return this.refs.inputControl as HTMLInputElement;
  }

  private get fieldProps() {
    return this.props as FieldProps;
  }

  public validate() {
    let validValue = true;
    if (this.fieldProps.required && !this.inputControl.value) {
      validValue = false;
    }
    if (this.fieldProps.regexp
      && !String(this.inputControl.value).toLowerCase().match(this.fieldProps.regexp)) {
      validValue = false;
    }
    this.validationError = !validValue;
  }

  protected componentWillUpdate(oldProps: any, newProps: any): boolean {
    this.setProps({
      value: this._value,
    });
    return true;
  }

  protected componentDidUpdate(newProps: any): void {
    console.log(this._selectionStart);
    if (this._focus) {
      this.inputControl.focus();
      this.inputControl.selectionStart = this._selectionStart;
    }
  }

  public static get ComponentName(): string {
    return 'Field';
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
