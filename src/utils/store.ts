import BaseModel from '../models/baseModel';
import EventBus from './eventBus';
import StoreKeys from './storeKeys';

export type StoreType = {
  [key in StoreKeys]?: BaseModel | null
};

class Store extends EventBus {
  private _store: StoreType = {};

  public put(key: StoreKeys, model: BaseModel | null, notify: boolean = true) {
    this._store[key] = model;
    if (notify) {
      this.emit(key, model);
    }
  }

  public get<T extends BaseModel>(key: StoreKeys) {
    return this._store[key] as T;
  }

  public watch<T extends BaseModel>(
    key: StoreKeys,
    callback: (obj: T) => void,
  ) {
    return super.on(key, (a) => callback(a as T));
  }
}

export default new Store();
