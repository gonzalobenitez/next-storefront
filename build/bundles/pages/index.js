
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],[
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(41)('wks');
var uid = __webpack_require__(26);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(61);
var toPrimitive = __webpack_require__(38);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(39);
var defined = __webpack_require__(36);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(36);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = __webpack_require__(127);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(90)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(37)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(63);
var enumBugKeys = __webpack_require__(42);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(73);
var isArrayIter = __webpack_require__(74);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(30);
var getIterFn = __webpack_require__(55);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(92);
var enumBugKeys = __webpack_require__(42);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(50)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(31);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(62);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(91);
var setToStringTag = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(64);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(56);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(26)('meta');
var isObject = __webpack_require__(6);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(46);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(120);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(124);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(56);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(128)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(111);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(113);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(34);
  var warning = __webpack_require__(33);
  var ReactPropTypesSecret = __webpack_require__(69);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(50)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(93)(false);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(14);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(23);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(63);
var hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(28);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(38);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(61);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGetInitialProps = undefined;

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(88);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

var loadGetInitialProps = exports.loadGetInitialProps = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(Component, ctx) {
    var props, compName, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Component.getInitialProps) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', {});

          case 2:
            _context.next = 4;
            return Component.getInitialProps(ctx);

          case 4:
            props = _context.sent;

            if (!(!props && (!ctx.res || !ctx.res.finished))) {
              _context.next = 9;
              break;
            }

            compName = getDisplayName(Component);
            message = '"' + compName + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
            throw new Error(message);

          case 9:
            return _context.abrupt('return', props);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadGetInitialProps(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.warn = warn;
exports.execOnce = execOnce;
exports.deprecated = deprecated;
exports.printAndExit = printAndExit;
exports.getDisplayName = getDisplayName;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warn(message) {
  if (true) {
    console.error(message);
  }
}

function execOnce(fn) {
  var _this = this;

  var used = false;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!used) {
      used = true;
      fn.apply(_this, args);
    }
  };
}

function deprecated(fn, message) {
  if (false) return fn;

  var warned = false;
  var newFn = function newFn() {
    if (!warned) {
      warned = true;
      console.error(message);
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn.apply(this, args);
  };

  // copy all properties
  (0, _assign2.default)(newFn, fn);

  return newFn;
}

function printAndExit(message) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
  }

  process.exit(code);
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

function getLocationOrigin() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      hostname = _window$location.hostname,
      port = _window$location.port;

  return protocol + '//' + hostname + (port ? ':' + port : '');
}

function getURL() {
  var href = window.location.href;

  var origin = getLocationOrigin();
  return href.substring(origin.length);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(5);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(155);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(99);
exports.encode = exports.stringify = __webpack_require__(100);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(167);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(70);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var defined = __webpack_require__(36);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(25);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(21);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(20);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(94);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(97);
var step = __webpack_require__(65);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = exports.createRouter = exports.withRouter = undefined;

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _withRouter = __webpack_require__(232);

Object.defineProperty(exports, 'withRouter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withRouter).default;
  }
});
exports._notifyBuildIdMismatch = _notifyBuildIdMismatch;
exports._rewriteUrlForNextExport = _rewriteUrlForNextExport;
exports.makePublicRouterInstance = makePublicRouterInstance;

var _router = __webpack_require__(234);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingletonRouter = {
  router: null, // holds the actual router instance
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();
    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb);
    }
  }
};

// Create public properties and methods of the router in the SingletonRouter
/* global window */
var propertyFields = ['components', 'pathname', 'route', 'query', 'asPath'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError'];

propertyFields.forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty2.default)(SingletonRouter, field, {
    get: function get() {
      throwIfNoRouter();
      return SingletonRouter.router[field];
    }
  });
});

coreMethodFields.forEach(function (field) {
  SingletonRouter[field] = function () {
    var _SingletonRouter$rout;

    throwIfNoRouter();
    return (_SingletonRouter$rout = SingletonRouter.router)[field].apply(_SingletonRouter$rout, arguments);
  };
});

routerEvents.forEach(function (event) {
  SingletonRouter.ready(function () {
    SingletonRouter.router.events.on(event, function () {
      var eventField = 'on' + event.charAt(0).toUpperCase() + event.substring(1);
      if (SingletonRouter[eventField]) {
        try {
          SingletonRouter[eventField].apply(SingletonRouter, arguments);
        } catch (err) {
          console.error('Error when running the Router event: ' + eventField);
          console.error(err.message + '\n' + err.stack);
        }
      }
    });
  });
});

function throwIfNoRouter() {
  if (!SingletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }
}

// Export the SingletonRouter and this is the public API.
exports.default = SingletonRouter;

// Reexport the withRoute HOC

// INTERNAL APIS
// -------------
// (do not use following exports inside the app)

// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.
var createRouter = exports.createRouter = function createRouter() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  SingletonRouter.router = new (Function.prototype.bind.apply(_router2.default, [null].concat(args)))();
  SingletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  SingletonRouter.readyCallbacks = [];

  return SingletonRouter.router;
};

// Export the actual Router class, which is usually used inside the server
var Router = exports.Router = _router2.default;

function _notifyBuildIdMismatch(nextRoute) {
  if (SingletonRouter.onAppUpdated) {
    SingletonRouter.onAppUpdated(nextRoute);
  } else {
    console.warn('An app update detected. Loading the SSR version of "' + nextRoute + '"');
    window.location.href = nextRoute;
  }
}

function _rewriteUrlForNextExport(url) {
  var _url$split = url.split('#'),
      _url$split2 = (0, _slicedToArray3.default)(_url$split, 2),
      hash = _url$split2[1];

  url = url.replace(/#.*/, '');

  var _url$split3 = url.split('?'),
      _url$split4 = (0, _slicedToArray3.default)(_url$split3, 2),
      path = _url$split4[0],
      qs = _url$split4[1];

  path = path.replace(/\/$/, '');

  var newPath = path;
  // Append a trailing slash if this path does not have an extension
  if (!/\.[^/]+\/?$/.test(path)) {
    newPath = path + '/';
  }

  if (qs) {
    newPath = newPath + '?' + qs;
  }

  if (hash) {
    newPath = newPath + '#' + hash;
  }

  return newPath;
}

function makePublicRouterInstance(router) {
  var instance = {};

  propertyFields.forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    (0, _defineProperty2.default)(instance, field, {
      get: function get() {
        return router[field];
      }
    });
  });

  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return router[field].apply(router, arguments);
    };
  });

  return instance;
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(164);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(83);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(108) });


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(28);
var toObject = __webpack_require__(14);
var IObject = __webpack_require__(39);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(14);
var $getPrototypeOf = __webpack_require__(64);

__webpack_require__(75)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(27);
module.exports = __webpack_require__(46).f('iterator');


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
__webpack_require__(51);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(5);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(62);
var META = __webpack_require__(47).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(41);
var setToStringTag = __webpack_require__(21);
var uid = __webpack_require__(26);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(46);
var wksDefine = __webpack_require__(48);
var enumKeys = __webpack_require__(116);
var isArray = __webpack_require__(66);
var anObject = __webpack_require__(7);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(38);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(25);
var gOPNExt = __webpack_require__(117);
var $GOPD = __webpack_require__(68);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(20);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f = $propertyIsEnumerable;
  __webpack_require__(43).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(28);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(67).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('asyncIterator');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('observable');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(123).set });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(6);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(68).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(25) });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.0.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
(function() {

'use strict';

var objectAssign$1 = __webpack_require__(57);
var require$$0 = __webpack_require__(33);
var emptyObject = __webpack_require__(86);
var invariant = __webpack_require__(34);
var emptyFunction = __webpack_require__(31);
var checkPropTypes = __webpack_require__(58);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

{
  var warning = require$$0;
}

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule lowPriorityWarning
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning_1 = lowPriorityWarning;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(ReactComponent.prototype, methodName, {
      get: function () {
        lowPriorityWarning_1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
var pureComponentPrototype = ReactPureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(pureComponentPrototype, ReactComponent.prototype);
pureComponentPrototype.isPureReactComponent = true;

function ReactAsyncComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

var asyncComponentPrototype = ReactAsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = ReactAsyncComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(asyncComponentPrototype, ReactComponent.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent,
  AsyncComponent: ReactAsyncComponent
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactCurrentOwner
 * 
 */

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactCurrentOwner_1 = ReactCurrentOwner;

var hasOwnProperty = Object.prototype.hasOwnProperty;

{
  var warning$2 = require$$0;
}

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning$2(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning$2(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE$1,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE$1) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = objectAssign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE$1;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugCurrentFrame
 * 
 */

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame;

{
  var warning$1 = require$$0;

  var _require = ReactDebugCurrentFrame_1,
      getStackAddendum = _require.getStackAddendum;
}

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = ITERATOR_SYMBOL && children[ITERATOR_SYMBOL] || children[FAUX_ITERATOR_SYMBOL];
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning$1(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0';

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame$1 = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName$1(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName$1;

{
  var checkPropTypes$1 = checkPropTypes;
  var lowPriorityWarning$1 = lowPriorityWarning_1;
  var ReactDebugCurrentFrame$1 = ReactDebugCurrentFrame_1;
  var warning$3 = require$$0;
  var describeComponentFrame = describeComponentFrame$1;
  var getComponentName = getComponentName_1;

  var currentlyValidatingElement = null;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum$1 = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame$1.getStackAddendum() || '';
    return stack;
  };
}

var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner_1.current) {
    var name = getComponentName(ReactCurrentOwner_1.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning$3(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum$1());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement_1.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement_1.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = ITERATOR_SYMBOL$1 && node[ITERATOR_SYMBOL$1] || node[FAUX_ITERATOR_SYMBOL$1];
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement_1.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;

  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes$1(propTypes, element.props, 'prop', name, getStackAddendum$1);
    currentlyValidatingElement = null;
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning$3(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

var ReactElementValidator$1 = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += ReactDebugCurrentFrame$1.getStackAddendum() || '';

      warning$3(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
    }

    var element = ReactElement_1.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator$1.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    {
      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function () {
          lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement_1.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

var ReactElementValidator_1 = ReactElementValidator$1;

{
  var warning$4 = require$$0;
}

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(Object.prototype.hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function getDisplayName$1(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName = void 0;

  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  warning$4(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
  return describeComponentFrame$1(name || '', element && element._source, ownerName || '');
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
      !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function () {
    var info = '';
    var currentOwner = ReactCurrentOwner_1.current;
    if (currentOwner) {
      !(typeof currentOwner.tag !== 'number') ? invariant(false, 'Fiber owners should not show up in Stack stack traces.') : void 0;
      if (typeof currentOwner._debugID === 'number') {
        info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
      }
    }
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName$1(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

{
  var ReactElementValidator = ReactElementValidator_1;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var React = {
  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,
  unstable_AsyncComponent: ReactBaseClasses.AsyncComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  createFactory: createFactory,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner_1,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign$1
  }
};

{
  objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactComponentTreeHook: ReactComponentTreeHook_1,
    ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
  });
}

var ReactEntry = React;

module.exports = ReactEntry;

})();
}


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(31);
var invariant = __webpack_require__(34);
var warning = __webpack_require__(33);
var assign = __webpack_require__(57);

var ReactPropTypesSecret = __webpack_require__(69);
var checkPropTypes = __webpack_require__(58);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(171);
var html = __webpack_require__(72);
var cel = __webpack_require__(50);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(23)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(78);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(4).f;
var create = __webpack_require__(25);
var redefineAll = __webpack_require__(54);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(53);
var forOf = __webpack_require__(22);
var $iterDefine = __webpack_require__(37);
var step = __webpack_require__(65);
var setSpecies = __webpack_require__(79);
var DESCRIPTORS = __webpack_require__(5);
var fastKey = __webpack_require__(47).fastKey;
var validate = __webpack_require__(71);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(47);
var fails = __webpack_require__(10);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(54);
var forOf = __webpack_require__(22);
var anInstance = __webpack_require__(53);
var isObject = __webpack_require__(6);
var setToStringTag = __webpack_require__(21);
var dP = __webpack_require__(4).f;
var each = __webpack_require__(136)(0);
var DESCRIPTORS = __webpack_require__(5);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(39);
var toObject = __webpack_require__(14);
var toLength = __webpack_require__(30);
var asc = __webpack_require__(137);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(138);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var isArray = __webpack_require__(66);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(32);
var from = __webpack_require__(140);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(22);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(24);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(22);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(157);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(8);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(14);
var call = __webpack_require__(73);
var isArrayIter = __webpack_require__(74);
var toLength = __webpack_require__(30);
var createProperty = __webpack_require__(158);
var getIterFn = __webpack_require__(55);

$export($export.S + $export.F * !__webpack_require__(95)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(19);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(161);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14);
var $keys = __webpack_require__(20);

__webpack_require__(75)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(18);
module.exports = __webpack_require__(163);


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var get = __webpack_require__(55);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(18);
module.exports = __webpack_require__(166);


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(168);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 168 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(27);
__webpack_require__(170);
__webpack_require__(173);
__webpack_require__(174);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var global = __webpack_require__(3);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(32);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(6);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(53);
var forOf = __webpack_require__(22);
var speciesConstructor = __webpack_require__(130);
var task = __webpack_require__(131).set;
var microtask = __webpack_require__(172)();
var newPromiseCapabilityModule = __webpack_require__(78);
var perform = __webpack_require__(132);
var promiseResolve = __webpack_require__(133);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(54)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(21)($Promise, PROMISE);
__webpack_require__(79)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(95)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(131).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(23)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(130);
var promiseResolve = __webpack_require__(133);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(78);
var perform = __webpack_require__(132);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(27);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(71);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(135)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(139)('Set') });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(141)('Set');


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(142)('Set');


/***/ }),
/* 180 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = function () {
  function EventEmitter() {
    (0, _classCallCheck3.default)(this, EventEmitter);
    this.listeners = {};
  }

  (0, _createClass3.default)(EventEmitter, [{
    key: "on",
    value: function on(event, cb) {
      if (!this.listeners[event]) {
        this.listeners[event] = new _set2.default();
      }

      if (this.listeners[event].has(cb)) {
        throw new Error("The listener already exising in event: " + event);
      }

      this.listeners[event].add(cb);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      if (!this.listeners[event]) return;
      this.listeners[event].forEach(function (cb) {
        return cb.apply(undefined, data);
      });
    }
  }, {
    key: "off",
    value: function off(event, cb) {
      this.listeners[event].delete(cb);
    }
  }]);
  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__(82);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.defaultHead = defaultHead;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(52);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sideEffect = __webpack_require__(190);

var _sideEffect2 = _interopRequireDefault(_sideEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Head = function (_React$Component) {
  (0, _inherits3.default)(Head, _React$Component);

  function Head() {
    (0, _classCallCheck3.default)(this, Head);
    return (0, _possibleConstructorReturn3.default)(this, (Head.__proto__ || (0, _getPrototypeOf2.default)(Head)).apply(this, arguments));
  }

  (0, _createClass3.default)(Head, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Head;
}(_react2.default.Component);

Head.contextTypes = {
  headManager: _propTypes2.default.object
};
function defaultHead() {
  return [_react2.default.createElement('meta', { charSet: 'utf-8', className: 'next-head' })];
}

function reduceComponents(components) {
  var _components$map$map$r;

  return (_components$map$map$r = components.map(function (c) {
    return c.props.children;
  }).map(function (children) {
    return _react2.default.Children.toArray(children);
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []).reverse()).concat.apply(_components$map$map$r, (0, _toConsumableArray3.default)(defaultHead())).filter(function (c) {
    return !!c;
  }).filter(unique()).reverse().map(function (c) {
    var className = (c.className ? c.className + ' ' : '') + 'next-head';
    return _react2.default.cloneElement(c, { className: className });
  });
}

function mapOnServer(head) {
  return head;
}

function onStateChange(head) {
  if (this.context && this.context.headManager) {
    this.context.headManager.updateHead(head);
  }
}

var METATYPES = ['name', 'httpEquiv', 'charSet', 'itemProp', 'property'];

// returns a function for filtering head child elements
// which shouldn't be duplicated, like <title/>.

function unique() {
  var tags = new _set2.default();
  var metaTypes = new _set2.default();
  var metaCategories = {};

  return function (h) {
    switch (h.type) {
      case 'title':
      case 'base':
        if (tags.has(h.type)) return false;
        tags.add(h.type);
        break;
      case 'meta':
        for (var i = 0, len = METATYPES.length; i < len; i++) {
          var metatype = METATYPES[i];
          if (!h.props.hasOwnProperty(metatype)) continue;

          if (metatype === 'charSet') {
            if (metaTypes.has(metatype)) return false;
            metaTypes.add(metatype);
          } else {
            var category = h.props[metatype];
            var categories = metaCategories[metatype] || new _set2.default();
            if (categories.has(category)) return false;
            categories.add(category);
            metaCategories[metatype] = categories;
          }
        }
        break;
    }
    return true;
  };
}

exports.default = (0, _sideEffect2.default)(reduceComponents, onStateChange, mapOnServer)(Head);

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = __webpack_require__(82);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

exports.default = withSideEffect;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withSideEffect(reduceComponentsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reduceComponentsToState !== 'function') {
    throw new Error('Expected reduceComponentsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = new _set2.default();
    var state = void 0;

    function emitChange(component) {
      state = reduceComponentsToState([].concat((0, _toConsumableArray3.default)(mountedInstances)));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient.call(component, state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      (0, _inherits3.default)(SideEffect, _Component);

      function SideEffect() {
        (0, _classCallCheck3.default)(this, SideEffect);
        return (0, _possibleConstructorReturn3.default)(this, (SideEffect.__proto__ || (0, _getPrototypeOf2.default)(SideEffect)).apply(this, arguments));
      }

      (0, _createClass3.default)(SideEffect, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          mountedInstances.add(this);
          emitChange(this);
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          emitChange(this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          mountedInstances.delete(this);
          emitChange(this);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            WrappedComponent,
            null,
            this.props.children
          );
        }
      }], [{
        key: 'peek',
        value: function peek() {
          return state;
        }

        // Expose canUseDOM so tests can monkeypatch it

        // Try to use displayName of wrapped component

      }, {
        key: 'rewind',
        value: function rewind() {
          if (SideEffect.canUseDOM) {
            throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
          }

          var recordedState = state;
          state = undefined;
          mountedInstances.clear();
          return recordedState;
        }
      }]);
      return SideEffect;
    }(_react.Component);

    SideEffect.displayName = 'SideEffect(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';
    SideEffect.contextTypes = WrappedComponent.contextTypes;
    SideEffect.canUseDOM = typeof window !== 'undefined';


    return SideEffect;
  };
}

/***/ }),
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowEquals;
function shallowEquals(a, b) {
  for (var i in a) {
    if (b[i] !== a[i]) return false;
  }

  for (var _i in b) {
    if (b[_i] !== a[_i]) return false;
  }

  return true;
}

/***/ }),
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(105);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = withRouter;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(52);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(233);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _utils = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withRouter(ComposedComponent) {
  var displayName = (0, _utils.getDisplayName)(ComposedComponent);

  var WithRouteWrapper = function (_Component) {
    (0, _inherits3.default)(WithRouteWrapper, _Component);

    function WithRouteWrapper() {
      (0, _classCallCheck3.default)(this, WithRouteWrapper);
      return (0, _possibleConstructorReturn3.default)(this, (WithRouteWrapper.__proto__ || (0, _getPrototypeOf2.default)(WithRouteWrapper)).apply(this, arguments));
    }

    (0, _createClass3.default)(WithRouteWrapper, [{
      key: 'render',
      value: function render() {
        var props = (0, _extends3.default)({
          router: this.context.router
        }, this.props);

        return _react2.default.createElement(ComposedComponent, props);
      }
    }]);
    return WithRouteWrapper;
  }(_react.Component);

  WithRouteWrapper.contextTypes = {
    router: _propTypes2.default.object
  };
  WithRouteWrapper.displayName = 'withRoute(' + displayName + ')';


  return (0, _hoistNonReactStatics2.default)(WithRouteWrapper, ComposedComponent);
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = __webpack_require__(56);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(105);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(88);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _url2 = __webpack_require__(235);

var _EventEmitter = __webpack_require__(181);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _shallowEquals = __webpack_require__(194);

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

var _pQueue = __webpack_require__(238);

var _pQueue2 = _interopRequireDefault(_pQueue);

var _utils = __webpack_require__(77);

var _ = __webpack_require__(101);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global __NEXT_DATA__ */

var Router = function () {
  function Router(pathname, query, as) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        pageLoader = _ref.pageLoader,
        Component = _ref.Component,
        ErrorComponent = _ref.ErrorComponent,
        err = _ref.err;

    (0, _classCallCheck3.default)(this, Router);

    // represents the current component key
    this.route = toRoute(pathname);

    // set up the component cache (by route keys)
    this.components = {};
    // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.
    if (Component !== ErrorComponent) {
      this.components[this.route] = { Component: Component, err: err };
    }

    // Handling Router Events
    this.events = new _EventEmitter2.default();

    this.pageLoader = pageLoader;
    this.prefetchQueue = new _pQueue2.default({ concurrency: 2 });
    this.ErrorComponent = ErrorComponent;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.subscriptions = new _set2.default();
    this.componentLoadCancel = null;
    this.onPopState = this.onPopState.bind(this);

    if (typeof window !== 'undefined') {
      // in order for `e.state` to work on the `onpopstate` event
      // we have to register the initial route upon initialization
      this.changeState('replaceState', (0, _url2.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());

      window.addEventListener('popstate', this.onPopState);
    }
  }

  (0, _createClass3.default)(Router, [{
    key: 'onPopState',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
        var pathname, query, _e$state, url, as, options;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.state) {
                  _context.next = 4;
                  break;
                }

                // We get state as undefined for two reasons.
                //  1. With older safari (< 8) and older chrome (< 34)
                //  2. When the URL changed with #
                //
                // In the both cases, we don't need to proceed and change the route.
                // (as it's already changed)
                // But we can simply replace the state with the new changes.
                // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
                // So, doing the following for (1) does no harm.
                pathname = this.pathname, query = this.query;

                this.changeState('replaceState', (0, _url2.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());
                return _context.abrupt('return');

              case 4:
                _e$state = e.state, url = _e$state.url, as = _e$state.as, options = _e$state.options;

                this.replace(url, as, options);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onPopState(_x2) {
        return _ref2.apply(this, arguments);
      }

      return onPopState;
    }()
  }, {
    key: 'update',
    value: function update(route, Component) {
      var data = this.components[route];
      if (!data) {
        throw new Error('Cannot update unavailable route: ' + route);
      }

      var newData = (0, _extends3.default)({}, data, { Component: Component });
      this.components[route] = newData;

      if (route === this.route) {
        this.notify(newData);
      }
    }
  }, {
    key: 'reload',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(route) {
        var pathname, query, url, routeInfo, error;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                delete this.components[route];
                this.pageLoader.clearCache(route);

                if (!(route !== this.route)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:
                pathname = this.pathname, query = this.query;
                url = window.location.href;


                this.events.emit('routeChangeStart', url);
                _context2.next = 9;
                return this.getRouteInfo(route, pathname, query, url);

              case 9:
                routeInfo = _context2.sent;
                error = routeInfo.error;

                if (!(error && error.cancelled)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt('return');

              case 13:

                this.notify(routeInfo);

                if (!error) {
                  _context2.next = 17;
                  break;
                }

                this.events.emit('routeChangeError', error, url);
                throw error;

              case 17:

                this.events.emit('routeChangeComplete', url);

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reload(_x3) {
        return _ref3.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: 'back',
    value: function back() {
      window.history.back();
    }
  }, {
    key: 'push',
    value: function push(url) {
      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.change('pushState', url, as, options);
    }
  }, {
    key: 'replace',
    value: function replace(url) {
      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.change('replaceState', url, as, options);
    }
  }, {
    key: 'change',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(method, _url, _as, options) {
        var url, as, _parse, pathname, query, route, _options$shallow, shallow, routeInfo, _routeInfo, error, hash;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // If url and as provided as an object representation,
                // we'll format them into the string version here.
                url = (typeof _url === 'undefined' ? 'undefined' : (0, _typeof3.default)(_url)) === 'object' ? (0, _url2.format)(_url) : _url;
                as = (typeof _as === 'undefined' ? 'undefined' : (0, _typeof3.default)(_as)) === 'object' ? (0, _url2.format)(_as) : _as;

                // Add the ending slash to the paths. So, we can serve the
                // "<page>/index.html" directly for the SSR page.

                if (__NEXT_DATA__.nextExport) {
                  as = (0, _._rewriteUrlForNextExport)(as);
                }

                this.abortComponentLoad(as);
                _parse = (0, _url2.parse)(url, true), pathname = _parse.pathname, query = _parse.query;

                // If the url change is only related to a hash change
                // We should not proceed. We should only change the state.

                if (!this.onlyAHashChange(as)) {
                  _context3.next = 9;
                  break;
                }

                this.changeState(method, url, as);
                this.scrollToHash(as);
                return _context3.abrupt('return');

              case 9:

                // If asked to change the current URL we should reload the current page
                // (not location.reload() but reload getInitalProps and other Next.js stuffs)
                // We also need to set the method = replaceState always
                // as this should not go into the history (That's how browsers work)
                if (!this.urlIsNew(pathname, query)) {
                  method = 'replaceState';
                }

                route = toRoute(pathname);
                _options$shallow = options.shallow, shallow = _options$shallow === undefined ? false : _options$shallow;
                routeInfo = null;


                this.events.emit('routeChangeStart', as);

                // If shallow === false and other conditions met, we reuse the
                // existing routeInfo for this route.
                // Because of this, getInitialProps would not run.

                if (!(shallow && this.isShallowRoutingPossible(route))) {
                  _context3.next = 18;
                  break;
                }

                routeInfo = this.components[route];
                _context3.next = 21;
                break;

              case 18:
                _context3.next = 20;
                return this.getRouteInfo(route, pathname, query, as);

              case 20:
                routeInfo = _context3.sent;

              case 21:
                _routeInfo = routeInfo, error = _routeInfo.error;

                if (!(error && error.cancelled)) {
                  _context3.next = 24;
                  break;
                }

                return _context3.abrupt('return', false);

              case 24:

                this.events.emit('beforeHistoryChange', as);
                this.changeState(method, url, as, options);
                hash = window.location.hash.substring(1);


                this.set(route, pathname, query, as, (0, _extends3.default)({}, routeInfo, { hash: hash }));

                if (!error) {
                  _context3.next = 31;
                  break;
                }

                this.events.emit('routeChangeError', error, as);
                throw error;

              case 31:

                this.events.emit('routeChangeComplete', as);
                return _context3.abrupt('return', true);

              case 33:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function change(_x8, _x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: 'changeState',
    value: function changeState(method, url, as) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
        window.history[method]({ url: url, as: as, options: options }, null, as);
      }
    }
  }, {
    key: 'getRouteInfo',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(route, pathname, query, as) {
        var routeInfo, _routeInfo2, Component, ctx, _Component, _ctx;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                routeInfo = null;
                _context4.prev = 1;

                routeInfo = this.components[route];

                if (routeInfo) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 6;
                return this.fetchComponent(route, as);

              case 6:
                _context4.t0 = _context4.sent;
                routeInfo = {
                  Component: _context4.t0
                };

              case 8:
                _routeInfo2 = routeInfo, Component = _routeInfo2.Component;
                ctx = { pathname: pathname, query: query, asPath: as };
                _context4.next = 12;
                return this.getInitialProps(Component, ctx);

              case 12:
                routeInfo.props = _context4.sent;


                this.components[route] = routeInfo;
                _context4.next = 32;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t1 = _context4['catch'](1);

                if (!_context4.t1.cancelled) {
                  _context4.next = 20;
                  break;
                }

                return _context4.abrupt('return', { error: _context4.t1 });

              case 20:
                if (!_context4.t1.buildIdMismatched) {
                  _context4.next = 24;
                  break;
                }

                // Now we need to reload the page or do the action asked by the user
                (0, _._notifyBuildIdMismatch)(as);
                // We also need to cancel this current route change.
                // We do it like this.
                _context4.t1.cancelled = true;
                return _context4.abrupt('return', { error: _context4.t1 });

              case 24:

                if (_context4.t1.statusCode === 404) {
                  // Indicate main error display logic to
                  // ignore rendering this error as a runtime error.
                  _context4.t1.ignore = true;
                }

                _Component = this.ErrorComponent;

                routeInfo = { Component: _Component, err: _context4.t1 };
                _ctx = { err: _context4.t1, pathname: pathname, query: query };
                _context4.next = 30;
                return this.getInitialProps(_Component, _ctx);

              case 30:
                routeInfo.props = _context4.sent;


                routeInfo.error = _context4.t1;

              case 32:
                return _context4.abrupt('return', routeInfo);

              case 33:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 16]]);
      }));

      function getRouteInfo(_x13, _x14, _x15, _x16) {
        return _ref5.apply(this, arguments);
      }

      return getRouteInfo;
    }()
  }, {
    key: 'set',
    value: function set(route, pathname, query, as, data) {
      this.route = route;
      this.pathname = pathname;
      this.query = query;
      this.asPath = as;
      this.notify(data);
    }
  }, {
    key: 'onlyAHashChange',
    value: function onlyAHashChange(as) {
      if (!this.asPath) return false;

      var _asPath$split = this.asPath.split('#'),
          _asPath$split2 = (0, _slicedToArray3.default)(_asPath$split, 2),
          oldUrlNoHash = _asPath$split2[0],
          oldHash = _asPath$split2[1];

      var _as$split = as.split('#'),
          _as$split2 = (0, _slicedToArray3.default)(_as$split, 2),
          newUrlNoHash = _as$split2[0],
          newHash = _as$split2[1];

      // If the urls are change, there's more than a hash change


      if (oldUrlNoHash !== newUrlNoHash) {
        return false;
      }

      // If the hash has changed, then it's a hash only change.
      // This check is necessary to handle both the enter and
      // leave hash === '' cases. The identity case falls through
      // and is treated as a next reload.
      return oldHash !== newHash;
    }
  }, {
    key: 'scrollToHash',
    value: function scrollToHash(as) {
      var _as$split3 = as.split('#'),
          _as$split4 = (0, _slicedToArray3.default)(_as$split3, 2),
          hash = _as$split4[1];

      var el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView();
      }
    }
  }, {
    key: 'urlIsNew',
    value: function urlIsNew(pathname, query) {
      return this.pathname !== pathname || !(0, _shallowEquals2.default)(query, this.query);
    }
  }, {
    key: 'isShallowRoutingPossible',
    value: function isShallowRoutingPossible(route) {
      return (
        // If there's cached routeInfo for the route.
        Boolean(this.components[route]) &&
        // If the route is already rendered on the screen.
        this.route === route
      );
    }
  }, {
    key: 'prefetch',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(url) {
        var _this = this;

        var _parse2, pathname, route;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (false) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                _parse2 = (0, _url2.parse)(url), pathname = _parse2.pathname;
                route = toRoute(pathname);
                return _context5.abrupt('return', this.prefetchQueue.add(function () {
                  return _this.fetchRoute(route);
                }));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function prefetch(_x17) {
        return _ref6.apply(this, arguments);
      }

      return prefetch;
    }()
  }, {
    key: 'fetchComponent',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(route, as) {
        var cancelled, cancel, Component, error;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cancelled = false;

                cancel = this.componentLoadCancel = function () {
                  cancelled = true;
                };

                _context6.prev = 2;
                _context6.next = 5;
                return this.fetchRoute(route);

              case 5:
                Component = _context6.sent;

                if (!cancelled) {
                  _context6.next = 10;
                  break;
                }

                error = new Error('Abort fetching component for route: "' + route + '"');

                error.cancelled = true;
                throw error;

              case 10:

                if (cancel === this.componentLoadCancel) {
                  this.componentLoadCancel = null;
                }

                return _context6.abrupt('return', Component);

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6['catch'](2);

                // There's an error in loading the route.
                // Usually this happens when there's a failure in the webpack build
                // So in that case, we need to load the page with full SSR
                // That'll clean the invalid exising client side information.
                // (Like cached routes)
                window.location.href = as;
                throw _context6.t0;

              case 18:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 14]]);
      }));

      function fetchComponent(_x18, _x19) {
        return _ref7.apply(this, arguments);
      }

      return fetchComponent;
    }()
  }, {
    key: 'getInitialProps',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(Component, ctx) {
        var cancelled, cancel, props, err;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cancelled = false;

                cancel = function cancel() {
                  cancelled = true;
                };

                this.componentLoadCancel = cancel;

                _context7.next = 5;
                return (0, _utils.loadGetInitialProps)(Component, ctx);

              case 5:
                props = _context7.sent;


                if (cancel === this.componentLoadCancel) {
                  this.componentLoadCancel = null;
                }

                if (!cancelled) {
                  _context7.next = 11;
                  break;
                }

                err = new Error('Loading initial props cancelled');

                err.cancelled = true;
                throw err;

              case 11:
                return _context7.abrupt('return', props);

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getInitialProps(_x20, _x21) {
        return _ref8.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }, {
    key: 'fetchRoute',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(route) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.pageLoader.loadPage(route);

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchRoute(_x22) {
        return _ref9.apply(this, arguments);
      }

      return fetchRoute;
    }()
  }, {
    key: 'abortComponentLoad',
    value: function abortComponentLoad(as) {
      if (this.componentLoadCancel) {
        this.events.emit('routeChangeError', new Error('Route Cancelled'), as);
        this.componentLoadCancel();
        this.componentLoadCancel = null;
      }
    }
  }, {
    key: 'notify',
    value: function notify(data) {
      this.subscriptions.forEach(function (fn) {
        return fn(data);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(fn) {
      var _this2 = this;

      this.subscriptions.add(fn);
      return function () {
        return _this2.subscriptions.delete(fn);
      };
    }
  }]);
  return Router;
}();

exports.default = Router;


function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(236);
var util = __webpack_require__(237);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(84);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)(module), __webpack_require__(180)))

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(70);

var _promise2 = _interopRequireDefault(_promise);

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// based on https://github.com/sindresorhus/p-queue (MIT)
// modified for browser support

var Queue = function () {
  function Queue() {
    (0, _classCallCheck3.default)(this, Queue);

    this._queue = [];
  }

  (0, _createClass3.default)(Queue, [{
    key: 'enqueue',
    value: function enqueue(run) {
      this._queue.push(run);
    }
  }, {
    key: 'dequeue',
    value: function dequeue() {
      return this._queue.shift();
    }
  }, {
    key: 'size',
    get: function get() {
      return this._queue.length;
    }
  }]);
  return Queue;
}();

