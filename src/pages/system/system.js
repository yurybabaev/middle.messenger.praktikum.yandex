import Handlebars from "handlebars";
import tpl from './system.hbs'
import "./system.scss"

export default (code, text) => tpl({
    code: code,
    text: text
});