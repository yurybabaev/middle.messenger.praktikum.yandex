import Handlebars from "handlebars";
import template from './chat.hbs';
import "./chat.scss";
import search from "./components/search/search";
import chatItem from "./components/chatItem/chatItem";
import mockChatData from "./mockChatData.json"

export default () => template( {
    chats: mockChatData
});