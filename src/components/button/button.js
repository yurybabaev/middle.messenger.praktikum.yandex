import Handlebars from "handlebars";
import template from './button.hbs';
import "./button.scss";

Handlebars.registerPartial("button", template);

export default () => template();