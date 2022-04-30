import Handlebars from 'handlebars';
import template from './chatItem.hbs';
import './chatItem.scss';

const registerPartial = () => Handlebars.registerPartial('chatItem', template);
export { registerPartial };

export default () => template();
