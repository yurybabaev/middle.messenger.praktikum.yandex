import { prototype } from 'events';
import Block from '../../utils/block';
import template from './dropdown.hbs';
import * as classes from './dropdown.module.scss';

export interface DropdownProps {
  onClick?: EventListenerOrEventListenerObject
}

export class Dropdown extends Block {
  constructor(props: DropdownProps) {
    super({
      ...props,
      classes,
    });
    this.hide();
  }

  private _target: HTMLElement;

  public set target(val: HTMLElement) {
    this._target = val;
  }

  private get dropdownElement() {
    return this.refs.dropdown as HTMLElement;
  }

  private _boundOutsideClick = this.hideOnOutsideClick.bind(this);

  private hideOnOutsideClick() {
    window.removeEventListener('click', this._boundOutsideClick);
    this.hide();
  }

  public show(): void {
    window.removeEventListener('click', this._boundOutsideClick);
    super.show();
    if (this._target) {
      const coords = this._target.getBoundingClientRect();

      let left = (coords.left
                 + (this._target.offsetWidth - this.dropdownElement.offsetWidth) / 2);
      if (left < 20) left = 20;

      const right = left + this.dropdownElement.offsetWidth;
      if (right > document.body.offsetWidth - 20) {
        left -= right - document.body.offsetWidth + 20;
      }

      let top = coords.bottom + 20;
      if (top < 0) {
        top = coords.top + this._target.offsetHeight + 5;
      }

      this.dropdownElement.style.left = `${left}px`;
      this.dropdownElement.style.top = `${top}px`;
    }
    setTimeout(() => {
      window.addEventListener('click', this._boundOutsideClick);
    }, 0);
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Dropdown';
  }
}
