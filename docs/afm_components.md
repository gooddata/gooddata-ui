---
title: AFM Components
sidebar_label: AFM Components
copyright: (C) 2007-2018 GoodData Corporation
id: afm_components
---

In their current form, the Visual Components listed in this section, do not support data sorting (for example, by attribute or measure).

If your use case require data sorting, use the following AFM components.

The AFM components use [AFM](afm.md) property instead of specific properties such as `measures` or `viewBy` that are used in Visual Components.

> **Warning!** AFM components are legacy elements from the previous GoodData.UI version and will be deprecated. Charts added after release 5.1.0 do not support AFM.

## Charts

### Parameters

| Name | Required? | Type |
| :--- | :--- | :--- |
| afm | true | [AFM](afm.md) |
| projectId | true | string |
| resultSpec  | false | [Result Specification \(resultSpec\)](result_specification.md) |
| config  | false | [object](chart_config.md) |

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
                            identifier: '<measure-identifier>' // can be referenced from the exported catalog
                        }
                    }
                },
                alias: 'My Measure'
            }
        ],
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: {
                    identifier: '<attribute-display-form-identifier>'
                }
            }
        ]
    }}
    projectId="<project-id>"
    resultSpec={}
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

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { AfmComponents } from '@gooddata/react-components';

const { Table } = AfmComponents;

<Table
    afm={{
        measures: [
            {
                localIdentifier: 'CustomMeasureID',
                definition: {
                    measure: {
                        item: {
                            identifier: '<measure-identifier>' // can be referenced from the exported catalog
                        }
                    }
                },
                alias: 'My Measure'
            }
        ],
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: {
                    identifier: '<attribute-display-form-identifier>'
                }
            }
        ]
    }}
    projectId="<project-id>"
    resultSpec={}
/>
```
