export interface Heading<TemplateFnReturnType> {
  level: number;
  children: TemplateFnReturnType | string;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
