import Handlebars from "handlebars";
import tpl from './chat.hbs';
import "./chat.scss";
import search from "./components/search/search";
import chatItem from "./components/chatItem/chatItem";
import mockChatData from "./mockChatData.json"
// [
//     '{{repeat(12)}}',
//     {
//       user: '{{firstName()}} {{surname()}}',
//       date: '{{date(new Date(2022, 2, 1), new Date(), "dd MMMM YY")}}',
//       text: '{{lorem(1, "paragraphs")}}',
//       unreadCount: '{{integer(0, 3)}}'   
//     }
//   ]

export default () => tpl( {
    chats: mockChatData
});