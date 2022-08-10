import Block from './block';
import DataBlock from './dataBlock';

export default class DataContainerBlock extends Block {
  protected validate() {
    let validationOk = true;
    Object.entries(this.children).forEach(([, child]) => {
      if (child instanceof DataBlock) {
        child.validate();
        if (child.validationError) {
          validationOk = false;
        }
      }
    });
    return validationOk;
  }

  protected getFormValues<T extends object>(form: HTMLFormElement) {
    return this.getRawFormValues(form) as T;
  }

  protected getRawFormValues(form: HTMLFormElement) {
    return Object.fromEntries(new FormData(form));
  }
}
