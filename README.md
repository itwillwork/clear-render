# clear-render

To answer the question. **Why did the rendering happen?** :eyes:
 
:heavy_plus_sign: support for React Hooks;
:heavy_plus_sign: used directly for one component, therefore it works very fast for large project;
:heavy_plus_sign: for all versions of React from ^0.13.0 to ^16.0.0;
:heavy_plus_sign: easy usage!
:heavy_plus_sign: zero dependencies.

> [why-did-you-update](https://github.com/maicki/why-did-you-update) is a function that monkey patches React, therefore very slow works.

<img width="564" alt="example" src="https://user-images.githubusercontent.com/15855766/47255109-5e687900-d474-11e8-86b1-38d732483959.png">

## Install

```
npm i --save-dev clear-render 
```

You can set globally, to be used in all their projects without having to install each.
  
## Usage 
Wrap the component for which you want to watch. And yet! :checkered_flag:

```javascript
import clearRender from 'clear-render';

class SimpleComponent extends React.Component {

    ...

}

export default clearRender(SimpleComponent);
```
or
```javascript
import clearRender from 'clear-render';

@clearRender
class SimpleComponent extends React.Component {

    ...

}
```


## Usage for CodePen and JSBin as UMD module
in html area
```javascript
<script src="https://unpkg.com/clear-render@latest/module/umd.js"></script>
```
in js area use ```clearRender``` from global scope
```javascript
@clearRender
class SimpleComponent extends React.Component {

    ...

}
```

## Contributing
Got ideas on how to make this better? Open an issue!

## License
MIT
