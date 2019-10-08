declare type isType = (_?: any) => boolean;
declare const validateTypes: {
    (schema?: {
        [key: string]: isType;
    } | undefined, config?: {
        [key: string]: any;
    } | undefined): string[];
    isString: isType;
    isNumber: isType;
    isArray: (_?: any) => boolean;
    isArrayOfType: (fn: isType) => {
        (_?: any): boolean;
        expected: string;
    };
    isFunction: isType;
    isObject: isType;
    isObjectWithValuesOfType: (fn: isType) => {
        (_?: any): boolean;
        expected: string;
    };
    isNull: isType;
    isUndefined: isType;
    isBoolean: isType;
    isRegExp: isType;
    isError: isType;
    isDate: isType;
    isSymbol: isType;
    isAny: isType;
    isOneOf: (haystack: any[]) => {
        (needle: any): boolean;
        expected: string;
    };
    OR: string;
    AND: string;
};
export default validateTypes;
