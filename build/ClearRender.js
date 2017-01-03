const Component = require('ReactComponent');
const React = require('react');
const shallowCompare = require('shallowCompare');

class ClearRender extends Component {
  componentDidMount() {
    console.info('RENDER ' + this.getNameConstructor());
  }
  getFunctionName(func) {
    return func.toString().match(/\w+\(/)[0].slice(0, -1);
  }
  getNameConstructor() {
    return this.nameConstructor || (this.nameConstructor = this.getFunctionName(this.constructor));
  }
  componentWillUpdate() {
    console.info('RE-RENDER ' + this.getNameConstructor());
    this.print('props changes', this.propsChanges);
    this.print('state changes', this.stateChanges);
  }
  print(title, changes = []) {
    if (changes.length === 0) {
      return;
    }
    console.group(title);
    this.printChanges(changes);
    console.groupEnd();
  }
  printChanges(changes) {
    changes.forEach(change => {
      if (change instanceof Array) {
        this.printChanges(change);
      } else {
        console.log(change);
      }
    });
  }
  differenceBetweenObjects(oldObj = {}, nextObj = {}) {
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
            break;
        }
      }
    });
    return difference;
  }
  shouldComponentUpdate(nextProps, nextState) {
    this.propsChanges = this.differenceBetweenObjects(this.props, nextProps);
    this.stateChanges = this.differenceBetweenObjects(this.state, nextState);
    return shallowCompare(this, nextProps, nextState);
  }
}
module.exports = ClearRender;