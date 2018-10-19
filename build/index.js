'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger(componentName) {
    _classCallCheck(this, Logger);

    this._componentName = componentName;
    this._propsChanges = [];
    this._stateChanges = [];
    this._renderCount = 0;
  }

  _createClass(Logger, [{
    key: 'init',
    value: function init() {
      console.log('%c[clear-render] init for', 'color: #848d95;', this._componentName);
      console.log('%c[clear-render] render', 'color: #848d95;', this._componentName);
    }
  }, {
    key: '_printChange',
    value: function _printChange(change) {
      if ((typeof change === 'undefined' ? 'undefined' : _typeof(change)) === 'object') {
        console.groupCollapsed(change.key + ' %c [' + change.type + ']', 'color: #848d95; font-style: italic;');
        console.log('%c old ', 'background: #ff6347; color: #fff', change.oldValue);
        console.log('%c new ', 'background: #5fba7d; color: #fff', change.nextValue);
        console.groupEnd();
      } else {
        console.log(change);
      }
    }
  }, {
    key: 'printComparisonsResults',
    value: function printComparisonsResults() {
      console.group('%c[clear-render] re-render #' + this._renderCount, 'color: #848d95;', this._componentName);
      this._printComparisonResult('props', this._propsChanges);
      this._printComparisonResult('state', this._stateChanges);
      console.groupEnd();
    }
  }, {
    key: '_printComparisonResult',
    value: function _printComparisonResult(title) {
      var changes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (changes.length === 0) {
        return;
      }
      console.group(title);
      changes.forEach(this._printChange);
      console.groupEnd();
    }
  }, {
    key: '_differenceBetweenObjects',
    value: function _differenceBetweenObjects() {
      var oldObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var nextObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!nextObj || !oldObj) {
        return [];
      }
      var difference = [];
      Object.keys(nextObj).forEach(function (key) {
        if (nextObj[key] !== oldObj[key]) {
          var type = _typeof(nextObj[key]);
          difference.push({
            key: key,
            type: type,
            oldValue: oldObj[key],
            nextValue: nextObj[key]
          });
        }
      });
      return difference;
    }
  }, {
    key: 'shallowCompareProps',
    value: function shallowCompareProps(prevProps, nextProps) {
      this._propsChanges = this._differenceBetweenObjects(prevProps, nextProps);
    }
  }, {
    key: 'shallowCompareState',
    value: function shallowCompareState(prevState, nextState) {
      this._stateChanges = this._differenceBetweenObjects(prevState, nextState);
    }
  }, {
    key: 'incrementRenderCount',
    value: function incrementRenderCount() {
      this._renderCount++;
    }
  }, {
    key: 'isFirstRender',
    get: function get() {
      return !this._renderCount;
    }
  }]);

  return Logger;
}();

;

var wrap = function wrap(ComponentClass, forcedDisplayedName) {
  var componentClassName = ComponentClass.name;

  var logger = new Logger(forcedDisplayedName || componentClassName);

  var originalRender = ComponentClass.prototype.render;
  ComponentClass.prototype.render = function () {
    if (logger.isFirstRender) {
      logger.init();
    }

    logger.incrementRenderCount();

    if (originalRender) {
      return originalRender.call(this);
    } else {
      return null;
    }
  };

  var originalСomponentDidUpdate = ComponentClass.prototype.componentDidUpdate;
  ComponentClass.prototype.componentDidUpdate = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var prevProps = args[0],
        prevState = args[1];

    var nextProps = this.props;
    var nextState = this.state;

    logger.shallowCompareState(prevState, nextState);
    logger.shallowCompareProps(prevProps, nextProps);
    logger.printComparisonsResults();

    if (originalСomponentDidUpdate) {
      return originalСomponentDidUpdate.call.apply(originalСomponentDidUpdate, [this].concat(args));
    }
  };

  return ComponentClass;
};

module.exports = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length > 2) {
    console.error('[clear-render] Error: Too many arguments');
    return null;
  }

  if (args.length === 0) {
    console.error('[clear-render] Error: extended React сomponent is requied');
    return null;
  }

  var ComponentClass = null;
  var forcedDisplayedName = null;

  args.forEach(function (arg) {
    var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

    switch (type) {
      case 'symbol':
      case 'string':
        {
          forcedDisplayedName = arg;
        }
        break;
      default:
        {
          ComponentClass = arg;
        }
        break;
    }
  });

  if (!ComponentClass) {
    console.error('[clear-render] Error: need any React сomponent');
    return null;
  }

  return wrap(ComponentClass, forcedDisplayedName);
};
