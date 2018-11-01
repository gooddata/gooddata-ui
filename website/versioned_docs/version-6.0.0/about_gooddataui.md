---
id: version-6.0.0-about_gooddataui
title: About GoodData.UI
sidebar_label: About GoodData.UI
copyright: (C) 2007-2018 GoodData Corporation
original_id: about_gooddataui
---

GoodData.UI is a React-based JavaScript library for building responsive analytical applications.

With GoodData.UI, you can:

* Display insights or existing visualizations from the GoodData platform using [visual components](start_with_visual_components.md).
* Create your [new visual components](create_new_visualization.md) to address your specific analytical needs.

This documentation is intended for front end software developers and requires JavaScript knowledge.

## Supported technologies

GoodData.UI is compatible with:

* React 16.5.2, [Angular 1.X](ht_use_react_components_in_angular_1.x.md), [Angular 2+](ht_use_react_components_in_angular_2.x.md)
* TypeScript 2.3+, ES6, ES5
* Node 8.9.4
* [Officially supported browsers](https://help.gooddata.com/display/doc/System+Requirements+and+Supported+Browsers)

**Note:** [Server-side rendering](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md) is *not* supported.

### Internet Explorer and mandatory polyfill

To run a GoodData.UI application in Internet Explorer 11, you must have the ES6 polyfill. For more information, see the [compatibility table](http://kangax.github.io/compat-table/es6/) and the instructions [here](https://github.com/zloirock/core-js)

If you are using Babel, you can use the [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) in your index to specifically include only the needed polyfill code.

## GoodData platform account

To use the GoodData.UI, you must have an account on the GoodData platform. For basic information about the GoodData platform, see [GoodData Platform Introduction](platform_intro.md).

If you want to try out GoodData.UI, we recommend that you sign up for the [live examples](https://gooddata-examples.herokuapp.com) first. You can use the online experience or [run the examples locally on your machine](https://github.com/gooddata/gooddata-react-components/#run-live-examples-locally).