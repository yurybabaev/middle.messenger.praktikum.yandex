import { System } from './system';

function SystemPageHoc(code: string, text: string) {
  return class extends System {
    constructor() {
      super({
        code,
        text,
      });
    }
  };
}

export const SystemPageNotFound = () => SystemPageHoc('404', 'No such page');
export const SystemPageError = () => SystemPageHoc('500', 'Something went wrong');
