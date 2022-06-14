import BaseModel from '../models/baseModel';
import EventBus from './eventBus';
import StoreKeys from './storeKeys';

class Store extends EventBus {
  private _store: Record<string, BaseModel> = {};

  public put(key: StoreKeys, model: BaseModel) {
    this._store[key] = model;
    this.emit(key, model);
  }

  public watch<T extends BaseModel>(
    key: StoreKeys,
    callback: (obj: T) => void,
  ) {
    return super.on(key, (a) => callback(a as T));
  }
}

export default new Store();
