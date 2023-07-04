type JSString = typeof String;
type JSNumber = typeof Number;
type JSBoolean = typeof Boolean;
type JSDate = typeof Date;
type JSRegExp = typeof RegExp;
type JSData = JSString | JSNumber | JSBoolean | JSDate | JSRegExp | undefined | null;
type FilterValidationOptions = {
    [key: string]: (JSData | Array<JSData>)[];
};
type Key = '$and' | '$or' | '$nor' | '$text';
declare const filterKey: Record<Key, string>;
type PartialRecord<K extends keyof typeof filterKey, T> = {
    [P in K]?: T;
};
type Filter = PartialRecord<Key, any>;
type SortValue = 'asc' | 'desc' | 1 | -1;
type Sort = Record<string, SortValue>;
type Projection = Record<string, number | boolean>;
type Pagination = {
    limit?: number;
    offset?: number;
};
type Reference = Record<string, string>;
interface ValidationOptions {
    filter?: FilterValidationOptions;
}
export declare abstract class MongoDBQuery<Filter = null, Pagination = null, Sort = null, Projection = null, Reference = null> {
    abstract filter: Filter;
    abstract pagination: Pagination;
    abstract sort: Sort;
    abstract projection: Projection;
    abstract reference: Reference;
}
export declare class Query {
    private static instance;
    private static queryOperator;
    private static logicalOperator;
    private static sortOperator;
    private static selectOperator;
    private static notSelectOperator;
    private static lookupOperator;
    private static paginationOperator;
    static getInstance(): Query;
    private parseNumberToString;
    parseMongoDB<T>(queryData: T, validationOptions?: ValidationOptions): MongoDBQuery<Filter | null, Pagination | null, Sort | null, Projection | null, Reference | null>;
    mergeMongoDB(...queries: {
        filter: Filter | null;
        sort: Sort | null;
        projection: Projection | null;
        pagination: Pagination | null;
        reference: Reference | null;
    }[]): MongoDBQuery<Filter | null, Pagination | null, Sort | null, Projection | null, Reference | null>;
}
export {};