var PQueue = function () {
  function PQueue(opts) {
    (0, _classCallCheck3.default)(this, PQueue);

    opts = (0, _assign2.default)({
      concurrency: Infinity,
      queueClass: Queue
    }, opts);

    if (opts.concurrency < 1) {
      throw new TypeError('Expected `concurrency` to be a number from 1 and up');
    }

    this.queue = new opts.queueClass(); // eslint-disable-line new-cap
    this._pendingCount = 0;
    this._concurrency = opts.concurrency;
    this._resolveEmpty = function () {};
  }

  (0, _createClass3.default)(PQueue, [{
    key: '_next',
    value: function _next() {
      this._pendingCount--;

      if (this.queue.size > 0) {
        this.queue.dequeue()();
      } else {
        this._resolveEmpty();
      }
    }
  }, {
    key: 'add',
    value: function add(fn, opts) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var run = function run() {
          _this._pendingCount++;

          fn().then(function (val) {
            resolve(val);
            _this._next();
          }, function (err) {
            reject(err);
            _this._next();
          });
        };

        if (_this._pendingCount < _this._concurrency) {
          run();
        } else {
          _this.queue.enqueue(run, opts);
        }
      });
    }
  }, {
    key: 'onEmpty',
    value: function onEmpty() {
      var _this2 = this;

      return new _promise2.default(function (resolve) {
        var existingResolve = _this2._resolveEmpty;
        _this2._resolveEmpty = function () {
          existingResolve();
          resolve();
        };
      });
    }
  }, {
    key: 'size',
    get: function get() {
      return this.queue.size;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this._pendingCount;
    }
  }]);
  return PQueue;
}();

exports.default = PQueue;

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var index = typeof fetch=='function' ? fetch.bind() : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/200|0) == 1,		// 200-299
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function () { return Promise.resolve(request.responseText); },
				json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
				blob: function () { return Promise.resolve(new Blob([request.response])); },
				headers: {
					keys: function () { return keys; },
					entries: function () { return all; },
					get: function (n) { return headers[n.toLowerCase()]; },
					has: function (n) { return n.toLowerCase() in headers; }
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=unfetch.es.js.map


/***/ }),
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (true) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (false) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = __webpack_require__(350);
}


/***/ }),
/* 350 */,
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(31);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (true) {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(353);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__(355);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var performance = __webpack_require__(357);

var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance.now) {
  performanceNow = function performanceNow() {
    return performance.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

module.exports = performanceNow;

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var ExecutionEnvironment = __webpack_require__(221);

var performance;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.msPerformance || window.webkitPerformance;
}

module.exports = performance || {};

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(360);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(361);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(384);

var _map2 = _interopRequireDefault(_map);

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.flush = flush;

var _react = __webpack_require__(17);

var _stylesheetRegistry = __webpack_require__(390);

var _stylesheetRegistry2 = _interopRequireDefault(_stylesheetRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleSheetRegistry = new _stylesheetRegistry2.default();

var JSXStyle = function (_Component) {
  (0, _inherits3.default)(JSXStyle, _Component);

  function JSXStyle() {
    (0, _classCallCheck3.default)(this, JSXStyle);
    return (0, _possibleConstructorReturn3.default)(this, (JSXStyle.__proto__ || (0, _getPrototypeOf2.default)(JSXStyle)).apply(this, arguments));
  }

  (0, _createClass3.default)(JSXStyle, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      styleSheetRegistry.add(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.css !== nextProps.css;
    }

    // To avoid FOUC, we process new changes
    // on `componentWillUpdate` rather than `componentDidUpdate`.

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      styleSheetRegistry.update(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      styleSheetRegistry.remove(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'dynamic',
    value: function dynamic(info) {
      return info.map(function (tagInfo) {
        var _tagInfo = (0, _slicedToArray3.default)(tagInfo, 2),
            baseId = _tagInfo[0],
            props = _tagInfo[1];

        return styleSheetRegistry.computeId(baseId, props);
      }).join(' ');
    }
  }]);
  return JSXStyle;
}(_react.Component);

exports.default = JSXStyle;
function flush() {
  var cssRules = styleSheetRegistry.cssRules();
  styleSheetRegistry.flush();
  return new _map2.default(cssRules);
}

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(385), __esModule: true };

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(27);
__webpack_require__(386);
__webpack_require__(387);
__webpack_require__(388);
__webpack_require__(389);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(71);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(135)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(139)('Map') });


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(141)('Map');


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(142)('Map');


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(159);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _stringHash = __webpack_require__(391);

var _stringHash2 = _interopRequireDefault(_stringHash);

var _stylesheet = __webpack_require__(392);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleSheetRegistry = function () {
  function StyleSheetRegistry() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$styleSheet = _ref.styleSheet,
        styleSheet = _ref$styleSheet === undefined ? null : _ref$styleSheet,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === undefined ? false : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === undefined ? typeof window !== 'undefined' : _ref$isBrowser;

    (0, _classCallCheck3.default)(this, StyleSheetRegistry);

    this._sheet = styleSheet || new _stylesheet2.default({
      name: 'styled-jsx',
      optimizeForSpeed: optimizeForSpeed
    });
    this._sheet.inject();
    this._isBrowser = isBrowser;

    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};

    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  }

  (0, _createClass3.default)(StyleSheetRegistry, [{
    key: 'add',
    value: function add(props) {
      var _this = this;

      if (undefined === this._optimizeForSpeed) {
        this._optimizeForSpeed = Array.isArray(props.css);
        this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
        this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
      }

      if (this._isBrowser && !this._fromServer) {
        this._fromServer = this.selectFromServer();
        this._instancesCounts = (0, _keys2.default)(this._fromServer).reduce(function (acc, tagName) {
          acc[tagName] = 0;
          return acc;
        }, {});
      }

      var _getIdAndRules = this.getIdAndRules(props),
          styleId = _getIdAndRules.styleId,
          rules = _getIdAndRules.rules;

      // Deduping: just increase the instances count.


      if (styleId in this._instancesCounts) {
        this._instancesCounts[styleId] += 1;
        return;
      }

      var indices = rules.map(function (rule) {
        return _this._sheet.insertRule(rule);
      })
      // Filter out invalid rules
      .filter(function (index) {
        return index !== -1;
      });

      if (indices.length > 0) {
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
      }
    }
  }, {
    key: 'remove',
    value: function remove(props) {
      var _this2 = this;

      var _getIdAndRules2 = this.getIdAndRules(props),
          styleId = _getIdAndRules2.styleId;

      invariant(styleId in this._instancesCounts, 'styleId: `' + styleId + '` not found');
      this._instancesCounts[styleId] -= 1;

      if (this._instancesCounts[styleId] < 1) {
        var tagFromServer = this._fromServer && this._fromServer[styleId];
        if (tagFromServer) {
          tagFromServer.parentNode.removeChild(tagFromServer);
          delete this._fromServer[styleId];
        } else {
          this._indices[styleId].forEach(function (index) {
            return _this2._sheet.deleteRule(index);
          });
          delete this._indices[styleId];
        }
        delete this._instancesCounts[styleId];
      }
    }
  }, {
    key: 'update',
    value: function update(props, nextProps) {
      this.add(nextProps);
      this.remove(props);
    }
  }, {
    key: 'flush',
    value: function flush() {
      this._sheet.flush();
      this._sheet.inject();
      this._fromServer = undefined;
      this._indices = {};
      this._instancesCounts = {};

      this.computeId = this.createComputeId();
      this.computeSelector = this.createComputeSelector();
    }
  }, {
    key: 'cssRules',
    value: function cssRules() {
      var _this3 = this;

      var fromServer = this._fromServer ? (0, _keys2.default)(this._fromServer).map(function (styleId) {
        return [styleId, _this3._fromServer[styleId]];
      }) : [];
      var cssRules = this._sheet.cssRules();

      return fromServer.concat((0, _keys2.default)(this._indices).map(function (styleId) {
        return [styleId, _this3._indices[styleId].map(function (index) {
          return cssRules[index].cssText;
        }).join('\n')];
      }));
    }

    /**
     * createComputeId
     *
     * Creates a function to compute and memoize a jsx id from a basedId and optionally props.
     */

  }, {
    key: 'createComputeId',
    value: function createComputeId() {
      var cache = {};
      return function (baseId, props) {
        if (!props) {
          return 'jsx-' + baseId;
        }
        var propsToString = String(props);
        var key = baseId + propsToString;
        // return `jsx-${hashString(`${baseId}-${propsToString}`)}`
        if (!cache[key]) {
          cache[key] = 'jsx-' + (0, _stringHash2.default)(baseId + '-' + propsToString);
        }
        return cache[key];
      };
    }

    /**
     * createComputeSelector
     *
     * Creates a function to compute and memoize dynamic selectors.
     */

  }, {
    key: 'createComputeSelector',
    value: function createComputeSelector() {
      var selectoPlaceholderRegexp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /__jsx-style-dynamic-selector/g;

      var cache = {};
      return function (id, css) {
        var idcss = id + css;
        if (!cache[idcss]) {
          cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
        }
        return cache[idcss];
      };
    }
  }, {
    key: 'getIdAndRules',
    value: function getIdAndRules(props) {
      var _this4 = this;

      if (props.dynamic) {
        var styleId = this.computeId(props.styleId, props.dynamic);
        return {
          styleId: styleId,
          rules: Array.isArray(props.css) ? props.css.map(function (rule) {
            return _this4.computeSelector(styleId, rule);
          }) : [this.computeSelector(styleId, props.css)]
        };
      }

      return {
        styleId: this.computeId(props.styleId),
        rules: Array.isArray(props.css) ? props.css : [props.css]
      };
    }

    /**
     * selectFromServer
     *
     * Collects style tags from the document with id __jsx-XXX
     */

  }, {
    key: 'selectFromServer',
    value: function selectFromServer() {
      var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));

      return elements.reduce(function (acc, element) {
        var id = element.id.slice(2);
        acc[id] = element;
        return acc;
      }, {});
    }
  }]);
  return StyleSheetRegistry;
}();

exports.default = StyleSheetRegistry;


function invariant(condition, message) {
  if (!condition) {
    throw new Error('StyleSheetRegistry: ' + message + '.');
  }
}

/***/ }),
/* 391 */
/***/ (function(module, exports) {

module.exports = function(str) {
  var hash = 5381,
      i    = str.length

  while(i)
    hash = (hash * 33) ^ str.charCodeAt(--i)

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/

var isProd = process.env && "development" === 'production';
var isString = function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]';
};

var StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? 'stylesheet' : _ref$name,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === undefined ? isProd : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === undefined ? typeof window !== 'undefined' : _ref$isBrowser;

    (0, _classCallCheck3.default)(this, StyleSheet);

    invariant(isString(name), '`name` must be a string');
    this._name = name;
    this._deletedRulePlaceholder = '#' + name + '-deleted-rule____{}';

    invariant(typeof optimizeForSpeed === 'boolean', '`optimizeForSpeed` must be a boolean');
    this._optimizeForSpeed = optimizeForSpeed;
    this._isBrowser = isBrowser;

    this._serverSheet = undefined;
    this._tags = [];
    this._injected = false;
    this._rulesCount = 0;
  }

  (0, _createClass3.default)(StyleSheet, [{
    key: 'setOptimizeForSpeed',
    value: function setOptimizeForSpeed(bool) {
      invariant(typeof bool === 'boolean', '`setOptimizeForSpeed` accepts a boolean');

      invariant(this._rulesCount === 0, 'optimizeForSpeed cannot be when rules have already been inserted');
      this.flush();
      this._optimizeForSpeed = bool;
      this.inject();
    }
  }, {
    key: 'isOptimizeForSpeed',
    value: function isOptimizeForSpeed() {
      return this._optimizeForSpeed;
    }
  }, {
    key: 'inject',
    value: function inject() {
      var _this = this;

      invariant(!this._injected, 'sheet already injected');
      this._injected = true;
      if (this._isBrowser && this._optimizeForSpeed) {
        this._tags[0] = this.makeStyleTag(this._name);
        this._optimizeForSpeed = 'insertRule' in this.getSheet();
        if (!this._optimizeForSpeed) {
          if (!isProd) {
            console.warn('StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.'); // eslint-disable-line no-console
          }
          this.flush();
          this._injected = true;
        }
        return;
      }

      this._serverSheet = {
        cssRules: [],
        insertRule: function insertRule(rule, index) {
          if (typeof index === 'number') {
            _this._serverSheet.cssRules[index] = { cssText: rule };
          } else {
            _this._serverSheet.cssRules.push({ cssText: rule });
          }
          return index;
        },
        deleteRule: function deleteRule(index) {
          _this._serverSheet.cssRules[index] = null;
        }
      };
    }
  }, {
    key: 'getSheetForTag',
    value: function getSheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet;
      }

      // this weirdness brought to you by firefox
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i];
        }
      }
    }
  }, {
    key: 'getSheet',
    value: function getSheet() {
      return this.getSheetForTag(this._tags[this._tags.length - 1]);
    }
  }, {
    key: 'insertRule',
    value: function insertRule(rule, index) {
      invariant(isString(rule), '`insertRule` accepts only strings');

      if (!this._isBrowser) {
        if (typeof index !== 'number') {
          index = this._serverSheet.cssRules.length;
        }
        this._serverSheet.insertRule(rule, index);
        return this._rulesCount++;
      }

      if (this._optimizeForSpeed) {
        var sheet = this.getSheet();
        if (typeof index !== 'number') {
          index = sheet.cssRules.length;
        }
        // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
        try {
          sheet.insertRule(rule, index);
        } catch (err) {
          if (!isProd) {
            console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'); // eslint-disable-line no-console
          }
          return -1;
        }
      } else {
        var insertionPoint = this._tags[index];
        this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
      }

      return this._rulesCount++;
    }
  }, {
    key: 'replaceRule',
    value: function replaceRule(index, rule) {
      if (this._optimizeForSpeed || !this._isBrowser) {
        var sheet = this._isBrowser ? this.getSheet() : this._serverSheet;
        if (!rule.trim()) {
          rule = this._deletedRulePlaceholder;
        }

        if (!sheet.cssRules[index]) {
          // @TBD Should we throw an error?
          return index;
        }

        sheet.deleteRule(index);

        try {
          sheet.insertRule(rule, index);
        } catch (err) {
          if (!isProd) {
            console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'); // eslint-disable-line no-console
          }
          // In order to preserve the indices we insert a deleteRulePlaceholder
          sheet.insertRule(this._deletedRulePlaceholder, index);
        }
      } else {
        var tag = this._tags[index];
        invariant(tag, 'old rule at index `' + index + '` not found');
        tag.textContent = rule;
      }
      return index;
    }
  }, {
    key: 'deleteRule',
    value: function deleteRule(index) {
      if (!this._isBrowser) {
        this._serverSheet.deleteRule(index);
        return;
      }

      if (this._optimizeForSpeed) {
        this.replaceRule(index, '');
      } else {
        var tag = this._tags[index];
        invariant(tag, 'rule at index `' + index + '` not found');
        tag.parentNode.removeChild(tag);
        this._tags[index] = null;
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      this._injected = false;
      this._rulesCount = 0;
      if (this._isBrowser) {
        this._tags.forEach(function (tag) {
          return tag && tag.parentNode.removeChild(tag);
        });
        this._tags = [];
      } else {
        // simpler on server
        this._serverSheet.cssRules = [];
      }
    }
  }, {
    key: 'cssRules',
    value: function cssRules() {
      var _this2 = this;

      if (!this._isBrowser) {
        return this._serverSheet.cssRules;
      }
      return this._tags.reduce(function (rules, tag) {
        if (tag) {
          rules = rules.concat(_this2.getSheetForTag(tag).cssRules.map(function (rule) {
            return rule.cssText === _this2._deletedRulePlaceholder ? null : rule;
          }));
        } else {
          rules.push(null);
        }
        return rules;
      }, []);
    }
  }, {
    key: 'makeStyleTag',
    value: function makeStyleTag(name, cssString, relativeToTag) {
      if (cssString) {
        invariant(isString(cssString), 'makeStyleTag acceps only strings as second parameter');
      }
      var tag = document.createElement('style');
      tag.type = 'text/css';
      tag.setAttribute('data-' + name, '');
      if (cssString) {
        tag.appendChild(document.createTextNode(cssString));
      }
      var head = document.head || document.getElementsByTagName('head')[0];
      if (relativeToTag) {
        head.insertBefore(tag, relativeToTag);
      } else {
        head.appendChild(tag);
      }
      return tag;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._rulesCount;
    }
  }]);
  return StyleSheet;
}();

exports.default = StyleSheet;


function invariant(condition, message) {
  if (!condition) {
    throw new Error('StyleSheet: ' + message + '.');
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129)))

/***/ }),
/* 393 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return sym; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TASK; });
/* unused harmony export HELPER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SAGA_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SELF_CANCELLATION; });
/* unused harmony export konst */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return kTrue; });
/* unused harmony export kFalse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return ident; });
/* harmony export (immutable) */ __webpack_exports__["h"] = check;
/* unused harmony export hasOwn */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return object; });
/* harmony export (immutable) */ __webpack_exports__["w"] = remove;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return array; });
/* harmony export (immutable) */ __webpack_exports__["l"] = deferred;
/* harmony export (immutable) */ __webpack_exports__["g"] = arrayOfDeffered;
/* harmony export (immutable) */ __webpack_exports__["m"] = delay;
/* harmony export (immutable) */ __webpack_exports__["j"] = createMockTask;
/* unused harmony export autoInc */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return uid; });
/* harmony export (immutable) */ __webpack_exports__["t"] = makeIterator;
/* harmony export (immutable) */ __webpack_exports__["s"] = log;
/* harmony export (immutable) */ __webpack_exports__["n"] = deprecate;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return updateIncentive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return internalErr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return createSetContextWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return wrapSagaDispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return cloneableGenerator; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sym = function sym(id) {
  return '@@redux-saga/' + id;
};

var TASK = /*#__PURE__*/sym('TASK');
var HELPER = /*#__PURE__*/sym('HELPER');
var MATCH = /*#__PURE__*/sym('MATCH');
var CANCEL = /*#__PURE__*/sym('CANCEL_PROMISE');
var SAGA_ACTION = /*#__PURE__*/sym('SAGA_ACTION');
var SELF_CANCELLATION = /*#__PURE__*/sym('SELF_CANCELLATION');
var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = /*#__PURE__*/konst(true);
var kFalse = /*#__PURE__*/konst(false);
var noop = function noop() {};
var ident = function ident(v) {
  return v;
};

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}

var is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  string: function string(s) {
    return typeof s === 'string';
  },
  array: Array.isArray,
  object: function object(obj) {
    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  iterable: function iterable(it) {
    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};

var object = {
  assign: function assign(target, source) {
    for (var i in source) {
      if (hasOwn(source, i)) {
        target[i] = source[i];
      }
    }
  }
};

function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

var array = {
  from: function from(obj) {
    var arr = Array(obj.length);
    for (var i in obj) {
      if (hasOwn(obj, i)) {
        arr[i] = obj[i];
      }
    }
    return arr;
  }
};

function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);
  var promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}

function arrayOfDeffered(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }
  return arr;
}

function delay(ms) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var timeoutId = void 0;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(function () {
      return resolve(val);
    }, ms);
  });

  promise[CANCEL] = function () {
    return clearTimeout(timeoutId);
  };

  return promise;
}

function createMockTask() {
  var _ref;

  var running = true;
  var _result = void 0,
      _error = void 0;

  return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
    return running;
  }, _ref.result = function result() {
    return _result;
  }, _ref.error = function error() {
    return _error;
  }, _ref.setRunning = function setRunning(b) {
    return running = b;
  }, _ref.setResult = function setResult(r) {
    return _result = r;
  }, _ref.setError = function setError(e) {
    return _error = e;
  }, _ref;
}

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = /*#__PURE__*/autoInc();

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

function deprecate(fn, deprecationWarning) {
  return function () {
    if (true) log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}

var updateIncentive = function updateIncentive(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};

var internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};

var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
};

var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    return dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }));
  };
};

var cloneableGenerator = function cloneableGenerator(generatorFunc) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var history = [];
    var gen = generatorFunc.apply(undefined, args);
    return {
      next: function next(arg) {
        history.push(arg);
        return gen.next(arg);
      },
      clone: function clone() {
        var clonedGen = cloneableGenerator(generatorFunc).apply(undefined, args);
        history.forEach(function (arg) {
          return clonedGen.next(arg);
        });
        return clonedGen;
      },
      return: function _return(value) {
        return gen.return(value);
      },
      throw: function _throw(exception) {
        return gen.throw(exception);
      }
    };
  };
};

/***/ }),
/* 394 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return detach; });
/* harmony export (immutable) */ __webpack_exports__["s"] = take;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return takem; });
/* harmony export (immutable) */ __webpack_exports__["n"] = put;
/* harmony export (immutable) */ __webpack_exports__["b"] = all;
/* harmony export (immutable) */ __webpack_exports__["o"] = race;
/* harmony export (immutable) */ __webpack_exports__["e"] = call;
/* harmony export (immutable) */ __webpack_exports__["c"] = apply;
/* harmony export (immutable) */ __webpack_exports__["h"] = cps;
/* harmony export (immutable) */ __webpack_exports__["k"] = fork;
/* harmony export (immutable) */ __webpack_exports__["r"] = spawn;
/* harmony export (immutable) */ __webpack_exports__["m"] = join;
/* harmony export (immutable) */ __webpack_exports__["f"] = cancel;
/* harmony export (immutable) */ __webpack_exports__["p"] = select;
/* harmony export (immutable) */ __webpack_exports__["a"] = actionChannel;
/* harmony export (immutable) */ __webpack_exports__["g"] = cancelled;
/* harmony export (immutable) */ __webpack_exports__["j"] = flush;
/* harmony export (immutable) */ __webpack_exports__["l"] = getContext;
/* harmony export (immutable) */ __webpack_exports__["q"] = setContext;
/* harmony export (immutable) */ __webpack_exports__["t"] = takeEvery;
/* harmony export (immutable) */ __webpack_exports__["u"] = takeLatest;
/* harmony export (immutable) */ __webpack_exports__["w"] = throttle;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return asEffect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sagaHelpers__ = __webpack_require__(425);



var IO = /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_0__utils__["x" /* sym */])('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};

var detach = function detach(eff) {
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(asEffect.fork(eff), __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].object, 'detach(eff): argument must be a fork effect');
  eff[FORK].detached = true;
  return eff;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(arguments[0], __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

var takem = /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* deprecate */])(take.maybe, /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_0__utils__["z" /* updateIncentive */])('takem', 'take.maybe'));

function put(channel, action) {
  if (arguments.length > 1) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'put(channel, action): argument channel is undefined');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(action, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'put(channel, action): argument action is undefined');
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* deprecate */])(put.resolve, /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_0__utils__["z" /* updateIncentive */])('put.sync', 'put.resolve'));

function all(effects) {
  return effect(ALL, effects);
}

function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(fn, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }
  if (context && __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].string(fn) && __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(context[fn])) {
    fn = context[fn];
  }
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(fn, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(fork.apply(undefined, [fn].concat(args)));
}

function join() {
  for (var _len5 = arguments.length, tasks = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    tasks[_key5] = arguments[_key5];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return join(t);
    }));
  }
  var task = tasks[0];
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'join(task): argument task is undefined');
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].task, 'join(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  return effect(JOIN, task);
}

function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }
  var task = tasks[0];
  if (tasks.length === 1) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'cancel(task): argument task is undefined');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }
  return effect(CANCEL, task || __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* SELF_CANCELLATION */]);
}

function select(selector) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  if (arguments.length === 0) {
    selector = __WEBPACK_IMPORTED_MODULE_0__utils__["o" /* ident */];
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(selector, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'select(selector,[...]): argument selector is undefined');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(selector, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(pattern, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function flush(channel) {
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

function getContext(prop) {
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(prop, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].string, 'getContext(prop): argument ' + prop + ' is not a string');
  return effect(GET_CONTEXT, prop);
}

function setContext(props) {
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].object, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* createSetContextWarning */])(null, props));
  return effect(SET_CONTEXT, props);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len8 = arguments.length, args = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
    args[_key8 - 2] = arguments[_key8];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["b" /* takeEveryHelper */], patternOrChannel, worker].concat(args));
}

function takeLatest(patternOrChannel, worker) {
  for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
    args[_key9 - 2] = arguments[_key9];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["d" /* takeLatestHelper */], patternOrChannel, worker].concat(args));
}

function throttle(ms, pattern, worker) {
  for (var _len10 = arguments.length, args = Array(_len10 > 3 ? _len10 - 3 : 0), _key10 = 3; _key10 < _len10; _key10++) {
    args[_key10 - 3] = arguments[_key10];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["f" /* throttleHelper */], ms, pattern, worker].concat(args));
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = {
  take: /*#__PURE__*/createAsEffectType(TAKE),
  put: /*#__PURE__*/createAsEffectType(PUT),
  all: /*#__PURE__*/createAsEffectType(ALL),
  race: /*#__PURE__*/createAsEffectType(RACE),
  call: /*#__PURE__*/createAsEffectType(CALL),
  cps: /*#__PURE__*/createAsEffectType(CPS),
  fork: /*#__PURE__*/createAsEffectType(FORK),
  join: /*#__PURE__*/createAsEffectType(JOIN),
  cancel: /*#__PURE__*/createAsEffectType(CANCEL),
  select: /*#__PURE__*/createAsEffectType(SELECT),
  actionChannel: /*#__PURE__*/createAsEffectType(ACTION_CHANNEL),
  cancelled: /*#__PURE__*/createAsEffectType(CANCELLED),
  flush: /*#__PURE__*/createAsEffectType(FLUSH),
  getContext: /*#__PURE__*/createAsEffectType(GET_CONTEXT),
  setContext: /*#__PURE__*/createAsEffectType(SET_CONTEXT)
};

/***/ }),
/* 395 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isEnd; });
/* harmony export (immutable) */ __webpack_exports__["c"] = emitter;
/* unused harmony export INVALID_BUFFER */
/* unused harmony export UNDEFINED_INPUT_ERROR */
/* harmony export (immutable) */ __webpack_exports__["b"] = channel;
/* harmony export (immutable) */ __webpack_exports__["d"] = eventChannel;
/* harmony export (immutable) */ __webpack_exports__["f"] = stdChannel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buffers__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler__ = __webpack_require__(422);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = { type: CHANNEL_END_TYPE };
var isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};

function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* remove */])(subscribers, sub);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
}

var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

if (true) {
  UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
}

function channel() {
  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].fixed();

  var closed = false;
  var takers = [];

  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].buffer, INVALID_BUFFER);

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw Object(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* internalErr */])('Cannot have a closed channel with pending takers');
    }
    if (takers.length && !buffer.isEmpty()) {
      throw Object(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* internalErr */])('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(input, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].notUndef, UNDEFINED_INPUT_ERROR);
    if (closed) {
      return;
    }
    if (!takers.length) {
      return buffer.put(input);
    }
    for (var i = 0; i < takers.length; i++) {
      var cb = takers[i];
      if (!cb[__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* MATCH */]] || cb[__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* MATCH */]](input)) {
        takers.splice(i, 1);
        return cb(input);
      }
    }
  }

  function take(cb) {
    checkForbiddenStates();
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(cb, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, "channel.take's callback must be a function");

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);
      cb.cancel = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* remove */])(takers, cb);
      };
    }
  }

  function flush(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(cb, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, "channel.flush' callback must be a function");
    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer.flush());
  }

  function close() {
    checkForbiddenStates();
    if (!closed) {
      closed = true;
      if (takers.length) {
        var arr = takers;
        takers = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i](END);
        }
      }
    }
  }

  return {
    take: take,
    put: put,
    flush: flush,
    close: close,
    get __takers__() {
      return takers;
    },
    get __closed__() {
      return closed;
    }
  };
}

function eventChannel(subscribe) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].none();
  var matcher = arguments[2];

  /**
    should be if(typeof matcher !== undefined) instead?
    see PR #273 for a background discussion
  **/
  if (arguments.length > 2) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, 'Invalid match function passed to eventChannel');
  }

  var chan = channel(buffer);
  var close = function close() {
    if (!chan.__closed__) {
      if (unsubscribe) {
        unsubscribe();
      }
      chan.close();
    }
  };
  var unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }
    if (matcher && !matcher(input)) {
      return;
    }
    chan.put(input);
  });
  if (chan.__closed__) {
    unsubscribe();
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}

function stdChannel(subscribe) {
  var chan = eventChannel(function (cb) {
    return subscribe(function (input) {
      if (input[__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* SAGA_ACTION */]]) {
        cb(input);
        return;
      }
      Object(__WEBPACK_IMPORTED_MODULE_2__scheduler__["a" /* asap */])(function () {
        return cb(input);
      });
    });
  });

  return _extends({}, chan, {
    take: function take(cb, matcher) {
      if (arguments.length > 1) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, "channel.take's matcher argument must be a function");
        cb[__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* MATCH */]] = matcher;
      }
      chan.take(cb);
    }
  });
}

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(383)


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadData = loadData;
exports.loadDataSuccess = loadDataSuccess;
exports.failure = failure;
exports.setShowModal = setShowModal;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
var actionTypes = exports.actionTypes = {
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  FAILURE: 'FAILURE',
  SET_SHOW_MODAL: 'SET_SHOW_MODAL',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART'
};

function loadData() {
  return { type: actionTypes.LOAD_DATA };
}

function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data: data
  };
}

function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error: error
  };
}

function setShowModal(showModal) {
  return {
    type: actionTypes.SET_SHOW_MODAL,
    showModal: showModal
  };
}

function addToCart(productId, quantity) {
  return {
    type: actionTypes.ADD_TO_CART,
    productId: productId,
    quantity: quantity
  };
}

function removeFromCart(productId) {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    productId: productId
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlL2FjdGlvbnMuanMiXSwibmFtZXMiOlsiYWN0aW9uVHlwZXMiLCJMT0FEX0RBVEEiLCJMT0FEX0RBVEFfU1VDQ0VTUyIsIkZBSUxVUkUiLCJTRVRfU0hPV19NT0RBTCIsIkFERF9UT19DQVJUIiwiUkVNT1ZFX0ZST01fQ0FSVCIsImxvYWREYXRhIiwidHlwZSIsImxvYWREYXRhU3VjY2VzcyIsImRhdGEiLCJmYWlsdXJlIiwiZXJyb3IiLCJzZXRTaG93TW9kYWwiLCJzaG93TW9kYWwiLCJhZGRUb0NhcnQiLCJwcm9kdWN0SWQiLCJxdWFudGl0eSIsInJlbW92ZUZyb21DYXJ0Il0sIm1hcHBpbmdzIjoiOzs7OztRQVNPLEFBQVM7UUFJVCxBQUFTO1FBT1QsQUFBUztRQU9ULEFBQVM7UUFPVCxBQUFTO1FBUVQsQUFBUztBQTFDVCxJQUFNO2FBQWMsQUFDZCxBQUNYO3FCQUZ5QixBQUVOLEFBQ25CO1dBSHlCLEFBR2hCLEFBQ1Q7a0JBSnlCLEFBSVQsQUFDaEI7ZUFMeUIsQUFLWixBQUNiO29CQU5LLEFBQW9CLEFBTVAsQUFHcEI7QUFUMkIsQUFDekI7O0FBUUssb0JBQXFCLEFBQzFCO1NBQU8sRUFBQyxNQUFNLFlBQWQsQUFBTyxBQUFtQixBQUMzQjtBQUVEOztBQUFPLHlCQUFBLEFBQTBCLE1BQU0sQUFDckM7O1VBQ1EsWUFERCxBQUNhLEFBQ2xCO1VBRkYsQUFBTyxBQUlSO0FBSlEsQUFDTDtBQUtKOztBQUFPLGlCQUFBLEFBQWtCLE9BQU8sQUFDOUI7O1VBQ1EsWUFERCxBQUNhLEFBQ2xCO1dBRkYsQUFBTyxBQUlSO0FBSlEsQUFDTDtBQUtKOztBQUFPLHNCQUFBLEFBQXVCLFdBQVcsQUFDdkM7O1VBQ1EsWUFERCxBQUNhLEFBQ2xCO2VBRkYsQUFBTyxBQUlSO0FBSlEsQUFDTDtBQUtKOztBQUFPLG1CQUFBLEFBQW9CLFdBQXBCLEFBQStCLFVBQVUsQUFDOUM7O1VBQ1EsWUFERCxBQUNhLEFBQ2xCO2VBRkssQUFHTDtjQUhGLEFBQU8sQUFLUjtBQUxRLEFBQ0w7QUFNSjs7QUFBTyx3QkFBQSxBQUF5QixXQUFXLEFBQ3pDOztVQUNRLFlBREQsQUFDYSxBQUNsQjtlQUZGLEFBQU8sQUFJUjtBQUpRLEFBQ0wiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ29uemFsb2Jlbml0ZXovRG9jdW1lbnRzL3N0b3JlZnJvbnQvbmV4dC1zdG9yZWZyb250In0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/actions.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/actions.js"); } } })();

/***/ }),
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Provider__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_connect__ = __webpack_require__(450);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createProvider", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "connectAdvanced", function() { return __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return __WEBPACK_IMPORTED_MODULE_2__connect_connect__["a"]; });






/***/ }),
/* 399 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BUFFER_OVERFLOW */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buffers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);


var BUFFER_OVERFLOW = "Channel's Buffer overflow!";

var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;

var zeroBuffer = { isEmpty: __WEBPACK_IMPORTED_MODULE_0__utils__["r" /* kTrue */], put: __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */], take: __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */] };

function ringBuffer() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var overflowAction = arguments[1];

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];
    while (length) {
      items.push(take());
    }
    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit = void 0;
        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);
          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;
          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;

            arr = flush();

            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;

            arr.length = doubledLimit;
            limit = doubledLimit;

            push(it);
            break;
          default:
          // DROP
        }
      }
    },
    take: take,
    flush: flush
  };
}

var buffers = {
  none: function none() {
    return zeroBuffer;
  },
  fixed: function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  },
  dropping: function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  },
  sliding: function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  },
  expanding: function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  }
};

/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLocaleData", function() { return addLocaleData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intlShape", function() { return intlShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectIntl", function() { return injectIntl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defineMessages", function() { return defineMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntlProvider", function() { return IntlProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedDate", function() { return FormattedDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedTime", function() { return FormattedTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedRelative", function() { return FormattedRelative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedNumber", function() { return FormattedNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedPlural", function() { return FormattedPlural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedMessage", function() { return FormattedMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedHTMLMessage", function() { return FormattedHTMLMessage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale_data_index_js__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale_data_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__locale_data_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_intl_messageformat__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_intl_messageformat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_intl_relativeformat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_invariant__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_intl_format_cache__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_intl_format_cache__);
/*
 * Copyright 2017, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */









// GENERATED FILE
var defaultLocaleData = { "locale": "en", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
  }, "fields": { "year": { "displayName": "year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "hour", "relative": { "0": "this hour" }, "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "minute", "relative": { "0": "this minute" }, "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } };

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var locales = Array.isArray(data) ? data : [data];

  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.__addLocaleData(localeData);
      __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();

  return !!(__WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.__localeData__[normalizedLocale] && __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var bool = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.bool;
var number = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.number;
var string = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string;
var func = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func;
var object = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object;
var oneOf = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOf;
var shape = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape;
var any = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any;
var oneOfType = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType;

var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;

var intlConfigPropTypes = {
  locale: string,
  formats: object,
  messages: object,
  textComponent: any,

  defaultLocale: string,
  defaultFormats: object
};

var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};

var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));

var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};

var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),

  timeZone: string,
  hour12: bool,

  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};

var numberFormatPropTypes = {
  localeMatcher: localeMatcher,

  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,

  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};

var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year'])
};

var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};

