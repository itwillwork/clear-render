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

export default (Component, comparator) => {
  const isClassComponent = !!(
    Component.prototype.render && Component.prototype.isReactComponent
  );

  if (isClassComponent) {
    return patchClass(Component, comparator);
  }

  return patchFunction(Component, comparator);
};
