
react-async-component
=====================

[![Build Status](https://github.com/ultraq/react-async-component/actions/workflows/build.yml/badge.svg)](https://github.com/ultraq/react-async-component/actions)
[![Coverage Status](https://coveralls.io/repos/github/ultraq/react-async-component/badge.svg?branch=main)](https://coveralls.io/github/ultraq/react-async-component?branch=main)
[![npm](https://img.shields.io/npm/v/@ultraq/react-async-component.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/react-async-component)
[![Bundlephobia minified size](https://img.shields.io/bundlephobia/min/@ultraq/react-async-component)](https://bundlephobia.com/result?p=@ultraq/react-async-component)

Load react components asynchronously.


Installation
------------

```
npm install @ultraq/react-async-component
```

Uses Promises, so a promise polyfill is required for browsers that don't have
native support for them.


Usage
-----

This component aims to be used with the dynamic import syntax so that bundlers
can use code-splitting to divide JavaScript artifacts into smaller chunks.  One
area this can take place is on route changes, so an example with react-router
could look like this:

```javascript
<Route path="/my-route" render={() => (
  <AsyncComponent loader={import('./MyRoute.js')}/>
)}/>
```

### Props

Any props used on `<AsyncComponent/>` and not mentioned below are passed along
to the component that is loaded.

 - `children`: optional, a function passed the component (will be `null` until
   the loader has succeeded) and component props for implementors to add any
   custom behaviour between the unloaded/loaded component states.  Defaults to a
   function that renders nothing until the loader succeeds, at which point the
   component is rendered.
 - `loader`: required, the code through which a component will be loaded.  In
   the example above we used dynamic imports, but this can be any code that
   returns a Promise of the loaded component.
