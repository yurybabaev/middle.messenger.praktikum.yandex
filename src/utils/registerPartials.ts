import { registerPartial as registerPartialLink } from '../components/link/link';
import { registerPartial as registerPartialAvatar } from '../components/avatar/avatar';
// import { registerPartial as registerPartialButton } from '../components/button/button';
import { Button } from '../components/button/button';
import { Field } from '../components/field/field';
import { Form } from '../components/form/form';
import { registerPartial as registerPartialFlyout } from '../layouts/flyout';
import { registerPartial as registerPartialChatItem } from '../pages/chat/components/chatItem/chatItem';
import { registerPartial as registerPartialSearch } from '../pages/chat/components/search/search';
import registerComponent from './registerComponent';

export default () => {
  registerPartialLink();
  registerPartialAvatar();
  // registerPartialButton();
  registerComponent(Button);
  registerComponent(Field);
  registerComponent(Form);
  registerPartialFlyout();
  registerPartialChatItem();
  registerPartialSearch();
};
