import BaseModel from '../models/baseModel';
import Block, { Events } from './block';
import store from './store';
import StoreKeys from './storeKeys';

const getStoreValues = (propertyMap: Record<string, StoreKeys>) => (
  Object.entries(propertyMap).reduce<Record<string, unknown>>((acc, [key, val]) => {
    acc[key] = store.get(val);
    return acc;
  }, {})
);

export default function storeAware(
  Component: typeof Block,
  propertyMap: Record<string, StoreKeys>,
) {
  return class extends Component {

    private _storeWatchers: Record<string, any> = {};

    constructor(props: Record<string, unknown>, events: Events) {
      super({ ...props, ...getStoreValues(propertyMap) }, events);
      Object.entries(propertyMap).forEach(([key, val]) => {
        const storeWatcher = (obj: BaseModel | BaseModel[]) => {
          this.setProps({
            [key]: obj,
          });
        };
        this._storeWatchers[val] = storeWatcher;
        store.watch(val, storeWatcher);
      });
    }

    protected componentWilUnmount(): void {
      Object.entries(this._storeWatchers).forEach(([key, val]) => {
        store.off(key, val);
    });
  };
}
