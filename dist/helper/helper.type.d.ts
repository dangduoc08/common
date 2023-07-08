import { Query, ObjectData } from './utils';
export type TUtil = 'query' | 'object';
export type TUtilInstance<T extends TUtil> = T extends 'query' ? Query : T extends 'object' ? ObjectData : undefined;
