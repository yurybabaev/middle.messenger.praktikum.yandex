import Handlebars from "handlebars";
import tpl from './chatItem.hbs';
import "./chatItem.scss";
import avatar from "../../../../components/avatar/avatar";

Handlebars.registerPartial("chatItem", tpl);

export default () => tpl();