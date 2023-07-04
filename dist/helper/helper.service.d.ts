import { TUtil, TUtilInstance } from './helper.type';
export declare class HelperService {
    select<T extends TUtil>(utilType: T): TUtilInstance<T>;
}
