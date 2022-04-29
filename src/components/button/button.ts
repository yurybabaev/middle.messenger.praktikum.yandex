import Handlebars from 'handlebars';
import template from './button.hbs';
import './button.scss';

const registerPartial = () => Handlebars.registerPartial('button', template);
export { registerPartial };

export default () => template();
