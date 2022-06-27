import BaseModel from '../models/baseModel';
import EventBus from './eventBus';
import StoreKeys from './storeKeys';

export type StoreType = {
  [key in StoreKeys]?: BaseModel | BaseModel[] | null
};

class Store extends EventBus {
  private _store: StoreType = {};

  public putAndClear(key: StoreKeys, model: BaseModel | BaseModel[]) {
    this.put(key, model);
    this.put(key, null, false);
  }

  public put(key: StoreKeys, model: BaseModel | BaseModel[] | null, notify: boolean = true) {
    this._store[key] = model;
    if (notify) {
      console.log(`Notify: ${key}`);
      this.emit(key, model);
    }
  }

  public notify(key: StoreKeys) {
    this.emit(key, this._store[key]);
  }

  public get<T extends BaseModel | BaseModel[]>(key: StoreKeys) {
    return this._store[key] as T;
  }

  public watch<T extends BaseModel | BaseModel[]>(
    key: StoreKeys,
    callback: (obj: T) => void,
  ) {
    return super.on(key, callback);
  }
}

export default new Store();
