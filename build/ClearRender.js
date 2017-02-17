const React = require('react');
const shallowCompare = require('react-addons-shallow-compare');

const clearRender = {
  componentDidMount: function () {
    console.info('RENDER ' + this.getNameConstructor());
  },
  getFunctionName: function (func) {
    return func.toString().match(/\w+\(/)[0].slice(0, -1);
  },
  getNameConstructor: function () {
    return this.nameConstructor || (this.nameConstructor = this.getFunctionName(this.constructor));
  },
  componentWillUpdate: function () {
    console.info('RE-RENDER ' + this.getNameConstructor());
    this.print('props changes', this.propsChanges);
    this.print('state changes', this.stateChanges);
  },
  print: function (title, changes = []) {
    if (changes.length === 0) {
      return;
    }
    console.group(title);
    this.printChanges(changes);
    console.groupEnd();
  },
  printChanges: function (changes) {
    changes.forEach(change => {
      if (change instanceof Array) {
        console.groupCollapsed(change[0]);
        change.splice(1).forEach(bit => {
          console.log(bit);
        });
        console.groupEnd();
      } else {
        console.log(change);
      }
    });
  },
  differenceBetweenObjects: function (oldObj = {}, nextObj = {}) {
    if (!nextObj || !oldObj) {
      return [];
    }
    let difference = [];
    Object.keys(nextObj).forEach(key => {
      if (nextObj[key] !== oldObj[key]) {
        const type = typeof nextObj[key];
        switch (true) {
          case type === 'function':
            difference.push(key + ": new function");
            break;
          case type === 'object':
            difference.push([key + ": ", oldObj[key], " => ", nextObj[key]]);
            break;
          default:
            difference.push(key + ": " + oldObj[key] + " => " + nextObj[key]);
        }
      }
    });
    return difference;
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    this.propsChanges = this.differenceBetweenObjects(this.props, nextProps);
    this.stateChanges = this.differenceBetweenObjects(this.state, nextState);
    return shallowCompare(this, nextProps, nextState);
  },
  render: function () {}
};

const extendComponentClass = ExtendedComponentClass => {
  let clearRenderMethods = {};
  Object.assign(clearRenderMethods, clearRender);
  delete clearRenderMethods.render;
  Object.keys(clearRenderMethods).forEach(key => {
    if (typeof ExtendedComponentClass.prototype[key] === 'function') {
      const oldMethodVersion = ExtendedComponentClass.prototype[key];
      ExtendedComponentClass.prototype[key] = function () {
        clearRenderMethods[key].apply(this, arguments);
        return oldMethodVersion.apply(this, arguments);
      };
    } else {
      ExtendedComponentClass.prototype[key] = clearRenderMethods[key];
    }
  });
  return ExtendedComponentClass;
};

const build = (ExtendedComponentClass, displayedName) => {
  if (ExtendedComponentClass) {
    if (displayedName) {
      ExtendedComponentClass.prototype.nameConstructor = displayedName;
    }
    return extendComponentClass(ExtendedComponentClass);
  } else {
    if (displayedName) {
      clearRender.nameConstructor = displayedName;
    }
    return React.createClass(clearRender);
  }
};

module.exports = function () {
  if (arguments.length > 2) {
    console.error('clear-render: Too many arguments');
    return null;
  }
  let ExtendedComponentClass = null;
  let displayedName = null;
  for (let idx = 0; idx < arguments.length; idx++) {
    const type = typeof arguments[idx];
    switch (true) {
      case type === 'string' || type === 'symbol':
        displayedName = arguments[idx];
        break;
      default:
        ExtendedComponentClass = arguments[idx];
    }
  }
  return build(ExtendedComponentClass, displayedName);
};