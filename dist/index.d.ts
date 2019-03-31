export declare const isActualNaN: (value: number) => boolean;
interface isInterface {
    [propName: string]: (...value: any[]) => boolean;
}
/**
 * Expose `is`
 */
export declare const is: isInterface;
export declare const empty: (value: any) => boolean;
export declare const equal: (value: any, other: any) => boolean;
export declare const nil: (value: any) => boolean;
export declare const undef: (value: any) => boolean;
export declare const isObject: (value: any) => boolean;
export declare const isFunc: (value: any) => boolean;
export declare const isSymbol: (value: any) => boolean;
export declare const isArgs: (value: any) => boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare const isEmptyArray: (value: any) => boolean;
export declare const isArrayLike: (value: any) => boolean;
export declare const isBool: (value: any) => boolean;
export declare const isFalsy: (value: any) => boolean;
export declare const isTruthy: (value: any) => boolean;
export declare const isDate: (value: any) => boolean;
export declare const isElement: (value: any) => boolean;
export declare const isError: (value: any) => boolean;
export declare const isNumber: (value: any) => boolean;
export declare const isInfinite: (value: any) => boolean;
export declare const isDecimal: (value: any) => boolean;
export declare const isInteger: (value: any) => boolean;
export declare const isNotNumber: (value: any) => boolean;
/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
export declare const isPrimitive: (value: any) => boolean;
export declare const isHash: (value: any) => boolean;
export declare const isRegExp: (value: any) => boolean;
export declare const isString: (value: any) => boolean;
export declare const isBase64: (value: any) => boolean;
export declare const isHex: (value: any) => boolean;
export declare const isBigInt: (value: any) => boolean;
export default is;
