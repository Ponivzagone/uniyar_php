/* Polyfill service v3.31.1
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 * 
 * Features requested: Array.prototype.indexOf,Element.prototype.closest
 * 
 * - Element.prototype.matches, License: CC0 (required by "Element.prototype.closest")
 * - Element.prototype.closest, License: CC0 */

;(function(undefined) {

    // Element.prototype.matches
    Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
    
        var element = this;
        var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
        var index = 0;
    
        while (elements[index] && elements[index] !== element) {
            ++index;
        }
    
        return !!elements[index];
    };
    
    // Element.prototype.closest
    Element.prototype.closest = function closest(selector) {
        var node = this;
    
        while (node) {
            if (node.matches(selector)) return node;
            else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
        }
    
        return null;
    };
    })
    .call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

/**
 * Element.prototype.classList for IE8/9, Safari.
 * @author    Kerem Güneş <k-gun@mail.com>
 * @copyright Released under the MIT License <https://opensource.org/licenses/MIT>
 * @version   1.2
 * @see       https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */
;(function() {
    // Helpers.
    var trim = function(s) {
            return s.replace(/^\s+|\s+$/g, '');
        },
        regExp = function(name) {
            return new RegExp('(^|\\s+)'+ name +'(\\s+|$)');
        },
        forEach = function(list, fn, scope) {
            for (var i = 0; i < list.length; i++) {
                fn.call(scope, list[i]);
            }
        };

    // Class list object with basic methods.
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className = trim(this.element.className +' '+ name);
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className = trim(this.element.className.replace(regExp(name), ' '));
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        item: function(i) {
            return this.element.className.split(/\s+/)[i] || null;
        },
        // bonus
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    // Remove this if statements to override native classList.
    if (!('classList' in Element.prototype)) {
    // Use this if statement to override native classList that does not have for example replace() method.
    // See browser compatibility: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility.
    // if (!('classList' in Element.prototype) ||
    //     !('classList' in Element.prototype && Element.prototype.classList.replace)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }

    // For others replace() support.
    if (window.DOMTokenList && !DOMTokenList.prototype.replace) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();


//foreach
if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback){
        for (var i = 0; i < this.length; i++){
            callback.apply(this, [this[i], i, this]);
        }
    };
}

//indexof
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
        from += len;

        for (; from < len; from++)
        {
        if (from in this &&
            this[from] === elt)
            return from;
        }
        return -1;
    };
}

//reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback /*, initialValue*/) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      var t = Object(this), len = t.length >>> 0, k = 0, value;
      if (arguments.length == 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in t)) {
          k++; 
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k++];
      }
      for (; k < len; k++) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }

if (Array.prototype.filter === undefined) {
  Array.prototype.filter = function(fn) {
    var rv = [];
    for(var i=0, l=this.length; i<l; i++) {
      if (fn(this[i])) { rv.push(this[i]); }
    }
    return rv;
  };
}


if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}


    
