(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
(function (global, factory) {

	"use strict";

	if (typeof module === "object" && typeof module.exports === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	var isFunction = function isFunction(obj) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	};

	var isWindow = function isWindow(obj) {
		return obj != null && obj === obj.window;
	};

	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval(code, doc, node) {
		doc = doc || document;

		var i,
		    script = doc.createElement("script");

		script.text = code;
		if (node) {
			for (i in preservedScriptAttributes) {
				if (node[i]) {
					script[i] = node[i];
				}
			}
		}
		doc.head.appendChild(script).parentNode.removeChild(script);
	}

	function toType(obj) {
		if (obj == null) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


	var version = "3.3.1",


	// Define a local copy of jQuery
	jQuery = function (selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function () {
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function (num) {

			// Return all the elements in a clean array
			if (num == null) {
				return slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function (elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function (callback) {
			return jQuery.each(this, callback);
		},

		map: function (callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function () {
			return this.pushStack(slice.apply(this, arguments));
		},

		first: function () {
			return this.eq(0);
		},

		last: function () {
			return this.eq(-1);
		},

		eq: function (i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function () {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function (msg) {
			throw new Error(msg);
		},

		noop: function () {},

		isPlainObject: function (obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function (obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		// Evaluates a script in a global context
		globalEval: function (code) {
			DOMEval(code);
		},

		each: function (obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function (text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function (arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function (elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function (first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function (elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function (elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = toType(obj);

		if (isFunction(obj) || isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.3.3
  * https://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2016-08-08
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function (a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function (list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,


		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function (_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    fcssescape = function (ch, asCodePoint) {
			if (asCodePoint) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if (ch === "\0") {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function () {
			setDocument();
		},
		    disabledAncestor = addCombinator(function (elem) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		}, { dir: "parentNode", next: "legend" });

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							while (i--) {
								groups[i] = "#" + nid + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
		function assert(fn) {
			var el = document.createElement("fieldset");

			try {
				return !!fn(el);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
				// release memory in IE
				el = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
		function createDisabledPseudo(disabled) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function (elem) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ("form" in elem) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if (elem.parentNode && elem.disabled === false) {

						// Option elements defer to a parent optgroup if present
						if ("label" in elem) {
							if ("label" in elem.parentNode) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
					}

					return elem.disabled === disabled;

					// Try to winnow out elements that can't be disabled before trusting the disabled property.
					// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
					// even exist on them, let alone have a boolean value.
				} else if ("label" in elem) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    subWindow,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

				// Support: IE 11, Edge
				if (subWindow.addEventListener) {
					subWindow.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (subWindow.attachEvent) {
					subWindow.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (el) {
				el.className = "i";
				return !el.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (el) {
				el.appendChild(document.createComment(""));
				return !el.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (el) {
				docElem.appendChild(el).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID filter and find
			if (support.getById) {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var elem = context.getElementById(id);
						return elem ? [elem] : [];
					}
				};
			} else {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var node,
						    i,
						    elems,
						    elem = context.getElementById(id);

						if (elem) {

							// Verify the id attribute
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName(id);
							i = 0;
							while (elem = elems[i++]) {
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (el) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (el.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!el.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!el.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if (!el.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (el) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					el.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (el.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (el.querySelectorAll(":enabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild(el).disabled = true;
					if (el.querySelectorAll(":disabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (el) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(el, "*");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(el, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.escape = function (sel) {
			return (sel + "").replace(rcssescape, fcssescape);
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function (match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function (match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function (match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function (nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function (className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function (name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function (type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function (pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function (elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function (elem) {
					return elem === docElem;
				},

				"focus": function (elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": createDisabledPseudo(false),
				"disabled": createDisabledPseudo(true),

				"checked": function (elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function (elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function (elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function (elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function (elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function (elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function (elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function (elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    skip = combinator.next,
			    key = skip || dir,
			    checkNonElements = base && key === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if (skip && skip === elem.nodeName.toLowerCase()) {
								elem = elem[dir] || elem;
							} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[key] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function (seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (el) {
			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (el) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (el) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute("value", "");
			return el.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (el) {
			return el.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function (elem, dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var siblings = function (n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};
	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Filtered directly for both simple and complex selectors
		return jQuery.filter(qualifier, elements, not);
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function (selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function (selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function (selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function (selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function (target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function (selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function (elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function (selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function (selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function (elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function (elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function (elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function (elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function (elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function (elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function (elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function (elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function (elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function (elem) {
			return siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function (elem) {
			return siblings(elem.firstChild);
		},
		contents: function (elem) {
			if (nodeName(elem, "iframe")) {
				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}

			return jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		fired,


		// Flag to prevent firing
		locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function () {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function () {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && toType(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function () {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function (fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function () {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function () {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function () {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function () {
				locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function () {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function (context, args) {
				if (!locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function () {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function () {
				return !!fired;
			}
		};

		return self;
	};

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}

	jQuery.extend({

		Deferred: function (func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    state = "pending",
			    promise = {
				state: function () {
					return state;
				},
				always: function () {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function (fn) {
					return promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function () /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function (onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function () {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								typeof returned === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function (obj) {
					return obj != null ? jQuery.extend(obj, promise) : promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[3 - i][3].disable,

					// progress_callbacks.lock
					tuples[0][2].lock,

					// progress_handlers.lock
					tuples[0][3].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function (singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function (i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function (wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (toType(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function (elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};

	// Matches dashed string for camelizing
	var rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g;

	// Used by camelCase as callback to replace()
	function fcamelCase(all, letter) {
		return letter.toUpperCase();
	}

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	function camelCase(string) {
		return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	}
	var acceptData = function (owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function (owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function (owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function (owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][camelCase(key)];
		},
		access: function (owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function (owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (Array.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(camelCase);
				} else {
					key = camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function (owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function (elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function (elem, name, data) {
			return dataUser.access(elem, name, data);
		},

		removeData: function (elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function (elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function (elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function (key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if (typeof key === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function (key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function (elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function (elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function () {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function (elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function (type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function (type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function (type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function (type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function () {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function (elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function (elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Support: Firefox <=54
			// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
			initial = initial / 2;

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			while (maxIterations--) {

				// Evaluate and update our best guess (doubling guesses that zero out).
				// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
				jQuery.style(elem, prop, initialInUnit + unit);
				if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
					maxIterations = 0;
				}
				initialInUnit = initialInUnit / scale;
			}

			initialInUnit = initialInUnit * 2;
			jQuery.style(elem, prop, initialInUnit + unit);

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function () {
			return showHide(this, true);
		},
		hide: function () {
			return showHide(this);
		},
		toggle: function (state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (toType(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if (typeof types === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function (event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function (elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function (elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function (nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function (event, handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < handlers.length) {
				handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function (name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function (value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function (originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function () {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function () {
					if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function (event) {
					return nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function (event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || Date.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function () {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function () {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function () {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function (event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function (event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn);
		},
		one: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1);
		},
		off: function (types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if (typeof types === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return jQuery(elem).children("tbody")[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		if ((elem.type || "").slice(0, 5) === "true/") {
			elem.type = elem.type.slice(5);
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    valueIsFunction = isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (valueIsFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src && (node.type || "").toLowerCase() !== "module") {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc, node);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function (html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function (elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function (elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function (selector) {
			return remove(this, selector, true);
		},

		remove: function (selector) {
			return remove(this, selector);
		},

		text: function (value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function () {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function (dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function (value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function () {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function (elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	var rboxStyle = new RegExp(cssExpand.join("|"), "i");

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
			div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
			documentElement.appendChild(container).appendChild(div);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

			// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
			// Some styles come back with percentage values, even though they shouldn't
			div.style.right = "60%";
			pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

			// Support: IE 9 - 11 only
			// Detect misreporting of content dimensions for box-sizing:border-box elements
			boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

			// Support: IE 9 only
			// Detect overflow:scroll screwiness (gh-3699)
			div.style.position = "absolute";
			scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		function roundPixelMeasures(measure) {
			return Math.round(parseFloat(measure));
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    scrollboxSizeVal,
		    pixelBoxStylesVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		jQuery.extend(support, {
			boxSizingReliable: function () {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelBoxStyles: function () {
				computeStyleTests();
				return pixelBoxStylesVal;
			},
			pixelPosition: function () {
				computeStyleTests();
				return pixelPositionVal;
			},
			reliableMarginLeft: function () {
				computeStyleTests();
				return reliableMarginLeftVal;
			},
			scrollboxSize: function () {
				computeStyleTests();
				return scrollboxSizeVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,


		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function () {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rcustomProp = /^--/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		var ret = jQuery.cssProps[name];
		if (!ret) {
			ret = jQuery.cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
		var i = dimension === "width" ? 1 : 0,
		    extra = 0,
		    delta = 0;

		// Adjustment may not be necessary
		if (box === (isBorderBox ? "border" : "content")) {
			return 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin
			if (box === "margin") {
				delta += jQuery.css(elem, box + cssExpand[i], true, styles);
			}

			// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
			if (!isBorderBox) {

				// Add padding
				delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// For "border" or "margin", add border
				if (box !== "padding") {
					delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

					// But still keep track of it otherwise
				} else {
					extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}

				// If we get here with a border-box (content + padding + border), we're seeking "content" or
				// "padding" or "margin"
			} else {

				// For "content", subtract padding
				if (box === "content") {
					delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// For "content" or "padding", subtract border
				if (box !== "margin") {
					delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		// Account for positive content-box scroll gutter when requested by providing computedVal
		if (!isBorderBox && computedVal >= 0) {

			// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
			// Assuming integer scroll gutter, subtract the rest and round down
			delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5));
		}

		return delta;
	}

	function getWidthOrHeight(elem, dimension, extra) {

		// Start with computed style
		var styles = getStyles(elem),
		    val = curCSS(elem, dimension, styles),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box",
		    valueIsBorderBox = isBorderBox;

		// Support: Firefox <=54
		// Return a confounding non-pixel value or feign ignorance, as appropriate.
		if (rnumnonpx.test(val)) {
			if (!extra) {
				return val;
			}
			val = "auto";
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = valueIsBorderBox && (support.boxSizingReliable() || val === elem.style[dimension]);

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		if (val === "auto" || !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") {

			val = elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)];

			// offsetWidth/offsetHeight provide border-box values
			valueIsBorderBox = true;
		}

		// Normalize "" and auto
		val = parseFloat(val) || 0;

		// Adjust for the element's box model
		return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles,

		// Provide the current computed size to request scroll gutter calculation (gh-3589)
		val) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function (elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {},

		// Get and set the style property on a DOM Node
		style: function (elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = camelCase(name),
			    isCustomProp = rcustomProp.test(name),
			    style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function (elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = camelCase(name),
			    isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, dimension) {
		jQuery.cssHooks[dimension] = {
			get: function (elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, dimension, extra);
					}) : getWidthOrHeight(elem, dimension, extra);
				}
			},

			set: function (elem, value, extra) {
				var matches,
				    styles = getStyles(elem),
				    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box",
				    subtract = extra && boxModelAdjustment(elem, dimension, extra, isBorderBox, styles);

				// Account for unreliable border-box dimensions by comparing offset* to computed and
				// faking a content-box to get border and padding (gh-3699)
				if (isBorderBox && support.scrollboxSize() === styles.position) {
					subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
				}

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[dimension] = value;
					value = jQuery.css(elem, dimension);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function (value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (prefix !== "margin") {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function (name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function (elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function () {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function (percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function (tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function (tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function (tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function (p) {
			return p;
		},
		swing: function (p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    inProgress,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = Date.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 15
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY and Edge just mirrors
			// the overflowX value there.
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function () {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(elem, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(elem, [animation]);
			return false;
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function (prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function (gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		// Attach callbacks from options
		animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function (props, callback) {
			if (isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function (callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !isFunction(easing) && easing
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function (speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function (prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function () {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function (type, clearQueue, gotoEnd) {
			var stopQueue = function (hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function (type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = Date.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function (name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function (name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function (elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function (elem, value) {
					if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function (elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function (elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function (name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function (name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function (elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function (elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function (elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function (elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	function classesToArray(value) {
		if (Array.isArray(value)) {
			return value;
		}
		if (typeof value === "string") {
			return value.match(rnothtmlwhite) || [];
		}
		return [];
	}

	jQuery.fn.extend({
		addClass: function (value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			classes = classesToArray(value);

			if (classes.length) {
				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function (value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			classes = classesToArray(value);

			if (classes.length) {
				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function (value, stateVal) {
			var type = typeof value,
			    isValidValue = type === "string" || Array.isArray(value);

			if (typeof stateVal === "boolean" && isValidValue) {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (isValidValue) {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = classesToArray(value);

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function (selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function (value) {
			var hooks,
			    ret,
			    valueIsFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			valueIsFunction = isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (valueIsFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function (elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function (elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function (elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function (elem, value) {
				if (Array.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	support.focusin = "onfocusin" in window;

	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	    stopPropagationCallback = function (e) {
		e.stopPropagation();
	};

	jQuery.extend(jQuery.event, {

		trigger: function (event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    lastElement,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = lastElement = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				lastElement = cur;
				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && isFunction(elem[type]) && !isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;

						if (event.isPropagationStopped()) {
							lastElement.addEventListener(type, stopPropagationCallback);
						}

						elem[type]();

						if (event.isPropagationStopped()) {
							lastElement.removeEventListener(type, stopPropagationCallback);
						}

						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function (type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function (type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function (type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function (event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function () {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function () {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = Date.now();

	var rquery = /\?/;

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (Array.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && toType(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function (key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function () {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function () {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (Array.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function (target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function (url, options) {

			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function (key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function () {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function (name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function (type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function (map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								statusCode[code] = [statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function (statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 15
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available and should be processed, append data to url
				if (s.data && (s.processData || typeof s.data === "string")) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function (url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function (url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function (html) {
			var wrap;

			if (this[0]) {
				if (isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function (html) {
			if (isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function (html) {
			var htmlIsFunction = isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function (selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function (headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function (type) {
						return function () {
							if (callback) {
								callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					callback = callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw e;
						}
					}
				},

				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, callback;
			return {
				send: function (_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", callback = function (evt) {
						script.remove();
						callback = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && typeof params === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	jQuery.offset = {
		setOffset: function (elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({

		// offset() relates an element's border box to the document origin
		offset: function (options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var rect,
			    win,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			// Get document-relative position by adding viewport scroll to viewport-relative gBCR
			rect = elem.getBoundingClientRect();
			win = elem.ownerDocument.defaultView;
			return {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset
			};
		},

		// position() relates an element's margin box to its offset parent's padding box
		// This corresponds to the behavior of CSS absolute positioning
		position: function () {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    doc,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// position:fixed elements are offset from the viewport, which itself always has zero offset
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume position:fixed implies availability of getBoundingClientRect
				offset = elem.getBoundingClientRect();
			} else {
				offset = this.offset();

				// Account for the *real* offset parent, which can be the document or its root element
				// when a statically positioned element is identified
				doc = elem.ownerDocument;
				offsetParent = elem.offsetParent || doc.documentElement;
				while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {

					offsetParent = offsetParent.parentNode;
				}
				if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

					// Incorporate borders into its offset, since they are outside its content origin
					parentOffset = jQuery(offsetParent).offset();
					parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
					parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
				}
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function () {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {

				// Coalesce documents and windows
				var win;
				if (isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function (fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	jQuery.fn.extend({

		bind: function (types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function (types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function (selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function (selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	// Bind a function to a context, optionally partially applying any
	// arguments.
	// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	// However, it is not slated for removal any time soon
	jQuery.proxy = function (fn, context) {
		var tmp, args, proxy;

		if (typeof context === "string") {
			tmp = fn[context];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if (!isFunction(fn)) {
			return undefined;
		}

		// Simulated bind
		args = slice.call(arguments, 2);
		proxy = function () {
			return fn.apply(context || this, args.concat(slice.call(arguments)));
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	};

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;
	jQuery.isFunction = isFunction;
	jQuery.isWindow = isWindow;
	jQuery.camelCase = camelCase;
	jQuery.type = toType;

	jQuery.now = Date.now;

	jQuery.isNumeric = function (obj) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type(obj);
		return (type === "number" || type === "string") &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN(obj - parseFloat(obj));
	};

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWN0b3J5IiwibW9kdWxlIiwiZXhwb3J0cyIsImRvY3VtZW50IiwidyIsIkVycm9yIiwid2luZG93Iiwibm9HbG9iYWwiLCJhcnIiLCJnZXRQcm90byIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwic2xpY2UiLCJjb25jYXQiLCJwdXNoIiwiaW5kZXhPZiIsImNsYXNzMnR5cGUiLCJ0b1N0cmluZyIsImhhc093biIsImhhc093blByb3BlcnR5IiwiZm5Ub1N0cmluZyIsIk9iamVjdEZ1bmN0aW9uU3RyaW5nIiwiY2FsbCIsInN1cHBvcnQiLCJpc0Z1bmN0aW9uIiwib2JqIiwibm9kZVR5cGUiLCJpc1dpbmRvdyIsInByZXNlcnZlZFNjcmlwdEF0dHJpYnV0ZXMiLCJ0eXBlIiwic3JjIiwibm9Nb2R1bGUiLCJET01FdmFsIiwiY29kZSIsImRvYyIsIm5vZGUiLCJpIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInRleHQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0b1R5cGUiLCJ2ZXJzaW9uIiwialF1ZXJ5Iiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZm4iLCJpbml0IiwicnRyaW0iLCJwcm90b3R5cGUiLCJqcXVlcnkiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsInRvQXJyYXkiLCJnZXQiLCJudW0iLCJwdXNoU3RhY2siLCJlbGVtcyIsInJldCIsIm1lcmdlIiwicHJldk9iamVjdCIsImVhY2giLCJjYWxsYmFjayIsIm1hcCIsImVsZW0iLCJhcHBseSIsImFyZ3VtZW50cyIsImZpcnN0IiwiZXEiLCJsYXN0IiwibGVuIiwiaiIsImVuZCIsInNvcnQiLCJzcGxpY2UiLCJleHRlbmQiLCJvcHRpb25zIiwibmFtZSIsImNvcHkiLCJjb3B5SXNBcnJheSIsImNsb25lIiwidGFyZ2V0IiwiZGVlcCIsImlzUGxhaW5PYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJleHBhbmRvIiwiTWF0aCIsInJhbmRvbSIsInJlcGxhY2UiLCJpc1JlYWR5IiwiZXJyb3IiLCJtc2ciLCJub29wIiwicHJvdG8iLCJDdG9yIiwiaXNFbXB0eU9iamVjdCIsImdsb2JhbEV2YWwiLCJpc0FycmF5TGlrZSIsInRyaW0iLCJtYWtlQXJyYXkiLCJyZXN1bHRzIiwiaW5BcnJheSIsInNlY29uZCIsImdyZXAiLCJpbnZlcnQiLCJjYWxsYmFja0ludmVyc2UiLCJtYXRjaGVzIiwiY2FsbGJhY2tFeHBlY3QiLCJhcmciLCJ2YWx1ZSIsImd1aWQiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwbGl0IiwidG9Mb3dlckNhc2UiLCJTaXp6bGUiLCJFeHByIiwiZ2V0VGV4dCIsImlzWE1MIiwidG9rZW5pemUiLCJjb21waWxlIiwic2VsZWN0Iiwib3V0ZXJtb3N0Q29udGV4dCIsInNvcnRJbnB1dCIsImhhc0R1cGxpY2F0ZSIsInNldERvY3VtZW50IiwiZG9jRWxlbSIsImRvY3VtZW50SXNIVE1MIiwicmJ1Z2d5UVNBIiwicmJ1Z2d5TWF0Y2hlcyIsImNvbnRhaW5zIiwiRGF0ZSIsInByZWZlcnJlZERvYyIsImRpcnJ1bnMiLCJkb25lIiwiY2xhc3NDYWNoZSIsImNyZWF0ZUNhY2hlIiwidG9rZW5DYWNoZSIsImNvbXBpbGVyQ2FjaGUiLCJzb3J0T3JkZXIiLCJhIiwiYiIsInBvcCIsInB1c2hfbmF0aXZlIiwibGlzdCIsImJvb2xlYW5zIiwid2hpdGVzcGFjZSIsImlkZW50aWZpZXIiLCJhdHRyaWJ1dGVzIiwicHNldWRvcyIsInJ3aGl0ZXNwYWNlIiwiUmVnRXhwIiwicmNvbW1hIiwicmNvbWJpbmF0b3JzIiwicmF0dHJpYnV0ZVF1b3RlcyIsInJwc2V1ZG8iLCJyaWRlbnRpZmllciIsIm1hdGNoRXhwciIsInJpbnB1dHMiLCJyaGVhZGVyIiwicm5hdGl2ZSIsInJxdWlja0V4cHIiLCJyc2libGluZyIsInJ1bmVzY2FwZSIsImZ1bmVzY2FwZSIsIl8iLCJlc2NhcGVkIiwiZXNjYXBlZFdoaXRlc3BhY2UiLCJoaWdoIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicmNzc2VzY2FwZSIsImZjc3Nlc2NhcGUiLCJjaCIsImFzQ29kZVBvaW50IiwiY2hhckNvZGVBdCIsInVubG9hZEhhbmRsZXIiLCJkaXNhYmxlZEFuY2VzdG9yIiwiYWRkQ29tYmluYXRvciIsImRpc2FibGVkIiwiZGlyIiwibmV4dCIsImNoaWxkTm9kZXMiLCJlIiwiZWxzIiwic2VlZCIsIm0iLCJuaWQiLCJtYXRjaCIsImdyb3VwcyIsIm5ld1NlbGVjdG9yIiwibmV3Q29udGV4dCIsIm93bmVyRG9jdW1lbnQiLCJleGVjIiwiZ2V0RWxlbWVudEJ5SWQiLCJpZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInFzYSIsInRlc3QiLCJub2RlTmFtZSIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvU2VsZWN0b3IiLCJqb2luIiwidGVzdENvbnRleHQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicXNhRXJyb3IiLCJyZW1vdmVBdHRyaWJ1dGUiLCJrZXlzIiwiY2FjaGUiLCJrZXkiLCJjYWNoZUxlbmd0aCIsInNoaWZ0IiwibWFya0Z1bmN0aW9uIiwiYXNzZXJ0IiwiZWwiLCJhZGRIYW5kbGUiLCJhdHRycyIsImhhbmRsZXIiLCJhdHRySGFuZGxlIiwic2libGluZ0NoZWNrIiwiY3VyIiwiZGlmZiIsInNvdXJjZUluZGV4IiwibmV4dFNpYmxpbmciLCJjcmVhdGVJbnB1dFBzZXVkbyIsImNyZWF0ZUJ1dHRvblBzZXVkbyIsImNyZWF0ZURpc2FibGVkUHNldWRvIiwiaXNEaXNhYmxlZCIsImNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8iLCJhcmd1bWVudCIsIm1hdGNoSW5kZXhlcyIsImRvY3VtZW50RWxlbWVudCIsImhhc0NvbXBhcmUiLCJzdWJXaW5kb3ciLCJkZWZhdWx0VmlldyIsInRvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImNsYXNzTmFtZSIsImNyZWF0ZUNvbW1lbnQiLCJnZXRCeUlkIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJmaWx0ZXIiLCJhdHRySWQiLCJmaW5kIiwiZ2V0QXR0cmlidXRlTm9kZSIsInRhZyIsInRtcCIsImlubmVySFRNTCIsImlucHV0IiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwib01hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiZGlzY29ubmVjdGVkTWF0Y2giLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImFkb3duIiwiYnVwIiwiY29tcGFyZSIsInNvcnREZXRhY2hlZCIsImF1cCIsImFwIiwiYnAiLCJ1bnNoaWZ0IiwiZXhwciIsImVsZW1lbnRzIiwiYXR0ciIsInZhbCIsInNwZWNpZmllZCIsImVzY2FwZSIsInNlbCIsInVuaXF1ZVNvcnQiLCJkdXBsaWNhdGVzIiwiZGV0ZWN0RHVwbGljYXRlcyIsInNvcnRTdGFibGUiLCJ0ZXh0Q29udGVudCIsImZpcnN0Q2hpbGQiLCJub2RlVmFsdWUiLCJzZWxlY3RvcnMiLCJjcmVhdGVQc2V1ZG8iLCJyZWxhdGl2ZSIsInByZUZpbHRlciIsImV4Y2VzcyIsInVucXVvdGVkIiwibm9kZU5hbWVTZWxlY3RvciIsInBhdHRlcm4iLCJvcGVyYXRvciIsImNoZWNrIiwicmVzdWx0Iiwid2hhdCIsInNpbXBsZSIsImZvcndhcmQiLCJvZlR5cGUiLCJ4bWwiLCJ1bmlxdWVDYWNoZSIsIm91dGVyQ2FjaGUiLCJub2RlSW5kZXgiLCJzdGFydCIsInBhcmVudCIsInVzZUNhY2hlIiwibGFzdENoaWxkIiwidW5pcXVlSUQiLCJwc2V1ZG8iLCJhcmdzIiwic2V0RmlsdGVycyIsImlkeCIsIm1hdGNoZWQiLCJtYXRjaGVyIiwidW5tYXRjaGVkIiwiaW5uZXJUZXh0IiwibGFuZyIsImVsZW1MYW5nIiwiaGFzaCIsImxvY2F0aW9uIiwiYWN0aXZlRWxlbWVudCIsImhhc0ZvY3VzIiwiaHJlZiIsInRhYkluZGV4IiwiY2hlY2tlZCIsInNlbGVjdGVkIiwic2VsZWN0ZWRJbmRleCIsInJhZGlvIiwiY2hlY2tib3giLCJmaWxlIiwicGFzc3dvcmQiLCJpbWFnZSIsInN1Ym1pdCIsInJlc2V0IiwiZmlsdGVycyIsInBhcnNlT25seSIsInRva2VucyIsInNvRmFyIiwicHJlRmlsdGVycyIsImNhY2hlZCIsImNvbWJpbmF0b3IiLCJiYXNlIiwic2tpcCIsImNoZWNrTm9uRWxlbWVudHMiLCJkb25lTmFtZSIsIm9sZENhY2hlIiwibmV3Q2FjaGUiLCJlbGVtZW50TWF0Y2hlciIsIm1hdGNoZXJzIiwibXVsdGlwbGVDb250ZXh0cyIsImNvbnRleHRzIiwiY29uZGVuc2UiLCJuZXdVbm1hdGNoZWQiLCJtYXBwZWQiLCJzZXRNYXRjaGVyIiwicG9zdEZpbHRlciIsInBvc3RGaW5kZXIiLCJwb3N0U2VsZWN0b3IiLCJ0ZW1wIiwicHJlTWFwIiwicG9zdE1hcCIsInByZWV4aXN0aW5nIiwibWF0Y2hlckluIiwibWF0Y2hlck91dCIsIm1hdGNoZXJGcm9tVG9rZW5zIiwiY2hlY2tDb250ZXh0IiwibGVhZGluZ1JlbGF0aXZlIiwiaW1wbGljaXRSZWxhdGl2ZSIsIm1hdGNoQ29udGV4dCIsIm1hdGNoQW55Q29udGV4dCIsIm1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyIsImVsZW1lbnRNYXRjaGVycyIsInNldE1hdGNoZXJzIiwiYnlTZXQiLCJieUVsZW1lbnQiLCJzdXBlck1hdGNoZXIiLCJvdXRlcm1vc3QiLCJtYXRjaGVkQ291bnQiLCJzZXRNYXRjaGVkIiwiY29udGV4dEJhY2t1cCIsImRpcnJ1bnNVbmlxdWUiLCJ0b2tlbiIsImNvbXBpbGVkIiwiZGVmYXVsdFZhbHVlIiwidW5pcXVlIiwiaXNYTUxEb2MiLCJlc2NhcGVTZWxlY3RvciIsInVudGlsIiwidHJ1bmNhdGUiLCJpcyIsInNpYmxpbmdzIiwibiIsInJuZWVkc0NvbnRleHQiLCJuZWVkc0NvbnRleHQiLCJyc2luZ2xlVGFnIiwid2lubm93IiwicXVhbGlmaWVyIiwibm90Iiwic2VsZiIsInJvb3RqUXVlcnkiLCJyb290IiwicGFyc2VIVE1MIiwicmVhZHkiLCJycGFyZW50c3ByZXYiLCJndWFyYW50ZWVkVW5pcXVlIiwiY2hpbGRyZW4iLCJjb250ZW50cyIsInByZXYiLCJoYXMiLCJ0YXJnZXRzIiwibCIsImNsb3Nlc3QiLCJpbmRleCIsInByZXZBbGwiLCJhZGQiLCJhZGRCYWNrIiwic2libGluZyIsInBhcmVudHMiLCJwYXJlbnRzVW50aWwiLCJuZXh0QWxsIiwibmV4dFVudGlsIiwicHJldlVudGlsIiwiY29udGVudERvY3VtZW50IiwiY29udGVudCIsInJldmVyc2UiLCJybm90aHRtbHdoaXRlIiwiY3JlYXRlT3B0aW9ucyIsIm9iamVjdCIsImZsYWciLCJDYWxsYmFja3MiLCJmaXJpbmciLCJtZW1vcnkiLCJmaXJlZCIsImxvY2tlZCIsInF1ZXVlIiwiZmlyaW5nSW5kZXgiLCJmaXJlIiwib25jZSIsInN0b3BPbkZhbHNlIiwicmVtb3ZlIiwiZW1wdHkiLCJkaXNhYmxlIiwibG9jayIsImZpcmVXaXRoIiwiSWRlbnRpdHkiLCJ2IiwiVGhyb3dlciIsImV4IiwiYWRvcHRWYWx1ZSIsInJlc29sdmUiLCJyZWplY3QiLCJub1ZhbHVlIiwibWV0aG9kIiwicHJvbWlzZSIsImZhaWwiLCJ0aGVuIiwiRGVmZXJyZWQiLCJmdW5jIiwidHVwbGVzIiwic3RhdGUiLCJhbHdheXMiLCJkZWZlcnJlZCIsInBpcGUiLCJmbnMiLCJuZXdEZWZlciIsInR1cGxlIiwicmV0dXJuZWQiLCJwcm9ncmVzcyIsIm5vdGlmeSIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsIm9uUHJvZ3Jlc3MiLCJtYXhEZXB0aCIsImRlcHRoIiwic3BlY2lhbCIsInRoYXQiLCJtaWdodFRocm93IiwiVHlwZUVycm9yIiwibm90aWZ5V2l0aCIsInJlc29sdmVXaXRoIiwicHJvY2VzcyIsImV4Y2VwdGlvbkhvb2siLCJzdGFja1RyYWNlIiwicmVqZWN0V2l0aCIsImdldFN0YWNrSG9vayIsInNldFRpbWVvdXQiLCJzdGF0ZVN0cmluZyIsIndoZW4iLCJzaW5nbGVWYWx1ZSIsInJlbWFpbmluZyIsInJlc29sdmVDb250ZXh0cyIsInJlc29sdmVWYWx1ZXMiLCJtYXN0ZXIiLCJ1cGRhdGVGdW5jIiwicmVycm9yTmFtZXMiLCJzdGFjayIsImNvbnNvbGUiLCJ3YXJuIiwibWVzc2FnZSIsInJlYWR5RXhjZXB0aW9uIiwicmVhZHlMaXN0IiwiY2F0Y2giLCJyZWFkeVdhaXQiLCJ3YWl0IiwiY29tcGxldGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJkb1Njcm9sbCIsImFjY2VzcyIsImNoYWluYWJsZSIsImVtcHR5R2V0IiwicmF3IiwiYnVsayIsInJtc1ByZWZpeCIsInJkYXNoQWxwaGEiLCJmY2FtZWxDYXNlIiwiYWxsIiwibGV0dGVyIiwidG9VcHBlckNhc2UiLCJjYW1lbENhc2UiLCJzdHJpbmciLCJhY2NlcHREYXRhIiwib3duZXIiLCJEYXRhIiwidWlkIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJzZXQiLCJkYXRhIiwicHJvcCIsImhhc0RhdGEiLCJkYXRhUHJpdiIsImRhdGFVc2VyIiwicmJyYWNlIiwicm11bHRpRGFzaCIsImdldERhdGEiLCJKU09OIiwicGFyc2UiLCJkYXRhQXR0ciIsInJlbW92ZURhdGEiLCJfZGF0YSIsIl9yZW1vdmVEYXRhIiwiZGVxdWV1ZSIsInN0YXJ0TGVuZ3RoIiwiaG9va3MiLCJfcXVldWVIb29rcyIsInN0b3AiLCJzZXR0ZXIiLCJjbGVhclF1ZXVlIiwiY291bnQiLCJkZWZlciIsInBudW0iLCJzb3VyY2UiLCJyY3NzTnVtIiwiY3NzRXhwYW5kIiwiaXNIaWRkZW5XaXRoaW5UcmVlIiwic3R5bGUiLCJkaXNwbGF5IiwiY3NzIiwic3dhcCIsIm9sZCIsImFkanVzdENTUyIsInZhbHVlUGFydHMiLCJ0d2VlbiIsImFkanVzdGVkIiwic2NhbGUiLCJtYXhJdGVyYXRpb25zIiwiY3VycmVudFZhbHVlIiwiaW5pdGlhbCIsInVuaXQiLCJjc3NOdW1iZXIiLCJpbml0aWFsSW5Vbml0IiwiZGVmYXVsdERpc3BsYXlNYXAiLCJnZXREZWZhdWx0RGlzcGxheSIsImJvZHkiLCJzaG93SGlkZSIsInNob3ciLCJ2YWx1ZXMiLCJoaWRlIiwidG9nZ2xlIiwicmNoZWNrYWJsZVR5cGUiLCJydGFnTmFtZSIsInJzY3JpcHRUeXBlIiwid3JhcE1hcCIsIm9wdGlvbiIsInRoZWFkIiwiY29sIiwidHIiLCJ0ZCIsIl9kZWZhdWx0Iiwib3B0Z3JvdXAiLCJ0Ym9keSIsInRmb290IiwiY29sZ3JvdXAiLCJjYXB0aW9uIiwidGgiLCJnZXRBbGwiLCJzZXRHbG9iYWxFdmFsIiwicmVmRWxlbWVudHMiLCJyaHRtbCIsImJ1aWxkRnJhZ21lbnQiLCJzY3JpcHRzIiwic2VsZWN0aW9uIiwiaWdub3JlZCIsIndyYXAiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJub2RlcyIsImNyZWF0ZVRleHROb2RlIiwiaHRtbFByZWZpbHRlciIsImRpdiIsImNoZWNrQ2xvbmUiLCJjbG9uZU5vZGUiLCJub0Nsb25lQ2hlY2tlZCIsInJrZXlFdmVudCIsInJtb3VzZUV2ZW50IiwicnR5cGVuYW1lc3BhY2UiLCJyZXR1cm5UcnVlIiwicmV0dXJuRmFsc2UiLCJzYWZlQWN0aXZlRWxlbWVudCIsImVyciIsIm9uIiwidHlwZXMiLCJvbmUiLCJvcmlnRm4iLCJldmVudCIsIm9mZiIsImhhbmRsZU9iakluIiwiZXZlbnRIYW5kbGUiLCJldmVudHMiLCJ0IiwiaGFuZGxlT2JqIiwiaGFuZGxlcnMiLCJuYW1lc3BhY2VzIiwib3JpZ1R5cGUiLCJlbGVtRGF0YSIsImhhbmRsZSIsInRyaWdnZXJlZCIsImRpc3BhdGNoIiwiZGVsZWdhdGVUeXBlIiwiYmluZFR5cGUiLCJuYW1lc3BhY2UiLCJkZWxlZ2F0ZUNvdW50Iiwic2V0dXAiLCJtYXBwZWRUeXBlcyIsIm9yaWdDb3VudCIsInRlYXJkb3duIiwicmVtb3ZlRXZlbnQiLCJuYXRpdmVFdmVudCIsImZpeCIsImhhbmRsZXJRdWV1ZSIsImRlbGVnYXRlVGFyZ2V0IiwicHJlRGlzcGF0Y2giLCJpc1Byb3BhZ2F0aW9uU3RvcHBlZCIsImN1cnJlbnRUYXJnZXQiLCJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCIsInJuYW1lc3BhY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInBvc3REaXNwYXRjaCIsIm1hdGNoZWRIYW5kbGVycyIsIm1hdGNoZWRTZWxlY3RvcnMiLCJidXR0b24iLCJhZGRQcm9wIiwiaG9vayIsIkV2ZW50IiwiZW51bWVyYWJsZSIsIm9yaWdpbmFsRXZlbnQiLCJ3cml0YWJsZSIsImxvYWQiLCJub0J1YmJsZSIsImZvY3VzIiwidHJpZ2dlciIsImJsdXIiLCJjbGljayIsImJlZm9yZXVubG9hZCIsInJldHVyblZhbHVlIiwicHJvcHMiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJkZWZhdWx0UHJldmVudGVkIiwicmVsYXRlZFRhcmdldCIsInRpbWVTdGFtcCIsIm5vdyIsImlzU2ltdWxhdGVkIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWx0S2V5IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJjaGFuZ2VkVG91Y2hlcyIsImN0cmxLZXkiLCJkZXRhaWwiLCJldmVudFBoYXNlIiwibWV0YUtleSIsInBhZ2VYIiwicGFnZVkiLCJzaGlmdEtleSIsInZpZXciLCJjaGFyQ29kZSIsImtleUNvZGUiLCJidXR0b25zIiwiY2xpZW50WCIsImNsaWVudFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwic2NyZWVuWCIsInNjcmVlblkiLCJ0YXJnZXRUb3VjaGVzIiwidG9FbGVtZW50IiwidG91Y2hlcyIsIndoaWNoIiwibW91c2VlbnRlciIsIm1vdXNlbGVhdmUiLCJwb2ludGVyZW50ZXIiLCJwb2ludGVybGVhdmUiLCJvcmlnIiwicmVsYXRlZCIsInJ4aHRtbFRhZyIsInJub0lubmVyaHRtbCIsInJjaGVja2VkIiwicmNsZWFuU2NyaXB0IiwibWFuaXB1bGF0aW9uVGFyZ2V0IiwiZGlzYWJsZVNjcmlwdCIsInJlc3RvcmVTY3JpcHQiLCJjbG9uZUNvcHlFdmVudCIsImRlc3QiLCJwZGF0YU9sZCIsInBkYXRhQ3VyIiwidWRhdGFPbGQiLCJ1ZGF0YUN1ciIsImZpeElucHV0IiwiZG9tTWFuaXAiLCJjb2xsZWN0aW9uIiwiaGFzU2NyaXB0cyIsImlOb0Nsb25lIiwidmFsdWVJc0Z1bmN0aW9uIiwiaHRtbCIsIl9ldmFsVXJsIiwia2VlcERhdGEiLCJjbGVhbkRhdGEiLCJkYXRhQW5kRXZlbnRzIiwiZGVlcERhdGFBbmRFdmVudHMiLCJzcmNFbGVtZW50cyIsImRlc3RFbGVtZW50cyIsImluUGFnZSIsImRldGFjaCIsImFwcGVuZCIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJiZWZvcmUiLCJhZnRlciIsInJlcGxhY2VXaXRoIiwicmVwbGFjZUNoaWxkIiwiYXBwZW5kVG8iLCJwcmVwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlcGxhY2VBbGwiLCJvcmlnaW5hbCIsImluc2VydCIsInJudW1ub25weCIsImdldFN0eWxlcyIsIm9wZW5lciIsImdldENvbXB1dGVkU3R5bGUiLCJyYm94U3R5bGUiLCJjb21wdXRlU3R5bGVUZXN0cyIsImNvbnRhaW5lciIsImNzc1RleHQiLCJkaXZTdHlsZSIsInBpeGVsUG9zaXRpb25WYWwiLCJyZWxpYWJsZU1hcmdpbkxlZnRWYWwiLCJyb3VuZFBpeGVsTWVhc3VyZXMiLCJtYXJnaW5MZWZ0IiwicmlnaHQiLCJwaXhlbEJveFN0eWxlc1ZhbCIsImJveFNpemluZ1JlbGlhYmxlVmFsIiwid2lkdGgiLCJwb3NpdGlvbiIsInNjcm9sbGJveFNpemVWYWwiLCJvZmZzZXRXaWR0aCIsIm1lYXN1cmUiLCJyb3VuZCIsInBhcnNlRmxvYXQiLCJiYWNrZ3JvdW5kQ2xpcCIsImNsZWFyQ2xvbmVTdHlsZSIsImJveFNpemluZ1JlbGlhYmxlIiwicGl4ZWxCb3hTdHlsZXMiLCJwaXhlbFBvc2l0aW9uIiwicmVsaWFibGVNYXJnaW5MZWZ0Iiwic2Nyb2xsYm94U2l6ZSIsImN1ckNTUyIsImNvbXB1dGVkIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImdldFByb3BlcnR5VmFsdWUiLCJhZGRHZXRIb29rSWYiLCJjb25kaXRpb25GbiIsImhvb2tGbiIsInJkaXNwbGF5c3dhcCIsInJjdXN0b21Qcm9wIiwiY3NzU2hvdyIsInZpc2liaWxpdHkiLCJjc3NOb3JtYWxUcmFuc2Zvcm0iLCJsZXR0ZXJTcGFjaW5nIiwiZm9udFdlaWdodCIsImNzc1ByZWZpeGVzIiwiZW1wdHlTdHlsZSIsInZlbmRvclByb3BOYW1lIiwiY2FwTmFtZSIsImZpbmFsUHJvcE5hbWUiLCJjc3NQcm9wcyIsInNldFBvc2l0aXZlTnVtYmVyIiwic3VidHJhY3QiLCJtYXgiLCJib3hNb2RlbEFkanVzdG1lbnQiLCJkaW1lbnNpb24iLCJib3giLCJpc0JvcmRlckJveCIsInN0eWxlcyIsImNvbXB1dGVkVmFsIiwiZXh0cmEiLCJkZWx0YSIsImNlaWwiLCJnZXRXaWR0aE9ySGVpZ2h0IiwidmFsdWVJc0JvcmRlckJveCIsImNzc0hvb2tzIiwib3BhY2l0eSIsIm9yaWdOYW1lIiwiaXNDdXN0b21Qcm9wIiwic2V0UHJvcGVydHkiLCJpc0Zpbml0ZSIsImdldENsaWVudFJlY3RzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsIm1hcmdpbiIsInBhZGRpbmciLCJib3JkZXIiLCJwcmVmaXgiLCJzdWZmaXgiLCJleHBhbmQiLCJleHBhbmRlZCIsInBhcnRzIiwiVHdlZW4iLCJlYXNpbmciLCJwcm9wSG9va3MiLCJydW4iLCJwZXJjZW50IiwiZWFzZWQiLCJkdXJhdGlvbiIsInBvcyIsInN0ZXAiLCJmeCIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJsaW5lYXIiLCJwIiwic3dpbmciLCJjb3MiLCJQSSIsImZ4Tm93IiwiaW5Qcm9ncmVzcyIsInJmeHR5cGVzIiwicnJ1biIsInNjaGVkdWxlIiwiaGlkZGVuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW50ZXJ2YWwiLCJ0aWNrIiwiY3JlYXRlRnhOb3ciLCJnZW5GeCIsImluY2x1ZGVXaWR0aCIsImhlaWdodCIsImNyZWF0ZVR3ZWVuIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwidHdlZW5lcnMiLCJkZWZhdWx0UHJlZmlsdGVyIiwib3B0cyIsIm9sZGZpcmUiLCJwcm9wVHdlZW4iLCJyZXN0b3JlRGlzcGxheSIsImlzQm94IiwiYW5pbSIsImRhdGFTaG93IiwidW5xdWV1ZWQiLCJvdmVyZmxvdyIsIm92ZXJmbG93WCIsIm92ZXJmbG93WSIsInByb3BGaWx0ZXIiLCJzcGVjaWFsRWFzaW5nIiwicHJvcGVydGllcyIsInN0b3BwZWQiLCJwcmVmaWx0ZXJzIiwiY3VycmVudFRpbWUiLCJzdGFydFRpbWUiLCJ0d2VlbnMiLCJvcmlnaW5hbFByb3BlcnRpZXMiLCJvcmlnaW5hbE9wdGlvbnMiLCJnb3RvRW5kIiwiYmluZCIsImNvbXBsZXRlIiwidGltZXIiLCJ0d2VlbmVyIiwicHJlZmlsdGVyIiwic3BlZWQiLCJvcHQiLCJzcGVlZHMiLCJmYWRlVG8iLCJ0byIsImFuaW1hdGUiLCJvcHRhbGwiLCJkb0FuaW1hdGlvbiIsImZpbmlzaCIsInN0b3BRdWV1ZSIsInRpbWVycyIsImNzc0ZuIiwic2xpZGVEb3duIiwic2xpZGVVcCIsInNsaWRlVG9nZ2xlIiwiZmFkZUluIiwiZmFkZU91dCIsImZhZGVUb2dnbGUiLCJzbG93IiwiZmFzdCIsImRlbGF5IiwidGltZSIsInRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJjaGVja09uIiwib3B0U2VsZWN0ZWQiLCJyYWRpb1ZhbHVlIiwiYm9vbEhvb2siLCJyZW1vdmVBdHRyIiwiblR5cGUiLCJhdHRySG9va3MiLCJib29sIiwiYXR0ck5hbWVzIiwiZ2V0dGVyIiwibG93ZXJjYXNlTmFtZSIsInJmb2N1c2FibGUiLCJyY2xpY2thYmxlIiwicmVtb3ZlUHJvcCIsInByb3BGaXgiLCJ0YWJpbmRleCIsInBhcnNlSW50Iiwic3RyaXBBbmRDb2xsYXBzZSIsImdldENsYXNzIiwiY2xhc3Nlc1RvQXJyYXkiLCJhZGRDbGFzcyIsImNsYXNzZXMiLCJjdXJWYWx1ZSIsImNsYXp6IiwiZmluYWxWYWx1ZSIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJzdGF0ZVZhbCIsImlzVmFsaWRWYWx1ZSIsImNsYXNzTmFtZXMiLCJoYXNDbGFzcyIsInJyZXR1cm4iLCJ2YWxIb29rcyIsIm9wdGlvblNldCIsImZvY3VzaW4iLCJyZm9jdXNNb3JwaCIsInN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrIiwib25seUhhbmRsZXJzIiwiYnViYmxlVHlwZSIsIm9udHlwZSIsImxhc3RFbGVtZW50IiwiZXZlbnRQYXRoIiwiaXNUcmlnZ2VyIiwicGFyZW50V2luZG93Iiwic2ltdWxhdGUiLCJ0cmlnZ2VySGFuZGxlciIsImF0dGFjaGVzIiwibm9uY2UiLCJycXVlcnkiLCJwYXJzZVhNTCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsInJicmFja2V0IiwickNSTEYiLCJyc3VibWl0dGVyVHlwZXMiLCJyc3VibWl0dGFibGUiLCJidWlsZFBhcmFtcyIsInRyYWRpdGlvbmFsIiwicGFyYW0iLCJzIiwidmFsdWVPckZ1bmN0aW9uIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplIiwic2VyaWFsaXplQXJyYXkiLCJyMjAiLCJyaGFzaCIsInJhbnRpQ2FjaGUiLCJyaGVhZGVycyIsInJsb2NhbFByb3RvY29sIiwicm5vQ29udGVudCIsInJwcm90b2NvbCIsInRyYW5zcG9ydHMiLCJhbGxUeXBlcyIsIm9yaWdpbkFuY2hvciIsImFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyIsInN0cnVjdHVyZSIsImRhdGFUeXBlRXhwcmVzc2lvbiIsImRhdGFUeXBlIiwiZGF0YVR5cGVzIiwiaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMiLCJqcVhIUiIsImluc3BlY3RlZCIsInNlZWtpbmdUcmFuc3BvcnQiLCJpbnNwZWN0IiwicHJlZmlsdGVyT3JGYWN0b3J5IiwiZGF0YVR5cGVPclRyYW5zcG9ydCIsImFqYXhFeHRlbmQiLCJmbGF0T3B0aW9ucyIsImFqYXhTZXR0aW5ncyIsImFqYXhIYW5kbGVSZXNwb25zZXMiLCJyZXNwb25zZXMiLCJjdCIsImZpbmFsRGF0YVR5cGUiLCJmaXJzdERhdGFUeXBlIiwibWltZVR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsImNvbnZlcnRlcnMiLCJhamF4Q29udmVydCIsInJlc3BvbnNlIiwiaXNTdWNjZXNzIiwiY29udjIiLCJjdXJyZW50IiwiY29udiIsInJlc3BvbnNlRmllbGRzIiwiZGF0YUZpbHRlciIsInRocm93cyIsImFjdGl2ZSIsImxhc3RNb2RpZmllZCIsImV0YWciLCJ1cmwiLCJpc0xvY2FsIiwicHJvdG9jb2wiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiY29udGVudFR5cGUiLCJhY2NlcHRzIiwianNvbiIsImFqYXhTZXR1cCIsInNldHRpbmdzIiwiYWpheFByZWZpbHRlciIsImFqYXhUcmFuc3BvcnQiLCJhamF4IiwidHJhbnNwb3J0IiwiY2FjaGVVUkwiLCJyZXNwb25zZUhlYWRlcnNTdHJpbmciLCJyZXNwb25zZUhlYWRlcnMiLCJ0aW1lb3V0VGltZXIiLCJ1cmxBbmNob3IiLCJmaXJlR2xvYmFscyIsInVuY2FjaGVkIiwiY2FsbGJhY2tDb250ZXh0IiwiZ2xvYmFsRXZlbnRDb250ZXh0IiwiY29tcGxldGVEZWZlcnJlZCIsInN0YXR1c0NvZGUiLCJyZXF1ZXN0SGVhZGVycyIsInJlcXVlc3RIZWFkZXJzTmFtZXMiLCJzdHJBYm9ydCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwic3RhdHVzIiwiYWJvcnQiLCJzdGF0dXNUZXh0IiwiZmluYWxUZXh0IiwiY3Jvc3NEb21haW4iLCJob3N0IiwiaGFzQ29udGVudCIsImlmTW9kaWZpZWQiLCJoZWFkZXJzIiwiYmVmb3JlU2VuZCIsInN1Y2Nlc3MiLCJzZW5kIiwibmF0aXZlU3RhdHVzVGV4dCIsIm1vZGlmaWVkIiwiZ2V0SlNPTiIsImdldFNjcmlwdCIsIndyYXBBbGwiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIndyYXBJbm5lciIsImh0bWxJc0Z1bmN0aW9uIiwidW53cmFwIiwidmlzaWJsZSIsIm9mZnNldEhlaWdodCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwieGhyU3VjY2Vzc1N0YXR1cyIsInhoclN1cHBvcnRlZCIsImNvcnMiLCJlcnJvckNhbGxiYWNrIiwib3BlbiIsInVzZXJuYW1lIiwieGhyRmllbGRzIiwib25sb2FkIiwib25lcnJvciIsIm9uYWJvcnQiLCJvbnRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJiaW5hcnkiLCJjaGFyc2V0Iiwic2NyaXB0Q2hhcnNldCIsImV2dCIsIm9sZENhbGxiYWNrcyIsInJqc29ucCIsImpzb25wIiwianNvbnBDYWxsYmFjayIsIm9yaWdpbmFsU2V0dGluZ3MiLCJjYWxsYmFja05hbWUiLCJvdmVyd3JpdHRlbiIsInJlc3BvbnNlQ29udGFpbmVyIiwianNvblByb3AiLCJjcmVhdGVIVE1MRG9jdW1lbnQiLCJpbXBsZW1lbnRhdGlvbiIsImtlZXBTY3JpcHRzIiwicGFyc2VkIiwicGFyYW1zIiwiYW5pbWF0ZWQiLCJvZmZzZXQiLCJzZXRPZmZzZXQiLCJjdXJQb3NpdGlvbiIsImN1ckxlZnQiLCJjdXJDU1NUb3AiLCJjdXJUb3AiLCJjdXJPZmZzZXQiLCJjdXJDU1NMZWZ0IiwiY2FsY3VsYXRlUG9zaXRpb24iLCJjdXJFbGVtIiwidXNpbmciLCJyZWN0Iiwid2luIiwicGFnZVlPZmZzZXQiLCJwYWdlWE9mZnNldCIsIm9mZnNldFBhcmVudCIsInBhcmVudE9mZnNldCIsInNjcm9sbFRvIiwiSGVpZ2h0IiwiV2lkdGgiLCJkZWZhdWx0RXh0cmEiLCJmdW5jTmFtZSIsImhvdmVyIiwiZm5PdmVyIiwiZm5PdXQiLCJ1bmJpbmQiLCJkZWxlZ2F0ZSIsInVuZGVsZWdhdGUiLCJwcm94eSIsImhvbGRSZWFkeSIsImhvbGQiLCJwYXJzZUpTT04iLCJpc051bWVyaWMiLCJpc05hTiIsImRlZmluZSIsImFtZCIsIl9qUXVlcnkiLCJfJCIsIiQiLCJub0NvbmZsaWN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQWFBLENBQUUsVUFBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBNEI7O0FBRTdCOztBQUVBLEtBQUssT0FBT0MsTUFBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPQSxPQUFPQyxPQUFkLEtBQTBCLFFBQTdELEVBQXdFOztBQUV2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRCxTQUFPQyxPQUFQLEdBQWlCSCxPQUFPSSxRQUFQLEdBQ2hCSCxRQUFTRCxNQUFULEVBQWlCLElBQWpCLENBRGdCLEdBRWhCLFVBQVVLLENBQVYsRUFBYztBQUNiLE9BQUssQ0FBQ0EsRUFBRUQsUUFBUixFQUFtQjtBQUNsQixVQUFNLElBQUlFLEtBQUosQ0FBVywwQ0FBWCxDQUFOO0FBQ0E7QUFDRCxVQUFPTCxRQUFTSSxDQUFULENBQVA7QUFDQSxHQVBGO0FBUUEsRUFqQkQsTUFpQk87QUFDTkosVUFBU0QsTUFBVDtBQUNBOztBQUVGO0FBQ0MsQ0ExQkQsRUEwQkssT0FBT08sTUFBUCxLQUFrQixXQUFsQixHQUFnQ0EsTUFBaEMsR0FBeUMsSUExQjlDLEVBMEJvRCxVQUFVQSxNQUFWLEVBQWtCQyxRQUFsQixFQUE2Qjs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFJQyxNQUFNLEVBQVY7O0FBRUEsS0FBSUwsV0FBV0csT0FBT0gsUUFBdEI7O0FBRUEsS0FBSU0sV0FBV0MsT0FBT0MsY0FBdEI7O0FBRUEsS0FBSUMsUUFBUUosSUFBSUksS0FBaEI7O0FBRUEsS0FBSUMsU0FBU0wsSUFBSUssTUFBakI7O0FBRUEsS0FBSUMsT0FBT04sSUFBSU0sSUFBZjs7QUFFQSxLQUFJQyxVQUFVUCxJQUFJTyxPQUFsQjs7QUFFQSxLQUFJQyxhQUFhLEVBQWpCOztBQUVBLEtB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LE1BQUsvRSxPQUFPd29DLENBQVAsS0FBYWhtQyxNQUFsQixFQUEyQjtBQUMxQnhDLFVBQU93b0MsQ0FBUCxHQUFXRCxFQUFYO0FBQ0E7O0FBRUQsTUFBS3hqQyxRQUFRL0UsT0FBT3dDLE1BQVAsS0FBa0JBLE1BQS9CLEVBQXdDO0FBQ3ZDeEMsVUFBT3dDLE1BQVAsR0FBZ0I4bEMsT0FBaEI7QUFDQTs7QUFFRCxTQUFPOWxDLE1BQVA7QUFDQSxFQVZEOztBQVlBO0FBQ0E7QUFDQTtBQUNBLEtBQUssQ0FBQ3ZDLFFBQU4sRUFBaUI7QUFDaEJELFNBQU93QyxNQUFQLEdBQWdCeEMsT0FBT3dvQyxDQUFQLEdBQVdobUMsTUFBM0I7QUFDQTs7QUFLRCxRQUFPQSxNQUFQO0FBQ0MsQ0E5bVVEIiwiZmlsZSI6ImpxdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2My4zLjFcbiAqIGh0dHBzOi8vanF1ZXJ5LmNvbS9cbiAqXG4gKiBJbmNsdWRlcyBTaXp6bGUuanNcbiAqIGh0dHBzOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCBKUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE4LTAxLTIwVDE3OjI0WlxuICovXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0aWYgKCB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgYHdpbmRvd2Bcblx0XHQvLyBpcyBwcmVzZW50LCBleGVjdXRlIHRoZSBmYWN0b3J5IGFuZCBnZXQgalF1ZXJ5LlxuXHRcdC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaGF2ZSBhIGB3aW5kb3dgIHdpdGggYSBgZG9jdW1lbnRgXG5cdFx0Ly8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHMuXG5cdFx0Ly8gVGhpcyBhY2NlbnR1YXRlcyB0aGUgbmVlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIGEgcmVhbCBgd2luZG93YC5cblx0XHQvLyBlLmcuIHZhciBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpKHdpbmRvdyk7XG5cdFx0Ly8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mby5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XG5cdFx0XHRmYWN0b3J5KCBnbG9iYWwsIHRydWUgKSA6XG5cdFx0XHRmdW5jdGlvbiggdyApIHtcblx0XHRcdFx0aWYgKCAhdy5kb2N1bWVudCApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhY3RvcnkoIHcgKTtcblx0XHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggZ2xvYmFsICk7XG5cdH1cblxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcbn0gKSggdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCB3aW5kb3csIG5vR2xvYmFsICkge1xuXG4vLyBFZGdlIDw9IDEyIC0gMTMrLCBGaXJlZm94IDw9MTggLSA0NSssIElFIDEwIC0gMTEsIFNhZmFyaSA1LjEgLSA5KywgaU9TIDYgLSA5LjFcbi8vIHRocm93IGV4Y2VwdGlvbnMgd2hlbiBub24tc3RyaWN0IGNvZGUgKGUuZy4sIEFTUC5ORVQgNC41KSBhY2Nlc3NlcyBzdHJpY3QgbW9kZVxuLy8gYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIgKHRyYWMtMTMzMzUpLiBCdXQgYXMgb2YgalF1ZXJ5IDMuMCAoMjAxNiksIHN0cmljdCBtb2RlIHNob3VsZCBiZSBjb21tb25cbi8vIGVub3VnaCB0aGF0IGFsbCBzdWNoIGF0dGVtcHRzIGFyZSBndWFyZGVkIGluIGEgdHJ5IGJsb2NrLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnIgPSBbXTtcblxudmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cbnZhciBzbGljZSA9IGFyci5zbGljZTtcblxudmFyIGNvbmNhdCA9IGFyci5jb25jYXQ7XG5cbnZhciBwdXNoID0gYXJyLnB1c2g7XG5cbnZhciBpbmRleE9mID0gYXJyLmluZGV4T2Y7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG5cbnZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XG5cbnZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm5Ub1N0cmluZyA9IGhhc093bi50b1N0cmluZztcblxudmFyIE9iamVjdEZ1bmN0aW9uU3RyaW5nID0gZm5Ub1N0cmluZy5jYWxsKCBPYmplY3QgKTtcblxudmFyIHN1cHBvcnQgPSB7fTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKCBvYmogKSB7XG5cbiAgICAgIC8vIFN1cHBvcnQ6IENocm9tZSA8PTU3LCBGaXJlZm94IDw9NTJcbiAgICAgIC8vIEluIHNvbWUgYnJvd3NlcnMsIHR5cGVvZiByZXR1cm5zIFwiZnVuY3Rpb25cIiBmb3IgSFRNTCA8b2JqZWN0PiBlbGVtZW50c1xuICAgICAgLy8gKGkuZS4sIGB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJvYmplY3RcIiApID09PSBcImZ1bmN0aW9uXCJgKS5cbiAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gY2xhc3NpZnkgKmFueSogRE9NIG5vZGUgYXMgYSBmdW5jdGlvbi5cbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIG9iai5ub2RlVHlwZSAhPT0gXCJudW1iZXJcIjtcbiAgfTtcblxuXG52YXIgaXNXaW5kb3cgPSBmdW5jdGlvbiBpc1dpbmRvdyggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH07XG5cblxuXG5cblx0dmFyIHByZXNlcnZlZFNjcmlwdEF0dHJpYnV0ZXMgPSB7XG5cdFx0dHlwZTogdHJ1ZSxcblx0XHRzcmM6IHRydWUsXG5cdFx0bm9Nb2R1bGU6IHRydWVcblx0fTtcblxuXHRmdW5jdGlvbiBET01FdmFsKCBjb2RlLCBkb2MsIG5vZGUgKSB7XG5cdFx0ZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG5cdFx0dmFyIGksXG5cdFx0XHRzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJzY3JpcHRcIiApO1xuXG5cdFx0c2NyaXB0LnRleHQgPSBjb2RlO1xuXHRcdGlmICggbm9kZSApIHtcblx0XHRcdGZvciAoIGkgaW4gcHJlc2VydmVkU2NyaXB0QXR0cmlidXRlcyApIHtcblx0XHRcdFx0aWYgKCBub2RlWyBpIF0gKSB7XG5cdFx0XHRcdFx0c2NyaXB0WyBpIF0gPSBub2RlWyBpIF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZG9jLmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHR9XG5cblxuZnVuY3Rpb24gdG9UeXBlKCBvYmogKSB7XG5cdGlmICggb2JqID09IG51bGwgKSB7XG5cdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9Mi4zIG9ubHkgKGZ1bmN0aW9uaXNoIFJlZ0V4cClcblx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cblx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKCBvYmogKSBdIHx8IFwib2JqZWN0XCIgOlxuXHRcdHR5cGVvZiBvYmo7XG59XG4vKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuXG5cbnZhclxuXHR2ZXJzaW9uID0gXCIzLjMuMVwiLFxuXG5cdC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG5cdGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblxuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG5cdHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG5qUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcblx0anF1ZXJ5OiB2ZXJzaW9uLFxuXG5cdGNvbnN0cnVjdG9yOiBqUXVlcnksXG5cblx0Ly8gVGhlIGRlZmF1bHQgbGVuZ3RoIG9mIGEgalF1ZXJ5IG9iamVjdCBpcyAwXG5cdGxlbmd0aDogMCxcblxuXHR0b0FycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuXHR9LFxuXG5cdC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1Jcblx0Ly8gR2V0IHRoZSB3aG9sZSBtYXRjaGVkIGVsZW1lbnQgc2V0IGFzIGEgY2xlYW4gYXJyYXlcblx0Z2V0OiBmdW5jdGlvbiggbnVtICkge1xuXG5cdFx0Ly8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgaW4gYSBjbGVhbiBhcnJheVxuXHRcdGlmICggbnVtID09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiBqdXN0IHRoZSBvbmUgZWxlbWVudCBmcm9tIHRoZSBzZXRcblx0XHRyZXR1cm4gbnVtIDwgMCA/IHRoaXNbIG51bSArIHRoaXMubGVuZ3RoIF0gOiB0aGlzWyBudW0gXTtcblx0fSxcblxuXHQvLyBUYWtlIGFuIGFycmF5IG9mIGVsZW1lbnRzIGFuZCBwdXNoIGl0IG9udG8gdGhlIHN0YWNrXG5cdC8vIChyZXR1cm5pbmcgdGhlIG5ldyBtYXRjaGVkIGVsZW1lbnQgc2V0KVxuXHRwdXNoU3RhY2s6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblxuXHRcdC8vIEJ1aWxkIGEgbmV3IGpRdWVyeSBtYXRjaGVkIGVsZW1lbnQgc2V0XG5cdFx0dmFyIHJldCA9IGpRdWVyeS5tZXJnZSggdGhpcy5jb25zdHJ1Y3RvcigpLCBlbGVtcyApO1xuXG5cdFx0Ly8gQWRkIHRoZSBvbGQgb2JqZWN0IG9udG8gdGhlIHN0YWNrIChhcyBhIHJlZmVyZW5jZSlcblx0XHRyZXQucHJldk9iamVjdCA9IHRoaXM7XG5cblx0XHQvLyBSZXR1cm4gdGhlIG5ld2x5LWZvcm1lZCBlbGVtZW50IHNldFxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0Ly8gRXhlY3V0ZSBhIGNhbGxiYWNrIGZvciBldmVyeSBlbGVtZW50IGluIHRoZSBtYXRjaGVkIHNldC5cblx0ZWFjaDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZWFjaCggdGhpcywgY2FsbGJhY2sgKTtcblx0fSxcblxuXHRtYXA6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeS5tYXAoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwoIGVsZW0sIGksIGVsZW0gKTtcblx0XHR9ICkgKTtcblx0fSxcblxuXHRzbGljZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBzbGljZS5hcHBseSggdGhpcywgYXJndW1lbnRzICkgKTtcblx0fSxcblxuXHRmaXJzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIDAgKTtcblx0fSxcblxuXHRsYXN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggLTEgKTtcblx0fSxcblxuXHRlcTogZnVuY3Rpb24oIGkgKSB7XG5cdFx0dmFyIGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0aiA9ICtpICsgKCBpIDwgMCA/IGxlbiA6IDAgKTtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGogPj0gMCAmJiBqIDwgbGVuID8gWyB0aGlzWyBqIF0gXSA6IFtdICk7XG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IoKTtcblx0fSxcblxuXHQvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG5cdC8vIEJlaGF2ZXMgbGlrZSBhbiBBcnJheSdzIG1ldGhvZCwgbm90IGxpa2UgYSBqUXVlcnkgbWV0aG9kLlxuXHRwdXNoOiBwdXNoLFxuXHRzb3J0OiBhcnIuc29ydCxcblx0c3BsaWNlOiBhcnIuc3BsaWNlXG59O1xuXG5qUXVlcnkuZXh0ZW5kID0galF1ZXJ5LmZuLmV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWyAwIF0gfHwge30sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cblx0XHQvLyBTa2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG5cdFx0aSsrO1xuXHR9XG5cblx0Ly8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG5cdGlmICggdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhaXNGdW5jdGlvbiggdGFyZ2V0ICkgKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHQvLyBFeHRlbmQgalF1ZXJ5IGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcblx0aWYgKCBpID09PSBsZW5ndGggKSB7XG5cdFx0dGFyZ2V0ID0gdGhpcztcblx0XHRpLS07XG5cdH1cblxuXHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblxuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoICggb3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdICkgIT0gbnVsbCApIHtcblxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbIG5hbWUgXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbIG5hbWUgXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdGlmICggZGVlcCAmJiBjb3B5ICYmICggalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvcHkgKSB8fFxuXHRcdFx0XHRcdCggY29weUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBBcnJheS5pc0FycmF5KCBzcmMgKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBzcmMgKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0galF1ZXJ5LmV4dGVuZCggZGVlcCwgY2xvbmUsIGNvcHkgKTtcblxuXHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNvcHkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGNvcHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIFVuaXF1ZSBmb3IgZWFjaCBjb3B5IG9mIGpRdWVyeSBvbiB0aGUgcGFnZVxuXHRleHBhbmRvOiBcImpRdWVyeVwiICsgKCB2ZXJzaW9uICsgTWF0aC5yYW5kb20oKSApLnJlcGxhY2UoIC9cXEQvZywgXCJcIiApLFxuXG5cdC8vIEFzc3VtZSBqUXVlcnkgaXMgcmVhZHkgd2l0aG91dCB0aGUgcmVhZHkgbW9kdWxlXG5cdGlzUmVhZHk6IHRydWUsXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcblx0fSxcblxuXHRub29wOiBmdW5jdGlvbigpIHt9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIHByb3RvLCBDdG9yO1xuXG5cdFx0Ly8gRGV0ZWN0IG9idmlvdXMgbmVnYXRpdmVzXG5cdFx0Ly8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG5cdFx0aWYgKCAhb2JqIHx8IHRvU3RyaW5nLmNhbGwoIG9iaiApICE9PSBcIltvYmplY3QgT2JqZWN0XVwiICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0UHJvdG8oIG9iaiApO1xuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuXHRcdGlmICggIXByb3RvICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIHByb3RvdHlwZSBhcmUgcGxhaW4gaWZmIHRoZXkgd2VyZSBjb25zdHJ1Y3RlZCBieSBhIGdsb2JhbCBPYmplY3QgZnVuY3Rpb25cblx0XHRDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBmblRvU3RyaW5nLmNhbGwoIEN0b3IgKSA9PT0gT2JqZWN0RnVuY3Rpb25TdHJpbmc7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy82MTI1XG5cdFx0dmFyIG5hbWU7XG5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcblx0Z2xvYmFsRXZhbDogZnVuY3Rpb24oIGNvZGUgKSB7XG5cdFx0RE9NRXZhbCggY29kZSApO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrICkge1xuXHRcdHZhciBsZW5ndGgsIGkgPSAwO1xuXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlMaWtlKCBPYmplY3QoIGFyciApICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LFxuXHRcdFx0XHRcdHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFsgYXJyIF0gOiBhcnJcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0cmV0dXJuIGFyciA9PSBudWxsID8gLTEgOiBpbmRleE9mLmNhbGwoIGFyciwgZWxlbSwgaSApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG5cdFx0XHRqID0gMCxcblx0XHRcdGkgPSBmaXJzdC5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaiBdO1xuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xuXHRcdHZhciBjYWxsYmFja0ludmVyc2UsXG5cdFx0XHRtYXRjaGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGNhbGxiYWNrRXhwZWN0ID0gIWludmVydDtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCBvbmx5IHNhdmluZyB0aGUgaXRlbXNcblx0XHQvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuXHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XG5cdFx0XHRcdG1hdGNoZXMucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9LFxuXG5cdC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcblx0XHR2YXIgbGVuZ3RoLCB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0cmV0ID0gW107XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuXHRcdGlmICggaXNBcnJheUxpa2UoIGVsZW1zICkgKSB7XG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBHbyB0aHJvdWdoIGV2ZXJ5IGtleSBvbiB0aGUgb2JqZWN0LFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIGVsZW1zICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0cmV0dXJuIGNvbmNhdC5hcHBseSggW10sIHJldCApO1xuXHR9LFxuXG5cdC8vIEEgZ2xvYmFsIEdVSUQgY291bnRlciBmb3Igb2JqZWN0c1xuXHRndWlkOiAxLFxuXG5cdC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuXHQvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuXHRzdXBwb3J0OiBzdXBwb3J0XG59ICk7XG5cbmlmICggdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRqUXVlcnkuZm5bIFN5bWJvbC5pdGVyYXRvciBdID0gYXJyWyBTeW1ib2wuaXRlcmF0b3IgXTtcbn1cblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaCggXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFwiLnNwbGl0KCBcIiBcIiApLFxuZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSApO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSggb2JqICkge1xuXG5cdC8vIFN1cHBvcnQ6IHJlYWwgaU9TIDguMiBvbmx5IChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gISFvYmogJiYgXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0gdG9UeXBlKCBvYmogKTtcblxuXHRpZiAoIGlzRnVuY3Rpb24oIG9iaiApIHx8IGlzV2luZG93KCBvYmogKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuXHRcdHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgU2l6emxlID1cbi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMy4zXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNi0wOC0wOFxuICovXG4oZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIGksXG5cdHN1cHBvcnQsXG5cdEV4cHIsXG5cdGdldFRleHQsXG5cdGlzWE1MLFxuXHR0b2tlbml6ZSxcblx0Y29tcGlsZSxcblx0c2VsZWN0LFxuXHRvdXRlcm1vc3RDb250ZXh0LFxuXHRzb3J0SW5wdXQsXG5cdGhhc0R1cGxpY2F0ZSxcblxuXHQvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG5cdHNldERvY3VtZW50LFxuXHRkb2N1bWVudCxcblx0ZG9jRWxlbSxcblx0ZG9jdW1lbnRJc0hUTUwsXG5cdHJidWdneVFTQSxcblx0cmJ1Z2d5TWF0Y2hlcyxcblx0bWF0Y2hlcyxcblx0Y29udGFpbnMsXG5cblx0Ly8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuXHRleHBhbmRvID0gXCJzaXp6bGVcIiArIDEgKiBuZXcgRGF0ZSgpLFxuXHRwcmVmZXJyZWREb2MgPSB3aW5kb3cuZG9jdW1lbnQsXG5cdGRpcnJ1bnMgPSAwLFxuXHRkb25lID0gMCxcblx0Y2xhc3NDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRjb21waWxlckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0c29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxuXHRhcnIgPSBbXSxcblx0cG9wID0gYXJyLnBvcCxcblx0cHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGFzIGl0J3MgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcblx0aW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IGxpc3QubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCBsaXN0W2ldID09PSBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG5cdC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jd2hpdGVzcGFjZVxuXHR3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuXHRpZGVudGlmaWVyID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXDAtXFxcXHhhMF0pK1wiLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG5cdFx0XCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBcIkF0dHJpYnV0ZSB2YWx1ZXMgbXVzdCBiZSBDU1MgaWRlbnRpZmllcnMgW2NhcHR1cmUgNV0gb3Igc3RyaW5ncyBbY2FwdHVyZSAzIG9yIGNhcHR1cmUgNF1cIlxuXHRcdFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIipcXFxcXVwiLFxuXG5cdHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cdFx0Ly8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG5cdFx0XCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG5cdHJhdHRyaWJ1dGVRdW90ZXMgPSBuZXcgUmVnRXhwKCBcIj1cIiArIHdoaXRlc3BhY2UgKyBcIiooW15cXFxcXSdcXFwiXSo/KVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsIFwiZ1wiICksXG5cblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcblx0cmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG5cdG1hdGNoRXhwciA9IHtcblx0XHRcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIkNMQVNTXCI6IG5ldyBSZWdFeHAoIFwiXlxcXFwuKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgaWRlbnRpZmllciArIFwifFsqXSlcIiApLFxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcblx0XHRcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcblx0XHRcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuXHRcdFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuXHRcdC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuXHRcdC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcblx0XHRcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG5cdH0sXG5cblx0cmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cblx0cm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG5cdHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuXHRyc2libGluZyA9IC9bK35dLyxcblxuXHQvLyBDU1MgZXNjYXBlc1xuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG5cdHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXG5cdGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBfLCBlc2NhcGVkLCBlc2NhcGVkV2hpdGVzcGFjZSApIHtcblx0XHR2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xuXHRcdC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveDwyNFxuXHRcdC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxuXHRcdHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cblx0XHRcdGVzY2FwZWQgOlxuXHRcdFx0aGlnaCA8IDAgP1xuXHRcdFx0XHQvLyBCTVAgY29kZXBvaW50XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuXHRcdFx0XHQvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG5cdH0sXG5cblx0Ly8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cblx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNjb21tb24tc2VyaWFsaXppbmctaWRpb21zXG5cdHJjc3Nlc2NhcGUgPSAvKFtcXDAtXFx4MWZcXHg3Zl18Xi0/XFxkKXxeLSR8W15cXDAtXFx4MWZcXHg3Zi1cXHVGRkZGXFx3LV0vZyxcblx0ZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG5cdFx0aWYgKCBhc0NvZGVQb2ludCApIHtcblxuXHRcdFx0Ly8gVSswMDAwIE5VTEwgYmVjb21lcyBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSXG5cdFx0XHRpZiAoIGNoID09PSBcIlxcMFwiICkge1xuXHRcdFx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG5cdFx0XHRyZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArIGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyIHBvdGVudGlhbGx5LXNwZWNpYWwgQVNDSUkgY2hhcmFjdGVycyBnZXQgYmFja3NsYXNoLWVzY2FwZWRcblx0XHRyZXR1cm4gXCJcXFxcXCIgKyBjaDtcblx0fSxcblxuXHQvLyBVc2VkIGZvciBpZnJhbWVzXG5cdC8vIFNlZSBzZXREb2N1bWVudCgpXG5cdC8vIFJlbW92aW5nIHRoZSBmdW5jdGlvbiB3cmFwcGVyIGNhdXNlcyBhIFwiUGVybWlzc2lvbiBEZW5pZWRcIlxuXHQvLyBlcnJvciBpbiBJRVxuXHR1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2V0RG9jdW1lbnQoKTtcblx0fSxcblxuXHRkaXNhYmxlZEFuY2VzdG9yID0gYWRkQ29tYmluYXRvcihcblx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlICYmIChcImZvcm1cIiBpbiBlbGVtIHx8IFwibGFiZWxcIiBpbiBlbGVtKTtcblx0XHR9LFxuXHRcdHsgZGlyOiBcInBhcmVudE5vZGVcIiwgbmV4dDogXCJsZWdlbmRcIiB9XG5cdCk7XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuXHRwdXNoLmFwcGx5KFxuXHRcdChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcblx0cHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG5cdFx0Ly8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHRwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblx0XHRcdC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuXHRcdFx0d2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuXHRcdFx0dGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIG0sIGksIGVsZW0sIG5pZCwgbWF0Y2gsIGdyb3VwcywgbmV3U2VsZWN0b3IsXG5cdFx0bmV3Q29udGV4dCA9IGNvbnRleHQgJiYgY29udGV4dC5vd25lckRvY3VtZW50LFxuXG5cdFx0Ly8gbm9kZVR5cGUgZGVmYXVsdHMgdG8gOSwgc2luY2UgY29udGV4dCBkZWZhdWx0cyB0byBkb2N1bWVudFxuXHRcdG5vZGVUeXBlID0gY29udGV4dCA/IGNvbnRleHQubm9kZVR5cGUgOiA5O1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFJldHVybiBlYXJseSBmcm9tIGNhbGxzIHdpdGggaW52YWxpZCBzZWxlY3RvciBvciBjb250ZXh0XG5cdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuXHRcdG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly8gVHJ5IHRvIHNob3J0Y3V0IGZpbmQgb3BlcmF0aW9ucyAoYXMgb3Bwb3NlZCB0byBmaWx0ZXJzKSBpbiBIVE1MIGRvY3VtZW50c1xuXHRpZiAoICFzZWVkICkge1xuXG5cdFx0aWYgKCAoIGNvbnRleHQgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IHByZWZlcnJlZERvYyApICE9PSBkb2N1bWVudCApIHtcblx0XHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdFx0fVxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdG9yIGlzIHN1ZmZpY2llbnRseSBzaW1wbGUsIHRyeSB1c2luZyBhIFwiZ2V0KkJ5KlwiIERPTSBtZXRob2Rcblx0XHRcdC8vIChleGNlcHRpbmcgRG9jdW1lbnRGcmFnbWVudCBjb250ZXh0LCB3aGVyZSB0aGUgbWV0aG9kcyBkb24ndCBleGlzdClcblx0XHRcdGlmICggbm9kZVR5cGUgIT09IDExICYmIChtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0Ly8gSUQgc2VsZWN0b3Jcblx0XHRcdFx0aWYgKCAobSA9IG1hdGNoWzFdKSApIHtcblxuXHRcdFx0XHRcdC8vIERvY3VtZW50IGNvbnRleHRcblx0XHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgJiYgKGVsZW0gPSBuZXdDb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkpICYmXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiZcblx0XHRcdFx0XHRcdFx0ZWxlbS5pZCA9PT0gbSApIHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFR5cGUgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHRcdC8vIENsYXNzIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJlxuXHRcdFx0XHRcdGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGFrZSBhZHZhbnRhZ2Ugb2YgcXVlcnlTZWxlY3RvckFsbFxuXHRcdFx0aWYgKCBzdXBwb3J0LnFzYSAmJlxuXHRcdFx0XHQhY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdICYmXG5cdFx0XHRcdCghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gY29udGV4dDtcblx0XHRcdFx0XHRuZXdTZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0XHRcdC8vIHFTQSBsb29rcyBvdXRzaWRlIEVsZW1lbnQgY29udGV4dCwgd2hpY2ggaXMgbm90IHdoYXQgd2Ugd2FudFxuXHRcdFx0XHQvLyBUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhpcyB3b3JrYXJvdW5kIHRlY2huaXF1ZVxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PThcblx0XHRcdFx0Ly8gRXhjbHVkZSBvYmplY3QgZWxlbWVudHNcblx0XHRcdFx0fSBlbHNlIGlmICggY29udGV4dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2FwdHVyZSB0aGUgY29udGV4dCBJRCwgc2V0dGluZyBpdCBmaXJzdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRpZiAoIChuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkpICkge1xuXHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgKG5pZCA9IGV4cGFuZG8pICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG5cdFx0XHRcdFx0Z3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0XHRcdFx0aSA9IGdyb3Vwcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRncm91cHNbaV0gPSBcIiNcIiArIG5pZCArIFwiIFwiICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oIFwiLFwiICk7XG5cblx0XHRcdFx0XHQvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIG5ld1NlbGVjdG9yICkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLFxuXHRcdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9IGNhdGNoICggcXNhRXJyb3IgKSB7XG5cdFx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRcdGlmICggbmlkID09PSBleHBhbmRvICkge1xuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWxsIG90aGVyc1xuXHRyZXR1cm4gc2VsZWN0KCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUga2V5LXZhbHVlIGNhY2hlcyBvZiBsaW1pdGVkIHNpemVcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihzdHJpbmcsIG9iamVjdCl9IFJldHVybnMgdGhlIE9iamVjdCBkYXRhIGFmdGVyIHN0b3JpbmcgaXQgb24gaXRzZWxmIHdpdGhcbiAqXHRwcm9wZXJ0eSBuYW1lIHRoZSAoc3BhY2Utc3VmZml4ZWQpIHN0cmluZyBhbmQgKGlmIHRoZSBjYWNoZSBpcyBsYXJnZXIgdGhhbiBFeHByLmNhY2hlTGVuZ3RoKVxuICpcdGRlbGV0aW5nIHRoZSBvbGRlc3QgZW50cnlcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FjaGUoKSB7XG5cdHZhciBrZXlzID0gW107XG5cblx0ZnVuY3Rpb24gY2FjaGUoIGtleSwgdmFsdWUgKSB7XG5cdFx0Ly8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1Nylcblx0XHRpZiAoIGtleXMucHVzaCgga2V5ICsgXCIgXCIgKSA+IEV4cHIuY2FjaGVMZW5ndGggKSB7XG5cdFx0XHQvLyBPbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IGVudHJpZXNcblx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XG5cdFx0fVxuXHRcdHJldHVybiAoY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSk7XG5cdH1cblx0cmV0dXJuIGNhY2hlO1xufVxuXG4vKipcbiAqIE1hcmsgYSBmdW5jdGlvbiBmb3Igc3BlY2lhbCB1c2UgYnkgU2l6emxlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFya1xuICovXG5mdW5jdGlvbiBtYXJrRnVuY3Rpb24oIGZuICkge1xuXHRmblsgZXhwYW5kbyBdID0gdHJ1ZTtcblx0cmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIFN1cHBvcnQgdGVzdGluZyB1c2luZyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBQYXNzZWQgdGhlIGNyZWF0ZWQgZWxlbWVudCBhbmQgcmV0dXJucyBhIGJvb2xlYW4gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGFzc2VydCggZm4gKSB7XG5cdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBlbCApO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9IGZpbmFsbHkge1xuXHRcdC8vIFJlbW92ZSBmcm9tIGl0cyBwYXJlbnQgYnkgZGVmYXVsdFxuXHRcdGlmICggZWwucGFyZW50Tm9kZSApIHtcblx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGVsICk7XG5cdFx0fVxuXHRcdC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXG5cdFx0ZWwgPSBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogQWRkcyB0aGUgc2FtZSBoYW5kbGVyIGZvciBhbGwgb2YgdGhlIHNwZWNpZmllZCBhdHRyc1xuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJzIFBpcGUtc2VwYXJhdGVkIGxpc3Qgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBUaGUgbWV0aG9kIHRoYXQgd2lsbCBiZSBhcHBsaWVkXG4gKi9cbmZ1bmN0aW9uIGFkZEhhbmRsZSggYXR0cnMsIGhhbmRsZXIgKSB7XG5cdHZhciBhcnIgPSBhdHRycy5zcGxpdChcInxcIiksXG5cdFx0aSA9IGFyci5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0RXhwci5hdHRySGFuZGxlWyBhcnJbaV0gXSA9IGhhbmRsZXI7XG5cdH1cbn1cblxuLyoqXG4gKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gKi9cbmZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcblx0dmFyIGN1ciA9IGIgJiYgYSxcblx0XHRkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0YS5zb3VyY2VJbmRleCAtIGIuc291cmNlSW5kZXg7XG5cblx0Ly8gVXNlIElFIHNvdXJjZUluZGV4IGlmIGF2YWlsYWJsZSBvbiBib3RoIG5vZGVzXG5cdGlmICggZGlmZiApIHtcblx0XHRyZXR1cm4gZGlmZjtcblx0fVxuXG5cdC8vIENoZWNrIGlmIGIgZm9sbG93cyBhXG5cdGlmICggY3VyICkge1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5uZXh0U2libGluZykgKSB7XG5cdFx0XHRpZiAoIGN1ciA9PT0gYiApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhID8gMSA6IC0xO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0UHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBidXR0b25zXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25Qc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gKG5hbWUgPT09IFwiaW5wdXRcIiB8fCBuYW1lID09PSBcImJ1dHRvblwiKSAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciA6ZW5hYmxlZC86ZGlzYWJsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzYWJsZWQgdHJ1ZSBmb3IgOmRpc2FibGVkOyBmYWxzZSBmb3IgOmVuYWJsZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGRpc2FibGVkICkge1xuXG5cdC8vIEtub3duIDpkaXNhYmxlZCBmYWxzZSBwb3NpdGl2ZXM6IGZpZWxkc2V0W2Rpc2FibGVkXSA+IGxlZ2VuZDpudGgtb2YtdHlwZShuKzIpIDpjYW4tZGlzYWJsZVxuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBPbmx5IGNlcnRhaW4gZWxlbWVudHMgY2FuIG1hdGNoIDplbmFibGVkIG9yIDpkaXNhYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWVuYWJsZWRcblx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1kaXNhYmxlZFxuXHRcdGlmICggXCJmb3JtXCIgaW4gZWxlbSApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGluaGVyaXRlZCBkaXNhYmxlZG5lc3Mgb24gcmVsZXZhbnQgbm9uLWRpc2FibGVkIGVsZW1lbnRzOlxuXHRcdFx0Ly8gKiBsaXN0ZWQgZm9ybS1hc3NvY2lhdGVkIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgZmllbGRzZXRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjYXRlZ29yeS1saXN0ZWRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LWZlLWRpc2FibGVkXG5cdFx0XHQvLyAqIG9wdGlvbiBlbGVtZW50cyBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1vcHRpb24tZGlzYWJsZWRcblx0XHRcdC8vIEFsbCBzdWNoIGVsZW1lbnRzIGhhdmUgYSBcImZvcm1cIiBwcm9wZXJ0eS5cblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdC8vIE9wdGlvbiBlbGVtZW50cyBkZWZlciB0byBhIHBhcmVudCBvcHRncm91cCBpZiBwcmVzZW50XG5cdFx0XHRcdGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0ucGFyZW50Tm9kZS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gMTFcblx0XHRcdFx0Ly8gVXNlIHRoZSBpc0Rpc2FibGVkIHNob3J0Y3V0IHByb3BlcnR5IHRvIGNoZWNrIGZvciBkaXNhYmxlZCBmaWVsZHNldCBhbmNlc3RvcnNcblx0XHRcdFx0cmV0dXJuIGVsZW0uaXNEaXNhYmxlZCA9PT0gZGlzYWJsZWQgfHxcblxuXHRcdFx0XHRcdC8vIFdoZXJlIHRoZXJlIGlzIG5vIGlzRGlzYWJsZWQsIGNoZWNrIG1hbnVhbGx5XG5cdFx0XHRcdFx0LyoganNoaW50IC1XMDE4ICovXG5cdFx0XHRcdFx0ZWxlbS5pc0Rpc2FibGVkICE9PSAhZGlzYWJsZWQgJiZcblx0XHRcdFx0XHRcdGRpc2FibGVkQW5jZXN0b3IoIGVsZW0gKSA9PT0gZGlzYWJsZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblxuXHRcdC8vIFRyeSB0byB3aW5ub3cgb3V0IGVsZW1lbnRzIHRoYXQgY2FuJ3QgYmUgZGlzYWJsZWQgYmVmb3JlIHRydXN0aW5nIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eS5cblx0XHQvLyBTb21lIHZpY3RpbXMgZ2V0IGNhdWdodCBpbiBvdXIgbmV0IChsYWJlbCwgbGVnZW5kLCBtZW51LCB0cmFjayksIGJ1dCBpdCBzaG91bGRuJ3Rcblx0XHQvLyBldmVuIGV4aXN0IG9uIHRoZW0sIGxldCBhbG9uZSBoYXZlIGEgYm9vbGVhbiB2YWx1ZS5cblx0XHR9IGVsc2UgaWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHR9XG5cblx0XHQvLyBSZW1haW5pbmcgZWxlbWVudHMgYXJlIG5laXRoZXIgOmVuYWJsZWQgbm9yIDpkaXNhYmxlZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggYXJndW1lbnQgKSB7XG5cdFx0YXJndW1lbnQgPSArYXJndW1lbnQ7XG5cdFx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdHZhciBqLFxuXHRcdFx0XHRtYXRjaEluZGV4ZXMgPSBmbiggW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCApLFxuXHRcdFx0XHRpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcblxuXHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcblx0XHRcdFx0XHRzZWVkW2pdID0gIShtYXRjaGVzW2pdID0gc2VlZFtqXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcblx0cmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcbn1cblxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcbnN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIERldGVjdHMgWE1MIG5vZGVzXG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEFuIGVsZW1lbnQgb3IgYSBkb2N1bWVudFxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxuICovXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHQvLyBkb2N1bWVudEVsZW1lbnQgaXMgdmVyaWZpZWQgZm9yIGNhc2VzIHdoZXJlIGl0IGRvZXNuJ3QgeWV0IGV4aXN0XG5cdC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuXHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZWxlbSAmJiAoZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0pLmRvY3VtZW50RWxlbWVudDtcblx0cmV0dXJuIGRvY3VtZW50RWxlbWVudCA/IGRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgOiBmYWxzZTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuXHR2YXIgaGFzQ29tcGFyZSwgc3ViV2luZG93LFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuXHQvLyBSZXR1cm4gZWFybHkgaWYgZG9jIGlzIGludmFsaWQgb3IgYWxyZWFkeSBzZWxlY3RlZFxuXHRpZiAoIGRvYyA9PT0gZG9jdW1lbnQgfHwgZG9jLm5vZGVUeXBlICE9PSA5IHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50ICkge1xuXHRcdHJldHVybiBkb2N1bWVudDtcblx0fVxuXG5cdC8vIFVwZGF0ZSBnbG9iYWwgdmFyaWFibGVzXG5cdGRvY3VtZW50ID0gZG9jO1xuXHRkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jdW1lbnQgKTtcblxuXHQvLyBTdXBwb3J0OiBJRSA5LTExLCBFZGdlXG5cdC8vIEFjY2Vzc2luZyBpZnJhbWUgZG9jdW1lbnRzIGFmdGVyIHVubG9hZCB0aHJvd3MgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9ycyAoalF1ZXJ5ICMxMzkzNilcblx0aWYgKCBwcmVmZXJyZWREb2MgIT09IGRvY3VtZW50ICYmXG5cdFx0KHN1YldpbmRvdyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3KSAmJiBzdWJXaW5kb3cudG9wICE9PSBzdWJXaW5kb3cgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSAxMSwgRWRnZVxuXHRcdGlmICggc3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgLSAxMCBvbmx5XG5cdFx0fSBlbHNlIGlmICggc3ViV2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHRcdFx0c3ViV2luZG93LmF0dGFjaEV2ZW50KCBcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIgKTtcblx0XHR9XG5cdH1cblxuXHQvKiBBdHRyaWJ1dGVzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBTdXBwb3J0OiBJRTw4XG5cdC8vIFZlcmlmeSB0aGF0IGdldEF0dHJpYnV0ZSByZWFsbHkgcmV0dXJucyBhdHRyaWJ1dGVzIGFuZCBub3QgcHJvcGVydGllc1xuXHQvLyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcblx0c3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWVsLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcblx0fSk7XG5cblx0LyogZ2V0RWxlbWVudChzKUJ5KlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKSApO1xuXHRcdHJldHVybiAhZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLmxlbmd0aDtcblx0fSk7XG5cblx0Ly8gU3VwcG9ydDogSUU8OVxuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuXHQvLyBTdXBwb3J0OiBJRTwxMFxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcblx0Ly8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbW1hdGljYWxseS1zZXQgbmFtZXMsXG5cdC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuXHRzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBJRCBmaWx0ZXIgYW5kIGZpbmRcblx0aWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG5cdFx0RXhwci5maWx0ZXJbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHRcdEV4cHIuZmluZFtcIklEXCJdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXHRcdFx0XHRyZXR1cm4gZWxlbSA/IFsgZWxlbSBdIDogW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDcgb25seVxuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBub2RlLCBpLCBlbGVtcyxcblx0XHRcdFx0XHRlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHQvLyBWZXJpZnkgdGhlIGlkIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRmFsbCBiYWNrIG9uIGdldEVsZW1lbnRzQnlOYW1lXG5cdFx0XHRcdFx0ZWxlbXMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlOYW1lKCBpZCApO1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtc1tpKytdKSApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0Ly8gVGFnXG5cdEV4cHIuZmluZFtcIlRBR1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuXHRcdFx0fSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdC8vIEJ5IGhhcHB5IGNvaW5jaWRlbmNlLCBhIChicm9rZW4pIGdFQlROIGFwcGVhcnMgb24gRG9jdW1lbnRGcmFnbWVudCBub2RlcyB0b29cblx0XHRcdFx0cmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBGaWx0ZXIgb3V0IHBvc3NpYmxlIGNvbW1lbnRzXG5cdFx0XHRpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdHRtcC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0Ly8gQ2xhc3Ncblx0RXhwci5maW5kW1wiQ0xBU1NcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcblx0XHR9XG5cdH07XG5cblx0LyogUVNBL21hdGNoZXNTZWxlY3RvclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG5cdC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG5cdHJidWdneU1hdGNoZXMgPSBbXTtcblxuXHQvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuXHQvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3Jcblx0Ly8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuXHQvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuXHQvLyBTZWUgaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEzMzc4XG5cdHJidWdneVFTQSA9IFtdO1xuXG5cdGlmICggKHN1cHBvcnQucXNhID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICkpICkge1xuXHRcdC8vIEJ1aWxkIFFTQSByZWdleFxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0Ly8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuXHRcdFx0Ly8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG5cdFx0XHQvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcblx0XHRcdC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzNTlcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxyXFxcXCcgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuXHRcdFx0XHRcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcblx0XHRcdC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cblx0XHRcdC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuXHRcdFx0Ly8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9oaDQ2NTM4OC5hc3B4I2F0dHJpYnV0ZV9zZWN0aW9uXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwifj1cIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXG5cdFx0XHQvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM2ODUxXG5cdFx0XHQvLyBJbi1wYWdlIGBzZWxlY3RvciNpZCBzaWJsaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIi4jLitbK35dXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nJyBkaXNhYmxlZD0nZGlzYWJsZWQnPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBkaXNhYmxlZD0nZGlzYWJsZWQnPjxvcHRpb24vPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcblx0XHRcdC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuXHRcdFx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIltuYW1lPWRdXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdFx0XHQvLyBJRSdzIDpkaXNhYmxlZCBzZWxlY3RvciBkb2VzIG5vdCBwaWNrIHVwIHRoZSBjaGlsZHJlbiBvZiBkaXNhYmxlZCBmaWVsZHNldHNcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiOmRpc2FibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZWwucXVlcnlTZWxlY3RvckFsbChcIiosOnhcIik7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaChcIiwuKjpcIik7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIChzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciA9IHJuYXRpdmUudGVzdCggKG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcblx0XHRkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvcikgKSkgKSB7XG5cblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHQvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuXHRcdFx0c3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZWwsIFwiKlwiICk7XG5cblx0XHRcdC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cblx0XHRcdC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcblx0XHRcdG1hdGNoZXMuY2FsbCggZWwsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcblx0Ly8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcblx0Y29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG5cdFx0XHRcdGFkb3duLmNvbnRhaW5zID9cblx0XHRcdFx0XHRhZG93bi5jb250YWlucyggYnVwICkgOlxuXHRcdFx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuXHRcdFx0KSk7XG5cdFx0fSA6XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGIgPSBiLnBhcmVudE5vZGUpICkge1xuXHRcdFx0XHRcdGlmICggYiA9PT0gYSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0LyogU29ydGluZ1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuXHRzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdFx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdHJldHVybiBjb21wYXJlO1xuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0XHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuXHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0XHQxO1xuXG5cdFx0Ly8gRGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0aWYgKCBjb21wYXJlICYgMSB8fFxuXHRcdFx0KCFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUpICkge1xuXG5cdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRcdGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBhKSApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBiID09PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuXHR9IDpcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cdFx0XHRyZXR1cm4gYSA9PT0gZG9jdW1lbnQgPyAtMSA6XG5cdFx0XHRcdGIgPT09IGRvY3VtZW50ID8gMSA6XG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblxuXHRcdC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXG5cdFx0fSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG5cdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhLCBiICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgZnVsbCBsaXN0cyBvZiB0aGVpciBhbmNlc3RvcnMgZm9yIGNvbXBhcmlzb25cblx0XHRjdXIgPSBhO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGFwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblx0XHRjdXIgPSBiO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGJwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblxuXHRcdC8vIFdhbGsgZG93biB0aGUgdHJlZSBsb29raW5nIGZvciBhIGRpc2NyZXBhbmN5XG5cdFx0d2hpbGUgKCBhcFtpXSA9PT0gYnBbaV0gKSB7XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGkgP1xuXHRcdFx0Ly8gRG8gYSBzaWJsaW5nIGNoZWNrIGlmIHRoZSBub2RlcyBoYXZlIGEgY29tbW9uIGFuY2VzdG9yXG5cdFx0XHRzaWJsaW5nQ2hlY2soIGFwW2ldLCBicFtpXSApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XG5cdFx0XHRhcFtpXSA9PT0gcHJlZmVycmVkRG9jID8gLTEgOlxuXHRcdFx0YnBbaV0gPT09IHByZWZlcnJlZERvYyA/IDEgOlxuXHRcdFx0MDtcblx0fTtcblxuXHRyZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0Ly8gTWFrZSBzdXJlIHRoYXQgYXR0cmlidXRlIHNlbGVjdG9ycyBhcmUgcXVvdGVkXG5cdGV4cHIgPSBleHByLnJlcGxhY2UoIHJhdHRyaWJ1dGVRdW90ZXMsIFwiPSckMSddXCIgKTtcblxuXHRpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0IWNvbXBpbGVyQ2FjaGVbIGV4cHIgKyBcIiBcIiBdICYmXG5cdFx0KCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuXHRcdCggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cblx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRcdGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcblx0XHRcdFx0XHQvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuXHRcdFx0XHRcdC8vIGZyYWdtZW50IGluIElFIDlcblx0XHRcdFx0XHRlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0fVxuXHRyZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0dmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0Zm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcblx0XHRcdHVuZGVmaW5lZDtcblxuXHRyZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuXHRcdHZhbCA6XG5cdFx0c3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcblx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xufTtcblxuU2l6emxlLmVzY2FwZSA9IGZ1bmN0aW9uKCBzZWwgKSB7XG5cdHJldHVybiAoc2VsICsgXCJcIikucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG5cdHZhciBlbGVtLFxuXHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRqID0gMCxcblx0XHRpID0gMDtcblxuXHQvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG5cdGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG5cdHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG5cdGlmICggaGFzRHVwbGljYXRlICkge1xuXHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBub2RlLFxuXHRcdHJldCA9IFwiXCIsXG5cdFx0aSA9IDAsXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdGlmICggIW5vZGVUeXBlICkge1xuXHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0d2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XG5cdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0cmV0ICs9IGdldFRleHQoIG5vZGUgKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcblx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1Mylcblx0XHRpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdH1cblx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0cmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG5cdC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuXHRjYWNoZUxlbmd0aDogNTAsXG5cblx0Y3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cblx0bWF0Y2g6IG1hdGNoRXhwcixcblxuXHRhdHRySGFuZGxlOiB7fSxcblxuXHRmaW5kOiB7fSxcblxuXHRyZWxhdGl2ZToge1xuXHRcdFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuXHRcdFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuXHR9LFxuXG5cdHByZUZpbHRlcjoge1xuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG5cdFx0XHRtYXRjaFszXSA9ICggbWF0Y2hbM10gfHwgbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcblx0XHRcdFx0bWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcblx0XHRcdFx0Ly8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcblx0XHRcdFx0aWYgKCAhbWF0Y2hbM10gKSB7XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG5cdFx0XHRcdC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcblx0XHRcdFx0bWF0Y2hbNF0gPSArKCBtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqICggbWF0Y2hbM10gPT09IFwiZXZlblwiIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICkgKTtcblx0XHRcdFx0bWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG5cdFx0XHQvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaDtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0dmFyIGV4Y2Vzcyxcblx0XHRcdFx0dW5xdW90ZWQgPSAhbWF0Y2hbNl0gJiYgbWF0Y2hbMl07XG5cblx0XHRcdGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG5cdFx0XHRpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRtYXRjaFsyXSA9IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCI7XG5cblx0XHRcdC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcblx0XHRcdFx0Ly8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcblx0XHRcdFx0KGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxuXHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcblx0XHRcdFx0KGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XG5cblx0XHRcdFx0Ly8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcblx0XHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHRcdG1hdGNoWzJdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXI6IHtcblxuXHRcdFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuXHRcdFx0dmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG5cdFx0XHR2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cblx0XHRcdHJldHVybiBwYXR0ZXJuIHx8XG5cdFx0XHRcdChwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSkgJiZcblx0XHRcdFx0Y2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xuXHRcdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcblx0XHRcdHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG5cdFx0XHRcdGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcblx0XHRcdFx0b2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cblx0XHRcdHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuXHRcdFx0XHQvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fSA6XG5cblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLCBub2RlLCBub2RlSW5kZXgsIHN0YXJ0LFxuXHRcdFx0XHRcdFx0ZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcblx0XHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdG5hbWUgPSBvZlR5cGUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0dXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGUsXG5cdFx0XHRcdFx0XHRkaWZmID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHRcdFx0aWYgKCBzaW1wbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggZGlyICkge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSBub2RlWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRub2RlID0gcGFyZW50O1xuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4ICYmIGNhY2hlWyAyIF07XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBub2RlSW5kZXggJiYgcGFyZW50LmNoaWxkTm9kZXNbIG5vZGVJbmRleCBdO1xuXG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2hlbiBmb3VuZCwgY2FjaGUgaW5kZXhlcyBvbiBgcGFyZW50YCBhbmQgYnJlYWtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKytkaWZmICYmIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcblx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4O1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8geG1sIDpudGgtY2hpbGQoLi4uKVxuXHRcdFx0XHRcdFx0XHQvLyBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXG5cdFx0XHRcdFx0XHRcdGlmICggZGlmZiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0KytkaWZmICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIENhY2hlIHRoZSBpbmRleCBvZiBlYWNoIGVuY291bnRlcmVkIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcblx0XHRcdFx0XHRcdGRpZmYgLT0gbGFzdDtcblx0XHRcdFx0XHRcdHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG5cdFx0XHQvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcblx0XHRcdC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG5cdFx0XHQvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG5cdFx0XHR2YXIgYXJncyxcblx0XHRcdFx0Zm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cblx0XHRcdC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcblx0XHRcdC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG5cdFx0XHQvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG5cdFx0XHRpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHJldHVybiBmbiggYXJndW1lbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG5cdFx0XHRpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcdGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuXHRcdFx0XHRyZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cblx0XHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHRcdFx0XHR2YXIgaWR4LFxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG5cdFx0XHRcdFx0XHRcdGkgPSBtYXRjaGVkLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuO1xuXHRcdH1cblx0fSxcblxuXHRwc2V1ZG9zOiB7XG5cdFx0Ly8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXG5cdFx0XCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXG5cdFx0XHQvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xuXHRcdFx0Ly8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXG5cdFx0XHR2YXIgaW5wdXQgPSBbXSxcblx0XHRcdFx0cmVzdWx0cyA9IFtdLFxuXHRcdFx0XHRtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cblx0XHRcdHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuXHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0XHRcdHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcblx0XHRcdFx0XHRcdGkgPSBzZWVkLmxlbmd0aDtcblxuXHRcdFx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRzZWVkW2ldID0gIShtYXRjaGVzW2ldID0gZWxlbSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0aW5wdXRbMF0gPSBlbGVtO1xuXHRcdFx0XHRcdG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcblx0XHRcdFx0XHQvLyBEb24ndCBrZWVwIHRoZSBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0XHRcdGlucHV0WzBdID0gbnVsbDtcblx0XHRcdFx0XHRyZXR1cm4gIXJlc3VsdHMucG9wKCk7XG5cdFx0XHRcdH07XG5cdFx0fSksXG5cblx0XHRcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLnRleHRDb250ZW50IHx8IGVsZW0uaW5uZXJUZXh0IHx8IGdldFRleHQoIGVsZW0gKSApLmluZGV4T2YoIHRleHQgKSA+IC0xO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxuXHRcdC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG5cdFx0Ly8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcblx0XHQvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxuXHRcdC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuXHRcdC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcblx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXG5cdFx0XCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG5cdFx0XHQvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXG5cdFx0XHRpZiAoICFyaWRlbnRpZmllci50ZXN0KGxhbmcgfHwgXCJcIikgKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcgKTtcblx0XHRcdH1cblx0XHRcdGxhbmcgPSBsYW5nLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIGVsZW1MYW5nO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRcdFx0XHRlbGVtLmxhbmcgOlxuXHRcdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoXCJ4bWw6bGFuZ1wiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImxhbmdcIikpICkge1xuXG5cdFx0XHRcdFx0XHRlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlICggKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdC8vIE1pc2NlbGxhbmVvdXNcblx0XHRcInRhcmdldFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXHRcdFx0cmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xuXHRcdH0sXG5cblx0XHRcInJvb3RcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jRWxlbTtcblx0XHR9LFxuXG5cdFx0XCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICghZG9jdW1lbnQuaGFzRm9jdXMgfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSkgJiYgISEoZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCk7XG5cdFx0fSxcblxuXHRcdC8vIEJvb2xlYW4gcHJvcGVydGllc1xuXHRcdFwiZW5hYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZmFsc2UgKSxcblx0XHRcImRpc2FibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCB0cnVlICksXG5cblx0XHRcImNoZWNrZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gKG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgISFlbGVtLmNoZWNrZWQpIHx8IChub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQpO1xuXHRcdH0sXG5cblx0XHRcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxuXHRcdFx0Ly8gb3B0aW9ucyBpbiBTYWZhcmkgd29yayBwcm9wZXJseVxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gQ29udGVudHNcblx0XHRcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cblx0XHRcdC8vIDplbXB0eSBpcyBuZWdhdGVkIGJ5IGVsZW1lbnQgKDEpIG9yIGNvbnRlbnQgbm9kZXMgKHRleHQ6IDM7IGNkYXRhOiA0OyBlbnRpdHkgcmVmOiA1KSxcblx0XHRcdC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXG5cdFx0XHQvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlIDwgNiApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRcInBhcmVudFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAhRXhwci5wc2V1ZG9zW1wiZW1wdHlcIl0oIGVsZW0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gRWxlbWVudC9pbnB1dCB0eXBlc1xuXHRcdFwiaGVhZGVyXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJoZWFkZXIudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIjtcblx0XHR9LFxuXG5cdFx0XCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGF0dHI7XG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcblx0XHRcdFx0ZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFPDhcblx0XHRcdFx0Ly8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcblx0XHRcdFx0KCAoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG5cdFx0fSxcblxuXHRcdC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cblx0XHRcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyAwIF07XG5cdFx0fSksXG5cblx0XHRcImxhc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gWyBsZW5ndGggLSAxIF07XG5cdFx0fSksXG5cblx0XHRcImVxXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHJldHVybiBbIGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQgXTtcblx0XHR9KSxcblxuXHRcdFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwib2RkXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7IC0taSA+PSAwOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSlcblx0fVxufTtcblxuRXhwci5wc2V1ZG9zW1wibnRoXCJdID0gRXhwci5wc2V1ZG9zW1wiZXFcIl07XG5cbi8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXG5mb3IgKCBpIGluIHsgcmFkaW86IHRydWUsIGNoZWNrYm94OiB0cnVlLCBmaWxlOiB0cnVlLCBwYXNzd29yZDogdHJ1ZSwgaW1hZ2U6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVJbnB1dFBzZXVkbyggaSApO1xufVxuZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbn1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG5mdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbnNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxudG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcblx0dmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXG5cdFx0c29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcblx0XHRjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCBjYWNoZWQgKSB7XG5cdFx0cmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcblx0fVxuXG5cdHNvRmFyID0gc2VsZWN0b3I7XG5cdGdyb3VwcyA9IFtdO1xuXHRwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cblx0d2hpbGUgKCBzb0ZhciApIHtcblxuXHRcdC8vIENvbW1hIGFuZCBmaXJzdCBydW5cblx0XHRpZiAoICFtYXRjaGVkIHx8IChtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdGlmICggbWF0Y2ggKSB7XG5cdFx0XHRcdC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWzBdLmxlbmd0aCApIHx8IHNvRmFyO1xuXHRcdFx0fVxuXHRcdFx0Z3JvdXBzLnB1c2goICh0b2tlbnMgPSBbXSkgKTtcblx0XHR9XG5cblx0XHRtYXRjaGVkID0gZmFsc2U7XG5cblx0XHQvLyBDb21iaW5hdG9yc1xuXHRcdGlmICggKG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkpICkge1xuXHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHR0b2tlbnMucHVzaCh7XG5cdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHQvLyBDYXN0IGRlc2NlbmRhbnQgY29tYmluYXRvcnMgdG8gc3BhY2Vcblx0XHRcdFx0dHlwZTogbWF0Y2hbMF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcblx0XHRcdH0pO1xuXHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGaWx0ZXJzXG5cdFx0Zm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcblx0XHRcdGlmICggKG1hdGNoID0gbWF0Y2hFeHByWyB0eXBlIF0uZXhlYyggc29GYXIgKSkgJiYgKCFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcblx0XHRcdFx0KG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApKSkgKSB7XG5cdFx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0XHRtYXRjaGVzOiBtYXRjaFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoICFtYXRjaGVkICkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG5cdC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xuXHQvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcblx0cmV0dXJuIHBhcnNlT25seSA/XG5cdFx0c29GYXIubGVuZ3RoIDpcblx0XHRzb0ZhciA/XG5cdFx0XHRTaXp6bGUuZXJyb3IoIHNlbGVjdG9yICkgOlxuXHRcdFx0Ly8gQ2FjaGUgdGhlIHRva2Vuc1xuXHRcdFx0dG9rZW5DYWNoZSggc2VsZWN0b3IsIGdyb3VwcyApLnNsaWNlKCAwICk7XG59O1xuXG5mdW5jdGlvbiB0b1NlbGVjdG9yKCB0b2tlbnMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdHNlbGVjdG9yID0gXCJcIjtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0c2VsZWN0b3IgKz0gdG9rZW5zW2ldLnZhbHVlO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcblx0dmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuXHRcdHNraXAgPSBjb21iaW5hdG9yLm5leHQsXG5cdFx0a2V5ID0gc2tpcCB8fCBkaXIsXG5cdFx0Y2hlY2tOb25FbGVtZW50cyA9IGJhc2UgJiYga2V5ID09PSBcInBhcmVudE5vZGVcIixcblx0XHRkb25lTmFtZSA9IGRvbmUrKztcblxuXHRyZXR1cm4gY29tYmluYXRvci5maXJzdCA/XG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBjbG9zZXN0IGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gOlxuXG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBhbGwgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRzXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBvbGRDYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsXG5cdFx0XHRcdG5ld0NhY2hlID0gWyBkaXJydW5zLCBkb25lTmFtZSBdO1xuXG5cdFx0XHQvLyBXZSBjYW4ndCBzZXQgYXJiaXRyYXJ5IGRhdGEgb24gWE1MIG5vZGVzLCBzbyB0aGV5IGRvbid0IGJlbmVmaXQgZnJvbSBjb21iaW5hdG9yIGNhY2hpbmdcblx0XHRcdGlmICggeG1sICkge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoZWxlbVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdIHx8IChvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdGlmICggc2tpcCAmJiBza2lwID09PSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW0gPSBlbGVtWyBkaXIgXSB8fCBlbGVtO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggKG9sZENhY2hlID0gdW5pcXVlQ2FjaGVbIGtleSBdKSAmJlxuXHRcdFx0XHRcdFx0XHRvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFzc2lnbiB0byBuZXdDYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHJldHVybiAobmV3Q2FjaGVbIDIgXSA9IG9sZENhY2hlWyAyIF0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gUmV1c2UgbmV3Y2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsga2V5IF0gPSBuZXdDYWNoZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcblx0XHRcdFx0XHRcdFx0aWYgKCAobmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcblx0cmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICFtYXRjaGVyc1tpXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IDpcblx0XHRtYXRjaGVyc1swXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gY29udGV4dHMubGVuZ3RoO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1tpXSwgcmVzdWx0cyApO1xuXHR9XG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuXHR2YXIgZWxlbSxcblx0XHRuZXdVbm1hdGNoZWQgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxuXHRcdG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0aWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdGlmICggbWFwcGVkICkge1xuXHRcdFx0XHRcdG1hcC5wdXNoKCBpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3VW5tYXRjaGVkO1xufVxuXG5mdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG5cdGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG5cdH1cblx0aWYgKCBwb3N0RmluZGVyICYmICFwb3N0RmluZGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbmRlciA9IHNldE1hdGNoZXIoIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApO1xuXHR9XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCApIHtcblx0XHR2YXIgdGVtcCwgaSwgZWxlbSxcblx0XHRcdHByZU1hcCA9IFtdLFxuXHRcdFx0cG9zdE1hcCA9IFtdLFxuXHRcdFx0cHJlZXhpc3RpbmcgPSByZXN1bHRzLmxlbmd0aCxcblxuXHRcdFx0Ly8gR2V0IGluaXRpYWwgZWxlbWVudHMgZnJvbSBzZWVkIG9yIGNvbnRleHRcblx0XHRcdGVsZW1zID0gc2VlZCB8fCBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciB8fCBcIipcIiwgY29udGV4dC5ub2RlVHlwZSA/IFsgY29udGV4dCBdIDogY29udGV4dCwgW10gKSxcblxuXHRcdFx0Ly8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXG5cdFx0XHRtYXRjaGVySW4gPSBwcmVGaWx0ZXIgJiYgKCBzZWVkIHx8ICFzZWxlY3RvciApID9cblx0XHRcdFx0Y29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRlbGVtcyxcblxuXHRcdFx0bWF0Y2hlck91dCA9IG1hdGNoZXIgP1xuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGEgcG9zdEZpbmRlciwgb3IgZmlsdGVyZWQgc2VlZCwgb3Igbm9uLXNlZWQgcG9zdEZpbHRlciBvciBwcmVleGlzdGluZyByZXN1bHRzLFxuXHRcdFx0XHRwb3N0RmluZGVyIHx8ICggc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIgKSA/XG5cblx0XHRcdFx0XHQvLyAuLi5pbnRlcm1lZGlhdGUgcHJvY2Vzc2luZyBpcyBuZWNlc3Nhcnlcblx0XHRcdFx0XHRbXSA6XG5cblx0XHRcdFx0XHQvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcblx0XHRcdFx0XHRyZXN1bHRzIDpcblx0XHRcdFx0bWF0Y2hlckluO1xuXG5cdFx0Ly8gRmluZCBwcmltYXJ5IG1hdGNoZXNcblx0XHRpZiAoIG1hdGNoZXIgKSB7XG5cdFx0XHRtYXRjaGVyKCBtYXRjaGVySW4sIG1hdGNoZXJPdXQsIGNvbnRleHQsIHhtbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHBvc3RGaWx0ZXJcblx0XHRpZiAoIHBvc3RGaWx0ZXIgKSB7XG5cdFx0XHR0ZW1wID0gY29uZGVuc2UoIG1hdGNoZXJPdXQsIHBvc3RNYXAgKTtcblx0XHRcdHBvc3RGaWx0ZXIoIHRlbXAsIFtdLCBjb250ZXh0LCB4bWwgKTtcblxuXHRcdFx0Ly8gVW4tbWF0Y2ggZmFpbGluZyBlbGVtZW50cyBieSBtb3ZpbmcgdGhlbSBiYWNrIHRvIG1hdGNoZXJJblxuXHRcdFx0aSA9IHRlbXAubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggKGVsZW0gPSB0ZW1wW2ldKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyT3V0WyBwb3N0TWFwW2ldIF0gPSAhKG1hdGNoZXJJblsgcG9zdE1hcFtpXSBdID0gZWxlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuXHRcdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXG5cdFx0XHRcdFx0dGVtcCA9IFtdO1xuXHRcdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSApIHtcblx0XHRcdFx0XHRcdFx0Ly8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcblx0XHRcdFx0XHRcdFx0dGVtcC5wdXNoKCAobWF0Y2hlckluW2ldID0gZWxlbSkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTW92ZSBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2VlZCB0byByZXN1bHRzIHRvIGtlZXAgdGhlbSBzeW5jaHJvbml6ZWRcblx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgJiZcblx0XHRcdFx0XHRcdCh0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuXHRcdFx0XHRcdFx0c2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXJPdXQgPSBjb25kZW5zZShcblx0XHRcdFx0bWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG5cdFx0XHRcdFx0bWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcblx0XHRcdFx0XHRtYXRjaGVyT3V0XG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuXHR2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0bGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcblx0XHRpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxuXHRcdGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuXHRcdC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG5cdFx0bWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaGVycyA9IFsgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciByZXQgPSAoICFsZWFkaW5nUmVsYXRpdmUgJiYgKCB4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCApICkgfHwgKFxuXHRcdFx0XHQoY2hlY2tDb250ZXh0ID0gY29udGV4dCkubm9kZVR5cGUgP1xuXHRcdFx0XHRcdG1hdGNoQ29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRcdG1hdGNoQW55Q29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgKTtcblx0XHRcdC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0Y2hlY2tDb250ZXh0ID0gbnVsbDtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSBdO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKG1hdGNoZXIgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbaV0udHlwZSBdKSApIHtcblx0XHRcdG1hdGNoZXJzID0gWyBhZGRDb21iaW5hdG9yKGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLCBtYXRjaGVyKSBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1tpXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1tpXS5tYXRjaGVzICk7XG5cblx0XHRcdC8vIFJldHVybiBzcGVjaWFsIHVwb24gc2VlaW5nIGEgcG9zaXRpb25hbCBtYXRjaGVyXG5cdFx0XHRpZiAoIG1hdGNoZXJbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCByZWxhdGl2ZSBvcGVyYXRvciAoaWYgYW55KSBmb3IgcHJvcGVyIGhhbmRsaW5nXG5cdFx0XHRcdGogPSArK2k7XG5cdFx0XHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2pdLnR5cGUgXSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2V0TWF0Y2hlcihcblx0XHRcdFx0XHRpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcblx0XHRcdFx0XHRpID4gMSAmJiB0b1NlbGVjdG9yKFxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcblx0XHRcdFx0XHRcdHRva2Vucy5zbGljZSggMCwgaSAtIDEgKS5jb25jYXQoeyB2YWx1ZTogdG9rZW5zWyBpIC0gMiBdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiIH0pXG5cdFx0XHRcdFx0KS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG5cdFx0XHRcdFx0bWF0Y2hlcixcblx0XHRcdFx0XHRpIDwgaiAmJiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLnNsaWNlKCBpLCBqICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAodG9rZW5zID0gdG9rZW5zLnNsaWNlKCBqICkpICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkge1xuXHR2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcblx0XHRcdHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuXHRcdFx0XHRtYXRjaGVkQ291bnQgPSAwLFxuXHRcdFx0XHRpID0gXCIwXCIsXG5cdFx0XHRcdHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG5cdFx0XHRcdHNldE1hdGNoZWQgPSBbXSxcblx0XHRcdFx0Y29udGV4dEJhY2t1cCA9IG91dGVybW9zdENvbnRleHQsXG5cdFx0XHRcdC8vIFdlIG11c3QgYWx3YXlzIGhhdmUgZWl0aGVyIHNlZWQgZWxlbWVudHMgb3Igb3V0ZXJtb3N0IGNvbnRleHRcblx0XHRcdFx0ZWxlbXMgPSBzZWVkIHx8IGJ5RWxlbWVudCAmJiBFeHByLmZpbmRbXCJUQUdcIl0oIFwiKlwiLCBvdXRlcm1vc3QgKSxcblx0XHRcdFx0Ly8gVXNlIGludGVnZXIgZGlycnVucyBpZmYgdGhpcyBpcyB0aGUgb3V0ZXJtb3N0IG1hdGNoZXJcblx0XHRcdFx0ZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXG5cdFx0XHRcdGxlbiA9IGVsZW1zLmxlbmd0aDtcblxuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ID09PSBkb2N1bWVudCB8fCBjb250ZXh0IHx8IG91dGVybW9zdDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcblx0XHRcdC8vIFN1cHBvcnQ6IElFPDksIFNhZmFyaVxuXHRcdFx0Ly8gVG9sZXJhdGUgTm9kZUxpc3QgcHJvcGVydGllcyAoSUU6IFwibGVuZ3RoXCI7IFNhZmFyaTogPG51bWJlcj4pIG1hdGNoaW5nIGVsZW1lbnRzIGJ5IGlkXG5cdFx0XHRmb3IgKCA7IGkgIT09IGxlbiAmJiAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggYnlFbGVtZW50ICYmIGVsZW0gKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0aWYgKCAhY29udGV4dCAmJiBlbGVtLm93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50ICkge1xuXHRcdFx0XHRcdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0XHRcdFx0XHRcdHhtbCA9ICFkb2N1bWVudElzSFRNTDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKCAobWF0Y2hlciA9IGVsZW1lbnRNYXRjaGVyc1tqKytdKSApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCB8fCBkb2N1bWVudCwgeG1sKSApIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcblx0XHRcdFx0aWYgKCBieVNldCApIHtcblx0XHRcdFx0XHQvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0pICkge1xuXHRcdFx0XHRcdFx0bWF0Y2hlZENvdW50LS07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuXHRcdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHRcdHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGBpYCBpcyBub3cgdGhlIGNvdW50IG9mIGVsZW1lbnRzIHZpc2l0ZWQgYWJvdmUsIGFuZCBhZGRpbmcgaXQgdG8gYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIG1ha2VzIHRoZSBsYXR0ZXIgbm9ubmVnYXRpdmUuXG5cdFx0XHRtYXRjaGVkQ291bnQgKz0gaTtcblxuXHRcdFx0Ly8gQXBwbHkgc2V0IGZpbHRlcnMgdG8gdW5tYXRjaGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBOT1RFOiBUaGlzIGNhbiBiZSBza2lwcGVkIGlmIHRoZXJlIGFyZSBubyB1bm1hdGNoZWQgZWxlbWVudHMgKGkuZS4sIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBlcXVhbHMgYGlgKSwgdW5sZXNzIHdlIGRpZG4ndCB2aXNpdCBfYW55XyBlbGVtZW50cyBpbiB0aGUgYWJvdmUgbG9vcCBiZWNhdXNlIHdlIGhhdmVcblx0XHRcdC8vIG5vIGVsZW1lbnQgbWF0Y2hlcnMgYW5kIG5vIHNlZWQuXG5cdFx0XHQvLyBJbmNyZW1lbnRpbmcgYW4gaW5pdGlhbGx5LXN0cmluZyBcIjBcIiBgaWAgYWxsb3dzIGBpYCB0byByZW1haW4gYSBzdHJpbmcgb25seSBpbiB0aGF0XG5cdFx0XHQvLyBjYXNlLCB3aGljaCB3aWxsIHJlc3VsdCBpbiBhIFwiMDBcIiBgbWF0Y2hlZENvdW50YCB0aGF0IGRpZmZlcnMgZnJvbSBgaWAgYnV0IGlzIGFsc29cblx0XHRcdC8vIG51bWVyaWNhbGx5IHplcm8uXG5cdFx0XHRpZiAoIGJ5U2V0ICYmIGkgIT09IG1hdGNoZWRDb3VudCApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBzZXRNYXRjaGVyc1tqKytdKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyKCB1bm1hdGNoZWQsIHNldE1hdGNoZWQsIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhKHVubWF0Y2hlZFtpXSB8fCBzZXRNYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRNYXRjaGVkW2ldID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXG5cdFx0XHRcdFx0c2V0TWF0Y2hlZCA9IGNvbmRlbnNlKCBzZXRNYXRjaGVkICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcblxuXHRcdFx0XHQvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcblx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0KCBtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGggKSA+IDEgKSB7XG5cblx0XHRcdFx0XHRTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE92ZXJyaWRlIG1hbmlwdWxhdGlvbiBvZiBnbG9iYWxzIGJ5IG5lc3RlZCBtYXRjaGVyc1xuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dEJhY2t1cDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVubWF0Y2hlZDtcblx0XHR9O1xuXG5cdHJldHVybiBieVNldCA/XG5cdFx0bWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG5cdFx0c3VwZXJNYXRjaGVyO1xufVxuXG5jb21waWxlID0gU2l6emxlLmNvbXBpbGUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIG1hdGNoIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHR2YXIgaSxcblx0XHRzZXRNYXRjaGVycyA9IFtdLFxuXHRcdGVsZW1lbnRNYXRjaGVycyA9IFtdLFxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoICFjYWNoZWQgKSB7XG5cdFx0Ly8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XG5cdFx0aWYgKCAhbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaCA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXHRcdH1cblx0XHRpID0gbWF0Y2gubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0Y2FjaGVkID0gbWF0Y2hlckZyb21Ub2tlbnMoIG1hdGNoW2ldICk7XG5cdFx0XHRpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlKCBzZWxlY3RvciwgbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkgKTtcblxuXHRcdC8vIFNhdmUgc2VsZWN0b3IgYW5kIHRva2VuaXphdGlvblxuXHRcdGNhY2hlZC5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHR9XG5cdHJldHVybiBjYWNoZWQ7XG59O1xuXG4vKipcbiAqIEEgbG93LWxldmVsIHNlbGVjdGlvbiBmdW5jdGlvbiB0aGF0IHdvcmtzIHdpdGggU2l6emxlJ3MgY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzZWxlY3RvciBBIHNlbGVjdG9yIG9yIGEgcHJlLWNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb24gYnVpbHQgd2l0aCBTaXp6bGUuY29tcGlsZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZXh0XG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0c11cbiAqIEBwYXJhbSB7QXJyYXl9IFtzZWVkXSBBIHNldCBvZiBlbGVtZW50cyB0byBtYXRjaCBhZ2FpbnN0XG4gKi9cbnNlbGVjdCA9IFNpenpsZS5zZWxlY3QgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBpLCB0b2tlbnMsIHRva2VuLCB0eXBlLCBmaW5kLFxuXHRcdGNvbXBpbGVkID0gdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgc2VsZWN0b3IsXG5cdFx0bWF0Y2ggPSAhc2VlZCAmJiB0b2tlbml6ZSggKHNlbGVjdG9yID0gY29tcGlsZWQuc2VsZWN0b3IgfHwgc2VsZWN0b3IpICk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgb25seSBvbmUgc2VsZWN0b3IgaW4gdGhlIGxpc3QgYW5kIG5vIHNlZWRcblx0Ly8gKHRoZSBsYXR0ZXIgb2Ygd2hpY2ggZ3VhcmFudGVlcyB1cyBjb250ZXh0KVxuXHRpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuXHRcdC8vIFJlZHVjZSBjb250ZXh0IGlmIHRoZSBsZWFkaW5nIGNvbXBvdW5kIHNlbGVjdG9yIGlzIGFuIElEXG5cdFx0dG9rZW5zID0gbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCApO1xuXHRcdGlmICggdG9rZW5zLmxlbmd0aCA+IDIgJiYgKHRva2VuID0gdG9rZW5zWzBdKS50eXBlID09PSBcIklEXCIgJiZcblx0XHRcdFx0Y29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJiBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0udHlwZSBdICkge1xuXG5cdFx0XHRjb250ZXh0ID0gKCBFeHByLmZpbmRbXCJJRFwiXSggdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKSwgY29udGV4dCApIHx8IFtdIClbMF07XG5cdFx0XHRpZiAoICFjb250ZXh0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0Ly8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuXHRcdFx0fSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcblx0XHRpID0gbWF0Y2hFeHByW1wibmVlZHNDb250ZXh0XCJdLnRlc3QoIHNlbGVjdG9yICkgPyAwIDogdG9rZW5zLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRva2VuID0gdG9rZW5zW2ldO1xuXG5cdFx0XHQvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG5cdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbICh0eXBlID0gdG9rZW4udHlwZSkgXSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIChmaW5kID0gRXhwci5maW5kWyB0eXBlIF0pICkge1xuXHRcdFx0XHQvLyBTZWFyY2gsIGV4cGFuZGluZyBjb250ZXh0IGZvciBsZWFkaW5nIHNpYmxpbmcgY29tYmluYXRvcnNcblx0XHRcdFx0aWYgKCAoc2VlZCA9IGZpbmQoXG5cdFx0XHRcdFx0dG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxuXHRcdFx0XHRcdHJzaWJsaW5nLnRlc3QoIHRva2Vuc1swXS50eXBlICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0XHRcdFx0KSkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiBzZWVkIGlzIGVtcHR5IG9yIG5vIHRva2VucyByZW1haW4sIHdlIGNhbiByZXR1cm4gZWFybHlcblx0XHRcdFx0XHR0b2tlbnMuc3BsaWNlKCBpLCAxICk7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKTtcblx0XHRcdFx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNlZWQgKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29tcGlsZSBhbmQgZXhlY3V0ZSBhIGZpbHRlcmluZyBmdW5jdGlvbiBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG5cdC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcblx0KCBjb21waWxlZCB8fCBjb21waWxlKCBzZWxlY3RvciwgbWF0Y2ggKSApKFxuXHRcdHNlZWQsXG5cdFx0Y29udGV4dCxcblx0XHQhZG9jdW1lbnRJc0hUTUwsXG5cdFx0cmVzdWx0cyxcblx0XHQhY29udGV4dCB8fCByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdCk7XG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gT25lLXRpbWUgYXNzaWdubWVudHNcblxuLy8gU29ydCBzdGFiaWxpdHlcbnN1cHBvcnQuc29ydFN0YWJsZSA9IGV4cGFuZG8uc3BsaXQoXCJcIikuc29ydCggc29ydE9yZGVyICkuam9pbihcIlwiKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHQvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcblx0cmV0dXJuIGVsLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIikgKSAmIDE7XG59KTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XG5pZiAoICFhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIgO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggXCJ0eXBlfGhyZWZ8aGVpZ2h0fHdpZHRoXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyICk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGRlZmF1bHRWYWx1ZSBpbiBwbGFjZSBvZiBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuaWYgKCAhc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XG5cdGVsLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCBcInZhbHVlXCIsIFwiXCIgKTtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbmlmICggIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSA9PSBudWxsO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggYm9vbGVhbnMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgdmFsO1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW1bIG5hbWUgXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdFx0KHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xuXHRcdH1cblx0fSk7XG59XG5cbnJldHVybiBTaXp6bGU7XG5cbn0pKCB3aW5kb3cgKTtcblxuXG5cbmpRdWVyeS5maW5kID0gU2l6emxlO1xualF1ZXJ5LmV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzO1xuXG4vLyBEZXByZWNhdGVkXG5qUXVlcnkuZXhwclsgXCI6XCIgXSA9IGpRdWVyeS5leHByLnBzZXVkb3M7XG5qUXVlcnkudW5pcXVlU29ydCA9IGpRdWVyeS51bmlxdWUgPSBTaXp6bGUudW5pcXVlU29ydDtcbmpRdWVyeS50ZXh0ID0gU2l6emxlLmdldFRleHQ7XG5qUXVlcnkuaXNYTUxEb2MgPSBTaXp6bGUuaXNYTUw7XG5qUXVlcnkuY29udGFpbnMgPSBTaXp6bGUuY29udGFpbnM7XG5qUXVlcnkuZXNjYXBlU2VsZWN0b3IgPSBTaXp6bGUuZXNjYXBlO1xuXG5cblxuXG52YXIgZGlyID0gZnVuY3Rpb24oIGVsZW0sIGRpciwgdW50aWwgKSB7XG5cdHZhciBtYXRjaGVkID0gW10sXG5cdFx0dHJ1bmNhdGUgPSB1bnRpbCAhPT0gdW5kZWZpbmVkO1xuXG5cdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSAmJiBlbGVtLm5vZGVUeXBlICE9PSA5ICkge1xuXHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdGlmICggdHJ1bmNhdGUgJiYgalF1ZXJ5KCBlbGVtICkuaXMoIHVudGlsICkgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgc2libGluZ3MgPSBmdW5jdGlvbiggbiwgZWxlbSApIHtcblx0dmFyIG1hdGNoZWQgPSBbXTtcblxuXHRmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuXHRcdGlmICggbi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBlbGVtICkge1xuXHRcdFx0bWF0Y2hlZC5wdXNoKCBuICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xuXG5cblxuZnVuY3Rpb24gbm9kZU5hbWUoIGVsZW0sIG5hbWUgKSB7XG5cbiAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbn07XG52YXIgcnNpbmdsZVRhZyA9ICggL148KFthLXpdW15cXC9cXDA+OlxceDIwXFx0XFxyXFxuXFxmXSopW1xceDIwXFx0XFxyXFxuXFxmXSpcXC8/Pig/OjxcXC9cXDE+fCkkL2kgKTtcblxuXG5cbi8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XG5mdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcblx0aWYgKCBpc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTaW5nbGUgZWxlbWVudFxuXHRpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gQXJyYXlsaWtlIG9mIGVsZW1lbnRzIChqUXVlcnksIGFyZ3VtZW50cywgQXJyYXkpXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gRmlsdGVyZWQgZGlyZWN0bHkgZm9yIGJvdGggc2ltcGxlIGFuZCBjb21wbGV4IHNlbGVjdG9yc1xuXHRyZXR1cm4galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cywgbm90ICk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcblx0dmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG5cdGlmICggbm90ICkge1xuXHRcdGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG5cdH1cblxuXHRpZiAoIGVsZW1zLmxlbmd0aCA9PT0gMSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGVsZW0sIGV4cHIgKSA/IFsgZWxlbSBdIDogW107XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVHlwZSA9PT0gMTtcblx0fSApICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgaSwgcmV0LFxuXHRcdFx0bGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRzZWxmID0gdGhpcztcblxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkoIHNlbGVjdG9yICkuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKSApO1xuXHRcdH1cblxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBbXSApO1xuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbGVuID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCByZXQgKSA6IHJldDtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSApICk7XG5cdH0sXG5cdG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSApICk7XG5cdH0sXG5cdGlzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuICEhd2lubm93KFxuXHRcdFx0dGhpcyxcblxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxuXHRcdFx0Ly8gc28gJChcInA6Zmlyc3RcIikuaXMoXCJwOmxhc3RcIikgd29uJ3QgcmV0dXJuIHRydWUgZm9yIGEgZG9jIHdpdGggdHdvIFwicFwiLlxuXHRcdFx0dHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICYmIHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGpRdWVyeSggc2VsZWN0b3IgKSA6XG5cdFx0XHRcdHNlbGVjdG9yIHx8IFtdLFxuXHRcdFx0ZmFsc2Vcblx0XHQpLmxlbmd0aDtcblx0fVxufSApO1xuXG5cbi8vIEluaXRpYWxpemUgYSBqUXVlcnkgb2JqZWN0XG5cblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG52YXIgcm9vdGpRdWVyeSxcblxuXHQvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuXHQvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG5cdC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuXHQvLyBTaG9ydGN1dCBzaW1wbGUgI2lkIGNhc2UgZm9yIHNwZWVkXG5cdHJxdWlja0V4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSp8IyhbXFx3LV0rKSkkLyxcblxuXHRpbml0ID0galF1ZXJ5LmZuLmluaXQgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJvb3QgKSB7XG5cdFx0dmFyIG1hdGNoLCBlbGVtO1xuXG5cdFx0Ly8gSEFORExFOiAkKFwiXCIpLCAkKG51bGwpLCAkKHVuZGVmaW5lZCksICQoZmFsc2UpXG5cdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHQvLyBNZXRob2QgaW5pdCgpIGFjY2VwdHMgYW4gYWx0ZXJuYXRlIHJvb3RqUXVlcnlcblx0XHQvLyBzbyBtaWdyYXRlIGNhbiBzdXBwb3J0IGpRdWVyeS5zdWIgKGdoLTIxMDEpXG5cdFx0cm9vdCA9IHJvb3QgfHwgcm9vdGpRdWVyeTtcblxuXHRcdC8vIEhhbmRsZSBIVE1MIHN0cmluZ3Ncblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGlmICggc2VsZWN0b3JbIDAgXSA9PT0gXCI8XCIgJiZcblx0XHRcdFx0c2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiZcblx0XHRcdFx0c2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cblx0XHRcdFx0Ly8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcblx0XHRcdFx0bWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG5cdFx0XHRpZiAoIG1hdGNoICYmICggbWF0Y2hbIDEgXSB8fCAhY29udGV4dCApICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWyAxIF0gKSB7XG5cdFx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WyAwIF0gOiBjb250ZXh0O1xuXG5cdFx0XHRcdFx0Ly8gT3B0aW9uIHRvIHJ1biBzY3JpcHRzIGlzIHRydWUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdFx0Ly8gSW50ZW50aW9uYWxseSBsZXQgdGhlIGVycm9yIGJlIHRocm93biBpZiBwYXJzZUhUTUwgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG5cdFx0XHRcdFx0XHRtYXRjaFsgMSBdLFxuXHRcdFx0XHRcdFx0Y29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcblx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHQpICk7XG5cblx0XHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdFx0aWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWyAxIF0gKSAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29udGV4dCApICkge1xuXHRcdFx0XHRcdFx0Zm9yICggbWF0Y2ggaW4gY29udGV4dCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWyAyIF0gKTtcblxuXHRcdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSW5qZWN0IHRoZSBlbGVtZW50IGRpcmVjdGx5IGludG8gdGhlIGpRdWVyeSBvYmplY3Rcblx0XHRcdFx0XHRcdHRoaXNbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG5cdFx0XHR9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcblx0XHRcdFx0cmV0dXJuICggY29udGV4dCB8fCByb290ICkuZmluZCggc2VsZWN0b3IgKTtcblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG5cdFx0XHQvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuXHRcdH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuXHRcdFx0dGhpc1sgMCBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBpc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuXHRcdFx0cmV0dXJuIHJvb3QucmVhZHkgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHJvb3QucmVhZHkoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0c2VsZWN0b3IoIGpRdWVyeSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cblx0Ly8gTWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcblx0Z3VhcmFudGVlZFVuaXF1ZSA9IHtcblx0XHRjaGlsZHJlbjogdHJ1ZSxcblx0XHRjb250ZW50czogdHJ1ZSxcblx0XHRuZXh0OiB0cnVlLFxuXHRcdHByZXY6IHRydWVcblx0fTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRoYXM6IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG5cdFx0dmFyIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuXHRcdFx0bCA9IHRhcmdldHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbIGkgXSApICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0bWF0Y2hlZCA9IFtdLFxuXHRcdFx0dGFyZ2V0cyA9IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgJiYgalF1ZXJ5KCBzZWxlY3RvcnMgKTtcblxuXHRcdC8vIFBvc2l0aW9uYWwgc2VsZWN0b3JzIG5ldmVyIG1hdGNoLCBzaW5jZSB0aGVyZSdzIG5vIF9zZWxlY3Rpb25fIGNvbnRleHRcblx0XHRpZiAoICFybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmb3IgKCBjdXIgPSB0aGlzWyBpIF07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXG5cdFx0XHRcdFx0Ly8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG5cdFx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAoIHRhcmdldHMgP1xuXHRcdFx0XHRcdFx0dGFyZ2V0cy5pbmRleCggY3VyICkgPiAtMSA6XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdFx0Y3VyLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggY3VyLCBzZWxlY3RvcnMgKSApICkge1xuXG5cdFx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuXHR9LFxuXG5cdC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW4gdGhlIHNldFxuXHRpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzWyAwIF0gJiYgdGhpc1sgMCBdLnBhcmVudE5vZGUgKSA/IHRoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XG5cdFx0fVxuXG5cdFx0Ly8gSW5kZXggaW4gc2VsZWN0b3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggalF1ZXJ5KCBlbGVtICksIHRoaXNbIDAgXSApO1xuXHRcdH1cblxuXHRcdC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuXHRcdHJldHVybiBpbmRleE9mLmNhbGwoIHRoaXMsXG5cblx0XHRcdC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuXHRcdFx0ZWxlbS5qcXVlcnkgPyBlbGVtWyAwIF0gOiBlbGVtXG5cdFx0KTtcblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soXG5cdFx0XHRqUXVlcnkudW5pcXVlU29ydChcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKCBzZWxlY3RvciApXG5cdFx0KTtcblx0fVxufSApO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoIGN1ciA9IGN1clsgZGlyIF0gKSAmJiBjdXIubm9kZVR5cGUgIT09IDEgKSB7fVxuXHRyZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCgge1xuXHRwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcblx0fSxcblx0cGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcblx0fSxcblx0cGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcblx0fSxcblx0Y2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggZWxlbS5maXJzdENoaWxkICk7XG5cdH0sXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgaWYgKCBub2RlTmFtZSggZWxlbSwgXCJpZnJhbWVcIiApICkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uY29udGVudERvY3VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3VwcG9ydDogSUUgOSAtIDExIG9ubHksIGlPUyA3IG9ubHksIEFuZHJvaWQgQnJvd3NlciA8PTQuMyBvbmx5XG4gICAgICAgIC8vIFRyZWF0IHRoZSB0ZW1wbGF0ZSBlbGVtZW50IGFzIGEgcmVndWxhciBvbmUgaW4gYnJvd3NlcnMgdGhhdFxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IGl0LlxuICAgICAgICBpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRlbXBsYXRlXCIgKSApIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLmNvbnRlbnQgfHwgZWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0gKTtcbnZhciBybm90aHRtbHdoaXRlID0gKCAvW15cXHgyMFxcdFxcclxcblxcZl0rL2cgKTtcblxuXG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0ge307XG5cdGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSApO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSA6XG5cdFx0alF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuXHR2YXIgLy8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuXHRcdGZpcmluZyxcblxuXHRcdC8vIExhc3QgZmlyZSB2YWx1ZSBmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzXG5cdFx0bWVtb3J5LFxuXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblxuXHRcdC8vIEZsYWcgdG8gcHJldmVudCBmaXJpbmdcblx0XHRsb2NrZWQsXG5cblx0XHQvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuXHRcdGxpc3QgPSBbXSxcblxuXHRcdC8vIFF1ZXVlIG9mIGV4ZWN1dGlvbiBkYXRhIGZvciByZXBlYXRhYmxlIGxpc3RzXG5cdFx0cXVldWUgPSBbXSxcblxuXHRcdC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IGFkZC9yZW1vdmUgYXMgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4ID0gLTEsXG5cblx0XHQvLyBGaXJlIGNhbGxiYWNrc1xuXHRcdGZpcmUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5mb3JjZSBzaW5nbGUtZmlyaW5nXG5cdFx0XHRsb2NrZWQgPSBsb2NrZWQgfHwgb3B0aW9ucy5vbmNlO1xuXG5cdFx0XHQvLyBFeGVjdXRlIGNhbGxiYWNrcyBmb3IgYWxsIHBlbmRpbmcgZXhlY3V0aW9ucyxcblx0XHRcdC8vIHJlc3BlY3RpbmcgZmlyaW5nSW5kZXggb3ZlcnJpZGVzIGFuZCBydW50aW1lIGNoYW5nZXNcblx0XHRcdGZpcmVkID0gZmlyaW5nID0gdHJ1ZTtcblx0XHRcdGZvciAoIDsgcXVldWUubGVuZ3RoOyBmaXJpbmdJbmRleCA9IC0xICkge1xuXHRcdFx0XHRtZW1vcnkgPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHR3aGlsZSAoICsrZmlyaW5nSW5kZXggPCBsaXN0Lmxlbmd0aCApIHtcblxuXHRcdFx0XHRcdC8vIFJ1biBjYWxsYmFjayBhbmQgY2hlY2sgZm9yIGVhcmx5IHRlcm1pbmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBtZW1vcnlbIDAgXSwgbWVtb3J5WyAxIF0gKSA9PT0gZmFsc2UgJiZcblx0XHRcdFx0XHRcdG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEp1bXAgdG8gZW5kIGFuZCBmb3JnZXQgdGhlIGRhdGEgc28gLmFkZCBkb2Vzbid0IHJlLWZpcmVcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yZ2V0IHRoZSBkYXRhIGlmIHdlJ3JlIGRvbmUgd2l0aCBpdFxuXHRcdFx0aWYgKCAhb3B0aW9ucy5tZW1vcnkgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRmaXJpbmcgPSBmYWxzZTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgaWYgd2UncmUgZG9uZSBmaXJpbmcgZm9yIGdvb2Rcblx0XHRcdGlmICggbG9ja2VkICkge1xuXG5cdFx0XHRcdC8vIEtlZXAgYW4gZW1wdHkgbGlzdCBpZiB3ZSBoYXZlIGRhdGEgZm9yIGZ1dHVyZSBhZGQgY2FsbHNcblx0XHRcdFx0aWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgdGhpcyBvYmplY3QgaXMgc3BlbnRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsaXN0ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cblx0XHRcdC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3Rcblx0XHRcdGFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblxuXHRcdFx0XHRcdC8vIElmIHdlIGhhdmUgbWVtb3J5IGZyb20gYSBwYXN0IHJ1biwgd2Ugc2hvdWxkIGZpcmUgYWZ0ZXIgYWRkaW5nXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0cXVldWUucHVzaCggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0KCBmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBpc0Z1bmN0aW9uKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoICFvcHRpb25zLnVuaXF1ZSB8fCAhc2VsZi5oYXMoIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIHRvVHlwZSggYXJnICkgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0XHRcdFx0YWRkKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0gKSggYXJndW1lbnRzICk7XG5cblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cblx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuXHRcdFx0Ly8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG5cdFx0XHRoYXM6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0cmV0dXJuIGZuID9cblx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDpcblx0XHRcdFx0XHRsaXN0Lmxlbmd0aCA+IDA7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlIGFuZCAuYWRkXG5cdFx0XHQvLyBBYm9ydCBhbnkgY3VycmVudC9wZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdC8vIENsZWFyIGFsbCBjYWxsYmFja3MgYW5kIHZhbHVlc1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbGlzdDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmVcblx0XHRcdC8vIEFsc28gZGlzYWJsZSAuYWRkIHVubGVzcyB3ZSBoYXZlIG1lbW9yeSAoc2luY2UgaXQgd291bGQgaGF2ZSBubyBlZmZlY3QpXG5cdFx0XHQvLyBBYm9ydCBhbnkgcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHRsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0aWYgKCAhbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhbG9ja2VkO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRpZiAoICFsb2NrZWQgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0aWYgKCAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG5cdFx0XHRmaXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmZ1bmN0aW9uIElkZW50aXR5KCB2ICkge1xuXHRyZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIFRocm93ZXIoIGV4ICkge1xuXHR0aHJvdyBleDtcbn1cblxuZnVuY3Rpb24gYWRvcHRWYWx1ZSggdmFsdWUsIHJlc29sdmUsIHJlamVjdCwgbm9WYWx1ZSApIHtcblx0dmFyIG1ldGhvZDtcblxuXHR0cnkge1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIHByb21pc2UgYXNwZWN0IGZpcnN0IHRvIHByaXZpbGVnZSBzeW5jaHJvbm91cyBiZWhhdmlvclxuXHRcdGlmICggdmFsdWUgJiYgaXNGdW5jdGlvbiggKCBtZXRob2QgPSB2YWx1ZS5wcm9taXNlICkgKSApIHtcblx0XHRcdG1ldGhvZC5jYWxsKCB2YWx1ZSApLmRvbmUoIHJlc29sdmUgKS5mYWlsKCByZWplY3QgKTtcblxuXHRcdC8vIE90aGVyIHRoZW5hYmxlc1xuXHRcdH0gZWxzZSBpZiAoIHZhbHVlICYmIGlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUudGhlbiApICkgKSB7XG5cdFx0XHRtZXRob2QuY2FsbCggdmFsdWUsIHJlc29sdmUsIHJlamVjdCApO1xuXG5cdFx0Ly8gT3RoZXIgbm9uLXRoZW5hYmxlc1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIENvbnRyb2wgYHJlc29sdmVgIGFyZ3VtZW50cyBieSBsZXR0aW5nIEFycmF5I3NsaWNlIGNhc3QgYm9vbGVhbiBgbm9WYWx1ZWAgdG8gaW50ZWdlcjpcblx0XHRcdC8vICogZmFsc2U6IFsgdmFsdWUgXS5zbGljZSggMCApID0+IHJlc29sdmUoIHZhbHVlIClcblx0XHRcdC8vICogdHJ1ZTogWyB2YWx1ZSBdLnNsaWNlKCAxICkgPT4gcmVzb2x2ZSgpXG5cdFx0XHRyZXNvbHZlLmFwcGx5KCB1bmRlZmluZWQsIFsgdmFsdWUgXS5zbGljZSggbm9WYWx1ZSApICk7XG5cdFx0fVxuXG5cdC8vIEZvciBQcm9taXNlcy9BKywgY29udmVydCBleGNlcHRpb25zIGludG8gcmVqZWN0aW9uc1xuXHQvLyBTaW5jZSBqUXVlcnkud2hlbiBkb2Vzbid0IHVud3JhcCB0aGVuYWJsZXMsIHdlIGNhbiBza2lwIHRoZSBleHRyYSBjaGVja3MgYXBwZWFyaW5nIGluXG5cdC8vIERlZmVycmVkI3RoZW4gdG8gY29uZGl0aW9uYWxseSBzdXBwcmVzcyByZWplY3Rpb24uXG5cdH0gY2F0Y2ggKCB2YWx1ZSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIG9ubHlcblx0XHQvLyBTdHJpY3QgbW9kZSBmdW5jdGlvbnMgaW52b2tlZCB3aXRob3V0IC5jYWxsLy5hcHBseSBnZXQgZ2xvYmFsLW9iamVjdCBjb250ZXh0XG5cdFx0cmVqZWN0LmFwcGx5KCB1bmRlZmluZWQsIFsgdmFsdWUgXSApO1xuXHR9XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHREZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG5cdFx0dmFyIHR1cGxlcyA9IFtcblxuXHRcdFx0XHQvLyBhY3Rpb24sIGFkZCBsaXN0ZW5lciwgY2FsbGJhY2tzLFxuXHRcdFx0XHQvLyAuLi4gLnRoZW4gaGFuZGxlcnMsIGFyZ3VtZW50IGluZGV4LCBbZmluYWwgc3RhdGVdXG5cdFx0XHRcdFsgXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApLCAyIF0sXG5cdFx0XHRcdFsgXCJyZXNvbHZlXCIsIFwiZG9uZVwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMCwgXCJyZXNvbHZlZFwiIF0sXG5cdFx0XHRcdFsgXCJyZWplY3RcIiwgXCJmYWlsXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLCAxLCBcInJlamVjdGVkXCIgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNhdGNoXCI6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKCBudWxsLCBmbiApO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEtlZXAgcGlwZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0cGlwZTogZnVuY3Rpb24oIC8qIGZuRG9uZSwgZm5GYWlsLCBmblByb2dyZXNzICovICkge1xuXHRcdFx0XHRcdHZhciBmbnMgPSBhcmd1bWVudHM7XG5cblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTWFwIHR1cGxlcyAocHJvZ3Jlc3MsIGRvbmUsIGZhaWwpIHRvIGFyZ3VtZW50cyAoZG9uZSwgZmFpbCwgcHJvZ3Jlc3MpXG5cdFx0XHRcdFx0XHRcdHZhciBmbiA9IGlzRnVuY3Rpb24oIGZuc1sgdHVwbGVbIDQgXSBdICkgJiYgZm5zWyB0dXBsZVsgNCBdIF07XG5cblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQucHJvZ3Jlc3MoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIubm90aWZ5IH0pXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLmRvbmUoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIucmVzb2x2ZSB9KVxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5mYWlsKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLnJlamVjdCB9KVxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDEgXSBdKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbiAmJiBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCAmJiBpc0Z1bmN0aW9uKCByZXR1cm5lZC5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZC5wcm9taXNlKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnByb2dyZXNzKCBuZXdEZWZlci5ub3RpZnkgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZG9uZSggbmV3RGVmZXIucmVzb2x2ZSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5mYWlsKCBuZXdEZWZlci5yZWplY3QgKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXJbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmbiA/IFsgcmV0dXJuZWQgXSA6IGFyZ3VtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdGZucyA9IG51bGw7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhlbjogZnVuY3Rpb24oIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzICkge1xuXHRcdFx0XHRcdHZhciBtYXhEZXB0aCA9IDA7XG5cdFx0XHRcdFx0ZnVuY3Rpb24gcmVzb2x2ZSggZGVwdGgsIGRlZmVycmVkLCBoYW5kbGVyLCBzcGVjaWFsICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0YXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQsIHRoZW47XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjMuMy4zXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01OVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWdub3JlIGRvdWJsZS1yZXNvbHV0aW9uIGF0dGVtcHRzXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoIDwgbWF4RGVwdGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQgPSBoYW5kbGVyLmFwcGx5KCB0aGF0LCBhcmdzICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjFcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTQ4XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHJldHVybmVkID09PSBkZWZlcnJlZC5wcm9taXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoIFwiVGhlbmFibGUgc2VsZi1yZXNvbHV0aW9uXCIgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbnMgMi4zLjMuMSwgMy41XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01NFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNzVcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFJldHJpZXZlIGB0aGVuYCBvbmx5IG9uY2Vcblx0XHRcdFx0XHRcdFx0XHRcdHRoZW4gPSByZXR1cm5lZCAmJlxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNjRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBjaGVjayBvYmplY3RzIGFuZCBmdW5jdGlvbnMgZm9yIHRoZW5hYmlsaXR5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCggdHlwZW9mIHJldHVybmVkID09PSBcIm9iamVjdFwiIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHJldHVybmVkID09PSBcImZ1bmN0aW9uXCIgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZC50aGVuO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgYSByZXR1cm5lZCB0aGVuYWJsZVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBpc0Z1bmN0aW9uKCB0aGVuICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BlY2lhbCBwcm9jZXNzb3JzIChub3RpZnkpIGp1c3Qgd2FpdCBmb3IgcmVzb2x1dGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlbi5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIFRocm93ZXIsIHNwZWNpYWwgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gTm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGFsc28gaG9vayBpbnRvIHByb2dyZXNzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgZGlzcmVnYXJkIG9sZGVyIHJlc29sdXRpb24gdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF4RGVwdGgrKztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBhbGwgb3RoZXIgcmV0dXJuZWQgdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgc3Vic3RpdHV0ZSBoYW5kbGVycyBwYXNzIG9uIGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIG11bHRpcGxlIHZhbHVlcyAobm9uLXNwZWMgYmVoYXZpb3IpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggaGFuZGxlciAhPT0gSWRlbnRpdHkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmdzID0gWyByZXR1cm5lZCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gUHJvY2VzcyB0aGUgdmFsdWUocylcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmYXVsdCBwcm9jZXNzIGlzIHJlc29sdmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCBzcGVjaWFsIHx8IGRlZmVycmVkLnJlc29sdmVXaXRoICkoIHRoYXQsIGFyZ3MgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBub3JtYWwgcHJvY2Vzc29ycyAocmVzb2x2ZSkgY2F0Y2ggYW5kIHJlamVjdCBleGNlcHRpb25zXG5cdFx0XHRcdFx0XHRcdFx0cHJvY2VzcyA9IHNwZWNpYWwgP1xuXHRcdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdyA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rKCBlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzLnN0YWNrVHJhY2UgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuNC4xXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNjFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZ25vcmUgcG9zdC1yZXNvbHV0aW9uIGV4Y2VwdGlvbnNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoICsgMSA+PSBtYXhEZXB0aCApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBzdWJzdGl0dXRlIGhhbmRsZXJzIHBhc3Mgb24gY29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIG11bHRpcGxlIHZhbHVlcyAobm9uLXNwZWMgYmVoYXZpb3IpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIgIT09IFRocm93ZXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyZ3MgPSBbIGUgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggdGhhdCwgYXJncyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuMVxuXHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01N1xuXHRcdFx0XHRcdFx0XHQvLyBSZS1yZXNvbHZlIHByb21pc2VzIGltbWVkaWF0ZWx5IHRvIGRvZGdlIGZhbHNlIHJlamVjdGlvbiBmcm9tXG5cdFx0XHRcdFx0XHRcdC8vIHN1YnNlcXVlbnQgZXJyb3JzXG5cdFx0XHRcdFx0XHRcdGlmICggZGVwdGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2VzcygpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ2FsbCBhbiBvcHRpb25hbCBob29rIHRvIHJlY29yZCB0aGUgc3RhY2ssIGluIGNhc2Ugb2YgZXhjZXB0aW9uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gc2luY2UgaXQncyBvdGhlcndpc2UgbG9zdCB3aGVuIGV4ZWN1dGlvbiBnb2VzIGFzeW5jXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuRGVmZXJyZWQuZ2V0U3RhY2tIb29rICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzcy5zdGFja1RyYWNlID0galF1ZXJ5LkRlZmVycmVkLmdldFN0YWNrSG9vaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCggcHJvY2VzcyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBqUXVlcnkuRGVmZXJyZWQoIGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblxuXHRcdFx0XHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAwIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRpc0Z1bmN0aW9uKCBvblByb2dyZXNzICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25Qcm9ncmVzcyA6XG5cdFx0XHRcdFx0XHRcdFx0XHRJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlci5ub3RpZnlXaXRoXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5hZGQoIC4uLiApXG5cdFx0XHRcdFx0XHR0dXBsZXNbIDEgXVsgMyBdLmFkZChcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShcblx0XHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLFxuXHRcdFx0XHRcdFx0XHRcdGlzRnVuY3Rpb24oIG9uRnVsZmlsbGVkICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25GdWxmaWxsZWQgOlxuXHRcdFx0XHRcdFx0XHRcdFx0SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAyIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRpc0Z1bmN0aW9uKCBvblJlamVjdGVkICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25SZWplY3RlZCA6XG5cdFx0XHRcdFx0XHRcdFx0XHRUaHJvd2VyXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBHZXQgYSBwcm9taXNlIGZvciB0aGlzIGRlZmVycmVkXG5cdFx0XHRcdC8vIElmIG9iaiBpcyBwcm92aWRlZCwgdGhlIHByb21pc2UgYXNwZWN0IGlzIGFkZGVkIHRvIHRoZSBvYmplY3Rcblx0XHRcdFx0cHJvbWlzZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqICE9IG51bGwgPyBqUXVlcnkuZXh0ZW5kKCBvYmosIHByb21pc2UgKSA6IHByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWZlcnJlZCA9IHt9O1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgNSBdO1xuXG5cdFx0XHQvLyBwcm9taXNlLnByb2dyZXNzID0gbGlzdC5hZGRcblx0XHRcdC8vIHByb21pc2UuZG9uZSA9IGxpc3QuYWRkXG5cdFx0XHQvLyBwcm9taXNlLmZhaWwgPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbIDEgXSBdID0gbGlzdC5hZGQ7XG5cblx0XHRcdC8vIEhhbmRsZSBzdGF0ZVxuXHRcdFx0aWYgKCBzdGF0ZVN0cmluZyApIHtcblx0XHRcdFx0bGlzdC5hZGQoXG5cdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8vIHN0YXRlID0gXCJyZXNvbHZlZFwiIChpLmUuLCBmdWxmaWxsZWQpXG5cdFx0XHRcdFx0XHQvLyBzdGF0ZSA9IFwicmVqZWN0ZWRcIlxuXHRcdFx0XHRcdFx0c3RhdGUgPSBzdGF0ZVN0cmluZztcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfY2FsbGJhY2tzLmRpc2FibGVcblx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfY2FsbGJhY2tzLmRpc2FibGVcblx0XHRcdFx0XHR0dXBsZXNbIDMgLSBpIF1bIDIgXS5kaXNhYmxlLFxuXG5cdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfaGFuZGxlcnMuZGlzYWJsZVxuXHRcdFx0XHRcdC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5kaXNhYmxlXG5cdFx0XHRcdFx0dHVwbGVzWyAzIC0gaSBdWyAzIF0uZGlzYWJsZSxcblxuXHRcdFx0XHRcdC8vIHByb2dyZXNzX2NhbGxiYWNrcy5sb2NrXG5cdFx0XHRcdFx0dHVwbGVzWyAwIF1bIDIgXS5sb2NrLFxuXG5cdFx0XHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMubG9ja1xuXHRcdFx0XHRcdHR1cGxlc1sgMCBdWyAzIF0ubG9ja1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBwcm9ncmVzc19oYW5kbGVycy5maXJlXG5cdFx0XHQvLyBmdWxmaWxsZWRfaGFuZGxlcnMuZmlyZVxuXHRcdFx0Ly8gcmVqZWN0ZWRfaGFuZGxlcnMuZmlyZVxuXHRcdFx0bGlzdC5hZGQoIHR1cGxlWyAzIF0uZmlyZSApO1xuXG5cdFx0XHQvLyBkZWZlcnJlZC5ub3RpZnkgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQubm90aWZ5V2l0aCguLi4pIH1cblx0XHRcdC8vIGRlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQucmVzb2x2ZVdpdGgoLi4uKSB9XG5cdFx0XHQvLyBkZWZlcnJlZC5yZWplY3QgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQucmVqZWN0V2l0aCguLi4pIH1cblx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKCB0aGlzID09PSBkZWZlcnJlZCA/IHVuZGVmaW5lZCA6IHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH07XG5cblx0XHRcdC8vIGRlZmVycmVkLm5vdGlmeVdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlV2l0aCA9IGxpc3QuZmlyZVdpdGhcblx0XHRcdC8vIGRlZmVycmVkLnJlamVjdFdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xuXHRcdH0gKTtcblxuXHRcdC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxuXHRcdHByb21pc2UucHJvbWlzZSggZGVmZXJyZWQgKTtcblxuXHRcdC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcblx0XHRpZiAoIGZ1bmMgKSB7XG5cdFx0XHRmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBkb25lIVxuXHRcdHJldHVybiBkZWZlcnJlZDtcblx0fSxcblxuXHQvLyBEZWZlcnJlZCBoZWxwZXJcblx0d2hlbjogZnVuY3Rpb24oIHNpbmdsZVZhbHVlICkge1xuXHRcdHZhclxuXG5cdFx0XHQvLyBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcblx0XHRcdHJlbWFpbmluZyA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cblx0XHRcdC8vIGNvdW50IG9mIHVucHJvY2Vzc2VkIGFyZ3VtZW50c1xuXHRcdFx0aSA9IHJlbWFpbmluZyxcblxuXHRcdFx0Ly8gc3Vib3JkaW5hdGUgZnVsZmlsbG1lbnQgZGF0YVxuXHRcdFx0cmVzb2x2ZUNvbnRleHRzID0gQXJyYXkoIGkgKSxcblx0XHRcdHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblxuXHRcdFx0Ly8gdGhlIG1hc3RlciBEZWZlcnJlZFxuXHRcdFx0bWFzdGVyID0galF1ZXJ5LkRlZmVycmVkKCksXG5cblx0XHRcdC8vIHN1Ym9yZGluYXRlIGNhbGxiYWNrIGZhY3Rvcnlcblx0XHRcdHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXNvbHZlQ29udGV4dHNbIGkgXSA9IHRoaXM7XG5cdFx0XHRcdFx0cmVzb2x2ZVZhbHVlc1sgaSBdID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSA6IHZhbHVlO1xuXHRcdFx0XHRcdGlmICggISggLS1yZW1haW5pbmcgKSApIHtcblx0XHRcdFx0XHRcdG1hc3Rlci5yZXNvbHZlV2l0aCggcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fTtcblxuXHRcdC8vIFNpbmdsZS0gYW5kIGVtcHR5IGFyZ3VtZW50cyBhcmUgYWRvcHRlZCBsaWtlIFByb21pc2UucmVzb2x2ZVxuXHRcdGlmICggcmVtYWluaW5nIDw9IDEgKSB7XG5cdFx0XHRhZG9wdFZhbHVlKCBzaW5nbGVWYWx1ZSwgbWFzdGVyLmRvbmUoIHVwZGF0ZUZ1bmMoIGkgKSApLnJlc29sdmUsIG1hc3Rlci5yZWplY3QsXG5cdFx0XHRcdCFyZW1haW5pbmcgKTtcblxuXHRcdFx0Ly8gVXNlIC50aGVuKCkgdG8gdW53cmFwIHNlY29uZGFyeSB0aGVuYWJsZXMgKGNmLiBnaC0zMDAwKVxuXHRcdFx0aWYgKCBtYXN0ZXIuc3RhdGUoKSA9PT0gXCJwZW5kaW5nXCIgfHxcblx0XHRcdFx0aXNGdW5jdGlvbiggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIHJlc29sdmVWYWx1ZXNbIGkgXS50aGVuICkgKSB7XG5cblx0XHRcdFx0cmV0dXJuIG1hc3Rlci50aGVuKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gTXVsdGlwbGUgYXJndW1lbnRzIGFyZSBhZ2dyZWdhdGVkIGxpa2UgUHJvbWlzZS5hbGwgYXJyYXkgZWxlbWVudHNcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGFkb3B0VmFsdWUoIHJlc29sdmVWYWx1ZXNbIGkgXSwgdXBkYXRlRnVuYyggaSApLCBtYXN0ZXIucmVqZWN0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hc3Rlci5wcm9taXNlKCk7XG5cdH1cbn0gKTtcblxuXG4vLyBUaGVzZSB1c3VhbGx5IGluZGljYXRlIGEgcHJvZ3JhbW1lciBtaXN0YWtlIGR1cmluZyBkZXZlbG9wbWVudCxcbi8vIHdhcm4gYWJvdXQgdGhlbSBBU0FQIHJhdGhlciB0aGFuIHN3YWxsb3dpbmcgdGhlbSBieSBkZWZhdWx0LlxudmFyIHJlcnJvck5hbWVzID0gL14oRXZhbHxJbnRlcm5hbHxSYW5nZXxSZWZlcmVuY2V8U3ludGF4fFR5cGV8VVJJKUVycm9yJC87XG5cbmpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rID0gZnVuY3Rpb24oIGVycm9yLCBzdGFjayApIHtcblxuXHQvLyBTdXBwb3J0OiBJRSA4IC0gOSBvbmx5XG5cdC8vIENvbnNvbGUgZXhpc3RzIHdoZW4gZGV2IHRvb2xzIGFyZSBvcGVuLCB3aGljaCBjYW4gaGFwcGVuIGF0IGFueSB0aW1lXG5cdGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUud2FybiAmJiBlcnJvciAmJiByZXJyb3JOYW1lcy50ZXN0KCBlcnJvci5uYW1lICkgKSB7XG5cdFx0d2luZG93LmNvbnNvbGUud2FybiggXCJqUXVlcnkuRGVmZXJyZWQgZXhjZXB0aW9uOiBcIiArIGVycm9yLm1lc3NhZ2UsIGVycm9yLnN0YWNrLCBzdGFjayApO1xuXHR9XG59O1xuXG5cblxuXG5qUXVlcnkucmVhZHlFeGNlcHRpb24gPSBmdW5jdGlvbiggZXJyb3IgKSB7XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHR0aHJvdyBlcnJvcjtcblx0fSApO1xufTtcblxuXG5cblxuLy8gVGhlIGRlZmVycmVkIHVzZWQgb24gRE9NIHJlYWR5XG52YXIgcmVhZHlMaXN0ID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbmpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblxuXHRyZWFkeUxpc3Rcblx0XHQudGhlbiggZm4gKVxuXG5cdFx0Ly8gV3JhcCBqUXVlcnkucmVhZHlFeGNlcHRpb24gaW4gYSBmdW5jdGlvbiBzbyB0aGF0IHRoZSBsb29rdXBcblx0XHQvLyBoYXBwZW5zIGF0IHRoZSB0aW1lIG9mIGVycm9yIGhhbmRsaW5nIGluc3RlYWQgb2YgY2FsbGJhY2tcblx0XHQvLyByZWdpc3RyYXRpb24uXG5cdFx0LmNhdGNoKCBmdW5jdGlvbiggZXJyb3IgKSB7XG5cdFx0XHRqUXVlcnkucmVhZHlFeGNlcHRpb24oIGVycm9yICk7XG5cdFx0fSApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG5cdGlzUmVhZHk6IGZhbHNlLFxuXG5cdC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcblx0Ly8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcblx0cmVhZHlXYWl0OiAxLFxuXG5cdC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcblx0cmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG5cdFx0Ly8gQWJvcnQgaWYgdGhlcmUgYXJlIHBlbmRpbmcgaG9sZHMgb3Igd2UncmUgYWxyZWFkeSByZWFkeVxuXHRcdGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuXHRcdGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXG5cdFx0aWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxuXHRcdHJlYWR5TGlzdC5yZXNvbHZlV2l0aCggZG9jdW1lbnQsIFsgalF1ZXJ5IF0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkucmVhZHkudGhlbiA9IHJlYWR5TGlzdC50aGVuO1xuXG4vLyBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuZnVuY3Rpb24gY29tcGxldGVkKCkge1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkICk7XG5cdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG5cdGpRdWVyeS5yZWFkeSgpO1xufVxuXG4vLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZFxuLy8gYWZ0ZXIgdGhlIGJyb3dzZXIgZXZlbnQgaGFzIGFscmVhZHkgb2NjdXJyZWQuXG4vLyBTdXBwb3J0OiBJRSA8PTkgLSAxMCBvbmx5XG4vLyBPbGRlciBJRSBzb21ldGltZXMgc2lnbmFscyBcImludGVyYWN0aXZlXCIgdG9vIHNvb25cbmlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8XG5cdCggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXG5cdC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuXHR3aW5kb3cuc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cbn0gZWxzZSB7XG5cblx0Ly8gVXNlIHRoZSBoYW5keSBldmVudCBjYWxsYmFja1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkICk7XG5cblx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcbn1cblxuXG5cblxuLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cbnZhciBhY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBlbGVtcy5sZW5ndGgsXG5cdFx0YnVsayA9IGtleSA9PSBudWxsO1xuXG5cdC8vIFNldHMgbWFueSB2YWx1ZXNcblx0aWYgKCB0b1R5cGUoIGtleSApID09PSBcIm9iamVjdFwiICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cdFx0Zm9yICggaSBpbiBrZXkgKSB7XG5cdFx0XHRhY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5WyBpIF0sIHRydWUsIGVtcHR5R2V0LCByYXcgKTtcblx0XHR9XG5cblx0Ly8gU2V0cyBvbmUgdmFsdWVcblx0fSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXG5cdFx0aWYgKCAhaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJhdyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBidWxrICkge1xuXG5cdFx0XHQvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdGlmICggcmF3ICkge1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0Zm4gPSBudWxsO1xuXG5cdFx0XHQvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWxrID0gZm47XG5cdFx0XHRcdGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRmbihcblx0XHRcdFx0XHRlbGVtc1sgaSBdLCBrZXksIHJhdyA/XG5cdFx0XHRcdFx0dmFsdWUgOlxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIGVsZW1zWyBpIF0sIGksIGZuKCBlbGVtc1sgaSBdLCBrZXkgKSApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBjaGFpbmFibGUgKSB7XG5cdFx0cmV0dXJuIGVsZW1zO1xuXHR9XG5cblx0Ly8gR2V0c1xuXHRpZiAoIGJ1bGsgKSB7XG5cdFx0cmV0dXJuIGZuLmNhbGwoIGVsZW1zICk7XG5cdH1cblxuXHRyZXR1cm4gbGVuID8gZm4oIGVsZW1zWyAwIF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xuXG5cbi8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xudmFyIHJtc1ByZWZpeCA9IC9eLW1zLS8sXG5cdHJkYXNoQWxwaGEgPSAvLShbYS16XSkvZztcblxuLy8gVXNlZCBieSBjYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG5mdW5jdGlvbiBmY2FtZWxDYXNlKCBhbGwsIGxldHRlciApIHtcblx0cmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xufVxuXG4vLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG4vLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSwgRWRnZSAxMiAtIDE1XG4vLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG5mdW5jdGlvbiBjYW1lbENhc2UoIHN0cmluZyApIHtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG59XG52YXIgYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0cmV0dXJuIG93bmVyLm5vZGVUeXBlID09PSAxIHx8IG93bmVyLm5vZGVUeXBlID09PSA5IHx8ICEoICtvd25lci5ub2RlVHlwZSApO1xufTtcblxuXG5cblxuZnVuY3Rpb24gRGF0YSgpIHtcblx0dGhpcy5leHBhbmRvID0galF1ZXJ5LmV4cGFuZG8gKyBEYXRhLnVpZCsrO1xufVxuXG5EYXRhLnVpZCA9IDE7XG5cbkRhdGEucHJvdG90eXBlID0ge1xuXG5cdGNhY2hlOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGVcblx0XHR2YXIgdmFsdWUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHQvLyBJZiBub3QsIGNyZWF0ZSBvbmVcblx0XHRpZiAoICF2YWx1ZSApIHtcblx0XHRcdHZhbHVlID0ge307XG5cblx0XHRcdC8vIFdlIGNhbiBhY2NlcHQgZGF0YSBmb3Igbm9uLWVsZW1lbnQgbm9kZXMgaW4gbW9kZXJuIGJyb3dzZXJzLFxuXHRcdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHRcdC8vIEFsd2F5cyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0LlxuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBvd25lciApICkge1xuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbm9kZSB1bmxpa2VseSB0byBiZSBzdHJpbmdpZnktZWQgb3IgbG9vcGVkIG92ZXJcblx0XHRcdFx0Ly8gdXNlIHBsYWluIGFzc2lnbm1lbnRcblx0XHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2Ugc2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcblx0XHRcdFx0Ly8gY29uZmlndXJhYmxlIG11c3QgYmUgdHJ1ZSB0byBhbGxvdyB0aGUgcHJvcGVydHkgdG8gYmVcblx0XHRcdFx0Ly8gZGVsZXRlZCB3aGVuIGRhdGEgaXMgcmVtb3ZlZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGUoIG93bmVyICk7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRjYWNoZVsgY2FtZWxDYXNlKCBkYXRhICkgXSA9IHZhbHVlO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCB7IHByb3BlcnRpZXMgfSBdIGFyZ3Ncblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG9uZS1ieS1vbmUgdG8gdGhlIGNhY2hlIG9iamVjdFxuXHRcdFx0Zm9yICggcHJvcCBpbiBkYXRhICkge1xuXHRcdFx0XHRjYWNoZVsgY2FtZWxDYXNlKCBwcm9wICkgXSA9IGRhdGFbIHByb3AgXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhY2hlO1xuXHR9LFxuXHRnZXQ6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHR0aGlzLmNhY2hlKCBvd25lciApIDpcblxuXHRcdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdICYmIG93bmVyWyB0aGlzLmV4cGFuZG8gXVsgY2FtZWxDYXNlKCBrZXkgKSBdO1xuXHR9LFxuXHRhY2Nlc3M6IGZ1bmN0aW9uKCBvd25lciwga2V5LCB2YWx1ZSApIHtcblxuXHRcdC8vIEluIGNhc2VzIHdoZXJlIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gTm8ga2V5IHdhcyBzcGVjaWZpZWRcblx0XHQvLyAgIDIuIEEgc3RyaW5nIGtleSB3YXMgc3BlY2lmaWVkLCBidXQgbm8gdmFsdWUgcHJvdmlkZWRcblx0XHQvL1xuXHRcdC8vIFRha2UgdGhlIFwicmVhZFwiIHBhdGggYW5kIGFsbG93IHRoZSBnZXQgbWV0aG9kIHRvIGRldGVybWluZVxuXHRcdC8vIHdoaWNoIHZhbHVlIHRvIHJldHVybiwgcmVzcGVjdGl2ZWx5IGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gVGhlIGVudGlyZSBjYWNoZSBvYmplY3Rcblx0XHQvLyAgIDIuIFRoZSBkYXRhIHN0b3JlZCBhdCB0aGUga2V5XG5cdFx0Ly9cblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdCggKCBrZXkgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiApICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2hlbiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZywgb3IgYm90aCBhIGtleSBhbmQgdmFsdWVcblx0XHQvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gQW4gb2JqZWN0IG9mIHByb3BlcnRpZXNcblx0XHQvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vXG5cdFx0dGhpcy5zZXQoIG93bmVyLCBrZXksIHZhbHVlICk7XG5cblx0XHQvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcblx0XHQvLyByZXR1cm4gdGhlIGV4cGVjdGVkIGRhdGEgYmFzZWQgb24gd2hpY2ggcGF0aCB3YXMgdGFrZW5bKl1cblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoga2V5O1xuXHR9LFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHZhciBpLFxuXHRcdFx0Y2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHRpZiAoIGNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBrZXkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSgga2V5ICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYga2V5IGlzIGFuIGFycmF5IG9mIGtleXMuLi5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHNldCBjYW1lbENhc2Uga2V5cywgc28gcmVtb3ZlIHRoYXQuXG5cdFx0XHRcdGtleSA9IGtleS5tYXAoIGNhbWVsQ2FzZSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2V5ID0gY2FtZWxDYXNlKCBrZXkgKTtcblxuXHRcdFx0XHQvLyBJZiBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzLCB1c2UgaXQuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgY3JlYXRlIGFuIGFycmF5IGJ5IG1hdGNoaW5nIG5vbi13aGl0ZXNwYWNlXG5cdFx0XHRcdGtleSA9IGtleSBpbiBjYWNoZSA/XG5cdFx0XHRcdFx0WyBrZXkgXSA6XG5cdFx0XHRcdFx0KCBrZXkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpID0ga2V5Lmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5WyBpIF0gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgdGhlIGV4cGFuZG8gaWYgdGhlcmUncyBubyBtb3JlIGRhdGFcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1XG5cdFx0XHQvLyBXZWJraXQgJiBCbGluayBwZXJmb3JtYW5jZSBzdWZmZXJzIHdoZW4gZGVsZXRpbmcgcHJvcGVydGllc1xuXHRcdFx0Ly8gZnJvbSBET00gbm9kZXMsIHNvIHNldCB0byB1bmRlZmluZWQgaW5zdGVhZFxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzc4NjA3IChidWcgcmVzdHJpY3RlZClcblx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRoYXNEYXRhOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0dmFyIGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdHJldHVybiBjYWNoZSAhPT0gdW5kZWZpbmVkICYmICFqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKTtcblx0fVxufTtcbnZhciBkYXRhUHJpdiA9IG5ldyBEYXRhKCk7XG5cbnZhciBkYXRhVXNlciA9IG5ldyBEYXRhKCk7XG5cblxuXG4vL1x0SW1wbGVtZW50YXRpb24gU3VtbWFyeVxuLy9cbi8vXHQxLiBFbmZvcmNlIEFQSSBzdXJmYWNlIGFuZCBzZW1hbnRpYyBjb21wYXRpYmlsaXR5IHdpdGggMS45LnggYnJhbmNoXG4vL1x0Mi4gSW1wcm92ZSB0aGUgbW9kdWxlJ3MgbWFpbnRhaW5hYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBzdG9yYWdlXG4vL1x0XHRwYXRocyB0byBhIHNpbmdsZSBtZWNoYW5pc20uXG4vL1x0My4gVXNlIHRoZSBzYW1lIHNpbmdsZSBtZWNoYW5pc20gdG8gc3VwcG9ydCBcInByaXZhdGVcIiBhbmQgXCJ1c2VyXCIgZGF0YS5cbi8vXHQ0LiBfTmV2ZXJfIGV4cG9zZSBcInByaXZhdGVcIiBkYXRhIHRvIHVzZXIgY29kZSAoVE9ETzogRHJvcCBfZGF0YSwgX3JlbW92ZURhdGEpXG4vL1x0NS4gQXZvaWQgZXhwb3NpbmcgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvbiB1c2VyIG9iamVjdHMgKGVnLiBleHBhbmRvIHByb3BlcnRpZXMpXG4vL1x0Ni4gUHJvdmlkZSBhIGNsZWFyIHBhdGggZm9yIGltcGxlbWVudGF0aW9uIHVwZ3JhZGUgdG8gV2Vha01hcCBpbiAyMDE0XG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG5cdHJtdWx0aURhc2ggPSAvW0EtWl0vZztcblxuZnVuY3Rpb24gZ2V0RGF0YSggZGF0YSApIHtcblx0aWYgKCBkYXRhID09PSBcInRydWVcIiApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmICggZGF0YSA9PT0gXCJmYWxzZVwiICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmICggZGF0YSA9PT0gXCJudWxsXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xuXHRpZiAoIGRhdGEgPT09ICtkYXRhICsgXCJcIiApIHtcblx0XHRyZXR1cm4gK2RhdGE7XG5cdH1cblxuXHRpZiAoIHJicmFjZS50ZXN0KCBkYXRhICkgKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoIGRhdGEgKTtcblx0fVxuXG5cdHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuXHR2YXIgbmFtZTtcblxuXHQvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG5cdC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuXHRpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJCZcIiApLnRvTG93ZXJDYXNlKCk7XG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGdldERhdGEoIGRhdGEgKTtcblx0XHRcdH0gY2F0Y2ggKCBlICkge31cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHdlIHNldCB0aGUgZGF0YSBzbyBpdCBpc24ndCBjaGFuZ2VkIGxhdGVyXG5cdFx0XHRkYXRhVXNlci5zZXQoIGVsZW0sIGtleSwgZGF0YSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRoYXNEYXRhOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuaGFzRGF0YSggZWxlbSApIHx8IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKTtcblx0fSxcblxuXHRkYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVVzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH0sXG5cblx0Ly8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcblx0Ly8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YVByaXYgbWV0aG9kcywgdGhlc2UgY2FuIGJlIGRlcHJlY2F0ZWQuXG5cdF9kYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0X3JlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGRhdGEsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0YXR0cnMgPSBlbGVtICYmIGVsZW0uYXR0cmlidXRlcztcblxuXHRcdC8vIEdldHMgYWxsIHZhbHVlc1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHRoaXMubGVuZ3RoICkge1xuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFkYXRhUHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBUaGUgYXR0cnMgZWxlbWVudHMgY2FuIGJlIG51bGwgKCMxNDg5NClcblx0XHRcdFx0XHRcdGlmICggYXR0cnNbIGkgXSApIHtcblx0XHRcdFx0XHRcdFx0bmFtZSA9IGF0dHJzWyBpIF0ubmFtZTtcblx0XHRcdFx0XHRcdFx0aWYgKCBuYW1lLmluZGV4T2YoIFwiZGF0YS1cIiApID09PSAwICkge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWUgPSBjYW1lbENhc2UoIG5hbWUuc2xpY2UoIDUgKSApO1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFBdHRyKCBlbGVtLCBuYW1lLCBkYXRhWyBuYW1lIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhUHJpdi5zZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9XG5cblx0XHQvLyBTZXRzIG11bHRpcGxlIHZhbHVlc1xuXHRcdGlmICggdHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGtleSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBkYXRhO1xuXG5cdFx0XHQvLyBUaGUgY2FsbGluZyBqUXVlcnkgb2JqZWN0IChlbGVtZW50IG1hdGNoZXMpIGlzIG5vdCBlbXB0eVxuXHRcdFx0Ly8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcblx0XHRcdC8vIGB2YWx1ZWAgcGFyYW1ldGVyIHdhcyBub3QgdW5kZWZpbmVkLiBBbiBlbXB0eSBqUXVlcnkgb2JqZWN0XG5cdFx0XHQvLyB3aWxsIHJlc3VsdCBpbiBgdW5kZWZpbmVkYCBmb3IgZWxlbSA9IHRoaXNbIDAgXSB3aGljaCB3aWxsXG5cdFx0XHQvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuXHRcdFx0aWYgKCBlbGVtICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBnZXQgZGF0YSBmcm9tIHRoZSBjYWNoZVxuXHRcdFx0XHQvLyBUaGUga2V5IHdpbGwgYWx3YXlzIGJlIGNhbWVsQ2FzZWQgaW4gRGF0YVxuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIFwiZGlzY292ZXJcIiB0aGUgZGF0YSBpblxuXHRcdFx0XHQvLyBIVE1MNSBjdXN0b20gZGF0YS0qIGF0dHJzXG5cdFx0XHRcdGRhdGEgPSBkYXRhQXR0ciggZWxlbSwga2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2UgdHJpZWQgcmVhbGx5IGhhcmQsIGJ1dCB0aGUgZGF0YSBkb2Vzbid0IGV4aXN0LlxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgZGF0YS4uLlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBXZSBhbHdheXMgc3RvcmUgdGhlIGNhbWVsQ2FzZWQga2V5XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSwgbnVsbCwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRkYXRhVXNlci5yZW1vdmUoIHRoaXMsIGtleSApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5cbmpRdWVyeS5leHRlbmQoIHtcblx0cXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBxdWV1ZTtcblxuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHR5cGUgPSAoIHR5cGUgfHwgXCJmeFwiICkgKyBcInF1ZXVlXCI7XG5cdFx0XHRxdWV1ZSA9IGRhdGFQcml2LmdldCggZWxlbSwgdHlwZSApO1xuXG5cdFx0XHQvLyBTcGVlZCB1cCBkZXF1ZXVlIGJ5IGdldHRpbmcgb3V0IHF1aWNrbHkgaWYgdGhpcyBpcyBqdXN0IGEgbG9va3VwXG5cdFx0XHRpZiAoIGRhdGEgKSB7XG5cdFx0XHRcdGlmICggIXF1ZXVlIHx8IEFycmF5LmlzQXJyYXkoIGRhdGEgKSApIHtcblx0XHRcdFx0XHRxdWV1ZSA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgdHlwZSwgalF1ZXJ5Lm1ha2VBcnJheSggZGF0YSApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cXVldWUucHVzaCggZGF0YSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcXVldWUgfHwgW107XG5cdFx0fVxuXHR9LFxuXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggZWxlbSwgdHlwZSApLFxuXHRcdFx0c3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG5cdFx0XHRmbiA9IHF1ZXVlLnNoaWZ0KCksXG5cdFx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgdHlwZSApLFxuXHRcdFx0bmV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuXHRcdFx0fTtcblxuXHRcdC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcblx0XHRpZiAoIGZuID09PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdHN0YXJ0TGVuZ3RoLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblxuXHRcdFx0Ly8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuXHRcdFx0Ly8gYXV0b21hdGljYWxseSBkZXF1ZXVlZFxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgKSB7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFyIHVwIHRoZSBsYXN0IHF1ZXVlIHN0b3AgZnVuY3Rpb25cblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0Zm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcblx0XHR9XG5cblx0XHRpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gTm90IHB1YmxpYyAtIGdlbmVyYXRlIGEgcXVldWVIb29rcyBvYmplY3QsIG9yIHJldHVybiB0aGUgY3VycmVudCBvbmVcblx0X3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmdldCggZWxlbSwga2V5ICkgfHwgZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBrZXksIHtcblx0XHRcdGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKS5hZGQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFsgdHlwZSArIFwicXVldWVcIiwga2V5IF0gKTtcblx0XHRcdH0gKVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgc2V0dGVyID0gMjtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRkYXRhID0gdHlwZTtcblx0XHRcdHR5cGUgPSBcImZ4XCI7XG5cdFx0XHRzZXR0ZXItLTtcblx0XHR9XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPCBzZXR0ZXIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnF1ZXVlKCB0aGlzWyAwIF0sIHR5cGUgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMgOlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBkYXRhICk7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIGEgaG9va3MgZm9yIHRoaXMgcXVldWVcblx0XHRcdFx0alF1ZXJ5Ll9xdWV1ZUhvb2tzKCB0aGlzLCB0eXBlICk7XG5cblx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgJiYgcXVldWVbIDAgXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHR9LFxuXHRkZXF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0fSApO1xuXHR9LFxuXHRjbGVhclF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdH0sXG5cblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0bXAgPSBkYXRhUHJpdi5nZXQoIGVsZW1lbnRzWyBpIF0sIHR5cGUgKyBcInF1ZXVlSG9va3NcIiApO1xuXHRcdFx0aWYgKCB0bXAgJiYgdG1wLmVtcHR5ICkge1xuXHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR0bXAuZW1wdHkuYWRkKCByZXNvbHZlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlc29sdmUoKTtcblx0XHRyZXR1cm4gZGVmZXIucHJvbWlzZSggb2JqICk7XG5cdH1cbn0gKTtcbnZhciBwbnVtID0gKCAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLyApLnNvdXJjZTtcblxudmFyIHJjc3NOdW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApO1xuXG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuV2l0aGluVHJlZSA9IGZ1bmN0aW9uKCBlbGVtLCBlbCApIHtcblxuXHRcdC8vIGlzSGlkZGVuV2l0aGluVHJlZSBtaWdodCBiZSBjYWxsZWQgZnJvbSBqUXVlcnkjZmlsdGVyIGZ1bmN0aW9uO1xuXHRcdC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxuXHRcdGVsZW0gPSBlbCB8fCBlbGVtO1xuXG5cdFx0Ly8gSW5saW5lIHN0eWxlIHRydW1wcyBhbGxcblx0XHRyZXR1cm4gZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fFxuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmXG5cblx0XHRcdC8vIE90aGVyd2lzZSwgY2hlY2sgY29tcHV0ZWQgc3R5bGVcblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MyAtIDQ1XG5cdFx0XHQvLyBEaXNjb25uZWN0ZWQgZWxlbWVudHMgY2FuIGhhdmUgY29tcHV0ZWQgZGlzcGxheTogbm9uZSwgc28gZmlyc3QgY29uZmlybSB0aGF0IGVsZW0gaXNcblx0XHRcdC8vIGluIHRoZSBkb2N1bWVudC5cblx0XHRcdGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgJiZcblxuXHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCI7XG5cdH07XG5cbnZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIGFkanVzdENTUyggZWxlbSwgcHJvcCwgdmFsdWVQYXJ0cywgdHdlZW4gKSB7XG5cdHZhciBhZGp1c3RlZCwgc2NhbGUsXG5cdFx0bWF4SXRlcmF0aW9ucyA9IDIwLFxuXHRcdGN1cnJlbnRWYWx1ZSA9IHR3ZWVuID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uY3VyKCk7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgcHJvcCwgXCJcIiApO1xuXHRcdFx0fSxcblx0XHRpbml0aWFsID0gY3VycmVudFZhbHVlKCksXG5cdFx0dW5pdCA9IHZhbHVlUGFydHMgJiYgdmFsdWVQYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0Ly8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcblx0XHRpbml0aWFsSW5Vbml0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICtpbml0aWFsICkgJiZcblx0XHRcdHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cblx0aWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD01NFxuXHRcdC8vIEhhbHZlIHRoZSBpdGVyYXRpb24gdGFyZ2V0IHZhbHVlIHRvIHByZXZlbnQgaW50ZXJmZXJlbmNlIGZyb20gQ1NTIHVwcGVyIGJvdW5kcyAoZ2gtMjE0NClcblx0XHRpbml0aWFsID0gaW5pdGlhbCAvIDI7XG5cblx0XHQvLyBUcnVzdCB1bml0cyByZXBvcnRlZCBieSBqUXVlcnkuY3NzXG5cdFx0dW5pdCA9IHVuaXQgfHwgaW5pdGlhbEluVW5pdFsgMyBdO1xuXG5cdFx0Ly8gSXRlcmF0aXZlbHkgYXBwcm94aW1hdGUgZnJvbSBhIG5vbnplcm8gc3RhcnRpbmcgcG9pbnRcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWwgfHwgMTtcblxuXHRcdHdoaWxlICggbWF4SXRlcmF0aW9ucy0tICkge1xuXG5cdFx0XHQvLyBFdmFsdWF0ZSBhbmQgdXBkYXRlIG91ciBiZXN0IGd1ZXNzIChkb3VibGluZyBndWVzc2VzIHRoYXQgemVybyBvdXQpLlxuXHRcdFx0Ly8gRmluaXNoIGlmIHRoZSBzY2FsZSBlcXVhbHMgb3IgY3Jvc3NlcyAxIChtYWtpbmcgdGhlIG9sZCpuZXcgcHJvZHVjdCBub24tcG9zaXRpdmUpLlxuXHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXHRcdFx0aWYgKCAoIDEgLSBzY2FsZSApICogKCAxIC0gKCBzY2FsZSA9IGN1cnJlbnRWYWx1ZSgpIC8gaW5pdGlhbCB8fCAwLjUgKSApIDw9IDAgKSB7XG5cdFx0XHRcdG1heEl0ZXJhdGlvbnMgPSAwO1xuXHRcdFx0fVxuXHRcdFx0aW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgLyBzY2FsZTtcblxuXHRcdH1cblxuXHRcdGluaXRpYWxJblVuaXQgPSBpbml0aWFsSW5Vbml0ICogMjtcblx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIGluaXRpYWxJblVuaXQgKyB1bml0ICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0dmFsdWVQYXJ0cyA9IHZhbHVlUGFydHMgfHwgW107XG5cdH1cblxuXHRpZiAoIHZhbHVlUGFydHMgKSB7XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsSW5Vbml0IHx8ICtpbml0aWFsIHx8IDA7XG5cblx0XHQvLyBBcHBseSByZWxhdGl2ZSBvZmZzZXQgKCs9Ly09KSBpZiBzcGVjaWZpZWRcblx0XHRhZGp1c3RlZCA9IHZhbHVlUGFydHNbIDEgXSA/XG5cdFx0XHRpbml0aWFsSW5Vbml0ICsgKCB2YWx1ZVBhcnRzWyAxIF0gKyAxICkgKiB2YWx1ZVBhcnRzWyAyIF0gOlxuXHRcdFx0K3ZhbHVlUGFydHNbIDIgXTtcblx0XHRpZiAoIHR3ZWVuICkge1xuXHRcdFx0dHdlZW4udW5pdCA9IHVuaXQ7XG5cdFx0XHR0d2Vlbi5zdGFydCA9IGluaXRpYWxJblVuaXQ7XG5cdFx0XHR0d2Vlbi5lbmQgPSBhZGp1c3RlZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFkanVzdGVkO1xufVxuXG5cbnZhciBkZWZhdWx0RGlzcGxheU1hcCA9IHt9O1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0RGlzcGxheSggZWxlbSApIHtcblx0dmFyIHRlbXAsXG5cdFx0ZG9jID0gZWxlbS5vd25lckRvY3VtZW50LFxuXHRcdG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZSxcblx0XHRkaXNwbGF5ID0gZGVmYXVsdERpc3BsYXlNYXBbIG5vZGVOYW1lIF07XG5cblx0aWYgKCBkaXNwbGF5ICkge1xuXHRcdHJldHVybiBkaXNwbGF5O1xuXHR9XG5cblx0dGVtcCA9IGRvYy5ib2R5LmFwcGVuZENoaWxkKCBkb2MuY3JlYXRlRWxlbWVudCggbm9kZU5hbWUgKSApO1xuXHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggdGVtcCwgXCJkaXNwbGF5XCIgKTtcblxuXHR0ZW1wLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRlbXAgKTtcblxuXHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuXHRcdGRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdH1cblx0ZGVmYXVsdERpc3BsYXlNYXBbIG5vZGVOYW1lIF0gPSBkaXNwbGF5O1xuXG5cdHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBzaG93SGlkZSggZWxlbWVudHMsIHNob3cgKSB7XG5cdHZhciBkaXNwbGF5LCBlbGVtLFxuXHRcdHZhbHVlcyA9IFtdLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG5cblx0Ly8gRGV0ZXJtaW5lIG5ldyBkaXNwbGF5IHZhbHVlIGZvciBlbGVtZW50cyB0aGF0IG5lZWQgdG8gY2hhbmdlXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuXHRcdGlmICggIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRkaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5O1xuXHRcdGlmICggc2hvdyApIHtcblxuXHRcdFx0Ly8gU2luY2Ugd2UgZm9yY2UgdmlzaWJpbGl0eSB1cG9uIGNhc2NhZGUtaGlkZGVuIGVsZW1lbnRzLCBhbiBpbW1lZGlhdGUgKGFuZCBzbG93KVxuXHRcdFx0Ly8gY2hlY2sgaXMgcmVxdWlyZWQgaW4gdGhpcyBmaXJzdCBsb29wIHVubGVzcyB3ZSBoYXZlIGEgbm9uZW1wdHkgZGlzcGxheSB2YWx1ZSAoZWl0aGVyXG5cdFx0XHQvLyBpbmxpbmUgb3IgYWJvdXQtdG8tYmUtcmVzdG9yZWQpXG5cdFx0XHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBkYXRhUHJpdi5nZXQoIGVsZW0sIFwiZGlzcGxheVwiICkgfHwgbnVsbDtcblx0XHRcdFx0aWYgKCAhdmFsdWVzWyBpbmRleCBdICkge1xuXHRcdFx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuV2l0aGluVHJlZSggZWxlbSApICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBnZXREZWZhdWx0RGlzcGxheSggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIGRpc3BsYXkgIT09IFwibm9uZVwiICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBcIm5vbmVcIjtcblxuXHRcdFx0XHQvLyBSZW1lbWJlciB3aGF0IHdlJ3JlIG92ZXJ3cml0aW5nXG5cdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJkaXNwbGF5XCIsIGRpc3BsYXkgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgdGhlIGRpc3BsYXkgb2YgdGhlIGVsZW1lbnRzIGluIGEgc2Vjb25kIGxvb3AgdG8gYXZvaWQgY29uc3RhbnQgcmVmbG93XG5cdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0aWYgKCB2YWx1ZXNbIGluZGV4IF0gIT0gbnVsbCApIHtcblx0XHRcdGVsZW1lbnRzWyBpbmRleCBdLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZXNbIGluZGV4IF07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNob3c6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcywgdHJ1ZSApO1xuXHR9LFxuXHRoaWRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMgKTtcblx0fSxcblx0dG9nZ2xlOiBmdW5jdGlvbiggc3RhdGUgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggaXNIaWRkZW5XaXRoaW5UcmVlKCB0aGlzICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnNob3coKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcbnZhciByY2hlY2thYmxlVHlwZSA9ICggL14oPzpjaGVja2JveHxyYWRpbykkL2kgKTtcblxudmFyIHJ0YWdOYW1lID0gKCAvPChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSspL2kgKTtcblxudmFyIHJzY3JpcHRUeXBlID0gKCAvXiR8Xm1vZHVsZSR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pICk7XG5cblxuXG4vLyBXZSBoYXZlIHRvIGNsb3NlIHRoZXNlIHRhZ3MgdG8gc3VwcG9ydCBYSFRNTCAoIzEzMjAwKVxudmFyIHdyYXBNYXAgPSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0b3B0aW9uOiBbIDEsIFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPlwiLCBcIjwvc2VsZWN0PlwiIF0sXG5cblx0Ly8gWEhUTUwgcGFyc2VycyBkbyBub3QgbWFnaWNhbGx5IGluc2VydCBlbGVtZW50cyBpbiB0aGVcblx0Ly8gc2FtZSB3YXkgdGhhdCB0YWcgc291cCBwYXJzZXJzIGRvLiBTbyB3ZSBjYW5ub3Qgc2hvcnRlblxuXHQvLyB0aGlzIGJ5IG9taXR0aW5nIDx0Ym9keT4gb3Igb3RoZXIgcmVxdWlyZWQgZWxlbWVudHMuXG5cdHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcblx0Y29sOiBbIDIsIFwiPHRhYmxlPjxjb2xncm91cD5cIiwgXCI8L2NvbGdyb3VwPjwvdGFibGU+XCIgXSxcblx0dHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXHR0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXG5cblx0X2RlZmF1bHQ6IFsgMCwgXCJcIiwgXCJcIiBdXG59O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxud3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXG53cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xud3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblxuZnVuY3Rpb24gZ2V0QWxsKCBjb250ZXh0LCB0YWcgKSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBVc2UgdHlwZW9mIHRvIGF2b2lkIHplcm8tYXJndW1lbnQgbWV0aG9kIGludm9jYXRpb24gb24gaG9zdCBvYmplY3RzICgjMTUxNTEpXG5cdHZhciByZXQ7XG5cblx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXQgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKTtcblxuXHR9IGVsc2UgaWYgKCB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldCA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnIHx8IFwiKlwiICk7XG5cblx0fSBlbHNlIHtcblx0XHRyZXQgPSBbXTtcblx0fVxuXG5cdGlmICggdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIG5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICk7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YVByaXYuc2V0KFxuXHRcdFx0ZWxlbXNbIGkgXSxcblx0XHRcdFwiZ2xvYmFsRXZhbFwiLFxuXHRcdFx0IXJlZkVsZW1lbnRzIHx8IGRhdGFQcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuXG52YXIgcmh0bWwgPSAvPHwmIz9cXHcrOy87XG5cbmZ1bmN0aW9uIGJ1aWxkRnJhZ21lbnQoIGVsZW1zLCBjb250ZXh0LCBzY3JpcHRzLCBzZWxlY3Rpb24sIGlnbm9yZWQgKSB7XG5cdHZhciBlbGVtLCB0bXAsIHRhZywgd3JhcCwgY29udGFpbnMsIGosXG5cdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRub2RlcyA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGVsZW0gPSBlbGVtc1sgaSBdO1xuXG5cdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdC8vIEFkZCBub2RlcyBkaXJlY3RseVxuXHRcdFx0aWYgKCB0b1R5cGUoIGVsZW0gKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCBlbGVtLm5vZGVUeXBlID8gWyBlbGVtIF0gOiBlbGVtICk7XG5cblx0XHRcdC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxuXHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0bm9kZXMucHVzaCggY29udGV4dC5jcmVhdGVUZXh0Tm9kZSggZWxlbSApICk7XG5cblx0XHRcdC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dG1wID0gdG1wIHx8IGZyYWdtZW50LmFwcGVuZENoaWxkKCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXG5cdFx0XHRcdC8vIERlc2VyaWFsaXplIGEgc3RhbmRhcmQgcmVwcmVzZW50YXRpb25cblx0XHRcdFx0dGFnID0gKCBydGFnTmFtZS5leGVjKCBlbGVtICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHR0bXAuaW5uZXJIVE1MID0gd3JhcFsgMSBdICsgalF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIGVsZW0gKSArIHdyYXBbIDIgXTtcblxuXHRcdFx0XHQvLyBEZXNjZW5kIHRocm91Z2ggd3JhcHBlcnMgdG8gdGhlIHJpZ2h0IGNvbnRlbnRcblx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdFx0dG1wID0gdG1wLmxhc3RDaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIHRtcC5jaGlsZE5vZGVzICk7XG5cblx0XHRcdFx0Ly8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcblx0XHRcdFx0dG1wID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0XHQvLyBFbnN1cmUgdGhlIGNyZWF0ZWQgbm9kZXMgYXJlIG9ycGhhbmVkICgjMTIzOTIpXG5cdFx0XHRcdHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmVtb3ZlIHdyYXBwZXIgZnJvbSBmcmFnbWVudFxuXHRmcmFnbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cblx0aSA9IDA7XG5cdHdoaWxlICggKCBlbGVtID0gbm9kZXNbIGkrKyBdICkgKSB7XG5cblx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgaW4gdGhlIGNvbnRleHQgY29sbGVjdGlvbiAodHJhYy00MDg3KVxuXHRcdGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSA+IC0xICkge1xuXHRcdFx0aWYgKCBpZ25vcmVkICkge1xuXHRcdFx0XHRpZ25vcmVkLnB1c2goIGVsZW0gKTtcblx0XHRcdH1cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnRhaW5zID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdC8vIEFwcGVuZCB0byBmcmFnbWVudFxuXHRcdHRtcCA9IGdldEFsbCggZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGVsZW0gKSwgXCJzY3JpcHRcIiApO1xuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGlmICggY29udGFpbnMgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCB0bXAgKTtcblx0XHR9XG5cblx0XHQvLyBDYXB0dXJlIGV4ZWN1dGFibGVzXG5cdFx0aWYgKCBzY3JpcHRzICkge1xuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRtcFsgaisrIF0gKSApIHtcblx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBlbGVtLnR5cGUgfHwgXCJcIiApICkge1xuXHRcdFx0XHRcdHNjcmlwdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZyYWdtZW50O1xufVxuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRkaXYgPSBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICksXG5cdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdC8vIENoZWNrIHN0YXRlIGxvc3QgaWYgdGhlIG5hbWUgaXMgc2V0ICgjMTEyMTcpXG5cdC8vIFN1cHBvcnQ6IFdpbmRvd3MgV2ViIEFwcHMgKFdXQSlcblx0Ly8gYG5hbWVgIGFuZCBgdHlwZWAgbXVzdCB1c2UgLnNldEF0dHJpYnV0ZSBmb3IgV1dBICgjMTQ5MDEpXG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwicmFkaW9cIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcInRcIiApO1xuXG5cdGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4xIG9ubHlcblx0Ly8gT2xkZXIgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG5cdHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0gKSgpO1xudmFyIGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbnZhclxuXHRya2V5RXZlbnQgPSAvXmtleS8sXG5cdHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcCl8Y2xpY2svLFxuXHRydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KS87XG5cbmZ1bmN0aW9uIHJldHVyblRydWUoKSB7XG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuLy8gU2VlICMxMzM5MyBmb3IgbW9yZSBpbmZvXG5mdW5jdGlvbiBzYWZlQWN0aXZlRWxlbWVudCgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0fSBjYXRjaCAoIGVyciApIHsgfVxufVxuXG5mdW5jdGlvbiBvbiggZWxlbSwgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgb25lICkge1xuXHR2YXIgb3JpZ0ZuLCB0eXBlO1xuXG5cdC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuXHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vICggdHlwZXMtT2JqZWN0LCBzZWxlY3RvciwgZGF0YSApXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRvbiggZWxlbSwgdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG5cblx0XHQvLyAoIHR5cGVzLCBmbiApXG5cdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMsIHNlbGVjdG9yLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vICggdHlwZXMsIGRhdGEsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHR9IGVsc2UgaWYgKCAhZm4gKSB7XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIG9uZSA9PT0gMSApIHtcblx0XHRvcmlnRm4gPSBmbjtcblx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG5cdFx0XHRyZXR1cm4gb3JpZ0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9O1xuXG5cdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcblx0fVxuXHRyZXR1cm4gZWxlbS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG5cdH0gKTtcbn1cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIG1hbmFnaW5nIGV2ZW50cyAtLSBub3QgcGFydCBvZiB0aGUgcHVibGljIGludGVyZmFjZS5cbiAqIFByb3BzIHRvIERlYW4gRWR3YXJkcycgYWRkRXZlbnQgbGlicmFyeSBmb3IgbWFueSBvZiB0aGUgaWRlYXMuXG4gKi9cbmpRdWVyeS5ldmVudCA9IHtcblxuXHRnbG9iYWw6IHt9LFxuXG5cdGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcblxuXHRcdHZhciBoYW5kbGVPYmpJbiwgZXZlbnRIYW5kbGUsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYnV0IGFsbG93IHBsYWluIG9iamVjdHMpXG5cdFx0aWYgKCAhZWxlbURhdGEgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXG5cdFx0aWYgKCBoYW5kbGVyLmhhbmRsZXIgKSB7XG5cdFx0XHRoYW5kbGVPYmpJbiA9IGhhbmRsZXI7XG5cdFx0XHRoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcblx0XHRcdHNlbGVjdG9yID0gaGFuZGxlT2JqSW4uc2VsZWN0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gRW5zdXJlIHRoYXQgaW52YWxpZCBzZWxlY3RvcnMgdGhyb3cgZXhjZXB0aW9ucyBhdCBhdHRhY2ggdGltZVxuXHRcdC8vIEV2YWx1YXRlIGFnYWluc3QgZG9jdW1lbnRFbGVtZW50IGluIGNhc2UgZWxlbSBpcyBhIG5vbi1lbGVtZW50IG5vZGUgKGUuZy4sIGRvY3VtZW50KVxuXHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGRvY3VtZW50RWxlbWVudCwgc2VsZWN0b3IgKTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcblx0XHRpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3Rcblx0XHRpZiAoICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0ZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzID0ge307XG5cdFx0fVxuXHRcdGlmICggISggZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgKSApIHtcblx0XHRcdGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlID0gZnVuY3Rpb24oIGUgKSB7XG5cblx0XHRcdFx0Ly8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcblx0XHRcdFx0Ly8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICE9PSBlLnR5cGUgP1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5kaXNwYXRjaC5hcHBseSggZWxlbSwgYXJndW1lbnRzICkgOiB1bmRlZmluZWQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIEhhbmRsZSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIGJ5IGEgc3BhY2Vcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVGhlcmUgKm11c3QqIGJlIGEgdHlwZSwgbm8gYXR0YWNoaW5nIG5hbWVzcGFjZS1vbmx5IGhhbmRsZXJzXG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cblx0XHRcdC8vIFVwZGF0ZSBzcGVjaWFsIGJhc2VkIG9uIG5ld2x5IHJlc2V0IHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xuXHRcdFx0aGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKVxuXHRcdFx0fSwgaGFuZGxlT2JqSW4gKTtcblxuXHRcdFx0Ly8gSW5pdCB0aGUgZXZlbnQgaGFuZGxlciBxdWV1ZSBpZiB3ZSdyZSB0aGUgZmlyc3Rcblx0XHRcdGlmICggISggaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSApICkge1xuXHRcdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdID0gW107XG5cdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQgPSAwO1xuXG5cdFx0XHRcdC8vIE9ubHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIgaWYgdGhlIHNwZWNpYWwgZXZlbnRzIGhhbmRsZXIgcmV0dXJucyBmYWxzZVxuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnNldHVwIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBldmVudEhhbmRsZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNwZWNpYWwuYWRkICkge1xuXHRcdFx0XHRzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblxuXHRcdFx0XHRpZiAoICFoYW5kbGVPYmouaGFuZGxlci5ndWlkICkge1xuXHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyLmd1aWQgPSBoYW5kbGVyLmd1aWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcblx0XHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaGFuZGxlcnMuZGVsZWdhdGVDb3VudCsrLCAwLCBoYW5kbGVPYmogKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXG5cdFx0XHRqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xuXHRcdH1cblxuXHR9LFxuXG5cdC8vIERldGFjaCBhbiBldmVudCBvciBzZXQgb2YgZXZlbnRzIGZyb20gYW4gZWxlbWVudFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgc2VsZWN0b3IsIG1hcHBlZFR5cGVzICkge1xuXG5cdFx0dmFyIGosIG9yaWdDb3VudCwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdGlmICggIWVsZW1EYXRhIHx8ICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE9uY2UgZm9yIGVhY2ggdHlwZS5uYW1lc3BhY2UgaW4gdHlwZXM7IHR5cGUgbWF5IGJlIG9taXR0ZWRcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVW5iaW5kIGFsbCBldmVudHMgKG9uIHRoaXMgbmFtZXNwYWNlLCBpZiBwcm92aWRlZCkgZm9yIHRoZSBlbGVtZW50XG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICsgdHlwZXNbIHQgXSwgaGFuZGxlciwgc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdIHx8IFtdO1xuXHRcdFx0dG1wID0gdG1wWyAyIF0gJiZcblx0XHRcdFx0bmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fFxuXHRcdFx0XHRcdFx0c2VsZWN0b3IgPT09IFwiKipcIiAmJiBoYW5kbGVPYmouc2VsZWN0b3IgKSApIHtcblx0XHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGosIDEgKTtcblxuXHRcdFx0XHRcdGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIHNwZWNpYWwucmVtb3ZlICkge1xuXHRcdFx0XHRcdFx0c3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3Rcblx0XHRcdC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxuXHRcdFx0aWYgKCBvcmlnQ291bnQgJiYgIWhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fFxuXHRcdFx0XHRcdHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBlbGVtRGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBldmVudHNbIHR5cGUgXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgZGF0YSBhbmQgdGhlIGV4cGFuZG8gaWYgaXQncyBubyBsb25nZXIgdXNlZFxuXHRcdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGV2ZW50cyApICkge1xuXHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImhhbmRsZSBldmVudHNcIiApO1xuXHRcdH1cblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIG5hdGl2ZUV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0dmFyIGV2ZW50ID0galF1ZXJ5LmV2ZW50LmZpeCggbmF0aXZlRXZlbnQgKTtcblxuXHRcdHZhciBpLCBqLCByZXQsIG1hdGNoZWQsIGhhbmRsZU9iaiwgaGFuZGxlclF1ZXVlLFxuXHRcdFx0YXJncyA9IG5ldyBBcnJheSggYXJndW1lbnRzLmxlbmd0aCApLFxuXHRcdFx0aGFuZGxlcnMgPSAoIGRhdGFQcml2LmdldCggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG5cdFx0Ly8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcblx0XHRhcmdzWyAwIF0gPSBldmVudDtcblxuXHRcdGZvciAoIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoIG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRldmVudC5jdXJyZW50VGFyZ2V0ID0gbWF0Y2hlZC5lbGVtO1xuXG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSApICYmXG5cdFx0XHRcdCFldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRcdC8vIFRyaWdnZXJlZCBldmVudCBtdXN0IGVpdGhlciAxKSBoYXZlIG5vIG5hbWVzcGFjZSwgb3IgMikgaGF2ZSBuYW1lc3BhY2Uocylcblx0XHRcdFx0Ly8gYSBzdWJzZXQgb3IgZXF1YWwgdG8gdGhvc2UgaW4gdGhlIGJvdW5kIGV2ZW50IChib3RoIGNhbiBoYXZlIG5vIG5hbWVzcGFjZSkuXG5cdFx0XHRcdGlmICggIWV2ZW50LnJuYW1lc3BhY2UgfHwgZXZlbnQucm5hbWVzcGFjZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoIGpRdWVyeS5ldmVudC5zcGVjaWFsWyBoYW5kbGVPYmoub3JpZ1R5cGUgXSB8fCB7fSApLmhhbmRsZSB8fFxuXHRcdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIgKS5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cblx0XHRcdFx0XHRpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGV2ZW50LnJlc3VsdCA9IHJldCApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbCB0aGUgcG9zdERpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZVxuXHRcdGlmICggc3BlY2lhbC5wb3N0RGlzcGF0Y2ggKSB7XG5cdFx0XHRzcGVjaWFsLnBvc3REaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0aGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XG5cdFx0dmFyIGksIGhhbmRsZU9iaiwgc2VsLCBtYXRjaGVkSGFuZGxlcnMsIG1hdGNoZWRTZWxlY3RvcnMsXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuXHRcdFx0Y3VyID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCAmJlxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTlcblx0XHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICh0cmFjLTEzMTgwKVxuXHRcdFx0Y3VyLm5vZGVUeXBlICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MlxuXHRcdFx0Ly8gU3VwcHJlc3Mgc3BlYy12aW9sYXRpbmcgY2xpY2tzIGluZGljYXRpbmcgYSBub24tcHJpbWFyeSBwb2ludGVyIGJ1dHRvbiAodHJhYy0zODYxKVxuXHRcdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtdHlwZS1jbGlja1xuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0Ly8gLi4uYnV0IG5vdCBhcnJvdyBrZXkgXCJjbGlja3NcIiBvZiByYWRpbyBpbnB1dHMsIHdoaWNoIGNhbiBoYXZlIGBidXR0b25gIC0xIChnaC0yMzQzKVxuXHRcdFx0ISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGV2ZW50LmJ1dHRvbiA+PSAxICkgKSB7XG5cblx0XHRcdGZvciAoIDsgY3VyICE9PSB0aGlzOyBjdXIgPSBjdXIucGFyZW50Tm9kZSB8fCB0aGlzICkge1xuXG5cdFx0XHRcdC8vIERvbid0IGNoZWNrIG5vbi1lbGVtZW50cyAoIzEzMjA4KVxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPT09IDEgJiYgISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGN1ci5kaXNhYmxlZCA9PT0gdHJ1ZSApICkge1xuXHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnMgPSB7fTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID4gLTEgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkSGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggbWF0Y2hlZEhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IGN1ciwgaGFuZGxlcnM6IG1hdGNoZWRIYW5kbGVycyB9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHRoZSByZW1haW5pbmcgKGRpcmVjdGx5LWJvdW5kKSBoYW5kbGVyc1xuXHRcdGN1ciA9IHRoaXM7XG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50IDwgaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogaGFuZGxlcnMuc2xpY2UoIGRlbGVnYXRlQ291bnQgKSB9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZXJRdWV1ZTtcblx0fSxcblxuXHRhZGRQcm9wOiBmdW5jdGlvbiggbmFtZSwgaG9vayApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGpRdWVyeS5FdmVudC5wcm90b3R5cGUsIG5hbWUsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cblx0XHRcdGdldDogaXNGdW5jdGlvbiggaG9vayApID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBob29rKCB0aGlzLm9yaWdpbmFsRXZlbnQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gOlxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFsgbmFtZSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgbmFtZSwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGZpeDogZnVuY3Rpb24oIG9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0cmV0dXJuIG9yaWdpbmFsRXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuXHRcdFx0b3JpZ2luYWxFdmVudCA6XG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cdH0sXG5cblx0c3BlY2lhbDoge1xuXHRcdGxvYWQ6IHtcblxuXHRcdFx0Ly8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuXHRcdFx0bm9CdWJibGU6IHRydWVcblx0XHR9LFxuXHRcdGZvY3VzOiB7XG5cblx0XHRcdC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyAhPT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmZvY3VzICkge1xuXHRcdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNpblwiXG5cdFx0fSxcblx0XHRibHVyOiB7XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcblx0XHRcdFx0XHR0aGlzLmJsdXIoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNvdXRcIlxuXHRcdH0sXG5cdFx0Y2xpY2s6IHtcblxuXHRcdFx0Ly8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgbm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuY2xpY2soKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuXHRcdFx0X2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0cmV0dXJuIG5vZGVOYW1lKCBldmVudC50YXJnZXQsIFwiYVwiICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJlZm9yZXVubG9hZDoge1xuXHRcdFx0cG9zdERpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCAyMCtcblx0XHRcdFx0Ly8gRmlyZWZveCBkb2Vzbid0IGFsZXJ0IGlmIHRoZSByZXR1cm5WYWx1ZSBmaWVsZCBpcyBub3Qgc2V0LlxuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0ZXZlbnQub3JpZ2luYWxFdmVudC5yZXR1cm5WYWx1ZSA9IGV2ZW50LnJlc3VsdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcblxuXHQvLyBUaGlzIFwiaWZcIiBpcyBuZWVkZWQgZm9yIHBsYWluIG9iamVjdHNcblx0aWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0ZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBoYW5kbGUgKTtcblx0fVxufTtcblxualF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XG5cblx0Ly8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXG5cdGlmICggISggdGhpcyBpbnN0YW5jZW9mIGpRdWVyeS5FdmVudCApICkge1xuXHRcdHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KCBzcmMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBFdmVudCBvYmplY3Rcblx0aWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XG5cdFx0dGhpcy5vcmlnaW5hbEV2ZW50ID0gc3JjO1xuXHRcdHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG5cdFx0Ly8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcblx0XHQvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG5cdFx0XHRcdHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9Mi4zIG9ubHlcblx0XHRcdFx0c3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRyZXR1cm5UcnVlIDpcblx0XHRcdHJldHVybkZhbHNlO1xuXG5cdFx0Ly8gQ3JlYXRlIHRhcmdldCBwcm9wZXJ0aWVzXG5cdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDw9NiAtIDcgb25seVxuXHRcdC8vIFRhcmdldCBzaG91bGQgbm90IGJlIGEgdGV4dCBub2RlICgjNTA0LCAjMTMxNDMpXG5cdFx0dGhpcy50YXJnZXQgPSAoIHNyYy50YXJnZXQgJiYgc3JjLnRhcmdldC5ub2RlVHlwZSA9PT0gMyApID9cblx0XHRcdHNyYy50YXJnZXQucGFyZW50Tm9kZSA6XG5cdFx0XHRzcmMudGFyZ2V0O1xuXG5cdFx0dGhpcy5jdXJyZW50VGFyZ2V0ID0gc3JjLmN1cnJlbnRUYXJnZXQ7XG5cdFx0dGhpcy5yZWxhdGVkVGFyZ2V0ID0gc3JjLnJlbGF0ZWRUYXJnZXQ7XG5cblx0Ly8gRXZlbnQgdHlwZVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMudHlwZSA9IHNyYztcblx0fVxuXG5cdC8vIFB1dCBleHBsaWNpdGx5IHByb3ZpZGVkIHByb3BlcnRpZXMgb250byB0aGUgZXZlbnQgb2JqZWN0XG5cdGlmICggcHJvcHMgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggdGhpcywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIENyZWF0ZSBhIHRpbWVzdGFtcCBpZiBpbmNvbWluZyBldmVudCBkb2Vzbid0IGhhdmUgb25lXG5cdHRoaXMudGltZVN0YW1wID0gc3JjICYmIHNyYy50aW1lU3RhbXAgfHwgRGF0ZS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXG5qUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LkV2ZW50LFxuXHRpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuXHRpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNTaW11bGF0ZWQ6IGZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn07XG5cbi8vIEluY2x1ZGVzIGFsbCBjb21tb24gZXZlbnQgcHJvcHMgaW5jbHVkaW5nIEtleUV2ZW50IGFuZCBNb3VzZUV2ZW50IHNwZWNpZmljIHByb3BzXG5qUXVlcnkuZWFjaCgge1xuXHRhbHRLZXk6IHRydWUsXG5cdGJ1YmJsZXM6IHRydWUsXG5cdGNhbmNlbGFibGU6IHRydWUsXG5cdGNoYW5nZWRUb3VjaGVzOiB0cnVlLFxuXHRjdHJsS2V5OiB0cnVlLFxuXHRkZXRhaWw6IHRydWUsXG5cdGV2ZW50UGhhc2U6IHRydWUsXG5cdG1ldGFLZXk6IHRydWUsXG5cdHBhZ2VYOiB0cnVlLFxuXHRwYWdlWTogdHJ1ZSxcblx0c2hpZnRLZXk6IHRydWUsXG5cdHZpZXc6IHRydWUsXG5cdFwiY2hhclwiOiB0cnVlLFxuXHRjaGFyQ29kZTogdHJ1ZSxcblx0a2V5OiB0cnVlLFxuXHRrZXlDb2RlOiB0cnVlLFxuXHRidXR0b246IHRydWUsXG5cdGJ1dHRvbnM6IHRydWUsXG5cdGNsaWVudFg6IHRydWUsXG5cdGNsaWVudFk6IHRydWUsXG5cdG9mZnNldFg6IHRydWUsXG5cdG9mZnNldFk6IHRydWUsXG5cdHBvaW50ZXJJZDogdHJ1ZSxcblx0cG9pbnRlclR5cGU6IHRydWUsXG5cdHNjcmVlblg6IHRydWUsXG5cdHNjcmVlblk6IHRydWUsXG5cdHRhcmdldFRvdWNoZXM6IHRydWUsXG5cdHRvRWxlbWVudDogdHJ1ZSxcblx0dG91Y2hlczogdHJ1ZSxcblxuXHR3aGljaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdHZhciBidXR0b24gPSBldmVudC5idXR0b247XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRpZiAoIGV2ZW50LndoaWNoID09IG51bGwgJiYgcmtleUV2ZW50LnRlc3QoIGV2ZW50LnR5cGUgKSApIHtcblx0XHRcdHJldHVybiBldmVudC5jaGFyQ29kZSAhPSBudWxsID8gZXZlbnQuY2hhckNvZGUgOiBldmVudC5rZXlDb2RlO1xuXHRcdH1cblxuXHRcdC8vIEFkZCB3aGljaCBmb3IgY2xpY2s6IDEgPT09IGxlZnQ7IDIgPT09IG1pZGRsZTsgMyA9PT0gcmlnaHRcblx0XHRpZiAoICFldmVudC53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCAmJiBybW91c2VFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDEgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDIgKSB7XG5cdFx0XHRcdHJldHVybiAzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDQgKSB7XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQud2hpY2g7XG5cdH1cbn0sIGpRdWVyeS5ldmVudC5hZGRQcm9wICk7XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gc28gdGhhdCBldmVudCBkZWxlZ2F0aW9uIHdvcmtzIGluIGpRdWVyeS5cbi8vIERvIHRoZSBzYW1lIGZvciBwb2ludGVyZW50ZXIvcG9pbnRlcmxlYXZlIGFuZCBwb2ludGVyb3Zlci9wb2ludGVyb3V0XG4vL1xuLy8gU3VwcG9ydDogU2FmYXJpIDcgb25seVxuLy8gU2FmYXJpIHNlbmRzIG1vdXNlZW50ZXIgdG9vIG9mdGVuOyBzZWU6XG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NzAyNThcbi8vIGZvciB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGJ1ZyAoaXQgZXhpc3RlZCBpbiBvbGRlciBDaHJvbWUgdmVyc2lvbnMgYXMgd2VsbCkuXG5qUXVlcnkuZWFjaCgge1xuXHRtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuXHRtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG5cdHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuXHRwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuXHRcdGRlbGVnYXRlVHlwZTogZml4LFxuXHRcdGJpbmRUeXBlOiBmaXgsXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciByZXQsXG5cdFx0XHRcdHRhcmdldCA9IHRoaXMsXG5cdFx0XHRcdHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuXHRcdFx0XHRoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cblx0XHRcdC8vIEZvciBtb3VzZWVudGVyL2xlYXZlIGNhbGwgdGhlIGhhbmRsZXIgaWYgcmVsYXRlZCBpcyBvdXRzaWRlIHRoZSB0YXJnZXQuXG5cdFx0XHQvLyBOQjogTm8gcmVsYXRlZFRhcmdldCBpZiB0aGUgbW91c2UgbGVmdC9lbnRlcmVkIHRoZSBicm93c2VyIHdpbmRvd1xuXHRcdFx0aWYgKCAhcmVsYXRlZCB8fCAoIHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSApICkge1xuXHRcdFx0XHRldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuXHRcdFx0XHRyZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBmaXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID9cblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUgKyBcIi5cIiArIGhhbmRsZU9iai5uYW1lc3BhY2UgOlxuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzIFssIGZuXSApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxudmFyXG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvMzIyOVxuXHRyeGh0bWxUYWcgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopW14+XSopXFwvPi9naSxcblxuXHQvKiBlc2xpbnQtZW5hYmxlICovXG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExLCBFZGdlIDEyIC0gMTMgb25seVxuXHQvLyBJbiBJRS9FZGdlIHVzaW5nIHJlZ2V4IGdyb3VwcyBoZXJlIGNhdXNlcyBzZXZlcmUgc2xvd2Rvd25zLlxuXHQvLyBTZWUgaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy8xNzM2NTEyL1xuXHRybm9Jbm5lcmh0bWwgPSAvPHNjcmlwdHw8c3R5bGV8PGxpbmsvaSxcblxuXHQvLyBjaGVja2VkPVwiY2hlY2tlZFwiIG9yIGNoZWNrZWRcblx0cmNoZWNrZWQgPSAvY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLFxuXHRyY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2c7XG5cbi8vIFByZWZlciBhIHRib2R5IG92ZXIgaXRzIHBhcmVudCB0YWJsZSBmb3IgY29udGFpbmluZyBuZXcgcm93c1xuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdG5vZGVOYW1lKCBjb250ZW50Lm5vZGVUeXBlICE9PSAxMSA/IGNvbnRlbnQgOiBjb250ZW50LmZpcnN0Q2hpbGQsIFwidHJcIiApICkge1xuXG5cdFx0cmV0dXJuIGpRdWVyeSggZWxlbSApLmNoaWxkcmVuKCBcInRib2R5XCIgKVsgMCBdIHx8IGVsZW07XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKCBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSAhPT0gbnVsbCApICsgXCIvXCIgKyBlbGVtLnR5cGU7XG5cdHJldHVybiBlbGVtO1xufVxuZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcblx0aWYgKCAoIGVsZW0udHlwZSB8fCBcIlwiICkuc2xpY2UoIDAsIDUgKSA9PT0gXCJ0cnVlL1wiICkge1xuXHRcdGVsZW0udHlwZSA9IGVsZW0udHlwZS5zbGljZSggNSApO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBcInR5cGVcIiApO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBpLCBsLCB0eXBlLCBwZGF0YU9sZCwgcGRhdGFDdXIsIHVkYXRhT2xkLCB1ZGF0YUN1ciwgZXZlbnRzO1xuXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyAxLiBDb3B5IHByaXZhdGUgZGF0YTogZXZlbnRzLCBoYW5kbGVycywgZXRjLlxuXHRpZiAoIGRhdGFQcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YVByaXYuYWNjZXNzKCBzcmMgKTtcblx0XHRwZGF0YUN1ciA9IGRhdGFQcml2LnNldCggZGVzdCwgcGRhdGFPbGQgKTtcblx0XHRldmVudHMgPSBwZGF0YU9sZC5ldmVudHM7XG5cblx0XHRpZiAoIGV2ZW50cyApIHtcblx0XHRcdGRlbGV0ZSBwZGF0YUN1ci5oYW5kbGU7XG5cdFx0XHRwZGF0YUN1ci5ldmVudHMgPSB7fTtcblxuXHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIGRlc3QsIHR5cGUsIGV2ZW50c1sgdHlwZSBdWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIDIuIENvcHkgdXNlciBkYXRhXG5cdGlmICggZGF0YVVzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhVXNlci5hY2Nlc3MoIHNyYyApO1xuXHRcdHVkYXRhQ3VyID0galF1ZXJ5LmV4dGVuZCgge30sIHVkYXRhT2xkICk7XG5cblx0XHRkYXRhVXNlci5zZXQoIGRlc3QsIHVkYXRhQ3VyICk7XG5cdH1cbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gZG9tTWFuaXAoIGNvbGxlY3Rpb24sIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICkge1xuXG5cdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHR2YXIgZnJhZ21lbnQsIGZpcnN0LCBzY3JpcHRzLCBoYXNTY3JpcHRzLCBub2RlLCBkb2MsXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuXHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0dmFsdWUgPSBhcmdzWyAwIF0sXG5cdFx0dmFsdWVJc0Z1bmN0aW9uID0gaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0aWYgKCB2YWx1ZUlzRnVuY3Rpb24gfHxcblx0XHRcdCggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdHJldHVybiBjb2xsZWN0aW9uLmVhY2goIGZ1bmN0aW9uKCBpbmRleCApIHtcblx0XHRcdHZhciBzZWxmID0gY29sbGVjdGlvbi5lcSggaW5kZXggKTtcblx0XHRcdGlmICggdmFsdWVJc0Z1bmN0aW9uICkge1xuXHRcdFx0XHRhcmdzWyAwIF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcblx0XHRcdH1cblx0XHRcdGRvbU1hbmlwKCBzZWxmLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggbCApIHtcblx0XHRmcmFnbWVudCA9IGJ1aWxkRnJhZ21lbnQoIGFyZ3MsIGNvbGxlY3Rpb25bIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgY29sbGVjdGlvbiwgaWdub3JlZCApO1xuXHRcdGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdGlmICggZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgKSB7XG5cdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdH1cblxuXHRcdC8vIFJlcXVpcmUgZWl0aGVyIG5ldyBjb250ZW50IG9yIGFuIGludGVyZXN0IGluIGlnbm9yZWQgZWxlbWVudHMgdG8gaW52b2tlIHRoZSBjYWxsYmFja1xuXHRcdGlmICggZmlyc3QgfHwgaWdub3JlZCApIHtcblx0XHRcdHNjcmlwdHMgPSBqUXVlcnkubWFwKCBnZXRBbGwoIGZyYWdtZW50LCBcInNjcmlwdFwiICksIGRpc2FibGVTY3JpcHQgKTtcblx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0Ly8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbVxuXHRcdFx0Ly8gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG5cdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRub2RlID0gZnJhZ21lbnQ7XG5cblx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cblx0XHRcdFx0XHQvLyBLZWVwIHJlZmVyZW5jZXMgdG8gY2xvbmVkIHNjcmlwdHMgZm9yIGxhdGVyIHJlc3RvcmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWxsYmFjay5jYWxsKCBjb2xsZWN0aW9uWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHNjcmlwdHNcblx0XHRcdFx0alF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG5cdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IHNjcmlwdHNbIGkgXTtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdCFkYXRhUHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiZcblx0XHRcdFx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cblx0XHRcdFx0XHRcdGlmICggbm9kZS5zcmMgJiYgKCBub2RlLnR5cGUgfHwgXCJcIiApLnRvTG93ZXJDYXNlKCkgICE9PSBcIm1vZHVsZVwiICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0RE9NRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSwgZG9jLCBub2RlICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHR2YXIgbm9kZSxcblx0XHRub2RlcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIGVsZW0gKSA6IGVsZW0sXG5cdFx0aSA9IDA7XG5cblx0Zm9yICggOyAoIG5vZGUgPSBub2Rlc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIG5vZGUgKSApO1xuXHRcdH1cblxuXHRcdGlmICggbm9kZS5wYXJlbnROb2RlICkge1xuXHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIG5vZGUub3duZXJEb2N1bWVudCwgbm9kZSApICkge1xuXHRcdFx0XHRzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBub2RlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aHRtbFByZWZpbHRlcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0cmV0dXJuIGh0bWwucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHR2YXIgaSwgbCwgc3JjRWxlbWVudHMsIGRlc3RFbGVtZW50cyxcblx0XHRcdGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKSxcblx0XHRcdGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBGaXggSUUgY2xvbmluZyBpc3N1ZXNcblx0XHRpZiAoICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkICYmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBlbGVtLm5vZGVUeXBlID09PSAxMSApICYmXG5cdFx0XHRcdCFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwczovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRjbGVhbkRhdGE6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblx0XHR2YXIgZGF0YSwgZWxlbSwgdHlwZSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT09IHVuZGVmaW5lZDsgaSsrICkge1xuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cdFx0XHRcdGlmICggKCBkYXRhID0gZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gKSB7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IgKTtcblx0fSxcblxuXHR0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0cHJlcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IHRoaXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG5cdFx0ZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBqUXVlcnkuY2xvbmUoIHRoaXMsIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5odG1sUHJlZmlsdGVyKCB2YWx1ZSApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoICggZSApIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaWdub3JlZCA9IFtdO1xuXG5cdFx0Ly8gTWFrZSB0aGUgY2hhbmdlcywgcmVwbGFjaW5nIGVhY2ggbm9uLWlnbm9yZWQgY29udGV4dCBlbGVtZW50IHdpdGggdGhlIG5ldyBjb250ZW50XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaW5BcnJheSggdGhpcywgaWdub3JlZCApIDwgMCApIHtcblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCB0aGlzICkgKTtcblx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBGb3JjZSBjYWxsYmFjayBpbnZvY2F0aW9uXG5cdFx0fSwgaWdub3JlZCApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCB7XG5cdGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuXHRwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuXHRpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG5cdGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG5cdHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxufSwgZnVuY3Rpb24oIG5hbWUsIG9yaWdpbmFsICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgZWxlbXMsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcblx0XHRcdGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcblx0XHRcdGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKCB0cnVlICk7XG5cdFx0XHRqUXVlcnkoIGluc2VydFsgaSBdIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0Ly8gLmdldCgpIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0cHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG5cdH07XG59ICk7XG52YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSg/IXB4KVthLXolXSskXCIsIFwiaVwiICk7XG5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seSwgRmlyZWZveCA8PTMwICgjMTUwOTgsICMxNDE1MClcblx0XHQvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcblx0XHQvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcblx0XHR2YXIgdmlldyA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcblxuXHRcdGlmICggIXZpZXcgfHwgIXZpZXcub3BlbmVyICkge1xuXHRcdFx0dmlldyA9IHdpbmRvdztcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG5cdH07XG5cbnZhciByYm94U3R5bGUgPSBuZXcgUmVnRXhwKCBjc3NFeHBhbmQuam9pbiggXCJ8XCIgKSwgXCJpXCIgKTtcblxuXG5cbiggZnVuY3Rpb24oKSB7XG5cblx0Ly8gRXhlY3V0aW5nIGJvdGggcGl4ZWxQb3NpdGlvbiAmIGJveFNpemluZ1JlbGlhYmxlIHRlc3RzIHJlcXVpcmUgb25seSBvbmUgbGF5b3V0XG5cdC8vIHNvIHRoZXkncmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgdGltZSB0byBzYXZlIHRoZSBzZWNvbmQgY29tcHV0YXRpb24uXG5cdGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xuXG5cdFx0Ly8gVGhpcyBpcyBhIHNpbmdsZXRvbiwgd2UgbmVlZCB0byBleGVjdXRlIGl0IG9ubHkgb25jZVxuXHRcdGlmICggIWRpdiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTExMTFweDt3aWR0aDo2MHB4O1wiICtcblx0XHRcdFwibWFyZ2luLXRvcDoxcHg7cGFkZGluZzowO2JvcmRlcjowXCI7XG5cdFx0ZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0XCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveDtvdmVyZmxvdzpzY3JvbGw7XCIgK1xuXHRcdFx0XCJtYXJnaW46YXV0bztib3JkZXI6MXB4O3BhZGRpbmc6MXB4O1wiICtcblx0XHRcdFwid2lkdGg6NjAlO3RvcDoxJVwiO1xuXHRcdGRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCggY29udGFpbmVyICkuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdFx0dmFyIGRpdlN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiApO1xuXHRcdHBpeGVsUG9zaXRpb25WYWwgPSBkaXZTdHlsZS50b3AgIT09IFwiMSVcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHksIEZpcmVmb3ggPD0zIC0gNDRcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwgPSByb3VuZFBpeGVsTWVhc3VyZXMoIGRpdlN0eWxlLm1hcmdpbkxlZnQgKSA9PT0gMTI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5LCBTYWZhcmkgPD05LjEgLSAxMC4xLCBpT1MgPD03LjAgLSA5LjNcblx0XHQvLyBTb21lIHN0eWxlcyBjb21lIGJhY2sgd2l0aCBwZXJjZW50YWdlIHZhbHVlcywgZXZlbiB0aG91Z2ggdGhleSBzaG91bGRuJ3Rcblx0XHRkaXYuc3R5bGUucmlnaHQgPSBcIjYwJVwiO1xuXHRcdHBpeGVsQm94U3R5bGVzVmFsID0gcm91bmRQaXhlbE1lYXN1cmVzKCBkaXZTdHlsZS5yaWdodCApID09PSAzNjtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5XG5cdFx0Ly8gRGV0ZWN0IG1pc3JlcG9ydGluZyBvZiBjb250ZW50IGRpbWVuc2lvbnMgZm9yIGJveC1zaXppbmc6Ym9yZGVyLWJveCBlbGVtZW50c1xuXHRcdGJveFNpemluZ1JlbGlhYmxlVmFsID0gcm91bmRQaXhlbE1lYXN1cmVzKCBkaXZTdHlsZS53aWR0aCApID09PSAzNjtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgb25seVxuXHRcdC8vIERldGVjdCBvdmVyZmxvdzpzY3JvbGwgc2NyZXdpbmVzcyAoZ2gtMzY5OSlcblx0XHRkaXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0c2Nyb2xsYm94U2l6ZVZhbCA9IGRpdi5vZmZzZXRXaWR0aCA9PT0gMzYgfHwgXCJhYnNvbHV0ZVwiO1xuXG5cdFx0ZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblxuXHRcdC8vIE51bGxpZnkgdGhlIGRpdiBzbyBpdCB3b3VsZG4ndCBiZSBzdG9yZWQgaW4gdGhlIG1lbW9yeSBhbmRcblx0XHQvLyBpdCB3aWxsIGFsc28gYmUgYSBzaWduIHRoYXQgY2hlY2tzIGFscmVhZHkgcGVyZm9ybWVkXG5cdFx0ZGl2ID0gbnVsbDtcblx0fVxuXG5cdGZ1bmN0aW9uIHJvdW5kUGl4ZWxNZWFzdXJlcyggbWVhc3VyZSApIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCggcGFyc2VGbG9hdCggbWVhc3VyZSApICk7XG5cdH1cblxuXHR2YXIgcGl4ZWxQb3NpdGlvblZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsIHNjcm9sbGJveFNpemVWYWwsIHBpeGVsQm94U3R5bGVzVmFsLFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdFZhbCxcblx0XHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG5cdFx0ZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXG5cdC8vIEZpbmlzaCBlYXJseSBpbiBsaW1pdGVkIChub24tYnJvd3NlcikgZW52aXJvbm1lbnRzXG5cdGlmICggIWRpdi5zdHlsZSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFN0eWxlIG9mIGNsb25lZCBlbGVtZW50IGFmZmVjdHMgc291cmNlIGVsZW1lbnQgY2xvbmVkICgjODkwOClcblx0ZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuXHRkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuXHRzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG5cdGpRdWVyeS5leHRlbmQoIHN1cHBvcnQsIHtcblx0XHRib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xuXHRcdH0sXG5cdFx0cGl4ZWxCb3hTdHlsZXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBwaXhlbEJveFN0eWxlc1ZhbDtcblx0XHR9LFxuXHRcdHBpeGVsUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBwaXhlbFBvc2l0aW9uVmFsO1xuXHRcdH0sXG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0OiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcmVsaWFibGVNYXJnaW5MZWZ0VmFsO1xuXHRcdH0sXG5cdFx0c2Nyb2xsYm94U2l6ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHNjcm9sbGJveFNpemVWYWw7XG5cdFx0fVxuXHR9ICk7XG59ICkoKTtcblxuXG5mdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuXHR2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA1MStcblx0XHQvLyBSZXRyaWV2aW5nIHN0eWxlIGJlZm9yZSBjb21wdXRlZCBzb21laG93XG5cdFx0Ly8gZml4ZXMgYW4gaXNzdWUgd2l0aCBnZXR0aW5nIHdyb25nIHZhbHVlc1xuXHRcdC8vIG9uIGRldGFjaGVkIGVsZW1lbnRzXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cblx0Ly8gZ2V0UHJvcGVydHlWYWx1ZSBpcyBuZWVkZWQgZm9yOlxuXHQvLyAgIC5jc3MoJ2ZpbHRlcicpIChJRSA5IG9ubHksICMxMjUzNylcblx0Ly8gICAuY3NzKCctLWN1c3RvbVByb3BlcnR5KSAoIzMxNDQpXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0cmV0ID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF07XG5cblx0XHRpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHQvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcblx0XHQvLyBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzLlxuXHRcdC8vIFRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzpcblx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggIXN1cHBvcnQucGl4ZWxCb3hTdHlsZXMoKSAmJiBybnVtbm9ucHgudGVzdCggcmV0ICkgJiYgcmJveFN0eWxlLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0Ly8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cblx0XHRyZXQgKyBcIlwiIDpcblx0XHRyZXQ7XG59XG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cblxudmFyXG5cblx0Ly8gU3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZVxuXHQvLyBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcblx0Ly8gU2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG5cdHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcblx0cmN1c3RvbVByb3AgPSAvXi0tLyxcblx0Y3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG5cdGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcblx0XHRsZXR0ZXJTcGFjaW5nOiBcIjBcIixcblx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdH0sXG5cblx0Y3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiTW96XCIsIFwibXNcIiBdLFxuXHRlbXB0eVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLnN0eWxlO1xuXG4vLyBSZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHtcblxuXHQvLyBTaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxuXHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH1cblx0fVxufVxuXG4vLyBSZXR1cm4gYSBwcm9wZXJ0eSBtYXBwZWQgYWxvbmcgd2hhdCBqUXVlcnkuY3NzUHJvcHMgc3VnZ2VzdHMgb3IgdG9cbi8vIGEgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5LlxuZnVuY3Rpb24gZmluYWxQcm9wTmFtZSggbmFtZSApIHtcblx0dmFyIHJldCA9IGpRdWVyeS5jc3NQcm9wc1sgbmFtZSBdO1xuXHRpZiAoICFyZXQgKSB7XG5cdFx0cmV0ID0galF1ZXJ5LmNzc1Byb3BzWyBuYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHx8IG5hbWU7XG5cdH1cblx0cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcblxuXHQvLyBBbnkgcmVsYXRpdmUgKCsvLSkgdmFsdWVzIGhhdmUgYWxyZWFkeSBiZWVuXG5cdC8vIG5vcm1hbGl6ZWQgYXQgdGhpcyBwb2ludFxuXHR2YXIgbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKTtcblx0cmV0dXJuIG1hdGNoZXMgP1xuXG5cdFx0Ly8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgXCJzdWJ0cmFjdFwiLCBlLmcuLCB3aGVuIHVzZWQgYXMgaW4gY3NzSG9va3Ncblx0XHRNYXRoLm1heCggMCwgbWF0Y2hlc1sgMiBdIC0gKCBzdWJ0cmFjdCB8fCAwICkgKSArICggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApIDpcblx0XHR2YWx1ZTtcbn1cblxuZnVuY3Rpb24gYm94TW9kZWxBZGp1c3RtZW50KCBlbGVtLCBkaW1lbnNpb24sIGJveCwgaXNCb3JkZXJCb3gsIHN0eWxlcywgY29tcHV0ZWRWYWwgKSB7XG5cdHZhciBpID0gZGltZW5zaW9uID09PSBcIndpZHRoXCIgPyAxIDogMCxcblx0XHRleHRyYSA9IDAsXG5cdFx0ZGVsdGEgPSAwO1xuXG5cdC8vIEFkanVzdG1lbnQgbWF5IG5vdCBiZSBuZWNlc3Nhcnlcblx0aWYgKCBib3ggPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGZvciAoIDsgaSA8IDQ7IGkgKz0gMiApIHtcblxuXHRcdC8vIEJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpblxuXHRcdGlmICggYm94ID09PSBcIm1hcmdpblwiICkge1xuXHRcdFx0ZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgYm94ICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGdldCBoZXJlIHdpdGggYSBjb250ZW50LWJveCwgd2UncmUgc2Vla2luZyBcInBhZGRpbmdcIiBvciBcImJvcmRlclwiIG9yIFwibWFyZ2luXCJcblx0XHRpZiAoICFpc0JvcmRlckJveCApIHtcblxuXHRcdFx0Ly8gQWRkIHBhZGRpbmdcblx0XHRcdGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBGb3IgXCJib3JkZXJcIiBvciBcIm1hcmdpblwiLCBhZGQgYm9yZGVyXG5cdFx0XHRpZiAoIGJveCAhPT0gXCJwYWRkaW5nXCIgKSB7XG5cdFx0XHRcdGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cblx0XHRcdC8vIEJ1dCBzdGlsbCBrZWVwIHRyYWNrIG9mIGl0IG90aGVyd2lzZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXh0cmEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdC8vIElmIHdlIGdldCBoZXJlIHdpdGggYSBib3JkZXItYm94IChjb250ZW50ICsgcGFkZGluZyArIGJvcmRlciksIHdlJ3JlIHNlZWtpbmcgXCJjb250ZW50XCIgb3Jcblx0XHQvLyBcInBhZGRpbmdcIiBvciBcIm1hcmdpblwiXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gRm9yIFwiY29udGVudFwiLCBzdWJ0cmFjdCBwYWRkaW5nXG5cdFx0XHRpZiAoIGJveCA9PT0gXCJjb250ZW50XCIgKSB7XG5cdFx0XHRcdGRlbHRhIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgXCJjb250ZW50XCIgb3IgXCJwYWRkaW5nXCIsIHN1YnRyYWN0IGJvcmRlclxuXHRcdFx0aWYgKCBib3ggIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdGRlbHRhIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWNjb3VudCBmb3IgcG9zaXRpdmUgY29udGVudC1ib3ggc2Nyb2xsIGd1dHRlciB3aGVuIHJlcXVlc3RlZCBieSBwcm92aWRpbmcgY29tcHV0ZWRWYWxcblx0aWYgKCAhaXNCb3JkZXJCb3ggJiYgY29tcHV0ZWRWYWwgPj0gMCApIHtcblxuXHRcdC8vIG9mZnNldFdpZHRoL29mZnNldEhlaWdodCBpcyBhIHJvdW5kZWQgc3VtIG9mIGNvbnRlbnQsIHBhZGRpbmcsIHNjcm9sbCBndXR0ZXIsIGFuZCBib3JkZXJcblx0XHQvLyBBc3N1bWluZyBpbnRlZ2VyIHNjcm9sbCBndXR0ZXIsIHN1YnRyYWN0IHRoZSByZXN0IGFuZCByb3VuZCBkb3duXG5cdFx0ZGVsdGEgKz0gTWF0aC5tYXgoIDAsIE1hdGguY2VpbChcblx0XHRcdGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXSAtXG5cdFx0XHRjb21wdXRlZFZhbCAtXG5cdFx0XHRkZWx0YSAtXG5cdFx0XHRleHRyYSAtXG5cdFx0XHQwLjVcblx0XHQpICk7XG5cdH1cblxuXHRyZXR1cm4gZGVsdGE7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIGRpbWVuc2lvbiwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBjb21wdXRlZCBzdHlsZVxuXHR2YXIgc3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBkaW1lbnNpb24sIHN0eWxlcyApLFxuXHRcdGlzQm9yZGVyQm94ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3g7XG5cblx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTU0XG5cdC8vIFJldHVybiBhIGNvbmZvdW5kaW5nIG5vbi1waXhlbCB2YWx1ZSBvciBmZWlnbiBpZ25vcmFuY2UsIGFzIGFwcHJvcHJpYXRlLlxuXHRpZiAoIHJudW1ub25weC50ZXN0KCB2YWwgKSApIHtcblx0XHRpZiAoICFleHRyYSApIHtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXHRcdHZhbCA9IFwiYXV0b1wiO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcblx0Ly8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxuXHR2YWx1ZUlzQm9yZGVyQm94ID0gdmFsdWVJc0JvcmRlckJveCAmJlxuXHRcdCggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgZGltZW5zaW9uIF0gKTtcblxuXHQvLyBGYWxsIGJhY2sgdG8gb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IHdoZW4gdmFsdWUgaXMgXCJhdXRvXCJcblx0Ly8gVGhpcyBoYXBwZW5zIGZvciBpbmxpbmUgZWxlbWVudHMgd2l0aCBubyBleHBsaWNpdCBzZXR0aW5nIChnaC0zNTcxKVxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4xIC0gNC4zIG9ubHlcblx0Ly8gQWxzbyB1c2Ugb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IGZvciBtaXNyZXBvcnRlZCBpbmxpbmUgZGltZW5zaW9ucyAoZ2gtMzYwMilcblx0aWYgKCB2YWwgPT09IFwiYXV0b1wiIHx8XG5cdFx0IXBhcnNlRmxvYXQoIHZhbCApICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiaW5saW5lXCIgKSB7XG5cblx0XHR2YWwgPSBlbGVtWyBcIm9mZnNldFwiICsgZGltZW5zaW9uWyAwIF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSggMSApIF07XG5cblx0XHQvLyBvZmZzZXRXaWR0aC9vZmZzZXRIZWlnaHQgcHJvdmlkZSBib3JkZXItYm94IHZhbHVlc1xuXHRcdHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlO1xuXHR9XG5cblx0Ly8gTm9ybWFsaXplIFwiXCIgYW5kIGF1dG9cblx0dmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcblxuXHQvLyBBZGp1c3QgZm9yIHRoZSBlbGVtZW50J3MgYm94IG1vZGVsXG5cdHJldHVybiAoIHZhbCArXG5cdFx0Ym94TW9kZWxBZGp1c3RtZW50KFxuXHRcdFx0ZWxlbSxcblx0XHRcdGRpbWVuc2lvbixcblx0XHRcdGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcblx0XHRcdHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0XHRzdHlsZXMsXG5cblx0XHRcdC8vIFByb3ZpZGUgdGhlIGN1cnJlbnQgY29tcHV0ZWQgc2l6ZSB0byByZXF1ZXN0IHNjcm9sbCBndXR0ZXIgY2FsY3VsYXRpb24gKGdoLTM1ODkpXG5cdFx0XHR2YWxcblx0XHQpXG5cdCkgKyBcInB4XCI7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcblx0Ly8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG5cdGNzc0hvb2tzOiB7XG5cdFx0b3BhY2l0eToge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG5cdGNzc051bWJlcjoge1xuXHRcdFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSxcblx0XHRcImNvbHVtbkNvdW50XCI6IHRydWUsXG5cdFx0XCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwiZmxleEdyb3dcIjogdHJ1ZSxcblx0XHRcImZsZXhTaHJpbmtcIjogdHJ1ZSxcblx0XHRcImZvbnRXZWlnaHRcIjogdHJ1ZSxcblx0XHRcImxpbmVIZWlnaHRcIjogdHJ1ZSxcblx0XHRcIm9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcIm9yZGVyXCI6IHRydWUsXG5cdFx0XCJvcnBoYW5zXCI6IHRydWUsXG5cdFx0XCJ3aWRvd3NcIjogdHJ1ZSxcblx0XHRcInpJbmRleFwiOiB0cnVlLFxuXHRcdFwiem9vbVwiOiB0cnVlXG5cdH0sXG5cblx0Ly8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuXHQvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG5cdGNzc1Byb3BzOiB7fSxcblxuXHQvLyBHZXQgYW5kIHNldCB0aGUgc3R5bGUgcHJvcGVydHkgb24gYSBET00gTm9kZVxuXHRzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcblxuXHRcdC8vIERvbid0IHNldCBzdHlsZXMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdHZhciByZXQsIHR5cGUsIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBjYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdGlzQ3VzdG9tUHJvcCA9IHJjdXN0b21Qcm9wLnRlc3QoIG5hbWUgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZS4gV2UgZG9uJ3Rcblx0XHQvLyB3YW50IHRvIHF1ZXJ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcblx0XHQvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG5cdFx0aWYgKCAhaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0bmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvbiwgdGhlbiB1bnByZWZpeGVkIHZlcnNpb25cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRcdC8vIENvbnZlcnQgXCIrPVwiIG9yIFwiLT1cIiB0byByZWxhdGl2ZSBudW1iZXJzICgjNzM0NSlcblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoIHJldCA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmIHJldFsgMSBdICkge1xuXHRcdFx0XHR2YWx1ZSA9IGFkanVzdENTUyggZWxlbSwgbmFtZSwgcmV0ICk7XG5cblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQgKCM3MTE2KVxuXHRcdFx0aWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgdGhlIHVuaXQgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcblx0XHRcdGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG5cdFx0XHRcdCggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRpZiAoIGlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdFx0XHRzdHlsZS5zZXRQcm9wZXJ0eSggbmFtZSwgdmFsdWUgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBub24tY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuXHRcdHZhciB2YWwsIG51bSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0aXNDdXN0b21Qcm9wID0gcmN1c3RvbVByb3AudGVzdCggbmFtZSApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lLiBXZSBkb24ndFxuXHRcdC8vIHdhbnQgdG8gbW9kaWZ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcblx0XHQvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG5cdFx0aWYgKCAhaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0bmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJ5IHByZWZpeGVkIG5hbWUgZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgbmFtZVxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWwgPSBob29rcy5nZXQoIGVsZW0sIHRydWUsIGV4dHJhICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcblx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcblx0XHRpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcblx0XHRcdHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIE1ha2UgbnVtZXJpYyBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuXHRcdGlmICggZXh0cmEgPT09IFwiXCIgfHwgZXh0cmEgKSB7XG5cdFx0XHRudW0gPSBwYXJzZUZsb2F0KCB2YWwgKTtcblx0XHRcdHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBpc0Zpbml0ZSggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgZGltZW5zaW9uICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIGRpbWVuc2lvbiBdID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0Ly8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG5cdFx0XHRcdHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCtcblx0XHRcdFx0XHQvLyBUYWJsZSBjb2x1bW5zIGluIFNhZmFyaSBoYXZlIG5vbi16ZXJvIG9mZnNldFdpZHRoICYgemVyb1xuXHRcdFx0XHRcdC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHVubGVzcyBkaXNwbGF5IGlzIGNoYW5nZWQuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0XHRcdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHRcdFx0XHRcdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0XHRcdFx0XHQoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoIHx8ICFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICkgP1xuXHRcdFx0XHRcdFx0c3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICk7XG5cdFx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdFx0Z2V0V2lkdGhPckhlaWdodCggZWxlbSwgZGltZW5zaW9uLCBleHRyYSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0XHRcdGlzQm9yZGVyQm94ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0c3VidHJhY3QgPSBleHRyYSAmJiBib3hNb2RlbEFkanVzdG1lbnQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRkaW1lbnNpb24sXG5cdFx0XHRcdFx0ZXh0cmEsXG5cdFx0XHRcdFx0aXNCb3JkZXJCb3gsXG5cdFx0XHRcdFx0c3R5bGVzXG5cdFx0XHRcdCk7XG5cblx0XHRcdC8vIEFjY291bnQgZm9yIHVucmVsaWFibGUgYm9yZGVyLWJveCBkaW1lbnNpb25zIGJ5IGNvbXBhcmluZyBvZmZzZXQqIHRvIGNvbXB1dGVkIGFuZFxuXHRcdFx0Ly8gZmFraW5nIGEgY29udGVudC1ib3ggdG8gZ2V0IGJvcmRlciBhbmQgcGFkZGluZyAoZ2gtMzY5OSlcblx0XHRcdGlmICggaXNCb3JkZXJCb3ggJiYgc3VwcG9ydC5zY3JvbGxib3hTaXplKCkgPT09IHN0eWxlcy5wb3NpdGlvbiApIHtcblx0XHRcdFx0c3VidHJhY3QgLT0gTWF0aC5jZWlsKFxuXHRcdFx0XHRcdGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXSAtXG5cdFx0XHRcdFx0cGFyc2VGbG9hdCggc3R5bGVzWyBkaW1lbnNpb24gXSApIC1cblx0XHRcdFx0XHRib3hNb2RlbEFkanVzdG1lbnQoIGVsZW0sIGRpbWVuc2lvbiwgXCJib3JkZXJcIiwgZmFsc2UsIHN0eWxlcyApIC1cblx0XHRcdFx0XHQwLjVcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCB0byBwaXhlbHMgaWYgdmFsdWUgYWRqdXN0bWVudCBpcyBuZWVkZWRcblx0XHRcdGlmICggc3VidHJhY3QgJiYgKCBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiZcblx0XHRcdFx0KCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgIT09IFwicHhcIiApIHtcblxuXHRcdFx0XHRlbGVtLnN0eWxlWyBkaW1lbnNpb24gXSA9IHZhbHVlO1xuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5jc3MoIGVsZW0sIGRpbWVuc2lvbiApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApO1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuXHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG5cdFx0XHRcdGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG5cdFx0XHRcdFx0c3dhcCggZWxlbSwgeyBtYXJnaW5MZWZ0OiAwIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblx0XHRcdFx0XHR9IClcblx0XHRcdFx0KSArIFwicHhcIjtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKCB7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggcHJlZml4ICE9PSBcIm1hcmdpblwiICkge1xuXHRcdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgc3R5bGVzLCBsZW4sXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBuYW1lICkgKSB7XG5cdFx0XHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuXHRcdFx0XHRsZW4gPSBuYW1lLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbWFwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG5cdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHR9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fVxufSApO1xuXG5cbmZ1bmN0aW9uIFR3ZWVuKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApIHtcblx0cmV0dXJuIG5ldyBUd2Vlbi5wcm90b3R5cGUuaW5pdCggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKTtcbn1cbmpRdWVyeS5Ud2VlbiA9IFR3ZWVuO1xuXG5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBUd2Vlbixcblx0aW5pdDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nLCB1bml0ICkge1xuXHRcdHRoaXMuZWxlbSA9IGVsZW07XG5cdFx0dGhpcy5wcm9wID0gcHJvcDtcblx0XHR0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBqUXVlcnkuZWFzaW5nLl9kZWZhdWx0O1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5zdGFydCA9IHRoaXMubm93ID0gdGhpcy5jdXIoKTtcblx0XHR0aGlzLmVuZCA9IGVuZDtcblx0XHR0aGlzLnVuaXQgPSB1bml0IHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApO1xuXHR9LFxuXHRjdXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cblx0XHRyZXR1cm4gaG9va3MgJiYgaG9va3MuZ2V0ID9cblx0XHRcdGhvb2tzLmdldCggdGhpcyApIDpcblx0XHRcdFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5nZXQoIHRoaXMgKTtcblx0fSxcblx0cnVuOiBmdW5jdGlvbiggcGVyY2VudCApIHtcblx0XHR2YXIgZWFzZWQsXG5cdFx0XHRob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cblx0XHRpZiAoIHRoaXMub3B0aW9ucy5kdXJhdGlvbiApIHtcblx0XHRcdHRoaXMucG9zID0gZWFzZWQgPSBqUXVlcnkuZWFzaW5nWyB0aGlzLmVhc2luZyBdKFxuXHRcdFx0XHRwZXJjZW50LCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKiBwZXJjZW50LCAwLCAxLCB0aGlzLm9wdGlvbnMuZHVyYXRpb25cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucG9zID0gZWFzZWQgPSBwZXJjZW50O1xuXHRcdH1cblx0XHR0aGlzLm5vdyA9ICggdGhpcy5lbmQgLSB0aGlzLnN0YXJ0ICkgKiBlYXNlZCArIHRoaXMuc3RhcnQ7XG5cblx0XHRpZiAoIHRoaXMub3B0aW9ucy5zdGVwICkge1xuXHRcdFx0dGhpcy5vcHRpb25zLnN0ZXAuY2FsbCggdGhpcy5lbGVtLCB0aGlzLm5vdywgdGhpcyApO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgaG9va3Muc2V0ICkge1xuXHRcdFx0aG9va3Muc2V0KCB0aGlzICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5zZXQoIHRoaXMgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cblR3ZWVuLnByb3RvdHlwZS5pbml0LnByb3RvdHlwZSA9IFR3ZWVuLnByb3RvdHlwZTtcblxuVHdlZW4ucHJvcEhvb2tzID0ge1xuXHRfZGVmYXVsdDoge1xuXHRcdGdldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXHRcdFx0dmFyIHJlc3VsdDtcblxuXHRcdFx0Ly8gVXNlIGEgcHJvcGVydHkgb24gdGhlIGVsZW1lbnQgZGlyZWN0bHkgd2hlbiBpdCBpcyBub3QgYSBET00gZWxlbWVudCxcblx0XHRcdC8vIG9yIHdoZW4gdGhlcmUgaXMgbm8gbWF0Y2hpbmcgc3R5bGUgcHJvcGVydHkgdGhhdCBleGlzdHMuXG5cdFx0XHRpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgIT09IDEgfHxcblx0XHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdICE9IG51bGwgJiYgdHdlZW4uZWxlbS5zdHlsZVsgdHdlZW4ucHJvcCBdID09IG51bGwgKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFBhc3NpbmcgYW4gZW1wdHkgc3RyaW5nIGFzIGEgM3JkIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxuXHRcdFx0Ly8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlscy5cblx0XHRcdC8vIFNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0O1xuXHRcdFx0Ly8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcy1pcy5cblx0XHRcdHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIFwiXCIgKTtcblxuXHRcdFx0Ly8gRW1wdHkgc3RyaW5ncywgbnVsbCwgdW5kZWZpbmVkIGFuZCBcImF1dG9cIiBhcmUgY29udmVydGVkIHRvIDAuXG5cdFx0XHRyZXR1cm4gIXJlc3VsdCB8fCByZXN1bHQgPT09IFwiYXV0b1wiID8gMCA6IHJlc3VsdDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXG5cdFx0XHQvLyBVc2Ugc3RlcCBob29rIGZvciBiYWNrIGNvbXBhdC5cblx0XHRcdC8vIFVzZSBjc3NIb29rIGlmIGl0cyB0aGVyZS5cblx0XHRcdC8vIFVzZSAuc3R5bGUgaWYgYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGUuXG5cdFx0XHRpZiAoIGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0gKSB7XG5cdFx0XHRcdGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0oIHR3ZWVuICk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdCggdHdlZW4uZWxlbS5zdHlsZVsgalF1ZXJ5LmNzc1Byb3BzWyB0d2Vlbi5wcm9wIF0gXSAhPSBudWxsIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LmNzc0hvb2tzWyB0d2Vlbi5wcm9wIF0gKSApIHtcblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCB0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCB0d2Vlbi5ub3cgKyB0d2Vlbi51bml0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuLy8gUGFuaWMgYmFzZWQgYXBwcm9hY2ggdG8gc2V0dGluZyB0aGluZ3Mgb24gZGlzY29ubmVjdGVkIG5vZGVzXG5Ud2Vlbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0gVHdlZW4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSB7XG5cdHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXHRcdGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAmJiB0d2Vlbi5lbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZWFzaW5nID0ge1xuXHRsaW5lYXI6IGZ1bmN0aW9uKCBwICkge1xuXHRcdHJldHVybiBwO1xuXHR9LFxuXHRzd2luZzogZnVuY3Rpb24oIHAgKSB7XG5cdFx0cmV0dXJuIDAuNSAtIE1hdGguY29zKCBwICogTWF0aC5QSSApIC8gMjtcblx0fSxcblx0X2RlZmF1bHQ6IFwic3dpbmdcIlxufTtcblxualF1ZXJ5LmZ4ID0gVHdlZW4ucHJvdG90eXBlLmluaXQ7XG5cbi8vIEJhY2sgY29tcGF0IDwxLjggZXh0ZW5zaW9uIHBvaW50XG5qUXVlcnkuZnguc3RlcCA9IHt9O1xuXG5cblxuXG52YXJcblx0ZnhOb3csIGluUHJvZ3Jlc3MsXG5cdHJmeHR5cGVzID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLFxuXHRycnVuID0gL3F1ZXVlSG9va3MkLztcblxuZnVuY3Rpb24gc2NoZWR1bGUoKSB7XG5cdGlmICggaW5Qcm9ncmVzcyApIHtcblx0XHRpZiAoIGRvY3VtZW50LmhpZGRlbiA9PT0gZmFsc2UgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSApIHtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHNjaGVkdWxlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBzY2hlZHVsZSwgalF1ZXJ5LmZ4LmludGVydmFsICk7XG5cdFx0fVxuXG5cdFx0alF1ZXJ5LmZ4LnRpY2soKTtcblx0fVxufVxuXG4vLyBBbmltYXRpb25zIGNyZWF0ZWQgc3luY2hyb25vdXNseSB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XG5mdW5jdGlvbiBjcmVhdGVGeE5vdygpIHtcblx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdGZ4Tm93ID0gdW5kZWZpbmVkO1xuXHR9ICk7XG5cdHJldHVybiAoIGZ4Tm93ID0gRGF0ZS5ub3coKSApO1xufVxuXG4vLyBHZW5lcmF0ZSBwYXJhbWV0ZXJzIHRvIGNyZWF0ZSBhIHN0YW5kYXJkIGFuaW1hdGlvblxuZnVuY3Rpb24gZ2VuRngoIHR5cGUsIGluY2x1ZGVXaWR0aCApIHtcblx0dmFyIHdoaWNoLFxuXHRcdGkgPSAwLFxuXHRcdGF0dHJzID0geyBoZWlnaHQ6IHR5cGUgfTtcblxuXHQvLyBJZiB3ZSBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDEgdG8gZG8gYWxsIGNzc0V4cGFuZCB2YWx1ZXMsXG5cdC8vIG90aGVyd2lzZSBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XG5cdGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aCA/IDEgOiAwO1xuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgLSBpbmNsdWRlV2lkdGggKSB7XG5cdFx0d2hpY2ggPSBjc3NFeHBhbmRbIGkgXTtcblx0XHRhdHRyc1sgXCJtYXJnaW5cIiArIHdoaWNoIF0gPSBhdHRyc1sgXCJwYWRkaW5nXCIgKyB3aGljaCBdID0gdHlwZTtcblx0fVxuXG5cdGlmICggaW5jbHVkZVdpZHRoICkge1xuXHRcdGF0dHJzLm9wYWNpdHkgPSBhdHRycy53aWR0aCA9IHR5cGU7XG5cdH1cblxuXHRyZXR1cm4gYXR0cnM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVR3ZWVuKCB2YWx1ZSwgcHJvcCwgYW5pbWF0aW9uICkge1xuXHR2YXIgdHdlZW4sXG5cdFx0Y29sbGVjdGlvbiA9ICggQW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gfHwgW10gKS5jb25jYXQoIEFuaW1hdGlvbi50d2VlbmVyc1sgXCIqXCIgXSApLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRpZiAoICggdHdlZW4gPSBjb2xsZWN0aW9uWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgcHJvcCwgdmFsdWUgKSApICkge1xuXG5cdFx0XHQvLyBXZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0UHJlZmlsdGVyKCBlbGVtLCBwcm9wcywgb3B0cyApIHtcblx0dmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIGhvb2tzLCBvbGRmaXJlLCBwcm9wVHdlZW4sIHJlc3RvcmVEaXNwbGF5LCBkaXNwbGF5LFxuXHRcdGlzQm94ID0gXCJ3aWR0aFwiIGluIHByb3BzIHx8IFwiaGVpZ2h0XCIgaW4gcHJvcHMsXG5cdFx0YW5pbSA9IHRoaXMsXG5cdFx0b3JpZyA9IHt9LFxuXHRcdHN0eWxlID0gZWxlbS5zdHlsZSxcblx0XHRoaWRkZW4gPSBlbGVtLm5vZGVUeXBlICYmIGlzSGlkZGVuV2l0aGluVHJlZSggZWxlbSApLFxuXHRcdGRhdGFTaG93ID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cblx0Ly8gUXVldWUtc2tpcHBpbmcgYW5pbWF0aW9ucyBoaWphY2sgdGhlIGZ4IGhvb2tzXG5cdGlmICggIW9wdHMucXVldWUgKSB7XG5cdFx0aG9va3MgPSBqUXVlcnkuX3F1ZXVlSG9va3MoIGVsZW0sIFwiZnhcIiApO1xuXHRcdGlmICggaG9va3MudW5xdWV1ZWQgPT0gbnVsbCApIHtcblx0XHRcdGhvb2tzLnVucXVldWVkID0gMDtcblx0XHRcdG9sZGZpcmUgPSBob29rcy5lbXB0eS5maXJlO1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoICFob29rcy51bnF1ZXVlZCApIHtcblx0XHRcdFx0XHRvbGRmaXJlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdGhvb2tzLnVucXVldWVkKys7XG5cblx0XHRhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuc3VyZSB0aGUgY29tcGxldGUgaGFuZGxlciBpcyBjYWxsZWQgYmVmb3JlIHRoaXMgY29tcGxldGVzXG5cdFx0XHRhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGhvb2tzLnVucXVldWVkLS07XG5cdFx0XHRcdGlmICggIWpRdWVyeS5xdWV1ZSggZWxlbSwgXCJmeFwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIERldGVjdCBzaG93L2hpZGUgYW5pbWF0aW9uc1xuXHRmb3IgKCBwcm9wIGluIHByb3BzICkge1xuXHRcdHZhbHVlID0gcHJvcHNbIHByb3AgXTtcblx0XHRpZiAoIHJmeHR5cGVzLnRlc3QoIHZhbHVlICkgKSB7XG5cdFx0XHRkZWxldGUgcHJvcHNbIHByb3AgXTtcblx0XHRcdHRvZ2dsZSA9IHRvZ2dsZSB8fCB2YWx1ZSA9PT0gXCJ0b2dnbGVcIjtcblx0XHRcdGlmICggdmFsdWUgPT09ICggaGlkZGVuID8gXCJoaWRlXCIgOiBcInNob3dcIiApICkge1xuXG5cdFx0XHRcdC8vIFByZXRlbmQgdG8gYmUgaGlkZGVuIGlmIHRoaXMgaXMgYSBcInNob3dcIiBhbmRcblx0XHRcdFx0Ly8gdGhlcmUgaXMgc3RpbGwgZGF0YSBmcm9tIGEgc3RvcHBlZCBzaG93L2hpZGVcblx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGhpZGRlbiA9IHRydWU7XG5cblx0XHRcdFx0Ly8gSWdub3JlIGFsbCBvdGhlciBuby1vcCBzaG93L2hpZGUgZGF0YVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvcmlnWyBwcm9wIF0gPSBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdIHx8IGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIEJhaWwgb3V0IGlmIHRoaXMgaXMgYSBuby1vcCBsaWtlIC5oaWRlKCkuaGlkZSgpXG5cdHByb3BUd2VlbiA9ICFqUXVlcnkuaXNFbXB0eU9iamVjdCggcHJvcHMgKTtcblx0aWYgKCAhcHJvcFR3ZWVuICYmIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBvcmlnICkgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gUmVzdHJpY3QgXCJvdmVyZmxvd1wiIGFuZCBcImRpc3BsYXlcIiBzdHlsZXMgZHVyaW5nIGJveCBhbmltYXRpb25zXG5cdGlmICggaXNCb3ggJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTVcblx0XHQvLyBSZWNvcmQgYWxsIDMgb3ZlcmZsb3cgYXR0cmlidXRlcyBiZWNhdXNlIElFIGRvZXMgbm90IGluZmVyIHRoZSBzaG9ydGhhbmRcblx0XHQvLyBmcm9tIGlkZW50aWNhbGx5LXZhbHVlZCBvdmVyZmxvd1ggYW5kIG92ZXJmbG93WSBhbmQgRWRnZSBqdXN0IG1pcnJvcnNcblx0XHQvLyB0aGUgb3ZlcmZsb3dYIHZhbHVlIHRoZXJlLlxuXHRcdG9wdHMub3ZlcmZsb3cgPSBbIHN0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1gsIHN0eWxlLm92ZXJmbG93WSBdO1xuXG5cdFx0Ly8gSWRlbnRpZnkgYSBkaXNwbGF5IHR5cGUsIHByZWZlcnJpbmcgb2xkIHNob3cvaGlkZSBkYXRhIG92ZXIgdGhlIENTUyBjYXNjYWRlXG5cdFx0cmVzdG9yZURpc3BsYXkgPSBkYXRhU2hvdyAmJiBkYXRhU2hvdy5kaXNwbGF5O1xuXHRcdGlmICggcmVzdG9yZURpc3BsYXkgPT0gbnVsbCApIHtcblx0XHRcdHJlc3RvcmVEaXNwbGF5ID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXHRcdH1cblx0XHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblx0XHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuXHRcdFx0aWYgKCByZXN0b3JlRGlzcGxheSApIHtcblx0XHRcdFx0ZGlzcGxheSA9IHJlc3RvcmVEaXNwbGF5O1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBHZXQgbm9uZW1wdHkgdmFsdWUocykgYnkgdGVtcG9yYXJpbHkgZm9yY2luZyB2aXNpYmlsaXR5XG5cdFx0XHRcdHNob3dIaWRlKCBbIGVsZW0gXSwgdHJ1ZSApO1xuXHRcdFx0XHRyZXN0b3JlRGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheSB8fCByZXN0b3JlRGlzcGxheTtcblx0XHRcdFx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cdFx0XHRcdHNob3dIaWRlKCBbIGVsZW0gXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFuaW1hdGUgaW5saW5lIGVsZW1lbnRzIGFzIGlubGluZS1ibG9ja1xuXHRcdGlmICggZGlzcGxheSA9PT0gXCJpbmxpbmVcIiB8fCBkaXNwbGF5ID09PSBcImlubGluZS1ibG9ja1wiICYmIHJlc3RvcmVEaXNwbGF5ICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZmxvYXRcIiApID09PSBcIm5vbmVcIiApIHtcblxuXHRcdFx0XHQvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBkaXNwbGF5IHZhbHVlIGF0IHRoZSBlbmQgb2YgcHVyZSBzaG93L2hpZGUgYW5pbWF0aW9uc1xuXHRcdFx0XHRpZiAoICFwcm9wVHdlZW4gKSB7XG5cdFx0XHRcdFx0YW5pbS5kb25lKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHN0eWxlLmRpc3BsYXkgPSByZXN0b3JlRGlzcGxheTtcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0aWYgKCByZXN0b3JlRGlzcGxheSA9PSBudWxsICkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheSA9IHN0eWxlLmRpc3BsYXk7XG5cdFx0XHRcdFx0XHRyZXN0b3JlRGlzcGxheSA9IGRpc3BsYXkgPT09IFwibm9uZVwiID8gXCJcIiA6IGRpc3BsYXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICggb3B0cy5vdmVyZmxvdyApIHtcblx0XHRzdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXHRcdFx0c3R5bGUub3ZlcmZsb3cgPSBvcHRzLm92ZXJmbG93WyAwIF07XG5cdFx0XHRzdHlsZS5vdmVyZmxvd1ggPSBvcHRzLm92ZXJmbG93WyAxIF07XG5cdFx0XHRzdHlsZS5vdmVyZmxvd1kgPSBvcHRzLm92ZXJmbG93WyAyIF07XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gSW1wbGVtZW50IHNob3cvaGlkZSBhbmltYXRpb25zXG5cdHByb3BUd2VlbiA9IGZhbHNlO1xuXHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cblx0XHQvLyBHZW5lcmFsIHNob3cvaGlkZSBzZXR1cCBmb3IgdGhpcyBlbGVtZW50IGFuaW1hdGlvblxuXHRcdGlmICggIXByb3BUd2VlbiApIHtcblx0XHRcdGlmICggZGF0YVNob3cgKSB7XG5cdFx0XHRcdGlmICggXCJoaWRkZW5cIiBpbiBkYXRhU2hvdyApIHtcblx0XHRcdFx0XHRoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGFTaG93ID0gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBcImZ4c2hvd1wiLCB7IGRpc3BsYXk6IHJlc3RvcmVEaXNwbGF5IH0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RvcmUgaGlkZGVuL3Zpc2libGUgZm9yIHRvZ2dsZSBzbyBgLnN0b3AoKS50b2dnbGUoKWAgXCJyZXZlcnNlc1wiXG5cdFx0XHRpZiAoIHRvZ2dsZSApIHtcblx0XHRcdFx0ZGF0YVNob3cuaGlkZGVuID0gIWhpZGRlbjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2hvdyBlbGVtZW50cyBiZWZvcmUgYW5pbWF0aW5nIHRoZW1cblx0XHRcdGlmICggaGlkZGVuICkge1xuXHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0sIHRydWUgKTtcblx0XHRcdH1cblxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG5cblx0XHRcdGFuaW0uZG9uZSggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXG5cblx0XHRcdFx0Ly8gVGhlIGZpbmFsIHN0ZXAgb2YgYSBcImhpZGVcIiBhbmltYXRpb24gaXMgYWN0dWFsbHkgaGlkaW5nIHRoZSBlbGVtZW50XG5cdFx0XHRcdGlmICggIWhpZGRlbiApIHtcblx0XHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiZnhzaG93XCIgKTtcblx0XHRcdFx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgb3JpZ1sgcHJvcCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHQvLyBQZXItcHJvcGVydHkgc2V0dXBcblx0XHRwcm9wVHdlZW4gPSBjcmVhdGVUd2VlbiggaGlkZGVuID8gZGF0YVNob3dbIHByb3AgXSA6IDAsIHByb3AsIGFuaW0gKTtcblx0XHRpZiAoICEoIHByb3AgaW4gZGF0YVNob3cgKSApIHtcblx0XHRcdGRhdGFTaG93WyBwcm9wIF0gPSBwcm9wVHdlZW4uc3RhcnQ7XG5cdFx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdFx0cHJvcFR3ZWVuLmVuZCA9IHByb3BUd2Vlbi5zdGFydDtcblx0XHRcdFx0cHJvcFR3ZWVuLnN0YXJ0ID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJvcEZpbHRlciggcHJvcHMsIHNwZWNpYWxFYXNpbmcgKSB7XG5cdHZhciBpbmRleCwgbmFtZSwgZWFzaW5nLCB2YWx1ZSwgaG9va3M7XG5cblx0Ly8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXG5cdGZvciAoIGluZGV4IGluIHByb3BzICkge1xuXHRcdG5hbWUgPSBjYW1lbENhc2UoIGluZGV4ICk7XG5cdFx0ZWFzaW5nID0gc3BlY2lhbEVhc2luZ1sgbmFtZSBdO1xuXHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF07XG5cdFx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0ZWFzaW5nID0gdmFsdWVbIDEgXTtcblx0XHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgMCBdO1xuXHRcdH1cblxuXHRcdGlmICggaW5kZXggIT09IG5hbWUgKSB7XG5cdFx0XHRwcm9wc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRkZWxldGUgcHJvcHNbIGluZGV4IF07XG5cdFx0fVxuXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXTtcblx0XHRpZiAoIGhvb2tzICYmIFwiZXhwYW5kXCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWx1ZSA9IGhvb2tzLmV4cGFuZCggdmFsdWUgKTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgbmFtZSBdO1xuXG5cdFx0XHQvLyBOb3QgcXVpdGUgJC5leHRlbmQsIHRoaXMgd29uJ3Qgb3ZlcndyaXRlIGV4aXN0aW5nIGtleXMuXG5cdFx0XHQvLyBSZXVzaW5nICdpbmRleCcgYmVjYXVzZSB3ZSBoYXZlIHRoZSBjb3JyZWN0IFwibmFtZVwiXG5cdFx0XHRmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhKCBpbmRleCBpbiBwcm9wcyApICkge1xuXHRcdFx0XHRcdHByb3BzWyBpbmRleCBdID0gdmFsdWVbIGluZGV4IF07XG5cdFx0XHRcdFx0c3BlY2lhbEVhc2luZ1sgaW5kZXggXSA9IGVhc2luZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcGVjaWFsRWFzaW5nWyBuYW1lIF0gPSBlYXNpbmc7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbiggZWxlbSwgcHJvcGVydGllcywgb3B0aW9ucyApIHtcblx0dmFyIHJlc3VsdCxcblx0XHRzdG9wcGVkLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBBbmltYXRpb24ucHJlZmlsdGVycy5sZW5ndGgsXG5cdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBEb24ndCBtYXRjaCBlbGVtIGluIHRoZSA6YW5pbWF0ZWQgc2VsZWN0b3Jcblx0XHRcdGRlbGV0ZSB0aWNrLmVsZW07XG5cdFx0fSApLFxuXHRcdHRpY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdFx0cmVtYWluaW5nID0gTWF0aC5tYXgoIDAsIGFuaW1hdGlvbi5zdGFydFRpbWUgKyBhbmltYXRpb24uZHVyYXRpb24gLSBjdXJyZW50VGltZSApLFxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zIG9ubHlcblx0XHRcdFx0Ly8gQXJjaGFpYyBjcmFzaCBidWcgd29uJ3QgYWxsb3cgdXMgdG8gdXNlIGAxIC0gKCAwLjUgfHwgMCApYCAoIzEyNDk3KVxuXHRcdFx0XHR0ZW1wID0gcmVtYWluaW5nIC8gYW5pbWF0aW9uLmR1cmF0aW9uIHx8IDAsXG5cdFx0XHRcdHBlcmNlbnQgPSAxIC0gdGVtcCxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsZW5ndGggPSBhbmltYXRpb24udHdlZW5zLmxlbmd0aDtcblxuXHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIHBlcmNlbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIHBlcmNlbnQsIHJlbWFpbmluZyBdICk7XG5cblx0XHRcdC8vIElmIHRoZXJlJ3MgbW9yZSB0byBkbywgeWllbGRcblx0XHRcdGlmICggcGVyY2VudCA8IDEgJiYgbGVuZ3RoICkge1xuXHRcdFx0XHRyZXR1cm4gcmVtYWluaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB0aGlzIHdhcyBhbiBlbXB0eSBhbmltYXRpb24sIHN5bnRoZXNpemUgYSBmaW5hbCBwcm9ncmVzcyBub3RpZmljYXRpb25cblx0XHRcdGlmICggIWxlbmd0aCApIHtcblx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIDEsIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXNvbHZlIHRoZSBhbmltYXRpb24gYW5kIHJlcG9ydCBpdHMgY29uY2x1c2lvblxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uIF0gKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdGFuaW1hdGlvbiA9IGRlZmVycmVkLnByb21pc2UoIHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRwcm9wczogalF1ZXJ5LmV4dGVuZCgge30sIHByb3BlcnRpZXMgKSxcblx0XHRcdG9wdHM6IGpRdWVyeS5leHRlbmQoIHRydWUsIHtcblx0XHRcdFx0c3BlY2lhbEVhc2luZzoge30sXG5cdFx0XHRcdGVhc2luZzogalF1ZXJ5LmVhc2luZy5fZGVmYXVsdFxuXHRcdFx0fSwgb3B0aW9ucyApLFxuXHRcdFx0b3JpZ2luYWxQcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuXHRcdFx0b3JpZ2luYWxPcHRpb25zOiBvcHRpb25zLFxuXHRcdFx0c3RhcnRUaW1lOiBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0ZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG5cdFx0XHR0d2VlbnM6IFtdLFxuXHRcdFx0Y3JlYXRlVHdlZW46IGZ1bmN0aW9uKCBwcm9wLCBlbmQgKSB7XG5cdFx0XHRcdHZhciB0d2VlbiA9IGpRdWVyeS5Ud2VlbiggZWxlbSwgYW5pbWF0aW9uLm9wdHMsIHByb3AsIGVuZCxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmdbIHByb3AgXSB8fCBhbmltYXRpb24ub3B0cy5lYXNpbmcgKTtcblx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVucy5wdXNoKCB0d2VlbiApO1xuXHRcdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0XHR9LFxuXHRcdFx0c3RvcDogZnVuY3Rpb24oIGdvdG9FbmQgKSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IDAsXG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBhcmUgZ29pbmcgdG8gdGhlIGVuZCwgd2Ugd2FudCB0byBydW4gYWxsIHRoZSB0d2VlbnNcblx0XHRcdFx0XHQvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcblx0XHRcdFx0XHRsZW5ndGggPSBnb3RvRW5kID8gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGggOiAwO1xuXHRcdFx0XHRpZiAoIHN0b3BwZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RvcHBlZCA9IHRydWU7XG5cdFx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWU7IG90aGVyd2lzZSwgcmVqZWN0XG5cdFx0XHRcdGlmICggZ290b0VuZCApIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgMSwgMCBdICk7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSApLFxuXHRcdHByb3BzID0gYW5pbWF0aW9uLnByb3BzO1xuXG5cdHByb3BGaWx0ZXIoIHByb3BzLCBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nICk7XG5cblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRyZXN1bHQgPSBBbmltYXRpb24ucHJlZmlsdGVyc1sgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIGVsZW0sIHByb3BzLCBhbmltYXRpb24ub3B0cyApO1xuXHRcdGlmICggcmVzdWx0ICkge1xuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uKCByZXN1bHQuc3RvcCApICkge1xuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIGFuaW1hdGlvbi5lbGVtLCBhbmltYXRpb24ub3B0cy5xdWV1ZSApLnN0b3AgPVxuXHRcdFx0XHRcdHJlc3VsdC5zdG9wLmJpbmQoIHJlc3VsdCApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHRqUXVlcnkubWFwKCBwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbiApO1xuXG5cdGlmICggaXNGdW5jdGlvbiggYW5pbWF0aW9uLm9wdHMuc3RhcnQgKSApIHtcblx0XHRhbmltYXRpb24ub3B0cy5zdGFydC5jYWxsKCBlbGVtLCBhbmltYXRpb24gKTtcblx0fVxuXG5cdC8vIEF0dGFjaCBjYWxsYmFja3MgZnJvbSBvcHRpb25zXG5cdGFuaW1hdGlvblxuXHRcdC5wcm9ncmVzcyggYW5pbWF0aW9uLm9wdHMucHJvZ3Jlc3MgKVxuXHRcdC5kb25lKCBhbmltYXRpb24ub3B0cy5kb25lLCBhbmltYXRpb24ub3B0cy5jb21wbGV0ZSApXG5cdFx0LmZhaWwoIGFuaW1hdGlvbi5vcHRzLmZhaWwgKVxuXHRcdC5hbHdheXMoIGFuaW1hdGlvbi5vcHRzLmFsd2F5cyApO1xuXG5cdGpRdWVyeS5meC50aW1lcihcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aWNrLCB7XG5cdFx0XHRlbGVtOiBlbGVtLFxuXHRcdFx0YW5pbTogYW5pbWF0aW9uLFxuXHRcdFx0cXVldWU6IGFuaW1hdGlvbi5vcHRzLnF1ZXVlXG5cdFx0fSApXG5cdCk7XG5cblx0cmV0dXJuIGFuaW1hdGlvbjtcbn1cblxualF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuXG5cdHR3ZWVuZXJzOiB7XG5cdFx0XCIqXCI6IFsgZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuXHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2VlbiggcHJvcCwgdmFsdWUgKTtcblx0XHRcdGFkanVzdENTUyggdHdlZW4uZWxlbSwgcHJvcCwgcmNzc051bS5leGVjKCB2YWx1ZSApLCB0d2VlbiApO1xuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH0gXVxuXHR9LFxuXG5cdHR3ZWVuZXI6IGZ1bmN0aW9uKCBwcm9wcywgY2FsbGJhY2sgKSB7XG5cdFx0aWYgKCBpc0Z1bmN0aW9uKCBwcm9wcyApICkge1xuXHRcdFx0Y2FsbGJhY2sgPSBwcm9wcztcblx0XHRcdHByb3BzID0gWyBcIipcIiBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm9wcyA9IHByb3BzLm1hdGNoKCBybm90aHRtbHdoaXRlICk7XG5cdFx0fVxuXG5cdFx0dmFyIHByb3AsXG5cdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdFx0cHJvcCA9IHByb3BzWyBpbmRleCBdO1xuXHRcdFx0QW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gPSBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSB8fCBbXTtcblx0XHRcdEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdLnVuc2hpZnQoIGNhbGxiYWNrICk7XG5cdFx0fVxuXHR9LFxuXG5cdHByZWZpbHRlcnM6IFsgZGVmYXVsdFByZWZpbHRlciBdLFxuXG5cdHByZWZpbHRlcjogZnVuY3Rpb24oIGNhbGxiYWNrLCBwcmVwZW5kICkge1xuXHRcdGlmICggcHJlcGVuZCApIHtcblx0XHRcdEFuaW1hdGlvbi5wcmVmaWx0ZXJzLnVuc2hpZnQoIGNhbGxiYWNrICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdEFuaW1hdGlvbi5wcmVmaWx0ZXJzLnB1c2goIGNhbGxiYWNrICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cbmpRdWVyeS5zcGVlZCA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBmbiApIHtcblx0dmFyIG9wdCA9IHNwZWVkICYmIHR5cGVvZiBzcGVlZCA9PT0gXCJvYmplY3RcIiA/IGpRdWVyeS5leHRlbmQoIHt9LCBzcGVlZCApIDoge1xuXHRcdGNvbXBsZXRlOiBmbiB8fCAhZm4gJiYgZWFzaW5nIHx8XG5cdFx0XHRpc0Z1bmN0aW9uKCBzcGVlZCApICYmIHNwZWVkLFxuXHRcdGR1cmF0aW9uOiBzcGVlZCxcblx0XHRlYXNpbmc6IGZuICYmIGVhc2luZyB8fCBlYXNpbmcgJiYgIWlzRnVuY3Rpb24oIGVhc2luZyApICYmIGVhc2luZ1xuXHR9O1xuXG5cdC8vIEdvIHRvIHRoZSBlbmQgc3RhdGUgaWYgZnggYXJlIG9mZlxuXHRpZiAoIGpRdWVyeS5meC5vZmYgKSB7XG5cdFx0b3B0LmR1cmF0aW9uID0gMDtcblxuXHR9IGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIG9wdC5kdXJhdGlvbiAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRcdGlmICggb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgKSB7XG5cdFx0XHRcdG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHQuZHVyYXRpb24gPSBqUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIE5vcm1hbGl6ZSBvcHQucXVldWUgLSB0cnVlL3VuZGVmaW5lZC9udWxsIC0+IFwiZnhcIlxuXHRpZiAoIG9wdC5xdWV1ZSA9PSBudWxsIHx8IG9wdC5xdWV1ZSA9PT0gdHJ1ZSApIHtcblx0XHRvcHQucXVldWUgPSBcImZ4XCI7XG5cdH1cblxuXHQvLyBRdWV1ZWluZ1xuXHRvcHQub2xkID0gb3B0LmNvbXBsZXRlO1xuXG5cdG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggaXNGdW5jdGlvbiggb3B0Lm9sZCApICkge1xuXHRcdFx0b3B0Lm9sZC5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHQucXVldWUgKSB7XG5cdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgb3B0LnF1ZXVlICk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBvcHQ7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZhZGVUbzogZnVuY3Rpb24oIHNwZWVkLCB0bywgZWFzaW5nLCBjYWxsYmFjayApIHtcblxuXHRcdC8vIFNob3cgYW55IGhpZGRlbiBlbGVtZW50cyBhZnRlciBzZXR0aW5nIG9wYWNpdHkgdG8gMFxuXHRcdHJldHVybiB0aGlzLmZpbHRlciggaXNIaWRkZW5XaXRoaW5UcmVlICkuY3NzKCBcIm9wYWNpdHlcIiwgMCApLnNob3coKVxuXG5cdFx0XHQvLyBBbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcblx0XHRcdC5lbmQoKS5hbmltYXRlKCB7IG9wYWNpdHk6IHRvIH0sIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH0sXG5cdGFuaW1hdGU6IGZ1bmN0aW9uKCBwcm9wLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHR2YXIgZW1wdHkgPSBqUXVlcnkuaXNFbXB0eU9iamVjdCggcHJvcCApLFxuXHRcdFx0b3B0YWxsID0galF1ZXJ5LnNwZWVkKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApLFxuXHRcdFx0ZG9BbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBPcGVyYXRlIG9uIGEgY29weSBvZiBwcm9wIHNvIHBlci1wcm9wZXJ0eSBlYXNpbmcgd29uJ3QgYmUgbG9zdFxuXHRcdFx0XHR2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XG5cblx0XHRcdFx0Ly8gRW1wdHkgYW5pbWF0aW9ucywgb3IgZmluaXNoaW5nIHJlc29sdmVzIGltbWVkaWF0ZWx5XG5cdFx0XHRcdGlmICggZW1wdHkgfHwgZGF0YVByaXYuZ2V0KCB0aGlzLCBcImZpbmlzaFwiICkgKSB7XG5cdFx0XHRcdFx0YW5pbS5zdG9wKCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRkb0FuaW1hdGlvbi5maW5pc2ggPSBkb0FuaW1hdGlvbjtcblxuXHRcdHJldHVybiBlbXB0eSB8fCBvcHRhbGwucXVldWUgPT09IGZhbHNlID9cblx0XHRcdHRoaXMuZWFjaCggZG9BbmltYXRpb24gKSA6XG5cdFx0XHR0aGlzLnF1ZXVlKCBvcHRhbGwucXVldWUsIGRvQW5pbWF0aW9uICk7XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKCB0eXBlLCBjbGVhclF1ZXVlLCBnb3RvRW5kICkge1xuXHRcdHZhciBzdG9wUXVldWUgPSBmdW5jdGlvbiggaG9va3MgKSB7XG5cdFx0XHR2YXIgc3RvcCA9IGhvb2tzLnN0b3A7XG5cdFx0XHRkZWxldGUgaG9va3Muc3RvcDtcblx0XHRcdHN0b3AoIGdvdG9FbmQgKTtcblx0XHR9O1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGdvdG9FbmQgPSBjbGVhclF1ZXVlO1xuXHRcdFx0Y2xlYXJRdWV1ZSA9IHR5cGU7XG5cdFx0XHR0eXBlID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGNsZWFyUXVldWUgJiYgdHlwZSAhPT0gZmFsc2UgKSB7XG5cdFx0XHR0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkZXF1ZXVlID0gdHJ1ZSxcblx0XHRcdFx0aW5kZXggPSB0eXBlICE9IG51bGwgJiYgdHlwZSArIFwicXVldWVIb29rc1wiLFxuXHRcdFx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuXHRcdFx0XHRkYXRhID0gZGF0YVByaXYuZ2V0KCB0aGlzICk7XG5cblx0XHRcdGlmICggaW5kZXggKSB7XG5cdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgKSB7XG5cdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIGluZGV4IGluIGRhdGEgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCAmJiBycnVuLnRlc3QoIGluZGV4ICkgKSB7XG5cdFx0XHRcdFx0XHRzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJlxuXHRcdFx0XHRcdCggdHlwZSA9PSBudWxsIHx8IHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApICkge1xuXG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggZ290b0VuZCApO1xuXHRcdFx0XHRcdGRlcXVldWUgPSBmYWxzZTtcblx0XHRcdFx0XHR0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXJ0IHRoZSBuZXh0IGluIHRoZSBxdWV1ZSBpZiB0aGUgbGFzdCBzdGVwIHdhc24ndCBmb3JjZWQuXG5cdFx0XHQvLyBUaW1lcnMgY3VycmVudGx5IHdpbGwgY2FsbCB0aGVpciBjb21wbGV0ZSBjYWxsYmFja3MsIHdoaWNoXG5cdFx0XHQvLyB3aWxsIGRlcXVldWUgYnV0IG9ubHkgaWYgdGhleSB3ZXJlIGdvdG9FbmQuXG5cdFx0XHRpZiAoIGRlcXVldWUgfHwgIWdvdG9FbmQgKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXHRmaW5pc2g6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdGlmICggdHlwZSAhPT0gZmFsc2UgKSB7XG5cdFx0XHR0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4LFxuXHRcdFx0XHRkYXRhID0gZGF0YVByaXYuZ2V0KCB0aGlzICksXG5cdFx0XHRcdHF1ZXVlID0gZGF0YVsgdHlwZSArIFwicXVldWVcIiBdLFxuXHRcdFx0XHRob29rcyA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlSG9va3NcIiBdLFxuXHRcdFx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuXHRcdFx0XHRsZW5ndGggPSBxdWV1ZSA/IHF1ZXVlLmxlbmd0aCA6IDA7XG5cblx0XHRcdC8vIEVuYWJsZSBmaW5pc2hpbmcgZmxhZyBvbiBwcml2YXRlIGRhdGFcblx0XHRcdGRhdGEuZmluaXNoID0gdHJ1ZTtcblxuXHRcdFx0Ly8gRW1wdHkgdGhlIHF1ZXVlIGZpcnN0XG5cdFx0XHRqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIFtdICk7XG5cblx0XHRcdGlmICggaG9va3MgJiYgaG9va3Muc3RvcCApIHtcblx0XHRcdFx0aG9va3Muc3RvcC5jYWxsKCB0aGlzLCB0cnVlICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIExvb2sgZm9yIGFueSBhY3RpdmUgYW5pbWF0aW9ucywgYW5kIGZpbmlzaCB0aGVtXG5cdFx0XHRmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmIHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApIHtcblx0XHRcdFx0XHR0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCB0cnVlICk7XG5cdFx0XHRcdFx0dGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29rIGZvciBhbnkgYW5pbWF0aW9ucyBpbiB0aGUgb2xkIHF1ZXVlIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdFx0aWYgKCBxdWV1ZVsgaW5kZXggXSAmJiBxdWV1ZVsgaW5kZXggXS5maW5pc2ggKSB7XG5cdFx0XHRcdFx0cXVldWVbIGluZGV4IF0uZmluaXNoLmNhbGwoIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUdXJuIG9mZiBmaW5pc2hpbmcgZmxhZ1xuXHRcdFx0ZGVsZXRlIGRhdGEuZmluaXNoO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcInRvZ2dsZVwiLCBcInNob3dcIiwgXCJoaWRlXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdHZhciBjc3NGbiA9IGpRdWVyeS5mblsgbmFtZSBdO1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gc3BlZWQgPT0gbnVsbCB8fCB0eXBlb2Ygc3BlZWQgPT09IFwiYm9vbGVhblwiID9cblx0XHRcdGNzc0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSA6XG5cdFx0XHR0aGlzLmFuaW1hdGUoIGdlbkZ4KCBuYW1lLCB0cnVlICksIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH07XG59ICk7XG5cbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcbmpRdWVyeS5lYWNoKCB7XG5cdHNsaWRlRG93bjogZ2VuRngoIFwic2hvd1wiICksXG5cdHNsaWRlVXA6IGdlbkZ4KCBcImhpZGVcIiApLFxuXHRzbGlkZVRvZ2dsZTogZ2VuRngoIFwidG9nZ2xlXCIgKSxcblx0ZmFkZUluOiB7IG9wYWNpdHk6IFwic2hvd1wiIH0sXG5cdGZhZGVPdXQ6IHsgb3BhY2l0eTogXCJoaWRlXCIgfSxcblx0ZmFkZVRvZ2dsZTogeyBvcGFjaXR5OiBcInRvZ2dsZVwiIH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBwcm9wcyApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW5pbWF0ZSggcHJvcHMsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH07XG59ICk7XG5cbmpRdWVyeS50aW1lcnMgPSBbXTtcbmpRdWVyeS5meC50aWNrID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aW1lcixcblx0XHRpID0gMCxcblx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzO1xuXG5cdGZ4Tm93ID0gRGF0ZS5ub3coKTtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblxuXHRcdC8vIFJ1biB0aGUgdGltZXIgYW5kIHNhZmVseSByZW1vdmUgaXQgd2hlbiBkb25lIChhbGxvd2luZyBmb3IgZXh0ZXJuYWwgcmVtb3ZhbClcblx0XHRpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcblx0XHRcdHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIXRpbWVycy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0b3AoKTtcblx0fVxuXHRmeE5vdyA9IHVuZGVmaW5lZDtcbn07XG5cbmpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcblx0alF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuXHRqUXVlcnkuZnguc3RhcnQoKTtcbn07XG5cbmpRdWVyeS5meC5pbnRlcnZhbCA9IDEzO1xualF1ZXJ5LmZ4LnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdGlmICggaW5Qcm9ncmVzcyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpblByb2dyZXNzID0gdHJ1ZTtcblx0c2NoZWR1bGUoKTtcbn07XG5cbmpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdGluUHJvZ3Jlc3MgPSBudWxsO1xufTtcblxualF1ZXJ5LmZ4LnNwZWVkcyA9IHtcblx0c2xvdzogNjAwLFxuXHRmYXN0OiAyMDAsXG5cblx0Ly8gRGVmYXVsdCBzcGVlZFxuXHRfZGVmYXVsdDogNDAwXG59O1xuXG5cbi8vIEJhc2VkIG9mZiBvZiB0aGUgcGx1Z2luIGJ5IENsaW50IEhlbGZlcnMsIHdpdGggcGVybWlzc2lvbi5cbi8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDEwMDMyNDAxNDc0Ny9odHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuXHRcdGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHR9O1xuXHR9ICk7XG59O1xuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApLFxuXHRcdHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic2VsZWN0XCIgKSxcblx0XHRvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib3B0aW9uXCIgKSApO1xuXG5cdGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMyBvbmx5XG5cdC8vIERlZmF1bHQgdmFsdWUgZm9yIGEgY2hlY2tib3ggc2hvdWxkIGJlIFwib25cIlxuXHRzdXBwb3J0LmNoZWNrT24gPSBpbnB1dC52YWx1ZSAhPT0gXCJcIjtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTXVzdCBhY2Nlc3Mgc2VsZWN0ZWRJbmRleCB0byBtYWtlIGRlZmF1bHQgb3B0aW9ucyBzZWxlY3Rcblx0c3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gQW4gaW5wdXQgbG9zZXMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cblx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0aW5wdXQudmFsdWUgPSBcInRcIjtcblx0aW5wdXQudHlwZSA9IFwicmFkaW9cIjtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSApKCk7XG5cblxudmFyIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEF0dHJpYnV0ZSBob29rcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgbG93ZXJjYXNlIHZlcnNpb25cblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0cmV0dXJuIHJldCA9PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdG5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLFxuXHRcdFx0aSA9IDAsXG5cblx0XHRcdC8vIEF0dHJpYnV0ZSBuYW1lcyBjYW4gY29udGFpbiBub24tSFRNTCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnNcblx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSG9va3MgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuYm9vbEhvb2sgPSB7XG5cdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcblxualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZSxcblx0XHRcdGxvd2VyY2FzZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAoICFpc1hNTCApIHtcblxuXHRcdFx0Ly8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuXHRcdFx0aGFuZGxlID0gYXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gcmV0O1xuXHRcdFx0cmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuXHRcdFx0XHRsb3dlcmNhc2VOYW1lIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IGhhbmRsZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn0gKTtcblxuXG5cblxudmFyIHJmb2N1c2FibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyY2xpY2thYmxlID0gL14oPzphfGFyZWEpJC9pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHByb3A6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkucHJvcCwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cblx0cmVtb3ZlUHJvcDogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRkZWxldGUgdGhpc1sgalF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lIF07XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0cHJvcDogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIEZpeCBuYW1lIGFuZCBhdHRhY2ggaG9va3Ncblx0XHRcdG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5wcm9wSG9va3NbIG5hbWUgXTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKCBlbGVtWyBuYW1lIF0gPSB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldHVybiBlbGVtWyBuYW1lIF07XG5cdH0sXG5cblx0cHJvcEhvb2tzOiB7XG5cdFx0dGFiSW5kZXg6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHRcdFx0XHQvLyBlbGVtLnRhYkluZGV4IGRvZXNuJ3QgYWx3YXlzIHJldHVybiB0aGVcblx0XHRcdFx0Ly8gY29ycmVjdCB2YWx1ZSB3aGVuIGl0IGhhc24ndCBiZWVuIGV4cGxpY2l0bHkgc2V0XG5cdFx0XHRcdC8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDE0MTExNjIzMzM0Ny9odHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuXHRcdFx0XHQvLyBVc2UgcHJvcGVyIGF0dHJpYnV0ZSByZXRyaWV2YWwoIzEyMDcyKVxuXHRcdFx0XHR2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcblxuXHRcdFx0XHRpZiAoIHRhYmluZGV4ICkge1xuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludCggdGFiaW5kZXgsIDEwICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHxcblx0XHRcdFx0XHRyY2xpY2thYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJlxuXHRcdFx0XHRcdGVsZW0uaHJlZlxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cHJvcEZpeDoge1xuXHRcdFwiZm9yXCI6IFwiaHRtbEZvclwiLFxuXHRcdFwiY2xhc3NcIjogXCJjbGFzc05hbWVcIlxuXHR9XG59ICk7XG5cbi8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuLy8gQWNjZXNzaW5nIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5XG4vLyBmb3JjZXMgdGhlIGJyb3dzZXIgdG8gcmVzcGVjdCBzZXR0aW5nIHNlbGVjdGVkXG4vLyBvbiB0aGUgb3B0aW9uXG4vLyBUaGUgZ2V0dGVyIGVuc3VyZXMgYSBkZWZhdWx0IG9wdGlvbiBpcyBzZWxlY3RlZFxuLy8gd2hlbiBpbiBhbiBvcHRncm91cFxuLy8gZXNsaW50IHJ1bGUgXCJuby11bnVzZWQtZXhwcmVzc2lvbnNcIiBpcyBkaXNhYmxlZCBmb3IgdGhpcyBjb2RlXG4vLyBzaW5jZSBpdCBjb25zaWRlcnMgc3VjaCBhY2Nlc3Npb25zIG5vb3BcbmlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XG5cdGpRdWVyeS5wcm9wSG9va3Muc2VsZWN0ZWQgPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0LyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogXCJvZmZcIiAqL1xuXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKCBwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFwib2ZmXCIgKi9cblxuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRwYXJlbnQuc2VsZWN0ZWRJbmRleDtcblxuXHRcdFx0XHRpZiAoIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmpRdWVyeS5lYWNoKCBbXG5cdFwidGFiSW5kZXhcIixcblx0XCJyZWFkT25seVwiLFxuXHRcIm1heExlbmd0aFwiLFxuXHRcImNlbGxTcGFjaW5nXCIsXG5cdFwiY2VsbFBhZGRpbmdcIixcblx0XCJyb3dTcGFuXCIsXG5cdFwiY29sU3BhblwiLFxuXHRcInVzZU1hcFwiLFxuXHRcImZyYW1lQm9yZGVyXCIsXG5cdFwiY29udGVudEVkaXRhYmxlXCJcbl0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkucHJvcEZpeFsgdGhpcy50b0xvd2VyQ2FzZSgpIF0gPSB0aGlzO1xufSApO1xuXG5cblxuXG5cdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlIGFjY29yZGluZyB0byBIVE1MIHNwZWNcblx0Ly8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS1hc2NpaS13aGl0ZXNwYWNlXG5cdGZ1bmN0aW9uIHN0cmlwQW5kQ29sbGFwc2UoIHZhbHVlICkge1xuXHRcdHZhciB0b2tlbnMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXHRcdHJldHVybiB0b2tlbnMuam9pbiggXCIgXCIgKTtcblx0fVxuXG5cbmZ1bmN0aW9uIGdldENsYXNzKCBlbGVtICkge1xuXHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiApIHx8IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZXNUb0FycmF5KCB2YWx1ZSApIHtcblx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblx0fVxuXHRyZXR1cm4gW107XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0Y2xhc3NlcyA9IGNsYXNzZXNUb0FycmF5KCB2YWx1ZSApO1xuXG5cdFx0aWYgKCBjbGFzc2VzLmxlbmd0aCApIHtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgKz0gY2xhenogKyBcIiBcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRjbGFzc2VzID0gY2xhc3Nlc1RvQXJyYXkoIHZhbHVlICk7XG5cblx0XHRpZiAoIGNsYXNzZXMubGVuZ3RoICkge1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cblx0XHRcdFx0Ly8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggY3VyVmFsdWUgKSArIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0Y3VyID0gY3VyLnJlcGxhY2UoIFwiIFwiICsgY2xhenogKyBcIiBcIiwgXCIgXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlLFxuXHRcdFx0aXNWYWxpZFZhbHVlID0gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KCB2YWx1ZSApO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIGlzVmFsaWRWYWx1ZSApIHtcblx0XHRcdHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyhcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCB0aGlzLCBpLCBnZXRDbGFzcyggdGhpcyApLCBzdGF0ZVZhbCApLFxuXHRcdFx0XHRcdHN0YXRlVmFsXG5cdFx0XHRcdCk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY2xhc3NOYW1lLCBpLCBzZWxmLCBjbGFzc05hbWVzO1xuXG5cdFx0XHRpZiAoIGlzVmFsaWRWYWx1ZSApIHtcblxuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0XHRjbGFzc05hbWVzID0gY2xhc3Nlc1RvQXJyYXkoIHZhbHVlICk7XG5cblx0XHRcdFx0d2hpbGUgKCAoIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0XHQvLyBDaGVjayBlYWNoIGNsYXNzTmFtZSBnaXZlbiwgc3BhY2Ugc2VwYXJhdGVkIGxpc3Rcblx0XHRcdFx0XHRpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xuXHRcdFx0XHRcdFx0c2VsZi5yZW1vdmVDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuYWRkQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUb2dnbGUgd2hvbGUgY2xhc3MgbmFtZVxuXHRcdFx0fSBlbHNlIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdFx0Y2xhc3NOYW1lID0gZ2V0Q2xhc3MoIHRoaXMgKTtcblx0XHRcdFx0aWYgKCBjbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHQvLyBTdG9yZSBjbGFzc05hbWUgaWYgc2V0XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgY2xhc3NOYW1lICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBgZmFsc2VgLFxuXHRcdFx0XHQvLyB0aGVuIHJlbW92ZSB0aGUgd2hvbGUgY2xhc3NuYW1lIChpZiB0aGVyZSB3YXMgb25lLCB0aGUgYWJvdmUgc2F2ZWQgaXQpLlxuXHRcdFx0XHQvLyBPdGhlcndpc2UgYnJpbmcgYmFjayB3aGF0ZXZlciB3YXMgcHJldmlvdXNseSBzYXZlZCAoaWYgYW55dGhpbmcpLFxuXHRcdFx0XHQvLyBmYWxsaW5nIGJhY2sgdG8gdGhlIGVtcHR5IHN0cmluZyBpZiBub3RoaW5nIHdhcyBzdG9yZWQuXG5cdFx0XHRcdGlmICggdGhpcy5zZXRBdHRyaWJ1dGUgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIixcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0XHRcdFx0XCJcIiA6XG5cdFx0XHRcdFx0XHRkYXRhUHJpdi5nZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgY2xhc3NOYW1lLCBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCI7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdCggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBnZXRDbGFzcyggZWxlbSApICkgKyBcIiBcIiApLmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBycmV0dXJuID0gL1xcci9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBob29rcywgcmV0LCB2YWx1ZUlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0XHRpZiAoIGhvb2tzICYmXG5cdFx0XHRcdFx0XCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSApICE9PSB1bmRlZmluZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldCA9IGVsZW0udmFsdWU7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRpZiAoIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldC5yZXBsYWNlKCBycmV0dXJuLCBcIlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0cmV0dXJuIHJldCA9PSBudWxsID8gXCJcIiA6IHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhbHVlSXNGdW5jdGlvbiA9IGlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdHZhciB2YWw7XG5cblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHZhbHVlSXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmVhdCBudWxsL3VuZGVmaW5lZCBhcyBcIlwiOyBjb252ZXJ0IG51bWJlcnMgdG8gc3RyaW5nXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHR2YWwgPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggQXJyYXkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHZhbCA9IGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIjtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fCBob29rcy5zZXQoIHRoaXMsIHZhbCwgXCJ2YWx1ZVwiICkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHR2YWxIb29rczoge1xuXHRcdG9wdGlvbjoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHR2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XG5cdFx0XHRcdHJldHVybiB2YWwgIT0gbnVsbCA/XG5cdFx0XHRcdFx0dmFsIDpcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSBvbmx5XG5cdFx0XHRcdFx0Ly8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuXHRcdFx0XHRcdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jc3RyaXAtYW5kLWNvbGxhcHNlLXdoaXRlc3BhY2Vcblx0XHRcdFx0XHRzdHJpcEFuZENvbGxhcHNlKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLCBpLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIixcblx0XHRcdFx0XHR2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXG5cdFx0XHRcdFx0bWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKCBpbmRleCA8IDAgKSB7XG5cdFx0XHRcdFx0aSA9IG1heDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGkgPSBvbmUgPyBpbmRleCA6IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0XHRcdFx0Ly8gSUU4LTkgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldCAoIzI1NTEpXG5cdFx0XHRcdFx0aWYgKCAoIG9wdGlvbi5zZWxlY3RlZCB8fCBpID09PSBpbmRleCApICYmXG5cblx0XHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0XHRcdFx0XHQhb3B0aW9uLmRpc2FibGVkICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0IW5vZGVOYW1lKCBvcHRpb24ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiICkgKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBzcGVjaWZpYyB2YWx1ZSBmb3IgdGhlIG9wdGlvblxuXHRcdFx0XHRcdFx0dmFsdWUgPSBqUXVlcnkoIG9wdGlvbiApLnZhbCgpO1xuXG5cdFx0XHRcdFx0XHQvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xuXHRcdFx0XHRcdFx0aWYgKCBvbmUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcblx0XHRcdFx0XHRcdHZhbHVlcy5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIG9wdGlvblNldCwgb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0dmFsdWVzID0galF1ZXJ5Lm1ha2VBcnJheSggdmFsdWUgKSxcblx0XHRcdFx0XHRpID0gb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0b3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cblxuXHRcdFx0XHRcdGlmICggb3B0aW9uLnNlbGVjdGVkID1cblx0XHRcdFx0XHRcdGpRdWVyeS5pbkFycmF5KCBqUXVlcnkudmFsSG9va3Mub3B0aW9uLmdldCggb3B0aW9uICksIHZhbHVlcyApID4gLTFcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG9wdGlvblNldCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9yY2UgYnJvd3NlcnMgdG8gYmVoYXZlIGNvbnNpc3RlbnRseSB3aGVuIG5vbi1tYXRjaGluZyB2YWx1ZSBpcyBzZXRcblx0XHRcdFx0aWYgKCAhb3B0aW9uU2V0ICkge1xuXHRcdFx0XHRcdGVsZW0uc2VsZWN0ZWRJbmRleCA9IC0xO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaCggWyBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiBdLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0gPSB7XG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoIGVsZW0gKS52YWwoKSwgdmFsdWUgKSA+IC0xICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRpZiAoICFzdXBwb3J0LmNoZWNrT24gKSB7XG5cdFx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0uZ2V0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBudWxsID8gXCJvblwiIDogZWxlbS52YWx1ZTtcblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFJldHVybiBqUXVlcnkgZm9yIGF0dHJpYnV0ZXMtb25seSBpbmNsdXNpb25cblxuXG5zdXBwb3J0LmZvY3VzaW4gPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG52YXIgcmZvY3VzTW9ycGggPSAvXig/OmZvY3VzaW5mb2N1c3xmb2N1c291dGJsdXIpJC8sXG5cdHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0fTtcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLCBsYXN0RWxlbWVudCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdCggXCIuXCIgKSA6IFtdO1xuXG5cdFx0Y3VyID0gbGFzdEVsZW1lbnQgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdGJ1YmJsZVR5cGUgPSBzcGVjaWFsLmRlbGVnYXRlVHlwZSB8fCB0eXBlO1xuXHRcdFx0aWYgKCAhcmZvY3VzTW9ycGgudGVzdCggYnViYmxlVHlwZSArIHR5cGUgKSApIHtcblx0XHRcdFx0Y3VyID0gY3VyLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKCA7IGN1cjsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0dG1wID0gY3VyO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcblx0XHRcdGlmICggdG1wID09PSAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBjdXIgPSBldmVudFBhdGhbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRsYXN0RWxlbWVudCA9IGN1cjtcblx0XHRcdGV2ZW50LnR5cGUgPSBpID4gMSA/XG5cdFx0XHRcdGJ1YmJsZVR5cGUgOlxuXHRcdFx0XHRzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XG5cblx0XHRcdC8vIGpRdWVyeSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSAoIGRhdGFQcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmXG5cdFx0XHRcdGRhdGFQcml2LmdldCggY3VyLCBcImhhbmRsZVwiICk7XG5cdFx0XHRpZiAoIGhhbmRsZSApIHtcblx0XHRcdFx0aGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTmF0aXZlIGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbIG9udHlwZSBdO1xuXHRcdFx0aWYgKCBoYW5kbGUgJiYgaGFuZGxlLmFwcGx5ICYmIGFjY2VwdERhdGEoIGN1ciApICkge1xuXHRcdFx0XHRldmVudC5yZXN1bHQgPSBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRldmVudC50eXBlID0gdHlwZTtcblxuXHRcdC8vIElmIG5vYm9keSBwcmV2ZW50ZWQgdGhlIGRlZmF1bHQgYWN0aW9uLCBkbyBpdCBub3dcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xuXG5cdFx0XHRpZiAoICggIXNwZWNpYWwuX2RlZmF1bHQgfHxcblx0XHRcdFx0c3BlY2lhbC5fZGVmYXVsdC5hcHBseSggZXZlbnRQYXRoLnBvcCgpLCBkYXRhICkgPT09IGZhbHNlICkgJiZcblx0XHRcdFx0YWNjZXB0RGF0YSggZWxlbSApICkge1xuXG5cdFx0XHRcdC8vIENhbGwgYSBuYXRpdmUgRE9NIG1ldGhvZCBvbiB0aGUgdGFyZ2V0IHdpdGggdGhlIHNhbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgaXNGdW5jdGlvbiggZWxlbVsgdHlwZSBdICkgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG5cdFx0XHRcdFx0dG1wID0gZWxlbVsgb250eXBlIF07XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXG5cdFx0XHRcdFx0aWYgKCBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0XHRcdFx0bGFzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgc3RvcFByb3BhZ2F0aW9uQ2FsbGJhY2sgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtWyB0eXBlIF0oKTtcblxuXHRcdFx0XHRcdGlmICggZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdFx0XHRcdGxhc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcblx0Ly8gVXNlZCBvbmx5IGZvciBgZm9jdXMoaW4gfCBvdXQpYCBldmVudHNcblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWVcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIGUsIG51bGwsIGVsZW0gKTtcblx0fVxuXG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSApO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cblxuLy8gU3VwcG9ydDogRmlyZWZveCA8PTQ0XG4vLyBGaXJlZm94IGRvZXNuJ3QgaGF2ZSBmb2N1cyhpbiB8IG91dCkgZXZlbnRzXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY4Nzc4N1xuLy9cbi8vIFN1cHBvcnQ6IENocm9tZSA8PTQ4IC0gNDksIFNhZmFyaSA8PTkuMCAtIDkuMVxuLy8gZm9jdXMoaW4gfCBvdXQpIGV2ZW50cyBmaXJlIGFmdGVyIGZvY3VzICYgYmx1ciBldmVudHMsXG4vLyB3aGljaCBpcyBzcGVjIHZpb2xhdGlvbiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLWZvY3VzZXZlbnQtZXZlbnQtb3JkZXJcbi8vIFJlbGF0ZWQgdGlja2V0IC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDQ5ODU3XG5pZiAoICFzdXBwb3J0LmZvY3VzaW4gKSB7XG5cdGpRdWVyeS5lYWNoKCB7IGZvY3VzOiBcImZvY3VzaW5cIiwgYmx1cjogXCJmb2N1c291dFwiIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cblx0XHQvLyBBdHRhY2ggYSBzaW5nbGUgY2FwdHVyaW5nIGhhbmRsZXIgb24gdGhlIGRvY3VtZW50IHdoaWxlIHNvbWVvbmUgd2FudHMgZm9jdXNpbi9mb2N1c291dFxuXHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSApO1xuXHRcdH07XG5cblx0XHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsICggYXR0YWNoZXMgfHwgMCApICsgMSApO1xuXHRcdFx0fSxcblx0XHRcdHRlYXJkb3duOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCApIC0gMTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsIGF0dGFjaGVzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9ICk7XG59XG52YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5cbnZhciBub25jZSA9IERhdGUubm93KCk7XG5cbnZhciBycXVlcnkgPSAoIC9cXD8vICk7XG5cblxuXG4vLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG5qUXVlcnkucGFyc2VYTUwgPSBmdW5jdGlvbiggZGF0YSApIHtcblx0dmFyIHhtbDtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5XG5cdC8vIElFIHRocm93cyBvbiBwYXJzZUZyb21TdHJpbmcgd2l0aCBpbnZhbGlkIGlucHV0LlxuXHR0cnkge1xuXHRcdHhtbCA9ICggbmV3IHdpbmRvdy5ET01QYXJzZXIoKSApLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHhtbCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICggIXhtbCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcblx0XHRqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuXHR9XG5cdHJldHVybiB4bWw7XG59O1xuXG5cbnZhclxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG5cdFx0alF1ZXJ5LmVhY2goIG9iaiwgZnVuY3Rpb24oIGksIHYgKSB7XG5cdFx0XHRpZiAoIHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QoIHByZWZpeCApICkge1xuXG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cblx0XHRcdFx0YnVpbGRQYXJhbXMoXG5cdFx0XHRcdFx0cHJlZml4ICsgXCJbXCIgKyAoIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT0gbnVsbCA/IGkgOiBcIlwiICkgKyBcIl1cIixcblx0XHRcdFx0XHR2LFxuXHRcdFx0XHRcdHRyYWRpdGlvbmFsLFxuXHRcdFx0XHRcdGFkZFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHR9IGVsc2UgaWYgKCAhdHJhZGl0aW9uYWwgJiYgdG9UeXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cblx0XHRhZGQoIHByZWZpeCwgb2JqICk7XG5cdH1cbn1cblxuLy8gU2VyaWFsaXplIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMgb3IgYSBzZXQgb2Zcbi8vIGtleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuXHR2YXIgcHJlZml4LFxuXHRcdHMgPSBbXSxcblx0XHRhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZU9yRnVuY3Rpb24gKSB7XG5cblx0XHRcdC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgdXNlIGl0cyByZXR1cm4gdmFsdWVcblx0XHRcdHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24oIHZhbHVlT3JGdW5jdGlvbiApID9cblx0XHRcdFx0dmFsdWVPckZ1bmN0aW9uKCkgOlxuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb247XG5cblx0XHRcdHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcblx0XHR9O1xuXG5cdC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXG5cdGlmICggQXJyYXkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuXHRcdGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcblx0XHRcdGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG5cdFx0fSApO1xuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuXHRcdC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuXHRcdGZvciAoIHByZWZpeCBpbiBhICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG5cdHJldHVybiBzLmpvaW4oIFwiJlwiICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG5cdH0sXG5cdHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG5cdFx0XHRyZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcblx0XHR9IClcblx0XHQuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0eXBlID0gdGhpcy50eXBlO1xuXG5cdFx0XHQvLyBVc2UgLmlzKCBcIjpkaXNhYmxlZFwiICkgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3Ncblx0XHRcdHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcblx0XHRcdFx0cnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuXHRcdFx0XHQoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG5cdFx0fSApXG5cdFx0Lm1hcCggZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9ICkuZ2V0KCk7XG5cdH1cbn0gKTtcblxuXG52YXJcblx0cjIwID0gLyUyMC9nLFxuXHRyaGFzaCA9IC8jLiokLyxcblx0cmFudGlDYWNoZSA9IC8oWz8mXSlfPVteJl0qLyxcblx0cmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKikkL21nLFxuXG5cdC8vICM3NjUzLCAjODEyNSwgIzgxNTI6IGxvY2FsIHByb3RvY29sIGRldGVjdGlvblxuXHRybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxuXHRybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcblx0cnByb3RvY29sID0gL15cXC9cXC8vLFxuXG5cdC8qIFByZWZpbHRlcnNcblx0ICogMSkgVGhleSBhcmUgdXNlZnVsIHRvIGludHJvZHVjZSBjdXN0b20gZGF0YVR5cGVzIChzZWUgYWpheC9qc29ucC5qcyBmb3IgYW4gZXhhbXBsZSlcblx0ICogMikgVGhlc2UgYXJlIGNhbGxlZDpcblx0ICogICAgLSBCRUZPUkUgYXNraW5nIGZvciBhIHRyYW5zcG9ydFxuXHQgKiAgICAtIEFGVEVSIHBhcmFtIHNlcmlhbGl6YXRpb24gKHMuZGF0YSBpcyBhIHN0cmluZyBpZiBzLnByb2Nlc3NEYXRhIGlzIHRydWUpXG5cdCAqIDMpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogNCkgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiA1KSBleGVjdXRpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBjb250aW51ZSBkb3duIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0cHJlZmlsdGVycyA9IHt9LFxuXG5cdC8qIFRyYW5zcG9ydHMgYmluZGluZ3Ncblx0ICogMSkga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiAyKSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDMpIHNlbGVjdGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGdvIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0dHJhbnNwb3J0cyA9IHt9LFxuXG5cdC8vIEF2b2lkIGNvbW1lbnQtcHJvbG9nIGNoYXIgc2VxdWVuY2UgKCMxMDA5OCk7IG11c3QgYXBwZWFzZSBsaW50IGFuZCBldmFkZSBjb21wcmVzc2lvblxuXHRhbGxUeXBlcyA9IFwiKi9cIi5jb25jYXQoIFwiKlwiICksXG5cblx0Ly8gQW5jaG9yIHRhZyBmb3IgcGFyc2luZyB0aGUgZG9jdW1lbnQgb3JpZ2luXG5cdG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cdG9yaWdpbkFuY2hvci5ocmVmID0gbG9jYXRpb24uaHJlZjtcblxuLy8gQmFzZSBcImNvbnN0cnVjdG9yXCIgZm9yIGpRdWVyeS5hamF4UHJlZmlsdGVyIGFuZCBqUXVlcnkuYWpheFRyYW5zcG9ydFxuZnVuY3Rpb24gYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUgKSB7XG5cblx0Ly8gZGF0YVR5cGVFeHByZXNzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byBcIipcIlxuXHRyZXR1cm4gZnVuY3Rpb24oIGRhdGFUeXBlRXhwcmVzc2lvbiwgZnVuYyApIHtcblxuXHRcdGlmICggdHlwZW9mIGRhdGFUeXBlRXhwcmVzc2lvbiAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGZ1bmMgPSBkYXRhVHlwZUV4cHJlc3Npb247XG5cdFx0XHRkYXRhVHlwZUV4cHJlc3Npb24gPSBcIipcIjtcblx0XHR9XG5cblx0XHR2YXIgZGF0YVR5cGUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRpZiAoIGlzRnVuY3Rpb24oIGZ1bmMgKSApIHtcblxuXHRcdFx0Ly8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuXHRcdFx0d2hpbGUgKCAoIGRhdGFUeXBlID0gZGF0YVR5cGVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG5cdFx0XHRcdGlmICggZGF0YVR5cGVbIDAgXSA9PT0gXCIrXCIgKSB7XG5cdFx0XHRcdFx0ZGF0YVR5cGUgPSBkYXRhVHlwZS5zbGljZSggMSApIHx8IFwiKlwiO1xuXHRcdFx0XHRcdCggc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdICkudW5zaGlmdCggZnVuYyApO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBhcHBlbmRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQoIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSApLnB1c2goIGZ1bmMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG5cdHZhciBpbnNwZWN0ZWQgPSB7fSxcblx0XHRzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuXHRmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcblx0XHR2YXIgc2VsZWN0ZWQ7XG5cdFx0aW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcblx0XHRqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuXHRcdFx0dmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcblx0XHRcdGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0IXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuXG5cdFx0XHRcdG9wdGlvbnMuZGF0YVR5cGVzLnVuc2hpZnQoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0aW5zcGVjdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKCBzZWVraW5nVHJhbnNwb3J0ICkge1xuXHRcdFx0XHRyZXR1cm4gISggc2VsZWN0ZWQgPSBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdHJldHVybiBzZWxlY3RlZDtcblx0fVxuXG5cdHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG5cdHZhciBrZXksIGRlZXAsXG5cdFx0ZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG5cdGZvciAoIGtleSBpbiBzcmMgKSB7XG5cdFx0aWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHQoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoIGRlZXAgPSB7fSApICkgKVsga2V5IF0gPSBzcmNbIGtleSBdO1xuXHRcdH1cblx0fVxuXHRpZiAoIGRlZXAgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggdHJ1ZSwgdGFyZ2V0LCBkZWVwICk7XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKiBIYW5kbGVzIHJlc3BvbnNlcyB0byBhbiBhamF4IHJlcXVlc3Q6XG4gKiAtIGZpbmRzIHRoZSByaWdodCBkYXRhVHlwZSAobWVkaWF0ZXMgYmV0d2VlbiBjb250ZW50LXR5cGUgYW5kIGV4cGVjdGVkIGRhdGFUeXBlKVxuICogLSByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKSB7XG5cblx0dmFyIGN0LCB0eXBlLCBmaW5hbERhdGFUeXBlLCBmaXJzdERhdGFUeXBlLFxuXHRcdGNvbnRlbnRzID0gcy5jb250ZW50cyxcblx0XHRkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcztcblxuXHQvLyBSZW1vdmUgYXV0byBkYXRhVHlwZSBhbmQgZ2V0IGNvbnRlbnQtdHlwZSBpbiB0aGUgcHJvY2Vzc1xuXHR3aGlsZSAoIGRhdGFUeXBlc1sgMCBdID09PSBcIipcIiApIHtcblx0XHRkYXRhVHlwZXMuc2hpZnQoKTtcblx0XHRpZiAoIGN0ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRjdCA9IHMubWltZVR5cGUgfHwganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBrbm93biBjb250ZW50LXR5cGVcblx0aWYgKCBjdCApIHtcblx0XHRmb3IgKCB0eXBlIGluIGNvbnRlbnRzICkge1xuXHRcdFx0aWYgKCBjb250ZW50c1sgdHlwZSBdICYmIGNvbnRlbnRzWyB0eXBlIF0udGVzdCggY3QgKSApIHtcblx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHR5cGUgKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSByZXNwb25zZSBmb3IgdGhlIGV4cGVjdGVkIGRhdGFUeXBlXG5cdGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xuXHRcdGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbIDAgXTtcblx0fSBlbHNlIHtcblxuXHRcdC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcblx0XHRmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcblx0XHRcdGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWyAwIF0gXSApIHtcblx0XHRcdFx0ZmluYWxEYXRhVHlwZSA9IHR5cGU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhZmlyc3REYXRhVHlwZSApIHtcblx0XHRcdFx0Zmlyc3REYXRhVHlwZSA9IHR5cGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gT3IganVzdCB1c2UgZmlyc3Qgb25lXG5cdFx0ZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcblx0fVxuXG5cdC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcblx0Ly8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcblx0Ly8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuXHRpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG5cdFx0aWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcblx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZXNbIGZpbmFsRGF0YVR5cGUgXTtcblx0fVxufVxuXG4vKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xuXHR2YXIgY29udjIsIGN1cnJlbnQsIGNvbnYsIHRtcCwgcHJldixcblx0XHRjb252ZXJ0ZXJzID0ge30sXG5cblx0XHQvLyBXb3JrIHdpdGggYSBjb3B5IG9mIGRhdGFUeXBlcyBpbiBjYXNlIHdlIG5lZWQgdG8gbW9kaWZ5IGl0IGZvciBjb252ZXJzaW9uXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXMuc2xpY2UoKTtcblxuXHQvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcblx0aWYgKCBkYXRhVHlwZXNbIDEgXSApIHtcblx0XHRmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcblx0XHRcdGNvbnZlcnRlcnNbIGNvbnYudG9Mb3dlckNhc2UoKSBdID0gcy5jb252ZXJ0ZXJzWyBjb252IF07XG5cdFx0fVxuXHR9XG5cblx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlXG5cdHdoaWxlICggY3VycmVudCApIHtcblxuXHRcdGlmICggcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdICkge1xuXHRcdFx0anFYSFJbIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSBdID0gcmVzcG9uc2U7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgdGhlIGRhdGFGaWx0ZXIgaWYgcHJvdmlkZWRcblx0XHRpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XG5cdFx0XHRyZXNwb25zZSA9IHMuZGF0YUZpbHRlciggcmVzcG9uc2UsIHMuZGF0YVR5cGUgKTtcblx0XHR9XG5cblx0XHRwcmV2ID0gY3VycmVudDtcblx0XHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIGN1cnJlbnQgKSB7XG5cblx0XHRcdC8vIFRoZXJlJ3Mgb25seSB3b3JrIHRvIGRvIGlmIGN1cnJlbnQgZGF0YVR5cGUgaXMgbm9uLWF1dG9cblx0XHRcdGlmICggY3VycmVudCA9PT0gXCIqXCIgKSB7XG5cblx0XHRcdFx0Y3VycmVudCA9IHByZXY7XG5cblx0XHRcdC8vIENvbnZlcnQgcmVzcG9uc2UgaWYgcHJldiBkYXRhVHlwZSBpcyBub24tYXV0byBhbmQgZGlmZmVycyBmcm9tIGN1cnJlbnRcblx0XHRcdH0gZWxzZSBpZiAoIHByZXYgIT09IFwiKlwiICYmIHByZXYgIT09IGN1cnJlbnQgKSB7XG5cblx0XHRcdFx0Ly8gU2VlayBhIGRpcmVjdCBjb252ZXJ0ZXJcblx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIHByZXYgKyBcIiBcIiArIGN1cnJlbnQgXSB8fCBjb252ZXJ0ZXJzWyBcIiogXCIgKyBjdXJyZW50IF07XG5cblx0XHRcdFx0Ly8gSWYgbm9uZSBmb3VuZCwgc2VlayBhIHBhaXJcblx0XHRcdFx0aWYgKCAhY29udiApIHtcblx0XHRcdFx0XHRmb3IgKCBjb252MiBpbiBjb252ZXJ0ZXJzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJZiBjb252MiBvdXRwdXRzIGN1cnJlbnRcblx0XHRcdFx0XHRcdHRtcCA9IGNvbnYyLnNwbGl0KCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0aWYgKCB0bXBbIDEgXSA9PT0gY3VycmVudCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBJZiBwcmV2IGNhbiBiZSBjb252ZXJ0ZWQgdG8gYWNjZXB0ZWQgaW5wdXRcblx0XHRcdFx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIHByZXYgKyBcIiBcIiArIHRtcFsgMCBdIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRjb252ZXJ0ZXJzWyBcIiogXCIgKyB0bXBbIDAgXSBdO1xuXHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBDb25kZW5zZSBlcXVpdmFsZW5jZSBjb252ZXJ0ZXJzXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBjb252ID09PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIGNvbnYyIF07XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBPdGhlcndpc2UsIGluc2VydCB0aGUgaW50ZXJtZWRpYXRlIGRhdGFUeXBlXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY29udmVydGVyc1sgY29udjIgXSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQgPSB0bXBbIDAgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCB0bXBbIDEgXSApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFwcGx5IGNvbnZlcnRlciAoaWYgbm90IGFuIGVxdWl2YWxlbmNlKVxuXHRcdFx0XHRpZiAoIGNvbnYgIT09IHRydWUgKSB7XG5cblx0XHRcdFx0XHQvLyBVbmxlc3MgZXJyb3JzIGFyZSBhbGxvd2VkIHRvIGJ1YmJsZSwgY2F0Y2ggYW5kIHJldHVybiB0aGVtXG5cdFx0XHRcdFx0aWYgKCBjb252ICYmIHMudGhyb3dzICkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZTogXCJwYXJzZXJlcnJvclwiLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBjb252ID8gZSA6IFwiTm8gY29udmVyc2lvbiBmcm9tIFwiICsgcHJldiArIFwiIHRvIFwiICsgY3VycmVudFxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgZGF0YTogcmVzcG9uc2UgfTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIENvdW50ZXIgZm9yIGhvbGRpbmcgdGhlIG51bWJlciBvZiBhY3RpdmUgcXVlcmllc1xuXHRhY3RpdmU6IDAsXG5cblx0Ly8gTGFzdC1Nb2RpZmllZCBoZWFkZXIgY2FjaGUgZm9yIG5leHQgcmVxdWVzdFxuXHRsYXN0TW9kaWZpZWQ6IHt9LFxuXHRldGFnOiB7fSxcblxuXHRhamF4U2V0dGluZ3M6IHtcblx0XHR1cmw6IGxvY2F0aW9uLmhyZWYsXG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHRpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBsb2NhdGlvbi5wcm90b2NvbCApLFxuXHRcdGdsb2JhbDogdHJ1ZSxcblx0XHRwcm9jZXNzRGF0YTogdHJ1ZSxcblx0XHRhc3luYzogdHJ1ZSxcblx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcblxuXHRcdC8qXG5cdFx0dGltZW91dDogMCxcblx0XHRkYXRhOiBudWxsLFxuXHRcdGRhdGFUeXBlOiBudWxsLFxuXHRcdHVzZXJuYW1lOiBudWxsLFxuXHRcdHBhc3N3b3JkOiBudWxsLFxuXHRcdGNhY2hlOiBudWxsLFxuXHRcdHRocm93czogZmFsc2UsXG5cdFx0dHJhZGl0aW9uYWw6IGZhbHNlLFxuXHRcdGhlYWRlcnM6IHt9LFxuXHRcdCovXG5cblx0XHRhY2NlcHRzOiB7XG5cdFx0XHRcIipcIjogYWxsVHlwZXMsXG5cdFx0XHR0ZXh0OiBcInRleHQvcGxhaW5cIixcblx0XHRcdGh0bWw6IFwidGV4dC9odG1sXCIsXG5cdFx0XHR4bWw6IFwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLFxuXHRcdFx0anNvbjogXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIlxuXHRcdH0sXG5cblx0XHRjb250ZW50czoge1xuXHRcdFx0eG1sOiAvXFxieG1sXFxiLyxcblx0XHRcdGh0bWw6IC9cXGJodG1sLyxcblx0XHRcdGpzb246IC9cXGJqc29uXFxiL1xuXHRcdH0sXG5cblx0XHRyZXNwb25zZUZpZWxkczoge1xuXHRcdFx0eG1sOiBcInJlc3BvbnNlWE1MXCIsXG5cdFx0XHR0ZXh0OiBcInJlc3BvbnNlVGV4dFwiLFxuXHRcdFx0anNvbjogXCJyZXNwb25zZUpTT05cIlxuXHRcdH0sXG5cblx0XHQvLyBEYXRhIGNvbnZlcnRlcnNcblx0XHQvLyBLZXlzIHNlcGFyYXRlIHNvdXJjZSAob3IgY2F0Y2hhbGwgXCIqXCIpIGFuZCBkZXN0aW5hdGlvbiB0eXBlcyB3aXRoIGEgc2luZ2xlIHNwYWNlXG5cdFx0Y29udmVydGVyczoge1xuXG5cdFx0XHQvLyBDb252ZXJ0IGFueXRoaW5nIHRvIHRleHRcblx0XHRcdFwiKiB0ZXh0XCI6IFN0cmluZyxcblxuXHRcdFx0Ly8gVGV4dCB0byBodG1sICh0cnVlID0gbm8gdHJhbnNmb3JtYXRpb24pXG5cdFx0XHRcInRleHQgaHRtbFwiOiB0cnVlLFxuXG5cdFx0XHQvLyBFdmFsdWF0ZSB0ZXh0IGFzIGEganNvbiBleHByZXNzaW9uXG5cdFx0XHRcInRleHQganNvblwiOiBKU09OLnBhcnNlLFxuXG5cdFx0XHQvLyBQYXJzZSB0ZXh0IGFzIHhtbFxuXHRcdFx0XCJ0ZXh0IHhtbFwiOiBqUXVlcnkucGFyc2VYTUxcblx0XHR9LFxuXG5cdFx0Ly8gRm9yIG9wdGlvbnMgdGhhdCBzaG91bGRuJ3QgYmUgZGVlcCBleHRlbmRlZDpcblx0XHQvLyB5b3UgY2FuIGFkZCB5b3VyIG93biBjdXN0b20gb3B0aW9ucyBoZXJlIGlmXG5cdFx0Ly8gYW5kIHdoZW4geW91IGNyZWF0ZSBvbmUgdGhhdCBzaG91bGRuJ3QgYmVcblx0XHQvLyBkZWVwIGV4dGVuZGVkIChzZWUgYWpheEV4dGVuZClcblx0XHRmbGF0T3B0aW9uczoge1xuXHRcdFx0dXJsOiB0cnVlLFxuXHRcdFx0Y29udGV4dDogdHJ1ZVxuXHRcdH1cblx0fSxcblxuXHQvLyBDcmVhdGVzIGEgZnVsbCBmbGVkZ2VkIHNldHRpbmdzIG9iamVjdCBpbnRvIHRhcmdldFxuXHQvLyB3aXRoIGJvdGggYWpheFNldHRpbmdzIGFuZCBzZXR0aW5ncyBmaWVsZHMuXG5cdC8vIElmIHRhcmdldCBpcyBvbWl0dGVkLCB3cml0ZXMgaW50byBhamF4U2V0dGluZ3MuXG5cdGFqYXhTZXR1cDogZnVuY3Rpb24oIHRhcmdldCwgc2V0dGluZ3MgKSB7XG5cdFx0cmV0dXJuIHNldHRpbmdzID9cblxuXHRcdFx0Ly8gQnVpbGRpbmcgYSBzZXR0aW5ncyBvYmplY3Rcblx0XHRcdGFqYXhFeHRlbmQoIGFqYXhFeHRlbmQoIHRhcmdldCwgalF1ZXJ5LmFqYXhTZXR0aW5ncyApLCBzZXR0aW5ncyApIDpcblxuXHRcdFx0Ly8gRXh0ZW5kaW5nIGFqYXhTZXR0aW5nc1xuXHRcdFx0YWpheEV4dGVuZCggalF1ZXJ5LmFqYXhTZXR0aW5ncywgdGFyZ2V0ICk7XG5cdH0sXG5cblx0YWpheFByZWZpbHRlcjogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzICksXG5cdGFqYXhUcmFuc3BvcnQ6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cyApLFxuXG5cdC8vIE1haW4gbWV0aG9kXG5cdGFqYXg6IGZ1bmN0aW9uKCB1cmwsIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBJZiB1cmwgaXMgYW4gb2JqZWN0LCBzaW11bGF0ZSBwcmUtMS41IHNpZ25hdHVyZVxuXHRcdGlmICggdHlwZW9mIHVybCA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdG9wdGlvbnMgPSB1cmw7XG5cdFx0XHR1cmwgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gRm9yY2Ugb3B0aW9ucyB0byBiZSBhbiBvYmplY3Rcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdHZhciB0cmFuc3BvcnQsXG5cblx0XHRcdC8vIFVSTCB3aXRob3V0IGFudGktY2FjaGUgcGFyYW1cblx0XHRcdGNhY2hlVVJMLFxuXG5cdFx0XHQvLyBSZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcsXG5cdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cblx0XHRcdC8vIHRpbWVvdXQgaGFuZGxlXG5cdFx0XHR0aW1lb3V0VGltZXIsXG5cblx0XHRcdC8vIFVybCBjbGVhbnVwIHZhclxuXHRcdFx0dXJsQW5jaG9yLFxuXG5cdFx0XHQvLyBSZXF1ZXN0IHN0YXRlIChiZWNvbWVzIGZhbHNlIHVwb24gc2VuZCBhbmQgdHJ1ZSB1cG9uIGNvbXBsZXRpb24pXG5cdFx0XHRjb21wbGV0ZWQsXG5cblx0XHRcdC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxuXHRcdFx0ZmlyZUdsb2JhbHMsXG5cblx0XHRcdC8vIExvb3AgdmFyaWFibGVcblx0XHRcdGksXG5cblx0XHRcdC8vIHVuY2FjaGVkIHBhcnQgb2YgdGhlIHVybFxuXHRcdFx0dW5jYWNoZWQsXG5cblx0XHRcdC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3Rcblx0XHRcdHMgPSBqUXVlcnkuYWpheFNldHVwKCB7fSwgb3B0aW9ucyApLFxuXG5cdFx0XHQvLyBDYWxsYmFja3MgY29udGV4dFxuXHRcdFx0Y2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG5cblx0XHRcdC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cblx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJlxuXHRcdFx0XHQoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQuanF1ZXJ5ICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggY2FsbGJhY2tDb250ZXh0ICkgOlxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudCxcblxuXHRcdFx0Ly8gRGVmZXJyZWRzXG5cdFx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0c3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcblxuXHRcdFx0Ly8gSGVhZGVycyAodGhleSBhcmUgc2VudCBhbGwgYXQgb25jZSlcblx0XHRcdHJlcXVlc3RIZWFkZXJzID0ge30sXG5cdFx0XHRyZXF1ZXN0SGVhZGVyc05hbWVzID0ge30sXG5cblx0XHRcdC8vIERlZmF1bHQgYWJvcnQgbWVzc2FnZVxuXHRcdFx0c3RyQWJvcnQgPSBcImNhbmNlbGVkXCIsXG5cblx0XHRcdC8vIEZha2UgeGhyXG5cdFx0XHRqcVhIUiA9IHtcblx0XHRcdFx0cmVhZHlTdGF0ZTogMCxcblxuXHRcdFx0XHQvLyBCdWlsZHMgaGVhZGVycyBoYXNodGFibGUgaWYgbmVlZGVkXG5cdFx0XHRcdGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdFx0XHRcdHZhciBtYXRjaDtcblx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0XHRcdGlmICggIXJlc3BvbnNlSGVhZGVycyApIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzID0ge307XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKCBtYXRjaCA9IHJoZWFkZXJzLmV4ZWMoIHJlc3BvbnNlSGVhZGVyc1N0cmluZyApICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzWyBtYXRjaFsgMSBdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2ggPT0gbnVsbCA/IG51bGwgOiBtYXRjaDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSYXcgc3RyaW5nXG5cdFx0XHRcdGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbXBsZXRlZCA/IHJlc3BvbnNlSGVhZGVyc1N0cmluZyA6IG51bGw7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FjaGVzIHRoZSBoZWFkZXJcblx0XHRcdFx0c2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0XHRcdGlmICggY29tcGxldGVkID09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHRuYW1lID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gPVxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc05hbWVzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fCBuYW1lO1xuXHRcdFx0XHRcdFx0cmVxdWVzdEhlYWRlcnNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBPdmVycmlkZXMgcmVzcG9uc2UgY29udGVudC10eXBlIGhlYWRlclxuXHRcdFx0XHRvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCA9PSBudWxsICkge1xuXHRcdFx0XHRcdFx0cy5taW1lVHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRcdHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG5cdFx0XHRcdFx0dmFyIGNvZGU7XG5cdFx0XHRcdFx0aWYgKCBtYXAgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3Ncblx0XHRcdFx0XHRcdFx0anFYSFIuYWx3YXlzKCBtYXBbIGpxWEhSLnN0YXR1cyBdICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIExhenktYWRkIHRoZSBuZXcgY2FsbGJhY2tzIGluIGEgd2F5IHRoYXQgcHJlc2VydmVzIG9sZCBvbmVzXG5cdFx0XHRcdFx0XHRcdGZvciAoIGNvZGUgaW4gbWFwICkge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGVbIGNvZGUgXSA9IFsgc3RhdHVzQ29kZVsgY29kZSBdLCBtYXBbIGNvZGUgXSBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbmNlbCB0aGUgcmVxdWVzdFxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0dmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG5cdFx0XHRcdFx0aWYgKCB0cmFuc3BvcnQgKSB7XG5cdFx0XHRcdFx0XHR0cmFuc3BvcnQuYWJvcnQoIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb25lKCAwLCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdC8vIEF0dGFjaCBkZWZlcnJlZHNcblx0XHRkZWZlcnJlZC5wcm9taXNlKCBqcVhIUiApO1xuXG5cdFx0Ly8gQWRkIHByb3RvY29sIGlmIG5vdCBwcm92aWRlZCAocHJlZmlsdGVycyBtaWdodCBleHBlY3QgaXQpXG5cdFx0Ly8gSGFuZGxlIGZhbHN5IHVybCBpbiB0aGUgc2V0dGluZ3Mgb2JqZWN0ICgjMTAwOTM6IGNvbnNpc3RlbmN5IHdpdGggb2xkIHNpZ25hdHVyZSlcblx0XHQvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcblx0XHRzLnVybCA9ICggKCB1cmwgfHwgcy51cmwgfHwgbG9jYXRpb24uaHJlZiApICsgXCJcIiApXG5cdFx0XHQucmVwbGFjZSggcnByb3RvY29sLCBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiApO1xuXG5cdFx0Ly8gQWxpYXMgbWV0aG9kIG9wdGlvbiB0byB0eXBlIGFzIHBlciB0aWNrZXQgIzEyMDA0XG5cdFx0cy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcblxuXHRcdC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3Rcblx0XHRzLmRhdGFUeXBlcyA9ICggcy5kYXRhVHlwZSB8fCBcIipcIiApLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblxuXHRcdC8vIEEgY3Jvc3MtZG9tYWluIHJlcXVlc3QgaXMgaW4gb3JkZXIgd2hlbiB0aGUgb3JpZ2luIGRvZXNuJ3QgbWF0Y2ggdGhlIGN1cnJlbnQgb3JpZ2luLlxuXHRcdGlmICggcy5jcm9zc0RvbWFpbiA9PSBudWxsICkge1xuXHRcdFx0dXJsQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJhXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD04IC0gMTEsIEVkZ2UgMTIgLSAxNVxuXHRcdFx0Ly8gSUUgdGhyb3dzIGV4Y2VwdGlvbiBvbiBhY2Nlc3NpbmcgdGhlIGhyZWYgcHJvcGVydHkgaWYgdXJsIGlzIG1hbGZvcm1lZCxcblx0XHRcdC8vIGUuZy4gaHR0cDovL2V4YW1wbGUuY29tOjgweC9cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHVybEFuY2hvci5ocmVmID0gcy51cmw7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD04IC0gMTEgb25seVxuXHRcdFx0XHQvLyBBbmNob3IncyBob3N0IHByb3BlcnR5IGlzbid0IGNvcnJlY3RseSBzZXQgd2hlbiBzLnVybCBpcyByZWxhdGl2ZVxuXHRcdFx0XHR1cmxBbmNob3IuaHJlZiA9IHVybEFuY2hvci5ocmVmO1xuXHRcdFx0XHRzLmNyb3NzRG9tYWluID0gb3JpZ2luQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgb3JpZ2luQW5jaG9yLmhvc3QgIT09XG5cdFx0XHRcdFx0dXJsQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgdXJsQW5jaG9yLmhvc3Q7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbixcblx0XHRcdFx0Ly8gaXQgY2FuIGJlIHJlamVjdGVkIGJ5IHRoZSB0cmFuc3BvcnQgaWYgaXQgaXMgaW52YWxpZFxuXHRcdFx0XHRzLmNyb3NzRG9tYWluID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcblx0XHRpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHByZWZpbHRlcnNcblx0XHRpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG5cdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0fVxuXG5cdFx0Ly8gV2UgY2FuIGZpcmUgZ2xvYmFsIGV2ZW50cyBhcyBvZiBub3cgaWYgYXNrZWQgdG9cblx0XHQvLyBEb24ndCBmaXJlIGV2ZW50cyBpZiBqUXVlcnkuZXZlbnQgaXMgdW5kZWZpbmVkIGluIGFuIEFNRC11c2FnZSBzY2VuYXJpbyAoIzE1MTE4KVxuXHRcdGZpcmVHbG9iYWxzID0galF1ZXJ5LmV2ZW50ICYmIHMuZ2xvYmFsO1xuXG5cdFx0Ly8gV2F0Y2ggZm9yIGEgbmV3IHNldCBvZiByZXF1ZXN0c1xuXHRcdGlmICggZmlyZUdsb2JhbHMgJiYgalF1ZXJ5LmFjdGl2ZSsrID09PSAwICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0YXJ0XCIgKTtcblx0XHR9XG5cblx0XHQvLyBVcHBlcmNhc2UgdGhlIHR5cGVcblx0XHRzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuXHRcdC8vIERldGVybWluZSBpZiByZXF1ZXN0IGhhcyBjb250ZW50XG5cdFx0cy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdCggcy50eXBlICk7XG5cblx0XHQvLyBTYXZlIHRoZSBVUkwgaW4gY2FzZSB3ZSdyZSB0b3lpbmcgd2l0aCB0aGUgSWYtTW9kaWZpZWQtU2luY2Vcblx0XHQvLyBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIgbGF0ZXIgb25cblx0XHQvLyBSZW1vdmUgaGFzaCB0byBzaW1wbGlmeSB1cmwgbWFuaXB1bGF0aW9uXG5cdFx0Y2FjaGVVUkwgPSBzLnVybC5yZXBsYWNlKCByaGFzaCwgXCJcIiApO1xuXG5cdFx0Ly8gTW9yZSBvcHRpb25zIGhhbmRsaW5nIGZvciByZXF1ZXN0cyB3aXRoIG5vIGNvbnRlbnRcblx0XHRpZiAoICFzLmhhc0NvbnRlbnQgKSB7XG5cblx0XHRcdC8vIFJlbWVtYmVyIHRoZSBoYXNoIHNvIHdlIGNhbiBwdXQgaXQgYmFja1xuXHRcdFx0dW5jYWNoZWQgPSBzLnVybC5zbGljZSggY2FjaGVVUkwubGVuZ3RoICk7XG5cblx0XHRcdC8vIElmIGRhdGEgaXMgYXZhaWxhYmxlIGFuZCBzaG91bGQgYmUgcHJvY2Vzc2VkLCBhcHBlbmQgZGF0YSB0byB1cmxcblx0XHRcdGlmICggcy5kYXRhICYmICggcy5wcm9jZXNzRGF0YSB8fCB0eXBlb2Ygcy5kYXRhID09PSBcInN0cmluZ1wiICkgKSB7XG5cdFx0XHRcdGNhY2hlVVJMICs9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmRhdGE7XG5cblx0XHRcdFx0Ly8gIzk2ODI6IHJlbW92ZSBkYXRhIHNvIHRoYXQgaXQncyBub3QgdXNlZCBpbiBhbiBldmVudHVhbCByZXRyeVxuXHRcdFx0XHRkZWxldGUgcy5kYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgb3IgdXBkYXRlIGFudGktY2FjaGUgcGFyYW0gaWYgbmVlZGVkXG5cdFx0XHRpZiAoIHMuY2FjaGUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRjYWNoZVVSTCA9IGNhY2hlVVJMLnJlcGxhY2UoIHJhbnRpQ2FjaGUsIFwiJDFcIiApO1xuXHRcdFx0XHR1bmNhY2hlZCA9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyAoIG5vbmNlKysgKSArIHVuY2FjaGVkO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQdXQgaGFzaCBhbmQgYW50aS1jYWNoZSBvbiB0aGUgVVJMIHRoYXQgd2lsbCBiZSByZXF1ZXN0ZWQgKGdoLTE3MzIpXG5cdFx0XHRzLnVybCA9IGNhY2hlVVJMICsgdW5jYWNoZWQ7XG5cblx0XHQvLyBDaGFuZ2UgJyUyMCcgdG8gJysnIGlmIHRoaXMgaXMgZW5jb2RlZCBmb3JtIGJvZHkgY29udGVudCAoZ2gtMjY1OClcblx0XHR9IGVsc2UgaWYgKCBzLmRhdGEgJiYgcy5wcm9jZXNzRGF0YSAmJlxuXHRcdFx0KCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKS5pbmRleE9mKCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiICkgPT09IDAgKSB7XG5cdFx0XHRzLmRhdGEgPSBzLmRhdGEucmVwbGFjZSggcjIwLCBcIitcIiApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSA/XG5cdFx0XHRcdHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbIDAgXSBdICtcblx0XHRcdFx0XHQoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJlxuXHRcdFx0KCBzLmJlZm9yZVNlbmQuY2FsbCggY2FsbGJhY2tDb250ZXh0LCBqcVhIUiwgcyApID09PSBmYWxzZSB8fCBjb21wbGV0ZWQgKSApIHtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgbm90IGRvbmUgYWxyZWFkeSBhbmQgcmV0dXJuXG5cdFx0XHRyZXR1cm4ganFYSFIuYWJvcnQoKTtcblx0XHR9XG5cblx0XHQvLyBBYm9ydGluZyBpcyBubyBsb25nZXIgYSBjYW5jZWxsYXRpb25cblx0XHRzdHJBYm9ydCA9IFwiYWJvcnRcIjtcblxuXHRcdC8vIEluc3RhbGwgY2FsbGJhY2tzIG9uIGRlZmVycmVkc1xuXHRcdGNvbXBsZXRlRGVmZXJyZWQuYWRkKCBzLmNvbXBsZXRlICk7XG5cdFx0anFYSFIuZG9uZSggcy5zdWNjZXNzICk7XG5cdFx0anFYSFIuZmFpbCggcy5lcnJvciApO1xuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cblx0XHRcdC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYWpheFNlbmQsIHN0b3AgdGhlcmVcblx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRpbWVvdXRcblx0XHRcdGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuXHRcdFx0XHR0aW1lb3V0VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0anFYSFIuYWJvcnQoIFwidGltZW91dFwiICk7XG5cdFx0XHRcdH0sIHMudGltZW91dCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb21wbGV0ZWQgPSBmYWxzZTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBSZXRocm93IHBvc3QtY29tcGxldGlvbiBleGNlcHRpb25zXG5cdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm9wYWdhdGUgb3RoZXJzIGFzIHJlc3VsdHNcblx0XHRcdFx0ZG9uZSggLTEsIGUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcblx0XHRmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcblx0XHRcdHZhciBpc1N1Y2Nlc3MsIHN1Y2Nlc3MsIGVycm9yLCByZXNwb25zZSwgbW9kaWZpZWQsXG5cdFx0XHRcdHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xuXG5cdFx0XHQvLyBJZ25vcmUgcmVwZWF0IGludm9jYXRpb25zXG5cdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHQvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuXHRcdFx0aWYgKCB0aW1lb3V0VGltZXIgKSB7XG5cdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXRUaW1lciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuXHRcdFx0Ly8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcblx0XHRcdHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0Ly8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuXHRcdFx0cmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTZXQgcmVhZHlTdGF0ZVxuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuXHRcdFx0Ly8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcblx0XHRcdGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuXG5cdFx0XHQvLyBHZXQgcmVzcG9uc2UgZGF0YVxuXHRcdFx0aWYgKCByZXNwb25zZXMgKSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG5cdFx0XHRyZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xuXG5cdFx0XHQvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cblx0XHRcdFx0Ly8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cblx0XHRcdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJMYXN0LU1vZGlmaWVkXCIgKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcImV0YWdcIiApO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIG5vIGNvbnRlbnRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG5cdFx0XHRcdC8vIGlmIG5vdCBtb2RpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcblx0XHRcdFx0XHRzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0XHRlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBFeHRyYWN0IGVycm9yIGZyb20gc3RhdHVzVGV4dCBhbmQgbm9ybWFsaXplIGZvciBub24tYWJvcnRzXG5cdFx0XHRcdGVycm9yID0gc3RhdHVzVGV4dDtcblx0XHRcdFx0aWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcblx0XHRcdFx0XHRpZiAoIHN0YXR1cyA8IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGF0dXMgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuXHRcdFx0anFYSFIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0anFYSFIuc3RhdHVzVGV4dCA9ICggbmF0aXZlU3RhdHVzVGV4dCB8fCBzdGF0dXNUZXh0ICkgKyBcIlwiO1xuXG5cdFx0XHQvLyBTdWNjZXNzL0Vycm9yXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcblx0XHRcdHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuXHRcdFx0XHRcdFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXBsZXRlXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG5cdFx0XHRcdGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0b3BcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpxWEhSO1xuXHR9LFxuXG5cdGdldEpTT046IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIiApO1xuXHR9LFxuXG5cdGdldFNjcmlwdDogZnVuY3Rpb24oIHVybCwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgdW5kZWZpbmVkLCBjYWxsYmFjaywgXCJzY3JpcHRcIiApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG5cdGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcblxuXHRcdC8vIFNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXG5cdFx0aWYgKCBpc0Z1bmN0aW9uKCBkYXRhICkgKSB7XG5cdFx0XHR0eXBlID0gdHlwZSB8fCBjYWxsYmFjaztcblx0XHRcdGNhbGxiYWNrID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gVGhlIHVybCBjYW4gYmUgYW4gb3B0aW9ucyBvYmplY3QgKHdoaWNoIHRoZW4gbXVzdCBoYXZlIC51cmwpXG5cdFx0cmV0dXJuIGpRdWVyeS5hamF4KCBqUXVlcnkuZXh0ZW5kKCB7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdHR5cGU6IG1ldGhvZCxcblx0XHRcdGRhdGFUeXBlOiB0eXBlLFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdHN1Y2Nlc3M6IGNhbGxiYWNrXG5cdFx0fSwgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHVybCApICYmIHVybCApICk7XG5cdH07XG59ICk7XG5cblxualF1ZXJ5Ll9ldmFsVXJsID0gZnVuY3Rpb24oIHVybCApIHtcblx0cmV0dXJuIGpRdWVyeS5hamF4KCB7XG5cdFx0dXJsOiB1cmwsXG5cblx0XHQvLyBNYWtlIHRoaXMgZXhwbGljaXQsIHNpbmNlIHVzZXIgY2FuIG92ZXJyaWRlIHRoaXMgdGhyb3VnaCBhamF4U2V0dXAgKCMxMTI2NClcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuXHRcdGNhY2hlOiB0cnVlLFxuXHRcdGFzeW5jOiBmYWxzZSxcblx0XHRnbG9iYWw6IGZhbHNlLFxuXHRcdFwidGhyb3dzXCI6IHRydWVcblx0fSApO1xufTtcblxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHdyYXBBbGw6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciB3cmFwO1xuXG5cdFx0aWYgKCB0aGlzWyAwIF0gKSB7XG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdFx0aHRtbCA9IGh0bWwuY2FsbCggdGhpc1sgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRoZSBlbGVtZW50cyB0byB3cmFwIHRoZSB0YXJnZXQgYXJvdW5kXG5cdFx0XHR3cmFwID0galF1ZXJ5KCBodG1sLCB0aGlzWyAwIF0ub3duZXJEb2N1bWVudCApLmVxKCAwICkuY2xvbmUoIHRydWUgKTtcblxuXHRcdFx0aWYgKCB0aGlzWyAwIF0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0d3JhcC5pbnNlcnRCZWZvcmUoIHRoaXNbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHR3cmFwLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBlbGVtID0gdGhpcztcblxuXHRcdFx0XHR3aGlsZSAoIGVsZW0uZmlyc3RFbGVtZW50Q2hpbGQgKSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGVsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdH0gKS5hcHBlbmQoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR3cmFwSW5uZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdGlmICggaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBJbm5lciggaHRtbC5jYWxsKCB0aGlzLCBpICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0galF1ZXJ5KCB0aGlzICksXG5cdFx0XHRcdGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xuXG5cdFx0XHRpZiAoIGNvbnRlbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0Y29udGVudHMud3JhcEFsbCggaHRtbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCggaHRtbCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHR3cmFwOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgaHRtbElzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uKCBodG1sICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGh0bWxJc0Z1bmN0aW9uID8gaHRtbC5jYWxsKCB0aGlzLCBpICkgOiBodG1sICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdHVud3JhcDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHRoaXMucGFyZW50KCBzZWxlY3RvciApLm5vdCggXCJib2R5XCIgKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLnJlcGxhY2VXaXRoKCB0aGlzLmNoaWxkTm9kZXMgKTtcblx0XHR9ICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZXhwci5wc2V1ZG9zLmhpZGRlbiA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4gIWpRdWVyeS5leHByLnBzZXVkb3MudmlzaWJsZSggZWxlbSApO1xufTtcbmpRdWVyeS5leHByLnBzZXVkb3MudmlzaWJsZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4gISEoIGVsZW0ub2Zmc2V0V2lkdGggfHwgZWxlbS5vZmZzZXRIZWlnaHQgfHwgZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCApO1xufTtcblxuXG5cblxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXHR9IGNhdGNoICggZSApIHt9XG59O1xuXG52YXIgeGhyU3VjY2Vzc1N0YXR1cyA9IHtcblxuXHRcdC8vIEZpbGUgcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgY29kZSAwLCBhc3N1bWUgMjAwXG5cdFx0MDogMjAwLFxuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHQvLyAjMTQ1MDogc29tZXRpbWVzIElFIHJldHVybnMgMTIyMyB3aGVuIGl0IHNob3VsZCBiZSAyMDRcblx0XHQxMjIzOiAyMDRcblx0fSxcblx0eGhyU3VwcG9ydGVkID0galF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIoKTtcblxuc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xuc3VwcG9ydC5hamF4ID0geGhyU3VwcG9ydGVkID0gISF4aHJTdXBwb3J0ZWQ7XG5cbmpRdWVyeS5hamF4VHJhbnNwb3J0KCBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0dmFyIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrO1xuXG5cdC8vIENyb3NzIGRvbWFpbiBvbmx5IGFsbG93ZWQgaWYgc3VwcG9ydGVkIHRocm91Z2ggWE1MSHR0cFJlcXVlc3Rcblx0aWYgKCBzdXBwb3J0LmNvcnMgfHwgeGhyU3VwcG9ydGVkICYmICFvcHRpb25zLmNyb3NzRG9tYWluICkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZW5kOiBmdW5jdGlvbiggaGVhZGVycywgY29tcGxldGUgKSB7XG5cdFx0XHRcdHZhciBpLFxuXHRcdFx0XHRcdHhociA9IG9wdGlvbnMueGhyKCk7XG5cblx0XHRcdFx0eGhyLm9wZW4oXG5cdFx0XHRcdFx0b3B0aW9ucy50eXBlLFxuXHRcdFx0XHRcdG9wdGlvbnMudXJsLFxuXHRcdFx0XHRcdG9wdGlvbnMuYXN5bmMsXG5cdFx0XHRcdFx0b3B0aW9ucy51c2VybmFtZSxcblx0XHRcdFx0XHRvcHRpb25zLnBhc3N3b3JkXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gQXBwbHkgY3VzdG9tIGZpZWxkcyBpZiBwcm92aWRlZFxuXHRcdFx0XHRpZiAoIG9wdGlvbnMueGhyRmllbGRzICkge1xuXHRcdFx0XHRcdGZvciAoIGkgaW4gb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0XHR4aHJbIGkgXSA9IG9wdGlvbnMueGhyRmllbGRzWyBpIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT3ZlcnJpZGUgbWltZSB0eXBlIGlmIG5lZWRlZFxuXHRcdFx0XHRpZiAoIG9wdGlvbnMubWltZVR5cGUgJiYgeGhyLm92ZXJyaWRlTWltZVR5cGUgKSB7XG5cdFx0XHRcdFx0eGhyLm92ZXJyaWRlTWltZVR5cGUoIG9wdGlvbnMubWltZVR5cGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXG5cdFx0XHRcdC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcblx0XHRcdFx0Ly8gYWtpbiB0byBhIGppZ3NhdyBwdXp6bGUsIHdlIHNpbXBseSBuZXZlciBzZXQgaXQgdG8gYmUgc3VyZS5cblx0XHRcdFx0Ly8gKGl0IGNhbiBhbHdheXMgYmUgc2V0IG9uIGEgcGVyLXJlcXVlc3QgYmFzaXMgb3IgZXZlbiB1c2luZyBhamF4U2V0dXApXG5cdFx0XHRcdC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxuXHRcdFx0XHRpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluICYmICFoZWFkZXJzWyBcIlgtUmVxdWVzdGVkLVdpdGhcIiBdICkge1xuXHRcdFx0XHRcdGhlYWRlcnNbIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiIF0gPSBcIlhNTEh0dHBSZXF1ZXN0XCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTZXQgaGVhZGVyc1xuXHRcdFx0XHRmb3IgKCBpIGluIGhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoIGksIGhlYWRlcnNbIGkgXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayA9IGVycm9yQ2FsbGJhY2sgPSB4aHIub25sb2FkID1cblx0XHRcdFx0XHRcdFx0XHR4aHIub25lcnJvciA9IHhoci5vbmFib3J0ID0geGhyLm9udGltZW91dCA9XG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiYWJvcnRcIiApIHtcblx0XHRcdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gXCJlcnJvclwiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHRcdFx0XHRcdFx0XHQvLyBPbiBhIG1hbnVhbCBuYXRpdmUgYWJvcnQsIElFOSB0aHJvd3Ncblx0XHRcdFx0XHRcdFx0XHQvLyBlcnJvcnMgb24gYW55IHByb3BlcnR5IGFjY2VzcyB0aGF0IGlzIG5vdCByZWFkeVN0YXRlXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgeGhyLnN0YXR1cyAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKCAwLCBcImVycm9yXCIgKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRmlsZTogcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgMDsgc2VlICM4NjA1LCAjMTQyMDdcblx0XHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHRcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyU3VjY2Vzc1N0YXR1c1sgeGhyLnN0YXR1cyBdIHx8IHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzVGV4dCxcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElFOSBoYXMgbm8gWEhSMiBidXQgdGhyb3dzIG9uIGJpbmFyeSAodHJhYy0xMTQyNilcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEZvciBYSFIyIG5vbi10ZXh0LCBsZXQgdGhlIGNhbGxlciBoYW5kbGUgaXQgKGdoLTI0OTgpXG5cdFx0XHRcdFx0XHRcdFx0XHQoIHhoci5yZXNwb25zZVR5cGUgfHwgXCJ0ZXh0XCIgKSAhPT0gXCJ0ZXh0XCIgIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgeGhyLnJlc3BvbnNlVGV4dCAhPT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsgYmluYXJ5OiB4aHIucmVzcG9uc2UgfSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGV2ZW50c1xuXHRcdFx0XHR4aHIub25sb2FkID0gY2FsbGJhY2soKTtcblx0XHRcdFx0ZXJyb3JDYWxsYmFjayA9IHhoci5vbmVycm9yID0geGhyLm9udGltZW91dCA9IGNhbGxiYWNrKCBcImVycm9yXCIgKTtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA5IG9ubHlcblx0XHRcdFx0Ly8gVXNlIG9ucmVhZHlzdGF0ZWNoYW5nZSB0byByZXBsYWNlIG9uYWJvcnRcblx0XHRcdFx0Ly8gdG8gaGFuZGxlIHVuY2F1Z2h0IGFib3J0c1xuXHRcdFx0XHRpZiAoIHhoci5vbmFib3J0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0eGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0Ly8gQ2hlY2sgcmVhZHlTdGF0ZSBiZWZvcmUgdGltZW91dCBhcyBpdCBjaGFuZ2VzXG5cdFx0XHRcdFx0XHRpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFsbG93IG9uZXJyb3IgdG8gYmUgY2FsbGVkIGZpcnN0LFxuXHRcdFx0XHRcdFx0XHQvLyBidXQgdGhhdCB3aWxsIG5vdCBoYW5kbGUgYSBuYXRpdmUgYWJvcnRcblx0XHRcdFx0XHRcdFx0Ly8gQWxzbywgc2F2ZSBlcnJvckNhbGxiYWNrIHRvIGEgdmFyaWFibGVcblx0XHRcdFx0XHRcdFx0Ly8gYXMgeGhyLm9uZXJyb3IgY2Fubm90IGJlIGFjY2Vzc2VkXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JDYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgdGhlIGFib3J0IGNhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2soIFwiYWJvcnRcIiApO1xuXG5cdFx0XHRcdHRyeSB7XG5cblx0XHRcdFx0XHQvLyBEbyBzZW5kIHRoZSByZXF1ZXN0ICh0aGlzIG1heSByYWlzZSBhbiBleGNlcHRpb24pXG5cdFx0XHRcdFx0eGhyLnNlbmQoIG9wdGlvbnMuaGFzQ29udGVudCAmJiBvcHRpb25zLmRhdGEgfHwgbnVsbCApO1xuXHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdC8vICMxNDY4MzogT25seSByZXRocm93IGlmIHRoaXMgaGFzbid0IGJlZW4gbm90aWZpZWQgYXMgYW4gZXJyb3IgeWV0XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUHJldmVudCBhdXRvLWV4ZWN1dGlvbiBvZiBzY3JpcHRzIHdoZW4gbm8gZXhwbGljaXQgZGF0YVR5cGUgd2FzIHByb3ZpZGVkIChTZWUgZ2gtMjQzMilcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBmdW5jdGlvbiggcyApIHtcblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMuY29udGVudHMuc2NyaXB0ID0gZmFsc2U7XG5cdH1cbn0gKTtcblxuLy8gSW5zdGFsbCBzY3JpcHQgZGF0YVR5cGVcbmpRdWVyeS5hamF4U2V0dXAoIHtcblx0YWNjZXB0czoge1xuXHRcdHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIFwiICtcblx0XHRcdFwiYXBwbGljYXRpb24vZWNtYXNjcmlwdCwgYXBwbGljYXRpb24veC1lY21hc2NyaXB0XCJcblx0fSxcblx0Y29udGVudHM6IHtcblx0XHRzY3JpcHQ6IC9cXGIoPzpqYXZhfGVjbWEpc2NyaXB0XFxiL1xuXHR9LFxuXHRjb252ZXJ0ZXJzOiB7XG5cdFx0XCJ0ZXh0IHNjcmlwdFwiOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCB0ZXh0ICk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSGFuZGxlIGNhY2hlJ3Mgc3BlY2lhbCBjYXNlIGFuZCBjcm9zc0RvbWFpblxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuXHRpZiAoIHMuY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRzLmNhY2hlID0gZmFsc2U7XG5cdH1cblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMudHlwZSA9IFwiR0VUXCI7XG5cdH1cbn0gKTtcblxuLy8gQmluZCBzY3JpcHQgdGFnIGhhY2sgdHJhbnNwb3J0XG5qUXVlcnkuYWpheFRyYW5zcG9ydCggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG5cblx0Ly8gVGhpcyB0cmFuc3BvcnQgb25seSBkZWFscyB3aXRoIGNyb3NzIGRvbWFpbiByZXF1ZXN0c1xuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0dmFyIHNjcmlwdCwgY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBfLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0c2NyaXB0ID0galF1ZXJ5KCBcIjxzY3JpcHQ+XCIgKS5wcm9wKCB7XG5cdFx0XHRcdFx0Y2hhcnNldDogcy5zY3JpcHRDaGFyc2V0LFxuXHRcdFx0XHRcdHNyYzogcy51cmxcblx0XHRcdFx0fSApLm9uKFxuXHRcdFx0XHRcdFwibG9hZCBlcnJvclwiLFxuXHRcdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIGV2dCApIHtcblx0XHRcdFx0XHRcdHNjcmlwdC5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrID0gbnVsbDtcblx0XHRcdFx0XHRcdGlmICggZXZ0ICkge1xuXHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggZXZ0LnR5cGUgPT09IFwiZXJyb3JcIiA/IDQwNCA6IDIwMCwgZXZ0LnR5cGUgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gVXNlIG5hdGl2ZSBET00gbWFuaXB1bGF0aW9uIHRvIGF2b2lkIG91ciBkb21NYW5pcCBBSkFYIHRyaWNrZXJ5XG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdFsgMCBdICk7XG5cdFx0XHR9LFxuXHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBvbGRDYWxsYmFja3MgPSBbXSxcblx0cmpzb25wID0gLyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztcblxuLy8gRGVmYXVsdCBqc29ucCBzZXR0aW5nc1xualF1ZXJ5LmFqYXhTZXR1cCgge1xuXHRqc29ucDogXCJjYWxsYmFja1wiLFxuXHRqc29ucENhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKCBqUXVlcnkuZXhwYW5kbyArIFwiX1wiICsgKCBub25jZSsrICkgKTtcblx0XHR0aGlzWyBjYWxsYmFjayBdID0gdHJ1ZTtcblx0XHRyZXR1cm4gY2FsbGJhY2s7XG5cdH1cbn0gKTtcblxuLy8gRGV0ZWN0LCBub3JtYWxpemUgb3B0aW9ucyBhbmQgaW5zdGFsbCBjYWxsYmFja3MgZm9yIGpzb25wIHJlcXVlc3RzXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcblxuXHR2YXIgY2FsbGJhY2tOYW1lLCBvdmVyd3JpdHRlbiwgcmVzcG9uc2VDb250YWluZXIsXG5cdFx0anNvblByb3AgPSBzLmpzb25wICE9PSBmYWxzZSAmJiAoIHJqc29ucC50ZXN0KCBzLnVybCApID9cblx0XHRcdFwidXJsXCIgOlxuXHRcdFx0dHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQoIHMuY29udGVudFR5cGUgfHwgXCJcIiApXG5cdFx0XHRcdFx0LmluZGV4T2YoIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIgKSA9PT0gMCAmJlxuXHRcdFx0XHRyanNvbnAudGVzdCggcy5kYXRhICkgJiYgXCJkYXRhXCJcblx0XHQpO1xuXG5cdC8vIEhhbmRsZSBpZmYgdGhlIGV4cGVjdGVkIGRhdGEgdHlwZSBpcyBcImpzb25wXCIgb3Igd2UgaGF2ZSBhIHBhcmFtZXRlciB0byBzZXRcblx0aWYgKCBqc29uUHJvcCB8fCBzLmRhdGFUeXBlc1sgMCBdID09PSBcImpzb25wXCIgKSB7XG5cblx0XHQvLyBHZXQgY2FsbGJhY2sgbmFtZSwgcmVtZW1iZXJpbmcgcHJlZXhpc3RpbmcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGl0XG5cdFx0Y2FsbGJhY2tOYW1lID0gcy5qc29ucENhbGxiYWNrID0gaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xuXHRcdFx0cy5qc29ucENhbGxiYWNrKCkgOlxuXHRcdFx0cy5qc29ucENhbGxiYWNrO1xuXG5cdFx0Ly8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxuXHRcdGlmICgganNvblByb3AgKSB7XG5cdFx0XHRzWyBqc29uUHJvcCBdID0gc1sganNvblByb3AgXS5yZXBsYWNlKCByanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSApO1xuXHRcdH0gZWxzZSBpZiAoIHMuanNvbnAgIT09IGZhbHNlICkge1xuXHRcdFx0cy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcblx0XHR9XG5cblx0XHQvLyBVc2UgZGF0YSBjb252ZXJ0ZXIgdG8gcmV0cmlldmUganNvbiBhZnRlciBzY3JpcHQgZXhlY3V0aW9uXG5cdFx0cy5jb252ZXJ0ZXJzWyBcInNjcmlwdCBqc29uXCIgXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhcmVzcG9uc2VDb250YWluZXIgKSB7XG5cdFx0XHRcdGpRdWVyeS5lcnJvciggY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG5cdFx0fTtcblxuXHRcdC8vIEZvcmNlIGpzb24gZGF0YVR5cGVcblx0XHRzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cblx0XHQvLyBJbnN0YWxsIGNhbGxiYWNrXG5cdFx0b3ZlcndyaXR0ZW4gPSB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdO1xuXHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gYXJndW1lbnRzO1xuXHRcdH07XG5cblx0XHQvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcblx0XHRqcVhIUi5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyB2YWx1ZSBkaWRuJ3QgZXhpc3QgLSByZW1vdmUgaXRcblx0XHRcdGlmICggb3ZlcndyaXR0ZW4gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0alF1ZXJ5KCB3aW5kb3cgKS5yZW1vdmVQcm9wKCBjYWxsYmFja05hbWUgKTtcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHJlc3RvcmUgcHJlZXhpc3RpbmcgdmFsdWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBvdmVyd3JpdHRlbjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSBiYWNrIGFzIGZyZWVcblx0XHRcdGlmICggc1sgY2FsbGJhY2tOYW1lIF0gKSB7XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgcmUtdXNpbmcgdGhlIG9wdGlvbnMgZG9lc24ndCBzY3JldyB0aGluZ3MgYXJvdW5kXG5cdFx0XHRcdHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcblxuXHRcdFx0XHQvLyBTYXZlIHRoZSBjYWxsYmFjayBuYW1lIGZvciBmdXR1cmUgdXNlXG5cdFx0XHRcdG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FsbCBpZiBpdCB3YXMgYSBmdW5jdGlvbiBhbmQgd2UgaGF2ZSBhIHJlc3BvbnNlXG5cdFx0XHRpZiAoIHJlc3BvbnNlQ29udGFpbmVyICYmIGlzRnVuY3Rpb24oIG92ZXJ3cml0dGVuICkgKSB7XG5cdFx0XHRcdG92ZXJ3cml0dGVuKCByZXNwb25zZUNvbnRhaW5lclsgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gb3ZlcndyaXR0ZW4gPSB1bmRlZmluZWQ7XG5cdFx0fSApO1xuXG5cdFx0Ly8gRGVsZWdhdGUgdG8gc2NyaXB0XG5cdFx0cmV0dXJuIFwic2NyaXB0XCI7XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gU3VwcG9ydDogU2FmYXJpIDggb25seVxuLy8gSW4gU2FmYXJpIDggZG9jdW1lbnRzIGNyZWF0ZWQgdmlhIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudFxuLy8gY29sbGFwc2Ugc2libGluZyBmb3JtczogdGhlIHNlY29uZCBvbmUgYmVjb21lcyBhIGNoaWxkIG9mIHRoZSBmaXJzdCBvbmUuXG4vLyBCZWNhdXNlIG9mIHRoYXQsIHRoaXMgc2VjdXJpdHkgbWVhc3VyZSBoYXMgdG8gYmUgZGlzYWJsZWQgaW4gU2FmYXJpIDguXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3MzM3XG5zdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCA9ICggZnVuY3Rpb24oKSB7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICkuYm9keTtcblx0Ym9keS5pbm5lckhUTUwgPSBcIjxmb3JtPjwvZm9ybT48Zm9ybT48L2Zvcm0+XCI7XG5cdHJldHVybiBib2R5LmNoaWxkTm9kZXMubGVuZ3RoID09PSAyO1xufSApKCk7XG5cblxuLy8gQXJndW1lbnQgXCJkYXRhXCIgc2hvdWxkIGJlIHN0cmluZyBvZiBodG1sXG4vLyBjb250ZXh0IChvcHRpb25hbCk6IElmIHNwZWNpZmllZCwgdGhlIGZyYWdtZW50IHdpbGwgYmUgY3JlYXRlZCBpbiB0aGlzIGNvbnRleHQsXG4vLyBkZWZhdWx0cyB0byBkb2N1bWVudFxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xualF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcblx0aWYgKCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0a2VlcFNjcmlwdHMgPSBjb250ZXh0O1xuXHRcdGNvbnRleHQgPSBmYWxzZTtcblx0fVxuXG5cdHZhciBiYXNlLCBwYXJzZWQsIHNjcmlwdHM7XG5cblx0aWYgKCAhY29udGV4dCApIHtcblxuXHRcdC8vIFN0b3Agc2NyaXB0cyBvciBpbmxpbmUgZXZlbnQgaGFuZGxlcnMgZnJvbSBiZWluZyBleGVjdXRlZCBpbW1lZGlhdGVseVxuXHRcdC8vIGJ5IHVzaW5nIGRvY3VtZW50LmltcGxlbWVudGF0aW9uXG5cdFx0aWYgKCBzdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCApIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoIFwiXCIgKTtcblxuXHRcdFx0Ly8gU2V0IHRoZSBiYXNlIGhyZWYgZm9yIHRoZSBjcmVhdGVkIGRvY3VtZW50XG5cdFx0XHQvLyBzbyBhbnkgcGFyc2VkIGVsZW1lbnRzIHdpdGggVVJMc1xuXHRcdFx0Ly8gYXJlIGJhc2VkIG9uIHRoZSBkb2N1bWVudCdzIFVSTCAoZ2gtMjk2NSlcblx0XHRcdGJhc2UgPSBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiYmFzZVwiICk7XG5cdFx0XHRiYXNlLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuXHRcdFx0Y29udGV4dC5oZWFkLmFwcGVuZENoaWxkKCBiYXNlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudDtcblx0XHR9XG5cdH1cblxuXHRwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKTtcblx0c2NyaXB0cyA9ICFrZWVwU2NyaXB0cyAmJiBbXTtcblxuXHQvLyBTaW5nbGUgdGFnXG5cdGlmICggcGFyc2VkICkge1xuXHRcdHJldHVybiBbIGNvbnRleHQuY3JlYXRlRWxlbWVudCggcGFyc2VkWyAxIF0gKSBdO1xuXHR9XG5cblx0cGFyc2VkID0gYnVpbGRGcmFnbWVudCggWyBkYXRhIF0sIGNvbnRleHQsIHNjcmlwdHMgKTtcblxuXHRpZiAoIHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5KCBzY3JpcHRzICkucmVtb3ZlKCk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgcGFyc2VkLmNoaWxkTm9kZXMgKTtcbn07XG5cblxuLyoqXG4gKiBMb2FkIGEgdXJsIGludG8gYSBwYWdlXG4gKi9cbmpRdWVyeS5mbi5sb2FkID0gZnVuY3Rpb24oIHVybCwgcGFyYW1zLCBjYWxsYmFjayApIHtcblx0dmFyIHNlbGVjdG9yLCB0eXBlLCByZXNwb25zZSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRvZmYgPSB1cmwuaW5kZXhPZiggXCIgXCIgKTtcblxuXHRpZiAoIG9mZiA+IC0xICkge1xuXHRcdHNlbGVjdG9yID0gc3RyaXBBbmRDb2xsYXBzZSggdXJsLnNsaWNlKCBvZmYgKSApO1xuXHRcdHVybCA9IHVybC5zbGljZSggMCwgb2ZmICk7XG5cdH1cblxuXHQvLyBJZiBpdCdzIGEgZnVuY3Rpb25cblx0aWYgKCBpc0Z1bmN0aW9uKCBwYXJhbXMgKSApIHtcblxuXHRcdC8vIFdlIGFzc3VtZSB0aGF0IGl0J3MgdGhlIGNhbGxiYWNrXG5cdFx0Y2FsbGJhY2sgPSBwYXJhbXM7XG5cdFx0cGFyYW1zID0gdW5kZWZpbmVkO1xuXG5cdC8vIE90aGVyd2lzZSwgYnVpbGQgYSBwYXJhbSBzdHJpbmdcblx0fSBlbHNlIGlmICggcGFyYW1zICYmIHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0dHlwZSA9IFwiUE9TVFwiO1xuXHR9XG5cblx0Ly8gSWYgd2UgaGF2ZSBlbGVtZW50cyB0byBtb2RpZnksIG1ha2UgdGhlIHJlcXVlc3Rcblx0aWYgKCBzZWxmLmxlbmd0aCA+IDAgKSB7XG5cdFx0alF1ZXJ5LmFqYXgoIHtcblx0XHRcdHVybDogdXJsLFxuXG5cdFx0XHQvLyBJZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkLlxuXHRcdFx0Ly8gTWFrZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGV4cGxpY2l0IHNpbmNlXG5cdFx0XHQvLyB1c2VyIGNhbiBvdmVycmlkZSBpdCB0aHJvdWdoIGFqYXhTZXR1cCBtZXRob2Rcblx0XHRcdHR5cGU6IHR5cGUgfHwgXCJHRVRcIixcblx0XHRcdGRhdGFUeXBlOiBcImh0bWxcIixcblx0XHRcdGRhdGE6IHBhcmFtc1xuXHRcdH0gKS5kb25lKCBmdW5jdGlvbiggcmVzcG9uc2VUZXh0ICkge1xuXG5cdFx0XHQvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcblx0XHRcdHJlc3BvbnNlID0gYXJndW1lbnRzO1xuXG5cdFx0XHRzZWxmLmh0bWwoIHNlbGVjdG9yID9cblxuXHRcdFx0XHQvLyBJZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWQsIGxvY2F0ZSB0aGUgcmlnaHQgZWxlbWVudHMgaW4gYSBkdW1teSBkaXZcblx0XHRcdFx0Ly8gRXhjbHVkZSBzY3JpcHRzIHRvIGF2b2lkIElFICdQZXJtaXNzaW9uIERlbmllZCcgZXJyb3JzXG5cdFx0XHRcdGpRdWVyeSggXCI8ZGl2PlwiICkuYXBwZW5kKCBqUXVlcnkucGFyc2VIVE1MKCByZXNwb25zZVRleHQgKSApLmZpbmQoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSB1c2UgdGhlIGZ1bGwgcmVzdWx0XG5cdFx0XHRcdHJlc3BvbnNlVGV4dCApO1xuXG5cdFx0Ly8gSWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHMsIHRoaXMgZnVuY3Rpb24gZ2V0cyBcImRhdGFcIiwgXCJzdGF0dXNcIiwgXCJqcVhIUlwiXG5cdFx0Ly8gYnV0IHRoZXkgYXJlIGlnbm9yZWQgYmVjYXVzZSByZXNwb25zZSB3YXMgc2V0IGFib3ZlLlxuXHRcdC8vIElmIGl0IGZhaWxzLCB0aGlzIGZ1bmN0aW9uIGdldHMgXCJqcVhIUlwiLCBcInN0YXR1c1wiLCBcImVycm9yXCJcblx0XHR9ICkuYWx3YXlzKCBjYWxsYmFjayAmJiBmdW5jdGlvbigganFYSFIsIHN0YXR1cyApIHtcblx0XHRcdHNlbGYuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNhbGxiYWNrLmFwcGx5KCB0aGlzLCByZXNwb25zZSB8fCBbIGpxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUiBdICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG4vLyBBdHRhY2ggYSBidW5jaCBvZiBmdW5jdGlvbnMgZm9yIGhhbmRsaW5nIGNvbW1vbiBBSkFYIGV2ZW50c1xualF1ZXJ5LmVhY2goIFtcblx0XCJhamF4U3RhcnRcIixcblx0XCJhamF4U3RvcFwiLFxuXHRcImFqYXhDb21wbGV0ZVwiLFxuXHRcImFqYXhFcnJvclwiLFxuXHRcImFqYXhTdWNjZXNzXCIsXG5cdFwiYWpheFNlbmRcIlxuXSwgZnVuY3Rpb24oIGksIHR5cGUgKSB7XG5cdGpRdWVyeS5mblsgdHlwZSBdID0gZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlLCBmbiApO1xuXHR9O1xufSApO1xuXG5cblxuXG5qUXVlcnkuZXhwci5wc2V1ZG9zLmFuaW1hdGVkID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHJldHVybiBqUXVlcnkuZ3JlcCggalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuXHR9ICkubGVuZ3RoO1xufTtcblxuXG5cblxualF1ZXJ5Lm9mZnNldCA9IHtcblx0c2V0T2Zmc2V0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgaSApIHtcblx0XHR2YXIgY3VyUG9zaXRpb24sIGN1ckxlZnQsIGN1ckNTU1RvcCwgY3VyVG9wLCBjdXJPZmZzZXQsIGN1ckNTU0xlZnQsIGNhbGN1bGF0ZVBvc2l0aW9uLFxuXHRcdFx0cG9zaXRpb24gPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSxcblx0XHRcdGN1ckVsZW0gPSBqUXVlcnkoIGVsZW0gKSxcblx0XHRcdHByb3BzID0ge307XG5cblx0XHQvLyBTZXQgcG9zaXRpb24gZmlyc3QsIGluLWNhc2UgdG9wL2xlZnQgYXJlIHNldCBldmVuIG9uIHN0YXRpYyBlbGVtXG5cdFx0aWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdFx0fVxuXG5cdFx0Y3VyT2Zmc2V0ID0gY3VyRWxlbS5vZmZzZXQoKTtcblx0XHRjdXJDU1NUb3AgPSBqUXVlcnkuY3NzKCBlbGVtLCBcInRvcFwiICk7XG5cdFx0Y3VyQ1NTTGVmdCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwibGVmdFwiICk7XG5cdFx0Y2FsY3VsYXRlUG9zaXRpb24gPSAoIHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgfHwgcG9zaXRpb24gPT09IFwiZml4ZWRcIiApICYmXG5cdFx0XHQoIGN1ckNTU1RvcCArIGN1ckNTU0xlZnQgKS5pbmRleE9mKCBcImF1dG9cIiApID4gLTE7XG5cblx0XHQvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlclxuXHRcdC8vIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuXHRcdGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG5cdFx0XHRjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcblx0XHRcdGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcblx0XHRcdGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG5cdFx0XHRjdXJMZWZ0ID0gcGFyc2VGbG9hdCggY3VyQ1NTTGVmdCApIHx8IDA7XG5cdFx0fVxuXG5cdFx0aWYgKCBpc0Z1bmN0aW9uKCBvcHRpb25zICkgKSB7XG5cblx0XHRcdC8vIFVzZSBqUXVlcnkuZXh0ZW5kIGhlcmUgdG8gYWxsb3cgbW9kaWZpY2F0aW9uIG9mIGNvb3JkaW5hdGVzIGFyZ3VtZW50IChnaC0xODQ4KVxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMuY2FsbCggZWxlbSwgaSwgalF1ZXJ5LmV4dGVuZCgge30sIGN1ck9mZnNldCApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcblx0XHR9XG5cdFx0aWYgKCBvcHRpb25zLmxlZnQgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLmxlZnQgPSAoIG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0ICkgKyBjdXJMZWZ0O1xuXHRcdH1cblxuXHRcdGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyRWxlbS5jc3MoIHByb3BzICk7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0Ly8gb2Zmc2V0KCkgcmVsYXRlcyBhbiBlbGVtZW50J3MgYm9yZGVyIGJveCB0byB0aGUgZG9jdW1lbnQgb3JpZ2luXG5cdG9mZnNldDogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBQcmVzZXJ2ZSBjaGFpbmluZyBmb3Igc2V0dGVyXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHRoaXMgOlxuXHRcdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRcdGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHR2YXIgcmVjdCwgd2luLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXTtcblxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHplcm9zIGZvciBkaXNjb25uZWN0ZWQgYW5kIGhpZGRlbiAoZGlzcGxheTogbm9uZSkgZWxlbWVudHMgKGdoLTIzMTApXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYVxuXHRcdC8vIGRpc2Nvbm5lY3RlZCBub2RlIGluIElFIHRocm93cyBhbiBlcnJvclxuXHRcdGlmICggIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblx0XHR9XG5cblx0XHQvLyBHZXQgZG9jdW1lbnQtcmVsYXRpdmUgcG9zaXRpb24gYnkgYWRkaW5nIHZpZXdwb3J0IHNjcm9sbCB0byB2aWV3cG9ydC1yZWxhdGl2ZSBnQkNSXG5cdFx0cmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0d2luID0gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0LFxuXHRcdFx0bGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0XG5cdFx0fTtcblx0fSxcblxuXHQvLyBwb3NpdGlvbigpIHJlbGF0ZXMgYW4gZWxlbWVudCdzIG1hcmdpbiBib3ggdG8gaXRzIG9mZnNldCBwYXJlbnQncyBwYWRkaW5nIGJveFxuXHQvLyBUaGlzIGNvcnJlc3BvbmRzIHRvIHRoZSBiZWhhdmlvciBvZiBDU1MgYWJzb2x1dGUgcG9zaXRpb25pbmdcblx0cG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIXRoaXNbIDAgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsIGRvYyxcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRwYXJlbnRPZmZzZXQgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuXG5cdFx0Ly8gcG9zaXRpb246Zml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHRoZSB2aWV3cG9ydCwgd2hpY2ggaXRzZWxmIGFsd2F5cyBoYXMgemVybyBvZmZzZXRcblx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApID09PSBcImZpeGVkXCIgKSB7XG5cblx0XHRcdC8vIEFzc3VtZSBwb3NpdGlvbjpmaXhlZCBpbXBsaWVzIGF2YWlsYWJpbGl0eSBvZiBnZXRCb3VuZGluZ0NsaWVudFJlY3Rcblx0XHRcdG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcblxuXHRcdFx0Ly8gQWNjb3VudCBmb3IgdGhlICpyZWFsKiBvZmZzZXQgcGFyZW50LCB3aGljaCBjYW4gYmUgdGhlIGRvY3VtZW50IG9yIGl0cyByb290IGVsZW1lbnRcblx0XHRcdC8vIHdoZW4gYSBzdGF0aWNhbGx5IHBvc2l0aW9uZWQgZWxlbWVudCBpcyBpZGVudGlmaWVkXG5cdFx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cdFx0XHRvZmZzZXRQYXJlbnQgPSBlbGVtLm9mZnNldFBhcmVudCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0d2hpbGUgKCBvZmZzZXRQYXJlbnQgJiZcblx0XHRcdFx0KCBvZmZzZXRQYXJlbnQgPT09IGRvYy5ib2R5IHx8IG9mZnNldFBhcmVudCA9PT0gZG9jLmRvY3VtZW50RWxlbWVudCApICYmXG5cdFx0XHRcdGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSB7XG5cblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQgIT09IGVsZW0gJiYgb2Zmc2V0UGFyZW50Lm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdC8vIEluY29ycG9yYXRlIGJvcmRlcnMgaW50byBpdHMgb2Zmc2V0LCBzaW5jZSB0aGV5IGFyZSBvdXRzaWRlIGl0cyBjb250ZW50IG9yaWdpblxuXHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBqUXVlcnkoIG9mZnNldFBhcmVudCApLm9mZnNldCgpO1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQudG9wICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICk7XG5cdFx0XHRcdHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcblx0XHRcdGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSApXG5cdFx0fTtcblx0fSxcblxuXHQvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBkb2N1bWVudEVsZW1lbnQgaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcblx0Ly8gMSkgRm9yIHRoZSBlbGVtZW50IGluc2lkZSB0aGUgaWZyYW1lIHdpdGhvdXQgb2Zmc2V0UGFyZW50LCB0aGlzIG1ldGhvZCB3aWxsIHJldHVyblxuXHQvLyAgICBkb2N1bWVudEVsZW1lbnQgb2YgdGhlIHBhcmVudCB3aW5kb3dcblx0Ly8gMikgRm9yIHRoZSBoaWRkZW4gb3IgZGV0YWNoZWQgZWxlbWVudFxuXHQvLyAzKSBGb3IgYm9keSBvciBodG1sIGVsZW1lbnQsIGkuZS4gaW4gY2FzZSBvZiB0aGUgaHRtbCBub2RlIC0gaXQgd2lsbCByZXR1cm4gaXRzZWxmXG5cdC8vXG5cdC8vIGJ1dCB0aG9zZSBleGNlcHRpb25zIHdlcmUgbmV2ZXIgcHJlc2VudGVkIGFzIGEgcmVhbCBsaWZlIHVzZS1jYXNlc1xuXHQvLyBhbmQgbWlnaHQgYmUgY29uc2lkZXJlZCBhcyBtb3JlIHByZWZlcmFibGUgcmVzdWx0cy5cblx0Ly9cblx0Ly8gVGhpcyBsb2dpYywgaG93ZXZlciwgaXMgbm90IGd1YXJhbnRlZWQgYW5kIGNhbiBjaGFuZ2UgYXQgYW55IHBvaW50IGluIHRoZSBmdXR1cmVcblx0b2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50O1xuXG5cdFx0XHR3aGlsZSAoIG9mZnNldFBhcmVudCAmJiBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0XHRvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50RWxlbWVudDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBzY3JvbGxMZWZ0OiBcInBhZ2VYT2Zmc2V0XCIsIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiIH0sIGZ1bmN0aW9uKCBtZXRob2QsIHByb3AgKSB7XG5cdHZhciB0b3AgPSBcInBhZ2VZT2Zmc2V0XCIgPT09IHByb3A7XG5cblx0alF1ZXJ5LmZuWyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXG5cdFx0XHQvLyBDb2FsZXNjZSBkb2N1bWVudHMgYW5kIHdpbmRvd3Ncblx0XHRcdHZhciB3aW47XG5cdFx0XHRpZiAoIGlzV2luZG93KCBlbGVtICkgKSB7XG5cdFx0XHRcdHdpbiA9IGVsZW07XG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR3aW4gPSBlbGVtLmRlZmF1bHRWaWV3O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3aW4gKSB7XG5cdFx0XHRcdHdpbi5zY3JvbGxUbyhcblx0XHRcdFx0XHQhdG9wID8gdmFsIDogd2luLnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHRvcCA/IHZhbCA6IHdpbi5wYWdlWU9mZnNldFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtWyBtZXRob2QgXSA9IHZhbDtcblx0XHRcdH1cblx0XHR9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9O1xufSApO1xuXG4vLyBTdXBwb3J0OiBTYWZhcmkgPD03IC0gOS4xLCBDaHJvbWUgPD0zNyAtIDQ5XG4vLyBBZGQgdGhlIHRvcC9sZWZ0IGNzc0hvb2tzIHVzaW5nIGpRdWVyeS5mbi5wb3NpdGlvblxuLy8gV2Via2l0IGJ1ZzogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MDg0XG4vLyBCbGluayBidWc6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTU4OTM0N1xuLy8gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHBlcmNlbnQgd2hlbiBzcGVjaWZpZWQgZm9yIHRvcC9sZWZ0L2JvdHRvbS9yaWdodDtcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXG5qUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcblx0XHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHRjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuXG5cdFx0XHRcdC8vIElmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuXHRcdFx0XHRyZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggZWxlbSApLnBvc2l0aW9uKClbIHByb3AgXSArIFwicHhcIiA6XG5cdFx0XHRcdFx0Y29tcHV0ZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufSApO1xuXG5cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuXHRqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sXG5cdFx0ZnVuY3Rpb24oIGRlZmF1bHRFeHRyYSwgZnVuY05hbWUgKSB7XG5cblx0XHQvLyBNYXJnaW4gaXMgb25seSBmb3Igb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGhcblx0XHRqUXVlcnkuZm5bIGZ1bmNOYW1lIF0gPSBmdW5jdGlvbiggbWFyZ2luLCB2YWx1ZSApIHtcblx0XHRcdHZhciBjaGFpbmFibGUgPSBhcmd1bWVudHMubGVuZ3RoICYmICggZGVmYXVsdEV4dHJhIHx8IHR5cGVvZiBtYXJnaW4gIT09IFwiYm9vbGVhblwiICksXG5cdFx0XHRcdGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8ICggbWFyZ2luID09PSB0cnVlIHx8IHZhbHVlID09PSB0cnVlID8gXCJtYXJnaW5cIiA6IFwiYm9yZGVyXCIgKTtcblxuXHRcdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgZG9jO1xuXG5cdFx0XHRcdGlmICggaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vICQoIHdpbmRvdyApLm91dGVyV2lkdGgvSGVpZ2h0IHJldHVybiB3L2ggaW5jbHVkaW5nIHNjcm9sbGJhcnMgKGdoLTE3MjkpXG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmNOYW1lLmluZGV4T2YoIFwib3V0ZXJcIiApID09PSAwID9cblx0XHRcdFx0XHRcdGVsZW1bIFwiaW5uZXJcIiArIG5hbWUgXSA6XG5cdFx0XHRcdFx0XHRlbGVtLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFsgXCJjbGllbnRcIiArIG5hbWUgXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdGRvYyA9IGVsZW0uZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0XHRcdFx0Ly8gRWl0aGVyIHNjcm9sbFtXaWR0aC9IZWlnaHRdIG9yIG9mZnNldFtXaWR0aC9IZWlnaHRdIG9yIGNsaWVudFtXaWR0aC9IZWlnaHRdLFxuXHRcdFx0XHRcdC8vIHdoaWNoZXZlciBpcyBncmVhdGVzdFxuXHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcIm9mZnNldFwiICsgbmFtZSBdLCBkb2NbIFwib2Zmc2V0XCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRkb2NbIFwiY2xpZW50XCIgKyBuYW1lIF1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXG5cdFx0XHRcdFx0Ly8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIHR5cGUsIGV4dHJhICkgOlxuXG5cdFx0XHRcdFx0Ly8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG5cdFx0XHR9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSApO1xuXHRcdH07XG5cdH0gKTtcbn0gKTtcblxuXG5qUXVlcnkuZWFjaCggKCBcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCByZXNpemUgc2Nyb2xsIGNsaWNrIGRibGNsaWNrIFwiICtcblx0XCJtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBcIiArXG5cdFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBjb250ZXh0bWVudVwiICkuc3BsaXQoIFwiIFwiICksXG5cdGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG5cdC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/XG5cdFx0XHR0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcblx0XHRcdHRoaXMudHJpZ2dlciggbmFtZSApO1xuXHR9O1xufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcblx0XHRyZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcblx0fVxufSApO1xuXG5cblxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0YmluZDogZnVuY3Rpb24oIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vZmYoIHR5cGVzLCBudWxsLCBmbiApO1xuXHR9LFxuXG5cdGRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBmbiApIHtcblxuXHRcdC8vICggbmFtZXNwYWNlICkgb3IgKCBzZWxlY3RvciwgdHlwZXMgWywgZm5dIClcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/XG5cdFx0XHR0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDpcblx0XHRcdHRoaXMub2ZmKCB0eXBlcywgc2VsZWN0b3IgfHwgXCIqKlwiLCBmbiApO1xuXHR9XG59ICk7XG5cbi8vIEJpbmQgYSBmdW5jdGlvbiB0byBhIGNvbnRleHQsIG9wdGlvbmFsbHkgcGFydGlhbGx5IGFwcGx5aW5nIGFueVxuLy8gYXJndW1lbnRzLlxuLy8galF1ZXJ5LnByb3h5IGlzIGRlcHJlY2F0ZWQgdG8gcHJvbW90ZSBzdGFuZGFyZHMgKHNwZWNpZmljYWxseSBGdW5jdGlvbiNiaW5kKVxuLy8gSG93ZXZlciwgaXQgaXMgbm90IHNsYXRlZCBmb3IgcmVtb3ZhbCBhbnkgdGltZSBzb29uXG5qUXVlcnkucHJveHkgPSBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XG5cdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0dG1wID0gZm5bIGNvbnRleHQgXTtcblx0XHRjb250ZXh0ID0gZm47XG5cdFx0Zm4gPSB0bXA7XG5cdH1cblxuXHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHQvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuXHRpZiAoICFpc0Z1bmN0aW9uKCBmbiApICkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHQvLyBTaW11bGF0ZWQgYmluZFxuXHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAyICk7XG5cdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZuLmFwcGx5KCBjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KCBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSApICk7XG5cdH07XG5cblx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xuXG5cdHJldHVybiBwcm94eTtcbn07XG5cbmpRdWVyeS5ob2xkUmVhZHkgPSBmdW5jdGlvbiggaG9sZCApIHtcblx0aWYgKCBob2xkICkge1xuXHRcdGpRdWVyeS5yZWFkeVdhaXQrKztcblx0fSBlbHNlIHtcblx0XHRqUXVlcnkucmVhZHkoIHRydWUgKTtcblx0fVxufTtcbmpRdWVyeS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmpRdWVyeS5wYXJzZUpTT04gPSBKU09OLnBhcnNlO1xualF1ZXJ5Lm5vZGVOYW1lID0gbm9kZU5hbWU7XG5qUXVlcnkuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5qUXVlcnkuaXNXaW5kb3cgPSBpc1dpbmRvdztcbmpRdWVyeS5jYW1lbENhc2UgPSBjYW1lbENhc2U7XG5qUXVlcnkudHlwZSA9IHRvVHlwZTtcblxualF1ZXJ5Lm5vdyA9IERhdGUubm93O1xuXG5qUXVlcnkuaXNOdW1lcmljID0gZnVuY3Rpb24oIG9iaiApIHtcblxuXHQvLyBBcyBvZiBqUXVlcnkgMy4wLCBpc051bWVyaWMgaXMgbGltaXRlZCB0b1xuXHQvLyBzdHJpbmdzIGFuZCBudW1iZXJzIChwcmltaXRpdmVzIG9yIG9iamVjdHMpXG5cdC8vIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gZmluaXRlIG51bWJlcnMgKGdoLTI2NjIpXG5cdHZhciB0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXHRyZXR1cm4gKCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIgKSAmJlxuXG5cdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKFwiXCIpXG5cdFx0Ly8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxuXHRcdC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuXHRcdCFpc05hTiggb2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKTtcbn07XG5cblxuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeTtcblx0fSApO1xufVxuXG5cblxuXG52YXJcblxuXHQvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0X2pRdWVyeSA9IHdpbmRvdy5qUXVlcnksXG5cblx0Ly8gTWFwIG92ZXIgdGhlICQgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0XyQgPSB3aW5kb3cuJDtcblxualF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcblx0aWYgKCB3aW5kb3cuJCA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy4kID0gXyQ7XG5cdH1cblxuXHRpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeTtcbn07XG5cbi8vIEV4cG9zZSBqUXVlcnkgYW5kICQgaWRlbnRpZmllcnMsIGV2ZW4gaW4gQU1EXG4vLyAoIzcxMDIjY29tbWVudDoxMCwgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC81NTcpXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXG5pZiAoICFub0dsb2JhbCApIHtcblx0d2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xufVxuXG5cblxuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19
},{}],2:[function(require,module,exports){
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.jQuery = _jquery2.default;
window.$ = _jquery2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfOWNjZDEyNWQuanMiXSwibmFtZXMiOlsid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBQSxPQUFBQSxNQUFBQSxHQUFBQSxnQkFBQUE7QUFDQUEsT0FBQUEsQ0FBQUEsR0FBQUEsZ0JBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGpxdWVyeSBmcm9tICdqcXVlcnknO1xyXG53aW5kb3cualF1ZXJ5ID0ganF1ZXJ5O1xyXG53aW5kb3cuJCA9IGpxdWVyeTsiXX0=
},{"jquery":1}]},{},[2])