export interface BuildExecutorSchema {
  imageName?: string;
  tag?: string;
  target?: string;
  cachePath?: string;
  verbose?: boolean;
} // eslint-disable-line
