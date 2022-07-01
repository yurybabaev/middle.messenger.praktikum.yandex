function isError(error: Error | string): error is Error {
  return (error as Error).message !== undefined;
}

export default class ApplicationError {
  text: string;

  constructor(error: Error | string) {
    if (isError(error)) {
      this.text = error.message;
    } else {
      this.text = error;
    }
  }
}
