/* eslint-disable class-methods-use-this */
import { nanoid } from 'nanoid';
import EventBus from './eventBus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
}

interface Meta {
  propsChanged: boolean,
  oldEvents: any
}

type Props = any;

abstract class Block {
  public id = nanoid(8);

  private _element: HTMLElement;

  private _meta: Meta;

  private _props: Props;

  private _eventBus: EventBus;

  private _children: Record<string, Block>;

  constructor(propsAndChildren: any = {}) {
    const { props, children } = this._getPropsAndChildren(propsAndChildren);

    this._props = this._makePropsProxy(props);
    this._children = children;

    this._meta = {
      propsChanged: false,
      oldEvents: this._props.events,
    };

    this._eventBus = new EventBus();

    this._registerEvents();
    this._eventBus.emit(EVENTS.INIT);
  }

  protected get props() {
    return this._props;
  }

  _addDomEvents() {
    const propsEvents: Record<string, () => void> = this.props.events;
    if (!propsEvents || !this._element) {
      return;
    }

    Object.entries(propsEvents).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener);
    });
    this._meta.oldEvents = this.props.events;
  }

  _removeDomEvents() {
    const propsEvents: Record<string, () => void> = this._meta.oldEvents;
    if (!propsEvents || !this._element) {
      return;
    }

    Object.entries(propsEvents).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener);
    });
  }

  _getPropsAndChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _registerEvents() {
    this._eventBus.on(EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this._eventBus.emit(EVENTS.FLOW_RENDER);
  }

  _componentDidMount(oldProps: Props): void {
    this.componentDidMount(oldProps);
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  protected componentDidMount(oldProps: Props): void {

  }

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.FLOW_CDM, this._props);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, , class-methods-use-this
  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  public setProps(nextProps: Props) {
    if (!nextProps) {
      return;
    }
    this._meta.propsChanged = false;
    const oldProps = { ...this._props };
    Object.assign(this._props, nextProps);
    if (this._meta.propsChanged) {
      this._eventBus.emit(EVENTS.FLOW_CDU, oldProps, this._props);
    }
  }

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    const newElement = fragment.firstChild as HTMLElement;

    if (this._element) {
      this._removeDomEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addDomEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, val) {
        if (target[prop] !== val) {
          self._meta.propsChanged = true;
          // eslint-disable-next-line no-param-reassign
          target[prop] = val;
        }
        return true;
      },

      deleteProperty() {
        throw new Error('Access denied');
      },

    });
  }

  static _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,  class-methods-use-this
  compile(template: any, context: any) {
    const fragment = Block._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this._children).forEach(([key, child]) => {
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    const htmlString = template(context);

    fragment.innerHTML = htmlString;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this._children).forEach(([_, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }
}

export default Block;
