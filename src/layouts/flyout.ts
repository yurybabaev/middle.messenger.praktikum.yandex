import Handlebars from 'handlebars';
import template from './flyout.hbs';
import './flyout.scss';

const registerPartial = () => Handlebars.registerPartial('flyout', template);
export { registerPartial };

export default () => template();
