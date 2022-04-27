import Handlebars from "handlebars";
import template from './form.hbs';
import "./form.scss";

Handlebars.registerPartial("form", template);

export default () => template();