import userController from '../../../logic/userController';
import Block from '../../../utils/block';
import DataContainerBlock from '../../../utils/dataContainerBlock';
import storeAware from '../../../utils/storeAware';
import StoreKeys from '../../../utils/storeKeys';
import template from './changeAvatar.hbs';
import * as classes from './changeAvatar.module.scss';

export interface ChangeAvatarProps {

}

class ChangeAvatar extends DataContainerBlock {
  constructor(props: ChangeAvatarProps) {
    super({
      ...props,
      classes,
      selectFileClick: () => this.onFileSelected(),
      onSubmit: async (e: Event) => {
        e.preventDefault();
        const formValues = this.getRawFormValues(e.target as HTMLFormElement);
        await userController.changeAvatar(formValues.avatarFile as File);
      },
    });
  }

  onFileSelected() {
    const avatarFileInput = this.refs.avatarFileInput as HTMLInputElement;
    const avatar = this.refs.avatar as Block;
    avatarFileInput.onchange = () => {
      if (!avatarFileInput.files || avatarFileInput.files.length < 1) {
        return;
      }
      const file = avatarFileInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const content = reader.result;
        avatar.setProps({
          avatarUrl: `${content}`,
        });
        // document.querySelector('#content').style.backgroundImage = 'url('+ content +')';
      };
    };
    avatarFileInput.click();
  }

  protected get template(): (data?: any) => string {
    return template;
  }

  public static get ComponentName(): string {
    return 'ChangeAvatar';
  }
}

export const storeAwareAvatar = storeAware(ChangeAvatar, {
  user: StoreKeys.CURRENT_USER,
  error: StoreKeys.LAST_ERROR,
});
export { storeAwareAvatar as ChangeAvatar };