/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);

var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};

var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  __WEBPACK_IMPORTED_MODULE_5_invariant___default()(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;


  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// Inspired by react-redux's `connect()` HOC factory function implementation:
// https://github.com/rackt/react-redux

function getDisplayName(Component$$1) {
  return Component$$1.displayName || Component$$1.name || 'Component';
}

function injectIntl(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$intlPropName = options.intlPropName,
      intlPropName = _options$intlPropName === undefined ? 'intl' : _options$intlPropName,
      _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef;

  var InjectIntl = function (_Component) {
    inherits(InjectIntl, _Component);

    function InjectIntl(props, context) {
      classCallCheck(this, InjectIntl);

      var _this = possibleConstructorReturn(this, (InjectIntl.__proto__ || Object.getPrototypeOf(InjectIntl)).call(this, props, context));

      invariantIntlContext(context);
      return _this;
    }

    createClass(InjectIntl, [{
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_5_invariant___default()(withRef, '[React Intl] To access the wrapped instance, ' + 'the `{withRef: true}` option must be set when calling: ' + '`injectIntl()`');

        return this.refs.wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(WrappedComponent, _extends({}, this.props, defineProperty({}, intlPropName, this.context.intl), {
          ref: withRef ? 'wrappedInstance' : null
        }));
      }
    }]);
    return InjectIntl;
  }(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

  InjectIntl.displayName = 'InjectIntl(' + getDisplayName(WrappedComponent) + ')';
  InjectIntl.contextTypes = {
    intl: intlShape
  };
  InjectIntl.WrappedComponent = WrappedComponent;


  return InjectIntl;
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function defineMessages(messageDescriptors) {
  // This simply returns what's passed-in because it's meant to be a hook for
  // babel-plugin-react-intl.
  return messageDescriptors;
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// This is a "hack" until a proper `intl-pluralformat` package is created.

function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);

  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);

var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60, // seconds to minute
  minute: 60, // minutes to hour
  hour: 24, // hours to day
  day: 30, // days to month
  month: 12 // months to year
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
}

function getNamedFormat(formats, type, name) {
  var format = formats && formats[type] && formats[type][name];
  if (format) {
    return format;
  }

  if (true) {
    console.error('[React Intl] No ' + type + ' format named: ' + name);
  }
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var defaults$$1 = format && getNamedFormat(formats, 'date', format);
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting date.\n' + e);
    }
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var defaults$$1 = format && getNamedFormat(formats, 'time', format);
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, { hour: 'numeric', minute: 'numeric' });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting time.\n' + e);
    }
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1);

  // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.
  var oldThresholds = _extends({}, __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.thresholds);
  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting relative time.\n' + e);
    }
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var defaults$$1 = format && getNamedFormat(formats, 'number', format);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting number.\n' + e);
    }
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;


  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting plural.\n' + e);
    }
  }

  return 'other';
}

function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage;

  // `id` is a required field of a Message Descriptor.

  __WEBPACK_IMPORTED_MODULE_5_invariant___default()(id, '[React Intl] An `id` must be provided to format a message.');

  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0;

  // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.
  if (!hasValues && "development" === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);

      formattedMessage = formatter.format(values);
    } catch (e) {
      if (true) {
        console.error('[React Intl] Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '') + ('\n' + e));
      }
    }
  } else {
    if (true) {
      // This prevents warnings from littering the console in development
      // when no `messages` are passed into the <IntlProvider> for the
      // default locale, and a default message is in the source.
      if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
        console.error('[React Intl] Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''));
      }
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      if (true) {
        console.error('[React Intl] Error formatting the default message for: "' + id + '"' + ('\n' + e));
      }
    }
  }

  if (!formattedMessage) {
    if (true) {
      console.error('[React Intl] Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.'));
    }
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.
  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});

  return formatMessage(config, state, messageDescriptor, escapedValues);
}



var format = Object.freeze({
	formatDate: formatDate,
	formatTime: formatTime,
	formatRelative: formatRelative,
	formatNumber: formatNumber,
	formatPlural: formatPlural,
	formatMessage: formatMessage,
	formatHTMLMessage: formatHTMLMessage
});

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes);

// These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.
var defaultProps = {
  formats: {},
  messages: {},
  textComponent: 'span',

  defaultLocale: 'en',
  defaultFormats: {}
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    __WEBPACK_IMPORTED_MODULE_5_invariant___default()(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');

    var intlContext = context.intl;

    // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;
    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    }

    // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.

    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(Intl.DateTimeFormat),
      getNumberFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(Intl.NumberFormat),
      getMessageFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(__WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a),
      getRelativeFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(__WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a),
      getPluralFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {

      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl;

      // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext);

      // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.
      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats;


        if (true) {
          console.error('[React Intl] Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'));
        }

        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig();

      // Bind intl factories and current config to the format functions.
      var boundFormatFns = this.getBoundFormatFns(config, this.state);

      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);


      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_4_react__["Children"].only(this.props.children);
    }
  }]);
  return IntlProvider;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
 true ? IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.element.isRequired,
  initialNow: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedDate
      );
    }
  }]);
  return FormattedDate;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
 true ? FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedTime
      );
    }
  }]);
  return FormattedTime;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
 true ? FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24;

// The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout
var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  }

  // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.
  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;
    case 'minute':
      return MINUTE;
    case 'hour':
      return HOUR;
    case 'day':
      return DAY;
    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();

  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);

    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

    // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.
    _this.state = { now: now };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this;

      // Cancel and pending update because we're scheduling a new update.
      clearTimeout(this._timer);

      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;

      var time = new Date(value).getTime();

      // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.
      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay);

      // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);

      this._timer = setTimeout(function () {
        _this2.setState({ now: _this2.context.intl.now() });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value;

      // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.
      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({ now: this.context.intl.now() });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedRelative
      );
    }
  }]);
  return FormattedRelative;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
 true ? FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  updateInterval: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.number,
  initialNow: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedNumber
      );
    }
  }]);
  return FormattedNumber;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
 true ? FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;


      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedPlural
      );
    }
  }]);
  return FormattedPlural;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
 true ? FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,

  other: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node.isRequired,
  zero: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  one: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  two: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  few: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  many: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,

  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;


      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatMessage = _context$intl.formatMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;


      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;

      var hasValues = values && Object.keys(values).length > 0;
      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }();

        // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.
        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {};

        // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.
        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if (Object(__WEBPACK_IMPORTED_MODULE_4_react__["isValidElement"])(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
      var formattedMessage = formatMessage(descriptor, tokenizedValues || values);

      var nodes = void 0;

      var hasElements = elements && Object.keys(elements).length > 0;
      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      }

      // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.
      return __WEBPACK_IMPORTED_MODULE_4_react__["createElement"].apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
 true ? FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object,
  tagName: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;


      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;


      var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      }

      // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.
      var html = { __html: formattedHTMLMessage };
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Component$$1, { dangerouslySetInnerHTML: html });
    }
  }]);
  return FormattedHTMLMessage;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
 true ? FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object,
  tagName: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(__WEBPACK_IMPORTED_MODULE_0__locale_data_index_js___default.a);




/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(56);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(500);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _url = __webpack_require__(235);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(52);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypesExact = __webpack_require__(502);

var _propTypesExact2 = _interopRequireDefault(_propTypesExact);

var _router = __webpack_require__(101);

var _router2 = _interopRequireDefault(_router);

var _utils = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global __NEXT_DATA__ */

var Link = function (_Component) {
  (0, _inherits3.default)(Link, _Component);

  function Link(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, Link);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this, props].concat(rest)));

    _this.linkClicked = _this.linkClicked.bind(_this);
    _this.formatUrls(props);
    return _this;
  }

  (0, _createClass3.default)(Link, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.formatUrls(nextProps);
    }
  }, {
    key: 'linkClicked',
    value: function linkClicked(e) {
      var _this2 = this;

      if (e.currentTarget.nodeName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var shallow = this.props.shallow;
      var href = this.href,
          as = this.as;


      if (!isLocal(href)) {
        // ignore click if it's outside our scope
        return;
      }

      var pathname = window.location.pathname;

      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;

      e.preventDefault();

      //  avoid scroll for urls with anchor refs
      var scroll = this.props.scroll;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      }

      // replace state instead of push if prop is present
      var replace = this.props.replace;

      var changeMethod = replace ? 'replace' : 'push';

      // straight up redirect
      _router2.default[changeMethod](href, as, { shallow: shallow }).then(function (success) {
        if (!success) return;
        if (scroll) window.scrollTo(0, 0);
      }).catch(function (err) {
        if (_this2.props.onError) _this2.props.onError(err);
      });
    }
  }, {
    key: 'prefetch',
    value: function prefetch() {
      if (!this.props.prefetch) return;
      if (typeof window === 'undefined') return;

      // Prefetch the JSON page if asked (only in the client)
      var pathname = window.location.pathname;

      var href = (0, _url.resolve)(pathname, this.href);
      _router2.default.prefetch(href);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.prefetch();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if ((0, _stringify2.default)(this.props.href) !== (0, _stringify2.default)(prevProps.href)) {
        this.prefetch();
      }
    }

    // We accept both 'href' and 'as' as objects which we can pass to `url.format`.
    // We'll handle it here.

  }, {
    key: 'formatUrls',
    value: function formatUrls(props) {
      this.href = props.href && (0, _typeof3.default)(props.href) === 'object' ? (0, _url.format)(props.href) : props.href;
      this.as = props.as && (0, _typeof3.default)(props.as) === 'object' ? (0, _url.format)(props.as) : props.as;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var href = this.href,
          as = this.as;
      // Deprecated. Warning shown by propType check. If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag

      if (typeof children === 'string') {
        children = _react2.default.createElement(
          'a',
          null,
          children
        );
      }

      // This will return the first child, if multiple are provided it will throw an error
      var child = _react.Children.only(children);
      var props = {
        onClick: this.linkClicked

        // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
        // defined, we specify the current 'href', so that repetition is not needed by the user
      };if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
        props.href = as || href;
      }

      // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly.
      if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
        props.href = (0, _router._rewriteUrlForNextExport)(props.href);
      }

      return _react2.default.cloneElement(child, props);
    }
  }]);
  return Link;
}(_react.Component);

Link.propTypes = (0, _propTypesExact2.default)({
  href: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  as: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  prefetch: _propTypes2.default.bool,
  replace: _propTypes2.default.bool,
  shallow: _propTypes2.default.bool,
  passHref: _propTypes2.default.bool,
  scroll: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, function (props, propName) {
    var value = props[propName];

    if (typeof value === 'string') {
      warnLink('Warning: You\'re using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>');
    }

    return null;
  }]).isRequired
});
exports.default = Link;


function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

var warnLink = (0, _utils.execOnce)(_utils.warn);

/***/ }),
/* 402 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(410);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),
/* 403 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(439);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 404 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(457);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 406 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_middleware__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_runSaga__ = __webpack_require__(423);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "runSaga", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_runSaga__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_channel__ = __webpack_require__(395);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "END", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "eventChannel", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "channel", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internal_buffers__ = __webpack_require__(399);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "buffers", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_buffers__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__ = __webpack_require__(425);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__internal_utils__ = __webpack_require__(393);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_utils__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CANCEL", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_utils__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internal_io__ = __webpack_require__(394);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "detach", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_io__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__effects__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(467);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "effects", function() { return __WEBPACK_IMPORTED_MODULE_7__effects__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return __WEBPACK_IMPORTED_MODULE_8__utils__; });

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__internal_middleware__["a" /* default */]);













/***/ }),
/* 407 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return qEnd; });
/* harmony export (immutable) */ __webpack_exports__["c"] = safeName;
/* harmony export (immutable) */ __webpack_exports__["a"] = fsmIterator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);


var done = { done: true, value: undefined };
var qEnd = {};

function safeName(patternOrChannel) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          q = _fsm$qNext[0],
          output = _fsm$qNext[1],
          _updateState = _fsm$qNext[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["t" /* makeIterator */])(next, function (error) {
    return next(null, error);
  }, name, true);
}

/***/ }),
/* 408 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 409 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(433);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 410 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 411 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 412 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),
/* 413 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = connectAdvanced;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__ = __webpack_require__(412);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["a" /* storeShape */], _contextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__["a" /* default */](this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (true) {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default()(Connect, WrappedComponent);
  };
}

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = wrapMapToPropsConstant;
/* unused harmony export getDependsOnOwnProps */
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapMapToPropsFunc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(416);


function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (true) Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

/***/ }),
/* 416 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifyPlainObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warning__ = __webpack_require__(404);



function verifyPlainObject(value, displayName, methodName) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(value)) {
    Object(__WEBPACK_IMPORTED_MODULE_1__warning__["a" /* default */])(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperties = __webpack_require__(418);

var implementation = __webpack_require__(419);
var getPolyfill = __webpack_require__(421);
var shim = __webpack_require__(461);

var polyfill = getPolyfill();

defineProperties(polyfill, {
	implementation: implementation,
	getPolyfill: getPolyfill,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(405);
var foreach = __webpack_require__(458);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var keys = __webpack_require__(405);
var bind = __webpack_require__(420);
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = __webpack_require__(460)();
var toObject = Object;
var push = bind.call(Function.call, Array.prototype.push);
var propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

module.exports = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = toObject(target);
	var s, source, i, props, syms, value, key;
	for (s = 1; s < arguments.length; ++s) {
		source = toObject(arguments[s]);
		props = keys(source);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			syms = getSymbols(source);
			for (i = 0; i < syms.length; ++i) {
				key = syms[i];
				if (propIsEnumerable(source, key)) {
					push(props, key);
				}
			}
		}
		for (i = 0; i < props.length; ++i) {
			key = props[i];
			value = source[key];
			if (propIsEnumerable(source, key)) {
				objTarget[key] = value;
			}
		}
	}
	return objTarget;
};


/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(459);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(419);

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	// v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	// note: this does not detect the bug unless there's 20 characters
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	// which is 72% slower than our shim, and Firefox 40's native implementation.
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),
/* 422 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asap;
/* harmony export (immutable) */ __webpack_exports__["c"] = suspend;
/* harmony export (immutable) */ __webpack_exports__["b"] = flush;
var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    flush();
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Puts the scheduler in a `released` state.
**/
function release() {
  semaphore--;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  release();

  var task = void 0;
  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

/***/ }),
/* 423 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__proc__ = __webpack_require__(424);



var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';

function runSaga(storeInterface, saga) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator = void 0;

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator(storeInterface)) {
    if (true) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["s" /* log */])('warn', 'runSaga(iterator, storeInterface) has been deprecated in favor of ' + RUN_SAGA_SIGNATURE);
    }
    iterator = storeInterface;
    storeInterface = saga;
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(saga, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func, NON_GENERATOR_ERR);
    iterator = saga.apply(undefined, args);
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(iterator, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator, NON_GENERATOR_ERR);
  }

  var _storeInterface = storeInterface,
      subscribe = _storeInterface.subscribe,
      dispatch = _storeInterface.dispatch,
      getState = _storeInterface.getState,
      context = _storeInterface.context,
      sagaMonitor = _storeInterface.sagaMonitor,
      logger = _storeInterface.logger,
      onError = _storeInterface.onError;


  var effectId = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["y" /* uid */])();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];

    sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
  }

  var task = Object(__WEBPACK_IMPORTED_MODULE_1__proc__["b" /* default */])(iterator, subscribe, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["A" /* wrapSagaDispatch */])(dispatch), getState, context, { sagaMonitor: sagaMonitor, logger: logger, onError: onError }, effectId, saga.name);

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }

  return task;
}

/***/ }),
/* 424 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NOT_ITERATOR_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANNEL_END; });
/* unused harmony export TASK_CANCEL */
/* harmony export (immutable) */ __webpack_exports__["b"] = proc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__io__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channel__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buffers__ = __webpack_require__(399);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }







var NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';

var CHANNEL_END = {
  toString: function toString() {
    return '@@redux-saga/CHANNEL_END';
  }
};
var TASK_CANCEL = {
  toString: function toString() {
    return '@@redux-saga/TASK_CANCEL';
  }
};

var matchers = {
  wildcard: function wildcard() {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["r" /* kTrue */];
  },
  default: function _default(pattern) {
    return (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) === 'symbol' ? function (input) {
      return input.type === pattern;
    } : function (input) {
      return input.type === String(pattern);
    };
  },
  array: function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return matcher(p)(input);
      });
    };
  },
  predicate: function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  }
};

function matcher(pattern) {
  // prettier-ignore
  return (pattern === '*' ? matchers.wildcard : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].array(pattern) ? matchers.array : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].stringableFunc(pattern) ? matchers.default : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(pattern) ? matchers.predicate : matchers.default)(pattern);
}

/**
  Used to track a parent task and its forks
  In the new fork model, forked tasks are attached by default to their parent
  We model this using the concept of Parent task && main Task
  main task is the main flow of the current Generator, the parent tasks is the
  aggregation of the main tasks + all its forked tasks.
  Thus the whole model represents an execution tree with multiple branches (vs the
  linear execution tree in sequential (non parallel) programming)

  A parent tasks has the following semantics
  - It completes if all its forks either complete or all cancelled
  - If it's cancelled, all forks are cancelled as well
  - It aborts if any uncaught error bubbles up from forks
  - If it completes, the return value is the one returned by the main task
**/
function forkQueue(name, mainTask, cb) {
  var tasks = [],
      result = void 0,
      completed = false;
  addTask(mainTask);

  function abort(err) {
    cancelAll();
    cb(err, true);
  }

  function addTask(task) {
    tasks.push(task);
    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* remove */])(tasks, task);
      task.cont = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cb(result);
        }
      }
    };
    // task.cont.cancel = task.cancel
  }

  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function (t) {
      t.cont = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: function getTasks() {
      return tasks;
    },
    taskNames: function taskNames() {
      return tasks.map(function (t) {
        return t.name;
      });
    }
  };
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator(fn)) {
    return fn;
  }

  // catch synchronous failures; see #152 and #441
  var result = void 0,
      error = void 0;
  try {
    result = fn.apply(context, args);
  } catch (err) {
    error = err;
  }

  // i.e. a generator function returns an iterator
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator(result)) {
    return result;
  }

  // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441
  return error ? Object(__WEBPACK_IMPORTED_MODULE_0__utils__["t" /* makeIterator */])(function () {
    throw error;
  }) : Object(__WEBPACK_IMPORTED_MODULE_0__utils__["t" /* makeIterator */])(function () {
    var pc = void 0;
    var eff = { done: false, value: result };
    var ret = function ret(value) {
      return { done: true, value: value };
    };
    return function (arg) {
      if (!pc) {
        pc = true;
        return eff;
      } else {
        return ret(arg);
      }
    };
  }());
}

var wrapHelper = function wrapHelper(helper) {
  return { fn: helper };
};

function proc(iterator) {
  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
  };
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
  var parentContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var parentEffectId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'anonymous';
  var cont = arguments[8];

  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(iterator, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator, NOT_ITERATOR_ERROR);

  var effectsString = '[...effects]';
  var runParallelEffect = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* deprecate */])(runAllEffect, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["z" /* updateIncentive */])(effectsString, 'all(' + effectsString + ')'));

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;

  var log = logger || __WEBPACK_IMPORTED_MODULE_0__utils__["s" /* log */];
  var logError = function logError(err) {
    var message = err.sagaStack;

    if (!message && err.stack) {
      message = err.stack.split('\n')[0].indexOf(err.message) !== -1 ? err.stack : 'Error: ' + err.message + '\n' + err.stack;
    }

    log('error', 'uncaught at ' + name, message || err.message || err);
  };
  var stdChannel = Object(__WEBPACK_IMPORTED_MODULE_3__channel__["f" /* stdChannel */])(subscribe);
  var taskContext = Object.create(parentContext);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/
  next.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];

  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/
  var task = newTask(parentEffectId, name, iterator, cont);
  var mainTask = { name: name, cancel: cancelMain, isRunning: true };
  var taskQueue = forkQueue(name, mainTask, end);

  /**
    cancellation of the main task. We'll simply resume the Generator with a Cancel
  **/
  function cancelMain() {
    if (mainTask.isRunning && !mainTask.isCancelled) {
      mainTask.isCancelled = true;
      next(TASK_CANCEL);
    }
  }

  /**
    This may be called by a parent generator to trigger/propagate cancellation
    cancel all pending tasks (including the main task), then end the current task.
     Cancellation propagates down to the whole execution tree holded by this Parent task
    It's also propagated to all joiners of this task and their execution tree/joiners
     Cancellation is noop for terminated/Cancelled tasks tasks
  **/
  function cancel() {
    /**
      We need to check both Running and Cancelled status
      Tasks can be Cancelled but still Running
    **/
    if (iterator._isRunning && !iterator._isCancelled) {
      iterator._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/
      end(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/
  cont && (cont.cancel = cancel);

  // tracks the running status
  iterator._isRunning = true;

  // kicks up the generator
  next();

  // then return the task descriptor to the caller
  return task;

  /**
    This is the generator driver
    It's a recursive async/continuation function which calls itself
    until the generator terminates or throws
  **/
  function next(arg, isErr) {
    // Preventive measure. If we end up here, then there is really something wrong
    if (!mainTask.isRunning) {
      throw new Error('Trying to resume an already finished generator');
    }

    try {
      var result = void 0;
      if (isErr) {
        result = iterator.throw(arg);
      } else if (arg === TASK_CANCEL) {
        /**
          getting TASK_CANCEL automatically cancels the main task
          We can get this value here
           - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.isCancelled = true;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/
        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          This will jump to the finally block
        **/
        result = __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
      } else if (arg === CHANNEL_END) {
        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(iterator.return) ? iterator.return() : { done: true };
      } else {
        result = iterator.next(arg);
      }

      if (!result.done) {
        runEffect(result.value, parentEffectId, '', next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        mainTask.isMainRunning = false;
        mainTask.cont && mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        logError(error);
      }
      mainTask.isMainRunning = false;
      mainTask.cont(error, true);
    }
  }

  function end(result, isErr) {
    iterator._isRunning = false;
    stdChannel.close();
    if (!isErr) {
      iterator._result = result;
      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
    } else {
      if (result instanceof Error) {
        Object.defineProperty(result, 'sagaStack', {
          value: 'at ' + name + ' \n ' + (result.sagaStack || result.stack),
          configurable: true
        });
      }
      if (!task.cont) {
        if (result instanceof Error && onError) {
          onError(result);
        } else {
          logError(result);
        }
      }
      iterator._error = result;
      iterator._isAborted = true;
      iterator._deferredEnd && iterator._deferredEnd.reject(result);
    }
    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
  }

  function runEffect(effect, parentEffectId) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var cb = arguments[3];

    var effectId = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["y" /* uid */])();
    sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });

    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/
    var effectSettled = void 0;

    // Completion callback passed to the appropriate effect runner
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */]; // defensive measure
      if (sagaMonitor) {
        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
      }
      cb(res, isErr);
    }
    // tracks down the current cancel
    currCb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];

    // setup cancellation logic on the parent cb
    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      /**
        propagates cancel downward
        catch uncaught cancellations errors; since we can no longer call the completion
        callback, log errors raised during cancellations into the console
      **/
      try {
        currCb.cancel();
      } catch (err) {
        logError(err);
      }
      currCb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */]; // defensive measure

      sagaMonitor && sagaMonitor.effectCancelled(effectId);
    };

    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
       This is a sort of inversion of control: called async functions are responsible
      for completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
       Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    var data = void 0;
    // prettier-ignore
    return (
      // Non declarative effect
      __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].promise(effect) ? resolvePromise(effect, currCb) : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator(effect) ? resolveIterator(effect, effectId, name, currCb)

      // declarative effects
      : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].array(effect) ? runParallelEffect(effect, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].take(effect)) ? runTakeEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].put(effect)) ? runPutEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].all(effect)) ? runAllEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].call(effect)) ? runCallEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].cps(effect)) ? runCPSEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].join(effect)) ? runJoinEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].cancel(effect)) ? runCancelEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].select(effect)) ? runSelectEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].flush(effect)) ? runFlushEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].getContext(effect)) ? runGetContextEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["d" /* asEffect */].setContext(effect)) ? runSetContextEffect(data, currCb) : /* anything else returned as is */currCb(effect)
    );
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* CANCEL */]];
    if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(cancelPromise)) {
      cb.cancel = cancelPromise;
    } else if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(promise.abort)) {
      cb.cancel = function () {
        return promise.abort();
      };
      // TODO: add support for the fetch API, whenever they get around to
      // adding cancel support
    }
    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, name, cb) {
    proc(iterator, subscribe, dispatch, getState, taskContext, options, effectId, name, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var channel = _ref2.channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;

    channel = channel || stdChannel;
    var takeCb = function takeCb(inp) {
      return inp instanceof Error ? cb(inp, true) : Object(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
    };
    try {
      channel.take(takeCb, matcher(pattern));
    } catch (err) {
      return cb(err, true);
    }
    cb.cancel = takeCb.cancel;
  }

  function runPutEffect(_ref3, cb) {
    var channel = _ref3.channel,
        action = _ref3.action,
        resolve = _ref3.resolve;

    /**
      Schedule the put in case another saga is holding a lock.
      The put will be executed atomically. ie nested puts will execute after
      this put has terminated.
    **/
    Object(__WEBPACK_IMPORTED_MODULE_1__scheduler__["a" /* asap */])(function () {
      var result = void 0;
      try {
        result = (channel ? channel.put : dispatch)(action);
      } catch (error) {
        // If we have a channel or `put.resolve` was used then bubble up the error.
        if (channel || resolve) return cb(error, true);
        logError(error);
      }

      if (resolve && __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].promise(result)) {
        resolvePromise(result, cb);
      } else {
        return cb(result);
      }
    });
    // Put effects are non cancellables
  }

  function runCallEffect(_ref4, effectId, cb) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;

    var result = void 0;
    // catch synchronous failures; see #152
    try {
      result = fn.apply(context, args);
    } catch (error) {
      return cb(error, true);
    }
    return __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].promise(result) ? resolvePromise(result, cb) : __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
  }

  function runCPSEffect(_ref5, cb) {
    var context = _ref5.context,
        fn = _ref5.fn,
        args = _ref5.args;

    // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb

    // catch synchronous failures; see #152
    try {
      var cpsCb = function cpsCb(err, res) {
        return __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].undef(err) ? cb(res) : cb(err, true);
      };
      fn.apply(context, args.concat(cpsCb));
      if (cpsCb.cancel) {
        cb.cancel = function () {
          return cpsCb.cancel();
        };
      }
    } catch (error) {
      return cb(error, true);
    }
  }

  function runForkEffect(_ref6, effectId, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args,
        detached = _ref6.detached;

    var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });

    try {
      Object(__WEBPACK_IMPORTED_MODULE_1__scheduler__["c" /* suspend */])();
      var _task = proc(taskIterator, subscribe, dispatch, getState, taskContext, options, effectId, fn.name, detached ? null : __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */]);

      if (detached) {
        cb(_task);
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(_task);
          cb(_task);
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error);
        } else {
          cb(_task);
        }
      }
    } finally {
      Object(__WEBPACK_IMPORTED_MODULE_1__scheduler__["b" /* flush */])();
    }
    // Fork effects are non cancellables
  }

  function runJoinEffect(t, cb) {
    if (t.isRunning()) {
      var joiner = { task: task, cb: cb };
      cb.cancel = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* remove */])(t.joiners, joiner);
      };
      t.joiners.push(joiner);
    } else {
      t.isAborted() ? cb(t.error(), true) : cb(t.result());
    }
  }

  function runCancelEffect(taskToCancel, cb) {
    if (taskToCancel === __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* SELF_CANCELLATION */]) {
      taskToCancel = task;
    }
    if (taskToCancel.isRunning()) {
      taskToCancel.cancel();
    }
    cb();
    // cancel effects are non cancellables
  }

  function runAllEffect(effects, effectId, cb) {
    var keys = Object.keys(effects);

    if (!keys.length) {
      return cb(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].array(effects) ? [] : {});
    }

    var completedCount = 0;
    var completed = void 0;
    var results = {};
    var childCbs = {};

    function checkEffectEnd() {
      if (completedCount === keys.length) {
        completed = true;
        cb(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].array(effects) ? __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* array */].from(_extends({}, results, { length: keys.length })) : results);
      }
    }

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }
        if (isErr || Object(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(res) || res === CHANNEL_END || res === TASK_CANCEL) {
          cb.cancel();
          cb(res, isErr);
        } else {
          results[key] = res;
          completedCount++;
          checkEffectEnd();
        }
      };
      chCbAtKey.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };

    keys.forEach(function (key) {
      return runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runRaceEffect(effects, effectId, cb) {
    var completed = void 0;
    var keys = Object.keys(effects);
    var childCbs = {};

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, true);
        } else if (!Object(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
          var _response;

          cb.cancel();
          completed = true;
          var response = (_response = {}, _response[key] = res, _response);
          cb(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].array(effects) ? [].slice.call(_extends({}, response, { length: keys.length })) : response);
        }
      };
      chCbAtKey.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* noop */];
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };
    keys.forEach(function (key) {
      if (completed) {
        return;
      }
      runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runSelectEffect(_ref7, cb) {
    var selector = _ref7.selector,
        args = _ref7.args;

    try {
      var state = selector.apply(undefined, [getState()].concat(args));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(_ref8, cb) {
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;

    var match = matcher(pattern);
    match.pattern = pattern;
    cb(Object(__WEBPACK_IMPORTED_MODULE_3__channel__["d" /* eventChannel */])(subscribe, buffer || __WEBPACK_IMPORTED_MODULE_4__buffers__["a" /* buffers */].fixed(), match));
  }

  function runCancelledEffect(data, cb) {
    cb(!!mainTask.isCancelled);
  }

  function runFlushEffect(channel, cb) {
    channel.flush(cb);
  }

  function runGetContextEffect(prop, cb) {
    cb(taskContext[prop]);
  }

  function runSetContextEffect(props, cb) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["v" /* object */].assign(taskContext, props);
    cb();
  }

  function newTask(id, name, iterator, cont) {
    var _done, _ref9, _mutatorMap;

    iterator._deferredEnd = null;
    return _ref9 = {}, _ref9[__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* TASK */]] = true, _ref9.id = id, _ref9.name = name, _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
      if (iterator._deferredEnd) {
        return iterator._deferredEnd.promise;
      } else {
        var def = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* deferred */])();
        iterator._deferredEnd = def;
        if (!iterator._isRunning) {
          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
        }
        return def.promise;
      }
    }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel, _ref9.isRunning = function isRunning() {
      return iterator._isRunning;
    }, _ref9.isCancelled = function isCancelled() {
      return iterator._isCancelled;
    }, _ref9.isAborted = function isAborted() {
      return iterator._isAborted;
    }, _ref9.result = function result() {
      return iterator._result;
    }, _ref9.error = function error() {
      return iterator._error;
    }, _ref9.setContext = function setContext(props) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].object, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* createSetContextWarning */])('task', props));
      __WEBPACK_IMPORTED_MODULE_0__utils__["v" /* object */].assign(taskContext, props);
    }, _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
  }
}

/***/ }),
/* 425 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return takeEvery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return takeLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return throttle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__takeEvery__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__takeLatest__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__throttle__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(393);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__takeEvery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__takeLatest__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__throttle__["a"]; });






var deprecationWarning = function deprecationWarning(helperName) {
  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};

var takeEvery = /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_3__utils__["n" /* deprecate */])(__WEBPACK_IMPORTED_MODULE_0__takeEvery__["a" /* default */], /*#__PURE__*/deprecationWarning('takeEvery'));
var takeLatest = /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_3__utils__["n" /* deprecate */])(__WEBPACK_IMPORTED_MODULE_1__takeLatest__["a" /* default */], /*#__PURE__*/deprecationWarning('takeLatest'));
var throttle = /*#__PURE__*/Object(__WEBPACK_IMPORTED_MODULE_3__utils__["n" /* deprecate */])(__WEBPACK_IMPORTED_MODULE_2__throttle__["a" /* default */], /*#__PURE__*/deprecationWarning('throttle'));



/***/ }),
/* 426 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_io__ = __webpack_require__(394);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takem", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cps", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fork", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "actionChannel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["w"]; });


/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */



var IntlMessageFormat = __webpack_require__(478)['default'];

// Add all locale data to `IntlMessageFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
__webpack_require__(485);

// Re-export `IntlMessageFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlMessageFormat;
exports['default'] = exports;


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports.extend = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}
exports.hop = hop;

//# sourceMappingURL=utils.js.map

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(430);


/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(88);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _actions = __webpack_require__(397);

var _store = __webpack_require__(431);

var _Layout = __webpack_require__(476);

var _Layout2 = _interopRequireDefault(_Layout);

var _HomePage = __webpack_require__(507);

