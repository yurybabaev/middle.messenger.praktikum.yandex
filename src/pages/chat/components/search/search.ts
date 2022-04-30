import Handlebars from 'handlebars';
import searchIcon from 'url:./searchIcon.svg';
import template from './search.hbs';
import './search.scss';

const registerPartial = () => Handlebars.registerPartial('search', (params) => template({
  ...params,
  searchIcon,
}));
export { registerPartial };

export default () => template();
