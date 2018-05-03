---
title: Use Angular 1.x
sidebar_label: Use Angular 1.x
copyright: (C) 2007-2018 GoodData Corporation
id: ht_use_react_component_in_angular_1.x
---

You can use the GoodData [React components](react_components.md) in your Angular 1._x_app_. There are several ways how to use the React component. Here is how you do that with [ngReact](http://ngreact.github.io/ngReact/):

1. Add `angular`, `react`, `react-dom`, `ngReact`, and `@gooddata/react-components` dependencies into your project:

```bash
yarn add angular react react-dom ngreact @gooddata/react-components
```

2. Inject `react` \(`ngreact`\) as a dependency into your Angular module:

```javascript
require('ngreact');

angular.module('app', ['react']);
```

3. In the JS file, review the following snippet.
   This snippet uses data from example project and represents the bar chart from this project. For testing purposes, you can use this snippet as is.
   When you start creating your own visualization, you can update this snippet according to what data you have in your project \(measures, attributes, and so on\), and what visualization you want to create \(for example, a table or a KPI\). For more information about components that you can use, their structure, and examples, see [React Components](react_comnponents.md).

```javascript
import angular from 'angular';
import 'ngreact';
import './styles/app.scss';
 
import { BarChart } from '@gooddata/react-components'; // Importing the required components
 
angular.module('gdcAngularApp', ['react']) // Injecting ngReact
.controller('MainPageController', function() {
    this.barChartProps = {
      afm: {
        measures: [
          {
            localIdentifier: 'CustomMeasureID',
            definition: {
              measure: {
                item: {
                  identifier: 'acKjadJIgZUN'
                }
              }
            },
            alias: '# of Activities'
          }
        ],
        attributes: [
          {
            localIdentifier: 'a1',
            displayForm: {
              identifier: 'label.activity.type'
            }
          }
        ]
      },
      projectId: 'la84vcyhrq8jwbu4wpipw66q2sqeb923',
      resultSpec: {}
  };
})
```

4. Register a React component to use in Angular.
 
   To do so, use _one_ of the following methods:
   * Register the React component using the
     [react-component directive](https://github.com/ngReact/ngReact#the-react-component-directive).
     1. In JS file, add the following line under the snippet from Step 3:
        ```javascript
        .value('BarChart', BarChart);
        ```
     2. In the HTML file, insert the following snippet:
        ```javascript
        <body>
          <div ng-controller="MainPageController as ctrl">
            <div style="width: 600px; height: 600px;">
              <react-component name="BarChart" props="ctrl.barChartProps"/>
            </div>
          </div>
        </body>
        ```
   * Register the React component using the
     [reactDirective service](https://github.com/ngReact/ngReact#the-reactdirective-service).
     1. In JS file, add the following lines under the snippet from Step 3:
        ```javascript
        .directive('barChart', function(reactDirective) {
          return reactDirective(BarChart, ['afm', 'resultSpec', 'projectId']);
        });
        ```

     2. In the HTML file, insert the following snippet:
        ```javascript
          <body>
            <div ng-controller="MainPageController as ctrl">
              <div style="width: 600px; height: 600px;">
                <bar-chart
                  afm="ctrl.barChartProps.afm"
                  resultSpec="ctrl.barChartProps.resultSpec"
                  projectId="ctrl.barChartProps.projectId"
                />
              </div>
            </div>
          </body>
        ```

If you want to handle the loading and error content yourself and you do not want to use the default LoadingComponent and ErrorComponent, pass null explicitly:

* `LoadingComponent={null}`
* `ErrorComponent={null}`

 You are now ready to use the GoodData React components in your Angular app.
