import Handlebars from "handlebars";
import template from './search.hbs';
import "./search.scss";
import searchIcon from "url:./searchIcon.svg"

Handlebars.registerPartial("search", (params) => {
    return template({
        ...params,
        searchIcon: searchIcon
    });
});

export default () => template();