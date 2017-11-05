# clear-render
Developer tool for debugging render React components.

## Motivation
Often, you need to understand when there is a render, and why.

![Demonstration](https://monosnap.com/file/6oqE3SvayAv4T4NF2jtZIRnfAKq136.png)

## Install

```
npm install clear-render --save-dev
```

You can set globally, to be used in all their projects without having to install each.
  
## Usage 
Wrap the component for which you want to watch. And yet!
```javascript
import clearRender from 'clear-render';

@clearRender
class SimpleComponent extends React.Component {

    ...

}
```
or
```javascript
class SimpleComponent extends React.Component {

    ...

}

SimpleComponent = require('clear-render')(SimpleComponent)

```
  
## Contributing
Got ideas on how to make this better? Open an issue!

## License
MIT
