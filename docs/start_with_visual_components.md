---
title: How to Use Visual Components
sidebar_label: How to Use Visual Components
copyright: (C) 2007-2018 GoodData Corporation
id: start_with_visual_components
---

GoodData.UI comes with ready-made visual components listed in the Visual Components section that you can use as-is or further customize. You can also use visualizations that simply render any chart you create on the GoodData platform based on the provided URI or identifier.

## Element Height and Width

The element in which you are inserting a React component must have the height and width set up. Otherwise, the visualization will not work correctly.

### Example

```javacsript
<div style={{ height: 400, width: 600 }}>
    <Visualization ... />
</div>
```

## Server-side rendering

Server-side rendering is _not_ supported.

## Object URI vs. Object Identifier

Though you can use either object URIs or object identifiers, we recommend that you use the **object identifiers**, which are consistent across your domain regardless of the GoodData project they live in. That is, an object used in any project within your domain would have the _same_ object identifier in _any_ of those projects. To get a list of catalog items and date datasets from a GoodData project in form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).

## Parameters

| Name | Required? | Type |
| :--- | :--- | :--- |
| afm | true | [AFM](afm.md) |
| projectId | true | string |
| resultSpec  | false | [Result Specification \(resultSpec\)](result_specification.md) |
| config  | false | [ChartConfig](chart_config.md) |

## Example Structure

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
