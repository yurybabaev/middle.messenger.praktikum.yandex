import Handlebars from 'handlebars';
import template from './form.hbs';
import './form.scss';

const registerPartial = () => Handlebars.registerPartial('form', template);
export { registerPartial };

export default () => template();
