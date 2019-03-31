const objProto = Object.prototype;
const owns = objProto.hasOwnProperty;
const toStr = objProto.toString;

type BigInt = Function;
declare const BigInt: typeof Number;

let symbolValueOf: any = undefined;

if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}

let bigIntValueOf: Function;
if (typeof BigInt === 'function') {
  bigIntValueOf = BigInt.prototype.valueOf;
}

export const isActualNaN = function(value: number) {
  return value !== value;
};

function getTag(value: any) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toStr.call(value);
}

const base64Regex: RegExp = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
const hexRegex: RegExp = /^[A-Fa-f0-9]+$/;

interface isInterface {
  [propName: string]: (...value: any[]) => boolean;
}
/**
 * Expose `is`
 */
export const is: isInterface = {};

const UNDEFINED = 'undefined';
const ARGS_TAG = '[object Arguments]',
  ARRAY_TAG = '[object Array]',
  ASYNC_TAG = '[object AsyncFunction]',
  BOOL_TAG = '[object Boolean]',
  DATE_TAG = '[object Date]',
  DOMEXC_TAG = '[object DOMException]',
  ERROR_TAG = '[object Error]',
  FUNC_TAG = '[object Function]',
  GEN_TAG = '[object GeneratorFunction]',
  BIGINT_TAG = '[object BigInt]',
  MAP_TAG = '[object Map]',
  NUMBER_TAG = '[object Number]',
  NULL_TAG = '[object Null]',
  OBJECT_TAG = '[object Object]',
  PROMISE_TAG = '[object Promise]',
  PROXY_TAG = '[object Proxy]',
  REGEXP_TAG = '[object RegExp]',
  SET_TAG = '[object Set]',
  STRING_TAG = '[object String]',
  SYMBOL_TAG = '[object Symbol]',
  UNDEFINED_TAG = '[object Undefined]',
  WEAKMAP_TAG = '[object WeakMap]',
  WEAKSET_TAG = '[object WeakSet]';

const ARRAYBUFFER_TAG = '[object ArrayBuffer]',
  DATAVIEW_TAG = '[object DataView]',
  FLOAT32_TAG = '[object Float32Array]',
  FLOAT64_TAG = '[object Float64Array]',
  INT8_TAG = '[object Int8Array]',
  INT16_TAG = '[object Int16Array]',
  INT32_TAG = '[object Int32Array]',
  UINT8_TAG = '[object Uint8Array]',
  UINT8CLAMPED_TAG = '[object Uint8ClampedArray]',
  UINT16_TAG = '[object Uint16Array]',
  UINT32_TAG = '[object Uint32Array]';

export const empty = (is.empty = function(value: Array<any> | string | Object | any) {
  const type = getTag(value);

  if (type === ARRAY_TAG || type === ARGS_TAG || type === STRING_TAG) {
    return value.length === 0;
  }

  if (type === OBJECT_TAG) {
    for (let key of Object.keys(value)) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
});

export const equal = (is.equal = function equal(value: any, other: typeof value) {
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

export const nil = (is.nil = function(value: any) {
  return value === null;
});

export const undef = (is.undef = function(value: any) {
  return typeof value === 'undefined' || nil(value);
});

export const isObject = (is.object = function(value) {
  return getTag(value) === OBJECT_TAG;
});

export const isFunc = (is.fn = function(value) {
  var str = getTag(value);
  return str === FUNC_TAG || str === GEN_TAG || str === ASYNC_TAG;
});

export const isSymbol = (is.symbol = function(value) {
  return (
    typeof Symbol === 'function' &&
    getTag(value) === SYMBOL_TAG &&
    typeof symbolValueOf.call(value) === 'symbol'
  );
});

export const isArgs = (is.args = function(value) {
  var isStandardArguments = getTag(value) === ARGS_TAG;
  var isOldArguments = !isArray(value) && isArrayLike(value) && isObject(value) && isFunc(value.callee);
  return isStandardArguments || isOldArguments;
});

export const isArray = (is.array =
  Array.isArray ||
  function(value) {
    return getTag(value) === ARRAY_TAG;
  });

export const isEmptyArray = (is.emptyArray = function(value: any) {
  return is.array(value) && value.length === 0;
});

export const isArrayLike = (is.arraylike = function(value) {
  return (
    !!value &&
    !isBool(value) &&
    owns.call(value, 'length') &&
    isFinite(value.length) &&
    is.number(value.length) &&
    value.length >= 0
  );
});

export const isBool = (is.bool = function(value: any) {
  return getTag(value) === BOOL_TAG;
});

export const isFalsy = (is.falsy = function(value) {
  return isBool(value) && Boolean(Number(value)) === false;
});

export const isTruthy = (is.truthy = function(value) {
  return is.bool(value) && Boolean(Number(value)) === true;
});

export const isDate = (is.date = function(value) {
  return getTag(value) === DATE_TAG;
});

export const isElement = (is.element = function(value) {
  return (
    value !== undefined &&
    typeof HTMLElement !== UNDEFINED &&
    value instanceof HTMLElement &&
    value.nodeType === 1
  );
});

export const isError = (is.error = function(value) {
  return getTag(value) === ERROR_TAG;
});

export const isNumber = (is.number = function(value) {
  return getTag(value) === NUMBER_TAG;
});

export const isInfinite = (is.infinite = function(value) {
  return value === Infinity || value === -Infinity;
});

export const isDecimal = (is.decimal = function(value) {
  return isNumber(value) && !isActualNaN(value) && !isFinite(value) && value % 1 !== 0;
});

export const isInteger = (is.integer = function(value) {
  return isNumber(value) && !isActualNaN(value) && value % 1 === 0;
});

export const isNotNumber = (is.nan = function(value) {
  return !isNumber(value) || value !== value;
});

/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
export const isPrimitive = (is.primitive = function isPrimitive(value) {
  if (!value) {
    return true;
  }
  if (isNumber(value) || isBool(value) || isString(value) || isSymbol(value)) {
    return true;
  }
  return false;
});

export const isHash = (is.hash = function(value) {
  return isObject(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
});

export const isRegExp = (is.regexp = function(value) {
  return getTag(value) === REGEXP_TAG;
});

export const isString = (is.string = function(value) {
  return getTag(value) === STRING_TAG;
});

export const isBase64 = (is.base64 = function(value) {
  return isString(value) && (!value.length || base64Regex.test(value));
});

export const isHex = (is.hex = function(value) {
  return isString(value) && (!value.length || hexRegex.test(value));
});

export const isBigInt = (is.bigint = function(value) {
  return (
    typeof BigInt === 'function' && getTag(value) === BIGINT_TAG 
  );
});

export default is;