var _HomePage2 = _interopRequireDefault(_HomePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/pages/index.js?entry';


var Home = function (_React$Component) {
  (0, _inherits3.default)(Home, _React$Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);

    return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Layout2.default, { title: 'Home Page', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, _react2.default.createElement(_HomePage2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
        var store = _ref.store;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!store.getState().placeholderData) {
                  store.dispatch((0, _actions.loadData)());
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Home;
}(_react2.default.Component);

exports.default = (0, _store.withReduxSaga)(Home);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwibG9hZERhdGEiLCJ3aXRoUmVkdXhTYWdhIiwiTGF5b3V0IiwiSG9tZVBhZ2UiLCJIb21lIiwic3RvcmUiLCJnZXRTdGF0ZSIsInBsYWNlaG9sZGVyRGF0YSIsImRpc3BhdGNoIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUVQLEFBQVMsQUFBZ0I7O0FBQ3pCLEFBQVMsQUFBcUI7O0FBQzlCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWM7Ozs7Ozs7OztJLEFBRWY7Ozs7Ozs7Ozs7OzZCQU9NLEFBQ1I7NkJBQ0UsQUFBQyxrQ0FBTyxPQUFSLEFBQWM7b0JBQWQ7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBRkosQUFDRSxBQUNFLEFBR0w7QUFISztBQUFBOzs7Ozs7WUFUeUIsQSxhQUFBLEE7Ozs7bUJBQzdCO29CQUFJLENBQUMsTUFBQSxBQUFNLFdBQVgsQUFBc0IsaUJBQWlCLEFBQ3JDO3dCQUFBLEFBQU0sU0FBTixBQUFlLEFBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUpjLGdCQUFNLEEsQUFnQnpCOztrQkFBZSwwQkFBZixBQUFlLEFBQWMiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dvbnphbG9iZW5pdGV6L0RvY3VtZW50cy9zdG9yZWZyb250L25leHQtc3RvcmVmcm9udCJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/pages/index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;
exports.withReduxSaga = withReduxSaga;

var _redux = __webpack_require__(402);

var _reduxDevtoolsExtension = __webpack_require__(446);

var _nextReduxWrapper = __webpack_require__(447);

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _nextReduxSaga = __webpack_require__(462);

var _nextReduxSaga2 = _interopRequireDefault(_nextReduxSaga);

var _reduxSaga = __webpack_require__(406);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reducer = __webpack_require__(468);

var _reducer2 = _interopRequireDefault(_reducer);

var _saga = __webpack_require__(472);

var _saga2 = _interopRequireDefault(_saga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sagaMiddleware = (0, _reduxSaga2.default)();

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var store = (0, _redux.createStore)(_reducer2.default, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(sagaMiddleware)));

  store.sagaTask = sagaMiddleware.run(_saga2.default);
  return store;
}

function withReduxSaga(BaseComponent) {
  return (0, _nextReduxWrapper2.default)(configureStore)((0, _nextReduxSaga2.default)(BaseComponent));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZVN0b3JlIiwiYXBwbHlNaWRkbGV3YXJlIiwiY29tcG9zZVdpdGhEZXZUb29scyIsIndpdGhSZWR1eCIsIm5leHRSZWR1eFNhZ2EiLCJjcmVhdGVTYWdhTWlkZGxld2FyZSIsInJvb3RSZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwicm9vdFNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsImNvbmZpZ3VyZVN0b3JlIiwic3RvcmUiLCJzYWdhVGFzayIsInJ1biIsIndpdGhSZWR1eFNhZ2EiLCJCYXNlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztRQVdPLEFBQVM7UUFXVCxBQUFTOztBQXRCaEIsQUFBUyxBQUFhOztBQUN0QixBQUFTOztBQUNULEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUVQLEFBQU8sQUFBZSxBQUFvQjs7OztBQUMxQyxBQUFPLEFBQWM7Ozs7OztBQUVyQixJQUFNLGlCQUFOLEFBQXVCLEFBRXZCOztBQUFPLDBCQUFzRDtNQUE3QixBQUE2QixtRkFBZCxBQUFjLEFBQzNEOztNQUFNLFFBQVEsQUFDWiwyQ0FEWSxBQUVaLGNBQ0EsaURBQW9CLDRCQUh0QixBQUFjLEFBR1osQUFBb0IsQUFBZ0IsQUFHdEM7O1FBQUEsQUFBTSxXQUFXLGVBQWpCLEFBQWlCLEFBQWUsQUFBSSxBQUNwQztTQUFBLEFBQU8sQUFDUjtBQUVEOztBQUFPLHVCQUFBLEFBQXdCLGVBQWUsQUFDNUM7U0FBTyxnQ0FBQSxBQUFVLGdCQUFnQiw2QkFBakMsQUFBTyxBQUEwQixBQUFjLEFBQ2hEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/index.js"); } } })();

/***/ }),
/* 432 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(436);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 433 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(434);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 434 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(180)))

/***/ }),
/* 435 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(409);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 436 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 437 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(438);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 438 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 439 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(441);


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(442);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(180), __webpack_require__(98)(module)))

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 443 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(410);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),
/* 444 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 445 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(411);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(402).compose;

exports.__esModule = true;
exports.composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);


/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(17);
var ReactRedux = __webpack_require__(398);
var assign = __webpack_require__(417);

var connect = ReactRedux.connect;
var Provider = ReactRedux.Provider;

var _Promise;
var _debug = false;
var skipMerge = ['initialState', 'initialProps', 'isServer', 'store'];
var DEFAULT_KEY = '__NEXT_REDUX_STORE__';
var isBrowser = typeof window !== 'undefined';

function initStore(makeStore, initialState, context, config) {
    var req = context.req;
    var isServer = !!req && !isBrowser;
    var storeKey = config.storeKey;

    var options = assign({}, config, {
        isServer: isServer,
        req: req,
        res: context.res,
        query: context.query
    });

    // Always make a new store if server
    if (isServer) {
        if (!req._store) {
            req._store = makeStore(initialState, options);
        }
        return req._store;
    }

    if (!isBrowser) return null;

    // Memoize store if client
    if (!window[storeKey]) {
        window[storeKey] = makeStore(initialState, options);
    }

    return window[storeKey];

}

module.exports = function(createStore) {

    var config = {storeKey: DEFAULT_KEY, debug: _debug};
    var connectArgs;

    // Ensure backwards compatibility, the config object should come last after connect arguments.
    if (typeof createStore === 'object') {

        var wrappedConfig = createStore;

        if (!({}).hasOwnProperty.call(wrappedConfig, 'createStore')) {
            throw new Error('Missing createStore function');
        }
        createStore = wrappedConfig.createStore;

        // Set all config keys if they exist.
        if (({}).hasOwnProperty.call(wrappedConfig, 'debug')) {
            config.debug = wrappedConfig.debug;
        }

        if (({}).hasOwnProperty.call(wrappedConfig, 'storeKey')) {
            config.storeKey = wrappedConfig.storeKey;
        }

        // Map the connect arguments from the passed in config object.
        connectArgs = [
            wrappedConfig.mapStateToProps || undefined,
            wrappedConfig.mapDispatchToProps || undefined,
            wrappedConfig.mergeProps || undefined,
            wrappedConfig.connectOptions || undefined,
        ];

    } else {
        connectArgs = [].slice.call(arguments).slice(1);
    }

    return function(Cmp) {

        // Since provide should always be after connect we connect here
        var ConnectedCmp = (connect.apply(null, connectArgs))(Cmp);

        function WrappedCmp(props) {

            props = props || {};

            var initialState = props.initialState || {};
            var initialProps = props.initialProps || {};
            var hasStore = props.store && props.store.dispatch && props.store.getState;
            var store = hasStore
                ? props.store
                : initStore(createStore, initialState, {}, config); // client case, no store but has initialState

            if (!store) {
                console.error('Attention, withRedux has to be used only for top level pages, all other components must be wrapped with React Redux connect!');
                console.error('Check ' + Cmp.name + ' component.');
                console.error('Automatic fallback to connect has been performed, please check your code.');
                return React.createElement(ConnectedCmp, props);
            }

            if (config.debug) console.log(Cmp.name, '- 4. WrappedCmp.render', (hasStore ? 'picked up existing one,' : 'created new store with'), 'initialState', initialState);

            // Fix for _document
            var mergedProps = {};
            Object.keys(props).forEach(function(p) { if (!~skipMerge.indexOf(p)) mergedProps[p] = props[p]; });
            Object.keys(initialProps || {}).forEach(function(p) { mergedProps[p] = initialProps[p]; });

            return React.createElement( //FIXME This will create double Provider for _document case
                Provider,
                {store: store},
                React.createElement(ConnectedCmp, mergedProps)
            );

        }

        WrappedCmp.getInitialProps = function(ctx) {

            return new _Promise(function(res) {

                ctx = ctx || {};
                if (config.debug) console.log(Cmp.name, '- 1. WrappedCmp.getInitialProps wrapper', (ctx.req && ctx.req._store ? 'takes the req store' : 'creates the store'));
                ctx.isServer = !!ctx.req;
                ctx.store = initStore(createStore, undefined /** initialState **/, {req: ctx.req, query: ctx.query, res: ctx.res}, config);

                res(_Promise.all([
                    ctx.isServer,
                    ctx.store,
                    ctx.req,
                    Cmp.getInitialProps ? Cmp.getInitialProps.call(Cmp, ctx) : {}
                ]));

            }).then(function(arr) {

                if (config.debug) console.log(Cmp.name, '- 3. WrappedCmp.getInitialProps has store state', arr[1].getState());

                return {
                    isServer: arr[0],
                    store: arr[1],
                    initialState: arr[1].getState(),
                    initialProps: arr[3]
                };

            });

        };

        return WrappedCmp;

    };

};

module.exports.setPromise = function(Promise) {
    _Promise = Promise;
};

module.exports.setDebug = function(debug) {
    _debug = debug;
};

module.exports.setPromise(Promise);


/***/ }),
/* 448 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createProvider;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(404);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  Object(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
    };

    return Provider;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  if (true) {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired, _Provider$childContex[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */], _Provider$childContex);

  return Provider;
}

/* harmony default export */ __webpack_exports__["b"] = (createProvider());

/***/ }),
/* 449 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),
/* 450 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createConnect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mergeProps__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectorFactory__ = __webpack_require__(455);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__["a" /* default */] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__["a" /* default */] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__["a" /* default */] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? __WEBPACK_IMPORTED_MODULE_4__mergeProps__["a" /* default */] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? __WEBPACK_IMPORTED_MODULE_5__selectorFactory__["a" /* default */] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (createConnect());

/***/ }),
/* 451 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 452 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapDispatchToPropsIsFunction */
/* unused harmony export whenMapDispatchToPropsIsMissing */
/* unused harmony export whenMapDispatchToPropsIsObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__ = __webpack_require__(415);



function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["bindActionCreators"])(mapDispatchToProps, dispatch);
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),
/* 453 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapStateToPropsIsFunction */
/* unused harmony export whenMapStateToPropsIsMissing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__ = __webpack_require__(415);


function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function () {
    return {};
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),
/* 454 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultMergeProps */
/* unused harmony export wrapMergePropsFunc */
/* unused harmony export whenMergePropsIsFunction */
/* unused harmony export whenMergePropsIsOmitted */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(416);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (true) Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);

/***/ }),
/* 455 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export impureFinalPropsSelectorFactory */
/* unused harmony export pureFinalPropsSelectorFactory */
/* harmony export (immutable) */ __webpack_exports__["a"] = finalPropsSelectorFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__verifySubselectors__ = __webpack_require__(456);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (true) {
    Object(__WEBPACK_IMPORTED_MODULE_0__verifySubselectors__["a" /* default */])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/***/ }),
/* 456 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifySubselectors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_warning__ = __webpack_require__(404);


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_warning__["a" /* default */])('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 458 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(405);

module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; }
	if (keys(obj).length !== 0) { return false; }
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(418);
var getPolyfill = __webpack_require__(421);

module.exports = function shimAssign() {
	var polyfill = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};


/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(88);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reduxSaga = __webpack_require__(406);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withReduxSaga(BaseComponent) {
  var WrappedComponent = function (_Component) {
    (0, _inherits3.default)(WrappedComponent, _Component);

    function WrappedComponent() {
      (0, _classCallCheck3.default)(this, WrappedComponent);
      return (0, _possibleConstructorReturn3.default)(this, (WrappedComponent.__proto__ || (0, _getPrototypeOf2.default)(WrappedComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(WrappedComponent, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(BaseComponent, this.props);
      }
    }], [{
      key: 'getInitialProps',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
          var isServer, store, props;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  isServer = ctx.isServer, store = ctx.store;
                  props = void 0;

                  if (!BaseComponent.getInitialProps) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 5;
                  return BaseComponent.getInitialProps(ctx);

                case 5:
                  props = _context.sent;

                case 6:
                  if (!isServer) {
                    _context.next = 10;
                    break;
                  }

                  store.dispatch(_reduxSaga.END);
                  _context.next = 10;
                  return store.sagaTask.done;

                case 10:
                  return _context.abrupt('return', props);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _ref.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);
    return WrappedComponent;
  }(_react.Component);

  return WrappedComponent;
}

exports.default = withReduxSaga;


/***/ }),
/* 463 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sagaMiddlewareFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runSaga__ = __webpack_require__(423);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






function sagaMiddlewareFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$context = _ref.context,
      context = _ref$context === undefined ? {} : _ref$context,
      options = _objectWithoutProperties(_ref, ['context']);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;


  if (__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(options)) {
    if (false) {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (logger && !__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if ("development" === 'development' && options.onerror) {
    throw new Error('`options.onerror` was removed. Use `options.onError` instead.');
  }

  if (onError && !__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(onError)) {
    throw new Error('`options.onError` passed to the Saga middleware is not a function!');
  }

  if (options.emitter && !__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].func(options.emitter)) {
    throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState,
        dispatch = _ref2.dispatch;

    var sagaEmitter = Object(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* emitter */])();
    sagaEmitter.emit = (options.emitter || __WEBPACK_IMPORTED_MODULE_0__utils__["o" /* ident */])(sagaEmitter.emit);

    sagaMiddleware.run = __WEBPACK_IMPORTED_MODULE_2__runSaga__["a" /* runSaga */].bind(null, {
      context: context,
      subscribe: sagaEmitter.subscribe,
      dispatch: dispatch,
      getState: getState,
      sagaMonitor: sagaMonitor,
      logger: logger,
      onError: onError
    });

    return function (next) {
      return function (action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action); // hit reducers
        sagaEmitter.emit(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function () {
    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
  };

  sagaMiddleware.setContext = function (props) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* is */].object, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* createSetContextWarning */])('sagaMiddleware', props));
    __WEBPACK_IMPORTED_MODULE_0__utils__["v" /* object */].assign(context, props);
  };

  return sagaMiddleware;
}

/***/ }),
/* 464 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeEvery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(395);




function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: Object(__WEBPACK_IMPORTED_MODULE_1__io__["s" /* take */])(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["k" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return Object(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */])({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + Object(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */])(patternOrChannel) + ', ' + worker.name + ')');
}

/***/ }),
/* 465 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeLatest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(395);




function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: Object(__WEBPACK_IMPORTED_MODULE_1__io__["s" /* take */])(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["k" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: Object(__WEBPACK_IMPORTED_MODULE_1__io__["f" /* cancel */])(task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return Object(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */])({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + Object(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */])(patternOrChannel) + ', ' + worker.name + ')');
}

/***/ }),
/* 466 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buffers__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(393);






function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: Object(__WEBPACK_IMPORTED_MODULE_1__io__["a" /* actionChannel */])(pattern, __WEBPACK_IMPORTED_MODULE_3__buffers__["a" /* buffers */].sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: Object(__WEBPACK_IMPORTED_MODULE_1__io__["s" /* take */])(channel) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["k" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: Object(__WEBPACK_IMPORTED_MODULE_1__io__["e" /* call */])(__WEBPACK_IMPORTED_MODULE_4__utils__["m" /* delay */], delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return Object(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */])({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + Object(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */])(pattern) + ', ' + worker.name + ')');
}

/***/ }),
/* 467 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_utils__ = __webpack_require__(393);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TASK", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SAGA_ACTION", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deferred", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arrayOfDeffered", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMockTask", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cloneableGenerator", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_io__ = __webpack_require__(394);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "asEffect", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_io__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_proc__ = __webpack_require__(424);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_END", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_proc__["a"]; });




/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _isNan = __webpack_require__(469);

var _isNan2 = _interopRequireDefault(_isNan);

var _extends2 = __webpack_require__(105);

var _extends3 = _interopRequireDefault(_extends2);

var _actions = __webpack_require__(397);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = {
  error: false,
  products: [],
  cart: [],
  cartCount: 0,
  cartSubTotal: 0,
  showModal: false
};

function setShowModal(state, action) {
  return (0, _extends3.default)({}, state, { showModal: action.showModal });
}

function findProductInCart(state, action) {
  var newProductId = parseInt(action.productId, 10);
  return state.cart.findIndex(function (product) {
    return product.id === newProductId;
  });
}

function removeFromCart(state, action) {
  var cart = state.cart;
  var cartIndex = findProductInCart(state, action);
  cart.splice(cartIndex, 1);
  return (0, _extends3.default)({}, state, { cart: cart });
}

function addToCart(state, action) {
  var cart = state.cart;
  var newQuantity = parseInt(action.quantity, 10);
  var newProductId = parseInt(action.productId, 10);
  //check if newQuantity is valid
  if (!(0, _isNan2.default)(newQuantity)) {
    var cartIndex = findProductInCart(state, action);
    //if does not exist add to cart, else increment quantity
    if (cartIndex !== -1) {
      cart[cartIndex].quantity += newQuantity;
    } else {
      cart.push({
        id: newProductId,
        quantity: newQuantity
      });
    }
  }
  return (0, _extends3.default)({}, state, { cart: cart });
}

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actions.actionTypes.LOAD_DATA_SUCCESS:
      return (0, _extends3.default)({}, state, { products: action.data });

    case _actions.actionTypes.FAILURE:
      return (0, _extends3.default)({}, state, { error: action.error });

    case _actions.actionTypes.ADD_TO_CART:
      return addToCart(state, action);

    case _actions.actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);

    case _actions.actionTypes.SET_SHOW_MODAL:
      return setShowModal(state, action);

    default:
      return state;
  }
}

exports.default = reducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlL3JlZHVjZXIuanMiXSwibmFtZXMiOlsiYWN0aW9uVHlwZXMiLCJpbml0aWFsU3RhdGUiLCJlcnJvciIsInByb2R1Y3RzIiwiY2FydCIsImNhcnRDb3VudCIsImNhcnRTdWJUb3RhbCIsInNob3dNb2RhbCIsInNldFNob3dNb2RhbCIsInN0YXRlIiwiYWN0aW9uIiwiZmluZFByb2R1Y3RJbkNhcnQiLCJuZXdQcm9kdWN0SWQiLCJwYXJzZUludCIsInByb2R1Y3RJZCIsImZpbmRJbmRleCIsInByb2R1Y3QiLCJpZCIsInJlbW92ZUZyb21DYXJ0IiwiY2FydEluZGV4Iiwic3BsaWNlIiwiYWRkVG9DYXJ0IiwibmV3UXVhbnRpdHkiLCJxdWFudGl0eSIsInB1c2giLCJyZWR1Y2VyIiwidHlwZSIsIkxPQURfREFUQV9TVUNDRVNTIiwiZGF0YSIsIkZBSUxVUkUiLCJBRERfVE9fQ0FSVCIsIlJFTU9WRV9GUk9NX0NBUlQiLCJTRVRfU0hPV19NT0RBTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUSxBQUFrQixBQUUxQjs7OztBQUFPLElBQU07U0FBZSxBQUNuQixBQUNQO1lBRjBCLEFBRWhCLEFBQ1Y7UUFIMEIsQUFHcEIsQUFDTjthQUowQixBQUlmLEFBQ1g7Z0JBTDBCLEFBS1osQUFDZDthQU5LLEFBQXFCLEFBTWY7QUFOZSxBQUMxQjs7QUFRRixTQUFBLEFBQVMsYUFBVCxBQUF1QixPQUF2QixBQUE4QixRQUFRLEFBQ3BDO29DQUFBLEFBQ0ssT0FDQSxFQUFFLFdBQVcsT0FGbEIsQUFFSyxBQUFvQixBQUUxQjs7O0FBRUQsU0FBQSxBQUFTLGtCQUFULEFBQTRCLE9BQTVCLEFBQW1DLFFBQVEsQUFDekM7TUFBTSxlQUFlLFNBQVMsT0FBVCxBQUFnQixXQUFyQyxBQUFxQixBQUEyQixBQUNoRDtlQUFPLEFBQU0sS0FBTixBQUFXLFVBQVUsVUFBQSxBQUFDLFNBQVksQUFDdkM7V0FBTyxRQUFBLEFBQVEsT0FBZixBQUFzQixBQUN2QjtBQUZELEFBQU8sQUFHUixHQUhROzs7QUFLVCxTQUFBLEFBQVMsZUFBVCxBQUF5QixPQUF6QixBQUFnQyxRQUFRLEFBQ3RDO01BQU0sT0FBTyxNQUFiLEFBQW1CLEFBQ25CO01BQU0sWUFBWSxrQkFBQSxBQUFrQixPQUFwQyxBQUFrQixBQUF5QixBQUMzQztPQUFBLEFBQUssT0FBTCxBQUFZLFdBQVosQUFBdUIsQUFDdkI7b0NBQUEsQUFDSyxPQUNBLEVBQUUsTUFGUCxBQUVLLEFBQVEsQUFFZDs7O0FBRUQsU0FBQSxBQUFTLFVBQVQsQUFBb0IsT0FBcEIsQUFBMkIsUUFBUSxBQUNqQztNQUFNLE9BQU8sTUFBYixBQUFtQixBQUNuQjtNQUFNLGNBQWMsU0FBUyxPQUFULEFBQWdCLFVBQXBDLEFBQW9CLEFBQTBCLEFBQzlDO01BQU0sZUFBZSxTQUFTLE9BQVQsQUFBZ0IsV0FBckMsQUFBcUIsQUFBMkIsQUFDaEQ7QUFDQTtNQUFJLENBQUMscUJBQUwsQUFBSyxBQUFhLGNBQWMsQUFDOUI7UUFBTSxZQUFZLGtCQUFBLEFBQWtCLE9BQXBDLEFBQWtCLEFBQXlCLEFBQzNDO0FBQ0E7UUFBSSxjQUFjLENBQWxCLEFBQW1CLEdBQUcsQUFDcEI7V0FBQSxBQUFLLFdBQUwsQUFBZ0IsWUFBaEIsQUFBNEIsQUFDN0I7QUFGRCxXQUVPLEFBQ0w7V0FBQSxBQUFLO1lBQUssQUFDSixBQUNKO2tCQUZGLEFBQVUsQUFFRSxBQUViO0FBSlcsQUFDUjtBQUlMO0FBQ0Q7b0NBQUEsQUFDSyxPQUNBLEVBQUUsTUFGUCxBQUVLLEFBQVEsQUFFZDs7O0FBRUQsU0FBQSxBQUFTLFVBQXVDO01BQTlCLEFBQThCLDRFQUF0QixBQUFzQjtNQUFSLEFBQVEsbUJBQzlDOztVQUFRLE9BQVIsQUFBZSxBQUNiO1NBQUsscUJBQUwsQUFBaUIsQUFDZjt3Q0FBQSxBQUNLLE9BQ0EsRUFBRSxVQUFVLE9BRmpCLEFBRUssQUFBbUIsQUFHMUI7O1NBQUsscUJBQUwsQUFBaUIsQUFDZjt3Q0FBQSxBQUNLLE9BQ0EsRUFBRSxPQUFPLE9BRmQsQUFFSyxBQUFnQixBQUd2Qjs7U0FBSyxxQkFBTCxBQUFpQixBQUNmO2FBQU8sVUFBQSxBQUFVLE9BQWpCLEFBQU8sQUFBaUIsQUFFMUI7O1NBQUsscUJBQUwsQUFBaUIsQUFDZjthQUFPLGVBQUEsQUFBZSxPQUF0QixBQUFPLEFBQXNCLEFBRS9COztTQUFLLHFCQUFMLEFBQWlCLEFBQ2Y7YUFBTyxhQUFBLEFBQWEsT0FBcEIsQUFBTyxBQUFvQixBQUU3Qjs7QUFDRTthQXZCSixBQXVCSSxBQUFPLEFBRVo7O0FBRUQ7O2tCQUFBLEFBQWUiLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ29uemFsb2Jlbml0ZXovRG9jdW1lbnRzL3N0b3JlZnJvbnQvbmV4dC1zdG9yZWZyb250In0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/reducer.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/reducer.js"); } } })();

/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(470), __esModule: true };

/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(471);
module.exports = __webpack_require__(0).Number.isNaN;


/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = __webpack_require__(406);

var _effects = __webpack_require__(426);

var _es6Promise = __webpack_require__(473);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

__webpack_require__(475);

var _actions = __webpack_require__(397);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(loadDataSaga),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(rootSaga);

_es6Promise2.default.polyfill();

function loadDataSaga() {
  var res, data;
  return _regenerator2.default.wrap(function loadDataSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return fetch('http://localhost:3000/static/products.json');

        case 3:
          res = _context.sent;
          _context.next = 6;
          return res.json();

        case 6:
          data = _context.sent;
          _context.next = 9;
          return (0, _effects.put)((0, _actions.loadDataSuccess)(data));

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context['catch'](0);
          _context.next = 15;
          return (0, _effects.put)((0, _actions.failure)(_context.t0));

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 11]]);
}

function rootSaga() {
  return _regenerator2.default.wrap(function rootSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.all)([(0, _effects.takeLatest)(_actions.actionTypes.LOAD_DATA, loadDataSaga)]);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

exports.default = rootSaga;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlL3NhZ2EuanMiXSwibmFtZXMiOlsibG9hZERhdGFTYWdhIiwicm9vdFNhZ2EiLCJkZWxheSIsImFsbCIsImNhbGwiLCJwdXQiLCJ0YWtlIiwidGFrZUxhdGVzdCIsImVzNnByb21pc2UiLCJhY3Rpb25UeXBlcyIsImZhaWx1cmUiLCJsb2FkRGF0YVN1Y2Nlc3MiLCJwb2x5ZmlsbCIsImZldGNoIiwicmVzIiwianNvbiIsImRhdGEiLCJMT0FEX0RBVEEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxBQUFROztBQUNSLEFBQVEsQUFBSyxBQUFNLEFBQUssQUFBTTs7QUFDOUIsQUFBTzs7OztBQUNQOztBQUVBLEFBQVEsQUFBYSxBQUFTLEFBQXVCOzs7O3NEQUkxQyxBO3VEQVVBLEE7O0FBWlgscUJBQUEsQUFBVzs7QUFFWCxTQUFBLEFBQVcsZUFBWDtXQUFBO3FFQUFBO2NBQUE7dUNBQUE7YUFBQTswQkFBQTswQkFBQTtpQkFFc0IsTUFGdEIsQUFFc0IsQUFBTTs7YUFBbEI7QUFGVix5QkFBQTswQkFBQTtpQkFHdUIsSUFIdkIsQUFHdUIsQUFBSTs7YUFBakI7QUFIViwwQkFBQTswQkFBQTtpQkFJVSxrQkFBSSw4QkFKZCxBQUlVLEFBQUksQUFBZ0I7O2FBSjlCOzBCQUFBO0FBQUE7O2FBQUE7MEJBQUE7MENBQUE7MEJBQUE7aUJBTVUsa0JBQUksK0JBTmQsQUFNVTs7YUFOVjthQUFBOzBCQUFBOztBQUFBO3lCQUFBOzs7QUFVQSxTQUFBLEFBQVcsV0FBWDtrRUFBQTtjQUFBO3lDQUFBO2FBQUE7MkJBQUE7aUJBQ1Esa0JBQUksQ0FDUix5QkFBVyxxQkFBWCxBQUF1QixXQUYzQixBQUNRLEFBQUksQUFDUixBQUFrQzs7YUFGdEM7YUFBQTsyQkFBQTs7QUFBQTtlQUFBO0FBTUE7O2tCQUFBLEFBQWUiLCJmaWxlIjoic2FnYS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ29uemFsb2Jlbml0ZXovRG9jdW1lbnRzL3N0b3JlZnJvbnQvbmV4dC1zdG9yZWZyb250In0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/saga.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/store/saga.js"); } } })();

/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.2+97478eb6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(474);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
    var local = void 0;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129), __webpack_require__(180)))

/***/ }),
/* 474 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = window.fetch || (window.fetch = __webpack_require__(239).default || __webpack_require__(239));


/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(396);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(398);

var _reactIntl = __webpack_require__(400);

var _formats = __webpack_require__(496);

var _formats2 = _interopRequireDefault(_formats);

var _head = __webpack_require__(189);

var _head2 = _interopRequireDefault(_head);

var _Nav = __webpack_require__(497);

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/components/Layout.js';


function Page(_ref) {
  var children = _ref.children,
      title = _ref.title;

  return _react2.default.createElement(_reactIntl.IntlProvider, { locale: 'en', formats: _formats2.default, defaultFormats: _formats2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement('div', {
    className: 'jsx-2526110562' + ' ' + 'container',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', className: 'jsx-2526110562',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), _react2.default.createElement('meta', { charSet: 'utf-8', className: 'jsx-2526110562',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement('title', {
    className: 'jsx-2526110562',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, title + ' - Next Storefront')), _react2.default.createElement(_Nav2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }), _react2.default.createElement('div', {
    className: 'jsx-2526110562' + ' ' + 'content',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, children), _react2.default.createElement(_style2.default, {
    styleId: '2526110562',
    css: 'body{margin:0;padding:0;background-color:#f9f9f9}*{margin:0;padding:0;box-sizing:border-box;outline:none}table{border-collapse:collapse}table tbody tr:last-child td{border-bottom:2px solid #e9ecef}table td,table th{vertical-align:middle;padding-top:1em;padding-bottom:1em}table.stripe td,table.stripe th{border-bottom:2px solid #e9ecef;padding-top:2em;padding-bottom:2em}table tr th{vertical-align:bottom}p,table{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;color:#586069}a{color:#777777;text-decoration:none;cursor:pointer}a:hover{color:#222222}button,a.button{-webkit-appearance:none;-moz-appearance:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-transform:uppercase;padding:1.3em 2em;margin:0.5em 0;color:white;background:#343436;border:2px solid #343436;-webkit-transition:all 0.1s;-webkit-transition:all 0.1s;transition:all 0.1s;font-size:12px;cursor:pointer;font-weight:bold;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}button.white,a.button.white{color:black;background:white}button:hover,a.button:hover{color:white;background:black}input{display:inline-block;-webkit-appearance:none;-moz-appearance:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:1.2em 0.9em;margin:0.5em 0.5em 0.5em 0;background:#f2f2f2;border:1px solid #f2f2f2;-webkit-transition:all 0.1s;-webkit-transition:all 0.1s;transition:all 0.1s;font-size:14px}h1,h2,h3{font-family:"Times New Roman",Georgia,Serif;padding:0 20px;font-weight:100;font-size:2.5em}h4,h5,h6{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif}.push-left{float:left}.push-right{float:right}.col{float:none;display:inline-block;vertical-align:middle}.col-6{width:50%}.col-3{width:25%}.hidden{display:none}.container .content{margin:0 auto;padding:70px 0 0;text-align:center}.error{padding-top:120px;display:block}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9CMkIsQUFHc0IsQUFNQSxBQU9nQixBQUlPLEFBSVYsQUFNVSxBQU1WLEFBSXFDLEFBSzdDLEFBTUEsQUFJVSxBQXFCWixBQUtBLEFBS1MsQUFjeUIsQUFPYSxBQUloRCxBQUlDLEFBSUQsQUFNRCxBQUlBLEFBSUcsQUFJQyxBQU1JLFNBM0lSLEFBTUEsQ0FvSFosQUFJQSxDQWxCQSxBQVF1QixDQTNDSixBQUtBLEFBa0NuQixDQWtCQSxDQXhGdUIsQUFNdkIsQUFzRm1CLElBTUgsQ0EzSVcsQUFNSCxFQTRFRSxDQTlEUixBQVlsQixFQW1CdUIsQ0F2Q3ZCLElBNkRBLEFBS0EsRUF3RG9CLENBdEhwQixBQVVrQixBQTBGTSxBQXdCeEIsR0FsR2lCLEdBckJJLEdBZE4sR0FOZixBQStGaUIsQ0E1Q0MsQUErQkssR0F4REYsQ0E0R3JCLENBNUZBLElBbkNBLEFBNkdBLEVBakZnQixBQW1FaEIsQ0FqRkEsRUEyRWtCLE9BYkEsQ0F4RGxCLEdBU0EsS0E2RGtCLGdCQUNsQixlQTlDMkIscUJBZ0NMLElBL0JGLGdCQWdDUyxFQS9CWixlQUNILFVBK0JPLEVBOUJBLGlCQStCTSxFQTlCQSx1QkErQkcsRUE5QkEsMEJBK0JSLEVBOUJBLDhDQStCTCxFQTlCQSxhQStCakIsRUE5QmlCLGVBQ0UsaUJBQ1EseUJBQ0gsc0JBQ0QscUJBQ0oscUZBQ25CIiwiZmlsZSI6ImNvbXBvbmVudHMvTGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBJbnRsUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IGZvcm1hdHMgZnJvbSAnLi4vY29uc3RhbnRzL2Zvcm1hdHMnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTmF2IGZyb20gJy4vTmF2J1xuXG5mdW5jdGlvbiBQYWdlICh7IGNoaWxkcmVuLCB0aXRsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgPEludGxQcm92aWRlciBsb2NhbGU9XCJlblwiIGZvcm1hdHM9eyBmb3JtYXRzIH0gZGVmYXVsdEZvcm1hdHM9eyBmb3JtYXRzIH0gPiBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiIC8+XG4gICAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgICAgICA8dGl0bGU+eyBgJHt0aXRsZX0gLSBOZXh0IFN0b3JlZnJvbnRgIH08L3RpdGxlPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgPE5hdiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgeyBjaGlsZHJlbiB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICBib2R5IHtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICoge1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUgdGJvZHkgdHI6bGFzdC1jaGlsZCB0ZCB7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2U5ZWNlZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSB0ZCwgdGFibGUgdGgge1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAxZW07XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlLnN0cmlwZSB0ZCwgdGFibGUuc3RyaXBlIHRoIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDJlbTtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAyZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUgdHIgdGgge1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwLCB0YWJsZSB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICAgICAgICAgICAgY29sb3I6ICM1ODYwNjk7XG4gICAgICAgICAgfVxuICAgIFxuICAgICAgICAgIGEge1xuICAgICAgICAgICAgY29sb3I6ICM3Nzc3Nzc7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYTpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogIzIyMjIyMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidXR0b24sIGEuYnV0dG9uIHtcbiAgICAgICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgICAgcGFkZGluZzogMS4zZW0gMmVtO1xuICAgICAgICAgICAgbWFyZ2luOiAwLjVlbSAwO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzM0MzQzNjtcbiAgICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMzNDM0MzY7XG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjFzO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMXM7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnV0dG9uLndoaXRlLCBhLmJ1dHRvbi53aGl0ZSB7XG4gICAgICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidXR0b246aG92ZXIsIGEuYnV0dG9uOmhvdmVyIHtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlucHV0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgICBwYWRkaW5nOiAxLjJlbSAwLjllbTtcbiAgICAgICAgICAgIG1hcmdpbjogMC41ZW0gMC41ZW0gMC41ZW0gMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmMmYyZjI7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjJmMmYyO1xuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4xcztcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjFzO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGgxLCBoMiwgaDMge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFwiVGltZXMgTmV3IFJvbWFuXCIsIEdlb3JnaWEsIFNlcmlmO1xuICAgICAgICAgICAgcGFkZGluZzogMCAyMHB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMi41ZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaDQsIGg1LCBoNiB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5wdXNoLWxlZnQge1xuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLnB1c2gtcmlnaHQge1xuICAgICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jb2wge1xuICAgICAgICAgICAgZmxvYXQ6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jb2wtNiB7XG4gICAgICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jb2wtMyB7XG4gICAgICAgICAgICB3aWR0aDogMjUlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5oaWRkZW4ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY29udGFpbmVyIC5jb250ZW50IHtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgcGFkZGluZzogNzBweCAwIDA7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmVycm9yIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAxMjBweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9JbnRsUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZSA9PiBzdGF0ZSkoUGFnZSkiXX0= */\n/*@ sourceURL=components/Layout.js */'
  })));
}

