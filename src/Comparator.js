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

export default Comparator;
