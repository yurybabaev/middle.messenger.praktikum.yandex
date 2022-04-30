declare module '*.scss' {
  const value: Record<string, string>;
  export default value;
}

declare module 'url:*' {
  const value: string;
  export default value;
}
