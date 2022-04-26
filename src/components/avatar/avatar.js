import Handlebars from "handlebars";
import template from './avatar.hbs';
import "./avatar.scss";
import defaultAvatar from "url:./defaultAvatar.png"

Handlebars.registerPartial("avatar", (params) => {
    return template({
        ...params,
        defaultAvatar: defaultAvatar
    });
});

export default () => template();