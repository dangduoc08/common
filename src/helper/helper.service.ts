import { Injectable } from '@nestjs/common';
import { Query } from './utils';
import { TUtil, TUtilInstance } from './helper.type';

@Injectable()
export class HelperService {
  public select<T extends TUtil>(utilType: T): TUtilInstance<T> {
    switch (utilType) {
      case 'query':
        return Query.getInstance() as unknown as TUtilInstance<T>;

      default:
        return undefined as unknown as TUtilInstance<T>;
    }
  }
}
