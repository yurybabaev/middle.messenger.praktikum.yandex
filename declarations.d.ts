declare module '*.scss' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.png' {
  const value: (data?: unknown) => string;
  export default value;
}

declare module '*.svg' {
  const value: (data?: unknown) => string;
  export default value;
}

declare module '*.hbs' {
  const value: (data?: unknown) => string;
  export default value;
}