exports.default = (0, _reactRedux.connect)(function (state) {
  return state;
})(Page);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTGF5b3V0LmpzIl0sIm5hbWVzIjpbImNvbm5lY3QiLCJJbnRsUHJvdmlkZXIiLCJmb3JtYXRzIiwiSGVhZCIsIk5hdiIsIlBhZ2UiLCJjaGlsZHJlbiIsInRpdGxlIiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUzs7QUFDVCxBQUFTOztBQUNULEFBQU8sQUFBYTs7OztBQUNwQixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFTOzs7Ozs7Ozs7QUFFaEIsU0FBQSxBQUFTLFdBQTJCO01BQW5CLEFBQW1CLGdCQUFuQixBQUFtQjtNQUFULEFBQVMsYUFBVCxBQUFTLEFBQ2xDOzt5QkFDRSxBQUFDLHlDQUFhLFFBQWQsQUFBcUIsTUFBckIsQUFBMEIsQUFBVSw0QkFBcEMsQUFBOEMsQUFBaUI7Z0JBQS9EO2tCQUFBLEFBQ0U7QUFERjtHQUFBLGtCQUNFLGNBQUE7d0NBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQzs7Z0JBQUQ7a0JBQUEsQUFDRTtBQURGO0FBQUEsNkNBQ1EsTUFBTixBQUFXLFlBQVcsU0FBdEIsQUFBOEIsa0RBQTlCOztnQkFBQTtrQkFERixBQUNFLEFBQ0E7QUFEQTs4Q0FDTSxTQUFOLEFBQWMsb0JBQWQ7O2dCQUFBO2tCQUZGLEFBRUUsQUFDQTtBQURBO3NCQUNBLGNBQUE7ZUFBQTs7Z0JBQUE7a0JBQUEsQUFBWTtBQUFaO0FBQUEsS0FBQSxRQUpKLEFBQ0UsQUFHRSxBQUVBLHdDQUFBLEFBQUM7O2dCQUFEO2tCQU5KLEFBTUksQUFDQTtBQURBO0FBQUEsc0JBQ0EsY0FBQTt3Q0FBQSxBQUFlOztnQkFBZjtrQkFBQSxBQUNJO0FBREo7QUFBQSxLQVBKLEFBT0k7YUFQSjtTQUZKLEFBQ0UsQUFDRSxBQWdLTDtBQWhLSztBQWtLTjs7MkNBQXVCLGlCQUFBO1NBQUEsQUFBUztBQUFqQixDQUFBLEVBQWYsQUFBZSxBQUF3QiIsImZpbGUiOiJMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dvbnphbG9iZW5pdGV6L0RvY3VtZW50cy9zdG9yZWZyb250L25leHQtc3RvcmVmcm9udCJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/Layout.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/Layout.js"); } } })();

/***/ }),
/* 477 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__(479), src$en$$ = __webpack_require__(484);

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];

//# sourceMappingURL=main.js.map

/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__(428), src$es5$$ = __webpack_require__(480), src$compiler$$ = __webpack_require__(481), intl$messageformat$parser$$ = __webpack_require__(482);
exports["default"] = MessageFormat;

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    src$es5$$.defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error(
            'The intl string context variable \'' + e.variableId + '\'' +
            ' was not provided to the string \'' + message + '\''
          );
        } else {
          throw e;
        }
      }
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(MessageFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
src$es5$$.defineProperty(MessageFormat, '__parse', {value: intl$messageformat$parser$$["default"].parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value, err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && src$utils$$.hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!src$utils$$.hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

        if (formats && src$utils$$.hop.call(formats, type)) {
            src$utils$$.extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

//# sourceMappingURL=core.js.map

/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__(428);

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (src$utils$$.hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate;

//# sourceMappingURL=es5.js.map

/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports["default"] = Compiler;

function Compiler(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};

//# sourceMappingURL=compiler.js.map

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__(483)['default'];
exports['default'] = exports;


/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements
                };
            },
        peg$c2 = peg$FAILED,
        peg$c3 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c4 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText
                };
            },
        peg$c5 = /^[^ \t\n\r,.+={}#]/,
        peg$c6 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c7 = "{",
        peg$c8 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c9 = null,
        peg$c10 = ",",
        peg$c11 = { type: "literal", value: ",", description: "\",\"" },
        peg$c12 = "}",
        peg$c13 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c14 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2]
                };
            },
        peg$c15 = "number",
        peg$c16 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c17 = "date",
        peg$c18 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c19 = "time",
        peg$c20 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c21 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2]
                };
            },
        peg$c22 = "plural",
        peg$c23 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                };
            },
        peg$c25 = "selectordinal",
        peg$c26 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c27 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                }
            },
        peg$c28 = "select",
        peg$c29 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c30 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options
                };
            },
        peg$c31 = "=",
        peg$c32 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c33 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern
                };
            },
        peg$c34 = "offset:",
        peg$c35 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c36 = function(number) {
                return number;
            },
        peg$c37 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options
                };
            },
        peg$c38 = { type: "other", description: "whitespace" },
        peg$c39 = /^[ \t\n\r]/,
        peg$c40 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c41 = { type: "other", description: "optionalWhitespace" },
        peg$c42 = /^[0-9]/,
        peg$c43 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c44 = /^[0-9a-f]/i,
        peg$c45 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c46 = "0",
        peg$c47 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c48 = /^[1-9]/,
        peg$c49 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c50 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c51 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c52 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
        peg$c53 = "\\\\",
        peg$c54 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c55 = function() { return '\\'; },
        peg$c56 = "\\#",
        peg$c57 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c58 = function() { return '\\#'; },
        peg$c59 = "\\{",
        peg$c60 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c61 = function() { return '\u007B'; },
        peg$c62 = "\\}",
        peg$c63 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c64 = function() { return '\u007D'; },
        peg$c65 = "\\u",
        peg$c66 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c67 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c68 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c2;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c3(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c4(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c5.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c5.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
          }
        } else {
          s1 = peg$c2;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c7;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c10;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c2;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c2;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c2;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c9;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c12;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c13); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c14(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c17) {
          s1 = peg$c17;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c20); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c10;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c9;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$c2;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c30(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c31;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c12;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c13); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c33(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c34) {
        s1 = peg$c34;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c36(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$c2;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c39.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c39.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
        }
      } else {
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c46;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c48.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c51.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c53) {
          s1 = peg$c53;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c56) {
            s1 = peg$c56;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c57); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c58();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c59) {
              s1 = peg$c59;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c60); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c61();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c62) {
                s1 = peg$c62;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c63); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c64();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c65) {
                  s1 = peg$c65;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c66); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$c2;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$c2;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$c2;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c2;
                  }
                  if (s3 !== peg$FAILED) {
                    s3 = input.substring(s2, peg$currPos);
                  }
                  s2 = s3;
                  if (s2 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c68(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

//# sourceMappingURL=parser.js.map

/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE

exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

//# sourceMappingURL=en.js.map

/***/ }),
/* 485 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */



var IntlRelativeFormat = __webpack_require__(487)['default'];

// Add all locale data to `IntlRelativeFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
__webpack_require__(492);

// Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlRelativeFormat;
exports['default'] = exports;


/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__(488), src$en$$ = __webpack_require__(491);

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];

//# sourceMappingURL=main.js.map

/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var intl$messageformat$$ = __webpack_require__(427), src$diff$$ = __webpack_require__(489), src$es5$$ = __webpack_require__(490);
exports["default"] = RelativeFormat;

// -----------------------------------------------------------------------------

var FIELDS = [
    'second', 'second-short',
    'minute', 'minute-short',
    'hour', 'hour-short',
    'day', 'day-short',
    'month', 'month-short',
    'year', 'year-short'
];
var STYLES = ['best fit', 'numeric'];

// -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
    options = options || {};

    // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.
    if (src$es5$$.isArray(locales)) {
        locales = locales.concat();
    }

    src$es5$$.defineProperty(this, '_locale', {value: this._resolveLocale(locales)});
    src$es5$$.defineProperty(this, '_options', {value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
    }});

    src$es5$$.defineProperty(this, '_locales', {value: locales});
    src$es5$$.defineProperty(this, '_fields', {value: this._findFields(this._locale)});
    src$es5$$.defineProperty(this, '_messages', {value: src$es5$$.objCreate(null)});

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var relativeFormat = this;
    this.format = function format(date, options) {
        return relativeFormat._format(date, options);
    };
}

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(RelativeFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(RelativeFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlRelativeFormat is missing a ' +
            '`locale` property value'
        );
    }

    RelativeFormat.__localeData__[data.locale.toLowerCase()] = data;

    // Add data to IntlMessageFormat.
    intl$messageformat$$["default"].__addLocaleData(data);
}});

// Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.
src$es5$$.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

// Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.
src$es5$$.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,

    value: {
        second: 45, 'second-short': 45,  // seconds to minute
        minute: 45, 'minute-short': 45, // minutes to hour
        hour  : 22, 'hour-short': 22, // hours to day
        day   : 26, 'day-short': 26, // days to month
        month : 11, 'month-short': 11 // months to year
    }
});

RelativeFormat.prototype.resolvedOptions = function () {
    return {
        locale: this._locale,
        style : this._options.style,
        units : this._options.units
    };
};

RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales        = this._locales;
    var resolvedLocale = this._locale;

    var field        = this._fields[units];
    var relativeTime = field.relativeTime;
    var future       = '';
    var past         = '';
    var i;

    for (i in relativeTime.future) {
        if (relativeTime.future.hasOwnProperty(i)) {
            future += ' ' + i + ' {' +
                relativeTime.future[i].replace('{0}', '#') + '}';
        }
    }

    for (i in relativeTime.past) {
        if (relativeTime.past.hasOwnProperty(i)) {
            past += ' ' + i + ' {' +
                relativeTime.past[i].replace('{0}', '#') + '}';
        }
    }

    var message = '{when, select, future {{0, plural, ' + future + '}}' +
                                 'past {{0, plural, ' + past + '}}}';

    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.
    return new intl$messageformat$$["default"](message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages;

    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[units]) {
        messages[units] = this._compileMessage(units);
    }

    return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];

    if (field.relative) {
        return field.relative[diff];
    }
};

RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.
    while (data) {
        if (data.fields) {
            return data.fields;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlRelativeFormat is missing `fields` for :' +
        locale
    );
};

RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : src$es5$$.dateNow();

    if (date === undefined) {
        date = now;
    }

    // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.
    if (!isFinite(now)) {
        throw new RangeError(
            'The `now` option provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    if (!isFinite(date)) {
        throw new RangeError(
            'The date value provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    var diffReport  = src$diff$$["default"](now, date);
    var units       = this._options.units || this._selectUnits(diffReport);
    var diffInUnits = diffReport[units];

    if (this._options.style !== 'numeric') {
        var relativeUnits = this._getRelativeUnits(diffInUnits, units);
        if (relativeUnits) {
            return relativeUnits;
        }
    }

    return this._getMessage(units).format({
        '0' : Math.abs(diffInUnits),
        when: diffInUnits < 0 ? 'past' : 'future'
    });
};

RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || src$es5$$.arrIndexOf.call(FIELDS, units) >= 0) {
        return true;
    }

    if (typeof units === 'string') {
        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
        if (suggestion && src$es5$$.arrIndexOf.call(FIELDS, suggestion) >= 0) {
            throw new Error(
                '"' + units + '" is not a valid IntlRelativeFormat `units` ' +
                'value, did you mean: ' + suggestion
            );
        }
    }

    throw new Error(
        '"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' +
        'must be one of: "' + FIELDS.join('", "') + '"'
    );
};

RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(RelativeFormat.defaultLocale);

    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlRelativeFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
        return STYLES[0];
    }

    if (src$es5$$.arrIndexOf.call(STYLES, style) >= 0) {
        return style;
    }

    throw new Error(
        '"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' +
        'must be one of: "' + STYLES.join('", "') + '"'
    );
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function(field) {
        return field.indexOf('-short') < 1;
    });

    for (i = 0, l = fields.length; i < l; i += 1) {
        units = fields[i];

        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
            break;
        }
    }

    return units;
};

//# sourceMappingURL=core.js.map

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */



var round = Math.round;

function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
}

exports["default"] = function (from, to) {
    // Convert to ms timestamps.
    from = +from;
    to   = +to;

    var millisecond = round(to - from),
        second      = round(millisecond / 1000),
        minute      = round(second / 60),
        hour        = round(minute / 60),
        day         = round(hour / 24),
        week        = round(day / 7);

    var rawYears = daysToYears(day),
        month    = round(rawYears * 12),
        year     = round(rawYears);

    return {
        millisecond    : millisecond,
        second         : second,
        'second-short' : second,
        minute         : minute,
        'minute-short' : minute,
        hour           : hour,
        'hour-short'   : hour,
        day            : day,
        'day-short'    : day,
        week           : week,
        'week-short'   : week,
        month          : month,
        'month-short'  : month,
        year           : year,
        'year-short'   : year
    };
};

//# sourceMappingURL=diff.js.map

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License



var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;
    if (!arr.length) {
        return -1;
    }

    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
        if (arr[i] === search) {
            return i;
        }
    }

    return -1;
};

var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
};

var dateNow = Date.now || function () {
    return new Date().getTime();
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate, exports.arrIndexOf = arrIndexOf, exports.isArray = isArray, exports.dateNow = dateNow;

//# sourceMappingURL=es5.js.map

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE

exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"},"fields":{"year":{"displayName":"year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"year-short":{"displayName":"yr.","relative":{"0":"this yr.","1":"next yr.","-1":"last yr."},"relativeTime":{"future":{"one":"in {0} yr.","other":"in {0} yr."},"past":{"one":"{0} yr. ago","other":"{0} yr. ago"}}},"month":{"displayName":"month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"month-short":{"displayName":"mo.","relative":{"0":"this mo.","1":"next mo.","-1":"last mo."},"relativeTime":{"future":{"one":"in {0} mo.","other":"in {0} mo."},"past":{"one":"{0} mo. ago","other":"{0} mo. ago"}}},"day":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"day-short":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"hour","relative":{"0":"this hour"},"relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"hour-short":{"displayName":"hr.","relative":{"0":"this hour"},"relativeTime":{"future":{"one":"in {0} hr.","other":"in {0} hr."},"past":{"one":"{0} hr. ago","other":"{0} hr. ago"}}},"minute":{"displayName":"minute","relative":{"0":"this minute"},"relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"minute-short":{"displayName":"min.","relative":{"0":"this minute"},"relativeTime":{"future":{"one":"in {0} min.","other":"in {0} min."},"past":{"one":"{0} min. ago","other":"{0} min. ago"}}},"second":{"displayName":"second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}},"second-short":{"displayName":"sec.","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} sec.","other":"in {0} sec."},"past":{"one":"{0} sec. ago","other":"{0} sec. ago"}}}}};

//# sourceMappingURL=en.js.map

/***/ }),
/* 492 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 493 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__(494)['default'];
exports['default'] = exports;


/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var src$es5$$ = __webpack_require__(495);
exports["default"] = createFormatCache;

// -----------------------------------------------------------------------------

function createFormatCache(FormatConstructor) {
    var cache = src$es5$$.objCreate(null);

    return function () {
        var args    = Array.prototype.slice.call(arguments);
        var cacheId = getCacheId(args);
        var format  = cacheId && cache[cacheId];

        if (!format) {
            format = new (src$es5$$.bind.apply(FormatConstructor, [null].concat(args)))();

            if (cacheId) {
                cache[cacheId] = format;
            }
        }

        return format;
    };
}

// -- Utilities ----------------------------------------------------------------

function getCacheId(inputs) {
    // When JSON is not available in the runtime, we will not create a cache id.
    if (typeof JSON === 'undefined') { return; }

    var cacheId = [];

    var i, len, input;

    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];

        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        } else {
            cacheId.push(input);
        }
    }

    return JSON.stringify(cacheId);
}

function orderedProps(obj) {
    var props = [],
        keys  = [];

    var key, i, len, prop;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    var orderedKeys = keys.sort();

    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key  = orderedKeys[i];
        prop = {};

        prop[key] = obj[key];
        props[i]  = prop;
    }

    return props;
}

//# sourceMappingURL=memoizer.js.map

/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Function.prototype.bind implementation from Mozilla Developer Network:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

var bind = Function.prototype.bind || function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
};

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

exports.bind = bind, exports.defineProperty = defineProperty, exports.objCreate = objCreate;

//# sourceMappingURL=es5.js.map

/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  number: {
    USD: {
      style: 'currency',
      currency: 'USD'
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy9mb3JtYXRzLmpzIl0sIm5hbWVzIjpbIm51bWJlciIsIlVTRCIsInN0eWxlIiwiY3VycmVuY3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2FBRVMsQUFDSSxBQUNQO2dCQUpOLEFBQWUsQUFDTCxBQUNELEFBRU87QUFGUCxBQUNIO0FBRkksQUFDTjtBQUZXLEFBQ2IiLCJmaWxlIjoiZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ29uemFsb2Jlbml0ZXovRG9jdW1lbnRzL3N0b3JlZnJvbnQvbmV4dC1zdG9yZWZyb250In0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/constants/formats.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/constants/formats.js"); } } })();

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _style = __webpack_require__(396);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(498);

var _link = __webpack_require__(401);

var _link2 = _interopRequireDefault(_link);

var _CartMenu = __webpack_require__(505);

var _CartMenu2 = _interopRequireDefault(_CartMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/components/Nav.js';

exports.default = function (_ref) {
	var store = _ref.store;

	return _react2.default.createElement('div', {
		className: 'jsx-3560967205' + ' ' + 'nav',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 7
		}
	}, _react2.default.createElement('h1', {
		className: 'jsx-3560967205' + ' ' + 'col col-3',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 8
		}
	}, _react2.default.createElement(_link2.default, { href: '/', __source: {
			fileName: _jsxFileName,
			lineNumber: 9
		}
	}, _react2.default.createElement('a', {
		className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 10
		}
	}, _react2.default.createElement('img', { src: '/static/logo.png', className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 10
		}
	})))), _react2.default.createElement('nav', {
		className: 'jsx-3560967205' + ' ' + 'col col-6',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 13
		}
	}, _react2.default.createElement('ul', {
		className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 14
		}
	}, _react2.default.createElement('li', {
		className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: '/', __source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, _react2.default.createElement('a', { href: '/', className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, 'Home'))), _react2.default.createElement('li', {
		className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 16
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: '/cart', __source: {
			fileName: _jsxFileName,
			lineNumber: 16
		}
	}, _react2.default.createElement('a', { href: '/cart', className: 'jsx-3560967205',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 16
		}
	}, 'Cart'))))), _react2.default.createElement('div', {
		className: 'jsx-3560967205' + ' ' + 'col col-3',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 19
		}
	}, _react2.default.createElement(_CartMenu2.default, {
		__source: {
			fileName: _jsxFileName,
			lineNumber: 20
		}
	})), _react2.default.createElement(_style2.default, {
		styleId: '3560967205',
		css: '.nav.jsx-3560967205{position:fixed;z-index:1000;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;background:#ffffff;display:block;width:100%;border-bottom:2px solid #f2f2f2;text-transform:uppercase;font-weight:bold;font-size:0.8em}.nav.jsx-3560967205 h1.jsx-3560967205{display:inline-block}.nav.jsx-3560967205 nav.jsx-3560967205{display:inline-block;display:inline-block;vertical-align:middle;float:none;text-align:center}.nav.jsx-3560967205 nav.jsx-3560967205 ul.jsx-3560967205{padding-left:0;margin-bottom:0;list-style:none;display:inline-block}.nav.jsx-3560967205 nav.jsx-3560967205 ul.jsx-3560967205 li.jsx-3560967205{float:left;margin-right:30px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTmF2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCZSxBQUdzQixBQWFNLEFBSUEsQUFRTixBQU9KLFdBQ08sSUFoQ0wsQUF5QkcsTUFabEIsQUFJdUIsT0FoQnNDLENBZ0M3RCxFQVBrQixXQVJNLEtBU0QsaUJBUlYsSUFTYixPQVJvQixTQWxCSSxTQW1CeEIsVUFsQmdCLGNBQ0gsV0FDcUIsZ0NBQ1AseUJBQ1IsaUJBQ0QsZ0JBQ2xCIiwiZmlsZSI6ImNvbXBvbmVudHMvTmF2LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCBDYXJ0TWVudSBmcm9tICcuL0NhcnRNZW51J1xuXG5leHBvcnQgZGVmYXVsdCAoeyBzdG9yZSB9KSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJuYXZcIj5cblx0XHRcdDxoMSBjbGFzc05hbWU9XCJjb2wgY29sLTNcIj5cblx0XHRcdCAgPExpbmsgaHJlZj1cIi9cIj5cblx0XHRcdCAgICA8YT48aW1nIHNyYz1cIi9zdGF0aWMvbG9nby5wbmdcIi8+PC9hPlxuXHRcdFx0ICA8L0xpbms+XG5cdFx0XHQ8L2gxPlxuXHRcdFx0PG5hdiBjbGFzc05hbWU9XCJjb2wgY29sLTZcIj5cblx0XHRcdCAgPHVsPlxuXHRcdFx0ICAgIDxsaT48TGluayBwcmVmZXRjaCBocmVmPVwiL1wiPjxhIGhyZWY9XCIvXCI+SG9tZTwvYT48L0xpbms+PC9saT5cblx0XHRcdCAgICA8bGk+PExpbmsgcHJlZmV0Y2ggaHJlZj1cIi9jYXJ0XCI+PGEgaHJlZj1cIi9jYXJ0XCI+Q2FydDwvYT48L0xpbms+PC9saT5cblx0XHRcdCAgPC91bD5cblx0XHRcdDwvbmF2PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wgY29sLTNcIj5cblx0XHRcdCAgPENhcnRNZW51IC8+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PHN0eWxlIGpzeD57YFxuXHRcdFx0XHQubmF2IHtcblx0XHRcdFx0ICBwb3NpdGlvbjogZml4ZWQ7XG5cdFx0XHRcdCAgei1pbmRleDogMTAwMDtcblx0XHRcdFx0ICBmb250LWZhbWlseTogQXJpYWwsIFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuXHRcdFx0ICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcblx0XHRcdFx0ICBkaXNwbGF5OiBibG9jaztcblx0XHRcdFx0ICB3aWR0aDogMTAwJTtcblx0XHRcdFx0ICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2YyZjJmMjtcblx0XHRcdFx0ICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuXHRcdFx0XHQgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRcdFx0XHQgIGZvbnQtc2l6ZTogMC44ZW07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQubmF2IGgxIHtcblx0XHRcdFx0ICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQubmF2IG5hdiB7XG5cdFx0XHRcdCAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0XHQgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdFx0ICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuXHRcdFx0XHQgIGZsb2F0OiBub25lO1xuXHRcdFx0XHQgIHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC5uYXYgbmF2IHVsIHtcblx0XHRcdFx0ICBwYWRkaW5nLWxlZnQ6IDA7XG5cdFx0XHRcdCAgbWFyZ2luLWJvdHRvbTogMDtcblx0XHRcdFx0ICBsaXN0LXN0eWxlOiBub25lO1xuXHRcdFx0XHQgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC5uYXYgbmF2IHVsIGxpIHtcblx0XHRcdFx0ICBmbG9hdDogbGVmdDtcblx0XHRcdFx0ICBtYXJnaW4tcmlnaHQ6IDMwcHg7XG5cdFx0XHRcdH1cblx0ICAgICAgXHRgfTwvc3R5bGU+XG5cdFx0PC9kaXY+XG5cdClcbn1cbiJdfQ== */\n/*@ sourceURL=components/Nav.js */'
	}));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTmF2LmpzIl0sIm5hbWVzIjpbImluamVjdCIsIm9ic2VydmVyIiwiTGluayIsIkNhcnRNZW51Iiwic3RvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUyxBQUFROztBQUNqQixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFjLEFBRXJCOzs7Ozs7OztrQkFBZSxnQkFBZTtLQUFaLEFBQVksYUFBWixBQUFZLEFBQzdCOzt3QkFDQyxjQUFBO3NDQUFBLEFBQWU7O2FBQWY7ZUFBQSxBQUNDO0FBREQ7QUFBQSxFQUFBLGtCQUNDLGNBQUE7c0NBQUEsQUFBYzs7YUFBZDtlQUFBLEFBQ0U7QUFERjtBQUFBLG9CQUNFLEFBQUMsZ0NBQUssTUFBTixBQUFXO2FBQVg7ZUFBQSxBQUNFO0FBREY7b0JBQ0UsY0FBQTthQUFBOzthQUFBO2VBQUEsQUFBRztBQUFIO0FBQUEsMkNBQVEsS0FBTCxBQUFTLCtCQUFUOzthQUFBO2VBSFIsQUFDQyxBQUNFLEFBQ0UsQUFBRyxBQUdQO0FBSE87d0JBR1AsY0FBQTtzQ0FBQSxBQUFlOzthQUFmO2VBQUEsQUFDRTtBQURGO0FBQUEsb0JBQ0UsY0FBQTthQUFBOzthQUFBO2VBQUEsQUFDRTtBQURGO0FBQUEsb0JBQ0UsY0FBQTthQUFBOzthQUFBO2VBQUEsQUFBSTtBQUFKO0FBQUEsb0JBQUksQUFBQyxnQ0FBSyxVQUFOLE1BQWUsTUFBZixBQUFvQjthQUFwQjtlQUFBLEFBQXdCO0FBQXhCO29CQUF3QixjQUFBLE9BQUcsTUFBSCxBQUFRLGdCQUFSOzthQUFBO2VBQUE7QUFBQTtJQUQ5QixBQUNFLEFBQUksQUFBd0IsQUFDNUIsMkJBQUEsY0FBQTthQUFBOzthQUFBO2VBQUEsQUFBSTtBQUFKO0FBQUEsb0JBQUksQUFBQyxnQ0FBSyxVQUFOLE1BQWUsTUFBZixBQUFvQjthQUFwQjtlQUFBLEFBQTRCO0FBQTVCO29CQUE0QixjQUFBLE9BQUcsTUFBSCxBQUFRLG9CQUFSOzthQUFBO2VBQUE7QUFBQTtJQVRyQyxBQU1DLEFBQ0UsQUFFRSxBQUFJLEFBQTRCLEFBR3BDLDZCQUFBLGNBQUE7c0NBQUEsQUFBZTs7YUFBZjtlQUFBLEFBQ0U7QUFERjtBQUFBLG9CQUNFLEFBQUM7O2FBQUQ7ZUFiSCxBQVlDLEFBQ0U7QUFBQTtBQUFBO1dBYkg7T0FERCxBQUNDLEFBd0REO0FBeERDO0FBRkYiLCJmaWxlIjoiTmF2LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/Nav.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/Nav.js"); } } })();

/***/ }),
/* 498 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return propTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onError", function() { return onError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observer", function() { return observer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observer", function() { return Observer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderReporter", function() { return renderReporter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentByNodeRegistery", function() { return componentByNodeRegistery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackComponents", function() { return trackComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStaticRendering", function() { return useStaticRendering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inject", function() { return inject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mobx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);




// These functions can be stubbed out in specific environments
var unstable_batchedUpdates$1 = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var EventEmitter = function () {
    function EventEmitter() {
        classCallCheck(this, EventEmitter);
        this.listeners = [];
    }

    createClass(EventEmitter, [{
        key: "on",
        value: function on(cb) {
            var _this = this;

            this.listeners.push(cb);
            return function () {
                var index = _this.listeners.indexOf(cb);
                if (index !== -1) _this.listeners.splice(index, 1);
            };
        }
    }, {
        key: "emit",
        value: function emit(data) {
            this.listeners.forEach(function (fn) {
                return fn(data);
            });
        }
    }]);
    return EventEmitter;
}();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty$1 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

var hoistNonReactStatics = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty$1(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};

// Copied from React.PropTypes
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
        for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
            rest[_key - 6] = arguments[_key];
        }

        return Object(__WEBPACK_IMPORTED_MODULE_0_mobx__["untracked"])(function () {
            componentName = componentName || "<<anonymous>>";
            propFullName = propFullName || propName;
            if (props[propName] == null) {
                if (isRequired) {
                    var actual = props[propName] === null ? "null" : "undefined";
                    return new Error("The " + location + " `" + propFullName + "` is marked as required " + "in `" + componentName + "`, but its value is `" + actual + "`.");
                }
                return null;
            } else {
                return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
            }
        });
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
}

// Copied from React.PropTypes
function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === "symbol") {
        return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue["@@toStringTag"] === "Symbol") {
        return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === "function" && propValue instanceof Symbol) {
        return true;
    }

    return false;
}

// Copied from React.PropTypes
function getPropType(propValue) {
    var propType = typeof propValue === "undefined" ? "undefined" : _typeof(propValue);
    if (Array.isArray(propValue)) {
        return "array";
    }
    if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return "object";
    }
    if (isSymbol(propType, propValue)) {
        return "symbol";
    }
    return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// Copied from React.PropTypes
function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === "object") {
        if (propValue instanceof Date) {
            return "date";
        } else if (propValue instanceof RegExp) {
            return "regexp";
        }
    }
    return propType;
}

function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
    return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
        return Object(__WEBPACK_IMPORTED_MODULE_0_mobx__["untracked"])(function () {
            if (allowNativeType) {
                if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
            }
            var mobxChecker = void 0;
            switch (mobxType) {
                case "Array":
                    mobxChecker = __WEBPACK_IMPORTED_MODULE_0_mobx__["isObservableArray"];
                    break;
                case "Object":
                    mobxChecker = __WEBPACK_IMPORTED_MODULE_0_mobx__["isObservableObject"];
                    break;
                case "Map":
                    mobxChecker = __WEBPACK_IMPORTED_MODULE_0_mobx__["isObservableMap"];
                    break;
                default:
                    throw new Error("Unexpected mobxType: " + mobxType);
            }
            var propValue = props[propName];
            if (!mobxChecker(propValue)) {
                var preciseType = getPreciseType(propValue);
                var nativeTypeExpectationMessage = allowNativeType ? " or javascript `" + mobxType.toLowerCase() + "`" : "";
                return new Error("Invalid prop `" + propFullName + "` of type `" + preciseType + "` supplied to" + " `" + componentName + "`, expected `mobx.Observable" + mobxType + "`" + nativeTypeExpectationMessage + ".");
            }
            return null;
        });
    });
}

function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
    return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
        for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
            rest[_key2 - 5] = arguments[_key2];
        }

        return Object(__WEBPACK_IMPORTED_MODULE_0_mobx__["untracked"])(function () {
            if (typeof typeChecker !== "function") {
                return new Error("Property `" + propFullName + "` of component `" + componentName + "` has " + "invalid PropType notation.");
            }
            var error = createObservableTypeCheckerCreator(allowNativeType, "Array")(props, propName, componentName);
            if (error instanceof Error) return error;
            var propValue = props[propName];
            for (var i = 0; i < propValue.length; i++) {
                error = typeChecker.apply(undefined, [propValue, i, componentName, location, propFullName + "[" + i + "]"].concat(rest));
                if (error instanceof Error) return error;
            }
            return null;
        });
    });
}

var observableArray = createObservableTypeCheckerCreator(false, "Array");
var observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
var observableMap = createObservableTypeCheckerCreator(false, "Map");
var observableObject = createObservableTypeCheckerCreator(false, "Object");
var arrayOrObservableArray = createObservableTypeCheckerCreator(true, "Array");
var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
var objectOrObservableObject = createObservableTypeCheckerCreator(true, "Object");



var propTypes = Object.freeze({
	observableArray: observableArray,
	observableArrayOf: observableArrayOf,
	observableMap: observableMap,
	observableObject: observableObject,
	arrayOrObservableArray: arrayOrObservableArray,
	arrayOrObservableArrayOf: arrayOrObservableArrayOf,
	objectOrObservableObject: objectOrObservableObject
});

function isStateless(component) {
    // `function() {}` has prototype, but `() => {}` doesn't
    // `() => {}` via Babel has prototype too.
    return !(component.prototype && component.prototype.render);
}

var injectorContextTypes = {
    mobxStores: objectOrObservableObject
};
Object.seal(injectorContextTypes);

var proxiedInjectorProps = {
    contextTypes: {
        get: function get$$1() {
            return injectorContextTypes;
        },
        set: function set$$1(_) {
            console.warn("Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`");
        },
        configurable: true,
        enumerable: false
    },
    isMobxInjector: {
        value: true,
        writable: true,
        configurable: true,
        enumerable: true
    }

    /**
     * Store Injection
     */
};function createStoreInjector(grabStoresFn, component, injectNames) {
    var _class, _temp2;

    var displayName = "inject-" + (component.displayName || component.name || component.constructor && component.constructor.name || "Unknown");
    if (injectNames) displayName += "-with-" + injectNames;

    var Injector = (_temp2 = _class = function (_Component) {
        inherits(Injector, _Component);

        function Injector() {
            var _ref;

            var _temp, _this, _ret;

            classCallCheck(this, Injector);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Injector.__proto__ || Object.getPrototypeOf(Injector)).call.apply(_ref, [this].concat(args))), _this), _this.storeRef = function (instance) {
                _this.wrappedInstance = instance;
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        createClass(Injector, [{
            key: "render",
            value: function render() {
                // Optimization: it might be more efficient to apply the mapper function *outside* the render method
                // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
                // See this test: 'using a custom injector is not too reactive' in inject.js
                var newProps = {};
                for (var key in this.props) {
                    if (this.props.hasOwnProperty(key)) {
                        newProps[key] = this.props[key];
                    }
                }var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};
                for (var _key2 in additionalProps) {
                    newProps[_key2] = additionalProps[_key2];
                }

                if (!isStateless(component)) {
                    newProps.ref = this.storeRef;
                }

                return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(component, newProps);
            }
        }]);
        return Injector;
    }(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]), _class.displayName = displayName, _temp2);

    // Static fields from component should be visible on the generated Injector

    hoistNonReactStatics(Injector, component);

    Injector.wrappedComponent = component;
    Object.defineProperties(Injector, proxiedInjectorProps);

    return Injector;
}

