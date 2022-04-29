import template from './mockMain.hbs';
import './mockMain.scss';

export default (links: { text: string, url: string }[]) => template({
  links,
});
