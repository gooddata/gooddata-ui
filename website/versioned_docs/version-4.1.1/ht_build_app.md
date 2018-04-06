---
title: Build an App
sidebar_label: Build an App
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-ht_build_app
original_id: ht_build_app
---

## Build an App from Scratch

### Using create-react-app

See [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md).

### Using a Custom React Application \(non react-create-app\)

1. Add the `@gooddata/react-components` package to your existing project.

```bash
$ yarn add @gooddata/react-components
```

or

```bash
$ npminstall@gooddata/react-components
```

2. Import the components that you want to use to your app. For example, to get the `Visualization` component:

```javascript
import { Visualization } from '@gooddata/react-components';

// This is an example of embedding a visualization from the GoodSales demo project.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
/>
```

To get results from executing any component, you must be authenticated to the GoodData platform.

### Using Angular 1.x

See [How to Use React Components in Angular 1.x](ht_use_react_compinents_in_angular_1.x.md)).

### Using Angular 2+

See [How to Use React Components in Angular 2+](ht_use_react_components_in_angular_2.x.md).

## Basic Usage

### Authenticate Your App

The following ways to authenticate your app are supported:

* If you're using `create-react-app`, see [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md).
* If you are using SSO, ... **TODO**

### Embed an Existing Visualization

To embed an existing visualization created in Analytical Designer, use the `Visualization` component.

**Steps:**

1. Obtain the identifier of the visualization by either of the following methods:
 
   * Via the gray pages \(the ID of the GoodSales demo project is `la84vcyhrq8jwbu4wpipw66q2sqeb923`\):

```bash
https://secure.gooddata.com/gdc/md/{project-id}/query/visualizations
https://secure.gooddata.com/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/query/visualizations
```

    * Via [gdc-catalog-export](gdc-catalog-export.md)

2. Import the `Visualization` component from the `@gooddata/react-components` package into your app:

```javascript
import{ Visualization } from'@gooddata/react-components';
```

3. Create a `Visualization` component in your app, and provide it with the project ID and the visualization identifier that you obtained at Step 1:

```javascript
// This is an example of embedding a visualization from the GoodSales demo project.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
        legend: {
            enabled: true,
            position: 'bottom'
        }
    }}
/>
```

## Customize a Visualization

### Change Chart Colors

To change colors in a chart, provide a `config` for each component where you want to change colors, or create a wrapped components with a `config` baked in.

```javascript
import { Visualization } from '@gooddata/react-components';
 
// This is an example of embedding a visualization from the GoodSales demo project with custom colors and palette options.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']
    }}
/>
```

### Change Legend Visibility and Position

To hide the legend, set the `config.legend.enabled` property to `false`.

To change the legend position, adjust the `config.legend.position` property \(`'left'`/`'right'`/`'top'`/`'bottom'`\).

```javascript
import { Visualization } from '@gooddata/react-components';
 
// This is an example of embedding a visualization from the GoodSales demo project with custom colors and palette options.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        legend: {
            enabled: true,
            position: 'bottom' // 'left', 'right', 'top'
        }
    }}
/>
```

### Customize Tooltips and Fonts

To customize tooltips and fonts, [implement a custom visualization](data_layer.md).

## Create a Visualization Programmatically on the Fly

For learning purposes, this procedure uses data from the GoodSales demo project. In particular, it explains how to create a bar chart that renders `# of Activities` sliced by `Activity Type`.

You can choose any other supported visualization type. When this article was last updated, the following visualization types were available: `BarChart`, `ColumnChart`, `LineChart`, `PieChart`, and `Table`. For the complete information about the visualization types, see [React Components](react_components.md).

Before you start creating visualizations on the fly, make sure that you have a basic understanding of what AFM and resultSpec are. For detailed information, see [AFM](afm.md) and [Result Specification \(resultSpec\)](restul_specification.md).

**Steps:**

1. [Find the project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID).
   The ID of the GoodSales demo project is`la84vcyhrq8jwbu4wpipw66q2sqeb923`.

2. Obtain data identifiers using [gdc-catalog-export](gdc-catalog-export).

3. Create a JavaScript object with the exported data, and save it.

```javascript
// catalogue.js


const catalogue = {
 ...
};


export default catalogue;
```

This catalog will later be used when creating visualizations.

4. Import the visualization type that you want to use.  
   In this procedure, you are going to use a bar chart `(BarChart)`.

```javascript
import { AfmComponents } from '@gooddata/react-components';
import catalogue from './catalogue';


const { BarChart } = AfmComponents;

const projectId = 'la84vcyhrq8jwbu4wpipw66q2sqeb923'; // Replace with your project ID.
const afm = {};
const resultSpec = {};
const customConfig = {};

<BarChart afm={afm} resultSpec={resultSpec} config={customConfig} />
   ```

5. Prepare an AFM using the identifiers that you obtained at Step 2.
   To create a bar chart that renders `# of Activities` sliced by `Activity Type`, define the following elements:

   * AFM with a measure named `'m1'` with a base object named `'# of Activities'`.
   * Attribute to slice `# of Activities` sliced by `Activity Type`. To define the attribute, add the attribute in an attribute array. Get its identifier from the catalog that you created at Step 3.

```javascript
import { AfmComponents } from '@gooddata/react-components';
import catalogue from './catalogue';
 
 
const { BarChart } = AfmComponents;
 
const projectId = 'la84vcyhrq8jwbu4wpipw66q2sqeb923';
const afm = {
    measures: [
        {
            localIdentifier: 'm1',
            definition: {
                measure: {
                    item: {
                        identifier: catalogue['# of Activities']
                    }
                }
            }
        }
    ],
    attributes: [
        {
            localIdentifier: 'a1',
            displayForm: {
                identifier: catalogue['Activity Type']
            }
        }
    ]
};
const resultSpec = {};
...
render() {
    return (
        <BarChart
                afm={afm}
                projectId={projectId}
                resultSpec={resultSpec}
        />
    )
}
```

6. Prepare a resultSpec
   A resultSpec object is optional but it is used in this procedure for learning purposes. In this example, you are going to add a resultSpec object to define the attribute sort. To reference the attribute, the attribute localIdentifier created inside the AFM will be used.

```javascript
...
const resultSpec = {
    sorts: [
        {
            attributeSortItem: {
                direction: 'desc',
                attributeIdentifier: 'a1'
            }
        }
    ]
}
 
...

render() {
    return (
        <BarChart
                afm={afm}
                projectId={projectId}
                resultSpec={resultSpec}
        />
    )
}
```

7. Set up a configobject for your chart.

To personalize the bar chart further \(for example, change colors\), override the default chart options. For more information, see [AFM React Components](amf.md).

## Set Up Drilling

To enable event drilling, extend the `Visualization` component with a `drillableItems` property. In the `drillableItems` property, add an array of `uri`'s and/or `identifier`'s of the measures and attributesthat will become highlighted and drillable.

```javascript
// This is an example of event drilling on the visualization from the GoodSales demo project.
<Visualization
  projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
  identifier="aby3polcaFxy"
  drillableItems={[
    { identifier: 'label.owner.department' },
    { uri: '/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/9211' }
  ]}
/>
```

To catch events, add a listener to `document`:

```javascript
document.addEventListener('drill',function(arg) { console.log(arg.detail); });
```

Each event is a JSON consisting of `executionContext` and `drillableContext`. For more information, see [Setting up Events for Drilling in Embedded Analytical Designer and KPI Dashboards](https://help.gooddata.com/display/doc/Setting+up+Events+for+Drilling+in+Embedded+Analytical+Designer+and+KPI+Dashboards).
