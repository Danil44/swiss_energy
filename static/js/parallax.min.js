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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNWU5NzcyYy5qcyJdLCJuYW1lcyI6WyJycUFuRnIiLCJyZXF1aXJlIiwib2JqZWN0QXNzaWduIiwiaGVscGVycyIsInByb3BlcnR5Q2FjaGUiLCJ2ZW5kb3JzIiwiY2xhbXAiLCJtaW4iLCJ2YWx1ZSIsImRhdGEiLCJlbGVtZW50IiwiZGVzZXJpYWxpemUiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpc0Zpbml0ZSIsImNhbWVsQ2FzZSIsImNoYXJhY3RlciIsImFjY2VsZXJhdGUiLCJ0cmFuc2Zvcm1TdXBwb3J0IiwiZG9jdW1lbnQiLCJwcm9wZXJ0eVN1cHBvcnQiLCJwcm9wZXJ0eVZhbHVlIiwiZmVhdHVyZVN1cHBvcnQiLCJjc3NQcm9wZXJ0eSIsImpzUHJvcGVydHkiLCJpIiwibCIsImJvZHkiLCJkb2N1bWVudEVsZW1lbnQiLCJkb2N1bWVudE92ZXJmbG93IiwiaXNDcmVhdGVkQm9keSIsIndpbmRvdyIsImNzcyIsIk1BR0lDX05VTUJFUiIsIkRFRkFVTFRTIiwicmVsYXRpdmVJbnB1dCIsImNsaXBSZWxhdGl2ZUlucHV0IiwiaW5wdXRFbGVtZW50IiwiaG92ZXJPbmx5IiwiY2FsaWJyYXRpb25UaHJlc2hvbGQiLCJjYWxpYnJhdGlvbkRlbGF5Iiwic3VwcG9ydERlbGF5IiwiY2FsaWJyYXRlWCIsImNhbGlicmF0ZVkiLCJpbnZlcnRYIiwiaW52ZXJ0WSIsImxpbWl0WCIsImxpbWl0WSIsInNjYWxhclgiLCJzY2FsYXJZIiwiZnJpY3Rpb25YIiwiZnJpY3Rpb25ZIiwib3JpZ2luWCIsIm9yaWdpblkiLCJwb2ludGVyRXZlbnRzIiwicHJlY2lzaW9uIiwib25SZWFkeSIsInNlbGVjdG9yIiwiY29uc3RydWN0b3IiLCJuYXZpZ2F0b3IiLCJzdHlsZSIsImNvbnNvbGUiLCJpbmRleCIsImxheWVyIiwiZGVwdGgiLCJNYXRoIiwicXVldWVDYWxpYnJhdGlvbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJjYWxpYnJhdGUiLCJ4IiwieSIsImludmVydCIsImZyaWN0aW9uIiwic2NhbGFyIiwibGltaXQiLCJvcmlnaW4iLCJzZXRJbnB1dEVsZW1lbnQiLCJzZXRQb3NpdGlvbiIsImNhbGlicmF0ZWRJbnB1dFgiLCJjYWxpYnJhdGVkSW5wdXRZIiwiZGVwdGhYIiwiZGVwdGhZIiwieE9mZnNldCIsInlPZmZzZXQiLCJyb3RhdGUiLCJiZXRhIiwiZ2FtbWEiLCJwb3J0cmFpdCIsIm9uRGV2aWNlT3JpZW50YXRpb24iLCJldmVudCIsIm9uRGV2aWNlTW90aW9uIiwib25Nb3VzZU1vdmUiLCJjbGllbnRYIiwiY2xpZW50WSIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFRQSxJQUFNQSxTQUFTQyxRQUFmLEtBQWVBLENBQWY7QUFDQSxJQUFNQyxlQUFlRCxRQUFyQixlQUFxQkEsQ0FBckI7O0FBRUEsSUFBTUUsVUFBVTtBQUNkQyxpQkFEYyxFQUFBO0FBRWRDLFdBQVMsQ0FBQSxJQUFBLEVBQU8sQ0FBQSxVQUFBLEVBQVAsUUFBTyxDQUFQLEVBQThCLENBQUEsT0FBQSxFQUE5QixLQUE4QixDQUE5QixFQUErQyxDQUFBLEtBQUEsRUFBL0MsR0FBK0MsQ0FBL0MsRUFBNEQsQ0FBQSxNQUFBLEVBRnZELElBRXVELENBQTVELENBRks7O0FBSWRDLE9BSmMsaUJBSWRBLEtBSmMsRUFJZEEsR0FKYyxFQUlkQSxHQUpjLEVBSVM7QUFDckIsV0FBT0MsTUFBQUEsR0FBQUEsR0FDRkMsUUFBQUEsR0FBQUEsR0FBQUEsR0FBQUEsR0FBb0JBLFFBQUFBLEdBQUFBLEdBQUFBLEdBQUFBLEdBRGxCRCxLQUFBQSxHQUVGQyxRQUFBQSxHQUFBQSxHQUFBQSxHQUFBQSxHQUFvQkEsUUFBQUEsR0FBQUEsR0FBQUEsR0FBQUEsR0FGekIsS0FBQTtBQUxZLEdBQUE7QUFVZEMsTUFWYyxnQkFVZEEsT0FWYyxFQVVkQSxJQVZjLEVBVU07QUFDbEIsV0FBT04sUUFBQUEsV0FBQUEsQ0FBb0JPLFFBQUFBLFlBQUFBLENBQXFCLFVBQWhELElBQTJCQSxD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Q0MsVUFBVSxLQUFYLGFBQUEsSUFBaUMsS0FBL0MsYUFBQTtBQUNEO0FBQ0Y7QUFDRjs7OzhCQUVTO0FBQ1IsV0FBQSxPQUFBOztBQUVBM0IsbUJBQWEsS0FBYkEsZ0JBQUFBO0FBQ0FBLG1CQUFhLEtBQWJBLGNBQUFBOztBQUVBLFdBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQSxPQUFBO0FBQ0EsV0FBSyxJQUFJTCxRQUFULENBQUEsRUFBb0JBLFFBQVEsS0FBQSxNQUFBLENBQTVCLE1BQUEsRUFBQSxPQUFBLEVBQXlEO0FBQ3ZELGFBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxlQUFBLENBQUEsT0FBQTtBQUNEOztBQUVELGFBQU8sS0FBUCxPQUFBO0FBQ0EsYUFBTyxLQUFQLE1BQUE7QUFDRDs7OzhCQUVTO0FBQ1IsYUFBQSxPQUFBO0FBQ0Q7Ozs7OztBQUlIaUMsT0FBQUEsT0FBQUEsR0FBQUEsUUFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKiBQYXJhbGxheC5qc1xyXG4qIEBhdXRob3IgTWF0dGhldyBXYWdlcmZpZWxkIC0gQHdhZ2VyZmllbGQsIFJlbsOpIFJvdGggLSBtYWlsQHJlbmVyb3RoLm9yZ1xyXG4qIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgcGFyYWxsYXggZWZmZWN0IGJldHdlZW4gYW4gYXJyYXkgb2YgbGF5ZXJzLFxyXG4qICAgICAgICAgICAgICBkcml2aW5nIHRoZSBtb3Rpb24gZnJvbSB0aGUgZ3lyb3Njb3BlIG91dHB1dCBvZiBhIHNtYXJ0ZGV2aWNlLlxyXG4qICAgICAgICAgICAgICBJZiBubyBneXJvc2NvcGUgaXMgYXZhaWxhYmxlLCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIHVzZWQuXHJcbiovXHJcblxyXG5jb25zdCBycUFuRnIgPSByZXF1aXJlKCdyYWYnKVxyXG5jb25zdCBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcclxuXHJcbmNvbnN0IGhlbHBlcnMgPSB7XHJcbiAgcHJvcGVydHlDYWNoZToge30sXHJcbiAgdmVuZG9yczogW251bGwsIFsnLXdlYmtpdC0nLCd3ZWJraXQnXSwgWyctbW96LScsJ01veiddLCBbJy1vLScsJ08nXSwgWyctbXMtJywnbXMnXV0sXHJcblxyXG4gIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiA8IG1heFxyXG4gICAgICA/ICh2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWUpXHJcbiAgICAgIDogKHZhbHVlIDwgbWF4ID8gbWF4IDogdmFsdWUgPiBtaW4gPyBtaW4gOiB2YWx1ZSlcclxuICB9LFxyXG5cclxuICBkYXRhKGVsZW1lbnQsIG5hbWUpIHtcclxuICAgIHJldHVybiBoZWxwZXJzLmRlc2VyaWFsaXplKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLScrbmFtZSkpXHJcbiAgfSxcclxuXHJcbiAgZGVzZXJpYWxpemUodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ251bGwnKSB7XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9IGVsc2UgaWYgKCFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FtZWxDYXNlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLSsoLik/L2csIChtYXRjaCwgY2hhcmFjdGVyKSA9PiB7XHJcbiAgICAgIHJldHVybiBjaGFyYWN0ZXIgPyBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKSA6ICcnXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGFjY2VsZXJhdGUoZWxlbWVudCkge1xyXG4gICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgwLDAsMCkgcm90YXRlKDAuMDAwMWRlZyknKVxyXG4gICAgaGVscGVycy5jc3MoZWxlbWVudCwgJ3RyYW5zZm9ybS1zdHlsZScsICdwcmVzZXJ2ZS0zZCcpXHJcbiAgICBoZWxwZXJzLmNzcyhlbGVtZW50LCAnYmFja2ZhY2UtdmlzaWJpbGl0eScsICdoaWRkZW4nKVxyXG4gIH0sXHJcblxyXG4gIHRyYW5zZm9ybVN1cHBvcnQodmFsdWUpIHtcclxuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgcHJvcGVydHlTdXBwb3J0ID0gZmFsc2UsXHJcbiAgICAgICAgcHJvcGVydHlWYWx1ZSA9IG51bGwsXHJcbiAgICAgICAgZmVhdHVyZVN1cHBvcnQgPSBmYWxzZSxcclxuICAgICAgICBjc3NQcm9wZXJ0eSA9IG51bGwsXHJcbiAgICAgICAganNQcm9wZXJ0eSA9IG51bGxcclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gaGVscGVycy52ZW5kb3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBpZiAoaGVscGVycy52ZW5kb3JzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgICAgY3NzUHJvcGVydHkgPSBoZWxwZXJzLnZlbmRvcnNbaV1bMF0gKyAndHJhbnNmb3JtJ1xyXG4gICAgICAgIGpzUHJvcGVydHkgPSBoZWxwZXJzLnZlbmRvcnNbaV1bMV0gKyAnVHJhbnNmb3JtJ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNzc1Byb3BlcnR5ID0gJ3RyYW5zZm9ybSdcclxuICAgICAgICBqc1Byb3BlcnR5ID0gJ3RyYW5zZm9ybSdcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbWVudC5zdHlsZVtqc1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcHJvcGVydHlTdXBwb3J0ID0gdHJ1ZVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHN3aXRjaCh2YWx1ZSkge1xyXG4gICAgICBjYXNlICcyRCc6XHJcbiAgICAgICAgZmVhdHVyZVN1cHBvcnQgPSBwcm9wZXJ0eVN1cHBvcnRcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICczRCc6XHJcbiAgICAgICAgaWYgKHByb3BlcnR5U3VwcG9ydCkge1xyXG4gICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgZG9jdW1lbnRPdmVyZmxvdyA9IGRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyxcclxuICAgICAgICAgICAgICBpc0NyZWF0ZWRCb2R5ID0gZmFsc2VcclxuXHJcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgaXNDcmVhdGVkQm9keSA9IHRydWVcclxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGJvZHkpXHJcbiAgICAgICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG4gICAgICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmQgPSAnJ1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxuICAgICAgICAgIGVsZW1lbnQuc3R5bGVbanNQcm9wZXJ0eV0gPSAndHJhbnNsYXRlM2QoMXB4LDFweCwxcHgpJ1xyXG4gICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoY3NzUHJvcGVydHkpXHJcbiAgICAgICAgICBmZWF0dXJlU3VwcG9ydCA9IHByb3BlcnR5VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBwcm9wZXJ0eVZhbHVlLmxlbmd0aCA+IDAgJiYgcHJvcGVydHlWYWx1ZSAhPT0gJ25vbmUnXHJcbiAgICAgICAgICBkb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2N1bWVudE92ZXJmbG93XHJcbiAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpXHJcblxyXG4gICAgICAgICAgaWYgKCBpc0NyZWF0ZWRCb2R5ICkge1xyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxyXG4gICAgICAgICAgICBib2R5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYm9keSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlU3VwcG9ydFxyXG4gIH0sXHJcblxyXG4gIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIGxldCBqc1Byb3BlcnR5ID0gaGVscGVycy5wcm9wZXJ0eUNhY2hlW3Byb3BlcnR5XVxyXG4gICAgaWYgKCFqc1Byb3BlcnR5KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gaGVscGVycy52ZW5kb3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChoZWxwZXJzLnZlbmRvcnNbaV0gIT09IG51bGwpIHtcclxuICAgICAgICAgIGpzUHJvcGVydHkgPSBoZWxwZXJzLmNhbWVsQ2FzZShoZWxwZXJzLnZlbmRvcnNbaV1bMV0gKyAnLScgKyBwcm9wZXJ0eSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAganNQcm9wZXJ0eSA9IHByb3BlcnR5XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlW2pzUHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGhlbHBlcnMucHJvcGVydHlDYWNoZVtwcm9wZXJ0eV0gPSBqc1Byb3BlcnR5XHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxlbWVudC5zdHlsZVtqc1Byb3BlcnR5XSA9IHZhbHVlXHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgTUFHSUNfTlVNQkVSID0gMzAsXHJcbiAgICAgIERFRkFVTFRTID0ge1xyXG4gICAgICAgIHJlbGF0aXZlSW5wdXQ6IGZhbHNlLFxyXG4gICAgICAgIGNsaXBSZWxhdGl2ZUlucHV0OiBmYWxzZSxcclxuICAgICAgICBpbnB1dEVsZW1lbnQ6IG51bGwsXHJcbiAgICAgICAgaG92ZXJPbmx5OiBmYWxzZSxcclxuICAgICAgICBjYWxpYnJhdGlvblRocmVzaG9sZDogMTAwLFxyXG4gICAgICAgIGNhbGlicmF0aW9uRGVsYXk6IDUwMCxcclxuICAgICAgICBzdXBwb3J0RGVsYXk6IDUwMCxcclxuICAgICAgICBjYWxpYnJhdGVYOiBmYWxzZSxcclxuICAgICAgICBjYWxpYnJhdGVZOiB0cnVlLFxyXG4gICAgICAgIGludmVydFg6IHRydWUsXHJcbiAgICAgICAgaW52ZXJ0WTogdHJ1ZSxcclxuICAgICAgICBsaW1pdFg6IGZhbHNlLFxyXG4gICAgICAgIGxpbWl0WTogZmFsc2UsXHJcbiAgICAgICAgc2NhbGFyWDogMTAuMCxcclxuICAgICAgICBzY2FsYXJZOiAxMC4wLFxyXG4gICAgICAgIGZyaWN0aW9uWDogMC4xLFxyXG4gICAgICAgIGZyaWN0aW9uWTogMC4xLFxyXG4gICAgICAgIG9yaWdpblg6IDAuNSxcclxuICAgICAgICBvcmlnaW5ZOiAwLjUsXHJcbiAgICAgICAgcG9pbnRlckV2ZW50czogZmFsc2UsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAxLFxyXG4gICAgICAgIG9uUmVhZHk6IG51bGwsXHJcbiAgICAgICAgc2VsZWN0b3I6IG51bGxcclxuICAgICAgfVxyXG5cclxuY2xhc3MgUGFyYWxsYXgge1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgY2FsaWJyYXRlWDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2NhbGlicmF0ZS14JyksXHJcbiAgICAgIGNhbGlicmF0ZVk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdjYWxpYnJhdGUteScpLFxyXG4gICAgICBpbnZlcnRYOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnaW52ZXJ0LXgnKSxcclxuICAgICAgaW52ZXJ0WTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2ludmVydC15JyksXHJcbiAgICAgIGxpbWl0WDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2xpbWl0LXgnKSxcclxuICAgICAgbGltaXRZOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnbGltaXQteScpLFxyXG4gICAgICBzY2FsYXJYOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnc2NhbGFyLXgnKSxcclxuICAgICAgc2NhbGFyWTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ3NjYWxhci15JyksXHJcbiAgICAgIGZyaWN0aW9uWDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ2ZyaWN0aW9uLXgnKSxcclxuICAgICAgZnJpY3Rpb25ZOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnZnJpY3Rpb24teScpLFxyXG4gICAgICBvcmlnaW5YOiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnb3JpZ2luLXgnKSxcclxuICAgICAgb3JpZ2luWTogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ29yaWdpbi15JyksXHJcbiAgICAgIHBvaW50ZXJFdmVudHM6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdwb2ludGVyLWV2ZW50cycpLFxyXG4gICAgICBwcmVjaXNpb246IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdwcmVjaXNpb24nKSxcclxuICAgICAgcmVsYXRpdmVJbnB1dDogaGVscGVycy5kYXRhKHRoaXMuZWxlbWVudCwgJ3JlbGF0aXZlLWlucHV0JyksXHJcbiAgICAgIGNsaXBSZWxhdGl2ZUlucHV0OiBoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnY2xpcC1yZWxhdGl2ZS1pbnB1dCcpLFxyXG4gICAgICBob3Zlck9ubHk6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdob3Zlci1vbmx5JyksXHJcbiAgICAgIGlucHV0RWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWxwZXJzLmRhdGEodGhpcy5lbGVtZW50LCAnaW5wdXQtZWxlbWVudCcpKSxcclxuICAgICAgc2VsZWN0b3I6IGhlbHBlcnMuZGF0YSh0aGlzLmVsZW1lbnQsICdzZWxlY3RvcicpXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcclxuICAgICAgaWYgKGRhdGFba2V5XSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGRlbGV0ZSBkYXRhW2tleV1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9iamVjdEFzc2lnbih0aGlzLCBERUZBVUxUUywgZGF0YSwgb3B0aW9ucylcclxuXHJcbiAgICBpZighdGhpcy5pbnB1dEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhbGlicmF0aW9uVGltZXIgPSBudWxsXHJcbiAgICB0aGlzLmNhbGlicmF0aW9uRmxhZyA9IHRydWVcclxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXHJcbiAgICB0aGlzLmRlcHRoc1ggPSBbXVxyXG4gICAgdGhpcy5kZXB0aHNZID0gW11cclxuICAgIHRoaXMucmFmID0gbnVsbFxyXG5cclxuICAgIHRoaXMuYm91bmRzID0gbnVsbFxyXG4gICAgdGhpcy5lbGVtZW50UG9zaXRpb25YID0gMFxyXG4gICAgdGhpcy5lbGVtZW50UG9zaXRpb25ZID0gMFxyXG4gICAgdGhpcy5lbGVtZW50V2lkdGggPSAwXHJcbiAgICB0aGlzLmVsZW1lbnRIZWlnaHQgPSAwXHJcblxyXG4gICAgdGhpcy5lbGVtZW50Q2VudGVyWCA9IDBcclxuICAgIHRoaXMuZWxlbWVudENlbnRlclkgPSAwXHJcblxyXG4gICAgdGhpcy5lbGVtZW50UmFuZ2VYID0gMFxyXG4gICAgdGhpcy5lbGVtZW50UmFuZ2VZID0gMFxyXG5cclxuICAgIHRoaXMuY2FsaWJyYXRpb25YID0gMFxyXG4gICAgdGhpcy5jYWxpYnJhdGlvblkgPSAwXHJcblxyXG4gICAgdGhpcy5pbnB1dFggPSAwXHJcbiAgICB0aGlzLmlucHV0WSA9IDBcclxuXHJcbiAgICB0aGlzLm1vdGlvblggPSAwXHJcbiAgICB0aGlzLm1vdGlvblkgPSAwXHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eVggPSAwXHJcbiAgICB0aGlzLnZlbG9jaXR5WSA9IDBcclxuXHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb24gPSB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb24uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbkRldmljZU1vdGlvbiA9IHRoaXMub25EZXZpY2VNb3Rpb24uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbk9yaWVudGF0aW9uVGltZXIgPSB0aGlzLm9uT3JpZW50YXRpb25UaW1lci5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLm9uTW90aW9uVGltZXIgPSB0aGlzLm9uTW90aW9uVGltZXIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbkNhbGlicmF0aW9uVGltZXIgPSB0aGlzLm9uQ2FsaWJyYXRpb25UaW1lci5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLm9uQW5pbWF0aW9uRnJhbWUgPSB0aGlzLm9uQW5pbWF0aW9uRnJhbWUuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5vbldpbmRvd1Jlc2l6ZSA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKVxyXG5cclxuICAgIHRoaXMud2luZG93V2lkdGggPSBudWxsXHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IG51bGxcclxuICAgIHRoaXMud2luZG93Q2VudGVyWCA9IG51bGxcclxuICAgIHRoaXMud2luZG93Q2VudGVyWSA9IG51bGxcclxuICAgIHRoaXMud2luZG93UmFkaXVzWCA9IG51bGxcclxuICAgIHRoaXMud2luZG93UmFkaXVzWSA9IG51bGxcclxuICAgIHRoaXMucG9ydHJhaXQgPSBmYWxzZVxyXG4gICAgdGhpcy5kZXNrdG9wID0gIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUGhvbmV8aVBvZHxpUGFkfEFuZHJvaWR8QmxhY2tCZXJyeXxCQjEwfG1vYml8dGFibGV0fG9wZXJhIG1pbml8bmV4dXMgNykvaSlcclxuICAgIHRoaXMubW90aW9uU3VwcG9ydCA9ICEhd2luZG93LkRldmljZU1vdGlvbkV2ZW50ICYmICF0aGlzLmRlc2t0b3BcclxuICAgIHRoaXMub3JpZW50YXRpb25TdXBwb3J0ID0gISF3aW5kb3cuRGV2aWNlT3JpZW50YXRpb25FdmVudCAmJiAhdGhpcy5kZXNrdG9wXHJcbiAgICB0aGlzLm9yaWVudGF0aW9uU3RhdHVzID0gMFxyXG4gICAgdGhpcy5tb3Rpb25TdGF0dXMgPSAwXHJcblxyXG4gICAgdGhpcy5pbml0aWFsaXNlKClcclxuICB9XHJcblxyXG4gIGluaXRpYWxpc2UoKSB7XHJcbiAgICBpZiAodGhpcy50cmFuc2Zvcm0yRFN1cHBvcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnRyYW5zZm9ybTJEU3VwcG9ydCA9IGhlbHBlcnMudHJhbnNmb3JtU3VwcG9ydCgnMkQnKVxyXG4gICAgICB0aGlzLnRyYW5zZm9ybTNEU3VwcG9ydCA9IGhlbHBlcnMudHJhbnNmb3JtU3VwcG9ydCgnM0QnKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbmZpZ3VyZSBDb250ZXh0IFN0eWxlc1xyXG4gICAgaWYgKHRoaXMudHJhbnNmb3JtM0RTdXBwb3J0KSB7XHJcbiAgICAgIGhlbHBlcnMuYWNjZWxlcmF0ZSh0aGlzLmVsZW1lbnQpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KVxyXG4gICAgaWYgKHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcclxuICAgIH1cclxuXHJcbiAgICAvLyBQb2ludGVyIGV2ZW50c1xyXG4gICAgaWYoIXRoaXMucG9pbnRlckV2ZW50cykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHVwXHJcbiAgICB0aGlzLnVwZGF0ZUxheWVycygpXHJcbiAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKVxyXG4gICAgdGhpcy5lbmFibGUoKVxyXG4gICAgdGhpcy5xdWV1ZUNhbGlicmF0aW9uKHRoaXMuY2FsaWJyYXRpb25EZWxheSlcclxuICB9XHJcblxyXG4gIGRvUmVhZHlDYWxsYmFjaygpIHtcclxuICAgIGlmKHRoaXMub25SZWFkeSkge1xyXG4gICAgICB0aGlzLm9uUmVhZHkoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlTGF5ZXJzKCkge1xyXG4gICAgaWYodGhpcy5zZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLmxheWVycyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxheWVycyA9IHRoaXMuZWxlbWVudC5jaGlsZHJlblxyXG4gICAgfVxyXG5cclxuICAgIGlmKCF0aGlzLmxheWVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdQYXJhbGxheEpTOiBZb3VyIHNjZW5lIGRvZXMgbm90IGhhdmUgYW55IGxheWVycy4nKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVwdGhzWCA9IFtdXHJcbiAgICB0aGlzLmRlcHRoc1kgPSBbXVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgbGV0IGxheWVyID0gdGhpcy5sYXllcnNbaW5kZXhdXHJcblxyXG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm0zRFN1cHBvcnQpIHtcclxuICAgICAgICBoZWxwZXJzLmFjY2VsZXJhdGUobGF5ZXIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxheWVyLnN0eWxlLnBvc2l0aW9uID0gaW5kZXggPyAnYWJzb2x1dGUnIDogJ3JlbGF0aXZlJ1xyXG4gICAgICBsYXllci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICBsYXllci5zdHlsZS5sZWZ0ID0gMFxyXG4gICAgICBsYXllci5zdHlsZS50b3AgPSAwXHJcblxyXG4gICAgICBsZXQgZGVwdGggPSBoZWxwZXJzLmRhdGEobGF5ZXIsICdkZXB0aCcpIHx8IDBcclxuICAgICAgdGhpcy5kZXB0aHNYLnB1c2goaGVscGVycy5kYXRhKGxheWVyLCAnZGVwdGgteCcpIHx8IGRlcHRoKVxyXG4gICAgICB0aGlzLmRlcHRoc1kucHVzaChoZWxwZXJzLmRhdGEobGF5ZXIsICdkZXB0aC15JykgfHwgZGVwdGgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaW1lbnNpb25zKCkge1xyXG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgdGhpcy53aW5kb3dDZW50ZXJYID0gdGhpcy53aW5kb3dXaWR0aCAqIHRoaXMub3JpZ2luWFxyXG4gICAgdGhpcy53aW5kb3dDZW50ZXJZID0gdGhpcy53aW5kb3dIZWlnaHQgKiB0aGlzLm9yaWdpbllcclxuICAgIHRoaXMud2luZG93UmFkaXVzWCA9IE1hdGgubWF4KHRoaXMud2luZG93Q2VudGVyWCwgdGhpcy53aW5kb3dXaWR0aCAtIHRoaXMud2luZG93Q2VudGVyWClcclxuICAgIHRoaXMud2luZG93UmFkaXVzWSA9IE1hdGgubWF4KHRoaXMud2luZG93Q2VudGVyWSwgdGhpcy53aW5kb3dIZWlnaHQgLSB0aGlzLndpbmRvd0NlbnRlclkpXHJcbiAgfVxyXG5cclxuICB1cGRhdGVCb3VuZHMoKSB7XHJcbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuaW5wdXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICB0aGlzLmVsZW1lbnRQb3NpdGlvblggPSB0aGlzLmJvdW5kcy5sZWZ0XHJcbiAgICB0aGlzLmVsZW1lbnRQb3NpdGlvblkgPSB0aGlzLmJvdW5kcy50b3BcclxuICAgIHRoaXMuZWxlbWVudFdpZHRoID0gdGhpcy5ib3VuZHMud2lkdGhcclxuICAgIHRoaXMuZWxlbWVudEhlaWdodCA9IHRoaXMuYm91bmRzLmhlaWdodFxyXG4gICAgdGhpcy5lbGVtZW50Q2VudGVyWCA9IHRoaXMuZWxlbWVudFdpZHRoICogdGhpcy5vcmlnaW5YXHJcbiAgICB0aGlzLmVsZW1lbnRDZW50ZXJZID0gdGhpcy5lbGVtZW50SGVpZ2h0ICogdGhpcy5vcmlnaW5ZXHJcbiAgICB0aGlzLmVsZW1lbnRSYW5nZVggPSBNYXRoLm1heCh0aGlzLmVsZW1lbnRDZW50ZXJYLCB0aGlzLmVsZW1lbnRXaWR0aCAtIHRoaXMuZWxlbWVudENlbnRlclgpXHJcbiAgICB0aGlzLmVsZW1lbnRSYW5nZVkgPSBNYXRoLm1heCh0aGlzLmVsZW1lbnRDZW50ZXJZLCB0aGlzLmVsZW1lbnRIZWlnaHQgLSB0aGlzLmVsZW1lbnRDZW50ZXJZKVxyXG4gIH1cclxuXHJcbiAgcXVldWVDYWxpYnJhdGlvbihkZWxheSkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2FsaWJyYXRpb25UaW1lcilcclxuICAgIHRoaXMuY2FsaWJyYXRpb25UaW1lciA9IHNldFRpbWVvdXQodGhpcy5vbkNhbGlicmF0aW9uVGltZXIsIGRlbGF5KVxyXG4gIH1cclxuXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvblN1cHBvcnQpIHtcclxuICAgICAgdGhpcy5wb3J0cmFpdCA9IGZhbHNlXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbilcclxuICAgICAgdGhpcy5kZXRlY3Rpb25UaW1lciA9IHNldFRpbWVvdXQodGhpcy5vbk9yaWVudGF0aW9uVGltZXIsIHRoaXMuc3VwcG9ydERlbGF5KVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm1vdGlvblN1cHBvcnQpIHtcclxuICAgICAgdGhpcy5wb3J0cmFpdCA9IGZhbHNlXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2Vtb3Rpb24nLCB0aGlzLm9uRGV2aWNlTW90aW9uKVxyXG4gICAgICB0aGlzLmRldGVjdGlvblRpbWVyID0gc2V0VGltZW91dCh0aGlzLm9uTW90aW9uVGltZXIsIHRoaXMuc3VwcG9ydERlbGF5KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxpYnJhdGlvblggPSAwXHJcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25ZID0gMFxyXG4gICAgICB0aGlzLnBvcnRyYWl0ID0gZmFsc2VcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpXHJcbiAgICAgIHRoaXMuZG9SZWFkeUNhbGxiYWNrKClcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSlcclxuICAgIHRoaXMucmFmID0gcnFBbkZyKHRoaXMub25BbmltYXRpb25GcmFtZSlcclxuICB9XHJcblxyXG4gIGRpc2FibGUoKSB7XHJcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb25TdXBwb3J0KSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbilcclxuICAgIH0gZWxzZSBpZiAodGhpcy5tb3Rpb25TdXBwb3J0KSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2Vtb3Rpb24nLCB0aGlzLm9uRGV2aWNlTW90aW9uKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpXHJcbiAgICBycUFuRnIuY2FuY2VsKHRoaXMucmFmKVxyXG4gIH1cclxuXHJcbiAgY2FsaWJyYXRlKHgsIHkpIHtcclxuICAgIHRoaXMuY2FsaWJyYXRlWCA9IHggPT09IHVuZGVmaW5lZCA/IHRoaXMuY2FsaWJyYXRlWCA6IHhcclxuICAgIHRoaXMuY2FsaWJyYXRlWSA9IHkgPT09IHVuZGVmaW5lZCA/IHRoaXMuY2FsaWJyYXRlWSA6IHlcclxuICB9XHJcblxyXG4gIGludmVydCh4LCB5KSB7XHJcbiAgICB0aGlzLmludmVydFggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLmludmVydFggOiB4XHJcbiAgICB0aGlzLmludmVydFkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmludmVydFkgOiB5XHJcbiAgfVxyXG5cclxuICBmcmljdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmZyaWN0aW9uWCA9IHggPT09IHVuZGVmaW5lZCA/IHRoaXMuZnJpY3Rpb25YIDogeFxyXG4gICAgdGhpcy5mcmljdGlvblkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmZyaWN0aW9uWSA6IHlcclxuICB9XHJcblxyXG4gIHNjYWxhcih4LCB5KSB7XHJcbiAgICB0aGlzLnNjYWxhclggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLnNjYWxhclggOiB4XHJcbiAgICB0aGlzLnNjYWxhclkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLnNjYWxhclkgOiB5XHJcbiAgfVxyXG5cclxuICBsaW1pdCh4LCB5KSB7XHJcbiAgICB0aGlzLmxpbWl0WCA9IHggPT09IHVuZGVmaW5lZCA/IHRoaXMubGltaXRYIDogeFxyXG4gICAgdGhpcy5saW1pdFkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLmxpbWl0WSA6IHlcclxuICB9XHJcblxyXG4gIG9yaWdpbih4LCB5KSB7XHJcbiAgICB0aGlzLm9yaWdpblggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLm9yaWdpblggOiB4XHJcbiAgICB0aGlzLm9yaWdpblkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLm9yaWdpblkgOiB5XHJcbiAgfVxyXG5cclxuICBzZXRJbnB1dEVsZW1lbnQoZWxlbWVudCkge1xyXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKVxyXG4gIH1cclxuXHJcbiAgc2V0UG9zaXRpb24oZWxlbWVudCwgeCwgeSkge1xyXG4gICAgeCA9IHgudG9GaXhlZCh0aGlzLnByZWNpc2lvbikgKyAncHgnXHJcbiAgICB5ID0geS50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSArICdweCdcclxuICAgIGlmICh0aGlzLnRyYW5zZm9ybTNEU3VwcG9ydCkge1xyXG4gICAgICBoZWxwZXJzLmNzcyhlbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJywnICsgeSArICcsMCknKVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRyYW5zZm9ybTJEU3VwcG9ydCkge1xyXG4gICAgICBoZWxwZXJzLmNzcyhlbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgeCArICcsJyArIHkgKyAnKScpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB4XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0geVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25PcmllbnRhdGlvblRpbWVyKCkge1xyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb25TdXBwb3J0ICYmIHRoaXMub3JpZW50YXRpb25TdGF0dXMgPT09IDApIHtcclxuICAgICAgdGhpcy5kaXNhYmxlKClcclxuICAgICAgdGhpcy5vcmllbnRhdGlvblN1cHBvcnQgPSBmYWxzZVxyXG4gICAgICB0aGlzLmVuYWJsZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRvUmVhZHlDYWxsYmFjaygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vdGlvblRpbWVyKCkge1xyXG4gICAgaWYgKHRoaXMubW90aW9uU3VwcG9ydCAmJiB0aGlzLm1vdGlvblN0YXR1cyA9PT0gMCkge1xyXG4gICAgICB0aGlzLmRpc2FibGUoKVxyXG4gICAgICB0aGlzLm1vdGlvblN1cHBvcnQgPSBmYWxzZVxyXG4gICAgICB0aGlzLmVuYWJsZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRvUmVhZHlDYWxsYmFjaygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNhbGlicmF0aW9uVGltZXIoKSB7XHJcbiAgICB0aGlzLmNhbGlicmF0aW9uRmxhZyA9IHRydWVcclxuICB9XHJcblxyXG4gIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKClcclxuICB9XHJcblxyXG4gIG9uQW5pbWF0aW9uRnJhbWUoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUJvdW5kcygpXHJcbiAgICBsZXQgY2FsaWJyYXRlZElucHV0WCA9IHRoaXMuaW5wdXRYIC0gdGhpcy5jYWxpYnJhdGlvblgsXHJcbiAgICAgICAgY2FsaWJyYXRlZElucHV0WSA9IHRoaXMuaW5wdXRZIC0gdGhpcy5jYWxpYnJhdGlvbllcclxuICAgIGlmICgoTWF0aC5hYnMoY2FsaWJyYXRlZElucHV0WCkgPiB0aGlzLmNhbGlicmF0aW9uVGhyZXNob2xkKSB8fCAoTWF0aC5hYnMoY2FsaWJyYXRlZElucHV0WSkgPiB0aGlzLmNhbGlicmF0aW9uVGhyZXNob2xkKSkge1xyXG4gICAgICB0aGlzLnF1ZXVlQ2FsaWJyYXRpb24oMClcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBvcnRyYWl0KSB7XHJcbiAgICAgIHRoaXMubW90aW9uWCA9IHRoaXMuY2FsaWJyYXRlWCA/IGNhbGlicmF0ZWRJbnB1dFkgOiB0aGlzLmlucHV0WVxyXG4gICAgICB0aGlzLm1vdGlvblkgPSB0aGlzLmNhbGlicmF0ZVkgPyBjYWxpYnJhdGVkSW5wdXRYIDogdGhpcy5pbnB1dFhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW90aW9uWCA9IHRoaXMuY2FsaWJyYXRlWCA/IGNhbGlicmF0ZWRJbnB1dFggOiB0aGlzLmlucHV0WFxyXG4gICAgICB0aGlzLm1vdGlvblkgPSB0aGlzLmNhbGlicmF0ZVkgPyBjYWxpYnJhdGVkSW5wdXRZIDogdGhpcy5pbnB1dFlcclxuICAgIH1cclxuICAgIHRoaXMubW90aW9uWCAqPSB0aGlzLmVsZW1lbnRXaWR0aCAqICh0aGlzLnNjYWxhclggLyAxMDApXHJcbiAgICB0aGlzLm1vdGlvblkgKj0gdGhpcy5lbGVtZW50SGVpZ2h0ICogKHRoaXMuc2NhbGFyWSAvIDEwMClcclxuICAgIGlmICghaXNOYU4ocGFyc2VGbG9hdCh0aGlzLmxpbWl0WCkpKSB7XHJcbiAgICAgIHRoaXMubW90aW9uWCA9IGhlbHBlcnMuY2xhbXAodGhpcy5tb3Rpb25YLCAtdGhpcy5saW1pdFgsIHRoaXMubGltaXRYKVxyXG4gICAgfVxyXG4gICAgaWYgKCFpc05hTihwYXJzZUZsb2F0KHRoaXMubGltaXRZKSkpIHtcclxuICAgICAgdGhpcy5tb3Rpb25ZID0gaGVscGVycy5jbGFtcCh0aGlzLm1vdGlvblksIC10aGlzLmxpbWl0WSwgdGhpcy5saW1pdFkpXHJcbiAgICB9XHJcbiAgICB0aGlzLnZlbG9jaXR5WCArPSAodGhpcy5tb3Rpb25YIC0gdGhpcy52ZWxvY2l0eVgpICogdGhpcy5mcmljdGlvblhcclxuICAgIHRoaXMudmVsb2NpdHlZICs9ICh0aGlzLm1vdGlvblkgLSB0aGlzLnZlbG9jaXR5WSkgKiB0aGlzLmZyaWN0aW9uWVxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgbGF5ZXIgPSB0aGlzLmxheWVyc1tpbmRleF0sXHJcbiAgICAgICAgICBkZXB0aFggPSB0aGlzLmRlcHRoc1hbaW5kZXhdLFxyXG4gICAgICAgICAgZGVwdGhZID0gdGhpcy5kZXB0aHNZW2luZGV4XSxcclxuICAgICAgICAgIHhPZmZzZXQgPSB0aGlzLnZlbG9jaXR5WCAqIChkZXB0aFggKiAodGhpcy5pbnZlcnRYID8gLTEgOiAxKSksXHJcbiAgICAgICAgICB5T2Zmc2V0ID0gdGhpcy52ZWxvY2l0eVkgKiAoZGVwdGhZICogKHRoaXMuaW52ZXJ0WSA/IC0xIDogMSkpXHJcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24obGF5ZXIsIHhPZmZzZXQsIHlPZmZzZXQpXHJcbiAgICB9XHJcbiAgICB0aGlzLnJhZiA9IHJxQW5Gcih0aGlzLm9uQW5pbWF0aW9uRnJhbWUpXHJcbiAgfVxyXG5cclxuICByb3RhdGUoYmV0YSwgZ2FtbWEpe1xyXG4gICAgLy8gRXh0cmFjdCBSb3RhdGlvblxyXG4gICAgbGV0IHggPSAoYmV0YSB8fCAwKSAvIE1BR0lDX05VTUJFUiwgLy8gIC05MCA6OiA5MFxyXG4gICAgICAgIHkgPSAoZ2FtbWEgfHwgMCkgLyBNQUdJQ19OVU1CRVIgLy8gLTE4MCA6OiAxODBcclxuXHJcbiAgICAvLyBEZXRlY3QgT3JpZW50YXRpb24gQ2hhbmdlXHJcbiAgICBsZXQgcG9ydHJhaXQgPSB0aGlzLndpbmRvd0hlaWdodCA+IHRoaXMud2luZG93V2lkdGhcclxuICAgIGlmICh0aGlzLnBvcnRyYWl0ICE9PSBwb3J0cmFpdCkge1xyXG4gICAgICB0aGlzLnBvcnRyYWl0ID0gcG9ydHJhaXRcclxuICAgICAgdGhpcy5jYWxpYnJhdGlvbkZsYWcgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY2FsaWJyYXRpb25GbGFnKSB7XHJcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25GbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy5jYWxpYnJhdGlvblggPSB4XHJcbiAgICAgIHRoaXMuY2FsaWJyYXRpb25ZID0geVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5wdXRYID0geFxyXG4gICAgdGhpcy5pbnB1dFkgPSB5XHJcbiAgfVxyXG5cclxuICBvbkRldmljZU9yaWVudGF0aW9uKGV2ZW50KSB7XHJcbiAgICBsZXQgYmV0YSA9IGV2ZW50LmJldGFcclxuICAgIGxldCBnYW1tYSA9IGV2ZW50LmdhbW1hXHJcbiAgICBpZiAoYmV0YSAhPT0gbnVsbCAmJiBnYW1tYSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uU3RhdHVzID0gMVxyXG4gICAgICB0aGlzLnJvdGF0ZShiZXRhLCBnYW1tYSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRGV2aWNlTW90aW9uKGV2ZW50KSB7XHJcbiAgICBsZXQgYmV0YSA9IGV2ZW50LnJvdGF0aW9uUmF0ZS5iZXRhXHJcbiAgICBsZXQgZ2FtbWEgPSBldmVudC5yb3RhdGlvblJhdGUuZ2FtbWFcclxuICAgIGlmIChiZXRhICE9PSBudWxsICYmIGdhbW1hICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubW90aW9uU3RhdHVzID0gMVxyXG4gICAgICB0aGlzLnJvdGF0ZShiZXRhLCBnYW1tYSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgICBsZXQgY2xpZW50WCA9IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgY2xpZW50WSA9IGV2ZW50LmNsaWVudFlcclxuXHJcbiAgICAvLyByZXNldCBpbnB1dCB0byBjZW50ZXIgaWYgaG92ZXJPbmx5IGlzIHNldCBhbmQgd2UncmUgbm90IGhvdmVyaW5nIHRoZSBlbGVtZW50XHJcbiAgICBpZih0aGlzLmhvdmVyT25seSAmJlxyXG4gICAgICAoKGNsaWVudFggPCB0aGlzLmVsZW1lbnRQb3NpdGlvblggfHwgY2xpZW50WCA+IHRoaXMuZWxlbWVudFBvc2l0aW9uWCArIHRoaXMuZWxlbWVudFdpZHRoKSB8fFxyXG4gICAgICAoY2xpZW50WSA8IHRoaXMuZWxlbWVudFBvc2l0aW9uWSB8fCBjbGllbnRZID4gdGhpcy5lbGVtZW50UG9zaXRpb25ZICsgdGhpcy5lbGVtZW50SGVpZ2h0KSkpIHtcclxuICAgICAgICB0aGlzLmlucHV0WCA9IDBcclxuICAgICAgICB0aGlzLmlucHV0WSA9IDBcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJlbGF0aXZlSW5wdXQpIHtcclxuICAgICAgLy8gQ2xpcCBtb3VzZSBjb29yZGluYXRlcyBpbnNpZGUgZWxlbWVudCBib3VuZHMuXHJcbiAgICAgIGlmICh0aGlzLmNsaXBSZWxhdGl2ZUlucHV0KSB7XHJcbiAgICAgICAgY2xpZW50WCA9IE1hdGgubWF4KGNsaWVudFgsIHRoaXMuZWxlbWVudFBvc2l0aW9uWClcclxuICAgICAgICBjbGllbnRYID0gTWF0aC5taW4oY2xpZW50WCwgdGhpcy5lbGVtZW50UG9zaXRpb25YICsgdGhpcy5lbGVtZW50V2lkdGgpXHJcbiAgICAgICAgY2xpZW50WSA9IE1hdGgubWF4KGNsaWVudFksIHRoaXMuZWxlbWVudFBvc2l0aW9uWSlcclxuICAgICAgICBjbGllbnRZID0gTWF0aC5taW4oY2xpZW50WSwgdGhpcy5lbGVtZW50UG9zaXRpb25ZICsgdGhpcy5lbGVtZW50SGVpZ2h0KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENhbGN1bGF0ZSBpbnB1dCByZWxhdGl2ZSB0byB0aGUgZWxlbWVudC5cclxuICAgICAgaWYodGhpcy5lbGVtZW50UmFuZ2VYICYmIHRoaXMuZWxlbWVudFJhbmdlWSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRYID0gKGNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvblggLSB0aGlzLmVsZW1lbnRDZW50ZXJYKSAvIHRoaXMuZWxlbWVudFJhbmdlWFxyXG4gICAgICAgIHRoaXMuaW5wdXRZID0gKGNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvblkgLSB0aGlzLmVsZW1lbnRDZW50ZXJZKSAvIHRoaXMuZWxlbWVudFJhbmdlWVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBDYWxjdWxhdGUgaW5wdXQgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuICAgICAgaWYodGhpcy53aW5kb3dSYWRpdXNYICYmIHRoaXMud2luZG93UmFkaXVzWSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRYID0gKGNsaWVudFggLSB0aGlzLndpbmRvd0NlbnRlclgpIC8gdGhpcy53aW5kb3dSYWRpdXNYXHJcbiAgICAgICAgdGhpcy5pbnB1dFkgPSAoY2xpZW50WSAtIHRoaXMud2luZG93Q2VudGVyWSkgLyB0aGlzLndpbmRvd1JhZGl1c1lcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSgpXHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2FsaWJyYXRpb25UaW1lcilcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmRldGVjdGlvblRpbWVyKVxyXG5cclxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5sYXllcnNbaW5kZXhdLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRcclxuICAgIGRlbGV0ZSB0aGlzLmxheWVyc1xyXG4gIH1cclxuXHJcbiAgdmVyc2lvbigpIHtcclxuICAgIHJldHVybiAnMy4xLjAnXHJcbiAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXJhbGxheFxyXG4iXX0=
},{"object-assign":2,"raf":4}]},{},[5])