export interface BuildExecutorSchema {
  imageName?: string;
  tag?: string;
  target?: string;
  cachePath?: string;
  verbose?: boolean;
  builder?: string;
  dockerNamespace?: string;
  publish?: boolean;
  path?: string;
} // eslint-disable-line
