import Block from '../../utils/block';
import template from './modal.hbs';
import * as classes from './modal.module.scss';

export interface ModalProps {
  avatarUrl?: string,
  onClick?: EventListenerOrEventListenerObject
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      classes,
    });
    this.hide();
    window.onclick = (e: MouseEvent) => {
      if (e.target === this.refs.modal) {
        this.hide();
      }
    };
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Modal';
  }
}
