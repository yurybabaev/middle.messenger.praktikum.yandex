enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

function queryStringify(data: Record<string, any>) {
  const keys = Object.keys(data);
  return keys.reduce((acc, key, index) => `${acc}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export interface RequestOptions {
  data?: Record<string, any>;
  headers?: Headers;
  timeout?: number;
}

export class Request {

  private _baseUrl: string | URL;

  constructor(baseUrl: string | URL = '') {
    this._baseUrl = baseUrl;
  }

  public get(url: string | URL, options: RequestOptions) {
    return this.request(url, METHODS.GET, options.timeout, options.headers, options.data);
  }

  public post(url: string | URL, options: RequestOptions) {
    return this.request(url, METHODS.POST, options.timeout, options.headers, options.data);
  }

  public put(url: string | URL, options: RequestOptions) {
    return this.request(url, METHODS.PUT, options.timeout, options.headers, options.data);
  }

  public delete(url: string | URL, options: RequestOptions) {
    return this.request(url, METHODS.DELETE, options.timeout, options.headers, options.data);
  }

  public request(
    url: string | URL,
    method: METHODS,
    timeout = 5000,
    headers?: Headers,
    data?: Record<string, any>,
  ) {
    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && data
          ? new URL(`${url}${queryStringify(data)}`, this._baseUrl)
          : new URL(url, this._baseUrl),
      );

      if (headers) {
        headers.forEach((value, key) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (data) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  }
}
