import Handlebars from 'handlebars';
import defaultAvatar from 'url:./defaultAvatar.png';
import template from './avatar.hbs';
import './avatar.scss';

const registerPartial = () => Handlebars.registerPartial('avatar', (params) => template({
  ...params,
  defaultAvatar,
}));
export { registerPartial };

export default () => template();
