import Handlebars from 'handlebars';
import template from './link.hbs';
import './link.scss';

const registerPartial = () => Handlebars.registerPartial('link', template);
export { registerPartial };

export default () => template();
