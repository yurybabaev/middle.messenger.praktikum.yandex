import Block from './block';
import renderDom from './renderDom';

export default class Route {
  private _pathName: string;

  private _viewClass: typeof Block;

  private _view: Block | null;

  private _rootQuery: string;

  private _props: unknown;

  private _windowTitle: string;

  constructor(
    pathName: string,
    viewClass: typeof Block,
    rootQuery: string,
    windowTitle: string,
    props: unknown,
  ) {
    this._pathName = pathName;
    this._viewClass = viewClass;
    this._view = null;
    this._props = props;
    this._rootQuery = rootQuery;
    this._windowTitle = windowTitle;
  }

  navigate(pathName: string) {
    if (this.match(pathName)) {
      this._pathName = pathName;
      this.render();
    }
  }

  leave() {
    if (this._view) {
      this._view.hide();
    }
  }

  match(pathName: string) {
    return pathName === this._pathName;
  }

  render() {
    document.title = this._windowTitle;
    if (!this._view) {
      this._view = new this._viewClass(this._props);
      renderDom(this._rootQuery, this._view);
      return;
    }
    this._view.show();
  }
}
