# clear-render
Developer tool for debugging render react components.

## Motivation
Often, you need to understand when there is a render, and why.

![Demonstration](https://monosnap.com/file/z0byK7zYNsZ82VjN9n9Q9e5jw1M2Se.png)

## Install

```
npm install clear-render --save-dev
```

You can set globally, to be used in all their projects without having to install each.


## Usage 
The first option is the use, wrap the component for which you want to watch. And yet!
```javascript
class SimpleComponent {
  constructor(props, ctx) {
    super(props, ctx);
  }
  render() {
    return (
      <div> Simple text. </div>
    )
  }
}

SimpleComponent = require('clear-render')(SimpleComponent)

```
The second option is the use, you need to inherit from the component for which the dependence clear-render you want to follow.
```javascript
class CustomBlock extends require('clear-render')() {
  constructor(props, ctx) {
    super(props, ctx);
  }
  render() {
    return (
      <div> Simple text. </div>
    )
  }
}
```
or
```javascript
const clearRender = require('clear-render')();

class CustomBlock extends clearRender {
  constructor(props, ctx) {
    super(props, ctx);
  }
  render() {
    return (
      <div> Simple text. </div>
    )
  }
}
```
The component uses standart methods:
- componentDidMount
- componentWillUpdate
- shouldComponentUpdate
Therefore, we must call the super class methods manually.
```javascript
class CustomBlock extends require('clear-render')() {
  constructor(props, ctx) {
    super(props, ctx);
  }
  componentWillUpdate() {
    super.componentWillUpdate();
    // your code ...
  }
  shouldComponentUpdate(nextProps, nextState) {
    super.shouldComponentUpdate(nextProps, nextState)
    // your code ...
  }
  componentDidMount() {
    super.componentDidMount();
    // your code ...
  }
  render() {
    return (
      <div> Simple text. </div>
    )
  }
}
```
If there is already an heir need to pass it to the relationship clear-render.

Before:
```javascript
class CustomBlock extends Control {
  constructor(props, ctx) {
  // your code of component ...
```
After:
```javascript
class CustomBlock extends require('clear-render')(Control) {
  constructor(props, ctx) {
  // your code of component ...
```
You can pass the name of the component is clearly to be displayed at console.log.
```javascript
class CustomBlock extends require('clear-render')('Input2', Control) {
  constructor(props, ctx) {
  // your code of component ...
```
The sequence can be any arguments.
```javascript
class CustomBlock extends require('clear-render')('Input2', Control) {
  constructor(props, ctx) {
  // your code of component ...
```
or
```javascript
class CustomBlock extends require('clear-render')(Control, 'Input2') {
  constructor(props, ctx) {
  // your code of component ...
```

## Contributing
Got ideas on how to make this better? Open an issue!

## License
MIT
