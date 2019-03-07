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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZjA3ZDMwYTcuanMiXSwibmFtZXMiOlsicnFBbkZyIiwicmVxdWlyZSIsIm9iamVjdEFzc2lnbiIsImhlbHBlcnMiLCJwcm9wZXJ0eUNhY2hlIiwidmVuZG9ycyIsImNsYW1wIiwibWluIiwidmFsdWUiLCJkYXRhIiwiZWxlbWVudCIsImRlc2VyaWFsaXplIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJjYW1lbENhc2UiLCJjaGFyYWN0ZXIiLCJhY2NlbGVyYXRlIiwidHJhbnNmb3JtU3VwcG9ydCIsImRvY3VtZW50IiwicHJvcGVydHlTdXBwb3J0IiwicHJvcGVydHlWYWx1ZSIsImZlYXR1cmVTdXBwb3J0IiwiY3NzUHJvcGVydHkiLCJqc1Byb3BlcnR5IiwiaSIsImwiLCJib2R5IiwiZG9jdW1lbnRFbGVtZW50IiwiZG9jdW1lbnRPdmVyZmxvdyIsImlzQ3JlYXRlZEJvZHkiLCJ3aW5kb3ciLCJjc3MiLCJNQUdJQ19OVU1CRVIiLCJERUZBVUxUUyIsInJlbGF0aXZlSW5wdXQiLCJjbGlwUmVsYXRpdmVJbnB1dCIsImlucHV0RWxlbWVudCIsImhvdmVyT25seSIsImNhbGlicmF0aW9uVGhyZXNob2xkIiwiY2FsaWJyYXRpb25EZWxheSIsInN1cHBvcnREZWxheSIsImNhbGlicmF0ZVgiLCJjYWxpYnJhdGVZIiwiaW52ZXJ0WCIsImludmVydFkiLCJsaW1pdFgiLCJsaW1pdFkiLCJzY2FsYXJYIiwic2NhbGFyWSIsImZyaWN0aW9uWCIsImZyaWN0aW9uWSIsIm9yaWdpblgiLCJvcmlnaW5ZIiwicG9pbnRlckV2ZW50cyIsInByZWNpc2lvbiIsIm9uUmVhZHkiLCJzZWxlY3RvciIsImNvbnN0cnVjdG9yIiwibmF2aWdhdG9yIiwic3R5bGUiLCJjb25zb2xlIiwiaW5kZXgiLCJsYXllciIsImRlcHRoIiwiTWF0aCIsInF1ZXVlQ2FsaWJyYXRpb24iLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsaWJyYXRlIiwieCIsInkiLCJpbnZlcnQiLCJmcmljdGlvbiIsInNjYWxhciIsImxpbWl0Iiwib3JpZ2luIiwic2V0SW5wdXRFbGVtZW50Iiwic2V0UG9zaXRpb24iLCJjYWxpYnJhdGVkSW5wdXRYIiwiY2FsaWJyYXRlZElucHV0WSIsImRlcHRoWCIsImRlcHRoWSIsInhPZmZzZXQiLCJ5T2Zmc2V0Iiwicm90YXRlIiwiYmV0YSIsImdhbW1hIiwicG9ydHJhaXQiLCJvbkRldmljZU9yaWVudGF0aW9uIiwiZXZlbnQiLCJvbkRldmljZU1vdGlvbiIsIm9uTW91c2VNb3ZlIiwiY2xpZW50WCIsImNsaWVudFkiLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBUUEsSUFBTUEsU0FBU0MsUUFBZixLQUFlQSxDQUFmO0FBQ0EsSUFBTUMsZUFBZUQsUUFBckIsZUFBcUJBLENBQXJCOztBQUVBLElBQU1FLFVBQVU7QUFDZEMsaUJBRGMsRUFBQTtBQUVkQyxXQUFTLENBQUEsSUFBQSxFQUFPLENBQUEsVUFBQSxFQUFQLFFBQU8sQ0FBUCxFQUE4QixDQUFBLE9BQUEsRUFBOUIsS0FBOEIsQ0FBOUIsRUFBK0MsQ0FBQSxLQUFBLEVBQS9DLEdBQStDLENBQS9DLEVBQTRELENBQUEsTUFBQSxFQUZ2RCxJQUV1RCxDQUE1RCxDQUZLOztBQUlkQyxPQUpjLGlCQUlkQSxLQUpjLEVBSWRBLEdBSmMsRUFJZEEsR0FKYyxFQUlTO0FBQ3JCLFdBQU9DLE1BQUFBLEdBQUFBLEdBQ0ZDLFFBQUFBLEdBQUFBLEdBQUFBLEdBQUFBLEdBQW9CQSxRQUFBQSxHQUFBQSxHQUFBQSxHQUFBQSxHQURsQkQsS0FBQUEsR0FFRkMsUUFBQUEsR0FBQUEsR0FBQUEsR0FBQUEsR0FBb0JBLFFBQUFBLEdBQUFBLEdBQUFBLEdBQUFBLEdBRnpCLEtBQUE7QUFMWSxHQUFBO0FBVWRDLE1BVmMsZ0JBVWRBLE9BVmMsRUFVZEEsSUFWYyxFQVVNO0FBQ2xCLFdBQU9OLFFBQUFBLFdBQUFBLENBQW9CTyxRQUFBQSxZQUFBQSxDQUFxQixVQUFoRCxJQUEyQkEs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QUNDLFVBQVUsS0FBWCxhQUFBLElBQWlDLEtBQS9DLGFBQUE7QUFDRDtBQUNGO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUEsT0FBQTs7QUFFQTNCLG1CQUFhLEtBQWJBLGdCQUFBQTtBQUNBQSxtQkFBYSxLQUFiQSxjQUFBQTs7QUFFQSxXQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsT0FBQTtBQUNBLFdBQUssSUFBSUwsUUFBVCxDQUFBLEVBQW9CQSxRQUFRLEtBQUEsTUFBQSxDQUE1QixNQUFBLEVBQUEsT0FBQSxFQUF5RDtBQUN2RCxhQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsZUFBQSxDQUFBLE9BQUE7QUFDRDs7QUFFRCxhQUFPLEtBQVAsT0FBQTtBQUNBLGFBQU8sS0FBUCxNQUFBO0FBQ0Q7Ozs4QkFFUztBQUNSLGFBQUEsT0FBQTtBQUNEOzs7Ozs7QUFJSGlDLE9BQUFBLE9BQUFBLEdBQUFBLFFBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiogUGFyYWxsYXguanNcclxuKiBAYXV0aG9yIE1hdHRoZXcgV2FnZXJmaWVsZCAtIEB3YWdlcmZpZWxkLCBSZW7DqSBSb3RoIC0gbWFpbEByZW5lcm90aC5vcmdcclxuKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIHBhcmFsbGF4IGVmZmVjdCBiZXR3ZWVuIGFuIGFycmF5IG9mIGxheWVycyxcclxuKiAgICAgICAgICAgICAgZHJpdmluZyB0aGUgbW90aW9uIGZyb20gdGhlIGd5cm9zY29wZSBvdXRwdXQgb2YgYSBzbWFydGRldmljZS5cclxuKiAgICAgICAgICAgICAgSWYgbm8gZ3lyb3Njb3BlIGlzIGF2YWlsYWJsZSwgdGhlIGN1cnNvciBwb3NpdGlvbiBpcyB1c2VkLlxyXG4qL1xyXG5cclxuY29uc3QgcnFBbkZyID0gcmVxdWlyZSgncmFmJylcclxuY29uc3Qgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXHJcblxyXG5jb25zdCBoZWxwZXJzID0ge1xyXG4gIHByb3BlcnR5Q2FjaGU6IHt9LFxyXG4gIHZlbmRvcnM6IFtudWxsLCBbJy13ZWJraXQtJywnd2Via2l0J10sIFsnLW1vei0nLCdNb3onXSwgWyctby0nLCdPJ10sIFsnLW1zLScsJ21zJ11dLFxyXG5cclxuICBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcclxuICAgIHJldHVybiBtaW4gPCBtYXhcclxuICAgICAgPyAodmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlKVxyXG4gICAgICA6ICh2YWx1ZSA8IG1heCA/IG1heCA6IHZhbHVlID4gbWluID8gbWluIDogdmFsdWUpXHJcbiAgfSxcclxuXHJcbiAgZGF0YShlbGVtZW50LCBuYW1lKSB7XHJcbiAgICByZXR1cm4gaGVscGVycy5kZXNlcmlhbGl6ZShlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS0nK25hbWUpKVxyXG4gIH0sXHJcblxyXG4gIGRlc2VyaWFsaXplKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdudWxsJykge1xyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfSBlbHNlIGlmICghaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNhbWVsQ2FzZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLy0rKC4pPy9nLCAobWF0Y2gsIGNoYXJhY3RlcikgPT4ge1xyXG4gICAgICByZXR1cm4gY2hhcmFjdGVyID8gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCkgOiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBhY2NlbGVyYXRlKGVsZW1lbnQpIHtcclxuICAgIGhlbHBlcnMuY3NzKGVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoMCwwLDApIHJvdGF0ZSgwLjAwMDFkZWcpJylcclxuICAgIGhlbHBlcnMuY3NzKGVsZW1lbnQsICd0cmFuc2Zvcm0tc3R5bGUnLCAncHJlc2VydmUtM2QnKVxyXG4gICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ2JhY2tmYWNlLXZpc2liaWxpdHknLCAnaGlkZGVuJylcclxuICB9LFxyXG5cclxuICB0cmFuc2Zvcm1TdXBwb3J0KHZhbHVlKSB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgIHByb3BlcnR5U3VwcG9ydCA9IGZhbHNlLFxyXG4gICAgICAgIHByb3BlcnR5VmFsdWUgPSBudWxsLFxyXG4gICAgICAgIGZlYXR1cmVTdXBwb3J0ID0gZmFsc2UsXHJcbiAgICAgICAgY3NzUHJvcGVydHkgPSBudWxsLFxyXG4gICAgICAgIGpzUHJvcGVydHkgPSBudWxsXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGhlbHBlcnMudmVuZG9ycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgaWYgKGhlbHBlcnMudmVuZG9yc1tpXSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNzc1Byb3BlcnR5ID0gaGVscGVycy52ZW5kb3JzW2ldWzBdICsgJ3RyYW5zZm9ybSdcclxuICAgICAgICBqc1Byb3BlcnR5ID0gaGVscGVycy52ZW5kb3JzW2ldWzFdICsgJ1RyYW5zZm9ybSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjc3NQcm9wZXJ0eSA9ICd0cmFuc2Zvcm0nXHJcbiAgICAgICAganNQcm9wZXJ0eSA9ICd0cmFuc2Zvcm0nXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVsZW1lbnQuc3R5bGVbanNQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHByb3BlcnR5U3VwcG9ydCA9IHRydWVcclxuICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzd2l0Y2godmFsdWUpIHtcclxuICAgICAgY2FzZSAnMkQnOlxyXG4gICAgICAgIGZlYXR1cmVTdXBwb3J0ID0gcHJvcGVydHlTdXBwb3J0XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAnM0QnOlxyXG4gICAgICAgIGlmIChwcm9wZXJ0eVN1cHBvcnQpIHtcclxuICAgICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gICAgICAgICAgICAgIGRvY3VtZW50T3ZlcmZsb3cgPSBkb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3csXHJcbiAgICAgICAgICAgICAgaXNDcmVhdGVkQm9keSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgIGlzQ3JlYXRlZEJvZHkgPSB0cnVlXHJcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXHJcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChib2R5KVxyXG4gICAgICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICAgICAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJydcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbiAgICAgICAgICBlbGVtZW50LnN0eWxlW2pzUHJvcGVydHldID0gJ3RyYW5zbGF0ZTNkKDFweCwxcHgsMXB4KSdcclxuICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKGNzc1Byb3BlcnR5KVxyXG4gICAgICAgICAgZmVhdHVyZVN1cHBvcnQgPSBwcm9wZXJ0eVZhbHVlICE9PSB1bmRlZmluZWQgJiYgcHJvcGVydHlWYWx1ZS5sZW5ndGggPiAwICYmIHByb3BlcnR5VmFsdWUgIT09ICdub25lJ1xyXG4gICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jdW1lbnRPdmVyZmxvd1xyXG4gICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KVxyXG5cclxuICAgICAgICAgIGlmICggaXNDcmVhdGVkQm9keSApIHtcclxuICAgICAgICAgICAgYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcclxuICAgICAgICAgICAgYm9keS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJvZHkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmVhdHVyZVN1cHBvcnRcclxuICB9LFxyXG5cclxuICBjc3MoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICBsZXQganNQcm9wZXJ0eSA9IGhlbHBlcnMucHJvcGVydHlDYWNoZVtwcm9wZXJ0eV1cclxuICAgIGlmICghanNQcm9wZXJ0eSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGhlbHBlcnMudmVuZG9ycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoaGVscGVycy52ZW5kb3JzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBqc1Byb3BlcnR5ID0gaGVscGVycy5jYW1lbENhc2UoaGVscGVycy52ZW5kb3JzW2ldWzFdICsgJy0nICsgcHJvcGVydHkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGpzUHJvcGVydHkgPSBwcm9wZXJ0eVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWxlbWVudC5zdHlsZVtqc1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBoZWxwZXJzLnByb3BlcnR5Q2FjaGVbcHJvcGVydHldID0ganNQcm9wZXJ0eVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsZW1lbnQuc3R5bGVbanNQcm9wZXJ0eV0gPSB2YWx1ZVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IE1BR0lDX05VTUJFUiA9IDMwLFxyXG4gICAgICBERUZBVUxUUyA9IHtcclxuICAgICAgICByZWxhdGl2ZUlucHV0OiBmYWxzZSxcclxuICAgICAgICBjbGlwUmVsYXRpdmVJbnB1dDogZmFsc2UsXHJcbiAgICAgICAgaW5wdXRFbGVtZW50OiBudWxsLFxyXG4gICAgICAgIGhvdmVyT25seTogZmFsc2UsXHJcbiAgICAgICAgY2FsaWJyYXRpb25UaHJlc2hvbGQ6IDEwMCxcclxuICAgICAgICBjYWxpYnJhdGlvbkRlbGF5OiA1MDAsXHJcbiAgICAgICAgc3VwcG9ydERlbGF5OiA1MDAsXHJcbiAgICAgICAgY2FsaWJyYXRlWDogZmFsc2UsXHJcbiAgICAgICAgY2FsaWJyYXRlWTogdHJ1ZSxcclxuICAgICAgICBpbnZlcnRYOiB0cnVlLFxyXG4gICAgICAgIGludmVydFk6IHRydWUsXHJcbiAgICAgICAgbGltaXRYOiBmYWxzZSxcclxuICAgICAgICBsaW1pdFk6IGZhbHNlLFxyXG4gICAgICAgIHNjYWxhclg6IDEwLjAsXHJcbiAgICAgICAgc2NhbGFyWTogMTAuMCxcclxuICAgICAgICBmcmljdGlvblg6IDAuMSxcclxuICAgICAgICBmcmljdGlvblk6IDAuMSxcclxuICAgICAgICBvcmlnaW5YOiAwLjUsXHJcbiAgICAgICAgb3JpZ2luWTogMC41LFxyXG4gICAgICAgIHBvaW50ZXJFdmVudHM6IGZhbHNlLFxyXG4gICAgICAgIHByZWNpc2lvbjogMSxcclxuICAgICAgICBvblJlYWR5OiBudWxsLFxyXG4gICAgICAgIHNlbGVjdG9yOiBudWxsXHJcbiAgICAgIH1cclxuXHJcbmNsYXNzIFBhcmFsbGF4IHtcclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIGNhbGlicmF0ZVg6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdjYWxpYnJhdGUteCcpLFxyXG4gICAgICBjYWxpYnJhdGVZOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnY2FsaWJyYXRlLXknKSxcclxuICAgICAgaW52ZXJ0WDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2ludmVydC14JyksXHJcbiAgICAgIGludmVydFk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdpbnZlcnQteScpLFxyXG4gICAgICBsaW1pdFg6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdsaW1pdC14JyksXHJcbiAgICAgIGxpbWl0WTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2xpbWl0LXknKSxcclxuICAgICAgc2NhbGFyWDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ3NjYWxhci14JyksXHJcbiAgICAgIHNjYWxhclk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdzY2FsYXIteScpLFxyXG4gICAgICBmcmljdGlvblg6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdmcmljdGlvbi14JyksXHJcbiAgICAgIGZyaWN0aW9uWTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2ZyaWN0aW9uLXknKSxcclxuICAgICAgb3JpZ2luWDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ29yaWdpbi14JyksXHJcbiAgICAgIG9yaWdpblk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdvcmlnaW4teScpLFxyXG4gICAgICBwb2ludGVyRXZlbnRzOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAncG9pbnRlci1ldmVudHMnKSxcclxuICAgICAgcHJlY2lzaW9uOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAncHJlY2lzaW9uJyksXHJcbiAgICAgIHJlbGF0aXZlSW5wdXQ6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdyZWxhdGl2ZS1pbnB1dCcpLFxyXG4gICAgICBjbGlwUmVsYXRpdmVJbnB1dDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2NsaXAtcmVsYXRpdmUtaW5wdXQnKSxcclxuICAgICAgaG92ZXJPbmx5OiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnaG92ZXItb25seScpLFxyXG4gICAgICBpbnB1dEVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2lucHV0LWVsZW1lbnQnKSksXHJcbiAgICAgIHNlbGVjdG9yOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnc2VsZWN0b3InKVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhW2tleV0gPT09IG51bGwpIHtcclxuICAgICAgICBkZWxldGUgZGF0YVtrZXldXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvYmplY3RBc3NpZ24odGhpcywgREVGQVVMVFMsIGRhdGEsIG9wdGlvbnMpXHJcblxyXG4gICAgaWYoIXRoaXMuaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYWxpYnJhdGlvblRpbWVyID0gbnVsbFxyXG4gICAgdGhpcy5jYWxpYnJhdGlvbkZsYWcgPSB0cnVlXHJcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5kZXB0aHNYID0gW11cclxuICAgIHRoaXMuZGVwdGhzWSA9IFtdXHJcbiAgICB0aGlzLnJhZiA9IG51bGxcclxuXHJcbiAgICB0aGlzLmJvdW5kcyA9IG51bGxcclxuICAgIHRoaXMuZWxlbWVudFBvc2l0aW9uWCA9IDBcclxuICAgIHRoaXMuZWxlbWVudFBvc2l0aW9uWSA9IDBcclxuICAgIHRoaXMuZWxlbWVudFdpZHRoID0gMFxyXG4gICAgdGhpcy5lbGVtZW50SGVpZ2h0ID0gMFxyXG5cclxuICAgIHRoaXMuZWxlbWVudENlbnRlclggPSAwXHJcbiAgICB0aGlzLmVsZW1lbnRDZW50ZXJZID0gMFxyXG5cclxuICAgIHRoaXMuZWxlbWVudFJhbmdlWCA9IDBcclxuICAgIHRoaXMuZWxlbWVudFJhbmdlWSA9IDBcclxuXHJcbiAgICB0aGlzLmNhbGlicmF0aW9uWCA9IDBcclxuICAgIHRoaXMuY2FsaWJyYXRpb25ZID0gMFxyXG5cclxuICAgIHRoaXMuaW5wdXRYID0gMFxyXG4gICAgdGhpcy5pbnB1dFkgPSAwXHJcblxyXG4gICAgdGhpcy5tb3Rpb25YID0gMFxyXG4gICAgdGhpcy5tb3Rpb25ZID0gMFxyXG5cclxuICAgIHRoaXMudmVsb2NpdHlYID0gMFxyXG4gICAgdGhpcy52ZWxvY2l0eVkgPSAwXHJcblxyXG4gICAgdGhpcy5vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uID0gdGhpcy5vbkRldmljZU9yaWVudGF0aW9uLmJpbmQodGhpcylcclxuICAgIHRoaXMub25EZXZpY2VNb3Rpb24gPSB0aGlzLm9uRGV2aWNlTW90aW9uLmJpbmQodGhpcylcclxuICAgIHRoaXMub25PcmllbnRhdGlvblRpbWVyID0gdGhpcy5vbk9yaWVudGF0aW9uVGltZXIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbk1vdGlvblRpbWVyID0gdGhpcy5vbk1vdGlvblRpbWVyLmJpbmQodGhpcylcclxuICAgIHRoaXMub25DYWxpYnJhdGlvblRpbWVyID0gdGhpcy5vbkNhbGlicmF0aW9uVGltZXIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbkFuaW1hdGlvbkZyYW1lID0gdGhpcy5vbkFuaW1hdGlvbkZyYW1lLmJpbmQodGhpcylcclxuICAgIHRoaXMub25XaW5kb3dSZXNpemUgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcylcclxuXHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gbnVsbFxyXG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSBudWxsXHJcbiAgICB0aGlzLndpbmRvd0NlbnRlclggPSBudWxsXHJcbiAgICB0aGlzLndpbmRvd0NlbnRlclkgPSBudWxsXHJcbiAgICB0aGlzLndpbmRvd1JhZGl1c1ggPSBudWxsXHJcbiAgICB0aGlzLndpbmRvd1JhZGl1c1kgPSBudWxsXHJcbiAgICB0aGlzLnBvcnRyYWl0ID0gZmFsc2VcclxuICAgIHRoaXMuZGVza3RvcCA9ICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBob25lfGlQb2R8aVBhZHxBbmRyb2lkfEJsYWNrQmVycnl8QkIxMHxtb2JpfHRhYmxldHxvcGVyYSBtaW5pfG5leHVzIDcpL2kpXHJcbiAgICB0aGlzLm1vdGlvblN1cHBvcnQgPSAhIXdpbmRvdy5EZXZpY2VNb3Rpb25FdmVudCAmJiAhdGhpcy5kZXNrdG9wXHJcbiAgICB0aGlzLm9yaWVudGF0aW9uU3VwcG9ydCA9ICEhd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQgJiYgIXRoaXMuZGVza3RvcFxyXG4gICAgdGhpcy5vcmllbnRhdGlvblN0YXR1cyA9IDBcclxuICAgIHRoaXMubW90aW9uU3RhdHVzID0gMFxyXG5cclxuICAgIHRoaXMuaW5pdGlhbGlzZSgpXHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKCkge1xyXG4gICAgaWYgKHRoaXMudHJhbnNmb3JtMkRTdXBwb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy50cmFuc2Zvcm0yRFN1cHBvcnQgPSBoZWxwZXJzLnRyYW5zZm9ybVN1cHBvcnQoJzJEJylcclxuICAgICAgdGhpcy50cmFuc2Zvcm0zRFN1cHBvcnQgPSBoZWxwZXJzLnRyYW5zZm9ybVN1cHBvcnQoJzNEJylcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb25maWd1cmUgQ29udGV4dCBTdHlsZXNcclxuICAgIGlmICh0aGlzLnRyYW5zZm9ybTNEU3VwcG9ydCkge1xyXG4gICAgICBoZWxwZXJzLmFjY2VsZXJhdGUodGhpcy5lbGVtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudClcclxuICAgIGlmIChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUG9pbnRlciBldmVudHNcclxuICAgIGlmKCF0aGlzLnBvaW50ZXJFdmVudHMpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSdcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXR1cFxyXG4gICAgdGhpcy51cGRhdGVMYXllcnMoKVxyXG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKClcclxuICAgIHRoaXMuZW5hYmxlKClcclxuICAgIHRoaXMucXVldWVDYWxpYnJhdGlvbih0aGlzLmNhbGlicmF0aW9uRGVsYXkpXHJcbiAgfVxyXG5cclxuICBkb1JlYWR5Q2FsbGJhY2soKSB7XHJcbiAgICBpZih0aGlzLm9uUmVhZHkpIHtcclxuICAgICAgdGhpcy5vblJlYWR5KClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUxheWVycygpIHtcclxuICAgIGlmKHRoaXMuc2VsZWN0b3IpIHtcclxuICAgICAgdGhpcy5sYXllcnMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllcnMgPSB0aGlzLmVsZW1lbnQuY2hpbGRyZW5cclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy5sYXllcnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignUGFyYWxsYXhKUzogWW91ciBzY2VuZSBkb2VzIG5vdCBoYXZlIGFueSBsYXllcnMuJylcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlcHRoc1ggPSBbXVxyXG4gICAgdGhpcy5kZXB0aHNZID0gW11cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGxldCBsYXllciA9IHRoaXMubGF5ZXJzW2luZGV4XVxyXG5cclxuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtM0RTdXBwb3J0KSB7XHJcbiAgICAgICAgaGVscGVycy5hY2NlbGVyYXRlKGxheWVyKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBsYXllci5zdHlsZS5wb3NpdGlvbiA9IGluZGV4ID8gJ2Fic29sdXRlJyA6ICdyZWxhdGl2ZSdcclxuICAgICAgbGF5ZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgbGF5ZXIuc3R5bGUubGVmdCA9IDBcclxuICAgICAgbGF5ZXIuc3R5bGUudG9wID0gMFxyXG5cclxuICAgICAgbGV0IGRlcHRoID0gaGVscGVycy5kYXRhKGxheWVyLCAnZGVwdGgnKSB8fCAwXHJcbiAgICAgIHRoaXMuZGVwdGhzWC5wdXNoKGhlbHBlcnMuZGF0YShsYXllciwgJ2RlcHRoLXgnKSB8fCBkZXB0aClcclxuICAgICAgdGhpcy5kZXB0aHNZLnB1c2goaGVscGVycy5kYXRhKGxheWVyLCAnZGVwdGgteScpIHx8IGRlcHRoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGltZW5zaW9ucygpIHtcclxuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxyXG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIHRoaXMud2luZG93Q2VudGVyWCA9IHRoaXMud2luZG93V2lkdGggKiB0aGlzLm9yaWdpblhcclxuICAgIHRoaXMud2luZG93Q2VudGVyWSA9IHRoaXMud2luZG93SGVpZ2h0ICogdGhpcy5vcmlnaW5ZXHJcbiAgICB0aGlzLndpbmRvd1JhZGl1c1ggPSBNYXRoLm1heCh0aGlzLndpbmRvd0NlbnRlclgsIHRoaXMud2luZG93V2lkdGggLSB0aGlzLndpbmRvd0NlbnRlclgpXHJcbiAgICB0aGlzLndpbmRvd1JhZGl1c1kgPSBNYXRoLm1heCh0aGlzLndpbmRvd0NlbnRlclksIHRoaXMud2luZG93SGVpZ2h0IC0gdGhpcy53aW5kb3dDZW50ZXJZKVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlQm91bmRzKCkge1xyXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmlucHV0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgdGhpcy5lbGVtZW50UG9zaXRpb25YID0gdGhpcy5ib3VuZHMubGVmdFxyXG4gICAgdGhpcy5lbGVtZW50UG9zaXRpb25ZID0gdGhpcy5ib3VuZHMudG9wXHJcbiAgICB0aGlzLmVsZW1lbnRXaWR0aCA9IHRoaXMuYm91bmRzLndpZHRoXHJcbiAgICB0aGlzLmVsZW1lbnRIZWlnaHQgPSB0aGlzLmJvdW5kcy5oZWlnaHRcclxuICAgIHRoaXMuZWxlbWVudENlbnRlclggPSB0aGlzLmVsZW1lbnRXaWR0aCAqIHRoaXMub3JpZ2luWFxyXG4gICAgdGhpcy5lbGVtZW50Q2VudGVyWSA9IHRoaXMuZWxlbWVudEhlaWdodCAqIHRoaXMub3JpZ2luWVxyXG4gICAgdGhpcy5lbGVtZW50UmFuZ2VYID0gTWF0aC5tYXgodGhpcy5lbGVtZW50Q2VudGVyWCwgdGhpcy5lbGVtZW50V2lkdGggLSB0aGlzLmVsZW1lbnRDZW50ZXJYKVxyXG4gICAgdGhpcy5lbGVtZW50UmFuZ2VZID0gTWF0aC5tYXgodGhpcy5lbGVtZW50Q2VudGVyWSwgdGhpcy5lbGVtZW50SGVpZ2h0IC0gdGhpcy5lbGVtZW50Q2VudGVyWSlcclxuICB9XHJcblxyXG4gIHF1ZXVlQ2FsaWJyYXRpb24oZGVsYXkpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmNhbGlicmF0aW9uVGltZXIpXHJcbiAgICB0aGlzLmNhbGlicmF0aW9uVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMub25DYWxpYnJhdGlvblRpbWVyLCBkZWxheSlcclxuICB9XHJcblxyXG4gIGVuYWJsZSgpIHtcclxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb25TdXBwb3J0KSB7XHJcbiAgICAgIHRoaXMucG9ydHJhaXQgPSBmYWxzZVxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb24pXHJcbiAgICAgIHRoaXMuZGV0ZWN0aW9uVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMub25PcmllbnRhdGlvblRpbWVyLCB0aGlzLnN1cHBvcnREZWxheSlcclxuICAgIH0gZWxzZSBpZiAodGhpcy5tb3Rpb25TdXBwb3J0KSB7XHJcbiAgICAgIHRoaXMucG9ydHJhaXQgPSBmYWxzZVxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlbW90aW9uJywgdGhpcy5vbkRldmljZU1vdGlvbilcclxuICAgICAgdGhpcy5kZXRlY3Rpb25UaW1lciA9IHNldFRpbWVvdXQodGhpcy5vbk1vdGlvblRpbWVyLCB0aGlzLnN1cHBvcnREZWxheSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25YID0gMFxyXG4gICAgICB0aGlzLmNhbGlicmF0aW9uWSA9IDBcclxuICAgICAgdGhpcy5wb3J0cmFpdCA9IGZhbHNlXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKVxyXG4gICAgICB0aGlzLmRvUmVhZHlDYWxsYmFjaygpXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpXHJcbiAgICB0aGlzLnJhZiA9IHJxQW5Gcih0aGlzLm9uQW5pbWF0aW9uRnJhbWUpXHJcbiAgfVxyXG5cclxuICBkaXNhYmxlKCkge1xyXG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uU3VwcG9ydCkge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb24pXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubW90aW9uU3VwcG9ydCkge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlbW90aW9uJywgdGhpcy5vbkRldmljZU1vdGlvbilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplKVxyXG4gICAgcnFBbkZyLmNhbmNlbCh0aGlzLnJhZilcclxuICB9XHJcblxyXG4gIGNhbGlicmF0ZSh4LCB5KSB7XHJcbiAgICB0aGlzLmNhbGlicmF0ZVggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLmNhbGlicmF0ZVggOiB4XHJcbiAgICB0aGlzLmNhbGlicmF0ZVkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmNhbGlicmF0ZVkgOiB5XHJcbiAgfVxyXG5cclxuICBpbnZlcnQoeCwgeSkge1xyXG4gICAgdGhpcy5pbnZlcnRYID0geCA9PT0gdW5kZWZpbmVkID8gdGhpcy5pbnZlcnRYIDogeFxyXG4gICAgdGhpcy5pbnZlcnRZID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy5pbnZlcnRZIDogeVxyXG4gIH1cclxuXHJcbiAgZnJpY3Rpb24oeCwgeSkge1xyXG4gICAgdGhpcy5mcmljdGlvblggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLmZyaWN0aW9uWCA6IHhcclxuICAgIHRoaXMuZnJpY3Rpb25ZID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy5mcmljdGlvblkgOiB5XHJcbiAgfVxyXG5cclxuICBzY2FsYXIoeCwgeSkge1xyXG4gICAgdGhpcy5zY2FsYXJYID0geCA9PT0gdW5kZWZpbmVkID8gdGhpcy5zY2FsYXJYIDogeFxyXG4gICAgdGhpcy5zY2FsYXJZID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy5zY2FsYXJZIDogeVxyXG4gIH1cclxuXHJcbiAgbGltaXQoeCwgeSkge1xyXG4gICAgdGhpcy5saW1pdFggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLmxpbWl0WCA6IHhcclxuICAgIHRoaXMubGltaXRZID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy5saW1pdFkgOiB5XHJcbiAgfVxyXG5cclxuICBvcmlnaW4oeCwgeSkge1xyXG4gICAgdGhpcy5vcmlnaW5YID0geCA9PT0gdW5kZWZpbmVkID8gdGhpcy5vcmlnaW5YIDogeFxyXG4gICAgdGhpcy5vcmlnaW5ZID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy5vcmlnaW5ZIDogeVxyXG4gIH1cclxuXHJcbiAgc2V0SW5wdXRFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gZWxlbWVudFxyXG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKClcclxuICB9XHJcblxyXG4gIHNldFBvc2l0aW9uKGVsZW1lbnQsIHgsIHkpIHtcclxuICAgIHggPSB4LnRvRml4ZWQodGhpcy5wcmVjaXNpb24pICsgJ3B4J1xyXG4gICAgeSA9IHkudG9GaXhlZCh0aGlzLnByZWNpc2lvbikgKyAncHgnXHJcbiAgICBpZiAodGhpcy50cmFuc2Zvcm0zRFN1cHBvcnQpIHtcclxuICAgICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgeCArICcsJyArIHkgKyAnLDApJylcclxuICAgIH0gZWxzZSBpZiAodGhpcy50cmFuc2Zvcm0yRFN1cHBvcnQpIHtcclxuICAgICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHggKyAnLCcgKyB5ICsgJyknKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0geFxyXG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uT3JpZW50YXRpb25UaW1lcigpIHtcclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uU3VwcG9ydCAmJiB0aGlzLm9yaWVudGF0aW9uU3RhdHVzID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSgpXHJcbiAgICAgIHRoaXMub3JpZW50YXRpb25TdXBwb3J0ID0gZmFsc2VcclxuICAgICAgdGhpcy5lbmFibGUoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kb1JlYWR5Q2FsbGJhY2soKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Nb3Rpb25UaW1lcigpIHtcclxuICAgIGlmICh0aGlzLm1vdGlvblN1cHBvcnQgJiYgdGhpcy5tb3Rpb25TdGF0dXMgPT09IDApIHtcclxuICAgICAgdGhpcy5kaXNhYmxlKClcclxuICAgICAgdGhpcy5tb3Rpb25TdXBwb3J0ID0gZmFsc2VcclxuICAgICAgdGhpcy5lbmFibGUoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kb1JlYWR5Q2FsbGJhY2soKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DYWxpYnJhdGlvblRpbWVyKCkge1xyXG4gICAgdGhpcy5jYWxpYnJhdGlvbkZsYWcgPSB0cnVlXHJcbiAgfVxyXG5cclxuICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpXHJcbiAgfVxyXG5cclxuICBvbkFuaW1hdGlvbkZyYW1lKCkge1xyXG4gICAgdGhpcy51cGRhdGVCb3VuZHMoKVxyXG4gICAgbGV0IGNhbGlicmF0ZWRJbnB1dFggPSB0aGlzLmlucHV0WCAtIHRoaXMuY2FsaWJyYXRpb25YLFxyXG4gICAgICAgIGNhbGlicmF0ZWRJbnB1dFkgPSB0aGlzLmlucHV0WSAtIHRoaXMuY2FsaWJyYXRpb25ZXHJcbiAgICBpZiAoKE1hdGguYWJzKGNhbGlicmF0ZWRJbnB1dFgpID4gdGhpcy5jYWxpYnJhdGlvblRocmVzaG9sZCkgfHwgKE1hdGguYWJzKGNhbGlicmF0ZWRJbnB1dFkpID4gdGhpcy5jYWxpYnJhdGlvblRocmVzaG9sZCkpIHtcclxuICAgICAgdGhpcy5xdWV1ZUNhbGlicmF0aW9uKDApXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wb3J0cmFpdCkge1xyXG4gICAgICB0aGlzLm1vdGlvblggPSB0aGlzLmNhbGlicmF0ZVggPyBjYWxpYnJhdGVkSW5wdXRZIDogdGhpcy5pbnB1dFlcclxuICAgICAgdGhpcy5tb3Rpb25ZID0gdGhpcy5jYWxpYnJhdGVZID8gY2FsaWJyYXRlZElucHV0WCA6IHRoaXMuaW5wdXRYXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vdGlvblggPSB0aGlzLmNhbGlicmF0ZVggPyBjYWxpYnJhdGVkSW5wdXRYIDogdGhpcy5pbnB1dFhcclxuICAgICAgdGhpcy5tb3Rpb25ZID0gdGhpcy5jYWxpYnJhdGVZID8gY2FsaWJyYXRlZElucHV0WSA6IHRoaXMuaW5wdXRZXHJcbiAgICB9XHJcbiAgICB0aGlzLm1vdGlvblggKj0gdGhpcy5lbGVtZW50V2lkdGggKiAodGhpcy5zY2FsYXJYIC8gMTAwKVxyXG4gICAgdGhpcy5tb3Rpb25ZICo9IHRoaXMuZWxlbWVudEhlaWdodCAqICh0aGlzLnNjYWxhclkgLyAxMDApXHJcbiAgICBpZiAoIWlzTmFOKHBhcnNlRmxvYXQodGhpcy5saW1pdFgpKSkge1xyXG4gICAgICB0aGlzLm1vdGlvblggPSBoZWxwZXJzLmNsYW1wKHRoaXMubW90aW9uWCwgLXRoaXMubGltaXRYLCB0aGlzLmxpbWl0WClcclxuICAgIH1cclxuICAgIGlmICghaXNOYU4ocGFyc2VGbG9hdCh0aGlzLmxpbWl0WSkpKSB7XHJcbiAgICAgIHRoaXMubW90aW9uWSA9IGhlbHBlcnMuY2xhbXAodGhpcy5tb3Rpb25ZLCAtdGhpcy5saW1pdFksIHRoaXMubGltaXRZKVxyXG4gICAgfVxyXG4gICAgdGhpcy52ZWxvY2l0eVggKz0gKHRoaXMubW90aW9uWCAtIHRoaXMudmVsb2NpdHlYKSAqIHRoaXMuZnJpY3Rpb25YXHJcbiAgICB0aGlzLnZlbG9jaXR5WSArPSAodGhpcy5tb3Rpb25ZIC0gdGhpcy52ZWxvY2l0eVkpICogdGhpcy5mcmljdGlvbllcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgbGV0IGxheWVyID0gdGhpcy5sYXllcnNbaW5kZXhdLFxyXG4gICAgICAgICAgZGVwdGhYID0gdGhpcy5kZXB0aHNYW2luZGV4XSxcclxuICAgICAgICAgIGRlcHRoWSA9IHRoaXMuZGVwdGhzWVtpbmRleF0sXHJcbiAgICAgICAgICB4T2Zmc2V0ID0gdGhpcy52ZWxvY2l0eVggKiAoZGVwdGhYICogKHRoaXMuaW52ZXJ0WCA/IC0xIDogMSkpLFxyXG4gICAgICAgICAgeU9mZnNldCA9IHRoaXMudmVsb2NpdHlZICogKGRlcHRoWSAqICh0aGlzLmludmVydFkgPyAtMSA6IDEpKVxyXG4gICAgICB0aGlzLnNldFBvc2l0aW9uKGxheWVyLCB4T2Zmc2V0LCB5T2Zmc2V0KVxyXG4gICAgfVxyXG4gICAgdGhpcy5yYWYgPSBycUFuRnIodGhpcy5vbkFuaW1hdGlvbkZyYW1lKVxyXG4gIH1cclxuXHJcbiAgcm90YXRlKGJldGEsIGdhbW1hKXtcclxuICAgIC8vIEV4dHJhY3QgUm90YXRpb25cclxuICAgIGxldCB4ID0gKGJldGEgfHwgMCkgLyBNQUdJQ19OVU1CRVIsIC8vICAtOTAgOjogOTBcclxuICAgICAgICB5ID0gKGdhbW1hIHx8IDApIC8gTUFHSUNfTlVNQkVSIC8vIC0xODAgOjogMTgwXHJcblxyXG4gICAgLy8gRGV0ZWN0IE9yaWVudGF0aW9uIENoYW5nZVxyXG4gICAgbGV0IHBvcnRyYWl0ID0gdGhpcy53aW5kb3dIZWlnaHQgPiB0aGlzLndpbmRvd1dpZHRoXHJcbiAgICBpZiAodGhpcy5wb3J0cmFpdCAhPT0gcG9ydHJhaXQpIHtcclxuICAgICAgdGhpcy5wb3J0cmFpdCA9IHBvcnRyYWl0XHJcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25GbGFnID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNhbGlicmF0aW9uRmxhZykge1xyXG4gICAgICB0aGlzLmNhbGlicmF0aW9uRmxhZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25YID0geFxyXG4gICAgICB0aGlzLmNhbGlicmF0aW9uWSA9IHlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0WCA9IHhcclxuICAgIHRoaXMuaW5wdXRZID0geVxyXG4gIH1cclxuXHJcbiAgb25EZXZpY2VPcmllbnRhdGlvbihldmVudCkge1xyXG4gICAgbGV0IGJldGEgPSBldmVudC5iZXRhXHJcbiAgICBsZXQgZ2FtbWEgPSBldmVudC5nYW1tYVxyXG4gICAgaWYgKGJldGEgIT09IG51bGwgJiYgZ2FtbWEgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvblN0YXR1cyA9IDFcclxuICAgICAgdGhpcy5yb3RhdGUoYmV0YSwgZ2FtbWEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRldmljZU1vdGlvbihldmVudCkge1xyXG4gICAgbGV0IGJldGEgPSBldmVudC5yb3RhdGlvblJhdGUuYmV0YVxyXG4gICAgbGV0IGdhbW1hID0gZXZlbnQucm90YXRpb25SYXRlLmdhbW1hXHJcbiAgICBpZiAoYmV0YSAhPT0gbnVsbCAmJiBnYW1tYSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm1vdGlvblN0YXR1cyA9IDFcclxuICAgICAgdGhpcy5yb3RhdGUoYmV0YSwgZ2FtbWEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlTW92ZShldmVudCkge1xyXG4gICAgbGV0IGNsaWVudFggPSBldmVudC5jbGllbnRYLFxyXG4gICAgICAgIGNsaWVudFkgPSBldmVudC5jbGllbnRZXHJcblxyXG4gICAgLy8gcmVzZXQgaW5wdXQgdG8gY2VudGVyIGlmIGhvdmVyT25seSBpcyBzZXQgYW5kIHdlJ3JlIG5vdCBob3ZlcmluZyB0aGUgZWxlbWVudFxyXG4gICAgaWYodGhpcy5ob3Zlck9ubHkgJiZcclxuICAgICAgKChjbGllbnRYIDwgdGhpcy5lbGVtZW50UG9zaXRpb25YIHx8IGNsaWVudFggPiB0aGlzLmVsZW1lbnRQb3NpdGlvblggKyB0aGlzLmVsZW1lbnRXaWR0aCkgfHxcclxuICAgICAgKGNsaWVudFkgPCB0aGlzLmVsZW1lbnRQb3NpdGlvblkgfHwgY2xpZW50WSA+IHRoaXMuZWxlbWVudFBvc2l0aW9uWSArIHRoaXMuZWxlbWVudEhlaWdodCkpKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFggPSAwXHJcbiAgICAgICAgdGhpcy5pbnB1dFkgPSAwXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yZWxhdGl2ZUlucHV0KSB7XHJcbiAgICAgIC8vIENsaXAgbW91c2UgY29vcmRpbmF0ZXMgaW5zaWRlIGVsZW1lbnQgYm91bmRzLlxyXG4gICAgICBpZiAodGhpcy5jbGlwUmVsYXRpdmVJbnB1dCkge1xyXG4gICAgICAgIGNsaWVudFggPSBNYXRoLm1heChjbGllbnRYLCB0aGlzLmVsZW1lbnRQb3NpdGlvblgpXHJcbiAgICAgICAgY2xpZW50WCA9IE1hdGgubWluKGNsaWVudFgsIHRoaXMuZWxlbWVudFBvc2l0aW9uWCArIHRoaXMuZWxlbWVudFdpZHRoKVxyXG4gICAgICAgIGNsaWVudFkgPSBNYXRoLm1heChjbGllbnRZLCB0aGlzLmVsZW1lbnRQb3NpdGlvblkpXHJcbiAgICAgICAgY2xpZW50WSA9IE1hdGgubWluKGNsaWVudFksIHRoaXMuZWxlbWVudFBvc2l0aW9uWSArIHRoaXMuZWxlbWVudEhlaWdodClcclxuICAgICAgfVxyXG4gICAgICAvLyBDYWxjdWxhdGUgaW5wdXQgcmVsYXRpdmUgdG8gdGhlIGVsZW1lbnQuXHJcbiAgICAgIGlmKHRoaXMuZWxlbWVudFJhbmdlWCAmJiB0aGlzLmVsZW1lbnRSYW5nZVkpIHtcclxuICAgICAgICB0aGlzLmlucHV0WCA9IChjbGllbnRYIC0gdGhpcy5lbGVtZW50UG9zaXRpb25YIC0gdGhpcy5lbGVtZW50Q2VudGVyWCkgLyB0aGlzLmVsZW1lbnRSYW5nZVhcclxuICAgICAgICB0aGlzLmlucHV0WSA9IChjbGllbnRZIC0gdGhpcy5lbGVtZW50UG9zaXRpb25ZIC0gdGhpcy5lbGVtZW50Q2VudGVyWSkgLyB0aGlzLmVsZW1lbnRSYW5nZVlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2FsY3VsYXRlIGlucHV0IHJlbGF0aXZlIHRvIHRoZSB3aW5kb3cuXHJcbiAgICAgIGlmKHRoaXMud2luZG93UmFkaXVzWCAmJiB0aGlzLndpbmRvd1JhZGl1c1kpIHtcclxuICAgICAgICB0aGlzLmlucHV0WCA9IChjbGllbnRYIC0gdGhpcy53aW5kb3dDZW50ZXJYKSAvIHRoaXMud2luZG93UmFkaXVzWFxyXG4gICAgICAgIHRoaXMuaW5wdXRZID0gKGNsaWVudFkgLSB0aGlzLndpbmRvd0NlbnRlclkpIC8gdGhpcy53aW5kb3dSYWRpdXNZXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRpc2FibGUoKVxyXG5cclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmNhbGlicmF0aW9uVGltZXIpXHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5kZXRlY3Rpb25UaW1lcilcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgdGhpcy5lbGVtZW50XHJcbiAgICBkZWxldGUgdGhpcy5sYXllcnNcclxuICB9XHJcblxyXG4gIHZlcnNpb24oKSB7XHJcbiAgICByZXR1cm4gJzMuMS4wJ1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYWxsYXhcclxuIl19
},{"object-assign":2,"raf":4}]},{},[5])