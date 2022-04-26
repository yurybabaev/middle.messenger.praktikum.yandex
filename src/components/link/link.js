import Handlebars from "handlebars";
import template from './link.hbs';
import "./link.scss";

Handlebars.registerPartial("link", template);

export default () => template();