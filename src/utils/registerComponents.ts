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
import { Modal } from '../components/modal/modal';
import { ChangeAvatar } from '../pages/user/changeAvatar/changeAvatar';
import { Dropdown } from '../components/dropdown/dropdown';
import { AddChat } from '../pages/chat/components/addChat/addChat';
import { AddUser } from '../pages/chat/components/addUser/addUser';
import { DeleteUser } from '../pages/chat/components/deleteUser/deleteUser';

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
    (classes: Record<string, string>, base: string, modifiers: string) => {
      if (!modifiers) {
        return classes[base];
      }
      return String(modifiers).split(' ').reduce(
        (prev, mod) => `${prev} ${classes[`${base}_${mod}`]}`,
        classes[base],
      );
    },
  );

  Handlebars.registerHelper(
    'formatTime',
    (time: Date) => Intl.DateTimeFormat(
      undefined,
      {
        hour: 'numeric',
        minute: 'numeric',
      },
    ).format(time),
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
  registerComponent(Modal);
  registerComponent(ChangeAvatar);
  registerComponent(Dropdown);
  registerComponent(AddChat);
  registerComponent(AddUser);
  registerComponent(DeleteUser);
};
