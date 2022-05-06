import { registerPartial as registerPartialLink } from '../components/link/link';
import { registerPartial as registerPartialAvatar } from '../components/avatar/avatar';
// import { registerPartial as registerPartialButton } from '../components/button/button';
import { registerPartial as registerPartialField } from '../components/field/field';
import { registerPartial as registerPartialForm } from '../components/form/form';
import { registerPartial as registerPartialFlyout } from '../layouts/flyout';
import { registerPartial as registerPartialChatItem } from '../pages/chat/components/chatItem/chatItem';
import { registerPartial as registerPartialSearch } from '../pages/chat/components/search/search';

export default () => {
  registerPartialLink();
  registerPartialAvatar();
  // registerPartialButton();
  registerPartialField();
  registerPartialForm();
  registerPartialFlyout();
  registerPartialChatItem();
  registerPartialSearch();
};