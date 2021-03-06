import { nanoid } from 'nanoid';
import EventBus from './eventBus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CWU = 'flow:component-will-update',
  FLOW_CDU = 'flow:component-did-update',
}

interface Meta {
  propsChanged: boolean,
  oldEvents: Events
}

type Props = any;
type Events = Record<string, EventListenerOrEventListenerObject | undefined>;

class Block {
  public static get ComponentName() {
    return '';
  }

  protected get template(): (data?: any) => string {
    return () => '';
  }

  public id = nanoid(8);

  private _element: HTMLElement;

  private _meta: Meta;

  private _props: Props;

  private _eventBus: EventBus;

  private _children: Record<string, Block>;

  private _events: Events;

  private _refs: Record<string, HTMLElement | Block>;

  public get children(): Record<string, Block> {
    return this._children;
  }

  public get refs() {
    return this._refs;
  }

  constructor(props: Props = {}, events: Events = {}) {
    this._props = this._makePropsProxy(props);
    this._children = {};
    this._refs = {};
    this._events = events;

    // Object.entries(events).forEach(([key, event]) => {
    //   this._events[key] = event;
    // });

    this._meta = {
      propsChanged: false,
      oldEvents: this._events, // TODO: if we need to replace events in the future
    };

    this._eventBus = new EventBus();

    this._registerEvents();
    this._eventBus.emit(EVENTS.INIT);
  }

  protected get props() {
    return this._props;
  }

  _addDomEvents() {
    Object.entries(this._events).forEach(([event, listener]) => {
      if (listener) {
        this._element.addEventListener(event, listener);
      }
    });
    this._meta.oldEvents = this._events;
  }

  _removeDomEvents() {
    Object.entries(this._meta.oldEvents).forEach(([event, listener]) => {
      if (listener) {
        this._element.removeEventListener(event, listener);
      }
    });
  }

  _registerEvents() {
    this._eventBus.on(EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    this._eventBus.on(EVENTS.FLOW_CWU, this._componentWillUpdate.bind(this));
    this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this._eventBus.emit(EVENTS.FLOW_RENDER);
  }

  _componentDidMount(oldProps: Props): void {
    this.componentDidMount(oldProps);
  }

  // ?????????? ???????????????????????????? ????????????????????????, ?????????????????????????? ??????????????
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidMount(oldProps: Props): void {

  }

  dispatchComponentDidMount() {
    Object.entries(this.children).forEach(([, child]) => {
      child.dispatchComponentDidMount();
    });
    this._eventBus.emit(EVENTS.FLOW_CDM, this._props);
  }

  _componentWillUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentWillUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(EVENTS.FLOW_RENDER);
    }
  }

  // ?????????? ???????????????????????????? ????????????????????????, ?????????????????????????? ??????????????
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentWillUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  _componentDidUpdate(newProps: Props) {
    this.componentDidUpdate(newProps);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(newProps: Props) {
  }

  public setProps(nextProps: Props) {
    if (!nextProps) {
      return;
    }
    this._meta.propsChanged = false;
    const oldProps = { ...this._props };
    Object.assign(this._props, nextProps);
    if (this._meta.propsChanged) {
      this._eventBus.emit(EVENTS.FLOW_CWU, oldProps, this._props);
    }
  }

  get element() {
    return this._element;
  }

  _render() {
    // console.log('render:', (this.constructor as typeof Block).ComponentName);

    this._children = {};
    const fragment = this._applyTemplate({ ...this.props });

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeDomEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addDomEvents();

    this._eventBus.emit(EVENTS.FLOW_CDU, this._props);
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
    // ?????????? ?????????????? ??????????, ?????????????? ?????????? ?????????????????? ?? ?????????? ?????????????? ?????????? ?????????????????? ????????????
    return document.createElement(tagName);
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }

  _applyTemplate(context: any) {
    const fragment = Block._createDocumentElement('template') as HTMLTemplateElement;

    const htmlString = this.template({ ...context, children: this.children });

    fragment.innerHTML = htmlString;

    // refs
    fragment.content.querySelectorAll('[data-ref]').forEach((el) => {
      if (el instanceof HTMLElement) {
        this._refs[el.dataset.ref!] = el;
      }
    });

    // plain children elements
    Object.entries(this._children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if ('ref' in child.props) {
        this._refs[child.props.ref] = child;
      }

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent());
    });

    // container children elements
    Object.entries(this._children).forEach(([, child]) => {
      const container = fragment.content.querySelector(`[data-container="id-${child.id}"]`);

      if (!container) {
        return;
      }
      const containerContent = child.getContent();
      const containerContentPlaceholder = containerContent.querySelector('[data-content]');
      if (!containerContentPlaceholder) {
        return;
      }
      const newParent = containerContentPlaceholder.parentElement!;
      while (container.hasChildNodes()) {
        newParent.appendChild(container.removeChild(container.firstChild!));
      }
      containerContentPlaceholder.remove();
      container.replaceWith(containerContent);
    });

    return fragment.content;
  }
}

export default Block;
