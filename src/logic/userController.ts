import userApi from '../api/userApi';
import ApplicationError from '../models/error';
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
      router.go('/login');
    } catch (e) {
      store.put(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }

  public async login(userName: string, password: string): Promise<void> {
    try {
      await userApi.login(userName, password);
      await this.ensureLogin();
      router.go('/');
    } catch (e) {
      store.put(StoreKeys.LAST_ERROR, new ApplicationError(e));
    }
  }
}
export default new UserController();
