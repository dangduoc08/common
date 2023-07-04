"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.MongoDBQuery = void 0;
const filterKey = {
    $and: '$and',
    $or: '$or',
    $nor: '$nor',
    $text: '$text'
};
class MongoDBQuery {
}
exports.MongoDBQuery = MongoDBQuery;
class Query {
    static instance;
    static queryOperator = {
        _eq: '$eq',
        _ne: '$ne',
        _gt: '$gt',
        _gte: '$gte',
        _lt: '$lt',
        _lte: '$lte',
        _in: '$in',
        _nin: '$nin',
        _like: '$regex',
        _q: filterKey.$text,
        _exists: '$exists'
    };
    static logicalOperator = {
        _conjunction: {
            and: filterKey.$and,
            nor: filterKey.$nor,
            or: filterKey.$or
        }
    };
    static sortOperator = {
        _sort: true
    };
    static selectOperator = {
        _select: 1
    };
    static notSelectOperator = {
        _nselect: 0
    };
    static lookupOperator = {
        _embed: true
    };
    static paginationOperator = {
        _limit: 'limit',
        _offset: 'offset'
    };
    static getInstance() {
        if (!Query.instance) {
            Query.instance = new Query();
        }
        return Query.instance;
    }
    parseNumberToString(value) {
        return typeof value === 'number' ? value.toString() : value;
    }
    parseMongoDB(queryData, validationOptions) {
        let filter = null;
        let sort = null;
        let selection = null;
        let notSelection = null;
        let pagination = null;
        let reference = null;
        const defaultLogical = Query.logicalOperator._conjunction.and;
        let runtimeLogical = null;
        for (const key in queryData) {
            const value = queryData[key];
            const lastIndexOf_ = key.lastIndexOf('_');
            const keyLength = key.length;
            let operator = key;
            if (lastIndexOf_ > 0) {
                operator = key.substring(lastIndexOf_, keyLength);
            }
            const queryOpr = Query.queryOperator?.[operator];
            if (queryOpr) {
                if (!filter) {
                    filter = {
                        [defaultLogical]: []
                    };
                }
                const field = key.replace(operator, '');
                const isValidateFilter = !!validationOptions?.filter;
                const fieldValidation = validationOptions?.filter?.[field];
                if (queryOpr === Query.queryOperator._eq ||
                    queryOpr === Query.queryOperator._ne ||
                    queryOpr === Query.queryOperator._gt ||
                    queryOpr === Query.queryOperator._gte ||
                    queryOpr === Query.queryOperator._lt ||
                    queryOpr === Query.queryOperator._lte) {
                    if (isValidateFilter) {
                        let isValidate = false;
                        fieldValidation?.forEach((typeConstructor) => {
                            if (!Array.isArray(typeConstructor) &&
                                typeConstructor !== undefined &&
                                typeConstructor !== null) {
                                isValidate = !isValidate
                                    ? new Object(value) instanceof typeConstructor
                                    : isValidate;
                            }
                            else if (typeConstructor === undefined && value === undefined) {
                                isValidate = true;
                            }
                            else if (typeConstructor === null && value === null) {
                                isValidate = true;
                            }
                        });
                        if (!isValidate)
                            continue;
                    }
                    filter?.[defaultLogical]?.push({
                        [field]: {
                            [queryOpr]: value
                        }
                    });
                }
                else if (queryOpr === Query.queryOperator._exists &&
                    typeof value === 'string') {
                    const listQueryValue = value.replace(/\s/g, '').split(',');
                    listQueryValue?.forEach((field) => {
                        if (field) {
                            const isNotExists = field.charAt(0) === '!';
                            const queryField = isNotExists
                                ? field.replace('!', '')
                                : field;
                            filter?.[defaultLogical]?.push({
                                [queryField]: {
                                    [queryOpr]: !isNotExists
                                }
                            });
                        }
                    });
                }
                else if (queryOpr === Query.queryOperator._in ||
                    queryOpr === Query.queryOperator._nin) {
                    let listQueryValue;
                    const validatedListQueryValue = [];
                    if (typeof value === 'string' || typeof value === 'number') {
                        const parsedStrValue = this.parseNumberToString(value);
                        listQueryValue = parsedStrValue
                            ?.replace(/\s/g, '')
                            .split(',')
                            .filter((elem) => elem);
                    }
                    else if (Array.isArray(value)) {
                        listQueryValue = value;
                    }
                    if (isValidateFilter && Array.isArray(value)) {
                        let isValidate = false;
                        fieldValidation?.forEach((typeConstructor) => {
                            if (Array.isArray(typeConstructor) &&
                                typeConstructor !== undefined &&
                                typeConstructor !== null) {
                                typeConstructor.forEach((object) => {
                                    if (Array.isArray(listQueryValue)) {
                                        listQueryValue?.forEach((queryValue) => {
                                            if (object && new Object(queryValue) instanceof object) {
                                                validatedListQueryValue.push(queryValue);
                                                isValidate = true;
                                            }
                                            else if (object === undefined &&
                                                queryValue === undefined) {
                                                validatedListQueryValue.push(undefined);
                                                isValidate = true;
                                            }
                                            else if (object === null && queryValue === null) {
                                                validatedListQueryValue.push(null);
                                                isValidate = true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        if (!isValidate)
                            continue;
                    }
                    filter?.[defaultLogical]?.push({
                        [field]: {
                            [queryOpr]: validatedListQueryValue.length > 0
                                ? validatedListQueryValue
                                : listQueryValue
                        }
                    });
                }
                else if (queryOpr === Query.queryOperator._like &&
                    (typeof value === 'string' || typeof value === 'number')) {
                    let parsedStrValue = this.parseNumberToString(value);
                    const valueLen = parsedStrValue.length;
                    const lastSlashIndex = parsedStrValue.lastIndexOf('/');
                    let flag = '';
                    if (lastSlashIndex > -1 && lastSlashIndex < valueLen - 1) {
                        flag = parsedStrValue.substring(lastSlashIndex + 1, valueLen);
                        parsedStrValue = parsedStrValue.substring(0, lastSlashIndex);
                    }
                    const regexPattern = new RegExp(parsedStrValue, flag);
                    filter?.[defaultLogical]?.push({
                        [field]: {
                            [queryOpr]: regexPattern.toString()
                        }
                    });
                }
                else if (queryOpr === Query.queryOperator._q &&
                    (typeof value === 'string' || typeof value === 'number')) {
                    const parsedStrValue = this.parseNumberToString(value);
                    filter[queryOpr] = {
                        $search: parsedStrValue
                    };
                }
            }
            const logicalOperator = Query.logicalOperator?.[operator];
            if (logicalOperator &&
                logicalOperator[value]) {
                runtimeLogical =
                    logicalOperator[value];
            }
            const paginationOperator = Query.paginationOperator?.[operator];
            if (paginationOperator) {
                if (!pagination) {
                    pagination = {};
                }
                pagination[paginationOperator] = +value;
            }
            const sortOpr = Query.sortOperator?.[operator];
            if (sortOpr) {
                if (!sort) {
                    sort = {};
                }
                const field = key.replace(operator, '');
                sort[field] = value;
            }
            const selectOpr = Query.selectOperator?.[operator];
            if (selectOpr !== undefined && typeof value === 'string') {
                selection = value
                    .replace(/\s/g, '')
                    .split(',')
                    .reduce((previousValue, currentValue) => currentValue
                    ? { ...previousValue, [currentValue]: selectOpr }
                    : previousValue, {});
            }
            if (!selection) {
                const nSelectOpr = Query.notSelectOperator?.[operator];
                if (nSelectOpr !== undefined && typeof value === 'string') {
                    notSelection = value
                        .replace(/\s/g, '')
                        .split(',')
                        .reduce((previousValue, currentValue) => currentValue
                        ? { ...previousValue, [currentValue]: nSelectOpr }
                        : previousValue, {});
                }
            }
            const lookupOpr = Query.lookupOperator?.[operator];
            if (lookupOpr && typeof value === 'string') {
                if (!reference) {
                    reference = {};
                }
                const localField = key.replace(operator, '');
                const as = value.trim();
                reference[localField] = as;
            }
        }
        const isFilter = filter?.[defaultLogical]?.length > 0;
        if (runtimeLogical && isFilter) {
            filter = {
                [runtimeLogical]: filter?.[defaultLogical]
            };
        }
        return {
            filter: isFilter ? filter : null,
            pagination,
            sort,
            projection: selection ? selection : notSelection,
            reference
        };
    }
    mergeMongoDB(...queries) {
        return queries.reduce((previousValue, currentValue) => ({
            filter: previousValue.filter || currentValue.filter
                ? { ...previousValue.filter, ...currentValue.filter }
                : null,
            pagination: currentValue.pagination
                ? currentValue.pagination
                : previousValue.pagination
                    ? previousValue.pagination
                    : null,
            sort: previousValue.sort || currentValue.sort
                ? { ...previousValue.sort, ...currentValue.sort }
                : null,
            projection: currentValue.projection
                ? currentValue.projection
                : previousValue.projection
                    ? previousValue.projection
                    : null,
            reference: previousValue.reference || currentValue.reference
                ? { ...previousValue.reference, ...currentValue.reference }
                : null
        }), {
            filter: null,
            sort: null,
            projection: null,
            pagination: null,
            reference: null
        });
    }
}
exports.Query = Query;
