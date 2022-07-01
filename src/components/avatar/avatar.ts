import defaultAvatar from 'url:./defaultAvatar.png';
import Block from '../../utils/block';
import template from './avatar.hbs';
import * as classes from './avatar.module.scss';

export interface AvatarProps {
  avatarUrl?: string,
  onClick?: EventListenerOrEventListenerObject,
  hasOverlay: boolean,
  overlayText: string
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      classes,
      defaultAvatar,
    }, {
      click: props.onClick,
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Avatar';
  }
}
