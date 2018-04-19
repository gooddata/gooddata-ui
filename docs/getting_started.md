---
title: Getting Started
sidebar_label: Getting Started
copyright: (C) 2007-2018 GoodData Corporation
id: getting_started
---

> This is the pre-release GoodData developer documentation.
The contents of this documentation are under constant construction and the subject to change.
Before you proceed, please read the [legal information](legal_notices.md) first.
With any question, contact your GoodData Account Manager.

## About the GoodData UI SDK

The GoodData UI SDK is a library that provides all the building blocks you need to create a smart business application _powered by GoodData_.

With the GoodData UI SDK, you can:

* Display saved visualizations from [https://secure.gooddata.com/analyze](https://secure.gooddata.com/analyze)
   using the [Visualization component](ht_build_app.md#embed-an-existing-visualization)
* [Create visualizations programmatically on the fly](ht_build_app.md)
* Connect interactive controls to your visualization to provide unique user experience \(for example, an
  [Attribute Filter dropdown](ht_build_app.md)
  \)
* [Query GoodData](ht_access_gd_api_directly.md) for specific insights into your data to handle them with a custom component

## Supported Technologies

The GoodData UI SDK is built using Node.js, React 15.3.2, and TypeScript.

The GoodData UI SDK is tested against and supports the following:

* Mac, Linux OS
* React 15.3.2, Angular 1, Angular 2
  * For React using Create React App, see [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md).
  * For Angular 1, see [How to Use React Components in Angular 1.x](ht_use_react_components_in_angular_1.x.md).
  * For Angular 2+, see [How to Use React Components in Angular 2+](ht_use_react_components_in_angular_2.x.md).
* TypeScript 2.3+, ES6, ES5

The GoodData UI SDK may work with other platforms and operating systems but has _not_ been thoroughly tested yet and may _not_ provide all functionalities.

## Installation

```bash
yarn add @gooddata/react-components
```

## Preventing Cross-origin Issues

Your application will need to call the GoodData APIs from [https://secure.gooddata.com/gdc/](https://secure.gooddata.com/gdc/). Modern browsers do not permit this because of the security measure known as the [same-origin-policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

Choose either of the following options to bypass this restriction:

* Local proxy
  Set up a local proxy on your server. For information on how to do that, see your server's user documentation. For your convenience, here are links to some common setups:
  * [Local proxy setup in Webpack](https://webpack.github.io/docs/webpack-dev-server.html#proxy)
  * [Local proxy setup in Create react app](ht_create_your_first_visualization.md#step-4-prevent-cross-origin-issues)
* CORS white-labeling
  You can white-label your domain so that requests from this domain are accepted. To have your domain white-labeled, contact the GoodData Support.

  For more information about CORS, see
  [How to Access the GoodData API Directly](ht_access_gd_api_directly.md). For more information about white labeling, see [White Label Your Domain]https://help.gooddata.com/display/doc/White+Label+Your+Domain).

## Before You Start Using the GoodData UI SDK

Before you start building your application using the GoodData UI SDK, complete the following tasks:

### Familiarize yourself with the main terms used in the GoodData UI SDK

* **visualization** is a view into a specific part of your data defined by AFM, resultSpec and a configuration object, usually in a form of a table or graph.
* **AFM**
  **\(Attribute - Filter - Measure\)** is unified input for creating a visualization using the GoodData UI SDK. AFM describes what data you want to execute: what to measure by _measure_ - how to slice by _attribute_ - how to filter out by _filter_.
* **attribute** is a descriptor used to break apart measures and provide context to report data. Attributes dictate how measures are calculated and represented.
* **filter** is a set of characteristics applied to a visualization or measure to remove values from computed and displayed values.
* **measure** is aggregation of facts or counts of distinct attribute values, which are represented as numbers in reports. Measures represent what is being measured in a report; for example, sum of sales or average salary.
* **resultSpec** is an object that defines the structure of result data. For example, you can define a custom title and format for each measure, or sorting of data.

For more details on the terminology, see [Glossary](glossary.md).

### Get your project ID

You will need your project ID for the most components to work.

To get your project ID, see [Find the Project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID).

<!-- Examples in this documentation use data from the GoodSales // TODO REMOVE! demo project with an ID of `la84vcyhrq8jwbu4wpipw66q2sqeb923`. -->

### Get resource identifiers

To display visualizations, filters, and other resources, get their identifiers either via the gray pages \(see [Accessing Gray Pages for a Project](https://help.gooddata.com/display/developer/Accessing+Gray+Pages+for+a+Project)\) or using [gdc-catalog-export](gdc-catalog-export.md).

## Next Steps

Now, you can start building your application.

We have a number of tutorials to help you start your development:

* [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md)
* [How to Build an App](ht_build_app.md)
* [How to Use React Components in Angular 1.x](ht_use_react_components_in_angular_1.x.md)
* [How to Use React Components in Angular 2+](ht_use_react_components_in_angular_2.x.md)
* [How to Access the GoodData API Directly](ht_access_gd_api_directly.md)
* [How to Configure a Webpack Proxy](ht_configure_webpack_proxy.md)
* [How to Set Up a Loading State for Embedded Insights](ht_set_up_loading_state_for_embeded_insight.md)
