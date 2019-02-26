class Logger {
  constructor(componentName, log) {
    this._componentName = componentName;
    this._propsChanges = [];
    this._stateChanges = [];
    this._renderCount = 0;

    this._log = log;
  }

  init() {
    if (this._isFirstRender) {
      this._printInit();
    }

    this._incrementRenderCount();
  }

  processChanges(stateChange, propsChange) {
    this._shallowCompareState(...stateChange);
    this._shallowCompareProps(...propsChange);
    this._printComparisonsResults();
  }

  _printInit() {
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

  _printComparisonsResults() {
    this._log.group(
      `%c[clear-render] re-render #${this._renderCount}`,
      'color: #848d95;',
      this._componentName
    );
    this._printComparisonResult('props', this._propsChanges);
    this._printComparisonResult('state', this._stateChanges);
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

  _shallowCompareProps(prevProps, nextProps) {
    this._propsChanges = this._differenceBetweenObjects(prevProps, nextProps);
  }

  _shallowCompareState(prevState, nextState) {
    this._stateChanges = this._differenceBetweenObjects(prevState, nextState);
  }

  get _isFirstRender() {
    return !this._renderCount;
  }

  _incrementRenderCount() {
    this._renderCount++;
  }
}

export default Logger;