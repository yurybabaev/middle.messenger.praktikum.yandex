import Handlebars from "handlebars";
import template from './flyout.hbs';
import "./flyout.scss";

Handlebars.registerPartial("flyout", template);

export default () => template();