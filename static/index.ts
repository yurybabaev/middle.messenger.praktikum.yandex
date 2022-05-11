import './index.scss';
import login from '../src/pages/login/login';
import Register from '../src/pages/register/register';
import mockMain from '../src/pages/mockMain/mockMain';
import userView from '../src/pages/user/userView/userView';
import userEdit from '../src/pages/user/userEdit/userEdit';
import userChangePassword from '../src/pages/user/userChangePassword/userChangePassword';
import chat from '../src/pages/chat/chat';
import system from '../src/pages/system/system';
import registerPartials from '../src/utils/registerPartials';
import Block from '../src/utils/block';
import renderDom from '../src/utils/renderDom';
import { Button } from '../src/components/button/button';

registerPartials();

const setHtml = (html: string) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = html;
  }
};

const route = window.location.pathname.toLowerCase();
const setContent = (
  pathStart: string,
  tplFunc: (...params: unknown[]) => string,
  ...params: unknown[]
) => {
  if (route === pathStart) {
    setHtml(tplFunc(...params));
  }
};

const renderPage = (pathStart: string, page: Block) => {
  if (route === pathStart) {
    renderDom('#root', page);
  }
};

setContent(
  '/',
  mockMain,
  [
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

);

const register = new Register();

setContent('/login', login);
renderPage('/register', register);
setContent('/user/view', userView);
setContent('/user/edit', userEdit);
setContent('/user/changepassword', userChangePassword);
setContent('/chat', chat);
setContent('/404', system, 404, 'No such page');
setContent('/500', system, 500, 'Something went wrong');
