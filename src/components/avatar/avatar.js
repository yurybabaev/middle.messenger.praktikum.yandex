import Handlebars from "handlebars";
import tpl from './avatar.hbs';
import "./avatar.scss";
import defaultAvatar from "url:./defaultAvatar.png"

Handlebars.registerPartial("avatar", (params) => {
    return tpl({
        ...params,
        defaultAvatar: defaultAvatar
    });
});

export default () => tpl();