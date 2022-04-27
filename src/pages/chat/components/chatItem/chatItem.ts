import Handlebars from "handlebars";
import template from './chatItem.hbs';
import "./chatItem.scss";
import avatar from "../../../../components/avatar/avatar";

Handlebars.registerPartial("chatItem", template);

export default () => template();