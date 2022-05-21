import searchIcon from 'url:./searchIcon.svg';
import Block from '../../../../utils/block';
import template from './search.hbs';
import * as classes from './search.module.scss';

export default () => template();

export interface SearchProps {
  onChange?: EventListenerOrEventListenerObject
}

export class Search extends Block {
  constructor(props: SearchProps) {
    super({
      ...props,
      classes,
      searchIcon,
    }, {
      change: props.onChange,
    });
  }

  protected get template(): (data?: any) => string {
    return template;
  }
}
