/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from '../utils/request';

interface FailReason {
  reason: string;
}

export default abstract class BaseApi<T> {
  protected baseUrl = 'https://ya-praktikum.tech/api/v2';

  protected baseResourcesUrl = 'https://ya-praktikum.tech/api/v2/resources';

  protected request = new Request(this.baseUrl);

  public async create(item: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async read(params?: unknown): Promise<T | T[]> {
    throw new Error('Not implemented');
  }

  public async update(item: T): Promise<T | T[]> {
    throw new Error('Not implemented');
  }

  public abstract delete(item: T): boolean;

  protected checkResponseStatus(requestResult: XMLHttpRequest, normalStatus: number = 200) {
    if (requestResult.status !== normalStatus) {
      if (requestResult.status === 400) {
        let failReason = '';
        failReason = (JSON.parse(requestResult.response) as FailReason).reason;
        throw new Error(`Bad request: ${failReason}`);
      }
      if (requestResult.status === 401) {
        throw new Error('You are Unauthorized');
      }
      if (requestResult.status === 500) {
        throw new Error('Server returned unexpected error');
      }
      throw new Error(`Server returned code ${requestResult.status} with status ${requestResult.status}`);
    }
  }
}
