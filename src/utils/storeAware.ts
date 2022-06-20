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
    constructor(props: Record<string, unknown>, events: Events) {
      super({ ...props, ...getStoreValues(propertyMap) }, events);
      Object.entries(propertyMap).forEach(([key, val]) => {
        store.watch(val, (obj) => {
          this.setProps({
            [key]: obj,
          });
        });
      });
    }
  };
}
