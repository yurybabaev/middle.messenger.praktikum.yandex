/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from '../utils/request';

interface FailReason {
  reason: string;
}

export default abstract class BaseApi<T> {
  protected readonly baseUrl = 'https://ya-praktikum.tech/api/v2';

  protected readonly baseResourcesUrl = 'https://ya-praktikum.tech/api/v2/resources';

  protected request = new Request(this.baseUrl);

  public async create(_item: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async read(_params?: unknown): Promise<T | T[]> {
    throw new Error('Not implemented');
  }

  public async update(_item: T): Promise<T | T[]> {
    throw new Error('Not implemented');
  }

  public abstract delete(item: T): boolean;

  protected checkResponseStatus(requestResult: XMLHttpRequest, normalStatus: number = 200) {
    if (requestResult.status !== normalStatus) {
      const failReason = (JSON.parse(requestResult.response) as FailReason)?.reason;
      if (requestResult.status === 400) {
        throw new Error(`Bad request: ${failReason}`);
      }
      if (requestResult.status === 401) {
        throw new Error(`Unauthorized: ${failReason}`);
      }
      if (requestResult.status === 500) {
        throw new Error('Server returned unexpected error');
      }
      throw new Error(`Server returned code ${requestResult.status} with status ${requestResult.status}`);
    }
  }
}
