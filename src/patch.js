import Logger from './logger';

export default (ComponentClass, name, log) => {
  const logger = new Logger(name, log);

  const originalRender = ComponentClass.prototype.render;
  ComponentClass.prototype.render = function() {
    logger.init();

    if (originalRender) {
      return originalRender.call(this);
    }

    return null;
  };

  const originalСomponentDidUpdate =
    ComponentClass.prototype.componentDidUpdate;
  ComponentClass.prototype.componentDidUpdate = function(...args) {
    const [prevProps, prevState] = args;
    const nextProps = this.props;
    const nextState = this.state;

    logger.processChanges([prevState, nextState], [prevProps, nextProps]);

    if (originalСomponentDidUpdate) {
      return originalСomponentDidUpdate.call(this, ...args);
    }
  };

  return ComponentClass;
};
