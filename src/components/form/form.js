import Handlebars from "handlebars";
import tpl from './form.hbs';
import "./form.scss";

Handlebars.registerPartial("form", tpl);

export default () => tpl();