function grabStoresByName(storeNames) {
    return function (baseStores, nextProps) {
        storeNames.forEach(function (storeName) {
            if (storeName in nextProps // prefer props over stores
            ) return;
            if (!(storeName in baseStores)) throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
            nextProps[storeName] = baseStores[storeName];
        });
        return nextProps;
    };
}

/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */
function inject() /* fn(stores, nextProps) or ...storeNames */{
    var grabStoresFn = void 0;
    if (typeof arguments[0] === "function") {
        grabStoresFn = arguments[0];
        return function (componentClass) {
            var injected = createStoreInjector(grabStoresFn, componentClass);
            injected.isMobxInjector = false; // supress warning
            // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
            // see #111
            injected = observer(injected);
            injected.isMobxInjector = true; // restore warning
            return injected;
        };
    } else {
        var storeNames = [];
        for (var i = 0; i < arguments.length; i++) {
            storeNames[i] = arguments[i];
        }grabStoresFn = grabStoresByName(storeNames);
        return function (componentClass) {
            return createStoreInjector(grabStoresFn, componentClass, storeNames.join("-"));
        };
    }
}

/**
 * dev tool support
 */
var isDevtoolsEnabled = false;

var isUsingStaticRendering = false;

var warnedAboutObserverInjectDeprecation = false;

// WeakMap<Node, Object>;
var componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
var renderReporter = new EventEmitter();

function findDOMNode$2(component) {
    if (__WEBPACK_IMPORTED_MODULE_2_react_dom__["findDOMNode"]) {
        try {
            return Object(__WEBPACK_IMPORTED_MODULE_2_react_dom__["findDOMNode"])(component);
        } catch (e) {
            // findDOMNode will throw in react-test-renderer, see:
            // See https://github.com/mobxjs/mobx-react/issues/216
            // Is there a better heuristic?
            return null;
        }
    }
    return null;
}

function reportRendering(component) {
    var node = findDOMNode$2(component);
    if (node && componentByNodeRegistery) componentByNodeRegistery.set(node, component);

    renderReporter.emit({
        event: "render",
        renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
        totalTime: Date.now() - component.__$mobRenderStart,
        component: component,
        node: node
    });
}

function trackComponents() {
    if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
    if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
}

function useStaticRendering(useStaticRendering) {
    isUsingStaticRendering = useStaticRendering;
}

/**
 * Errors reporter
 */

var errorsReporter = new EventEmitter();

/**
 * Utilities
 */

function patch(target, funcName) {
    var runMixinFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var base = target[funcName];
    var mixinFunc = reactiveMixin[funcName];
    var f = !base ? mixinFunc : runMixinFirst === true ? function () {
        mixinFunc.apply(this, arguments);
        base.apply(this, arguments);
    } : function () {
        base.apply(this, arguments);
        mixinFunc.apply(this, arguments);
    };

    // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
    // ...but that breaks react-hot-loader, see #231...
    target[funcName] = f;
}

function isObjectShallowModified(prev, next) {
    if (null == prev || null == next || (typeof prev === "undefined" ? "undefined" : _typeof(prev)) !== "object" || (typeof next === "undefined" ? "undefined" : _typeof(next)) !== "object") {
        return prev !== next;
    }
    var keys = Object.keys(prev);
    if (keys.length !== Object.keys(next).length) {
        return true;
    }
    var key = void 0;
    for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
        if (next[key] !== prev[key]) {
            return true;
        }
    }
    return false;
}

/**
 * ReactiveMixin
 */
var reactiveMixin = {
    componentWillMount: function componentWillMount() {
        var _this = this;

        if (isUsingStaticRendering === true) return;
        // Generate friendly name for debugging
        var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
        var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;

        /**
         * If props are shallowly modified, react will render anyway,
         * so atom.reportChanged() should not result in yet another re-render
         */
        var skipRender = false;
        /**
         * forceUpdate will re-assign this.props. We don't want that to cause a loop,
         * so detect these changes
         */
        var isForcingUpdate = false;

        function makePropertyObservableReference(propName) {
            var valueHolder = this[propName];
            var atom = new __WEBPACK_IMPORTED_MODULE_0_mobx__["Atom"]("reactive " + propName);
            Object.defineProperty(this, propName, {
                configurable: true,
                enumerable: true,
                get: function get$$1() {
                    atom.reportObserved();
                    return valueHolder;
                },
                set: function set$$1(v) {
                    if (!isForcingUpdate && isObjectShallowModified(valueHolder, v)) {
                        valueHolder = v;
                        skipRender = true;
                        atom.reportChanged();
                        skipRender = false;
                    } else {
                        valueHolder = v;
                    }
                }
            });
        }

        // make this.props an observable reference, see #124
        makePropertyObservableReference.call(this, "props");
        // make state an observable reference
        makePropertyObservableReference.call(this, "state");

        // wire up reactive render
        var baseRender = this.render.bind(this);
        var reaction = null;
        var isRenderingPending = false;

        var initialRender = function initialRender() {
            reaction = new __WEBPACK_IMPORTED_MODULE_0_mobx__["Reaction"](initialName + "#" + rootNodeID + ".render()", function () {
                if (!isRenderingPending) {
                    // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
                    // This unidiomatic React usage but React will correctly warn about this so we continue as usual
                    // See #85 / Pull #44
                    isRenderingPending = true;
                    if (typeof _this.componentWillReact === "function") _this.componentWillReact(); // TODO: wrap in action?
                    if (_this.__$mobxIsUnmounted !== true) {
                        // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
                        // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
                        // However, people also claim this migth happen during unit tests..
                        var hasError = true;
                        try {
                            isForcingUpdate = true;
                            if (!skipRender) __WEBPACK_IMPORTED_MODULE_1_react__["Component"].prototype.forceUpdate.call(_this);
                            hasError = false;
                        } finally {
                            isForcingUpdate = false;
                            if (hasError) reaction.dispose();
                        }
                    }
                }
            });
            reaction.reactComponent = _this;
            reactiveRender.$mobx = reaction;
            _this.render = reactiveRender;
            return reactiveRender();
        };

        var reactiveRender = function reactiveRender() {
            isRenderingPending = false;
            var exception = undefined;
            var rendering = undefined;
            reaction.track(function () {
                if (isDevtoolsEnabled) {
                    _this.__$mobRenderStart = Date.now();
                }
                try {
                    rendering = __WEBPACK_IMPORTED_MODULE_0_mobx__["extras"].allowStateChanges(false, baseRender);
                } catch (e) {
                    exception = e;
                }
                if (isDevtoolsEnabled) {
                    _this.__$mobRenderEnd = Date.now();
                }
            });
            if (exception) {
                errorsReporter.emit(exception);
                throw exception;
            }
            return rendering;
        };

        this.render = initialRender;
    },

    componentWillUnmount: function componentWillUnmount() {
        if (isUsingStaticRendering === true) return;
        this.render.$mobx && this.render.$mobx.dispose();
        this.__$mobxIsUnmounted = true;
        if (isDevtoolsEnabled) {
            var node = findDOMNode$2(this);
            if (node && componentByNodeRegistery) {
                componentByNodeRegistery.delete(node);
            }
            renderReporter.emit({
                event: "destroy",
                component: this,
                node: node
            });
        }
    },

    componentDidMount: function componentDidMount() {
        if (isDevtoolsEnabled) {
            reportRendering(this);
        }
    },

    componentDidUpdate: function componentDidUpdate() {
        if (isDevtoolsEnabled) {
            reportRendering(this);
        }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        if (isUsingStaticRendering) {
            console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
        }
        // update on any state changes (as is the default)
        if (this.state !== nextState) {
            return true;
        }
        // update if props are shallowly not equal, inspired by PureRenderMixin
        // we could return just 'false' here, and avoid the `skipRender` checks etc
        // however, it is nicer if lifecycle events are triggered like usually,
        // so we return true here if props are shallowly modified.
        return isObjectShallowModified(this.props, nextProps);
    }

    /**
     * Observer function / decorator
     */
};function observer(arg1, arg2) {
    if (typeof arg1 === "string") {
        throw new Error("Store names should be provided as array");
    }
    if (Array.isArray(arg1)) {
        // component needs stores
        if (!warnedAboutObserverInjectDeprecation) {
            warnedAboutObserverInjectDeprecation = true;
            console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
        }
        if (!arg2) {
            // invoked as decorator
            return function (componentClass) {
                return observer(arg1, componentClass);
            };
        } else {
            return inject.apply(null, arg1)(observer(arg2));
        }
    }
    var componentClass = arg1;

    if (componentClass.isMobxInjector === true) {
        console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
    }

    // Stateless function component:
    // If it is function but doesn't seem to be a react class constructor,
    // wrap it to a react class automatically
    if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !__WEBPACK_IMPORTED_MODULE_1_react__["Component"].isPrototypeOf(componentClass)) {
        var _class, _temp;

        return observer((_temp = _class = function (_Component) {
            inherits(_class, _Component);

            function _class() {
                classCallCheck(this, _class);
                return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            createClass(_class, [{
                key: "render",
                value: function render() {
                    return componentClass.call(this, this.props, this.context);
                }
            }]);
            return _class;
        }(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]), _class.displayName = componentClass.displayName || componentClass.name, _class.contextTypes = componentClass.contextTypes, _class.propTypes = componentClass.propTypes, _class.defaultProps = componentClass.defaultProps, _temp));
    }

    if (!componentClass) {
        throw new Error("Please pass a valid component to 'observer'");
    }

    var target = componentClass.prototype || componentClass;
    mixinLifecycleEvents(target);
    componentClass.isMobXReactObserver = true;
    return componentClass;
}

function mixinLifecycleEvents(target) {
    patch(target, "componentWillMount", true);["componentDidMount", "componentWillUnmount", "componentDidUpdate"].forEach(function (funcName) {
        patch(target, funcName);
    });
    if (!target.shouldComponentUpdate) {
        target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
    }
}

// TODO: support injection somehow as well?
var Observer = observer(function (_ref) {
    var children = _ref.children;
    return children();
});

Observer.propTypes = {
    children: function children(propValue, key, componentName, location, propFullName) {
        if (typeof propValue[key] !== "function") return new Error("Invalid prop `" + propFullName + "` of type `" + _typeof(propValue[key]) + "` supplied to" + " `" + componentName + "`, expected `function`.");
    }
};

var _class;
var _temp;

var specialReactKeys = { children: true, key: true, ref: true };

var Provider = (_temp = _class = function (_Component) {
    inherits(Provider, _Component);

    function Provider() {
        classCallCheck(this, Provider);
        return possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
    }

    createClass(Provider, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_1_react__["Children"].only(this.props.children);
        }
    }, {
        key: "getChildContext",
        value: function getChildContext() {
            var stores = {};
            // inherit stores
            var baseStores = this.context.mobxStores;
            if (baseStores) for (var key in baseStores) {
                stores[key] = baseStores[key];
            }
            // add own stores
            for (var _key in this.props) {
                if (!specialReactKeys[_key] && _key !== "suppressChangedStoreWarning") stores[_key] = this.props[_key];
            }return {
                mobxStores: stores
            };
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            // Maybe this warning is too aggressive?
            if (Object.keys(nextProps).length !== Object.keys(this.props).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
            if (!nextProps.suppressChangedStoreWarning) for (var key in nextProps) {
                if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
            }
        }
    }]);
    return Provider;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]), _class.contextTypes = {
    mobxStores: objectOrObservableObject
}, _class.childContextTypes = {
    mobxStores: objectOrObservableObject.isRequired
}, _temp);

if (!__WEBPACK_IMPORTED_MODULE_1_react__["Component"]) throw new Error('mobx-react requires React to be available');
if (!__WEBPACK_IMPORTED_MODULE_0_mobx__["extras"]) throw new Error('mobx-react requires mobx to be available');

if (typeof __WEBPACK_IMPORTED_MODULE_2_react_dom__["unstable_batchedUpdates"] === "function") __WEBPACK_IMPORTED_MODULE_0_mobx__["extras"].setReactionScheduler(__WEBPACK_IMPORTED_MODULE_2_react_dom__["unstable_batchedUpdates"]);else if (typeof unstable_batchedUpdates$1 === "function") __WEBPACK_IMPORTED_MODULE_0_mobx__["extras"].setReactionScheduler(unstable_batchedUpdates$1);

var onError = function onError(fn) {
  return errorsReporter.on(fn);
};

/* DevTool support */
// See: https://github.com/andykog/mobx-devtools/blob/d8976c24b8cb727ed59f9a0bc905a009df79e221/src/backend/installGlobalHook.js

if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ? 'undefined' : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === 'object') {
  var mobx$1 = { spy: __WEBPACK_IMPORTED_MODULE_0_mobx__["spy"], extras: __WEBPACK_IMPORTED_MODULE_0_mobx__["extras"] };
  var mobxReact = { renderReporter: renderReporter, componentByNodeRegistery: componentByNodeRegistery, trackComponents: trackComponents };
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(mobxReact, mobx$1);
}




/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
registerGlobals();
exports.extras = {
    allowStateChanges: allowStateChanges,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getObserverTree: getObserverTree,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    resetGlobalState: resetGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    trackTransitions: trackTransitions,
    setReactionScheduler: setReactionScheduler
};
exports._ = {
    getAdministration: getAdministration,
    resetGlobalState: resetGlobalState
};
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx(module.exports);
}
var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = (args && args.length === 1) ? args[0] : (value.name || key || "<unnamed action>");
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, "It is not allowed to assign new values to @action fields");
}, false, true);
function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
}
exports.action = action;
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", "`runInAction` expects a function");
    invariant(fn.length === 0, "`runInAction` expects a function without arguments");
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
exports.runInAction = runInAction;
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
exports.isAction = isAction;
function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    }
    else if (typeof arg1 === "function") {
        name = arg1.name || ("Autorun@" + getNextId());
        view = arg1;
        scope = arg2;
    }
    assertUnwrapped(view, "autorun methods cannot have modifiers");
    invariant(typeof view === "function", "autorun expects a function");
    invariant(isAction(view) === false, "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.");
    if (scope)
        view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
exports.autorun = autorun;
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    }
    else if (typeof arg1 === "function") {
        name = ("When@" + getNextId());
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
exports.when = when;
function autorunUntil(predicate, effect, scope) {
    deprecated("`autorunUntil` is deprecated, please use `when`.");
    return when.apply(null, arguments);
}
exports.autorunUntil = autorunUntil;
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    }
    else if (typeof arg1 === "function") {
        name = arg1.name || ("AutorunAsync@" + getNextId());
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.");
    if (delay === void 0)
        delay = 1;
    if (scope)
        func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed)
                    r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() { func(r); }
    r.schedule();
    return r.getDisposer();
}
exports.autorunAsync = autorunAsync;
function reaction(arg1, arg2, arg3, arg4, arg5, arg6) {
    var name, expression, effect, fireImmediately, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        expression = arg2;
        effect = arg3;
        fireImmediately = arg4;
        delay = arg5;
        scope = arg6;
    }
    else {
        name = arg1.name || arg2.name || ("Reaction@" + getNextId());
        expression = arg1;
        effect = arg2;
        fireImmediately = arg3;
        delay = arg4;
        scope = arg5;
    }
    if (fireImmediately === void 0)
        fireImmediately = false;
    if (delay === void 0)
        delay = 0;
    var _a = getValueModeFromValue(expression, ValueMode.Reference), valueMode = _a[0], unwrappedExpression = _a[1];
    var compareStructural = valueMode === ValueMode.Structure;
    if (scope) {
        unwrappedExpression = unwrappedExpression.bind(scope);
        effect = action(name, effect.bind(scope));
    }
    var firstTime = true;
    var isScheduled = false;
    var nextValue = undefined;
    var r = new Reaction(name, function () {
        if (delay < 1) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var v = unwrappedExpression(r);
            changed = valueDidChange(compareStructural, nextValue, v);
            nextValue = v;
        });
        if (firstTime && fireImmediately)
            effect(nextValue, r);
        if (!firstTime && changed === true)
            effect(nextValue, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
exports.reaction = reaction;
var computedDecorator = createClassPropertyDecorator(function (target, name, _, decoratorArgs, originalDescriptor) {
    invariant(typeof originalDescriptor !== "undefined", "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.");
    var baseValue = originalDescriptor.get;
    var setter = originalDescriptor.set;
    invariant(typeof baseValue === "function", "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'");
    var compareStructural = false;
    if (decoratorArgs && decoratorArgs.length === 1 && decoratorArgs[0].asStructure === true)
        compareStructural = true;
    var adm = asObservableObject(target, undefined, ValueMode.Recursive);
    defineObservableProperty(adm, name, compareStructural ? asStructure(baseValue) : baseValue, false, setter);
}, function (name) {
    var observable = this.$mobx.values[name];
    if (observable === undefined)
        return undefined;
    return observable.get();
}, function (name, value) {
    this.$mobx.values[name].set(value);
}, false, true);
function computed(targetOrExpr, keyOrScopeOrSetter, baseDescriptor, options) {
    if ((typeof targetOrExpr === "function" || isModifierWrapper(targetOrExpr)) && arguments.length < 3) {
        if (typeof keyOrScopeOrSetter === "function")
            return computedExpr(targetOrExpr, keyOrScopeOrSetter, undefined);
        else
            return computedExpr(targetOrExpr, undefined, keyOrScopeOrSetter);
    }
    return computedDecorator.apply(null, arguments);
}
exports.computed = computed;
function computedExpr(expr, setter, scope) {
    var _a = getValueModeFromValue(expr, ValueMode.Recursive), mode = _a[0], value = _a[1];
    return new ComputedValue(value, scope, mode === ValueMode.Structure, value.name, setter);
}
function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length === 1, "createTransformer expects a function that accepts one argument");
    var objectCache = {};
    var resetId = globalState.resetId;
    var Transformer = (function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            _super.call(this, function () { return transformer(sourceObject); }, null, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined);
            this.sourceIdentifier = sourceIdentifier;
            this.sourceObject = sourceObject;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup)
                onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue));
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer)
            return reactiveTransformer.get();
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
exports.createTransformer = createTransformer;
function getMemoizationId(object) {
    if (object === null || typeof object !== "object")
        throw new Error("[mobx] transform expected some kind of object, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
function expr(expr, scope) {
    if (!isComputingDerivation())
        console.warn("[mobx.expr] 'expr' should only be used inside other reactive functions.");
    return computed(expr, scope).get();
}
exports.expr = expr;
function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    invariant(arguments.length >= 2, "extendObservable expected 2 or more arguments");
    invariant(typeof target === "object", "extendObservable expects an object as first argument");
    invariant(!(isObservableMap(target)), "extendObservable should not be used on maps, use map.merge instead");
    properties.forEach(function (propSet) {
        invariant(typeof propSet === "object", "all arguments of extendObservable should be objects");
        invariant(!isObservable(propSet), "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        extendObservableHelper(target, propSet, ValueMode.Recursive, null);
    });
    return target;
}
exports.extendObservable = extendObservable;
function extendObservableHelper(target, properties, mode, name) {
    var adm = asObservableObject(target, name, mode);
    for (var key in properties)
        if (hasOwnProperty(properties, key)) {
            if (target === properties && !isPropertyConfigurable(target, key))
                continue;
            var descriptor = Object.getOwnPropertyDescriptor(properties, key);
            setObservableObjectInstanceProperty(adm, key, descriptor);
        }
    return target;
}
function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}
function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
exports.intercept = intercept;
function interceptInterceptable(thing, handler) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        return getAdministration(observable(thing)).intercept(handler);
    }
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        extendObservable(thing, {
            property: thing[property]
        });
        return interceptProperty(thing, property, handler);
    }
    return getAdministration(thing, property).intercept(handler);
}
function isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
exports.isComputed = isComputed;
function isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value))
            throw new Error("[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}
exports.isObservable = isObservable;
var decoratorImpl = createClassPropertyDecorator(function (target, name, baseValue) {
    var prevA = allowStateChangesStart(true);
    if (typeof baseValue === "function")
        baseValue = asReference(baseValue);
    var adm = asObservableObject(target, undefined, ValueMode.Recursive);
    defineObservableProperty(adm, name, baseValue, true, undefined);
    allowStateChangesEnd(prevA);
}, function (name) {
    var observable = this.$mobx.values[name];
    if (observable === undefined)
        return undefined;
    return observable.get();
}, function (name, value) {
    setPropertyValue(this, name, value);
}, true, false);
function observableDecorator(target, key, baseDescriptor) {
    invariant(arguments.length >= 2 && arguments.length <= 3, "Illegal decorator config", key);
    assertPropertyConfigurable(target, key);
    invariant(!baseDescriptor || !baseDescriptor.get, "@observable can not be used on getters, use @computed instead");
    return decoratorImpl.apply(null, arguments);
}
function observable(v, keyOrScope) {
    if (v === void 0) { v = undefined; }
    if (typeof arguments[1] === "string")
        return observableDecorator.apply(null, arguments);
    invariant(arguments.length < 3, "observable expects zero, one or two arguments");
    if (isObservable(v))
        return v;
    var _a = getValueModeFromValue(v, ValueMode.Recursive), mode = _a[0], value = _a[1];
    var sourceType = mode === ValueMode.Reference ? ValueType.Reference : getTypeOfValue(value);
    switch (sourceType) {
        case ValueType.Array:
        case ValueType.PlainObject:
            return makeChildObservable(value, mode);
        case ValueType.Reference:
        case ValueType.ComplexObject:
            return new ObservableValue(value, mode);
        case ValueType.ComplexFunction:
            throw new Error("[mobx.observable] To be able to make a function reactive it should not have arguments. If you need an observable reference to a function, use `observable(asReference(f))`");
        case ValueType.ViewFunction:
            deprecated("Use `computed(expr)` instead of `observable(expr)`");
            return computed(v, keyOrScope);
    }
    invariant(false, "Illegal State");
}
exports.observable = observable;
var ValueType;
(function (ValueType) {
    ValueType[ValueType["Reference"] = 0] = "Reference";
    ValueType[ValueType["PlainObject"] = 1] = "PlainObject";
    ValueType[ValueType["ComplexObject"] = 2] = "ComplexObject";
    ValueType[ValueType["Array"] = 3] = "Array";
    ValueType[ValueType["ViewFunction"] = 4] = "ViewFunction";
    ValueType[ValueType["ComplexFunction"] = 5] = "ComplexFunction";
})(ValueType || (ValueType = {}));
function getTypeOfValue(value) {
    if (value === null || value === undefined)
        return ValueType.Reference;
    if (typeof value === "function")
        return value.length ? ValueType.ComplexFunction : ValueType.ViewFunction;
    if (isArrayLike(value))
        return ValueType.Array;
    if (typeof value === "object")
        return isPlainObject(value) ? ValueType.PlainObject : ValueType.ComplexObject;
    return ValueType.Reference;
}
function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
exports.observe = observe;
function observeObservable(thing, listener, fireImmediately) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        return getAdministration(observable(thing)).observe(listener, fireImmediately);
    }
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        extendObservable(thing, {
            property: thing[property]
        });
        return observeObservableProperty(thing, property, listener, fireImmediately);
    }
    return getAdministration(thing, property).observe(listener, fireImmediately);
}
function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = null; }
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null)
            __alreadySeen = [];
        if (detectCycles && source !== null && typeof source === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++)
                if (__alreadySeen[i][0] === source)
                    return __alreadySeen[i][1];
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++)
                res[i] = toAdd[i];
            return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source)
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
            return res_1;
        }
        if (isObservableValue(source))
            return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}
exports.toJS = toJS;
function toJSlegacy(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = null; }
    deprecated("toJSlegacy is deprecated and will be removed in the next major. Use `toJS` instead. See #566");
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (source instanceof Date || source instanceof RegExp)
        return source;
    if (detectCycles && __alreadySeen === null)
        __alreadySeen = [];
    if (detectCycles && source !== null && typeof source === "object") {
        for (var i = 0, l = __alreadySeen.length; i < l; i++)
            if (__alreadySeen[i][0] === source)
                return __alreadySeen[i][1];
    }
    if (!source)
        return source;
    if (isArrayLike(source)) {
        var res = cache([]);
        var toAdd = source.map(function (value) { return toJSlegacy(value, detectCycles, __alreadySeen); });
        res.length = toAdd.length;
        for (var i = 0, l = toAdd.length; i < l; i++)
            res[i] = toAdd[i];
        return res;
    }
    if (isObservableMap(source)) {
        var res_2 = cache({});
        source.forEach(function (value, key) { return res_2[key] = toJSlegacy(value, detectCycles, __alreadySeen); });
        return res_2;
    }
    if (isObservableValue(source))
        return toJSlegacy(source.get(), detectCycles, __alreadySeen);
    if (typeof source === "object") {
        var res = cache({});
        for (var key in source)
            res[key] = toJSlegacy(source[key], detectCycles, __alreadySeen);
        return res;
    }
    return source;
}
exports.toJSlegacy = toJSlegacy;
function toJSON(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = null; }
    deprecated("toJSON is deprecated. Use toJS instead");
    return toJSlegacy.apply(null, arguments);
}
exports.toJSON = toJSON;
function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing)
                return log("whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested it's value.");
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing))
        return log(thing.whyRun());
    else if (isReaction(thing))
        return log(thing.whyRun());
    else
        invariant(false, "whyRun can only be used on reactions and computed values");
}
exports.whyRun = whyRun;
function createAction(actionName, fn) {
    invariant(typeof fn === "function", "`action` can only be invoked on functions");
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function () {
        return executeAction(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    invariant(!isComputedValue(globalState.trackingDerivation), "Computed values or transformers should not invoke actions or trigger other side effects");
    var notifySpy = isSpyEnabled();
    var startTime;
    if (notifySpy) {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            target: scope,
            arguments: flattendArgs
        });
    }
    var prevUntracked = untrackedStart();
    transactionStart(actionName, scope, false);
    var prevAllowStateChanges = allowStateChangesStart(true);
    try {
        return fn.apply(scope, args);
    }
    finally {
        allowStateChangesEnd(prevAllowStateChanges);
        transactionEnd(false);
        untrackedEnd(prevUntracked);
        if (notifySpy)
            spyReportEnd({ time: Date.now() - startTime });
    }
}
function useStrict(strict) {
    if (arguments.length === 0) {
        deprecated("`useStrict` without arguments is deprecated, use `isStrictModeEnabled()` instead");
        return globalState.strictMode;
    }
    else {
        invariant(globalState.trackingDerivation === null, "It is not allowed to set `useStrict` when a derivation is running");
        globalState.strictMode = strict;
        globalState.allowStateChanges = !strict;
    }
}
exports.useStrict = useStrict;
function isStrictModeEnabled() {
    return globalState.strictMode;
}
exports.isStrictModeEnabled = isStrictModeEnabled;
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res = func();
    allowStateChangesEnd(prev);
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
var BaseAtom = (function () {
    function BaseAtom(name) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        this.name = name;
        this.isPendingUnobservation = true;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {
    };
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    BaseAtom.prototype.reportChanged = function () {
        transactionStart("propagatingAtomChange", null, false);
        propagateChanged(this);
        transactionEnd(false);
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}());
exports.BaseAtom = BaseAtom;
var Atom = (function (_super) {
    __extends(Atom, _super);
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
        _super.call(this, name);
        this.name = name;
        this.onBecomeObservedHandler = onBecomeObservedHandler;
        this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        this.isPendingUnobservation = false;
        this.isBeingTracked = false;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom));
exports.Atom = Atom;
var isAtom = createInstanceofPredicate("Atom", BaseAtom);
var ComputedValue = (function () {
    function ComputedValue(derivation, scope, compareStructural, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.compareStructural = compareStructural;
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = [];
        this.newObserving = null;
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = undefined;
        this.isComputing = false;
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter)
            this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.peek = function () {
        this.isComputing = true;
        var prevAllowStateChanges = allowStateChangesStart(false);
        var res = this.derivation.call(this.scope);
        allowStateChangesEnd(prevAllowStateChanges);
        this.isComputing = false;
        return res;
    };
    ;
    ComputedValue.prototype.peekUntracked = function () {
        var hasError = true;
        try {
            var res = this.peek();
            hasError = false;
            return res;
        }
        finally {
            if (hasError)
                handleExceptionInDerivation(this);
        }
    };
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        invariant(this.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row");
        clearObserving(this);
        this.value = undefined;
    };
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        startBatch();
        if (globalState.inBatch === 1) {
            if (shouldCompute(this))
                this.value = this.peekUntracked();
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        endBatch();
        return result;
    };
    ComputedValue.prototype.recoverFromError = function () {
        this.isComputing = false;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this,
                type: "compute",
                fn: this.derivation,
                target: this.scope
            });
        }
        var oldValue = this.value;
        var newValue = this.value = trackDerivedFunction(this, this.peek);
        return valueDidChange(this.compareStructural, newValue, oldValue);
    };
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener(newValue, prevValue);
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        var observers = unique(getObservers(this).map(function (dep) { return dep.name; }));
        return (("\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n") +
            (this.dependenciesState === IDerivationState.NOT_TRACKING
                ?
                    " * This computation is suspended (not in use by any reaction) and won't run automatically.\n\tDidn't expect this computation to be suspended at this point?\n\t  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n\t  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).\n"
                :
                    " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this.isComputing && isTracking) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\tMissing items in this list?\n\t  1. Check whether all used values are properly marked as observable (use isObservable to verify)\n\t  2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n"));
    };
    return ComputedValue;
}());
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState;
(function (IDerivationState) {
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
exports.IDerivationState = IDerivationState;
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE: return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE: return true;
        case IDerivationState.POSSIBLY_STALE: {
            var hasError = true;
            var prevUntracked = untrackedStart();
            try {
                var obs = derivation.observing, l = obs.length;
                for (var i = 0; i < l; i++) {
                    var obj = obs[i];
                    if (isComputedValue(obj)) {
                        obj.get();
                        if (derivation.dependenciesState === IDerivationState.STALE) {
                            hasError = false;
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                    }
                }
                hasError = false;
                changeDependenciesStateTo0(derivation);
                untrackedEnd(prevUntracked);
                return false;
            }
            finally {
                if (hasError) {
                    changeDependenciesStateTo0(derivation);
                }
            }
        }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null;
}
function checkIfStateModificationsAreAllowed() {
    if (!globalState.allowStateChanges) {
        invariant(false, globalState.strictMode
            ? "It is not allowed to create or change state outside an `action` when MobX is in strict mode. Wrap the current method in `action` if this state change is intended"
            : "It is not allowed to change the state when a computed value or transformer is being evaluated. Use 'autorun' to create reactive functions with side-effects.");
    }
}
function trackDerivedFunction(derivation, f) {
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var hasException = true;
    var result;
    try {
        result = f.call(derivation);
        hasException = false;
    }
    finally {
        if (hasException) {
            handleExceptionInDerivation(derivation);
        }
        else {
            globalState.trackingDerivation = prevTracking;
            bindDependencies(derivation);
        }
    }
    return result;
}
function handleExceptionInDerivation(derivation) {
    var message = ("[mobx] An uncaught exception occurred while calculating your computed value, autorun or transformer. Or inside the render() method of an observer based React component. " +
        "These functions should never throw exceptions as MobX will not always be able to recover from them. " +
        ("Please fix the error reported after this message or enable 'Pause on (caught) exceptions' in your debugger to find the root cause. In: '" + derivation.name + "'. ") +
        "For more details see https://github.com/mobxjs/mobx/issues/462");
    if (isSpyEnabled()) {
        spyReport({
            type: "error",
            message: message
        });
    }
    console.warn(message);
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = null;
    derivation.unboundDepsCount = 0;
    derivation.recoverFromError();
    endBatch();
    resetGlobalState();
}
function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    derivation.newObserving = null;
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
    }
    observing.length = i0;
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
}
function clearObserving(derivation) {
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
    obs.length = 0;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
exports.untracked = untracked;
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = (function () {
    function MobXGlobals() {
        this.version = 4;
        this.trackingDerivation = null;
        this.runId = 0;
        this.mobxGuid = 0;
        this.inTransaction = 0;
        this.isRunningReactions = false;
        this.inBatch = 0;
        this.pendingUnobservations = [];
        this.pendingReactions = [];
        this.allowStateChanges = true;
        this.strictMode = false;
        this.resetId = 0;
        this.spyListeners = [];
    }
    return MobXGlobals;
}());
var globalState = (function () {
    var res = new MobXGlobals();
    if (global.__mobservableTrackingStack || global.__mobservableViewStack)
        throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== res.version)
        throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal)
        return global.__mobxGlobal;
    return global.__mobxGlobal = res;
})();
function registerGlobals() {
}
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.strictMode;
}
function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function invariantObservers(observable) {
    var list = observable.observers;
    var map = observable.observersIndexes;
    var l = list.length;
    for (var i = 0; i < l; i++) {
        var id = list[i].__mapid;
        if (i) {
            invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list");
        }
        else {
            invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldnt be held in map.");
        }
    }
    invariant(list.length === 0 || Object.keys(map).length === list.length - 1, "INTERNAL ERROR there is no junk in map");
}
function addObserver(observable, node) {
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
}
function removeObserver(observable, node) {
    if (observable.observers.length === 1) {
        observable.observers.length = 0;
        queueForUnobservation(observable);
    }
    else {
        var list = observable.observers;
        var map_1 = observable.observersIndexes;
        var filler = list.pop();
        if (filler !== node) {
            var index = map_1[node.__mapid] || 0;
            if (index) {
                map_1[filler.__mapid] = index;
            }
            else {
                delete map_1[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map_1[node.__mapid];
    }
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (globalState.inBatch === 1) {
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable_1 = list[i];
            observable_1.isPendingUnobservation = false;
            if (observable_1.observers.length === 0) {
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
    globalState.inBatch--;
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    }
    else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
function invariantLOS(observable, msg) {
    var min = getObservers(observable).reduce(function (a, b) { return Math.min(a, b.dependenciesState); }, 2);
    if (min >= observable.lowestObserverState)
        return;
    throw new Error("lowestObserverState is wrong for " + msg + " because " + min + " < " + observable.lowestObserverState);
}
function propagateChanged(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            d.onBecomeStale();
        d.dependenciesState = IDerivationState.STALE;
    }
}
function propagateChangeConfirmed(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}
function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
}
var Reaction = (function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) { name = "Reaction@" + getNextId(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = [];
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            startBatch();
            runReactions();
            endBatch();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        trackDerivedFunction(this, fn);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            clearObserving(this);
        }
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.recoverFromError = function () {
        this._isRunning = false;
        this._isTrackPending = false;
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        return ("\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this._isRunning) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\tMissing items in this list?\n\t  1. Check whether all used values are properly marked as observable (use isObservable to verify)\n\t  2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n");
    };
    return Reaction;
}());
exports.Reaction = Reaction;
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions() {
    if (globalState.isRunningReactions === true || globalState.inTransaction > 0)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            resetGlobalState();
            throw new Error(("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations.")
                + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}
function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length)
        return false;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change)
        spyReport(objectAssign({}, change, END_EVENT));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1)
            globalState.spyListeners.splice(idx, 1);
    });
}
exports.spy = spy;
function trackTransitions(onReport) {
    deprecated("trackTransitions is deprecated. Use mobx.spy instead");
    if (typeof onReport === "boolean") {
        deprecated("trackTransitions only takes a single callback function. If you are using the mobx-react-devtools, please update them first");
        onReport = arguments[1];
    }
    if (!onReport) {
        deprecated("trackTransitions without callback has been deprecated and is a no-op now. If you are using the mobx-react-devtools, please update them first");
        return function () { };
    }
    return spy(onReport);
}
function transaction(action, thisArg, report) {
    if (thisArg === void 0) { thisArg = undefined; }
    if (report === void 0) { report = true; }
    transactionStart((action.name) || "anonymous transaction", thisArg, report);
    try {
        return action.call(thisArg);
    }
    finally {
        transactionEnd(report);
    }
}
exports.transaction = transaction;
function transactionStart(name, thisArg, report) {
    if (thisArg === void 0) { thisArg = undefined; }
    if (report === void 0) { report = true; }
    startBatch();
    globalState.inTransaction += 1;
    if (report && isSpyEnabled()) {
        spyReportStart({
            type: "transaction",
            target: thisArg,
            name: name
        });
    }
}
function transactionEnd(report) {
    if (report === void 0) { report = true; }
    if (--globalState.inTransaction === 0) {
        runReactions();
    }
    if (report && isSpyEnabled())
        spyReportEnd();
    endBatch();
}
function hasInterceptors(interceptable) {
    return (interceptable.interceptors && interceptable.interceptors.length > 0);
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        for (var i = 0, l = interceptors.length; i < l; i++) {
            change = interceptors[i](change);
            invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
            if (!change)
                break;
        }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}
