---
title: AFM React Components
sidebar_label: AFM React Components
copyright: (C) 2007-2018 GoodData Corporation
id: afm_react_components
---

The element where you are inserting a React component in must have the height and width set up. Otherwise, the visualization will not work correctly.

Though you can use either object URIs or object identifiers, we recommend that you use the **object identifiers**, 
which are consistent across your domain regardless of the GoodData project they live in. That is, 
an object used in any project within your domain would have the _same_ object identifier in_any_of those projects\). 
To get a list of catalog items and date datasets from a GoodData project in form of a JavaScript object, 
use [gdc-catalog-export](gdc-catalog-export.md).

## Charts

### Parameters

| Name | Required? | Type |
| :--- | :--- | :--- |
| afm | true | [AFM](afm.md) |
| projectId | true | string |
| resultSpec  | false | [Result Specification \(resultSpec\)](result_specification.md) |
| config  | false | [ChartConfig](chart_config.md) |

### Structure

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { AfmComponents } from '@gooddata/react-components';
 
const { BarChart } = AfmComponents; // replace BarChart with ColumnChart, LineChart, or PieChart whenever needed
 
<BarChart
    afm={<afm>}
    projectId="<project-id>"
    resultSpec={<resultSpec>}
    config={<chart-config>}
/>
```

### Example

This example uses data from a demo project. For testing purposes, you can use this snippet as is.

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { AfmComponents } from '@gooddata/react-components';
 
const { BarChart } = AfmComponents;
 
<BarChart
    afm={{
        measures: [
            {
                localIdentifier: 'CustomMeasureID',
                definition: {
                    measure: {
                        item: {
                            identifier: 'aeOt50ngicOD' // can be referenced from the exported catalog
                        }
                    }
                },
                alias: 'Number of Checks'
            }
        ],
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: {
                    identifier: 'label.restaurantlocation.locationresort'
                }
            }
        ]
    }}
    projectId={'ws7pxsamkx8o0t1s7kfvkj5o41uwcmqg'}
    resultSpec={{}}
/>
```

## Table

### Parameters

| Name | Required? | Type |
| :--- | :--- | :--- |
| afm | true | [AFM](afm.md) |
| projectId | true | string |
| resultSpec  | false | [Result Specification \(resultSpec\)](result_specification.md) |

### Structure

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { AfmComponents } from '@gooddata/react-components';
 
const { Table } = AfmComponents;
 
<Table
    afm={<afm>}
    projectId="<project-id>"
    resultSpec={<resultSpec>}
/>
```

### Example

This example uses data from a demo project. For testing purposes, you can use this snippet as is.

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { AfmComponents } from '@gooddata/react-components';
 
const { Table } = AfmComponents;
 
<div style={{ height: 500 }}>
    <Table
        afm={{
            measures: [
                {
                    localIdentifier: 'CustomMeasureID',
                    definition: {
                        measure: {
                            item: {
                                identifier: 'aeOt50ngicOD' // can be referenced from the exported catalog
                            }
                        }
                    },
                    alias: '# of Checks'
                }
            ],
            attributes: [
                {
                    localIdentifier: 'a1',
                    displayForm: {
                        identifier: 'label.restaurantlocation.locationresort'
                    }
                }
            ]
        }}
        projectId="ws7pxsamkx8o0t1s7kfvkj5o41uwcmqg"
        resultSpec={{}}
    />
</div>
```
