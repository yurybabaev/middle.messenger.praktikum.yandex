import './index.scss';
import Login from '../src/pages/login/login';
import Register from '../src/pages/register/register';
import { MockMain } from '../src/pages/mockMain/mockMain';
import { UserView } from '../src/pages/user/userView/userView';
import { UserEdit } from '../src/pages/user/userEdit/userEdit';
import { UserChangePassword } from '../src/pages/user/userChangePassword/userChangePassword';
import Chat from '../src/pages/chat/chat';
import { System } from '../src/pages/system/system';
import registerPartials from '../src/utils/registerComponents';
import Block from '../src/utils/block';
import renderDom from '../src/utils/renderDom';

registerPartials();

const route = window.location.pathname.toLowerCase();

const renderPage = (pathStart: string, Page: typeof Block, props?: any) => {
  if (route === pathStart) {
    renderDom('#root', new Page(props));
  }
};

renderPage(
  '/',
  MockMain,
  {
    links: [
      { text: 'Main', url: '/' },
      { text: 'Login', url: '/login' },
      { text: 'Register', url: '/register' },
      { text: 'User info', url: '/user/view' },
      { text: 'User edit', url: '/user/edit' },
      { text: 'User change password', url: '/user/changePassword' },
      { text: 'Chat', url: '/chat' },
      { text: '404', url: '/404' },
      { text: '500', url: '/500' },
    ],
  },

);

renderPage('/login', Login);
renderPage('/register', Register);
renderPage('/user/view', UserView);
renderPage('/user/edit', UserEdit);
renderPage('/user/changepassword', UserChangePassword);
renderPage('/chat', Chat);
renderPage('/404', System, { code: 404, text: 'No such page' });
renderPage('/500', System, { code: 500, text: 'Something went wrong' });
