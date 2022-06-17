import { Request } from '../utils/request';

export default abstract class BaseApi<T> {
  protected request = new Request('https://ya-praktikum.tech/api/v2');

  public async create(item: T): Promise<T> { throw new Error('Not implemented'); }
  public abstract read(params: unknown): T | T[];
  public abstract update(item: T): T;
  public abstract delete(item: T): boolean;
}
