"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf = undefined;
if (typeof Symbol === 'function') {
    symbolValueOf = Symbol.prototype.valueOf;
}
var bigIntValueOf;
if (typeof BigInt === 'function') {
    bigIntValueOf = BigInt.prototype.valueOf;
}
exports.isActualNaN = function (value) {
    return value !== value;
};
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toStr.call(value);
}
var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;
/**
 * Expose `is`
 */
exports.is = {};
var UNDEFINED = 'undefined';
var ARGS_TAG = '[object Arguments]', ARRAY_TAG = '[object Array]', ASYNC_TAG = '[object AsyncFunction]', BOOL_TAG = '[object Boolean]', DATE_TAG = '[object Date]', DOMEXC_TAG = '[object DOMException]', ERROR_TAG = '[object Error]', FUNC_TAG = '[object Function]', GEN_TAG = '[object GeneratorFunction]', BIGINT_TAG = '[object BigInt]', MAP_TAG = '[object Map]', NUMBER_TAG = '[object Number]', NULL_TAG = '[object Null]', OBJECT_TAG = '[object Object]', PROMISE_TAG = '[object Promise]', PROXY_TAG = '[object Proxy]', REGEXP_TAG = '[object RegExp]', SET_TAG = '[object Set]', STRING_TAG = '[object String]', SYMBOL_TAG = '[object Symbol]', UNDEFINED_TAG = '[object Undefined]', WEAKMAP_TAG = '[object WeakMap]', WEAKSET_TAG = '[object WeakSet]';
var ARRAYBUFFER_TAG = '[object ArrayBuffer]', DATAVIEW_TAG = '[object DataView]', FLOAT32_TAG = '[object Float32Array]', FLOAT64_TAG = '[object Float64Array]', INT8_TAG = '[object Int8Array]', INT16_TAG = '[object Int16Array]', INT32_TAG = '[object Int32Array]', UINT8_TAG = '[object Uint8Array]', UINT8CLAMPED_TAG = '[object Uint8ClampedArray]', UINT16_TAG = '[object Uint16Array]', UINT32_TAG = '[object Uint32Array]';
exports.empty = (exports.is.empty = function (value) {
    var type = getTag(value);
    if (type === ARRAY_TAG || type === ARGS_TAG || type === STRING_TAG) {
        return value.length === 0;
    }
    if (type === OBJECT_TAG) {
        for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
            var key = _a[_i];
            if (owns.call(value, key)) {
                return false;
            }
        }
        return true;
    }
    return !value;
});
exports.equal = (exports.is.equal = function equal(value, other) {
    if (value === other) {
        return true;
    }
    var type = getTag(value);
    var key;
    if (type !== getTag(other)) {
        return false;
    }
    if (type === OBJECT_TAG) {
        for (key in value) {
            if (!equal(value[key], other[key]) || !(key in other)) {
                return false;
            }
        }
        for (key in other) {
            if (!equal(value[key], other[key]) || !(key in value)) {
                return false;
            }
        }
        return true;
    }
    if (type === ARRAY_TAG) {
        key = value.length;
        if (key !== other.length) {
            return false;
        }
        while (key--) {
            if (!equal(value[key], other[key])) {
                return false;
            }
        }
        return true;
    }
    if (type === FUNC_TAG) {
        return value.prototype === other.prototype;
    }
    if (type === DATE_TAG) {
        return value.getTime() === other.getTime();
    }
    return false;
});
exports.nil = (exports.is.nil = function (value) {
    return value === null;
});
exports.undef = (exports.is.undef = function (value) {
    return typeof value === 'undefined' || exports.nil(value);
});
exports.isObject = (exports.is.object = function (value) {
    return getTag(value) === OBJECT_TAG;
});
exports.isFunc = (exports.is.fn = function (value) {
    var str = getTag(value);
    return str === FUNC_TAG || str === GEN_TAG || str === ASYNC_TAG;
});
exports.isSymbol = (exports.is.symbol = function (value) {
    return (typeof Symbol === 'function' &&
        getTag(value) === SYMBOL_TAG &&
        typeof symbolValueOf.call(value) === 'symbol');
});
exports.isArgs = (exports.is.args = function (value) {
    var isStandardArguments = getTag(value) === ARGS_TAG;
    var isOldArguments = !exports.isArray(value) && exports.isArrayLike(value) && exports.isObject(value) && exports.isFunc(value.callee);
    return isStandardArguments || isOldArguments;
});
exports.isArray = (exports.is.array =
    Array.isArray ||
        function (value) {
            return getTag(value) === ARRAY_TAG;
        });
exports.isEmptyArray = (exports.is.emptyArray = function (value) {
    return exports.is.array(value) && value.length === 0;
});
exports.isArrayLike = (exports.is.arraylike = function (value) {
    return (!!value &&
        !exports.isBool(value) &&
        owns.call(value, 'length') &&
        isFinite(value.length) &&
        exports.is.number(value.length) &&
        value.length >= 0);
});
exports.isBool = (exports.is.bool = function (value) {
    return getTag(value) === BOOL_TAG;
});
exports.isFalsy = (exports.is.falsy = function (value) {
    return exports.isBool(value) && Boolean(Number(value)) === false;
});
exports.isTruthy = (exports.is.truthy = function (value) {
    return exports.is.bool(value) && Boolean(Number(value)) === true;
});
exports.isDate = (exports.is.date = function (value) {
    return getTag(value) === DATE_TAG;
});
exports.isElement = (exports.is.element = function (value) {
    return (value !== undefined &&
        typeof HTMLElement !== UNDEFINED &&
        value instanceof HTMLElement &&
        value.nodeType === 1);
});
exports.isError = (exports.is.error = function (value) {
    return getTag(value) === ERROR_TAG;
});
exports.isNumber = (exports.is.number = function (value) {
    return getTag(value) === NUMBER_TAG;
});
exports.isInfinite = (exports.is.infinite = function (value) {
    return value === Infinity || value === -Infinity;
});
exports.isDecimal = (exports.is.decimal = function (value) {
    return exports.isNumber(value) && !exports.isActualNaN(value) && !isFinite(value) && value % 1 !== 0;
});
exports.isInteger = (exports.is.integer = function (value) {
    return exports.isNumber(value) && !exports.isActualNaN(value) && value % 1 === 0;
});
exports.isNotNumber = (exports.is.nan = function (value) {
    return !exports.isNumber(value) || value !== value;
});
/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
exports.isPrimitive = (exports.is.primitive = function isPrimitive(value) {
    if (!value) {
        return true;
    }
    if (exports.isNumber(value) || exports.isBool(value) || exports.isString(value) || exports.isSymbol(value)) {
        return true;
    }
    return false;
});
exports.isHash = (exports.is.hash = function (value) {
    return exports.isObject(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
});
exports.isRegExp = (exports.is.regexp = function (value) {
    return getTag(value) === REGEXP_TAG;
});
exports.isString = (exports.is.string = function (value) {
    return getTag(value) === STRING_TAG;
});
exports.isBase64 = (exports.is.base64 = function (value) {
    return exports.isString(value) && (!value.length || base64Regex.test(value));
});
exports.isHex = (exports.is.hex = function (value) {
    return exports.isString(value) && (!value.length || hexRegex.test(value));
});
exports.isBigInt = (exports.is.bigint = function (value) {
    return (typeof BigInt === 'function' && getTag(value) === BIGINT_TAG);
});
exports.default = exports.is;
