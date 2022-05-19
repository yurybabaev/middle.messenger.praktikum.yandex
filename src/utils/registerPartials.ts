import Handlebars from 'handlebars';
import { Link } from '../components/link/link';
import { Avatar } from '../components/avatar/avatar';
import { Button } from '../components/button/button';
import { Field } from '../components/field/field';
import { Form } from '../components/form/form';
import { Flyout } from '../layouts/flyout/flyout';
import { ChatItem } from '../pages/chat/components/chatItem/chatItem';
import { Search } from '../pages/chat/components/search/search';
import registerComponent from './registerComponent';
import { ChatContent } from '../pages/chat/components/chatContent/chatContent';

export default () => {
  Handlebars.registerHelper('ChildContent', () => '<div data-content></div>');
  Handlebars.registerHelper(
    'modifyclass',
    (base: string, modifiers: string) => String(modifiers).split(' ').reduce((prev, mod) => `${prev} ${base}_${mod}`, base),
  );

  registerComponent(Link);
  registerComponent(Avatar);
  registerComponent(Button);
  registerComponent(Field);
  registerComponent(Form);
  registerComponent(Flyout);
  registerComponent(ChatItem);
  registerComponent(Search);
  registerComponent(ChatContent);
};
