import Handlebars, { HelperOptions } from 'handlebars';
import Block from './block';
import { Link } from '../components/link/link';
import { Avatar } from '../components/avatar/avatar';
import { Button } from '../components/button/button';
import { Field } from '../components/field/field';
import { Form } from '../components/form/form';
import { Flyout } from '../layouts/flyout/flyout';
import { ChatItem } from '../pages/chat/components/chatItem/chatItem';
import { Search } from '../pages/chat/components/search/search';
import { ChatContent } from '../pages/chat/components/chatContent/chatContent';
import { ChatFeed } from '../pages/chat/components/chatFeed/chatFeed';
import { ChatMessage } from '../pages/chat/components/chatMessage/chatMessage';

function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.ComponentName, (options: HelperOptions) => {
    const { data, hash, fn } = options;
    const { children } = data.root;

    const component = new Component(hash);

    children[component.id] = component;

    if (fn) {
      return `<div data-container="id-${component.id}">${fn(data.root)}</div>`;
    }
    return `<div data-id="id-${component.id}"></div>`;
  });
}

export default () => {
  Handlebars.registerHelper('ChildContent', () => '<div data-content></div>');
  Handlebars.registerHelper(
    'modifyclass',
    (base: string, modifiers: string) => {
      if (!modifiers) {
        return base;
      }
      return String(modifiers).split(' ').reduce((prev, mod) => `${prev} ${base}_${mod}`, base);
    },
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
  registerComponent(ChatFeed);
  registerComponent(ChatMessage);
};
