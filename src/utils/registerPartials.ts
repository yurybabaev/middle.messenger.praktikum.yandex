import Handlebars from 'handlebars';
import link from '../components/link/link.hbs';
import avatar from '../components/avatar/avatar.hbs';
import { registerPartial } from '../components/button/button';
import field from '../components/field/field.hbs';
import form from '../components/form/form.hbs';
import flyout from '../layouts/flyout.hbs';
import chatItem from '../pages/chat/components/chatItem/chatItem.hbs';
import search from '../pages/chat/components/search/search.hbs';

export default () => {
  Handlebars.registerPartial('link', link);
  Handlebars.registerPartial('avatar', (params) => avatar({
    ...params,
    // defaultAvatar,
  }));
  registerPartial();
  Handlebars.registerPartial('field', field);
  Handlebars.registerPartial('form', form);
  Handlebars.registerPartial('flyout', flyout);
  Handlebars.registerPartial('chatItem', chatItem);
  Handlebars.registerPartial('search', (params) => search({
    ...params,
    /* searchIcon, */
  }));
};