function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        if (Array.isArray(change)) {
            listeners[i].apply(null, change);
        }
        else {
            listeners[i](change);
        }
    }
    untrackedEnd(prevU);
}
var ValueMode;
(function (ValueMode) {
    ValueMode[ValueMode["Recursive"] = 0] = "Recursive";
    ValueMode[ValueMode["Reference"] = 1] = "Reference";
    ValueMode[ValueMode["Structure"] = 2] = "Structure";
    ValueMode[ValueMode["Flat"] = 3] = "Flat";
})(ValueMode || (ValueMode = {}));
exports.ValueMode = ValueMode;
function withModifier(modifier, value) {
    assertUnwrapped(value, "Modifiers are not allowed to be nested");
    return {
        mobxModifier: modifier,
        value: value
    };
}
function getModifier(value) {
    if (value) {
        return value.mobxModifier || null;
    }
    return null;
}
function asReference(value) {
    return withModifier(ValueMode.Reference, value);
}
exports.asReference = asReference;
asReference.mobxModifier = ValueMode.Reference;
function asStructure(value) {
    return withModifier(ValueMode.Structure, value);
}
exports.asStructure = asStructure;
asStructure.mobxModifier = ValueMode.Structure;
function asFlat(value) {
    return withModifier(ValueMode.Flat, value);
}
exports.asFlat = asFlat;
asFlat.mobxModifier = ValueMode.Flat;
function asMap(data, modifierFunc) {
    return map(data, modifierFunc);
}
exports.asMap = asMap;
function getValueModeFromValue(value, defaultMode) {
    var mode = getModifier(value);
    if (mode)
        return [mode, value.value];
    return [defaultMode, value];
}
function getValueModeFromModifierFunc(func) {
    if (func === undefined)
        return ValueMode.Recursive;
    var mod = getModifier(func);
    invariant(mod !== null, "Cannot determine value mode from function. Please pass in one of these: mobx.asReference, mobx.asStructure or mobx.asFlat, got: " + func);
    return mod;
}
function isModifierWrapper(value) {
    return value.mobxModifier !== undefined;
}
function makeChildObservable(value, parentMode, name) {
    var childMode;
    if (isObservable(value))
        return value;
    switch (parentMode) {
        case ValueMode.Reference:
            return value;
        case ValueMode.Flat:
            assertUnwrapped(value, "Items inside 'asFlat' cannot have modifiers");
            childMode = ValueMode.Reference;
            break;
        case ValueMode.Structure:
            assertUnwrapped(value, "Items inside 'asStructure' cannot have modifiers");
            childMode = ValueMode.Structure;
            break;
        case ValueMode.Recursive:
            _a = getValueModeFromValue(value, ValueMode.Recursive), childMode = _a[0], value = _a[1];
            break;
        default:
            invariant(false, "Illegal State");
    }
    if (Array.isArray(value))
        return createObservableArray(value, childMode, name);
    if (isPlainObject(value) && Object.isExtensible(value))
        return extendObservableHelper(value, value, childMode, name);
    return value;
    var _a;
}
function assertUnwrapped(value, message) {
    if (getModifier(value) !== null)
        throw new Error("[mobx] asStructure / asReference / asFlat cannot be used here. " + message);
}
var safariPrototypeSetterInheritanceBug = (function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function () { v = true; } });
    Object.create(p)["0"] = 1;
    return v === false;
})();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = (function () {
    function StubArray() {
    }
    return StubArray;
}());
StubArray.prototype = [];
var ObservableArrayAdministration = (function () {
    function ObservableArrayAdministration(name, mode, array, owned) {
        this.mode = mode;
        this.array = array;
        this.owned = owned;
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || ("ObservableArray@" + getNextId()));
    }
    ObservableArrayAdministration.prototype.makeReactiveArrayItem = function (value) {
        assertUnwrapped(value, "Array values cannot have modifiers");
        if (this.mode === ValueMode.Flat || this.mode === ValueMode.Reference)
            return value;
        return makeChildObservable(value, this.mode, this.atom.name + "[..]");
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength)
            this.spliceWithArray(currentLength, 0, new Array(newLength - currentLength));
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
            reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        checkIfStateModificationsAreAllowed();
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(this.makeReactiveArrayItem, this);
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta);
        var res = (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return res;
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}());
var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, mode, name, owned) {
        if (owned === void 0) { owned = false; }
        _super.call(this);
        var adm = new ObservableArrayAdministration(name, mode, this, owned);
        addHiddenFinalProp(this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            adm.updateArrayLength(0, initialValues.length);
            adm.values = initialValues.map(adm.makeReactiveArrayItem, adm);
            adm.notifyArraySplice(0, adm.values.slice(), EMPTY_ARRAY);
        }
        else {
            adm.values = [];
        }
        if (safariPrototypeSetterInheritanceBug) {
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i - 0] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.slice(), arrays.map(function (a) { return isObservableArray(a) ? a.slice() : a; }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        return this.$mobx.values;
    };
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        this.$mobx.atom.reportObserved();
        var items = this.$mobx.values, l = items.length;
        for (var i = fromIndex; i < l; i++)
            if (predicate.call(thisArg, items[i], i, this))
                return items[i];
        return undefined;
    };
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.values.indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        }
        else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    ObservableArray.prototype.toString = function () {
        return "[mobx.array] " + Array.prototype.toString.apply(this.$mobx.values, arguments);
    };
    ObservableArray.prototype.toLocaleString = function () {
        return "[mobx.array] " + Array.prototype.toLocaleString.apply(this.$mobx.values, arguments);
    };
    return ObservableArray;
}(StubArray));
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
makeNonEnumerable(ObservableArray.prototype, [
    "constructor",
    "intercept",
    "observe",
    "clear",
    "concat",
    "replace",
    "toJS",
    "toJSON",
    "peek",
    "find",
    "splice",
    "push",
    "pop",
    "shift",
    "unshift",
    "reverse",
    "sort",
    "remove",
    "move",
    "toString",
    "toLocaleString"
]);
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function () {
        return this.$mobx.getArrayLength();
    },
    set: function (newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
[
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some"
].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        this.$mobx.atom.reportObserved();
        return baseFunc.apply(this.$mobx.values, arguments);
    });
});
var ENTRY_0 = {
    configurable: true,
    enumerable: false,
    set: createArraySetter(0),
    get: createArrayGetter(0)
};
function createArrayBufferItem(index) {
    var set = createArraySetter(index);
    var get = createArrayGetter(index);
    Object.defineProperty(ObservableArray.prototype, "" + index, {
        enumerable: false,
        configurable: true,
        set: set, get: get
    });
}
function createArraySetter(index) {
    return function (newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        assertUnwrapped(newValue, "Modifiers cannot be used on array values. For non-reactive array values use makeReactive(asFlat(array)).");
        if (index < values.length) {
            checkIfStateModificationsAreAllowed();
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: adm.array,
                    index: index, newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.makeReactiveArrayItem(newValue);
            var changed = (adm.mode === ValueMode.Structure) ? !deepEquals(oldValue, newValue) : oldValue !== newValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    };
}
function createArrayGetter(index) {
    return function () {
        var impl = this.$mobx;
        if (impl && index < impl.values.length) {
            impl.atom.reportObserved();
            return impl.values[index];
        }
        console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        return undefined;
    };
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
        createArrayBufferItem(index);
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
function createObservableArray(initialValues, mode, name) {
    return new ObservableArray(initialValues, mode, name);
}
function fastArray(initialValues) {
    deprecated("fastArray is deprecated. Please use `observable(asFlat([]))`");
    return createObservableArray(initialValues, ValueMode.Flat, null);
}
exports.fastArray = fastArray;
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}
exports.isObservableArray = isObservableArray;
var ObservableMapMarker = {};
var ObservableMap = (function () {
    function ObservableMap(initialData, valueModeFunc) {
        var _this = this;
        this.$mobx = ObservableMapMarker;
        this._data = {};
        this._hasMap = {};
        this.name = "ObservableMap@" + getNextId();
        this._keys = new ObservableArray(null, ValueMode.Reference, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this._valueMode = getValueModeFromModifierFunc(valueModeFunc);
        if (this._valueMode === ValueMode.Flat)
            this._valueMode = ValueMode.Reference;
        allowStateChanges(true, function () {
            if (isPlainObject(initialData))
                _this.merge(initialData);
            else if (Array.isArray(initialData))
                initialData.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return _this.set(key, value);
                });
        });
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key))
            return false;
        key = "" + key;
        if (this._hasMap[key])
            return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        assertUnwrapped(value, "[mobx.map.set] Expected unwrapped value to be inserted to key '" + key + "'. If you need to use modifiers pass them as second argument to the constructor");
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy)
                spyReportStart(change);
            transaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable = _this._data[key];
                observable.setNewValue(undefined);
                _this._data[key] = undefined;
            }, undefined, false);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = this._hasMap[key] = new ObservableValue(value, ValueMode.Reference, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable = this._data[name];
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy)
                spyReportStart(change);
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        transaction(function () {
            var observable = _this._data[name] = new ObservableValue(newValue, _this._valueMode, _this.name + "." + name, false);
            newValue = observable.value;
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        }, undefined, false);
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key))
            return this._data[key].get();
        return undefined;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) { return [key, _this.get(key)]; }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) { return callback.call(thisArg, _this.get(key), key); });
    };
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        transaction(function () {
            if (isObservableMap(other))
                other.keys().forEach(function (key) { return _this.set(key, other.get(key)); });
            else
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
        }, undefined, false);
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        transaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        }, undefined, false);
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) { return res[key] = _this.get(key); });
        return res;
    };
    ObservableMap.prototype.toJs = function () {
        deprecated("toJs is deprecated, use toJS instead");
        return this.toJS();
    };
    ObservableMap.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined)
            return false;
        if (typeof key !== "string" && typeof key !== "number" && typeof key !== "boolean")
            return false;
        return true;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key))
            throw new Error("[mobx.map] Invalid key: '" + key + "'");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) { return (key + ": " + ("" + _this.get(key))); }).join(", ") + " }]";
    };
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable maps.");
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}());
exports.ObservableMap = ObservableMap;
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues, valueModifier) {
    return new ObservableMap(initialValues, valueModifier);
}
exports.map = map;
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
exports.isObservableMap = isObservableMap;
var COMPUTED_FUNC_DEPRECATED = ("\nIn MobX 2.* passing a function without arguments to (extend)observable will automatically be inferred to be a computed value.\nThis behavior is ambiguous and will change in MobX 3 to create just an observable reference to the value passed in.\nTo disambiguate, please pass the function wrapped with a modifier: use 'computed(fn)' (for current behavior; automatic conversion), or 'asReference(fn)' (future behavior, just store reference) or 'action(fn)'.\nNote that the idiomatic way to write computed properties is 'observable({ get propertyName() { ... }})'.\nFor more details, see https://github.com/mobxjs/mobx/issues/532");
var ObservableObjectAdministration = (function () {
    function ObservableObjectAdministration(target, name, mode) {
        this.target = target;
        this.name = name;
        this.mode = mode;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}());
function asObservableObject(target, name, mode) {
    if (mode === void 0) { mode = ValueMode.Recursive; }
    if (isObservableObject(target))
        return target.$mobx;
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name, mode);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function handleAsComputedValue(value) {
    return typeof value === "function" && value.length === 0 && !isAction(value);
}
function setObservableObjectInstanceProperty(adm, propName, descriptor) {
    if (adm.values[propName]) {
        invariant("value" in descriptor, "cannot redefine property " + propName);
        adm.target[propName] = descriptor.value;
    }
    else {
        if ("value" in descriptor) {
            if (handleAsComputedValue(descriptor.value)) {
                deprecated(COMPUTED_FUNC_DEPRECATED + ")in: " + adm.name + "." + propName);
            }
            defineObservableProperty(adm, propName, descriptor.value, true, undefined);
        }
        else {
            defineObservableProperty(adm, propName, descriptor.get, true, descriptor.set);
        }
    }
}
function defineObservableProperty(adm, propName, newValue, asInstanceProperty, setter) {
    if (asInstanceProperty)
        assertPropertyConfigurable(adm.target, propName);
    var observable;
    var name = adm.name + "." + propName;
    var isComputed = true;
    if (isComputedValue(newValue)) {
        observable = newValue;
        newValue.name = name;
        if (!newValue.scope)
            newValue.scope = adm.target;
    }
    else if (handleAsComputedValue(newValue)) {
        observable = new ComputedValue(newValue, adm.target, false, name, setter);
    }
    else if (getModifier(newValue) === ValueMode.Structure && typeof newValue.value === "function" && newValue.value.length === 0) {
        observable = new ComputedValue(newValue.value, adm.target, true, name, setter);
    }
    else {
        isComputed = false;
        if (hasInterceptors(adm)) {
            var change = interceptChange(adm, {
                object: adm.target,
                name: propName,
                type: "add",
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        observable = new ObservableValue(newValue, adm.mode, name, false);
        newValue = observable.value;
    }
    adm.values[propName] = observable;
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, isComputed ? generateComputedPropConfig(propName) : generateObservablePropConfig(propName));
    }
    if (!isComputed)
        notifyPropertyAddition(adm, adm.target, propName, newValue);
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    var config = observablePropertyConfigs[propName];
    if (config)
        return config;
    return observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            setPropertyValue(this, propName, v);
        }
    };
}
function generateComputedPropConfig(propName) {
    var config = computedPropertyConfigs[propName];
    if (config)
        return config;
    return computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            return this.$mobx.values[propName].set(v);
        }
    };
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify)
            notifyListeners(adm, change);
        if (notifySpy)
            spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy)
        spyReportStart(change);
    if (notify)
        notifyListeners(adm, change);
    if (notifySpy)
        spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}
exports.isObservableObject = isObservableObject;
var UNCHANGED = {};
var ObservableValue = (function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, mode, name, notifySpy) {
        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
        if (notifySpy === void 0) { notifySpy = true; }
        _super.call(this, name);
        this.mode = mode;
        this.hasUnreportedChange = false;
        this.value = undefined;
        var _a = getValueModeFromValue(value, ValueMode.Recursive), childmode = _a[0], unwrappedValue = _a[1];
        if (this.mode === ValueMode.Recursive)
            this.mode = childmode;
        this.value = makeChildObservable(unwrappedValue, this.mode, this.name);
        if (notifySpy && isSpyEnabled()) {
            spyReport({ type: "create", object: this, newValue: this.value });
        }
    }
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        assertUnwrapped(newValue, "Modifiers cannot be used on non-initial values.");
        checkIfStateModificationsAreAllowed();
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change)
                return UNCHANGED;
            newValue = change.newValue;
        }
        var changed = valueDidChange(this.mode === ValueMode.Structure, this.value, newValue);
        if (changed)
            return makeChildObservable(newValue, this.mode, this.name);
        return UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this))
            notifyListeners(this, [newValue, oldValue]);
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.value;
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener(this.value, undefined);
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    return ObservableValue;
}(BaseAtom));
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, "It is not possible to get index atoms from arrays");
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            if (property === undefined)
                return getAtom(thing._keys);
            var observable_2 = thing._data[property] || thing._hasMap[property];
            invariant(!!observable_2, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable_2;
        }
        runLazyInitializers(thing);
        if (isObservableObject(thing)) {
            invariant(!!property, "please specify a property");
            var observable_3 = thing.$mobx.values[property];
            invariant(!!observable_3, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable_3;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            return thing.$mobx;
        }
    }
    invariant(false, "Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing))
        return thing;
    runLazyInitializers(thing);
    if (thing.$mobx)
        return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing);
    return named.name;
}
function createClassPropertyDecorator(onInitialize, get, set, enumerable, allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function () {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true)
                        typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    }
                    else {
                        set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        }
        else {
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", (target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice()) || []);
            }
            var value_1 = descriptor.value, initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, (initializer_1 ? initializer_1.call(instance) : value_1), customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function () {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        return function () {
            if (quacksLikeADecorator(arguments))
                return classPropertyDecorator.apply(null, arguments);
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) { return classPropertyDecorator(target, key, descriptor, outerArgs, argLen); };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps"))
        addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true)
        return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) { return initializer(instance); });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}
function iteratorSymbol() {
    return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}
var SimpleEventEmitter = (function () {
    function SimpleEventEmitter() {
        this.listeners = [];
        deprecated("extras.SimpleEventEmitter is deprecated and will be removed in the next major release");
    }
    SimpleEventEmitter.prototype.emit = function () {
        var listeners = this.listeners.slice();
        for (var i = 0, l = listeners.length; i < l; i++)
            listeners[i].apply(null, arguments);
    };
    SimpleEventEmitter.prototype.on = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return once(function () {
            var idx = _this.listeners.indexOf(listener);
            if (idx !== -1)
                _this.listeners.splice(idx, 1);
        });
    };
    SimpleEventEmitter.prototype.once = function (listener) {
        var subscription = this.on(function () {
            subscription();
            listener.apply(this, arguments);
        });
        return subscription;
    };
    return SimpleEventEmitter;
}());
exports.SimpleEventEmitter = SimpleEventEmitter;
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getNextId() {
    return ++globalState.mobxGuid;
}
function invariant(check, message, thing) {
    if (!check)
        throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
}
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () { };
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) { limit = 100; }
    if (separator === void 0) { separator = " - "; }
    if (!things)
        return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source)
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
    }
    return res;
}
function valueDidChange(compareStructural, oldValue, newValue) {
    return compareStructural
        ? !deepEquals(oldValue, newValue)
        : oldValue !== newValue;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj)
        res.push(key);
    return res;
}
function deepEquals(a, b) {
    if (a === null && b === null)
        return true;
    if (a === undefined && b === undefined)
        return true;
    var aIsArray = isArrayLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    }
    else if (aIsArray) {
        if (a.length !== b.length)
            return false;
        for (var i = a.length - 1; i >= 0; i--)
            if (!deepEquals(a[i], b[i]))
                return false;
        return true;
    }
    else if (typeof a === "object" && typeof b === "object") {
        if (a === null || b === null)
            return false;
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
            return false;
        for (var prop in a) {
            if (!(prop in b))
                return false;
            if (!deepEquals(a[prop], b[prop]))
                return false;
        }
        return true;
    }
    return a === b;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
exports.isArrayLike = isArrayLike;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(180)))

/***/ }),
/* 500 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(501), __esModule: true };

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = forbidExtraProps;

var _object = __webpack_require__(417);

var _object2 = _interopRequireDefault(_object);

var _has = __webpack_require__(503);

var _has2 = _interopRequireDefault(_has);

var _isPlainObject = __webpack_require__(504);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zeroWidthSpace = '\u200B';
var specialProperty = 'prop-types-exact: ' + zeroWidthSpace;
var semaphore = {};

function brand(fn) {
  return (0, _object2['default'])(fn, _defineProperty({}, specialProperty, semaphore));
}

function isBranded(value) {
  return value && value[specialProperty] === semaphore;
}

function forbidExtraProps(propTypes) {
  if (!(0, _isPlainObject2['default'])(propTypes)) {
    throw new TypeError('given propTypes must be an object');
  }
  if ((0, _has2['default'])(propTypes, specialProperty) && !isBranded(propTypes[specialProperty])) {
    throw new TypeError('Against all odds, you created a propType for a prop that uses both the zero-width space and our custom string - which, sadly, conflicts with `prop-types-exact`');
  }

  return (0, _object2['default'])({}, propTypes, _defineProperty({}, specialProperty, brand(function () {
    function forbidUnknownProps(props, _, componentName) {
      var unknownProps = Object.keys(props).filter(function (prop) {
        return !(0, _has2['default'])(propTypes, prop);
      });
      if (unknownProps.length > 0) {
        return new TypeError(String(componentName) + ': unknown props found: ' + String(unknownProps.join(', ')));
      }
      return null;
    }

    return forbidUnknownProps;
  }())));
}
module.exports = exports['default'];
//# sourceMappingURL=index.js.map

/***/ }),
/* 503 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(420);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 504 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = isPlainObject;
function isPlainObject(x) {
  return x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && !Array.isArray(x);
}
module.exports = exports['default'];
//# sourceMappingURL=isPlainObject.js.map

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(396);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(398);

var _reactIntl = __webpack_require__(400);

var _index = __webpack_require__(101);

var _actions = __webpack_require__(397);

var _link = __webpack_require__(401);

var _link2 = _interopRequireDefault(_link);

var _CartMenuItem = __webpack_require__(506);

var _CartMenuItem2 = _interopRequireDefault(_CartMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/components/CartMenu.js';


var ProductList = function (_Component) {
  (0, _inherits3.default)(ProductList, _Component);

  function ProductList() {
    (0, _classCallCheck3.default)(this, ProductList);

    return (0, _possibleConstructorReturn3.default)(this, (ProductList.__proto__ || (0, _getPrototypeOf2.default)(ProductList)).apply(this, arguments));
  }

  (0, _createClass3.default)(ProductList, [{
    key: 'getProductById',
    value: function getProductById(productId) {
      var newProductId = parseInt(productId, 10);
      return this.props.products.find(function (product) {
        return product.id === newProductId;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          showModal = _props.showModal,
          cartCount = _props.cartCount,
          cartSubTotal = _props.cartSubTotal,
          cart = _props.cart,
          router = _props.router;

      return _react2.default.createElement('div', {
        onBlur: function onBlur() {
          return _this2.props.dispatch((0, _actions.setShowModal)(false));
        },
        tabIndex: '0',
        className: 'jsx-996526401' + ' ' + 'cart-menu',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, _react2.default.createElement('a', {
        onClick: function onClick() {
          return _this2.props.dispatch((0, _actions.setShowModal)(!showModal));
        },
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, _react2.default.createElement('span', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, 'My Cart'), ' (', _react2.default.createElement('span', {
        className: 'jsx-996526401' + ' ' + ((cart.length ? 'light' : '') || ''),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, cartCount), ') ', _react2.default.createElement('span', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, '\u25BC')), _react2.default.createElement('div', {
        className: 'jsx-996526401' + ' ' + ((!showModal ? 'hidden' : 'cart-dropdown') || ''),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement('table', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement('tbody', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, cart.map(function (cartProduct) {
        return _react2.default.createElement(_CartMenuItem2.default, {
          product: _this2.getProductById(cartProduct.id),
          quantity: cartProduct.quantity,
          key: cartProduct.id,
          remove: function remove() {
            return _this2.props.dispatch((0, _actions.removeFromCart)(cartProduct.id, 1));
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        });
      })), _react2.default.createElement('tfoot', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement('tr', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, _react2.default.createElement('td', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, 'Subtotal'), _react2.default.createElement('td', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, '\xA0'), _react2.default.createElement('td', {
        className: 'jsx-996526401',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, _react2.default.createElement(_reactIntl.FormattedNumber, { value: cartSubTotal, style: 'currency', currency: 'USD', __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }))))), _react2.default.createElement('a', { onClick: function onClick(e) {
          router.push('/cart');
          _this2.props.dispatch((0, _actions.setShowModal)(false));
        }, className: 'jsx-996526401' + ' ' + 'button white push-left',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, 'View Cart'), _react2.default.createElement('button', {
        className: 'jsx-996526401' + ' ' + 'push-right',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, 'Checkout')), _react2.default.createElement(_style2.default, {
        styleId: '996526401',
        css: '.cart-menu.jsx-996526401{padding:15px 30px;display:inline-block;float:right;position:relative}.cart-menu.jsx-996526401 span.light.jsx-996526401{color:#e74c3c}.cart-menu.jsx-996526401 .cart-dropdown.jsx-996526401{position:absolute;right:0;background-color:#ffffff;padding:20px;width:400px}.cart-menu.jsx-996526401 .cart-dropdown.jsx-996526401 table.jsx-996526401{width:100%}.cart-menu.jsx-996526401 .cart-dropdown.jsx-996526401 table.jsx-996526401 td.jsx-996526401:last-child{text-align:right}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FydE1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeURvQixBQUcrQixBQU9KLEFBSUksQUFRUCxBQUlNLFdBSG5CLEdBWkEsR0FnQkEsQ0F2QnVCLEFBV2IsUUFDaUIsYUFYYixZQUNNLEFBV0wsYUFDRCxLQVhkLE9BWUEiLCJmaWxlIjoiY29tcG9uZW50cy9DYXJ0TWVudS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ29uemFsb2Jlbml0ZXovRG9jdW1lbnRzL3N0b3JlZnJvbnQvbmV4dC1zdG9yZWZyb250Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTnVtYmVyIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCB7IHNldFNob3dNb2RhbCwgcmVtb3ZlRnJvbUNhcnQgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuaW1wb3J0IENhcnRNZW51SXRlbSBmcm9tICcuL0NhcnRNZW51SXRlbSdcblxuY2xhc3MgUHJvZHVjdExpc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGdldFByb2R1Y3RCeUlkIChwcm9kdWN0SWQpIHtcbiAgICBjb25zdCBuZXdQcm9kdWN0SWQgPSBwYXJzZUludChwcm9kdWN0SWQsIDEwKVxuICAgIHJldHVybiB0aGlzLnByb3BzLnByb2R1Y3RzLmZpbmQocHJvZHVjdCA9PiBwcm9kdWN0LmlkID09PSBuZXdQcm9kdWN0SWQpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2hvd01vZGFsLCBjYXJ0Q291bnQsIGNhcnRTdWJUb3RhbCwgY2FydCwgcm91dGVyIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FydC1tZW51XCJcbiAgICAgICAgb25CbHVyPXsgKCkgPT4gdGhpcy5wcm9wcy5kaXNwYXRjaChzZXRTaG93TW9kYWwoZmFsc2UpKSB9XG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICA+XG4gICAgICAgIDxhIFxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLmRpc3BhdGNoKHNldFNob3dNb2RhbCghc2hvd01vZGFsKSkgfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+TXkgQ2FydDwvc3Bhbj4gKDxzcGFuIGNsYXNzTmFtZT17IGNhcnQubGVuZ3RoID8gJ2xpZ2h0JyA6ICcnIH0+eyBjYXJ0Q291bnQgfTwvc3Bhbj4pIDxzcGFuPuKWvDwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzTmFtZT17ICFzaG93TW9kYWwgPyAnaGlkZGVuJyA6ICdjYXJ0LWRyb3Bkb3duJyB9XG4gICAgICAgID5cbiAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhcnQubWFwKCggY2FydFByb2R1Y3QgKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxDYXJ0TWVudUl0ZW1cbiAgICAgICAgICAgICAgICAgIHByb2R1Y3Q9eyB0aGlzLmdldFByb2R1Y3RCeUlkKGNhcnRQcm9kdWN0LmlkKSB9XG4gICAgICAgICAgICAgICAgICBxdWFudGl0eT17IGNhcnRQcm9kdWN0LnF1YW50aXR5IH1cbiAgICAgICAgICAgICAgICAgIGtleT17IGNhcnRQcm9kdWN0LmlkIH1cbiAgICAgICAgICAgICAgICAgIHJlbW92ZT17KCkgPT4gdGhpcy5wcm9wcy5kaXNwYXRjaChyZW1vdmVGcm9tQ2FydChjYXJ0UHJvZHVjdC5pZCwgMSkpIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDx0Zm9vdD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5TdWJ0b3RhbDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjxGb3JtYXR0ZWROdW1iZXIgdmFsdWU9eyBjYXJ0U3ViVG90YWwgfSBzdHlsZT1cImN1cnJlbmN5XCIgY3VycmVuY3k9eyAnVVNEJyB9IC8+PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8YSBvbkNsaWNrPXsgKGUpID0+IHtcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvY2FydCcpXG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHNldFNob3dNb2RhbChmYWxzZSkpXG4gICAgICAgICAgfSB9IGNsYXNzTmFtZT1cImJ1dHRvbiB3aGl0ZSBwdXNoLWxlZnRcIj5WaWV3IENhcnQ8L2E+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwdXNoLXJpZ2h0XCIgPkNoZWNrb3V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgLmNhcnQtbWVudSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAxNXB4IDMwcHg7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmNhcnQtbWVudSBzcGFuLmxpZ2h0IHtcbiAgICAgICAgICAgIGNvbG9yOiAjZTc0YzNjO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jYXJ0LW1lbnUgLmNhcnQtZHJvcGRvd24ge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgICAgIHdpZHRoOiA0MDBweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY2FydC1tZW51IC5jYXJ0LWRyb3Bkb3duIHRhYmxlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jYXJ0LW1lbnUgLmNhcnQtZHJvcGRvd24gdGFibGUgdGQ6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93TW9kYWwsIGNhcnRDb3VudCwgY2FydFN1YlRvdGFsLCBjYXJ0LCBwcm9kdWN0cyB9KSA9PiAoeyBzaG93TW9kYWwsIGNhcnRDb3VudCwgY2FydFN1YlRvdGFsLCBjYXJ0LCBwcm9kdWN0cyB9KVxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoUHJvZHVjdExpc3QpKSJdfQ== */\n/*@ sourceURL=components/CartMenu.js */'
      }));
    }
  }]);

  return ProductList;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var showModal = _ref.showModal,
      cartCount = _ref.cartCount,
      cartSubTotal = _ref.cartSubTotal,
      cart = _ref.cart,
      products = _ref.products;
  return { showModal: showModal, cartCount: cartCount, cartSubTotal: cartSubTotal, cart: cart, products: products };
};
exports.default = (0, _index.withRouter)((0, _reactRedux.connect)(mapStateToProps)(ProductList));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FydE1lbnUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJjb25uZWN0IiwiRm9ybWF0dGVkTnVtYmVyIiwid2l0aFJvdXRlciIsInNldFNob3dNb2RhbCIsInJlbW92ZUZyb21DYXJ0IiwiTGluayIsIkNhcnRNZW51SXRlbSIsIlByb2R1Y3RMaXN0IiwicHJvZHVjdElkIiwibmV3UHJvZHVjdElkIiwicGFyc2VJbnQiLCJwcm9wcyIsInByb2R1Y3RzIiwiZmluZCIsInByb2R1Y3QiLCJpZCIsInNob3dNb2RhbCIsImNhcnRDb3VudCIsImNhcnRTdWJUb3RhbCIsImNhcnQiLCJyb3V0ZXIiLCJkaXNwYXRjaCIsImxlbmd0aCIsIm1hcCIsImNhcnRQcm9kdWN0IiwiZ2V0UHJvZHVjdEJ5SWQiLCJxdWFudGl0eSIsImUiLCJwdXNoIiwibWFwU3RhdGVUb1Byb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUzs7QUFDVCxBQUFTOztBQUNULEFBQVM7O0FBQ1QsQUFBUyxBQUFjLEFBQXNCOztBQUM3QyxBQUFPOzs7O0FBQ1AsQUFBTyxBQUFrQjs7Ozs7Ozs7O0ksQUFFbkI7Ozs7Ozs7Ozs7O21DLEFBRVksV0FBVyxBQUN6QjtVQUFNLGVBQWUsU0FBQSxBQUFTLFdBQTlCLEFBQXFCLEFBQW9CLEFBQ3pDO2tCQUFPLEFBQUssTUFBTCxBQUFXLFNBQVgsQUFBb0IsS0FBSyxtQkFBQTtlQUFXLFFBQUEsQUFBUSxPQUFuQixBQUEwQjtBQUExRCxBQUFPLEFBQ1IsT0FEUTs7Ozs2QkFHQzttQkFBQTs7bUJBQ3FELEtBRHJELEFBQzBEO1VBRDFELEFBQ0EsbUJBREEsQUFDQTtVQURBLEFBQ1csbUJBRFgsQUFDVztVQURYLEFBQ3NCLHNCQUR0QixBQUNzQjtVQUR0QixBQUNvQyxjQURwQyxBQUNvQztVQURwQyxBQUMwQyxnQkFEMUMsQUFDMEMsQUFDbEQ7OzZCQUNFLGNBQUE7Z0JBQ1csa0JBQUE7aUJBQU0sT0FBQSxBQUFLLE1BQUwsQUFBVyxTQUFTLDJCQUExQixBQUFNLEFBQW9CLEFBQWE7QUFEbEQsQUFFRTtrQkFGRixBQUVXOzJDQUZYLEFBQWU7O29CQUFmO3NCQUFBLEFBSUU7QUFKRjtBQUNFLE9BREYsa0JBSUUsY0FBQTtpQkFDWSxtQkFBQTtpQkFBTSxPQUFBLEFBQUssTUFBTCxBQUFXLFNBQVMsMkJBQWEsQ0FBdkMsQUFBTSxBQUFvQixBQUFjO0FBRHBEO21CQUFBOztvQkFBQTtzQkFBQSxBQUdFO0FBSEY7QUFDRSx5QkFFQSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FIRixBQUdFLFlBQXNCLHNCQUFBLGNBQUE7NkNBQWtCLEtBQUEsQUFBSyxTQUFMLEFBQWMsVUFBaEMsQUFBMEMsT0FBMUM7O29CQUFBO3NCQUFBLEFBQWlEO0FBQWpEO0FBQUEsU0FIeEIsQUFHd0IsWUFBcUUsc0JBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBUC9GLEFBSUUsQUFHNkYsQUFFN0YsNEJBQUEsY0FBQTs2Q0FDYyxDQUFBLEFBQUMsWUFBRCxBQUFhLFdBRDNCLEFBQ3NDLG9CQUR0Qzs7b0JBQUE7c0JBQUEsQUFHRTtBQUhGO0FBQUEseUJBR0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFFRTtBQUZGO0FBQUEsY0FFRSxBQUFLLElBQUksVUFBQSxBQUFFLGFBQWlCLEFBQzFCOytCQUFPLEFBQUM7bUJBQ0ksT0FBQSxBQUFLLGVBQWUsWUFEekIsQUFDSyxBQUFnQyxBQUMxQztvQkFBVyxZQUZOLEFBRWtCLEFBQ3ZCO2VBQU0sWUFIRCxBQUdhLEFBQ2xCO2tCQUFRLGtCQUFBO21CQUFNLE9BQUEsQUFBSyxNQUFMLEFBQVcsU0FBUyw2QkFBZSxZQUFmLEFBQTJCLElBQXJELEFBQU0sQUFBb0IsQUFBK0I7QUFKNUQ7O3NCQUFBO3dCQUFQLEFBQU8sQUFNUjtBQU5RO0FBQ0wsU0FESztBQUpiLEFBQ0UsQUFFRSxBQVVGLDJCQUFBLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQURGLEFBQ0UsQUFDQSw2QkFBQSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FGRixBQUVFLEFBQ0EseUJBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFBSTtBQUFKO0FBQUEseUJBQUksQUFBQyw0Q0FBZ0IsT0FBakIsQUFBeUIsY0FBZSxPQUF4QyxBQUE4QyxZQUFXLFVBQXpELEFBQW9FO29CQUFwRTtzQkFwQlosQUFHRSxBQWFFLEFBQ0UsQUFHRSxBQUFJLEFBSVY7QUFKVTs4QkFJVixjQUFBLE9BQUcsU0FBVSxpQkFBQSxBQUFDLEdBQU0sQUFDbEI7aUJBQUEsQUFBTyxLQUFQLEFBQVksQUFDWjtpQkFBQSxBQUFLLE1BQUwsQUFBVyxTQUFTLDJCQUFwQixBQUFvQixBQUFhLEFBQ2xDO0FBSEQsOENBQUEsQUFHYzs7b0JBSGQ7c0JBQUE7QUFBQTtTQXhCRixBQXdCRSxBQUlBLDhCQUFBLGNBQUE7MkNBQUEsQUFBa0I7O29CQUFsQjtzQkFBQTtBQUFBO0FBQUEsU0FyQ0osQUFTRSxBQTRCRTtpQkFyQ0o7YUFERixBQUNFLEFBcUVIO0FBckVHOzs7OztBLEFBVm9COztBQWtGMUIsSUFBTSxrQkFBa0IsU0FBbEIsQUFBa0Isc0JBQUE7TUFBQSxBQUFHLGlCQUFILEFBQUc7TUFBSCxBQUFjLGlCQUFkLEFBQWM7TUFBZCxBQUF5QixvQkFBekIsQUFBeUI7TUFBekIsQUFBdUMsWUFBdkMsQUFBdUM7TUFBdkMsQUFBNkMsZ0JBQTdDLEFBQTZDO1NBQWdCLEVBQUUsV0FBRixXQUFhLFdBQWIsV0FBd0IsY0FBeEIsY0FBc0MsTUFBdEMsTUFBNEMsVUFBekcsQUFBNkQ7QUFBckYsQUFDQTtrQkFBZSx1QkFBVyx5QkFBQSxBQUFRLGlCQUFsQyxBQUFlLEFBQVcsQUFBeUIiLCJmaWxlIjoiQ2FydE1lbnUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dvbnphbG9iZW5pdGV6L0RvY3VtZW50cy9zdG9yZWZyb250L25leHQtc3RvcmVmcm9udCJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/CartMenu.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/CartMenu.js"); } } })();

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _style = __webpack_require__(396);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactIntl = __webpack_require__(400);

