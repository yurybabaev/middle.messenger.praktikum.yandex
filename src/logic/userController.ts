import userApi from '../api/userApi';
import ApplicationError from '../models/error';
import User from '../models/user';
import router from '../utils/router';
import store from '../utils/store';
import StoreKeys from '../utils/storeKeys';

class UserController {
  public async ensureLogin(): Promise<void> {
    try {
      const currentUser = await userApi.read();
      store.put(StoreKeys.CURRENT_USER, currentUser);
    } catch (e) {
      router.go('/login');
    }
  }

  public async logout(): Promise<void> {
    try {
      await userApi.logout();
      store.put(StoreKeys.CURRENT_USER, null);
      store.put(StoreKeys.LAST_ERROR, null);
      router.go('/login');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async login(userName: string, password: string): Promise<void> {
    try {
      await userApi.login(userName, password);
      await this.ensureLogin();
      store.put(StoreKeys.LAST_ERROR, null);
      router.go('/');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async createUser(user: User): Promise<void> {
    try {
      store.put(StoreKeys.NEW_USER, user);
      if (user.password !== user.passwordRepeat) {
        store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError('Passwords do not match'));
        return;
      }
      await userApi.logout();
      store.put(StoreKeys.CURRENT_USER, null);
      const currentUser = await userApi.create(user);
      store.put(StoreKeys.CURRENT_USER, currentUser);
      store.put(StoreKeys.LAST_ERROR, null);
      router.go('/chat');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async editUser(user: User): Promise<void> {
    try {
      const currentUser = await userApi.update(user);
      store.put(StoreKeys.CURRENT_USER, currentUser);
      store.put(StoreKeys.LAST_ERROR, null);
      router.go('/user/view');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string,
    newPasswordRepeat: string,
  ): Promise<void> {
    try {
      if (newPassword !== newPasswordRepeat) {
        store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError('Passwords do not match'));
        return;
      }
      await userApi.changePassword(oldPassword, newPassword);
      store.put(StoreKeys.LAST_ERROR, null);
      router.go('/user/view');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async changeAvatar(avatar: File): Promise<void> {
    try {
      if (!avatar.size) {
        store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError('You should select file first'));
        return;
      }
      const currentUser = await userApi.changeAvatar(avatar);
      store.put(StoreKeys.CURRENT_USER, currentUser);
      store.put(StoreKeys.LAST_ERROR, null);
      // router.go('/user/view');
    } catch (e) {
      store.putAndClear(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }
}
export default new UserController();
