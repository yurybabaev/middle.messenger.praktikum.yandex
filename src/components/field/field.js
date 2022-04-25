import Handlebars from "handlebars";
import tpl from './field.hbs';
import "./field.scss";

Handlebars.registerPartial("field", tpl);

export default () => tpl();