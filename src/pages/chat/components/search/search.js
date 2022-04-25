import Handlebars from "handlebars";
import tpl from './search.hbs';
import "./search.scss";
import searchIcon from "url:./searchIcon.svg"

Handlebars.registerPartial("search", (params) => {
    return tpl({
        ...params,
        searchIcon: searchIcon
    });
});

export default () => tpl();