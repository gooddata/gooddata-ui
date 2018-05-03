---
id: ht_use_react_components_with_vanilla_js
title: Use Vanilla JavaScript
sidebar_label: Use Vanilla JavaScript
copyright: (C) 2007-2018 GoodData Corporation
---

You can build a custom bundle, include it using the `<script src=...>` HTML tag, and use it without the React framework - for example, with Vanilla JavaScript, jQuery, or other JavaScript frameworks that use direct DOM manipulation.


* Using [webpack](https://webpack.js.org/) to transpile and bundle the files provided by the GoodData UI SDK into a single minified file that can be included by the `<script src=...>` HTML tag
* Creating Vanilla JavaScript helper functions for attaching and detaching React components to/from DOM nodes
* Copying the CSS style sheet from the GoodData UI SDK and including it in your HTML page using the `<link src=...>` HTML tag

This tutorial focuses only on integrating GoodData.UI with Vanilla JavaScript and covers the following functional areas:

* Using [webpack](https://webpack.js.org/) to transpile and bundle the files provided by GoodData.UI  into a single minified file that can be included by the `<script src=...>` HTML tag.
* Creating Vanilla JavaScript helper functions for attaching and detaching React components to/from DOM nodes.
* Copying the CSS style sheet from GoodData.UI and including it in your HTML page using the `<link src="…">` HTML tag.

## Sample code

To complement this tutorial, a sample code is available at [https://github.com/gooddata/ui-sdk-examples/tree/master/vanillajs](https://github.com/gooddata/ui-sdk-examples/tree/master/vanillajs) for you to try it out.

The sample code at [Vanilla JS](https://github.com/gooddata/ui-sdk-examples/tree/master/vanillajs) is intended only for educational purposes and is subject to change. The sample code is not a production-quality part of the GoodData product offer and is provided as-is.

## Step 1. Prepare the bundle

Create a simple `node.js` project with a `package.json` descriptor and an entry point JavaScript file.

### Webpack configuration file

The webpack configuration file [webpack.conf.js](https://github.com/gooddata/ui-sdk-examples/blob/master/vanillajs/webpack.conf.js) provides the following webpack instructions:

* Read the JavaScript entry point file.
* Expose the exported object as a window variable. The name of the window variable is defined in the library key of the webpack.conf.js file. The sample code uses GDRC (an acronym for "GoodData React Components").
* Build the bundle from the JavaScript entry point file and minimize the bundle using the Uglify plugin.

The `package.json` npm descriptor [https://github.com/gooddata/ui-sdk-examples/blob/master/vanillajs/package.json](https://github.com/gooddata/ui-sdk-examples/blob/master/vanillajs/package.json) includes:

* Dependencies to be included in the bundle (react and `@gooddata/react-components`)
* Developer dependencies that are required to build the bundle (`webpack`, `uglifyjs-webpack-plugin` and `babel-runtime`)
* A helper script that invokes the webpack command with proper parameters and a configuration file

### Entry point JavaScript file

The entry point JavaScript file ([vanilla.js](https://github.com/gooddata/ui-sdk-examples/blob/vanillajs/vanillajs/create-bundle/vanilla.js)) does the following:

* Imports `react` and `@gooddata/react-components`
* Exports an object wrapping of the GoodData.UI React components, helper functions for attaching and detaching React components to/from DOM nodes, and other elements of the GoodData UI SDK

For more information about the helper functions, see the blogpost by Benjamin Winterberg at [http://winterbe.com/posts/2015/08/24/integrate-reactjs-into-jquery-webapps/](http://winterbe.com/posts/2015/08/24/integrate-reactjs-into-jquery-webapps/).

The key points are the following:

* A function that mounts a specified React component with the specified props to a specific DOM element:

```javascript
var nodes = [];
var render = function(component, props, targetNode, callback) {
  var reactElement = React.createElement(component, props, null);
  ReactDOM.render(reactElement, targetNode, callback);
  nodes.push(targetNode);
  return reactElement;
}
```

If you want to change props of an already mounted component, you can call the render function again rather than modify the `reactElement` created by the `React.createElement()` call.

* A function or functions that unmount(s) mounted React components to prevent memory leaks:

```javascript
var unmountAll = function() {
  if (nodes.length === 0) {
    return;
  }
  nodes.forEach(node => React.unmountComponentAtNode(node));
  nodes = [];
};
var unmount = function(node) {
  React.unmountComponentAtNode(node)
};
```

The sample code wraps these functions with an object named `ReactContentRenderer`.

## Step 2. Build the bundle

To build the bundle and copy the CSS style sheet from the the@gooddata/react-components package, run the following commands:

```bash
webpack --config webpack.conf.js --output-path './dist/'
cp './node_modules/@gooddata/react-components/styles/css/main.css' './dist/gooddata_react_components_bundle.css'
```

If you are using `webpack.conf.js` from the `ui-sdk-examples` repository, you can run one of the following commands because `webpack.conf.js` already provides a bundle `npm` script:

```bash
npm run dist
```

or

```bash
yarn dist
```

These commands create the `dist` folder with the JavaScript bundle named `gooddata_react_components_bundle.js` and the CSS style sheet named `gooddata_react_components_bundle.css`.

## Step 3. Use the bundle
Make the `gooddata_react_components_bundle.js` and `gooddata_react_components_bundle.css` files accessible from the Internet so they can be referenced from your HTML code using the usual HTML elements, for example:

```javascript
<script src="gooddata_react_components_bundle.js"></script>
<link rel="stylesheet" type="text/css" href="gooddata_react_components_bundle.css">
```

Again, if you are using `webpack.conf.js` from the `ui-sdk-examples` repository, you can run one of the following commands to run a demo with the sample `index.html` file:

```bash
npm run demo
```

or

```bash
yarn demo
```

Once the `gooddata_react_components_bundle.js` file is included in your HTML page, it creates a GoodData React component and the helper functions mentioned in entry point JavaScript file (`render`, `unmountAll`, `unmount`).

The following sample code shows how to render a number, which was retrieved using the Kpi component, inside a specific `<div>` element:

```javascript
<div id="kpi"></div>
<script>

GDRC.ReactContentRenderer.render(
   // Kpi component
   GDRC.Kpi,
   // props to be passed to the Kpi component
   {
     projectId: 'kf0vsjlf9mll0osg6hmtppgm1nkjsi9r',
     measure: 'aqyCuRZbheEx',
     format: '#,##0'
   },
   // target DOM node
   document.getElementById('kpi')
 );
}

</script>
```

The sample code repository provides a more complex example that connects multiple React components with a dropdown allowing the end user to switch between multiple measures:

![Example](assets/vanillajs_example.gif)
