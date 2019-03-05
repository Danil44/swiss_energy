(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// shim for using process in browser

var process = module.exports = {};

process.nextTick = function () {
    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

    if (canSetImmediate) {
        return function (f) {
            return window.setImmediate(f);
        };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
}();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImNhblNldEltbWVkaWF0ZSIsIndpbmRvdyIsImNhblBvc3QiLCJxdWV1ZSIsInNvdXJjZSIsImV2IiwiZm4iLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7O0FBRUEsSUFBSUEsVUFBVUMsT0FBQUEsT0FBQUEsR0FBZCxFQUFBOztBQUVBRCxRQUFBQSxRQUFBQSxHQUFvQixZQUFZO0FBQzVCLFFBQUlFLGtCQUFrQixPQUFBLE1BQUEsS0FBQSxXQUFBLElBQ25CQyxPQURILFlBQUE7QUFFQSxRQUFJQyxVQUFVLE9BQUEsTUFBQSxLQUFBLFdBQUEsSUFDWEQsT0FEVyxXQUFBLElBQ1dBLE9BRHpCLGdCQUFBOztBQUlBLFFBQUEsZUFBQSxFQUFxQjtBQUNqQixlQUFPLFVBQUEsQ0FBQSxFQUFhO0FBQUUsbUJBQU9BLE9BQUFBLFlBQUFBLENBQVAsQ0FBT0EsQ0FBUDtBQUF0QixTQUFBO0FBQ0g7O0FBRUQsUUFBQSxPQUFBLEVBQWE7QUFDVCxZQUFJRSxRQUFKLEVBQUE7QUFDQUYsZUFBQUEsZ0JBQUFBLENBQUFBLFNBQUFBLEVBQW1DLFVBQUEsRUFBQSxFQUFjO0FBQzdDLGdCQUFJRyxTQUFTQyxHQUFiLE1BQUE7QUFDQSxnQkFBSSxDQUFDRCxXQUFBQSxNQUFBQSxJQUFxQkEsV0FBdEIsSUFBQSxLQUEwQ0MsR0FBQUEsSUFBQUEsS0FBOUMsY0FBQSxFQUEwRTtBQUN0RUEsbUJBQUFBLGVBQUFBO0FBQ0Esb0JBQUlGLE1BQUFBLE1BQUFBLEdBQUosQ0FBQSxFQUFzQjtBQUNsQix3QkFBSUcsS0FBS0gsTUFBVCxLQUFTQSxFQUFUO0FBQ0FHO0FBQ0g7QUFDSjtBQVJMTCxTQUFBQSxFQUFBQSxJQUFBQTs7QUFXQSxlQUFPLFNBQUEsUUFBQSxDQUFBLEVBQUEsRUFBc0I7QUFDekJFLGtCQUFBQSxJQUFBQSxDQUFBQSxFQUFBQTtBQUNBRixtQkFBQUEsV0FBQUEsQ0FBQUEsY0FBQUEsRUFBQUEsR0FBQUE7QUFGSixTQUFBO0FBSUg7O0FBRUQsV0FBTyxTQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQXNCO0FBQ3pCTSxtQkFBQUEsRUFBQUEsRUFBQUEsQ0FBQUE7QUFESixLQUFBO0FBOUJKVCxDQUFvQixFQUFwQkE7O0FBbUNBQSxRQUFBQSxLQUFBQSxHQUFBQSxTQUFBQTtBQUNBQSxRQUFBQSxPQUFBQSxHQUFBQSxJQUFBQTtBQUNBQSxRQUFBQSxHQUFBQSxHQUFBQSxFQUFBQTtBQUNBQSxRQUFBQSxJQUFBQSxHQUFBQSxFQUFBQTs7QUFFQSxTQUFBLElBQUEsR0FBZ0IsQ0FBRTs7QUFFbEJBLFFBQUFBLEVBQUFBLEdBQUFBLElBQUFBO0FBQ0FBLFFBQUFBLFdBQUFBLEdBQUFBLElBQUFBO0FBQ0FBLFFBQUFBLElBQUFBLEdBQUFBLElBQUFBO0FBQ0FBLFFBQUFBLEdBQUFBLEdBQUFBLElBQUFBO0FBQ0FBLFFBQUFBLGNBQUFBLEdBQUFBLElBQUFBO0FBQ0FBLFFBQUFBLGtCQUFBQSxHQUFBQSxJQUFBQTtBQUNBQSxRQUFBQSxJQUFBQSxHQUFBQSxJQUFBQTs7QUFFQUEsUUFBQUEsT0FBQUEsR0FBa0IsVUFBQSxJQUFBLEVBQWdCO0FBQzlCLFVBQU0sSUFBQSxLQUFBLENBQU4sa0NBQU0sQ0FBTjtBQURKQSxDQUFBQTs7QUFJQTtBQUNBQSxRQUFBQSxHQUFBQSxHQUFjLFlBQVk7QUFBRSxXQUFBLEdBQUE7QUFBNUJBLENBQUFBO0FBQ0FBLFFBQUFBLEtBQUFBLEdBQWdCLFVBQUEsR0FBQSxFQUFlO0FBQzNCLFVBQU0sSUFBQSxLQUFBLENBQU4sZ0NBQU0sQ0FBTjtBQURKQSxDQUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIl19
},{}],2:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
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
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
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
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdldE93blByb3BlcnR5U3ltYm9scyIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwicHJvdG90eXBlIiwicHJvcElzRW51bWVyYWJsZSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwidG9PYmplY3QiLCJ2YWwiLCJ1bmRlZmluZWQiLCJUeXBlRXJyb3IiLCJzaG91bGRVc2VOYXRpdmUiLCJhc3NpZ24iLCJ0ZXN0MSIsIlN0cmluZyIsImdldE93blByb3BlcnR5TmFtZXMiLCJ0ZXN0MiIsImkiLCJmcm9tQ2hhckNvZGUiLCJvcmRlcjIiLCJtYXAiLCJuIiwiam9pbiIsInRlc3QzIiwic3BsaXQiLCJmb3JFYWNoIiwibGV0dGVyIiwia2V5cyIsImVyciIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJmcm9tIiwidG8iLCJzeW1ib2xzIiwicyIsImFyZ3VtZW50cyIsImxlbmd0aCIsImtleSIsImNhbGwiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQTtBQUNBOztBQUNBLElBQUlBLHdCQUF3QkMsT0FBT0QscUJBQW5DO0FBQ0EsSUFBSUUsaUJBQWlCRCxPQUFPRSxTQUFQLENBQWlCRCxjQUF0QztBQUNBLElBQUlFLG1CQUFtQkgsT0FBT0UsU0FBUCxDQUFpQkUsb0JBQXhDOztBQUVBLFNBQVNDLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCO0FBQ3RCLEtBQUlBLFFBQVEsSUFBUixJQUFnQkEsUUFBUUMsU0FBNUIsRUFBdUM7QUFDdEMsUUFBTSxJQUFJQyxTQUFKLENBQWMsdURBQWQsQ0FBTjtBQUNBOztBQUVELFFBQU9SLE9BQU9NLEdBQVAsQ0FBUDtBQUNBOztBQUVELFNBQVNHLGVBQVQsR0FBMkI7QUFDMUIsS0FBSTtBQUNILE1BQUksQ0FBQ1QsT0FBT1UsTUFBWixFQUFvQjtBQUNuQixVQUFPLEtBQVA7QUFDQTs7QUFFRDs7QUFFQTtBQUNBLE1BQUlDLFFBQVEsSUFBSUMsTUFBSixDQUFXLEtBQVgsQ0FBWixDQVJHLENBUTZCO0FBQ2hDRCxRQUFNLENBQU4sSUFBVyxJQUFYO0FBQ0EsTUFBSVgsT0FBT2EsbUJBQVAsQ0FBMkJGLEtBQTNCLEVBQWtDLENBQWxDLE1BQXlDLEdBQTdDLEVBQWtEO0FBQ2pELFVBQU8sS0FBUDtBQUNBOztBQUVEO0FBQ0EsTUFBSUcsUUFBUSxFQUFaO0FBQ0EsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksRUFBcEIsRUFBd0JBLEdBQXhCLEVBQTZCO0FBQzVCRCxTQUFNLE1BQU1GLE9BQU9JLFlBQVAsQ0FBb0JELENBQXBCLENBQVosSUFBc0NBLENBQXRDO0FBQ0E7QUFDRCxNQUFJRSxTQUFTakIsT0FBT2EsbUJBQVAsQ0FBMkJDLEtBQTNCLEVBQWtDSSxHQUFsQyxDQUFzQyxVQUFVQyxDQUFWLEVBQWE7QUFDL0QsVUFBT0wsTUFBTUssQ0FBTixDQUFQO0FBQ0EsR0FGWSxDQUFiO0FBR0EsTUFBSUYsT0FBT0csSUFBUCxDQUFZLEVBQVosTUFBb0IsWUFBeEIsRUFBc0M7QUFDckMsVUFBTyxLQUFQO0FBQ0E7O0FBRUQ7QUFDQSxNQUFJQyxRQUFRLEVBQVo7QUFDQSx5QkFBdUJDLEtBQXZCLENBQTZCLEVBQTdCLEVBQWlDQyxPQUFqQyxDQUF5QyxVQUFVQyxNQUFWLEVBQWtCO0FBQzFESCxTQUFNRyxNQUFOLElBQWdCQSxNQUFoQjtBQUNBLEdBRkQ7QUFHQSxNQUFJeEIsT0FBT3lCLElBQVAsQ0FBWXpCLE9BQU9VLE1BQVAsQ0FBYyxFQUFkLEVBQWtCVyxLQUFsQixDQUFaLEVBQXNDRCxJQUF0QyxDQUEyQyxFQUEzQyxNQUNGLHNCQURGLEVBQzBCO0FBQ3pCLFVBQU8sS0FBUDtBQUNBOztBQUVELFNBQU8sSUFBUDtBQUNBLEVBckNELENBcUNFLE9BQU9NLEdBQVAsRUFBWTtBQUNiO0FBQ0EsU0FBTyxLQUFQO0FBQ0E7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQm5CLG9CQUFvQlQsT0FBT1UsTUFBM0IsR0FBb0MsVUFBVW1CLE1BQVYsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQzlFLEtBQUlDLElBQUo7QUFDQSxLQUFJQyxLQUFLM0IsU0FBU3dCLE1BQVQsQ0FBVDtBQUNBLEtBQUlJLE9BQUo7O0FBRUEsTUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLFVBQVVDLE1BQTlCLEVBQXNDRixHQUF0QyxFQUEyQztBQUMxQ0gsU0FBTy9CLE9BQU9tQyxVQUFVRCxDQUFWLENBQVAsQ0FBUDs7QUFFQSxPQUFLLElBQUlHLEdBQVQsSUFBZ0JOLElBQWhCLEVBQXNCO0FBQ3JCLE9BQUk5QixlQUFlcUMsSUFBZixDQUFvQlAsSUFBcEIsRUFBMEJNLEdBQTFCLENBQUosRUFBb0M7QUFDbkNMLE9BQUdLLEdBQUgsSUFBVU4sS0FBS00sR0FBTCxDQUFWO0FBQ0E7QUFDRDs7QUFFRCxNQUFJdEMscUJBQUosRUFBMkI7QUFDMUJrQyxhQUFVbEMsc0JBQXNCZ0MsSUFBdEIsQ0FBVjtBQUNBLFFBQUssSUFBSWhCLElBQUksQ0FBYixFQUFnQkEsSUFBSWtCLFFBQVFHLE1BQTVCLEVBQW9DckIsR0FBcEMsRUFBeUM7QUFDeEMsUUFBSVosaUJBQWlCbUMsSUFBakIsQ0FBc0JQLElBQXRCLEVBQTRCRSxRQUFRbEIsQ0FBUixDQUE1QixDQUFKLEVBQTZDO0FBQzVDaUIsUUFBR0MsUUFBUWxCLENBQVIsQ0FBSCxJQUFpQmdCLEtBQUtFLFFBQVFsQixDQUFSLENBQUwsQ0FBakI7QUFDQTtBQUNEO0FBQ0Q7QUFDRDs7QUFFRCxRQUFPaUIsRUFBUDtBQUNBLENBekJEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiJdfQ==
},{}],3:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.12.2
(function () {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if (typeof performance !== "undefined" && performance !== null && performance.now) {
    module.exports = function () {
      return performance.now();
    };
  } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
    module.exports = function () {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function () {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function () {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function () {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }
}).call(this);

//# sourceMappingURL=performance-now.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcmZvcm1hbmNlLW5vdy5qcyJdLCJuYW1lcyI6WyJnZXROYW5vU2Vjb25kcyIsImhydGltZSIsImxvYWRUaW1lIiwibW9kdWxlTG9hZFRpbWUiLCJub2RlTG9hZFRpbWUiLCJ1cFRpbWUiLCJwZXJmb3JtYW5jZSIsIm5vdyIsIm1vZHVsZSIsImV4cG9ydHMiLCJwcm9jZXNzIiwiaHIiLCJ1cHRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImNhbGwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsQ0FBQyxZQUFXO0FBQ1YsTUFBSUEsY0FBSixFQUFvQkMsTUFBcEIsRUFBNEJDLFFBQTVCLEVBQXNDQyxjQUF0QyxFQUFzREMsWUFBdEQsRUFBb0VDLE1BQXBFOztBQUVBLE1BQUssT0FBT0MsV0FBUCxLQUF1QixXQUF2QixJQUFzQ0EsZ0JBQWdCLElBQXZELElBQWdFQSxZQUFZQyxHQUFoRixFQUFxRjtBQUNuRkMsV0FBT0MsT0FBUCxHQUFpQixZQUFXO0FBQzFCLGFBQU9ILFlBQVlDLEdBQVosRUFBUDtBQUNELEtBRkQ7QUFHRCxHQUpELE1BSU8sSUFBSyxPQUFPRyxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxZQUFZLElBQS9DLElBQXdEQSxRQUFRVCxNQUFwRSxFQUE0RTtBQUNqRk8sV0FBT0MsT0FBUCxHQUFpQixZQUFXO0FBQzFCLGFBQU8sQ0FBQ1QsbUJBQW1CSSxZQUFwQixJQUFvQyxHQUEzQztBQUNELEtBRkQ7QUFHQUgsYUFBU1MsUUFBUVQsTUFBakI7QUFDQUQscUJBQWlCLFlBQVc7QUFDMUIsVUFBSVcsRUFBSjtBQUNBQSxXQUFLVixRQUFMO0FBQ0EsYUFBT1UsR0FBRyxDQUFILElBQVEsR0FBUixHQUFjQSxHQUFHLENBQUgsQ0FBckI7QUFDRCxLQUpEO0FBS0FSLHFCQUFpQkgsZ0JBQWpCO0FBQ0FLLGFBQVNLLFFBQVFFLE1BQVIsS0FBbUIsR0FBNUI7QUFDQVIsbUJBQWVELGlCQUFpQkUsTUFBaEM7QUFDRCxHQWJNLE1BYUEsSUFBSVEsS0FBS04sR0FBVCxFQUFjO0FBQ25CQyxXQUFPQyxPQUFQLEdBQWlCLFlBQVc7QUFDMUIsYUFBT0ksS0FBS04sR0FBTCxLQUFhTCxRQUFwQjtBQUNELEtBRkQ7QUFHQUEsZUFBV1csS0FBS04sR0FBTCxFQUFYO0FBQ0QsR0FMTSxNQUtBO0FBQ0xDLFdBQU9DLE9BQVAsR0FBaUIsWUFBVztBQUMxQixhQUFPLElBQUlJLElBQUosR0FBV0MsT0FBWCxLQUF1QlosUUFBOUI7QUFDRCxLQUZEO0FBR0FBLGVBQVcsSUFBSVcsSUFBSixHQUFXQyxPQUFYLEVBQVg7QUFDRDtBQUVGLENBaENELEVBZ0NHQyxJQWhDSCxDQWdDUSxJQWhDUjs7QUFrQ0EiLCJmaWxlIjoicGVyZm9ybWFuY2Utbm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjJcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdldE5hbm9TZWNvbmRzLCBocnRpbWUsIGxvYWRUaW1lLCBtb2R1bGVMb2FkVGltZSwgbm9kZUxvYWRUaW1lLCB1cFRpbWU7XG5cbiAgaWYgKCh0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwpICYmIHBlcmZvcm1hbmNlLm5vdykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfTtcbiAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2VzcyAhPT0gbnVsbCkgJiYgcHJvY2Vzcy5ocnRpbWUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChnZXROYW5vU2Vjb25kcygpIC0gbm9kZUxvYWRUaW1lKSAvIDFlNjtcbiAgICB9O1xuICAgIGhydGltZSA9IHByb2Nlc3MuaHJ0aW1lO1xuICAgIGdldE5hbm9TZWNvbmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHI7XG4gICAgICBociA9IGhydGltZSgpO1xuICAgICAgcmV0dXJuIGhyWzBdICogMWU5ICsgaHJbMV07XG4gICAgfTtcbiAgICBtb2R1bGVMb2FkVGltZSA9IGdldE5hbm9TZWNvbmRzKCk7XG4gICAgdXBUaW1lID0gcHJvY2Vzcy51cHRpbWUoKSAqIDFlOTtcbiAgICBub2RlTG9hZFRpbWUgPSBtb2R1bGVMb2FkVGltZSAtIHVwVGltZTtcbiAgfSBlbHNlIGlmIChEYXRlLm5vdykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBEYXRlLm5vdygpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGVyZm9ybWFuY2Utbm93LmpzLm1hcFxuIl19
}).call(this,require("gzNCgL"))
},{"gzNCgL":1}],4:[function(require,module,exports){
(function (global){
'use strict';

var now = require('performance-now'),
    root = typeof window === 'undefined' ? global : window,
    vendors = ['moz', 'webkit'],
    suffix = 'AnimationFrame',
    raf = root['request' + suffix],
    caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for (var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix];
  caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
}

// Some versions of FF have rAF but not cAF
if (!raf || !caf) {
  var last = 0,
      id = 0,
      queue = [],
      frameDuration = 1000 / 60;

  raf = function raf(callback) {
    if (queue.length === 0) {
      var _now = now(),
          next = Math.max(0, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(function () {
        var cp = queue.slice(0);
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0;
        for (var i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
        }
      }, Math.round(next));
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    });
    return id;
  };

  caf = function caf(handle) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

module.exports = function (fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn);
};
module.exports.cancel = function () {
  caf.apply(root, arguments);
};
module.exports.polyfill = function (object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf;
  object.cancelAnimationFrame = caf;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm5vdyIsInJlcXVpcmUiLCJyb290IiwidmVuZG9ycyIsInN1ZmZpeCIsInJhZiIsImNhZiIsImkiLCJsYXN0IiwiaWQiLCJxdWV1ZSIsImZyYW1lRHVyYXRpb24iLCJfbm93IiwibmV4dCIsIk1hdGgiLCJzZXRUaW1lb3V0IiwiY3AiLCJoYW5kbGUiLCJjYWxsYmFjayIsImNhbmNlbGxlZCIsIm1vZHVsZSIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxNQUFNQyxRQUFWLGlCQUFVQSxDQUFWO0FBQUEsSUFDSUMsT0FBTyxPQUFBLE1BQUEsS0FBQSxXQUFBLEdBQUEsTUFBQSxHQURYLE1BQUE7QUFBQSxJQUVJQyxVQUFVLENBQUEsS0FBQSxFQUZkLFFBRWMsQ0FGZDtBQUFBLElBR0lDLFNBSEosZ0JBQUE7QUFBQSxJQUlJQyxNQUFNSCxLQUFLLFlBSmYsTUFJVUEsQ0FKVjtBQUFBLElBS0lJLE1BQU1KLEtBQUssV0FBTEEsTUFBQUEsS0FBMkJBLEtBQUssa0JBTDFDLE1BS3FDQSxDQUxyQzs7QUFPQSxLQUFJLElBQUlLLElBQVIsQ0FBQSxFQUFlLENBQUEsR0FBQSxJQUFRQSxJQUFJSixRQUEzQixNQUFBLEVBQUEsR0FBQSxFQUFnRDtBQUM5Q0UsUUFBTUgsS0FBS0MsUUFBQUEsQ0FBQUEsSUFBQUEsU0FBQUEsR0FBWEUsTUFBTUgsQ0FBTkc7QUFDQUMsUUFBTUosS0FBS0MsUUFBQUEsQ0FBQUEsSUFBQUEsUUFBQUEsR0FBTEQsTUFBQUEsS0FDQ0EsS0FBS0MsUUFBQUEsQ0FBQUEsSUFBQUEsZUFBQUEsR0FEWkcsTUFDT0osQ0FEUEk7QUFFRDs7QUFFRDtBQUNBLElBQUcsQ0FBQSxHQUFBLElBQVEsQ0FBWCxHQUFBLEVBQWlCO0FBQ2YsTUFBSUUsT0FBSixDQUFBO0FBQUEsTUFDSUMsS0FESixDQUFBO0FBQUEsTUFFSUMsUUFGSixFQUFBO0FBQUEsTUFHSUMsZ0JBQWdCLE9BSHBCLEVBQUE7O0FBS0FOLFFBQU0sYUFBQSxRQUFBLEVBQW1CO0FBQ3ZCLFFBQUdLLE1BQUFBLE1BQUFBLEtBQUgsQ0FBQSxFQUF1QjtBQUNyQixVQUFJRSxPQUFKLEtBQUE7QUFBQSxVQUNJQyxPQUFPQyxLQUFBQSxHQUFBQSxDQUFBQSxDQUFBQSxFQUFZSCxpQkFBaUJDLE9BRHhDLElBQ3VCRCxDQUFaRyxDQURYO0FBRUFOLGFBQU9LLE9BQVBMLElBQUFBO0FBQ0FPLGlCQUFXLFlBQVc7QUFDcEIsWUFBSUMsS0FBS04sTUFBQUEsS0FBQUEsQ0FBVCxDQUFTQSxDQUFUO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLGNBQUFBLE1BQUFBLEdBQUFBLENBQUFBO0FBQ0EsYUFBSSxJQUFJSCxJQUFSLENBQUEsRUFBZUEsSUFBSVMsR0FBbkIsTUFBQSxFQUFBLEdBQUEsRUFBbUM7QUFDakMsY0FBRyxDQUFDQSxHQUFBQSxDQUFBQSxFQUFKLFNBQUEsRUFBcUI7QUFDbkIsZ0JBQUc7QUFDREEsaUJBQUFBLENBQUFBLEVBQUFBLFFBQUFBLENBQUFBLElBQUFBO0FBREYsYUFBQSxDQUVFLE9BQUEsQ0FBQSxFQUFTO0FBQ1RELHlCQUFXLFlBQVc7QUFBRSxzQkFBQSxDQUFBO0FBQXhCQSxlQUFBQSxFQUFBQSxDQUFBQTtBQUNEO0FBQ0Y7QUFDRjtBQWRIQSxPQUFBQSxFQWVHRCxLQUFBQSxLQUFBQSxDQWZIQyxJQWVHRCxDQWZIQztBQWdCRDtBQUNETCxVQUFBQSxJQUFBQSxDQUFXO0FBQ1RPLGNBQVEsRUFEQyxFQUFBO0FBRVRDLGdCQUZTLFFBQUE7QUFHVEMsaUJBQVc7QUFIRixLQUFYVDtBQUtBLFdBQUEsRUFBQTtBQTNCRkwsR0FBQUE7O0FBOEJBQyxRQUFNLGFBQUEsTUFBQSxFQUFpQjtBQUNyQixTQUFJLElBQUlDLElBQVIsQ0FBQSxFQUFlQSxJQUFJRyxNQUFuQixNQUFBLEVBQUEsR0FBQSxFQUFzQztBQUNwQyxVQUFHQSxNQUFBQSxDQUFBQSxFQUFBQSxNQUFBQSxLQUFILE1BQUEsRUFBK0I7QUFDN0JBLGNBQUFBLENBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLElBQUFBO0FBQ0Q7QUFDRjtBQUxISixHQUFBQTtBQU9EOztBQUVEYyxPQUFBQSxPQUFBQSxHQUFpQixVQUFBLEVBQUEsRUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxTQUFPZixJQUFBQSxJQUFBQSxDQUFBQSxJQUFBQSxFQUFQLEVBQU9BLENBQVA7QUFKRmUsQ0FBQUE7QUFNQUEsT0FBQUEsT0FBQUEsQ0FBQUEsTUFBQUEsR0FBd0IsWUFBVztBQUNqQ2QsTUFBQUEsS0FBQUEsQ0FBQUEsSUFBQUEsRUFBQUEsU0FBQUE7QUFERmMsQ0FBQUE7QUFHQUEsT0FBQUEsT0FBQUEsQ0FBQUEsUUFBQUEsR0FBMEIsVUFBQSxNQUFBLEVBQWlCO0FBQ3pDLE1BQUksQ0FBSixNQUFBLEVBQWE7QUFDWEMsYUFBQUEsSUFBQUE7QUFDRDtBQUNEQSxTQUFBQSxxQkFBQUEsR0FBQUEsR0FBQUE7QUFDQUEsU0FBQUEsb0JBQUFBLEdBQUFBLEdBQUFBO0FBTEZELENBQUFBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgcm9vdCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG4gICwgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXG4gICwgc3VmZml4ID0gJ0FuaW1hdGlvbkZyYW1lJ1xuICAsIHJhZiA9IHJvb3RbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IHJvb3RbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IHJvb3RbJ2NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxuXG5mb3IodmFyIGkgPSAwOyAhcmFmICYmIGkgPCB2ZW5kb3JzLmxlbmd0aDsgaSsrKSB7XG4gIHJhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG59XG5cbi8vIFNvbWUgdmVyc2lvbnMgb2YgRkYgaGF2ZSByQUYgYnV0IG5vdCBjQUZcbmlmKCFyYWYgfHwgIWNhZikge1xuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgcmV0dXJuIHJhZi5jYWxsKHJvb3QsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShyb290LCBhcmd1bWVudHMpXG59XG5tb2R1bGUuZXhwb3J0cy5wb2x5ZmlsbCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAoIW9iamVjdCkge1xuICAgIG9iamVjdCA9IHJvb3Q7XG4gIH1cbiAgb2JqZWN0LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJhZlxuICBvYmplY3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYWZcbn1cbiJdfQ==
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":3}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Parallax.js
* @author Matthew Wagerfield - @wagerfield, René Roth - mail@reneroth.org
* @description Creates a parallax effect between an array of layers,
*              driving the motion from the gyroscope output of a smartdevice.
*              If no gyroscope is available, the cursor position is used.
*/

var rqAnFr = require('raf');
var objectAssign = require('object-assign');

var helpers = {
  propertyCache: {},
  vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],

  clamp: function clamp(value, min, max) {
    return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
  },
  data: function data(element, name) {
    return helpers.deserialize(element.getAttribute('data-' + name));
  },
  deserialize: function deserialize(value) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else if (value === 'null') {
      return null;
    } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
      return parseFloat(value);
    } else {
      return value;
    }
  },
  camelCase: function camelCase(value) {
    return value.replace(/-+(.)?/g, function (match, character) {
      return character ? character.toUpperCase() : '';
    });
  },
  accelerate: function accelerate(element) {
    helpers.css(element, 'transform', 'translate3d(0,0,0) rotate(0.0001deg)');
    helpers.css(element, 'transform-style', 'preserve-3d');
    helpers.css(element, 'backface-visibility', 'hidden');
  },
  transformSupport: function transformSupport(value) {
    var element = document.createElement('div'),
        propertySupport = false,
        propertyValue = null,
        featureSupport = false,
        cssProperty = null,
        jsProperty = null;
    for (var i = 0, l = helpers.vendors.length; i < l; i++) {
      if (helpers.vendors[i] !== null) {
        cssProperty = helpers.vendors[i][0] + 'transform';
        jsProperty = helpers.vendors[i][1] + 'Transform';
      } else {
        cssProperty = 'transform';
        jsProperty = 'transform';
      }
      if (element.style[jsProperty] !== undefined) {
        propertySupport = true;
        break;
      }
    }
    switch (value) {
      case '2D':
        featureSupport = propertySupport;
        break;
      case '3D':
        if (propertySupport) {
          var body = document.body || document.createElement('body'),
              documentElement = document.documentElement,
              documentOverflow = documentElement.style.overflow,
              isCreatedBody = false;

          if (!document.body) {
            isCreatedBody = true;
            documentElement.style.overflow = 'hidden';
            documentElement.appendChild(body);
            body.style.overflow = 'hidden';
            body.style.background = '';
          }

          body.appendChild(element);
          element.style[jsProperty] = 'translate3d(1px,1px,1px)';
          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== 'none';
          documentElement.style.overflow = documentOverflow;
          body.removeChild(element);

          if (isCreatedBody) {
            body.removeAttribute('style');
            body.parentNode.removeChild(body);
          }
        }
        break;
    }
    return featureSupport;
  },
  css: function css(element, property, value) {
    var jsProperty = helpers.propertyCache[property];
    if (!jsProperty) {
      for (var i = 0, l = helpers.vendors.length; i < l; i++) {
        if (helpers.vendors[i] !== null) {
          jsProperty = helpers.camelCase(helpers.vendors[i][1] + '-' + property);
        } else {
          jsProperty = property;
        }
        if (element.style[jsProperty] !== undefined) {
          helpers.propertyCache[property] = jsProperty;
          break;
        }
      }
    }
    element.style[jsProperty] = value;
  }
};

var MAGIC_NUMBER = 30,
    DEFAULTS = {
  relativeInput: false,
  clipRelativeInput: false,
  inputElement: null,
  hoverOnly: false,
  calibrationThreshold: 100,
  calibrationDelay: 500,
  supportDelay: 500,
  calibrateX: false,
  calibrateY: true,
  invertX: true,
  invertY: true,
  limitX: false,
  limitY: false,
  scalarX: 10.0,
  scalarY: 10.0,
  frictionX: 0.1,
  frictionY: 0.1,
  originX: 0.5,
  originY: 0.5,
  pointerEvents: false,
  precision: 1,
  onReady: null,
  selector: null
};

var Parallax = function () {
  function Parallax(element, options) {
    _classCallCheck(this, Parallax);

    this.element = element;

    var data = {
      calibrateX: helpers.data(this.element, 'calibrate-x'),
      calibrateY: helpers.data(this.element, 'calibrate-y'),
      invertX: helpers.data(this.element, 'invert-x'),
      invertY: helpers.data(this.element, 'invert-y'),
      limitX: helpers.data(this.element, 'limit-x'),
      limitY: helpers.data(this.element, 'limit-y'),
      scalarX: helpers.data(this.element, 'scalar-x'),
      scalarY: helpers.data(this.element, 'scalar-y'),
      frictionX: helpers.data(this.element, 'friction-x'),
      frictionY: helpers.data(this.element, 'friction-y'),
      originX: helpers.data(this.element, 'origin-x'),
      originY: helpers.data(this.element, 'origin-y'),
      pointerEvents: helpers.data(this.element, 'pointer-events'),
      precision: helpers.data(this.element, 'precision'),
      relativeInput: helpers.data(this.element, 'relative-input'),
      clipRelativeInput: helpers.data(this.element, 'clip-relative-input'),
      hoverOnly: helpers.data(this.element, 'hover-only'),
      inputElement: document.querySelector(helpers.data(this.element, 'input-element')),
      selector: helpers.data(this.element, 'selector')
    };

    for (var key in data) {
      if (data[key] === null) {
        delete data[key];
      }
    }

    objectAssign(this, DEFAULTS, data, options);

    if (!this.inputElement) {
      this.inputElement = this.element;
    }

    this.calibrationTimer = null;
    this.calibrationFlag = true;
    this.enabled = false;
    this.depthsX = [];
    this.depthsY = [];
    this.raf = null;

    this.bounds = null;
    this.elementPositionX = 0;
    this.elementPositionY = 0;
    this.elementWidth = 0;
    this.elementHeight = 0;

    this.elementCenterX = 0;
    this.elementCenterY = 0;

    this.elementRangeX = 0;
    this.elementRangeY = 0;

    this.calibrationX = 0;
    this.calibrationY = 0;

    this.inputX = 0;
    this.inputY = 0;

    this.motionX = 0;
    this.motionY = 0;

    this.velocityX = 0;
    this.velocityY = 0;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.onDeviceMotion = this.onDeviceMotion.bind(this);
    this.onOrientationTimer = this.onOrientationTimer.bind(this);
    this.onMotionTimer = this.onMotionTimer.bind(this);
    this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.windowWidth = null;
    this.windowHeight = null;
    this.windowCenterX = null;
    this.windowCenterY = null;
    this.windowRadiusX = null;
    this.windowRadiusY = null;
    this.portrait = false;
    this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
    this.motionSupport = !!window.DeviceMotionEvent && !this.desktop;
    this.orientationSupport = !!window.DeviceOrientationEvent && !this.desktop;
    this.orientationStatus = 0;
    this.motionStatus = 0;

    this.initialise();
  }

  _createClass(Parallax, [{
    key: 'initialise',
    value: function initialise() {
      if (this.transform2DSupport === undefined) {
        this.transform2DSupport = helpers.transformSupport('2D');
        this.transform3DSupport = helpers.transformSupport('3D');
      }

      // Configure Context Styles
      if (this.transform3DSupport) {
        helpers.accelerate(this.element);
      }

      var style = window.getComputedStyle(this.element);
      if (style.getPropertyValue('position') === 'static') {
        this.element.style.position = 'relative';
      }

      // Pointer events
      if (!this.pointerEvents) {
        this.element.style.pointerEvents = 'none';
      }

      // Setup
      this.updateLayers();
      this.updateDimensions();
      this.enable();
      this.queueCalibration(this.calibrationDelay);
    }
  }, {
    key: 'doReadyCallback',
    value: function doReadyCallback() {
      if (this.onReady) {
        this.onReady();
      }
    }
  }, {
    key: 'updateLayers',
    value: function updateLayers() {
      if (this.selector) {
        this.layers = this.element.querySelectorAll(this.selector);
      } else {
        this.layers = this.element.children;
      }

      if (!this.layers.length) {
        console.warn('ParallaxJS: Your scene does not have any layers.');
      }

      this.depthsX = [];
      this.depthsY = [];

      for (var index = 0; index < this.layers.length; index++) {
        var layer = this.layers[index];

        if (this.transform3DSupport) {
          helpers.accelerate(layer);
        }

        layer.style.position = index ? 'absolute' : 'relative';
        layer.style.display = 'block';
        layer.style.left = 0;
        layer.style.top = 0;

        var depth = helpers.data(layer, 'depth') || 0;
        this.depthsX.push(helpers.data(layer, 'depth-x') || depth);
        this.depthsY.push(helpers.data(layer, 'depth-y') || depth);
      }
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.windowCenterX = this.windowWidth * this.originX;
      this.windowCenterY = this.windowHeight * this.originY;
      this.windowRadiusX = Math.max(this.windowCenterX, this.windowWidth - this.windowCenterX);
      this.windowRadiusY = Math.max(this.windowCenterY, this.windowHeight - this.windowCenterY);
    }
  }, {
    key: 'updateBounds',
    value: function updateBounds() {
      this.bounds = this.inputElement.getBoundingClientRect();
      this.elementPositionX = this.bounds.left;
      this.elementPositionY = this.bounds.top;
      this.elementWidth = this.bounds.width;
      this.elementHeight = this.bounds.height;
      this.elementCenterX = this.elementWidth * this.originX;
      this.elementCenterY = this.elementHeight * this.originY;
      this.elementRangeX = Math.max(this.elementCenterX, this.elementWidth - this.elementCenterX);
      this.elementRangeY = Math.max(this.elementCenterY, this.elementHeight - this.elementCenterY);
    }
  }, {
    key: 'queueCalibration',
    value: function queueCalibration(delay) {
      clearTimeout(this.calibrationTimer);
      this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
    }
  }, {
    key: 'enable',
    value: function enable() {
      if (this.enabled) {
        return;
      }
      this.enabled = true;

      if (this.orientationSupport) {
        this.portrait = false;
        window.addEventListener('deviceorientation', this.onDeviceOrientation);
        this.detectionTimer = setTimeout(this.onOrientationTimer, this.supportDelay);
      } else if (this.motionSupport) {
        this.portrait = false;
        window.addEventListener('devicemotion', this.onDeviceMotion);
        this.detectionTimer = setTimeout(this.onMotionTimer, this.supportDelay);
      } else {
        this.calibrationX = 0;
        this.calibrationY = 0;
        this.portrait = false;
        window.addEventListener('mousemove', this.onMouseMove);
        this.doReadyCallback();
      }

      window.addEventListener('resize', this.onWindowResize);
      this.raf = rqAnFr(this.onAnimationFrame);
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (!this.enabled) {
        return;
      }
      this.enabled = false;

      if (this.orientationSupport) {
        window.removeEventListener('deviceorientation', this.onDeviceOrientation);
      } else if (this.motionSupport) {
        window.removeEventListener('devicemotion', this.onDeviceMotion);
      } else {
        window.removeEventListener('mousemove', this.onMouseMove);
      }

      window.removeEventListener('resize', this.onWindowResize);
      rqAnFr.cancel(this.raf);
    }
  }, {
    key: 'calibrate',
    value: function calibrate(x, y) {
      this.calibrateX = x === undefined ? this.calibrateX : x;
      this.calibrateY = y === undefined ? this.calibrateY : y;
    }
  }, {
    key: 'invert',
    value: function invert(x, y) {
      this.invertX = x === undefined ? this.invertX : x;
      this.invertY = y === undefined ? this.invertY : y;
    }
  }, {
    key: 'friction',
    value: function friction(x, y) {
      this.frictionX = x === undefined ? this.frictionX : x;
      this.frictionY = y === undefined ? this.frictionY : y;
    }
  }, {
    key: 'scalar',
    value: function scalar(x, y) {
      this.scalarX = x === undefined ? this.scalarX : x;
      this.scalarY = y === undefined ? this.scalarY : y;
    }
  }, {
    key: 'limit',
    value: function limit(x, y) {
      this.limitX = x === undefined ? this.limitX : x;
      this.limitY = y === undefined ? this.limitY : y;
    }
  }, {
    key: 'origin',
    value: function origin(x, y) {
      this.originX = x === undefined ? this.originX : x;
      this.originY = y === undefined ? this.originY : y;
    }
  }, {
    key: 'setInputElement',
    value: function setInputElement(element) {
      this.inputElement = element;
      this.updateDimensions();
    }
  }, {
    key: 'setPosition',
    value: function setPosition(element, x, y) {
      x = x.toFixed(this.precision) + 'px';
      y = y.toFixed(this.precision) + 'px';
      if (this.transform3DSupport) {
        helpers.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)');
      } else if (this.transform2DSupport) {
        helpers.css(element, 'transform', 'translate(' + x + ',' + y + ')');
      } else {
        element.style.left = x;
        element.style.top = y;
      }
    }
  }, {
    key: 'onOrientationTimer',
    value: function onOrientationTimer() {
      if (this.orientationSupport && this.orientationStatus === 0) {
        this.disable();
        this.orientationSupport = false;
        this.enable();
      } else {
        this.doReadyCallback();
      }
    }
  }, {
    key: 'onMotionTimer',
    value: function onMotionTimer() {
      if (this.motionSupport && this.motionStatus === 0) {
        this.disable();
        this.motionSupport = false;
        this.enable();
      } else {
        this.doReadyCallback();
      }
    }
  }, {
    key: 'onCalibrationTimer',
    value: function onCalibrationTimer() {
      this.calibrationFlag = true;
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      this.updateDimensions();
    }
  }, {
    key: 'onAnimationFrame',
    value: function onAnimationFrame() {
      this.updateBounds();
      var calibratedInputX = this.inputX - this.calibrationX,
          calibratedInputY = this.inputY - this.calibrationY;
      if (Math.abs(calibratedInputX) > this.calibrationThreshold || Math.abs(calibratedInputY) > this.calibrationThreshold) {
        this.queueCalibration(0);
      }
      if (this.portrait) {
        this.motionX = this.calibrateX ? calibratedInputY : this.inputY;
        this.motionY = this.calibrateY ? calibratedInputX : this.inputX;
      } else {
        this.motionX = this.calibrateX ? calibratedInputX : this.inputX;
        this.motionY = this.calibrateY ? calibratedInputY : this.inputY;
      }
      this.motionX *= this.elementWidth * (this.scalarX / 100);
      this.motionY *= this.elementHeight * (this.scalarY / 100);
      if (!isNaN(parseFloat(this.limitX))) {
        this.motionX = helpers.clamp(this.motionX, -this.limitX, this.limitX);
      }
      if (!isNaN(parseFloat(this.limitY))) {
        this.motionY = helpers.clamp(this.motionY, -this.limitY, this.limitY);
      }
      this.velocityX += (this.motionX - this.velocityX) * this.frictionX;
      this.velocityY += (this.motionY - this.velocityY) * this.frictionY;
      for (var index = 0; index < this.layers.length; index++) {
        var layer = this.layers[index],
            depthX = this.depthsX[index],
            depthY = this.depthsY[index],
            xOffset = this.velocityX * (depthX * (this.invertX ? -1 : 1)),
            yOffset = this.velocityY * (depthY * (this.invertY ? -1 : 1));
        this.setPosition(layer, xOffset, yOffset);
      }
      this.raf = rqAnFr(this.onAnimationFrame);
    }
  }, {
    key: 'rotate',
    value: function rotate(beta, gamma) {
      // Extract Rotation
      var x = (beta || 0) / MAGIC_NUMBER,

      //  -90 :: 90
      y = (gamma || 0) / MAGIC_NUMBER; // -180 :: 180

      // Detect Orientation Change
      var portrait = this.windowHeight > this.windowWidth;
      if (this.portrait !== portrait) {
        this.portrait = portrait;
        this.calibrationFlag = true;
      }

      if (this.calibrationFlag) {
        this.calibrationFlag = false;
        this.calibrationX = x;
        this.calibrationY = y;
      }

      this.inputX = x;
      this.inputY = y;
    }
  }, {
    key: 'onDeviceOrientation',
    value: function onDeviceOrientation(event) {
      var beta = event.beta;
      var gamma = event.gamma;
      if (beta !== null && gamma !== null) {
        this.orientationStatus = 1;
        this.rotate(beta, gamma);
      }
    }
  }, {
    key: 'onDeviceMotion',
    value: function onDeviceMotion(event) {
      var beta = event.rotationRate.beta;
      var gamma = event.rotationRate.gamma;
      if (beta !== null && gamma !== null) {
        this.motionStatus = 1;
        this.rotate(beta, gamma);
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var clientX = event.clientX,
          clientY = event.clientY;

      // reset input to center if hoverOnly is set and we're not hovering the element
      if (this.hoverOnly && (clientX < this.elementPositionX || clientX > this.elementPositionX + this.elementWidth || clientY < this.elementPositionY || clientY > this.elementPositionY + this.elementHeight)) {
        this.inputX = 0;
        this.inputY = 0;
        return;
      }

      if (this.relativeInput) {
        // Clip mouse coordinates inside element bounds.
        if (this.clipRelativeInput) {
          clientX = Math.max(clientX, this.elementPositionX);
          clientX = Math.min(clientX, this.elementPositionX + this.elementWidth);
          clientY = Math.max(clientY, this.elementPositionY);
          clientY = Math.min(clientY, this.elementPositionY + this.elementHeight);
        }
        // Calculate input relative to the element.
        if (this.elementRangeX && this.elementRangeY) {
          this.inputX = (clientX - this.elementPositionX - this.elementCenterX) / this.elementRangeX;
          this.inputY = (clientY - this.elementPositionY - this.elementCenterY) / this.elementRangeY;
        }
      } else {
        // Calculate input relative to the window.
        if (this.windowRadiusX && this.windowRadiusY) {
          this.inputX = (clientX - this.windowCenterX) / this.windowRadiusX;
          this.inputY = (clientY - this.windowCenterY) / this.windowRadiusY;
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.disable();

      clearTimeout(this.calibrationTimer);
      clearTimeout(this.detectionTimer);

      this.element.removeAttribute('style');
      for (var index = 0; index < this.layers.length; index++) {
        this.layers[index].removeAttribute('style');
      }

      delete this.element;
      delete this.layers;
    }
  }, {
    key: 'version',
    value: function version() {
      return '3.1.0';
    }
  }]);

  return Parallax;
}();

module.exports = Parallax;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMmMyZTlmMzYuanMiXSwibmFtZXMiOlsicnFBbkZyIiwicmVxdWlyZSIsIm9iamVjdEFzc2lnbiIsImhlbHBlcnMiLCJwcm9wZXJ0eUNhY2hlIiwidmVuZG9ycyIsImNsYW1wIiwibWluIiwidmFsdWUiLCJkYXRhIiwiZWxlbWVudCIsImRlc2VyaWFsaXplIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJjYW1lbENhc2UiLCJjaGFyYWN0ZXIiLCJhY2NlbGVyYXRlIiwidHJhbnNmb3JtU3VwcG9ydCIsImRvY3VtZW50IiwicHJvcGVydHlTdXBwb3J0IiwicHJvcGVydHlWYWx1ZSIsImZlYXR1cmVTdXBwb3J0IiwiY3NzUHJvcGVydHkiLCJqc1Byb3BlcnR5IiwiaSIsImwiLCJib2R5IiwiZG9jdW1lbnRFbGVtZW50IiwiZG9jdW1lbnRPdmVyZmxvdyIsImlzQ3JlYXRlZEJvZHkiLCJ3aW5kb3ciLCJjc3MiLCJNQUdJQ19OVU1CRVIiLCJERUZBVUxUUyIsInJlbGF0aXZlSW5wdXQiLCJjbGlwUmVsYXRpdmVJbnB1dCIsImlucHV0RWxlbWVudCIsImhvdmVyT25seSIsImNhbGlicmF0aW9uVGhyZXNob2xkIiwiY2FsaWJyYXRpb25EZWxheSIsInN1cHBvcnREZWxheSIsImNhbGlicmF0ZVgiLCJjYWxpYnJhdGVZIiwiaW52ZXJ0WCIsImludmVydFkiLCJsaW1pdFgiLCJsaW1pdFkiLCJzY2FsYXJYIiwic2NhbGFyWSIsImZyaWN0aW9uWCIsImZyaWN0aW9uWSIsIm9yaWdpblgiLCJvcmlnaW5ZIiwicG9pbnRlckV2ZW50cyIsInByZWNpc2lvbiIsIm9uUmVhZHkiLCJzZWxlY3RvciIsImNvbnN0cnVjdG9yIiwibmF2aWdhdG9yIiwic3R5bGUiLCJjb25zb2xlIiwiaW5kZXgiLCJsYXllciIsImRlcHRoIiwiTWF0aCIsInF1ZXVlQ2FsaWJyYXRpb24iLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsaWJyYXRlIiwieCIsInkiLCJpbnZlcnQiLCJmcmljdGlvbiIsInNjYWxhciIsImxpbWl0Iiwib3JpZ2luIiwic2V0SW5wdXRFbGVtZW50Iiwic2V0UG9zaXRpb24iLCJjYWxpYnJhdGVkSW5wdXRYIiwiY2FsaWJyYXRlZElucHV0WSIsImRlcHRoWCIsImRlcHRoWSIsInhPZmZzZXQiLCJ5T2Zmc2V0Iiwicm90YXRlIiwiYmV0YSIsImdhbW1hIiwicG9ydHJhaXQiLCJvbkRldmljZU9yaWVudGF0aW9uIiwiZXZlbnQiLCJvbkRldmljZU1vdGlvbiIsIm9uTW91c2VNb3ZlIiwiY2xpZW50WCIsImNsaWVudFkiLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBUUEsSUFBTUEsU0FBU0MsUUFBZixLQUFlQSxDQUFmO0FBQ0EsSUFBTUMsZUFBZUQsUUFBckIsZUFBcUJBLENBQXJCOztBQUVBLElBQU1FLFVBQVU7QUFDZEMsaUJBRGMsRUFBQTtBQUVkQyxXQUFTLENBQUEsSUFBQSxFQUFPLENBQUEsVUFBQSxFQUFQLFFBQU8sQ0FBUCxFQUE4QixDQUFBLE9BQUEsRUFBOUIsS0FBOEIsQ0FBOUIsRUFBK0MsQ0FBQSxLQUFBLEVBQS9DLEdBQStDLENBQS9DLEVBQTRELENBQUEsTUFBQSxFQUZ2RCxJQUV1RCxDQUE1RCxDQUZLOztBQUlkQyxPQUpjLGlCQUlkQSxLQUpjLEVBSWRBLEdBSmMsRUFJZEEsR0FKYyxFQUlTO0FBQ3JCLFdBQU9DLE1BQUFBLEdBQUFBLEdBQ0ZDLFFBQUFBLEdBQUFBLEdBQUFBLEdBQUFBLEdBQW9CQSxRQUFBQSxHQUFBQSxHQUFBQSxHQUFBQSxHQURsQkQsS0FBQUEsR0FFRkMsUUFBQUEsR0FBQUEsR0FBQUEsR0FBQUEsR0FBb0JBLFFBQUFBLEdBQUFBLEdBQUFBLEdBQUFBLEdBRnpCLEtBQUE7QUFMWSxHQUFBO0FBVWRDLE1BVmMsZ0JBVWRBLE9BVmMsRUFVZEEsSUFWYyxFQVVNO0FBQ2xCLFdBQU9OLFFBQUFBLFdBQUFBLENBQW9CTyxRQUFBQSxZQUFBQSxDQUFxQixVQUFoRCxJQUEyQkEs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QUNDLFVBQVUsS0FBWCxhQUFBLElBQWlDLEtBQS9DLGFBQUE7QUFDRDtBQUNGO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUEsT0FBQTs7QUFFQTNCLG1CQUFhLEtBQWJBLGdCQUFBQTtBQUNBQSxtQkFBYSxLQUFiQSxjQUFBQTs7QUFFQSxXQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsT0FBQTtBQUNBLFdBQUssSUFBSUwsUUFBVCxDQUFBLEVBQW9CQSxRQUFRLEtBQUEsTUFBQSxDQUE1QixNQUFBLEVBQUEsT0FBQSxFQUF5RDtBQUN2RCxhQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsZUFBQSxDQUFBLE9BQUE7QUFDRDs7QUFFRCxhQUFPLEtBQVAsT0FBQTtBQUNBLGFBQU8sS0FBUCxNQUFBO0FBQ0Q7Ozs4QkFFUztBQUNSLGFBQUEsT0FBQTtBQUNEOzs7Ozs7QUFJSGlDLE9BQUFBLE9BQUFBLEdBQUFBLFFBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIFBhcmFsbGF4LmpzXG4qIEBhdXRob3IgTWF0dGhldyBXYWdlcmZpZWxkIC0gQHdhZ2VyZmllbGQsIFJlbsOpIFJvdGggLSBtYWlsQHJlbmVyb3RoLm9yZ1xuKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIHBhcmFsbGF4IGVmZmVjdCBiZXR3ZWVuIGFuIGFycmF5IG9mIGxheWVycyxcbiogICAgICAgICAgICAgIGRyaXZpbmcgdGhlIG1vdGlvbiBmcm9tIHRoZSBneXJvc2NvcGUgb3V0cHV0IG9mIGEgc21hcnRkZXZpY2UuXG4qICAgICAgICAgICAgICBJZiBubyBneXJvc2NvcGUgaXMgYXZhaWxhYmxlLCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIHVzZWQuXG4qL1xuXG5jb25zdCBycUFuRnIgPSByZXF1aXJlKCdyYWYnKVxuY29uc3Qgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG5cbmNvbnN0IGhlbHBlcnMgPSB7XG4gIHByb3BlcnR5Q2FjaGU6IHt9LFxuICB2ZW5kb3JzOiBbbnVsbCwgWyctd2Via2l0LScsJ3dlYmtpdCddLCBbJy1tb3otJywnTW96J10sIFsnLW8tJywnTyddLCBbJy1tcy0nLCdtcyddXSxcblxuICBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gbWluIDwgbWF4XG4gICAgICA/ICh2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWUpXG4gICAgICA6ICh2YWx1ZSA8IG1heCA/IG1heCA6IHZhbHVlID4gbWluID8gbWluIDogdmFsdWUpXG4gIH0sXG5cbiAgZGF0YShlbGVtZW50LCBuYW1lKSB7XG4gICAgcmV0dXJuIGhlbHBlcnMuZGVzZXJpYWxpemUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJytuYW1lKSlcbiAgfSxcblxuICBkZXNlcmlhbGl6ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdudWxsJykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9IGVsc2UgaWYgKCFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICB9LFxuXG4gIGNhbWVsQ2FzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8tKyguKT8vZywgKG1hdGNoLCBjaGFyYWN0ZXIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyYWN0ZXIgPyBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKSA6ICcnXG4gICAgfSlcbiAgfSxcblxuICBhY2NlbGVyYXRlKGVsZW1lbnQpIHtcbiAgICBoZWxwZXJzLmNzcyhlbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKDAsMCwwKSByb3RhdGUoMC4wMDAxZGVnKScpXG4gICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ3RyYW5zZm9ybS1zdHlsZScsICdwcmVzZXJ2ZS0zZCcpXG4gICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ2JhY2tmYWNlLXZpc2liaWxpdHknLCAnaGlkZGVuJylcbiAgfSxcblxuICB0cmFuc2Zvcm1TdXBwb3J0KHZhbHVlKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgcHJvcGVydHlTdXBwb3J0ID0gZmFsc2UsXG4gICAgICAgIHByb3BlcnR5VmFsdWUgPSBudWxsLFxuICAgICAgICBmZWF0dXJlU3VwcG9ydCA9IGZhbHNlLFxuICAgICAgICBjc3NQcm9wZXJ0eSA9IG51bGwsXG4gICAgICAgIGpzUHJvcGVydHkgPSBudWxsXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBoZWxwZXJzLnZlbmRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaGVscGVycy52ZW5kb3JzW2ldICE9PSBudWxsKSB7XG4gICAgICAgIGNzc1Byb3BlcnR5ID0gaGVscGVycy52ZW5kb3JzW2ldWzBdICsgJ3RyYW5zZm9ybSdcbiAgICAgICAganNQcm9wZXJ0eSA9IGhlbHBlcnMudmVuZG9yc1tpXVsxXSArICdUcmFuc2Zvcm0nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjc3NQcm9wZXJ0eSA9ICd0cmFuc2Zvcm0nXG4gICAgICAgIGpzUHJvcGVydHkgPSAndHJhbnNmb3JtJ1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQuc3R5bGVbanNQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wZXJ0eVN1cHBvcnQgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCh2YWx1ZSkge1xuICAgICAgY2FzZSAnMkQnOlxuICAgICAgICBmZWF0dXJlU3VwcG9ydCA9IHByb3BlcnR5U3VwcG9ydFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnM0QnOlxuICAgICAgICBpZiAocHJvcGVydHlTdXBwb3J0KSB7XG4gICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKSxcbiAgICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICAgICAgICBkb2N1bWVudE92ZXJmbG93ID0gZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93LFxuICAgICAgICAgICAgICBpc0NyZWF0ZWRCb2R5ID0gZmFsc2VcblxuICAgICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgaXNDcmVhdGVkQm9keSA9IHRydWVcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoYm9keSlcbiAgICAgICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJydcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgICAgICAgZWxlbWVudC5zdHlsZVtqc1Byb3BlcnR5XSA9ICd0cmFuc2xhdGUzZCgxcHgsMXB4LDFweCknXG4gICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoY3NzUHJvcGVydHkpXG4gICAgICAgICAgZmVhdHVyZVN1cHBvcnQgPSBwcm9wZXJ0eVZhbHVlICE9PSB1bmRlZmluZWQgJiYgcHJvcGVydHlWYWx1ZS5sZW5ndGggPiAwICYmIHByb3BlcnR5VmFsdWUgIT09ICdub25lJ1xuICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY3VtZW50T3ZlcmZsb3dcbiAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpXG5cbiAgICAgICAgICBpZiAoIGlzQ3JlYXRlZEJvZHkgKSB7XG4gICAgICAgICAgICBib2R5LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgICAgICAgICAgYm9keS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJvZHkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHJldHVybiBmZWF0dXJlU3VwcG9ydFxuICB9LFxuXG4gIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBsZXQganNQcm9wZXJ0eSA9IGhlbHBlcnMucHJvcGVydHlDYWNoZVtwcm9wZXJ0eV1cbiAgICBpZiAoIWpzUHJvcGVydHkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gaGVscGVycy52ZW5kb3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoaGVscGVycy52ZW5kb3JzW2ldICE9PSBudWxsKSB7XG4gICAgICAgICAganNQcm9wZXJ0eSA9IGhlbHBlcnMuY2FtZWxDYXNlKGhlbHBlcnMudmVuZG9yc1tpXVsxXSArICctJyArIHByb3BlcnR5KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGpzUHJvcGVydHkgPSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlW2pzUHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBoZWxwZXJzLnByb3BlcnR5Q2FjaGVbcHJvcGVydHldID0ganNQcm9wZXJ0eVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5zdHlsZVtqc1Byb3BlcnR5XSA9IHZhbHVlXG4gIH1cblxufVxuXG5jb25zdCBNQUdJQ19OVU1CRVIgPSAzMCxcbiAgICAgIERFRkFVTFRTID0ge1xuICAgICAgICByZWxhdGl2ZUlucHV0OiBmYWxzZSxcbiAgICAgICAgY2xpcFJlbGF0aXZlSW5wdXQ6IGZhbHNlLFxuICAgICAgICBpbnB1dEVsZW1lbnQ6IG51bGwsXG4gICAgICAgIGhvdmVyT25seTogZmFsc2UsXG4gICAgICAgIGNhbGlicmF0aW9uVGhyZXNob2xkOiAxMDAsXG4gICAgICAgIGNhbGlicmF0aW9uRGVsYXk6IDUwMCxcbiAgICAgICAgc3VwcG9ydERlbGF5OiA1MDAsXG4gICAgICAgIGNhbGlicmF0ZVg6IGZhbHNlLFxuICAgICAgICBjYWxpYnJhdGVZOiB0cnVlLFxuICAgICAgICBpbnZlcnRYOiB0cnVlLFxuICAgICAgICBpbnZlcnRZOiB0cnVlLFxuICAgICAgICBsaW1pdFg6IGZhbHNlLFxuICAgICAgICBsaW1pdFk6IGZhbHNlLFxuICAgICAgICBzY2FsYXJYOiAxMC4wLFxuICAgICAgICBzY2FsYXJZOiAxMC4wLFxuICAgICAgICBmcmljdGlvblg6IDAuMSxcbiAgICAgICAgZnJpY3Rpb25ZOiAwLjEsXG4gICAgICAgIG9yaWdpblg6IDAuNSxcbiAgICAgICAgb3JpZ2luWTogMC41LFxuICAgICAgICBwb2ludGVyRXZlbnRzOiBmYWxzZSxcbiAgICAgICAgcHJlY2lzaW9uOiAxLFxuICAgICAgICBvblJlYWR5OiBudWxsLFxuICAgICAgICBzZWxlY3RvcjogbnVsbFxuICAgICAgfVxuXG5jbGFzcyBQYXJhbGxheCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBjYWxpYnJhdGVYOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnY2FsaWJyYXRlLXgnKSxcbiAgICAgIGNhbGlicmF0ZVk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdjYWxpYnJhdGUteScpLFxuICAgICAgaW52ZXJ0WDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2ludmVydC14JyksXG4gICAgICBpbnZlcnRZOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnaW52ZXJ0LXknKSxcbiAgICAgIGxpbWl0WDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2xpbWl0LXgnKSxcbiAgICAgIGxpbWl0WTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2xpbWl0LXknKSxcbiAgICAgIHNjYWxhclg6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdzY2FsYXIteCcpLFxuICAgICAgc2NhbGFyWTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ3NjYWxhci15JyksXG4gICAgICBmcmljdGlvblg6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdmcmljdGlvbi14JyksXG4gICAgICBmcmljdGlvblk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdmcmljdGlvbi15JyksXG4gICAgICBvcmlnaW5YOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnb3JpZ2luLXgnKSxcbiAgICAgIG9yaWdpblk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdvcmlnaW4teScpLFxuICAgICAgcG9pbnRlckV2ZW50czogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ3BvaW50ZXItZXZlbnRzJyksXG4gICAgICBwcmVjaXNpb246IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdwcmVjaXNpb24nKSxcbiAgICAgIHJlbGF0aXZlSW5wdXQ6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdyZWxhdGl2ZS1pbnB1dCcpLFxuICAgICAgY2xpcFJlbGF0aXZlSW5wdXQ6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdjbGlwLXJlbGF0aXZlLWlucHV0JyksXG4gICAgICBob3Zlck9ubHk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdob3Zlci1vbmx5JyksXG4gICAgICBpbnB1dEVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2lucHV0LWVsZW1lbnQnKSksXG4gICAgICBzZWxlY3RvcjogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ3NlbGVjdG9yJylcbiAgICB9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKGRhdGFba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICBkZWxldGUgZGF0YVtrZXldXG4gICAgICB9XG4gICAgfVxuXG4gICAgb2JqZWN0QXNzaWduKHRoaXMsIERFRkFVTFRTLCBkYXRhLCBvcHRpb25zKVxuXG4gICAgaWYoIXRoaXMuaW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFxuICAgIH1cblxuICAgIHRoaXMuY2FsaWJyYXRpb25UaW1lciA9IG51bGxcbiAgICB0aGlzLmNhbGlicmF0aW9uRmxhZyA9IHRydWVcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICAgIHRoaXMuZGVwdGhzWCA9IFtdXG4gICAgdGhpcy5kZXB0aHNZID0gW11cbiAgICB0aGlzLnJhZiA9IG51bGxcblxuICAgIHRoaXMuYm91bmRzID0gbnVsbFxuICAgIHRoaXMuZWxlbWVudFBvc2l0aW9uWCA9IDBcbiAgICB0aGlzLmVsZW1lbnRQb3NpdGlvblkgPSAwXG4gICAgdGhpcy5lbGVtZW50V2lkdGggPSAwXG4gICAgdGhpcy5lbGVtZW50SGVpZ2h0ID0gMFxuXG4gICAgdGhpcy5lbGVtZW50Q2VudGVyWCA9IDBcbiAgICB0aGlzLmVsZW1lbnRDZW50ZXJZID0gMFxuXG4gICAgdGhpcy5lbGVtZW50UmFuZ2VYID0gMFxuICAgIHRoaXMuZWxlbWVudFJhbmdlWSA9IDBcblxuICAgIHRoaXMuY2FsaWJyYXRpb25YID0gMFxuICAgIHRoaXMuY2FsaWJyYXRpb25ZID0gMFxuXG4gICAgdGhpcy5pbnB1dFggPSAwXG4gICAgdGhpcy5pbnB1dFkgPSAwXG5cbiAgICB0aGlzLm1vdGlvblggPSAwXG4gICAgdGhpcy5tb3Rpb25ZID0gMFxuXG4gICAgdGhpcy52ZWxvY2l0eVggPSAwXG4gICAgdGhpcy52ZWxvY2l0eVkgPSAwXG5cbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uID0gdGhpcy5vbkRldmljZU9yaWVudGF0aW9uLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRGV2aWNlTW90aW9uID0gdGhpcy5vbkRldmljZU1vdGlvbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbk9yaWVudGF0aW9uVGltZXIgPSB0aGlzLm9uT3JpZW50YXRpb25UaW1lci5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbk1vdGlvblRpbWVyID0gdGhpcy5vbk1vdGlvblRpbWVyLmJpbmQodGhpcylcbiAgICB0aGlzLm9uQ2FsaWJyYXRpb25UaW1lciA9IHRoaXMub25DYWxpYnJhdGlvblRpbWVyLmJpbmQodGhpcylcbiAgICB0aGlzLm9uQW5pbWF0aW9uRnJhbWUgPSB0aGlzLm9uQW5pbWF0aW9uRnJhbWUuYmluZCh0aGlzKVxuICAgIHRoaXMub25XaW5kb3dSZXNpemUgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcylcblxuICAgIHRoaXMud2luZG93V2lkdGggPSBudWxsXG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSBudWxsXG4gICAgdGhpcy53aW5kb3dDZW50ZXJYID0gbnVsbFxuICAgIHRoaXMud2luZG93Q2VudGVyWSA9IG51bGxcbiAgICB0aGlzLndpbmRvd1JhZGl1c1ggPSBudWxsXG4gICAgdGhpcy53aW5kb3dSYWRpdXNZID0gbnVsbFxuICAgIHRoaXMucG9ydHJhaXQgPSBmYWxzZVxuICAgIHRoaXMuZGVza3RvcCA9ICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBob25lfGlQb2R8aVBhZHxBbmRyb2lkfEJsYWNrQmVycnl8QkIxMHxtb2JpfHRhYmxldHxvcGVyYSBtaW5pfG5leHVzIDcpL2kpXG4gICAgdGhpcy5tb3Rpb25TdXBwb3J0ID0gISF3aW5kb3cuRGV2aWNlTW90aW9uRXZlbnQgJiYgIXRoaXMuZGVza3RvcFxuICAgIHRoaXMub3JpZW50YXRpb25TdXBwb3J0ID0gISF3aW5kb3cuRGV2aWNlT3JpZW50YXRpb25FdmVudCAmJiAhdGhpcy5kZXNrdG9wXG4gICAgdGhpcy5vcmllbnRhdGlvblN0YXR1cyA9IDBcbiAgICB0aGlzLm1vdGlvblN0YXR1cyA9IDBcblxuICAgIHRoaXMuaW5pdGlhbGlzZSgpXG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybTJEU3VwcG9ydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRyYW5zZm9ybTJEU3VwcG9ydCA9IGhlbHBlcnMudHJhbnNmb3JtU3VwcG9ydCgnMkQnKVxuICAgICAgdGhpcy50cmFuc2Zvcm0zRFN1cHBvcnQgPSBoZWxwZXJzLnRyYW5zZm9ybVN1cHBvcnQoJzNEJylcbiAgICB9XG5cbiAgICAvLyBDb25maWd1cmUgQ29udGV4dCBTdHlsZXNcbiAgICBpZiAodGhpcy50cmFuc2Zvcm0zRFN1cHBvcnQpIHtcbiAgICAgIGhlbHBlcnMuYWNjZWxlcmF0ZSh0aGlzLmVsZW1lbnQpXG4gICAgfVxuXG4gICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KVxuICAgIGlmIChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIH1cblxuICAgIC8vIFBvaW50ZXIgZXZlbnRzXG4gICAgaWYoIXRoaXMucG9pbnRlckV2ZW50cykge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSdcbiAgICB9XG5cbiAgICAvLyBTZXR1cFxuICAgIHRoaXMudXBkYXRlTGF5ZXJzKClcbiAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKVxuICAgIHRoaXMuZW5hYmxlKClcbiAgICB0aGlzLnF1ZXVlQ2FsaWJyYXRpb24odGhpcy5jYWxpYnJhdGlvbkRlbGF5KVxuICB9XG5cbiAgZG9SZWFkeUNhbGxiYWNrKCkge1xuICAgIGlmKHRoaXMub25SZWFkeSkge1xuICAgICAgdGhpcy5vblJlYWR5KClcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMYXllcnMoKSB7XG4gICAgaWYodGhpcy5zZWxlY3Rvcikge1xuICAgICAgdGhpcy5sYXllcnMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxheWVycyA9IHRoaXMuZWxlbWVudC5jaGlsZHJlblxuICAgIH1cblxuICAgIGlmKCF0aGlzLmxheWVycy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGFyYWxsYXhKUzogWW91ciBzY2VuZSBkb2VzIG5vdCBoYXZlIGFueSBsYXllcnMuJylcbiAgICB9XG5cbiAgICB0aGlzLmRlcHRoc1ggPSBbXVxuICAgIHRoaXMuZGVwdGhzWSA9IFtdXG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBsZXQgbGF5ZXIgPSB0aGlzLmxheWVyc1tpbmRleF1cblxuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtM0RTdXBwb3J0KSB7XG4gICAgICAgIGhlbHBlcnMuYWNjZWxlcmF0ZShsYXllcilcbiAgICAgIH1cblxuICAgICAgbGF5ZXIuc3R5bGUucG9zaXRpb24gPSBpbmRleCA/ICdhYnNvbHV0ZScgOiAncmVsYXRpdmUnXG4gICAgICBsYXllci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgbGF5ZXIuc3R5bGUubGVmdCA9IDBcbiAgICAgIGxheWVyLnN0eWxlLnRvcCA9IDBcblxuICAgICAgbGV0IGRlcHRoID0gaGVscGVycy5kYXRhKGxheWVyLCAnZGVwdGgnKSB8fCAwXG4gICAgICB0aGlzLmRlcHRoc1gucHVzaChoZWxwZXJzLmRhdGEobGF5ZXIsICdkZXB0aC14JykgfHwgZGVwdGgpXG4gICAgICB0aGlzLmRlcHRoc1kucHVzaChoZWxwZXJzLmRhdGEobGF5ZXIsICdkZXB0aC15JykgfHwgZGVwdGgpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRGltZW5zaW9ucygpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIHRoaXMud2luZG93Q2VudGVyWCA9IHRoaXMud2luZG93V2lkdGggKiB0aGlzLm9yaWdpblhcbiAgICB0aGlzLndpbmRvd0NlbnRlclkgPSB0aGlzLndpbmRvd0hlaWdodCAqIHRoaXMub3JpZ2luWVxuICAgIHRoaXMud2luZG93UmFkaXVzWCA9IE1hdGgubWF4KHRoaXMud2luZG93Q2VudGVyWCwgdGhpcy53aW5kb3dXaWR0aCAtIHRoaXMud2luZG93Q2VudGVyWClcbiAgICB0aGlzLndpbmRvd1JhZGl1c1kgPSBNYXRoLm1heCh0aGlzLndpbmRvd0NlbnRlclksIHRoaXMud2luZG93SGVpZ2h0IC0gdGhpcy53aW5kb3dDZW50ZXJZKVxuICB9XG5cbiAgdXBkYXRlQm91bmRzKCkge1xuICAgIHRoaXMuYm91bmRzID0gdGhpcy5pbnB1dEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB0aGlzLmVsZW1lbnRQb3NpdGlvblggPSB0aGlzLmJvdW5kcy5sZWZ0XG4gICAgdGhpcy5lbGVtZW50UG9zaXRpb25ZID0gdGhpcy5ib3VuZHMudG9wXG4gICAgdGhpcy5lbGVtZW50V2lkdGggPSB0aGlzLmJvdW5kcy53aWR0aFxuICAgIHRoaXMuZWxlbWVudEhlaWdodCA9IHRoaXMuYm91bmRzLmhlaWdodFxuICAgIHRoaXMuZWxlbWVudENlbnRlclggPSB0aGlzLmVsZW1lbnRXaWR0aCAqIHRoaXMub3JpZ2luWFxuICAgIHRoaXMuZWxlbWVudENlbnRlclkgPSB0aGlzLmVsZW1lbnRIZWlnaHQgKiB0aGlzLm9yaWdpbllcbiAgICB0aGlzLmVsZW1lbnRSYW5nZVggPSBNYXRoLm1heCh0aGlzLmVsZW1lbnRDZW50ZXJYLCB0aGlzLmVsZW1lbnRXaWR0aCAtIHRoaXMuZWxlbWVudENlbnRlclgpXG4gICAgdGhpcy5lbGVtZW50UmFuZ2VZID0gTWF0aC5tYXgodGhpcy5lbGVtZW50Q2VudGVyWSwgdGhpcy5lbGVtZW50SGVpZ2h0IC0gdGhpcy5lbGVtZW50Q2VudGVyWSlcbiAgfVxuXG4gIHF1ZXVlQ2FsaWJyYXRpb24oZGVsYXkpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jYWxpYnJhdGlvblRpbWVyKVxuICAgIHRoaXMuY2FsaWJyYXRpb25UaW1lciA9IHNldFRpbWVvdXQodGhpcy5vbkNhbGlicmF0aW9uVGltZXIsIGRlbGF5KVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvblN1cHBvcnQpIHtcbiAgICAgIHRoaXMucG9ydHJhaXQgPSBmYWxzZVxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uKVxuICAgICAgdGhpcy5kZXRlY3Rpb25UaW1lciA9IHNldFRpbWVvdXQodGhpcy5vbk9yaWVudGF0aW9uVGltZXIsIHRoaXMuc3VwcG9ydERlbGF5KVxuICAgIH0gZWxzZSBpZiAodGhpcy5tb3Rpb25TdXBwb3J0KSB7XG4gICAgICB0aGlzLnBvcnRyYWl0ID0gZmFsc2VcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2Vtb3Rpb24nLCB0aGlzLm9uRGV2aWNlTW90aW9uKVxuICAgICAgdGhpcy5kZXRlY3Rpb25UaW1lciA9IHNldFRpbWVvdXQodGhpcy5vbk1vdGlvblRpbWVyLCB0aGlzLnN1cHBvcnREZWxheSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxpYnJhdGlvblggPSAwXG4gICAgICB0aGlzLmNhbGlicmF0aW9uWSA9IDBcbiAgICAgIHRoaXMucG9ydHJhaXQgPSBmYWxzZVxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpXG4gICAgICB0aGlzLmRvUmVhZHlDYWxsYmFjaygpXG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpXG4gICAgdGhpcy5yYWYgPSBycUFuRnIodGhpcy5vbkFuaW1hdGlvbkZyYW1lKVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvblN1cHBvcnQpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbilcbiAgICB9IGVsc2UgaWYgKHRoaXMubW90aW9uU3VwcG9ydCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RldmljZW1vdGlvbicsIHRoaXMub25EZXZpY2VNb3Rpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKVxuICAgIH1cblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplKVxuICAgIHJxQW5Gci5jYW5jZWwodGhpcy5yYWYpXG4gIH1cblxuICBjYWxpYnJhdGUoeCwgeSkge1xuICAgIHRoaXMuY2FsaWJyYXRlWCA9IHggPT09IHVuZGVmaW5lZCA/IHRoaXMuY2FsaWJyYXRlWCA6IHhcbiAgICB0aGlzLmNhbGlicmF0ZVkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmNhbGlicmF0ZVkgOiB5XG4gIH1cblxuICBpbnZlcnQoeCwgeSkge1xuICAgIHRoaXMuaW52ZXJ0WCA9IHggPT09IHVuZGVmaW5lZCA/IHRoaXMuaW52ZXJ0WCA6IHhcbiAgICB0aGlzLmludmVydFkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmludmVydFkgOiB5XG4gIH1cblxuICBmcmljdGlvbih4LCB5KSB7XG4gICAgdGhpcy5mcmljdGlvblggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLmZyaWN0aW9uWCA6IHhcbiAgICB0aGlzLmZyaWN0aW9uWSA9IHkgPT09IHVuZGVmaW5lZCA/IHRoaXMuZnJpY3Rpb25ZIDogeVxuICB9XG5cbiAgc2NhbGFyKHgsIHkpIHtcbiAgICB0aGlzLnNjYWxhclggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLnNjYWxhclggOiB4XG4gICAgdGhpcy5zY2FsYXJZID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy5zY2FsYXJZIDogeVxuICB9XG5cbiAgbGltaXQoeCwgeSkge1xuICAgIHRoaXMubGltaXRYID0geCA9PT0gdW5kZWZpbmVkID8gdGhpcy5saW1pdFggOiB4XG4gICAgdGhpcy5saW1pdFkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmxpbWl0WSA6IHlcbiAgfVxuXG4gIG9yaWdpbih4LCB5KSB7XG4gICAgdGhpcy5vcmlnaW5YID0geCA9PT0gdW5kZWZpbmVkID8gdGhpcy5vcmlnaW5YIDogeFxuICAgIHRoaXMub3JpZ2luWSA9IHkgPT09IHVuZGVmaW5lZCA/IHRoaXMub3JpZ2luWSA6IHlcbiAgfVxuXG4gIHNldElucHV0RWxlbWVudChlbGVtZW50KSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKClcbiAgfVxuXG4gIHNldFBvc2l0aW9uKGVsZW1lbnQsIHgsIHkpIHtcbiAgICB4ID0geC50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSArICdweCdcbiAgICB5ID0geS50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSArICdweCdcbiAgICBpZiAodGhpcy50cmFuc2Zvcm0zRFN1cHBvcnQpIHtcbiAgICAgIGhlbHBlcnMuY3NzKGVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIHggKyAnLCcgKyB5ICsgJywwKScpXG4gICAgfSBlbHNlIGlmICh0aGlzLnRyYW5zZm9ybTJEU3VwcG9ydCkge1xuICAgICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHggKyAnLCcgKyB5ICsgJyknKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB4XG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHlcbiAgICB9XG4gIH1cblxuICBvbk9yaWVudGF0aW9uVGltZXIoKSB7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb25TdXBwb3J0ICYmIHRoaXMub3JpZW50YXRpb25TdGF0dXMgPT09IDApIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgICB0aGlzLm9yaWVudGF0aW9uU3VwcG9ydCA9IGZhbHNlXG4gICAgICB0aGlzLmVuYWJsZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9SZWFkeUNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBvbk1vdGlvblRpbWVyKCkge1xuICAgIGlmICh0aGlzLm1vdGlvblN1cHBvcnQgJiYgdGhpcy5tb3Rpb25TdGF0dXMgPT09IDApIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgICB0aGlzLm1vdGlvblN1cHBvcnQgPSBmYWxzZVxuICAgICAgdGhpcy5lbmFibGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvUmVhZHlDYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgb25DYWxpYnJhdGlvblRpbWVyKCkge1xuICAgIHRoaXMuY2FsaWJyYXRpb25GbGFnID0gdHJ1ZVxuICB9XG5cbiAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKClcbiAgfVxuXG4gIG9uQW5pbWF0aW9uRnJhbWUoKSB7XG4gICAgdGhpcy51cGRhdGVCb3VuZHMoKVxuICAgIGxldCBjYWxpYnJhdGVkSW5wdXRYID0gdGhpcy5pbnB1dFggLSB0aGlzLmNhbGlicmF0aW9uWCxcbiAgICAgICAgY2FsaWJyYXRlZElucHV0WSA9IHRoaXMuaW5wdXRZIC0gdGhpcy5jYWxpYnJhdGlvbllcbiAgICBpZiAoKE1hdGguYWJzKGNhbGlicmF0ZWRJbnB1dFgpID4gdGhpcy5jYWxpYnJhdGlvblRocmVzaG9sZCkgfHwgKE1hdGguYWJzKGNhbGlicmF0ZWRJbnB1dFkpID4gdGhpcy5jYWxpYnJhdGlvblRocmVzaG9sZCkpIHtcbiAgICAgIHRoaXMucXVldWVDYWxpYnJhdGlvbigwKVxuICAgIH1cbiAgICBpZiAodGhpcy5wb3J0cmFpdCkge1xuICAgICAgdGhpcy5tb3Rpb25YID0gdGhpcy5jYWxpYnJhdGVYID8gY2FsaWJyYXRlZElucHV0WSA6IHRoaXMuaW5wdXRZXG4gICAgICB0aGlzLm1vdGlvblkgPSB0aGlzLmNhbGlicmF0ZVkgPyBjYWxpYnJhdGVkSW5wdXRYIDogdGhpcy5pbnB1dFhcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3Rpb25YID0gdGhpcy5jYWxpYnJhdGVYID8gY2FsaWJyYXRlZElucHV0WCA6IHRoaXMuaW5wdXRYXG4gICAgICB0aGlzLm1vdGlvblkgPSB0aGlzLmNhbGlicmF0ZVkgPyBjYWxpYnJhdGVkSW5wdXRZIDogdGhpcy5pbnB1dFlcbiAgICB9XG4gICAgdGhpcy5tb3Rpb25YICo9IHRoaXMuZWxlbWVudFdpZHRoICogKHRoaXMuc2NhbGFyWCAvIDEwMClcbiAgICB0aGlzLm1vdGlvblkgKj0gdGhpcy5lbGVtZW50SGVpZ2h0ICogKHRoaXMuc2NhbGFyWSAvIDEwMClcbiAgICBpZiAoIWlzTmFOKHBhcnNlRmxvYXQodGhpcy5saW1pdFgpKSkge1xuICAgICAgdGhpcy5tb3Rpb25YID0gaGVscGVycy5jbGFtcCh0aGlzLm1vdGlvblgsIC10aGlzLmxpbWl0WCwgdGhpcy5saW1pdFgpXG4gICAgfVxuICAgIGlmICghaXNOYU4ocGFyc2VGbG9hdCh0aGlzLmxpbWl0WSkpKSB7XG4gICAgICB0aGlzLm1vdGlvblkgPSBoZWxwZXJzLmNsYW1wKHRoaXMubW90aW9uWSwgLXRoaXMubGltaXRZLCB0aGlzLmxpbWl0WSlcbiAgICB9XG4gICAgdGhpcy52ZWxvY2l0eVggKz0gKHRoaXMubW90aW9uWCAtIHRoaXMudmVsb2NpdHlYKSAqIHRoaXMuZnJpY3Rpb25YXG4gICAgdGhpcy52ZWxvY2l0eVkgKz0gKHRoaXMubW90aW9uWSAtIHRoaXMudmVsb2NpdHlZKSAqIHRoaXMuZnJpY3Rpb25ZXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgbGV0IGxheWVyID0gdGhpcy5sYXllcnNbaW5kZXhdLFxuICAgICAgICAgIGRlcHRoWCA9IHRoaXMuZGVwdGhzWFtpbmRleF0sXG4gICAgICAgICAgZGVwdGhZID0gdGhpcy5kZXB0aHNZW2luZGV4XSxcbiAgICAgICAgICB4T2Zmc2V0ID0gdGhpcy52ZWxvY2l0eVggKiAoZGVwdGhYICogKHRoaXMuaW52ZXJ0WCA/IC0xIDogMSkpLFxuICAgICAgICAgIHlPZmZzZXQgPSB0aGlzLnZlbG9jaXR5WSAqIChkZXB0aFkgKiAodGhpcy5pbnZlcnRZID8gLTEgOiAxKSlcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24obGF5ZXIsIHhPZmZzZXQsIHlPZmZzZXQpXG4gICAgfVxuICAgIHRoaXMucmFmID0gcnFBbkZyKHRoaXMub25BbmltYXRpb25GcmFtZSlcbiAgfVxuXG4gIHJvdGF0ZShiZXRhLCBnYW1tYSl7XG4gICAgLy8gRXh0cmFjdCBSb3RhdGlvblxuICAgIGxldCB4ID0gKGJldGEgfHwgMCkgLyBNQUdJQ19OVU1CRVIsIC8vICAtOTAgOjogOTBcbiAgICAgICAgeSA9IChnYW1tYSB8fCAwKSAvIE1BR0lDX05VTUJFUiAvLyAtMTgwIDo6IDE4MFxuXG4gICAgLy8gRGV0ZWN0IE9yaWVudGF0aW9uIENoYW5nZVxuICAgIGxldCBwb3J0cmFpdCA9IHRoaXMud2luZG93SGVpZ2h0ID4gdGhpcy53aW5kb3dXaWR0aFxuICAgIGlmICh0aGlzLnBvcnRyYWl0ICE9PSBwb3J0cmFpdCkge1xuICAgICAgdGhpcy5wb3J0cmFpdCA9IHBvcnRyYWl0XG4gICAgICB0aGlzLmNhbGlicmF0aW9uRmxhZyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYWxpYnJhdGlvbkZsYWcpIHtcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25GbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25YID0geFxuICAgICAgdGhpcy5jYWxpYnJhdGlvblkgPSB5XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dFggPSB4XG4gICAgdGhpcy5pbnB1dFkgPSB5XG4gIH1cblxuICBvbkRldmljZU9yaWVudGF0aW9uKGV2ZW50KSB7XG4gICAgbGV0IGJldGEgPSBldmVudC5iZXRhXG4gICAgbGV0IGdhbW1hID0gZXZlbnQuZ2FtbWFcbiAgICBpZiAoYmV0YSAhPT0gbnVsbCAmJiBnYW1tYSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5vcmllbnRhdGlvblN0YXR1cyA9IDFcbiAgICAgIHRoaXMucm90YXRlKGJldGEsIGdhbW1hKVxuICAgIH1cbiAgfVxuXG4gIG9uRGV2aWNlTW90aW9uKGV2ZW50KSB7XG4gICAgbGV0IGJldGEgPSBldmVudC5yb3RhdGlvblJhdGUuYmV0YVxuICAgIGxldCBnYW1tYSA9IGV2ZW50LnJvdGF0aW9uUmF0ZS5nYW1tYVxuICAgIGlmIChiZXRhICE9PSBudWxsICYmIGdhbW1hICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm1vdGlvblN0YXR1cyA9IDFcbiAgICAgIHRoaXMucm90YXRlKGJldGEsIGdhbW1hKVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgbGV0IGNsaWVudFggPSBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZID0gZXZlbnQuY2xpZW50WVxuXG4gICAgLy8gcmVzZXQgaW5wdXQgdG8gY2VudGVyIGlmIGhvdmVyT25seSBpcyBzZXQgYW5kIHdlJ3JlIG5vdCBob3ZlcmluZyB0aGUgZWxlbWVudFxuICAgIGlmKHRoaXMuaG92ZXJPbmx5ICYmXG4gICAgICAoKGNsaWVudFggPCB0aGlzLmVsZW1lbnRQb3NpdGlvblggfHwgY2xpZW50WCA+IHRoaXMuZWxlbWVudFBvc2l0aW9uWCArIHRoaXMuZWxlbWVudFdpZHRoKSB8fFxuICAgICAgKGNsaWVudFkgPCB0aGlzLmVsZW1lbnRQb3NpdGlvblkgfHwgY2xpZW50WSA+IHRoaXMuZWxlbWVudFBvc2l0aW9uWSArIHRoaXMuZWxlbWVudEhlaWdodCkpKSB7XG4gICAgICAgIHRoaXMuaW5wdXRYID0gMFxuICAgICAgICB0aGlzLmlucHV0WSA9IDBcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICBpZiAodGhpcy5yZWxhdGl2ZUlucHV0KSB7XG4gICAgICAvLyBDbGlwIG1vdXNlIGNvb3JkaW5hdGVzIGluc2lkZSBlbGVtZW50IGJvdW5kcy5cbiAgICAgIGlmICh0aGlzLmNsaXBSZWxhdGl2ZUlucHV0KSB7XG4gICAgICAgIGNsaWVudFggPSBNYXRoLm1heChjbGllbnRYLCB0aGlzLmVsZW1lbnRQb3NpdGlvblgpXG4gICAgICAgIGNsaWVudFggPSBNYXRoLm1pbihjbGllbnRYLCB0aGlzLmVsZW1lbnRQb3NpdGlvblggKyB0aGlzLmVsZW1lbnRXaWR0aClcbiAgICAgICAgY2xpZW50WSA9IE1hdGgubWF4KGNsaWVudFksIHRoaXMuZWxlbWVudFBvc2l0aW9uWSlcbiAgICAgICAgY2xpZW50WSA9IE1hdGgubWluKGNsaWVudFksIHRoaXMuZWxlbWVudFBvc2l0aW9uWSArIHRoaXMuZWxlbWVudEhlaWdodClcbiAgICAgIH1cbiAgICAgIC8vIENhbGN1bGF0ZSBpbnB1dCByZWxhdGl2ZSB0byB0aGUgZWxlbWVudC5cbiAgICAgIGlmKHRoaXMuZWxlbWVudFJhbmdlWCAmJiB0aGlzLmVsZW1lbnRSYW5nZVkpIHtcbiAgICAgICAgdGhpcy5pbnB1dFggPSAoY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uWCAtIHRoaXMuZWxlbWVudENlbnRlclgpIC8gdGhpcy5lbGVtZW50UmFuZ2VYXG4gICAgICAgIHRoaXMuaW5wdXRZID0gKGNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvblkgLSB0aGlzLmVsZW1lbnRDZW50ZXJZKSAvIHRoaXMuZWxlbWVudFJhbmdlWVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDYWxjdWxhdGUgaW5wdXQgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cbiAgICAgIGlmKHRoaXMud2luZG93UmFkaXVzWCAmJiB0aGlzLndpbmRvd1JhZGl1c1kpIHtcbiAgICAgICAgdGhpcy5pbnB1dFggPSAoY2xpZW50WCAtIHRoaXMud2luZG93Q2VudGVyWCkgLyB0aGlzLndpbmRvd1JhZGl1c1hcbiAgICAgICAgdGhpcy5pbnB1dFkgPSAoY2xpZW50WSAtIHRoaXMud2luZG93Q2VudGVyWSkgLyB0aGlzLndpbmRvd1JhZGl1c1lcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzYWJsZSgpXG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5jYWxpYnJhdGlvblRpbWVyKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmRldGVjdGlvblRpbWVyKVxuXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMubGF5ZXJzW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5lbGVtZW50XG4gICAgZGVsZXRlIHRoaXMubGF5ZXJzXG4gIH1cblxuICB2ZXJzaW9uKCkge1xuICAgIHJldHVybiAnMy4xLjAnXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcmFsbGF4XG4iXX0=
},{"object-assign":2,"raf":4}]},{},[5])