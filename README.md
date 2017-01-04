# clear-render
Developer tool for debugging render react components.

## Motivation
Often, you need to understand when there is a render, and why.

![Demonstration](https://d1ro8r1rbfn3jf.cloudfront.net/ms_120038/3HlrMq929sKTwR1Jg9ZsrsX99wijgD/%25D0%259E%25D0%25BD%25D0%25BB%25D0%25B0%25D0%25B9%25D0%25BD%2B%25D0%25B1%25D1%2580%25D0%25BE%25D0%25BD%25D0%25B8%25D1%2580%25D0%25BE%25D0%25B2%25D0%25B0%25D0%25BD%25D0%25B8%25D0%25B5%2B%25D0%25B0%25D0%25B2%25D0%25B8%25D0%25B0%25D0%25B1%25D0%25B8%25D0%25BB%25D0%25B5%25D1%2582%25D0%25BE%25D0%25B2%2B%25D0%25B8%2B%25D0%25BE%25D1%2582%25D0%25B5%25D0%25BB%25D0%25B5%25D0%25B9%252C%2B%25D0%25B7%25D0%25B0%25D0%25B1%25D1%2580%25D0%25BE%25D0%25BD%25D0%25B8%25D1%2580%25D0%25BE%25D0%25B2%25D0%25B0%25D1%2582%25D1%258C%2B%25D0%25B3%25D0%25BE%25D1%2581%25D1%2582%25D0%25B8%25D0%25BD%25D0%25B8%25D1%2586%25D1%2583%2B%25D0%25B8%2B%25D0%25B1%25D0%25B8%25D0%25BB%25D0%25B5%25D1%2582%2B%25D0%25BD%25D0%25B0%2B%25D1%2581%25D0%25B0%25D0%25BC%25D0%25BE%25D0%25BB%25D0%25B5%25D1%2582%2B%25D0%25BD%25D0%25B0%2BOneTwoTrip%2B2017-01-04%2B15-08-36.png?Expires=1483619710&Signature=QQq7CUb6Nu3Dm2wDnj2XTjte0E2-xikYFt9fqLVr-750OlhhrBZH4qTs60XXxS6Ys5iP6U4-flD-Zr8dw96-Wo-f1YDUKupWp3JpAtE0ukJxytEZmZd3SYdcxxWBQeBQy6aCkFon~ijqIrOl~wz-f30oOPQvPEIJNKNO~bbGCCLIpZbqhhT5XULEmMs7MaAKigRuduvLwc8ZO-pgGAT8DT2xfO1~vIjBFiPV1CIPVIgcslUl7pJrKXGLYVKFxYXA5OqipGCqnSwRCwo4Ly6Y89uDqTnFPRrqYWNL5cx~OJwl3XlnWwGc74POgmKxp1VZgiabL~2J~pi3cbbaecsc7A__&Key-Pair-Id=APKAJHEJJBIZWFB73RSA)

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
