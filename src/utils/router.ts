import Block from './block';
import Route from './route';

class Router {
  private _routes: Route[];

  private _history: History;

  private _currentRoute: null | Route;

  private _notFoundRoute: null | Route;

  private _rootQuery: string;

  constructor() {
    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
  }

  public setup(rootQuery: string) {
    this._rootQuery = rootQuery;
    return this;
  }

  use(pathName: string, viewClass: typeof Block, windowTitle?: string, props?: unknown) {
    const route = new Route(pathName, viewClass, this._rootQuery, windowTitle || '', props);

    this._routes.push(route);

    return this;
  }

  notFound(pathName: string, viewClass: typeof Block, windowTitle?: string) {
    this._notFoundRoute = new Route(pathName, viewClass, this._rootQuery, windowTitle || '', {});

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this.onRoute((event.currentTarget as Window).location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathName: string) {
    const route = this.getRoute(pathName) || this._notFoundRoute;
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathName: string) {
    this._history.pushState({}, '', pathName);
    this.onRoute(pathName);
  }

  getRoute(pathName: string) {
    return this._routes.find((route) => route.match(pathName));
  }
}

export default new Router();
