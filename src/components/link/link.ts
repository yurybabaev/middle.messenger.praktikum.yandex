import Block from '../../utils/block';
import template from './link.hbs';
import classes from './link.module.scss';
import router from '../../utils/router';

export interface ILinkProps {
  routed?: boolean;
  url?: string;
  caption?: string;
  classModifier?: string;
  tag?: string;
  clickHandler?: (tag: string) => {};
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super(
      {
        ...props,
        classes,
      },
      {
        click: (event: MouseEvent) => {
          if (props.clickHandler) {
            event.preventDefault();
            props.clickHandler(this.props.tag);
          }
          if (props.routed) {
            router.go(props.url!);
            event.preventDefault();
          }
        },
      },
    );
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'Link';
  }
}

export default Link;
