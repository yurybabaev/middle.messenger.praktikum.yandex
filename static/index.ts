import './index.scss';
import { Login } from '../src/pages/login/login';
import { Register } from '../src/pages/register/register';
import { UserView } from '../src/pages/user/userView/userView';
import { UserEdit } from '../src/pages/user/userEdit/userEdit';
import { UserChangePassword } from '../src/pages/user/userChangePassword/userChangePassword';
import { Chat } from '../src/pages/chat/chat';
import registerPartials from '../src/utils/registerComponents';
import router from '../src/utils/router';
import { SystemPageError, SystemPageNotFound } from '../src/pages/system';

registerPartials();

router.setup('#root')
  .use('/', Chat, 'Chat')
  .use('/login', Login, 'Login')
  .use('/register', Register, 'Register')
  .use('/user/view', UserView, 'Your profile')
  .use('/user/edit', UserEdit, 'Edit your profile')
  .use('/user/password', UserChangePassword, 'Change your password')
  .use('/404', SystemPageNotFound(), 'Not found')
  .use('/500', SystemPageError(), 'Error')
  .start();
