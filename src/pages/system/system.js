import Handlebars from "handlebars";
import template from './system.hbs'
import "./system.scss"

export default (code, text) => template({
    code: code,
    text: text
});