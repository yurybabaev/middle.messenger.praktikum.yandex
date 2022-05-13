import Block from "./block";

export default class DataBlock extends Block {
  private _validationError = false;

  public get validationError() {
    return this._validationError;
  }

  public set validationError(value) {
    this._validationError = value;
    this.setProps({
      validationError: this._validationError,
    });
  }

  public validate() { }
}