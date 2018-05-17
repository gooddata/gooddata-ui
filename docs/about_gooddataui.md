---
id: about_gooddataui
title: About GoodData.UI
sidebar_label: About GoodData.UI
copyright: (C) 2007-2018 GoodData Corporation
---

GoodData.UI is a React-based JavaScript library for building responsive analytical applications.

With GoodData.UI, you can:
* Display insights or existing visualizations from the GoodData platform using [visual components](start_with_visual_components.md).
* Create your [new visual components](create_new_visualization.md) to address your specific analytical needs.

## Supported technologies
GoodData.UI is compatible with:
* React 15.6.2, [Angular 1.X](ht_use_react_components_in_angular_1.x.md), [Angular 2+](ht_use_react_components_in_angular_2.x.md)
* TypeScript 2.3+, ES6, ES5
* [all major browsers](https://help.gooddata.com/display/doc/System+Requirements+and+Supported+Browsers)

Note: [Server-side rendering](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md) is _not_ supported.

### Mandatory polyfill
The ES6 polyfill is required to run GoodData.UI application in IE11 as [seen in this table](http://kangax.github.io/compat-table/es6/). Follow the [guide here](https://github.com/zloirock/core-js). 

If you are using babel, you may use [babel polyfill](https://babeljs.io/docs/usage/polyfill/) in your index to specifically include only needed polyfill code.

## GoodData platform account

To use the GoodData.UI, you must have an account on the GoodData platform. If you do not have an account and want to try GoodData.UI, use [live examples](https://gooddata-examples.herokuapp.com).

For basic information about the GoodData platform, see [GoodData Platform Introduction](platform_intro.md).