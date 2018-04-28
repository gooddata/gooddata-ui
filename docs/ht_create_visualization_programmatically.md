---
title: Create a Visualization Programmatically on the Fly
sidebar_label: Create a Visualization Programmatically on the Fly
copyright: (C) 2007-2018 GoodData Corporation
id: ht_create_visualization_programmatically
---

For learning purposes, this procedure uses data from the GoodSales demo project. In particular, the article explains how to create a bar chart that renders `# of Activities` sliced by `Activity Type`.

You can choose any of the supported visualization types. The following visualization types are available: 
* `BarChart`
* `ColumnChart`
* `LineChart`
* `PieChart`
* `Table`. 
For more information about the visualization types, see [React Components](react_components.md).

Before you start creating visualizations on the fly, ensure that you have basic understanding of what AFM and resultSpec are. For details, see [AFM](afm.md) and [Result Specification \(resultSpec\)](restul_specification.md).

**Steps:**

1. [Find the project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID).
   The ID of the GoodSales demo project is`la84vcyhrq8jwbu4wpipw66q2sqeb923`.

2. Obtain data identifiers using [gdc-catalog-export](gdc-catalog-export).

3. Create a JavaScript object with the exported data and save it.

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

5. Prepare AFM using the identifiers that you obtained in Step 2.
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

6. Prepare resultSpec.
   A resultSpec object is optional but it is used in this procedure for learning purposes. In this example, you add a resultSpec object to define the attribute sort. To reference the attribute, the attribute `localIdentifier`, created inside the AFM, will be used.

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

7. Set up a config object for your chart.

To personalize the bar chart further \(for example, change colors\), override the default chart options. For more information, see [AFM React Components](amf.md).
