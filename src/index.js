class Logger {
  constructor(componentName) {
    this._componentName = componentName;
    this._propsChanges = [];
    this._stateChanges = [];
    this._renderCount = 0;
  }

  init() {
    console.log('%c[clear-render] init for', 'color: #848d95;', this._componentName);
    console.log('%c[clear-render] render', 'color: #848d95;', this._componentName);
  }

  _printChange(change) {
    if (typeof change === 'object') {
      console.groupCollapsed(`${change.key} %c [${change.type}]`, 'color: #848d95; font-style: italic;');
      console.log('%c old ', 'background: #ff6347; color: #fff', change.oldValue);
      console.log('%c new ', 'background: #5fba7d; color: #fff', change.nextValue);
      console.groupEnd();
    } else {
      console.log(change);
    }
  }

  printComparisonsResults() {
    console.group(`%c[clear-render] re-render #${this._renderCount}`, 'color: #848d95;', this._componentName);
    this._printComparisonResult('props', this._propsChanges);
    this._printComparisonResult('state', this._stateChanges);
    console.groupEnd();
  }

  _printComparisonResult(title, changes = []) {
    if (changes.length === 0) {
      return;
    }
    console.group(title);
    changes.forEach(this._printChange);
    console.groupEnd();
  }

  _differenceBetweenObjects(oldObj = {}, nextObj = {}) {
    if (!nextObj || !oldObj) {
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

  shallowCompareProps(prevProps, nextProps) {
    this._propsChanges = this._differenceBetweenObjects(prevProps, nextProps);
  }

  shallowCompareState(prevState, nextState) {
    this._stateChanges = this._differenceBetweenObjects(prevState, nextState);
  }

  get isFirstRender() {
    return !this._renderCount;
  }

  incrementRenderCount() {
    this._renderCount++;
  }
};

const wrap = (ComponentClass, forcedDisplayedName) => {
  const componentClassName = ComponentClass.name;

  const logger = new Logger(forcedDisplayedName || componentClassName);

  const originalRender = ComponentClass.prototype.render;
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
  }

  const originalСomponentDidUpdate = ComponentClass.prototype.componentDidUpdate;
  ComponentClass.prototype.componentDidUpdate = function (...args) {
    const [prevProps, prevState] = args;
    const nextProps = this.props;
    const nextState = this.state;

    logger.shallowCompareState(prevState, nextState);
    logger.shallowCompareProps(prevProps, nextProps);
    logger.printComparisonsResults();

    if (originalСomponentDidUpdate) {
      return originalСomponentDidUpdate.call(this, ...args);
    }
  }

  return ComponentClass;
};

module.exports = function (...args) {
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

  args.forEach(arg => {
    const type = typeof arg;

    switch (type) {
      case 'symbol':
      case 'string': {
        forcedDisplayedName = arg;
      }
        break;
      default: {
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
