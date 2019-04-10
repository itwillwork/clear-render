(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.clearRender = factory());
}(this, function () { 'use strict';

  const patchClass = (ClassComponent, comparator) => {
    const originalRender = ClassComponent.prototype.render;
    ClassComponent.prototype.render = function() {
      comparator.processChanges(this.props, this.state);

      if (originalRender) {
        return originalRender.call(this);
      }

      return null;
    };

    return ClassComponent;
  };

  const patchFunction = (FunctionComponent, comparator) => {
    const FunctionComponentWrap = (...args) => {
      comparator.processChanges(args[0], {});

      return FunctionComponent(...args);
    };

    return FunctionComponentWrap;
  };

  var patch = (Component, comparator) => {
    const isClassComponent = !!Component.prototype.render;

    if (isClassComponent) {
      return patchClass(Component, comparator);
    }

    return patchFunction(Component, comparator);
  };

  class Logger {
    constructor(componentName, log) {
      this._componentName = componentName;
      this._log = log;
    }

    printInit() {
      this._log.log(
        '%c[clear-render] init for',
        'color: #848d95;',
        this._componentName
      );
      this._log.log(
        '%c[clear-render] render',
        'color: #848d95;',
        this._componentName
      );
    }

    _printChange(change) {
      if (typeof change === 'object') {
        this._log.groupCollapsed(
          `${change.key} %c [${change.type}]`,
          'color: #848d95; font-style: italic;'
        );
        this._log.log(
          '%c old ',
          'background: #ff6347; color: #fff',
          change.oldValue
        );
        this._log.log(
          '%c new ',
          'background: #5fba7d; color: #fff',
          change.nextValue
        );
        this._log.groupEnd();
      } else {
        this._log.log(change);
      }
    }

    printComparisonsResults(renderCount, propsChanges, stateChanges) {
      this._log.group(
        `%c[clear-render] re-render #${renderCount}`,
        'color: #848d95;',
        this._componentName
      );
      this._printComparisonResult('props', propsChanges);
      this._printComparisonResult('state', stateChanges);

      if (propsChanges.length === 0 && stateChanges.length === 0) {
        this._log.log("maybe it's the hooks effect");
      }

      this._log.groupEnd();
    }

    _printComparisonResult(title, changes = []) {
      if (changes.length === 0) {
        return;
      }
      this._log.group(title);
      changes.forEach(this._printChange.bind(this));
      this._log.groupEnd();
    }

  }

  class Comparator {
    constructor(logger) {
      this._renderCount = 0;

      this._prevProps = null;
      this._prevState = null;

      this._logger = logger;
    }

    processChanges(nextProps, nextState) {
      const isFirstRender = !this._renderCount;
      if (isFirstRender) {
        this._logger.printInit();
      } else {
        const propsChanges = this._shallowCompare(this._prevProps, nextProps);
        const stateChanges = this._shallowCompare(this._prevState, nextState);

        this._logger.printComparisonsResults(this._renderCount, propsChanges, stateChanges);
      }

      this._renderCount += 1;
      this._prevState = nextState;
      this._prevProps = nextProps;
    }

    _shallowCompare(oldObj = {}, nextObj = {}) {
      if (!nextObj || !oldObj || oldObj === nextObj) {
        return [];
      }

      let difference = [];

      Object.keys(nextObj).forEach(key => {
        if (nextObj[key] !== oldObj[key]) {
          const type = typeof nextObj[key];

          difference.push({
            key,
            type,
            oldValue: oldObj[key],
            nextValue: nextObj[key],
          });
        }
      });

      return difference;
    }
  }

  var index = (...args) => {
    if (args.length > 2) {
      console.error('[clear-render] Error: Too many arguments');
      return null;
    }

    if (args.length === 0) {
      console.error('[clear-render] Error: extended React сomponent is requied');
      return null;
    }

    let ComponentClass = null;
    let forcedDisplayedName = null;

    args.forEach(argument => {
      const type = typeof argument;

      switch (type) {
        case 'symbol':
        case 'string':
          {
            forcedDisplayedName = argument;
          }
          break;
        default:
          {
            ComponentClass = argument;
          }
          break;
      }
    });

    if (!ComponentClass) {
      console.error('[clear-render] Error: need any React сomponent');
      return null;
    }

    const name = forcedDisplayedName || ComponentClass.name;

    const logger = new Logger(name, console);
    const comparator = new Comparator(logger);

    return patch(ComponentClass, comparator);
  };

  return index;

}));
