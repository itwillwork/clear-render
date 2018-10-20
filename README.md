# clear-render

To answer the question. **Why did the rendering happen?** :eyes:

:heavy_plus_sign: used directly for one component, therefore it works very fast

:heavy_plus_sign: for all versions of React from ^0.13.0 to ^16.0.0 

:heavy_plus_sign: zero dependencies

<img width="564" alt="example" src="https://user-images.githubusercontent.com/15855766/47255109-5e687900-d474-11e8-86b1-38d732483959.png">

## Install

```
npm install clear-render --save-dev
```

You can set globally, to be used in all their projects without having to install each.
  
## Usage 
Wrap the component for which you want to watch. And yet! :checkered_flag:
```javascript
import clearRender from 'clear-render';

@clearRender
class SimpleComponent extends React.Component {

    ...

}
```
or
```javascript
import clearRender from 'clear-render';
import OriginalSimpleComponent from './SimpleComponent';

const SimpleComponent = clearRender(OriginalSimpleComponent);

...

<SimpleComponent {...props} />
```

## Usage for CodePen and JSBin as UMD module
in html area
```javascript
<script src="https://unpkg.com/clear-render@0.1.14/build/umd/index.js"></script>
```
in js area use clearRender from global scope
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
