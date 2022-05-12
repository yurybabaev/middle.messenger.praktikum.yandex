import Handlebars, { HelperOptions } from 'handlebars';
import Block from './block';

export default function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.ComponentName, (options: HelperOptions) => {
    const { data, hash, fn } = options;
    const { children } = data.root;

    const component = new Component(hash);

    children[component.id] = component;

    if (fn) {
      return `<div data-container="id-${component.id}">${fn(data.root)}</div>`;
    }
    return `<div data-id="id-${component.id}"></div>`;
  });
}
