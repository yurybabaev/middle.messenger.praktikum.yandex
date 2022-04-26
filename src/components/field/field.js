import Handlebars from "handlebars";
import template from './field.hbs';
import "./field.scss";

Handlebars.registerPartial("field", template);

export default () => template();