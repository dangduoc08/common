import { Query } from './utils';

export type TUtil = 'query';

export type TUtilInstance<T extends TUtil> = T extends 'query'
  ? Query
  : undefined;
