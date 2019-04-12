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

    _getComponentLabel(id) {
      const componentName = this._componentName;

      if (!id) {
        return componentName;
      }

      return componentName + ` [id: ${id}]`;
    }

    printInit(id) {
      const componentLabel = this._getComponentLabel(id);

      this._log.log(
        '%c[clear-render] init for',
        'color: #848d95;',
        componentLabel
      );
      this._log.log('%c[clear-render] render', 'color: #848d95;', componentLabel);
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

    printComparisonsResults(id, renderCount, propsChanges, stateChanges) {
      const componentLabel = this._getComponentLabel(id);

      this._log.group(
        `%c[clear-render] re-render #${renderCount}`,
        'color: #848d95;',
        componentLabel
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
      this._logger = logger;
      this._instances = {};
    }

    _registration(id) {
      this._instances[id] = {
        id,
        renderCount: 0,
        prevProps: null,
        prevState: null,
      };
    }

    _saveCall(props, state) {
      const id = this._getInstanceId(props);
      const instance = this._getInstance(id);

      instance.renderCount += 1;
      instance.prevState = state;
      instance.prevProps = props;
    }

    _getInstanceId(props) {
      return props.clearRenderId || null;
    }

    _getInstance(id) {
      return this._instances[id];
    }

    processChanges(nextProps, nextState) {
      const id = this._getInstanceId(nextProps);
      const instance = this._getInstance(id);

      if (!instance) {
        this._registration(id);
        this._logger.printInit(id);
      } else {
        const propsChanges = this._shallowCompare(instance.prevProps, nextProps);
        const stateChanges = this._shallowCompare(instance.prevState, nextState);

        this._logger.printComparisonsResults(
          id,
          instance.renderCount,
          propsChanges,
          stateChanges
        );
      }

      this._saveCall(nextProps, nextState);
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
