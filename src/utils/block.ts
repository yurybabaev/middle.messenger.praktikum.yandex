import EventBus from './eventBus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
}

interface Meta {
  tagName: string,
  propsChanged: boolean,
  oldEvents: any
}

type Props = any;

abstract class Block {
  private _element: HTMLElement;

  private _meta: Meta;

  private _props: Props;

  private _eventBus: EventBus;

  constructor(tagName: string = 'div', props: Props = {}) {
    this._props = this._makePropsProxy(props);

    this._meta = {
      tagName,
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

  _registerEvents() {
    this._eventBus.on(EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = Block._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
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
    this._removeDomEvents();
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
    this._addDomEvents();    
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  protected render(): string {
    return '';
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
}

export default Block;
