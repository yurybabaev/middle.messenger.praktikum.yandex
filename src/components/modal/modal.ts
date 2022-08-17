import Block from '../../utils/block';
import template from './modal.hbs';
import classes from './modal.module.scss';

export interface ModalProps {
  onClick?: EventListenerOrEventListenerObject
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      classes,
    });
    window.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.refs.modal) {
        this.hide();
      }
    });
    this.hide();
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Modal';
  }
}
