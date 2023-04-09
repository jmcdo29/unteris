export interface BuildExecutorSchema {
  imageName?: string;
  tag?: string;
  target?: string;
  cachePath?: string;
  verbose?: boolean;
  builder?: string;
} // eslint-disable-line
