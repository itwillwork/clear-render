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

      this._logger.printComparisonsResults(propsChanges, stateChanges);
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

export default Comparator;
