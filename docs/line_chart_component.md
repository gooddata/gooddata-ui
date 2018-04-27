---
title: Line Chart
sidebar_label: Line Chart
copyright: (C) 2007-2018 GoodData Corporation
id: line_chart_component
---

Line Chart shows data as line-connected dots. Line charts can display either multiple measures as individual lines or a single measure split by one attribute into multiple lines with points intersecting attribute values.

![Line Chart Component](assets/line_chart.png "Line Chart Component")

## Example

```jsx
const measures = [
    {
        measure: {
            localIdentifier: 'franchiseFeesIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    }
];

const attribute = {
    visualizationAttribute: {
        displayForm: {
            identifier: monthDateIdentifier
        },
        localIdentifier: 'month'
    }
};

<div style={{ height: 300 }}>
    <LineChart
        projectId={projectId}
        measures={measures}
        trendBy={attribute}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | false | string | The project ID |
| measures | false | Measure[] | An array of measure definitions |
| trendBy | false | Attribute[] | An array of attribute definitions |
| segmentBy | false | Attribute[] | An array of attribute definitions |
| filters | false | Filter[] | An array of filter definitions |
| config | false | {} | The chart configuration object |
| locale | false | string | The location string for translations |
| drillableItems | false | DrillableItem[] | An array of points and attribute values to be drillable
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
| onError | false | Function | A callback when component updates its error state |
| onLoadingChanged | false | Function | A callback when component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->
