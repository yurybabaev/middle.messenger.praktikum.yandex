import Handlebars from 'handlebars';
import template from './field.hbs';
import './field.scss';

const registerPartial = () => Handlebars.registerPartial('field', template);
export { registerPartial };

export default () => template();
