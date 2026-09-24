declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const src: string;
  export default src;
}
