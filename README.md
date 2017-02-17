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
Wrap the component for which you want to watch. And yet!
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
  
## Contributing
Got ideas on how to make this better? Open an issue!

## License
MIT
