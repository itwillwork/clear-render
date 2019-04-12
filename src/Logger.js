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

    this._log.log('%c[clear-render] render', 'color: #848d95;', componentLabel);
  }

  _formatValue(value) {
    return JSON.stringify(value, null, 4);
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
        this._formatValue(change.oldValue)
      );
      this._log.log(
        '%c new ',
        'background: #5fba7d; color: #fff',
        this._formatValue(change.nextValue)
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

export default Logger;
