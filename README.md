# clear-render

To answer the question. **Why did the rendering happen?** :eyes:
 
:heavy_plus_sign: support for React Hooks;

:heavy_plus_sign: patching only target component, therefore it is works very fast for large project;

:heavy_plus_sign: for all versions of React from ^0.13.0 to ^16.0.0;

:heavy_plus_sign: easy usage!

:heavy_plus_sign: zero dependencies.


### Advantage over analogues

Advantage over analogues: [welldone-software/why-did-you-render](https://github.com/welldone-software/why-did-you-render), [maicki/why-did-you-update](https://github.com/maicki/why-did-you-update) and [garbles/why-did-you-update](https://github.com/garbles/why-did-you-update), is a function that monkey patches React (it is works very very slow for large project) and not support React hooks.

<img width="564" alt="example" src="https://user-images.githubusercontent.com/15855766/47255109-5e687900-d474-11e8-86b1-38d732483959.png">

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

### Install

```
npm i --save-dev clear-render 
```

## Contributing
Got ideas on how to make this better? Open an issue!

## License
MIT