var _link = __webpack_require__(401);

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/components/CartMenuItem.js';

exports.default = function (_ref) {
	var product = _ref.product,
	    quantity = _ref.quantity,
	    remove = _ref.remove;

	return _react2.default.createElement('tr', {
		className: 'jsx-717847010' + ' ' + 'cart-menu-item',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 6
		}
	}, _react2.default.createElement('td', {
		className: 'jsx-717847010',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 7
		}
	}, _react2.default.createElement('img', { src: '/static/' + product.image, className: 'jsx-717847010',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 8
		}
	})), _react2.default.createElement('td', {
		className: 'jsx-717847010' + ' ' + 'cart-menu-description',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 10
		}
	}, _react2.default.createElement('div', {
		className: 'jsx-717847010',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 11
		}
	}, product.brand), _react2.default.createElement('div', {
		className: 'jsx-717847010',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 12
		}
	}, product.title + ' x ' + quantity), _react2.default.createElement('span', {
		className: 'jsx-717847010' + ' ' + 'price',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 13
		}
	}, _react2.default.createElement(_reactIntl.FormattedNumber, { value: product.price * quantity, style: 'currency', currency: 'USD', __source: {
			fileName: _jsxFileName,
			lineNumber: 13
		}
	}))), _react2.default.createElement('td', {
		className: 'jsx-717847010',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, _react2.default.createElement('a', { onClick: remove, className: 'jsx-717847010',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 16
		}
	}, 'X')), _react2.default.createElement(_style2.default, {
		styleId: '717847010',
		css: '.cart-menu-item.jsx-717847010{width:100%}.cart-menu-item.jsx-717847010 img.jsx-717847010{width:80px;height:80px}.cart-menu-item.jsx-717847010 td.jsx-717847010:last-child{text-align:right}.cart-menu-description.jsx-717847010{padding:0 40px 0 10px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FydE1lbnVJdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCYyxBQUdnQixBQUlBLEFBS2EsQUFJSSxXQVo3QixBQUlhLE1BS1AsS0FJQSxDQVJOIiwiZmlsZSI6ImNvbXBvbmVudHMvQ2FydE1lbnVJdGVtLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtYXR0ZWROdW1iZXIgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuXG5leHBvcnQgZGVmYXVsdCAoeyBwcm9kdWN0LCBxdWFudGl0eSwgcmVtb3ZlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgXHQ8dHIgY2xhc3NOYW1lPVwiY2FydC1tZW51LWl0ZW1cIiA+XG4gIFx0XHQ8dGQ+XG5cdFx0XHQ8aW1nIHNyYz17IGAvc3RhdGljLyR7IHByb2R1Y3QuaW1hZ2UgfWAgfSAvPlxuXHQgICAgPC90ZD5cblx0ICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJ0LW1lbnUtZGVzY3JpcHRpb25cIj5cblx0ICAgIFx0PGRpdj57IHByb2R1Y3QuYnJhbmQgfTwvZGl2PlxuXHQgICAgXHQ8ZGl2PnsgYCR7IHByb2R1Y3QudGl0bGUgfSB4ICR7IHF1YW50aXR5IH1gIH08L2Rpdj5cblx0ICAgIFx0PHNwYW4gY2xhc3NOYW1lPVwicHJpY2VcIj48Rm9ybWF0dGVkTnVtYmVyIHZhbHVlPXsgcHJvZHVjdC5wcmljZSAqIHF1YW50aXR5IH0gc3R5bGU9XCJjdXJyZW5jeVwiIGN1cnJlbmN5PXsgJ1VTRCcgfSAvPjwvc3Bhbj5cblx0ICAgIDwvdGQ+XG5cdCAgICA8dGQ+XG5cdCAgICBcdDxhIG9uQ2xpY2s9eyByZW1vdmUgfT5YPC9hPlxuXHRcdDwvdGQ+XG5cblx0XHQ8c3R5bGUganN4PntgXG5cdFx0XHQuY2FydC1tZW51LWl0ZW0ge1xuXHRcdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdH1cblxuXHRcdFx0LmNhcnQtbWVudS1pdGVtIGltZyB7XG5cdFx0XHRcdHdpZHRoOiA4MHB4O1xuXHRcdFx0XHRoZWlnaHQ6IDgwcHg7XG5cdFx0XHR9XG5cdFx0XHRcblx0ICAgICAgICAuY2FydC1tZW51LWl0ZW0gdGQ6bGFzdC1jaGlsZCB7XG5cdCAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAuY2FydC1tZW51LWRlc2NyaXB0aW9uIHtcblx0ICAgICAgICBcdHBhZGRpbmc6IDAgNDBweCAwIDEwcHg7XG5cdCAgICAgICAgfVxuXHRcdGB9PC9zdHlsZT5cbiAgICA8L3RyPlxuICApXG59Il19 */\n/*@ sourceURL=components/CartMenuItem.js */'
	}));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FydE1lbnVJdGVtLmpzIl0sIm5hbWVzIjpbIkZvcm1hdHRlZE51bWJlciIsIkxpbmsiLCJwcm9kdWN0IiwicXVhbnRpdHkiLCJyZW1vdmUiLCJpbWFnZSIsImJyYW5kIiwidGl0bGUiLCJwcmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFTOztBQUNULEFBQU8sQUFFUDs7Ozs7Ozs7a0JBQWUsZ0JBQW1DO0tBQWhDLEFBQWdDLGVBQWhDLEFBQWdDO0tBQXZCLEFBQXVCLGdCQUF2QixBQUF1QjtLQUFiLEFBQWEsY0FBYixBQUFhLEFBQ2hEOzt3QkFDQyxjQUFBO3FDQUFBLEFBQWM7O2FBQWQ7ZUFBQSxBQUNDO0FBREQ7QUFBQSxFQUFBLGtCQUNDLGNBQUE7YUFBQTs7YUFBQTtlQUFBLEFBQ0Q7QUFEQztBQUFBLDJDQUNJLGtCQUFrQixRQUF2QixBQUErQixrQkFBL0I7O2FBQUE7ZUFGQSxBQUNDLEFBQ0QsQUFFRTtBQUZGO3NCQUVFLGNBQUE7cUNBQUEsQUFBYzs7YUFBZDtlQUFBLEFBQ0M7QUFERDtBQUFBLG9CQUNDLGNBQUE7YUFBQTs7YUFBQTtlQUFBLEFBQU87QUFBUDtBQUFBLFlBREQsQUFDQyxBQUFlLEFBQ2Ysd0JBQUEsY0FBQTthQUFBOzthQUFBO2VBQUEsQUFBVztBQUFYO0FBQUEsWUFBQSxBQUFtQixnQkFGcEIsQUFFQyxBQUFnQyxBQUNoQywyQkFBQSxjQUFBO3FDQUFBLEFBQWdCOzthQUFoQjtlQUFBLEFBQXdCO0FBQXhCO0FBQUEsb0JBQXdCLEFBQUMsNENBQWdCLE9BQVEsUUFBQSxBQUFRLFFBQWpDLEFBQXlDLFVBQVcsT0FBcEQsQUFBMEQsWUFBVyxVQUFyRSxBQUFnRjthQUFoRjtlQVAzQixBQUlFLEFBR0MsQUFBd0IsQUFFekI7QUFGeUI7dUJBRXpCLGNBQUE7YUFBQTs7YUFBQTtlQUFBLEFBQ0M7QUFERDtBQUFBLG9CQUNDLGNBQUEsT0FBRyxTQUFILEFBQWEsbUJBQWI7O2FBQUE7ZUFBQTtBQUFBO0lBVkgsQUFTRSxBQUNDO1dBVkg7T0FERCxBQUNDLEFBaUNGO0FBakNFO0FBRkgiLCJmaWxlIjoiQ2FydE1lbnVJdGVtLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/CartMenuItem.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/CartMenuItem.js"); } } })();

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(396);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _ProductList = __webpack_require__(508);

var _ProductList2 = _interopRequireDefault(_ProductList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/HomePage.js";


function HomePage() {
  return _react2.default.createElement("div", {
    className: "jsx-4285080137" + " " + "category-page",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, _react2.default.createElement("div", {
    className: "jsx-4285080137" + " " + "hero-container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement("div", {
    className: "jsx-4285080137" + " " + "hero",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement("h2", {
    className: "jsx-4285080137",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, "Plates"), _react2.default.createElement("p", {
    className: "jsx-4285080137",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque mollis aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit."))), _react2.default.createElement(_ProductList2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement(_style2.default, {
    styleId: "4285080137",
    css: ".hero-container.jsx-4285080137{position:relative;background:url(\"/static/plates-header.jpg\");background-size:cover;height:25em;width:100vw;margin-bottom:30px}.hero-container.jsx-4285080137 .hero.jsx-4285080137{padding:130px 20px;position:absolute;text-align:center;width:50vw;top:50%;left:50%;height:100%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:white;background:linear-gradient(to bottom,#514e4a ,#3a3835);box-shadow:inset -1px -3px 5px rgba(0,0,0,0.5),inset 1px 3px 5px rgba(0,0,0,0.5);text-shadow:1px 3px 5px rgba(0,0,0,0.5),-1px -3px 5px rgba(0,0,0,0.5);vertical-align:middle}.hero-container.jsx-4285080137 .hero.jsx-4285080137 h2.jsx-4285080137{font-size:3em;border-bottom:1px solid #fff;display:inline-block;padding-bottom:10px;margin-bottom:15px;padding-left:0;padding-right:0}.hero-container.jsx-4285080137 .hero.jsx-4285080137 p.jsx-4285080137{color:#ffffff}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSG9tZVBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY2tCLEFBRzZCLEFBU0MsQUFnQkwsQUFVQSxjQVRlLEFBVS9CLElBbkM4QyxDQVMxQixrQkFDQSxNQWdCRyxZQWZWLE9BVlcsRUEwQkYsRUFmWixRQUNDLFNBQ0csQ0FaQSxBQTBCTyxXQWJhLENBWnBCLE9BMEJHLEtBekJJLFVBMEJILFNBekJsQixPQTBCQSxrRUFmYyxZQUM2Qyx1REFDeUIsaUZBQ1gsc0VBQ2pELHNCQUN4QiIsImZpbGUiOiJjb21wb25lbnRzL0hvbWVQYWdlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvZHVjdExpc3QgZnJvbSAnLi9Qcm9kdWN0TGlzdCdcblxuZnVuY3Rpb24gSG9tZVBhZ2UgKCkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2F0ZWdvcnktcGFnZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlcm9cIj5cbiAgICAgICAgICA8aDI+UGxhdGVzPC9oMj5cbiAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBEb25lYyBwZWxsZW50ZXNxdWUgbW9sbGlzIGFsaXF1YW0uTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxQcm9kdWN0TGlzdCAvPlxuXG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5oZXJvLWNvbnRhaW5lciB7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHVybChcIi9zdGF0aWMvcGxhdGVzLWhlYWRlci5qcGdcIik7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgICAgICBoZWlnaHQ6IDI1ZW07XG4gICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAuaGVyby1jb250YWluZXIgLmhlcm8ge1xuICAgICAgICAgIHBhZGRpbmc6IDEzMHB4IDIwcHg7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogNTB2dztcbiAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjNTE0ZTRhICwgIzNhMzgzNSk7IFxuICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IC0xcHggLTNweCA1cHggcmdiYSgwLDAsMCwwLjUpLCBpbnNldCAxcHggM3B4IDVweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgICAgICAgdGV4dC1zaGFkb3c6IDFweCAzcHggNXB4IHJnYmEoMCwwLDAsMC41KSwgLTFweCAtM3B4IDVweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZXJvLWNvbnRhaW5lciAuaGVybyBoMiB7XG4gICAgICAgICAgZm9udC1zaXplOiAzZW07XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmY7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuaGVyby1jb250YWluZXIgLmhlcm8gcCB7XG4gICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lUGFnZVxuIl19 */\n/*@ sourceURL=components/HomePage.js */"
  }));
}

exports.default = HomePage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSG9tZVBhZ2UuanMiXSwibmFtZXMiOlsiUHJvZHVjdExpc3QiLCJIb21lUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQWlCOzs7Ozs7Ozs7QUFFeEIsU0FBQSxBQUFTLFdBQVksQUFDbkI7eUJBQ0UsY0FBQTt3Q0FBQSxBQUFlOztnQkFBZjtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLGtCQUNFLGNBQUE7d0NBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTt3Q0FBQSxBQUFlOztnQkFBZjtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxjQUFBO2VBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQURGLEFBQ0UsQUFDQSwyQkFBQSxjQUFBO2VBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQUpOLEFBQ0UsQUFDRSxBQUVFLEFBSUosMEtBQUEsQUFBQzs7Z0JBQUQ7a0JBUkYsQUFRRTtBQUFBO0FBQUE7YUFSRjtTQURGLEFBQ0UsQUFvREg7QUFwREc7QUFzREo7O2tCQUFBLEFBQWUiLCJmaWxlIjoiSG9tZVBhZ2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dvbnphbG9iZW5pdGV6L0RvY3VtZW50cy9zdG9yZWZyb250L25leHQtc3RvcmVmcm9udCJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/HomePage.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/HomePage.js"); } } })();

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(398);

var _actions = __webpack_require__(397);

var _ProductItem = __webpack_require__(509);

var _ProductItem2 = _interopRequireDefault(_ProductItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/components/ProductList.js';


var ProductList = function (_Component) {
  (0, _inherits3.default)(ProductList, _Component);

  function ProductList() {
    (0, _classCallCheck3.default)(this, ProductList);

    return (0, _possibleConstructorReturn3.default)(this, (ProductList.__proto__ || (0, _getPrototypeOf2.default)(ProductList)).apply(this, arguments));
  }

  (0, _createClass3.default)(ProductList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var products = this.props.products;

      return _react2.default.createElement('div', { className: 'product-list', __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, products.map(function (product) {
        return _react2.default.createElement(_ProductItem2.default, { product: product, key: product.id, add: function add() {
            _this2.props.dispatch((0, _actions.addToCart)(product.id, 1));
          }, __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          }
        });
      }));
    }
  }]);

  return ProductList;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var products = _ref.products;
  return { products: products };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps)(ProductList);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUHJvZHVjdExpc3QuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJjb25uZWN0IiwiYWRkVG9DYXJ0IiwiUHJvZHVjdEl0ZW0iLCJQcm9kdWN0TGlzdCIsInByb2R1Y3RzIiwicHJvcHMiLCJtYXAiLCJwcm9kdWN0IiwiaWQiLCJkaXNwYXRjaCIsIm1hcFN0YXRlVG9Qcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUzs7QUFDVCxBQUFTLEFBQWlCOztBQUMxQixBQUFPLEFBQWlCOzs7Ozs7Ozs7SUFFbEIsQTs7Ozs7Ozs7Ozs7NkJBQ007bUJBQUE7O1VBQUEsQUFDQSxXQUFhLEtBRGIsQUFDa0IsTUFEbEIsQUFDQSxBQUNSOzs2QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBRUM7QUFGRDtPQUFBLFdBRUMsQUFBUyxJQUFJLFVBQUEsQUFBRSxTQUFhLEFBQzFCOytCQUFPLEFBQUMsdUNBQVksU0FBYixBQUF1QixTQUFVLEtBQU0sUUFBdkMsQUFBK0MsSUFBSyxLQUFNLGVBQU0sQUFBRTttQkFBQSxBQUFLLE1BQUwsQUFBVyxTQUFTLHdCQUFVLFFBQVYsQUFBa0IsSUFBdEMsQUFBb0IsQUFBc0IsQUFBSztBQUFqSDtzQkFBQTt3QkFBUCxBQUFPLEFBQ1I7QUFEUTtTQUFBO0FBSlosQUFDRSxBQUVDLEFBTUo7Ozs7O0FBWnVCLEE7O0FBZTFCLElBQU0sa0JBQWtCLFNBQWxCLEFBQWtCLHNCQUFBO01BQUEsQUFBRyxnQkFBSCxBQUFHO1NBQWdCLEVBQUUsVUFBckIsQUFBbUI7QUFBM0MsQUFDQTtrQkFBZSx5QkFBQSxBQUFRLGlCQUF2QixBQUFlLEFBQXlCIiwiZmlsZSI6IlByb2R1Y3RMaXN0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/ProductList.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/ProductList.js"); } } })();

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _style = __webpack_require__(396);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactIntl = __webpack_require__(400);

var _link = __webpack_require__(401);

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gonzalobenitez/Documents/storefront/next-storefront/components/ProductItem.js';

exports.default = function (_ref) {
	var product = _ref.product,
	    add = _ref.add;

	return _react2.default.createElement('div', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]) + ' ' + 'product-item',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 6
		}
	}, _react2.default.createElement('div', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]) + ' ' + 'overlay-container',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 7
		}
	}, _react2.default.createElement('div', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]) + ' ' + 'product-img',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 8
		}
	}), _react2.default.createElement('div', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]) + ' ' + 'overlay',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 9
		}
	}, _react2.default.createElement(_link2.default, { href: { pathname: '/product', query: { id: product.id } }, __source: {
			fileName: _jsxFileName,
			lineNumber: 10
		}
	}, _react2.default.createElement('a', { href: '/product?id=' + product.id, className: _style2.default.dynamic([['1977492960', [product.image]]]) + ' ' + 'button',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 10
		}
	}, 'View Details')), _react2.default.createElement('button', { onClick: add, className: _style2.default.dynamic([['1977492960', [product.image]]]),
		__source: {
			fileName: _jsxFileName,
			lineNumber: 11
		}
	}, 'Add to Cart'))), _react2.default.createElement('span', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]),
		__source: {
			fileName: _jsxFileName,
			lineNumber: 14
		}
	}, product.brand), _react2.default.createElement('h4', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]),
		__source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, product.title), _react2.default.createElement('span', {
		className: _style2.default.dynamic([['1977492960', [product.image]]]) + ' ' + 'price',
		__source: {
			fileName: _jsxFileName,
			lineNumber: 16
		}
	}, _react2.default.createElement(_reactIntl.FormattedNumber, { value: product.price, style: 'currency', currency: 'USD', __source: {
			fileName: _jsxFileName,
			lineNumber: 16
		}
	})), _react2.default.createElement(_style2.default, {
		styleId: '1977492960',
		css: '.product-item.__jsx-style-dynamic-selector{display:inline-block;margin:0.75em;width:100%;max-width:18em;position:relative}.product-item.__jsx-style-dynamic-selector .overlay-container.__jsx-style-dynamic-selector{position:relative;margin-bottom:0.5em}.product-item.__jsx-style-dynamic-selector .overlay-container.__jsx-style-dynamic-selector .overlay.__jsx-style-dynamic-selector{display:none;padding-top:40px}.product-item.__jsx-style-dynamic-selector .overlay-container.__jsx-style-dynamic-selector .overlay.__jsx-style-dynamic-selector button.__jsx-style-dynamic-selector{display:block;margin:40px auto auto}.product-item.__jsx-style-dynamic-selector h4.__jsx-style-dynamic-selector{font-size:0.8em;text-transform:uppercase;padding:10px 0}.product-item.__jsx-style-dynamic-selector .price.__jsx-style-dynamic-selector{display:block;padding-bottom:10px}.product-item.__jsx-style-dynamic-selector .overlay-container.__jsx-style-dynamic-selector .product-img.__jsx-style-dynamic-selector{background-size:cover;background-position:center center;background-image:url("/static/' + product.image + '");width:18em;height:18em;position:relative;overflow:hidden;cursor:pointer;-webkit-transition:box-shadow 0.25s;transition:box-shadow 0.25s}.product-item.__jsx-style-dynamic-selector:hover .overlay-container.__jsx-style-dynamic-selector .overlay.__jsx-style-dynamic-selector{display:block;position:absolute;background-color:rgba(0,0,0,0.1);top:0;left:0;width:100%;height:100%;font-size:5em;color:white;text-shadow:0 0 5px rgba(0,0,0,0.5),0 0 10px rgba(0,0,0,0.5);-webkit-transition:all 0.25s;transition:all 0.25s}.product-item.__jsx-style-dynamic-selector:hover{box-shadow:0 12px 15px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUHJvZHVjdEl0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJjLEFBRzBCLEFBUUgsQUFLTCxBQU1DLEFBS0UsQUFNRixBQUtRLEFBWVIsQUFjMkQsYUEvQ3hELENBTUssQUFXRixBQWlCRixFQXZCTyxFQWhCTCxHQVJOLENBbUN1QixRQXJCdEMsRUFrQ29DLEVBakJwQyxDQTlCWSxDQW1CWixFQVhBLEdBZ0JnQixLQXZCQSxVQXdCaEIsQUFVaUUsS0FqQzlDLElBOENaLE1BQ0MsRUFXUixLQVZZLENBL0NaLFVBZ0RhLFlBQ0UsY0FDRixFQWpCRCxVQWtCbUQsQ0FqQmxELFlBQ00sa0JBQ0YsZ0JBQ0QsY0FlTSxDQWRPLGlEQWU3QixlQWRBIiwiZmlsZSI6ImNvbXBvbmVudHMvUHJvZHVjdEl0ZW0uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dvbnphbG9iZW5pdGV6L0RvY3VtZW50cy9zdG9yZWZyb250L25leHQtc3RvcmVmcm9udCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdHRlZE51bWJlciB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5cbmV4cG9ydCBkZWZhdWx0ICh7IHByb2R1Y3QsIGFkZCB9KSA9PiB7XG4gIHJldHVybiAoXG4gIFx0PGRpdiBjbGFzc05hbWU9XCJwcm9kdWN0LWl0ZW1cIiA+XG5cdCAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJsYXktY29udGFpbmVyXCI+XG5cdCAgICBcdDxkaXYgY2xhc3NOYW1lPVwicHJvZHVjdC1pbWdcIj48L2Rpdj5cblx0ICAgIFx0PGRpdiBjbGFzc05hbWU9XCJvdmVybGF5XCI+XG5cdFx0XHQgICAgPExpbmsgaHJlZj17eyBwYXRobmFtZTogJy9wcm9kdWN0JywgcXVlcnk6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9fT48YSBocmVmPXsgYC9wcm9kdWN0P2lkPSR7IHByb2R1Y3QuaWQgfWAgfSBjbGFzc05hbWU9XCJidXR0b25cIj5WaWV3IERldGFpbHM8L2E+PC9MaW5rPlxuXHQgICAgXHQgICAgPGJ1dHRvbiBvbkNsaWNrPXsgYWRkIH0+QWRkIHRvIENhcnQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHQgICAgPC9kaXY+XG5cdCAgICA8c3Bhbj57IHByb2R1Y3QuYnJhbmQgfTwvc3Bhbj5cblx0ICAgIDxoND57IHByb2R1Y3QudGl0bGUgfTwvaDQ+XG5cdCAgICA8c3BhbiBjbGFzc05hbWU9XCJwcmljZVwiPjxGb3JtYXR0ZWROdW1iZXIgdmFsdWU9eyBwcm9kdWN0LnByaWNlIH0gc3R5bGU9XCJjdXJyZW5jeVwiIGN1cnJlbmN5PXsgJ1VTRCcgfSAvPjwvc3Bhbj5cblxuXHRcdDxzdHlsZSBqc3g+e2Bcblx0XHRcdC5wcm9kdWN0LWl0ZW0ge1xuXHRcdFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHRcdG1hcmdpbjogMC43NWVtO1xuXHRcdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdFx0bWF4LXdpZHRoOiAxOGVtO1xuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0XHR9XG5cblx0XHRcdC5wcm9kdWN0LWl0ZW0gLm92ZXJsYXktY29udGFpbmVyIHtcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdFx0XHRtYXJnaW4tYm90dG9tOiAwLjVlbTtcblx0XHRcdH1cblxuXHRcdFx0LnByb2R1Y3QtaXRlbSAub3ZlcmxheS1jb250YWluZXIgLm92ZXJsYXkge1xuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xuXHRcdFx0XHRwYWRkaW5nLXRvcDogNDBweDtcblx0XHRcdH1cblxuXG5cdFx0XHQucHJvZHVjdC1pdGVtIC5vdmVybGF5LWNvbnRhaW5lciAub3ZlcmxheSBidXR0b24ge1xuXHRcdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRcdFx0bWFyZ2luOiA0MHB4IGF1dG8gYXV0bztcblx0XHRcdH1cblxuXHRcdFx0LnByb2R1Y3QtaXRlbSBoNCB7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMC44ZW07XG5cdFx0XHRcdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5cdFx0XHRcdHBhZGRpbmc6IDEwcHggMDtcblx0XHRcdH1cblxuXHRcdFx0LnByb2R1Y3QtaXRlbSAucHJpY2Uge1xuXHRcdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRcdFx0cGFkZGluZy1ib3R0b206IDEwcHg7XG5cdFx0XHR9XG5cblx0XHRcdC5wcm9kdWN0LWl0ZW0gLm92ZXJsYXktY29udGFpbmVyIC5wcm9kdWN0LWltZyB7XG5cdFx0XHRcdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgXHRcdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgICBcdFx0XHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvc3RhdGljLyR7IHByb2R1Y3QuaW1hZ2UgfVwiKTtcblx0XHRcdFx0d2lkdGg6IDE4ZW07XG5cdFx0XHRcdGhlaWdodDogMThlbTtcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0XHRcdHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4yNXM7XG5cdFx0XHR9XG5cblx0XHRcdC5wcm9kdWN0LWl0ZW06aG92ZXIgLm92ZXJsYXktY29udGFpbmVyIC5vdmVybGF5IHtcblx0XHRcdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsIDAsIDAsIDAuMSk7XG5cdFx0XHRcdHRvcDogMDtcblx0XHRcdFx0bGVmdDogMDtcblx0XHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRcdGhlaWdodDogMTAwJTtcblx0XHRcdFx0Zm9udC1zaXplOiA1ZW07XG5cdFx0XHRcdGNvbG9yOiB3aGl0ZTtcblx0XHRcdFx0dGV4dC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLDAsMCwwLjUpLCAwIDAgMTBweCByZ2JhKDAsMCwwLDAuNSk7IFxuXHRcdFx0XHR0cmFuc2l0aW9uOiBhbGwgMC4yNXM7XG5cdFx0XHR9XG5cblx0XHRcdC5wcm9kdWN0LWl0ZW06aG92ZXIge1xuXHRcdFx0XHRib3gtc2hhZG93OiAwIDEycHggMTVweCAwIHJnYmEoMCwwLDAsMC4yNCksMCAxN3B4IDUwcHggMCByZ2JhKDAsMCwwLDAuMTkpO1xuXHRcdFx0fVxuXHRcdGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl19 */\n/*@ sourceURL=components/ProductItem.js */',
		dynamic: [product.image]
	}));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUHJvZHVjdEl0ZW0uanMiXSwibmFtZXMiOlsiRm9ybWF0dGVkTnVtYmVyIiwiTGluayIsInByb2R1Y3QiLCJhZGQiLCJpbWFnZSIsInBhdGhuYW1lIiwicXVlcnkiLCJpZCIsImJyYW5kIiwidGl0bGUiLCJwcmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFTOztBQUNULEFBQU8sQUFFUDs7Ozs7Ozs7a0JBQWUsZ0JBQXNCO0tBQW5CLEFBQW1CLGVBQW5CLEFBQW1CO0tBQVYsQUFBVSxXQUFWLEFBQVUsQUFDbkM7O3dCQUNDLGNBQUE7c0RBbURzQyxRQW5EdEMsQUFtRDhDLGtCQW5EOUMsQUFBZTs7YUFBZjtlQUFBLEFBQ0U7QUFERjtBQUFBLEVBQUEsa0JBQ0UsY0FBQTtzREFrRG9DLFFBbERwQyxBQWtENEMsa0JBbEQ1QyxBQUFlOzthQUFmO2VBQUEsQUFDQztBQUREO0FBQUE7c0RBa0RvQyxRQWpEbkMsQUFpRDJDLGtCQWpEM0MsQUFBZTs7YUFBZjtlQURELEFBQ0MsQUFDQTtBQURBO0FBQUEscUJBQ0EsY0FBQTtzREFnRG1DLFFBaERuQyxBQWdEMkMsa0JBaEQzQyxBQUFlOzthQUFmO2VBQUEsQUFDQztBQUREO0FBQUEsb0JBQ0MsQUFBQyxnQ0FBSyxNQUFNLEVBQUUsVUFBRixBQUFZLFlBQVksT0FBTyxFQUFFLElBQUksUUFBakQsQUFBWSxBQUErQixBQUFjO2FBQXpEO2VBQUEsQUFBaUU7QUFBakU7b0JBQWlFLGNBQUEsT0FBRyx1QkFBdUIsUUFBMUIsQUFBa0Msd0RBK0NqRSxRQS9DK0IsQUErQ3ZCLGtCQS9DdUIsQUFBb0Q7O2FBQXBEO2VBQUE7QUFBQTtJQURsRSxBQUNDLEFBQWlFLEFBQzlELGtDQUFBLGNBQUEsWUFBUSxTQUFSLEFBQWtCLHlEQThDYSxRQTlDL0IsQUE4Q3VDOzthQTlDdkM7ZUFBQTtBQUFBO0lBTFAsQUFDRSxBQUVDLEFBRUksQUFHTCxrQ0FBQSxjQUFBO3NEQTJDb0MsUUEzQ3BDLEFBMkM0Qzs7YUEzQzVDO2VBQUEsQUFBUTtBQUFSO0FBQUEsWUFSRixBQVFFLEFBQWdCLEFBQ2hCLHdCQUFBLGNBQUE7c0RBMENvQyxRQTFDcEMsQUEwQzRDOzthQTFDNUM7ZUFBQSxBQUFNO0FBQU47QUFBQSxZQVRGLEFBU0UsQUFBYyxBQUNkLHdCQUFBLGNBQUE7c0RBeUNvQyxRQXpDcEMsQUF5QzRDLGtCQXpDNUMsQUFBZ0I7O2FBQWhCO2VBQUEsQUFBd0I7QUFBeEI7QUFBQSxvQkFBd0IsQUFBQyw0Q0FBZ0IsT0FBUSxRQUF6QixBQUFpQyxPQUFRLE9BQXpDLEFBQStDLFlBQVcsVUFBMUQsQUFBcUU7YUFBckU7ZUFWMUIsQUFVRSxBQUF3QjtBQUFBOztXQVYxQjs4akNBbURzQyxRQW5EdEMsQUFtRDhDLFFBbkQ5QztZQW1Ec0MsUUFwRHZDLEFBQ0MsQUFtRDhDLEFBNkJoRDtBQWhGRTtBQUZIIiwiZmlsZSI6IlByb2R1Y3RJdGVtLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nb256YWxvYmVuaXRlei9Eb2N1bWVudHMvc3RvcmVmcm9udC9uZXh0LXN0b3JlZnJvbnQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/ProductItem.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/gonzalobenitez/Documents/storefront/next-storefront/components/ProductItem.js"); } } })();

/***/ })
],[429]);
            return { page: comp.default }
          })
        