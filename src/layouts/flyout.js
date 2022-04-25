import Handlebars from "handlebars";
import tpl from './flyout.hbs';
import "./flyout.scss";

Handlebars.registerPartial("flyout", tpl);

export default () => tpl();